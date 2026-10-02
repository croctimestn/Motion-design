#!/usr/bin/env node
// Builds episodes/<ep>/timing.json from script.json + ONE continuous narration take.
// The narration is generated in a single ElevenLabs take (natural prosody), with [pause] tags
// between chapters. This tool finds those pauses, cuts the take into chapters, then aligns words
// inside each chapter on the shorter pauses (commas). The video timeline IS the audio timeline.
//
// Usage: node tools/timing.mjs episodes/01-tableau-de-bord
import { execFileSync, spawnSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const epDir = process.argv[2];
if (!epDir) {
  console.error('usage: node tools/timing.mjs <episode-dir>');
  process.exit(1);
}
const script = JSON.parse(readFileSync(join(epDir, 'script.json'), 'utf8'));
const LEAD = script.lead ?? 1.0; // video time before the narration starts
const TAIL = script.tail ?? 1.5; // video time after the narration ends

const round = (x) => Math.round(x * 1000) / 1000;
const norm = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9' ]+/g, ' ').trim();
const weight = (s) => s.replace(/[^\p{L}\p{N}]/gu, '').length + 2;
const textWeight = (t) => t.split(/\s+/).reduce((a, w) => a + weight(w), 0);

function probeDuration(file) {
  return parseFloat(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', file]).toString());
}

function detectSilences(file, minDur = 0.12) {
  const { stderr } = spawnSync('ffmpeg', ['-hide_banner', '-nostats', '-i', file, '-af', `silencedetect=n=-38dB:d=${minDur}`, '-f', 'null', '-'], {
    encoding: 'utf8',
  });
  const res = [];
  let cur = null;
  for (const line of stderr.split('\n')) {
    const s = line.match(/silence_start: ([\d.]+)/);
    const e = line.match(/silence_end: ([\d.]+)/);
    if (s) cur = { start: parseFloat(s[1]) };
    if (e && cur) {
      cur.end = parseFloat(e[1]);
      res.push(cur);
      cur = null;
    }
  }
  if (cur) res.push({ ...cur, end: Infinity });
  return res;
}

// Ordered DP: match each expected boundary to a pause (monotonic), favouring long pauses close
// to the expected time. `skip` = cost of leaving a boundary unmatched (Infinity = must match).
function matchBoundaries(expected, pauses, { maxDev, durWeight, skip }) {
  const B = expected.length;
  const P = pauses.length;
  const cost = (i, k) => {
    const p = pauses[k];
    const dev = Math.abs((p.start + p.end) / 2 - expected[i]);
    return dev > maxDev ? Infinity : dev - durWeight * (p.end - p.start);
  };
  const dp = Array.from({ length: B + 1 }, () => new Array(P + 1).fill(Infinity));
  const ch = Array.from({ length: B + 1 }, () => new Array(P + 1).fill(null));
  for (let k = 0; k <= P; k++) dp[0][k] = 0;
  for (let i = 1; i <= B; i++) {
    for (let k = 0; k <= P; k++) {
      let best = dp[i - 1][k] + skip;
      let c = { type: 'skip' };
      if (k > 0 && dp[i][k - 1] < best) {
        best = dp[i][k - 1];
        c = { type: 'drop' };
      }
      if (k > 0) {
        const m = dp[i - 1][k - 1] + cost(i - 1, k - 1);
        if (m < best) {
          best = m;
          c = { type: 'match' };
        }
      }
      dp[i][k] = best;
      ch[i][k] = c;
    }
  }
  if (!isFinite(dp[B][P])) return null;
  const out = new Array(B).fill(null);
  for (let i = B, k = P; i > 0; ) {
    const c = ch[i][k];
    if (c.type === 'drop') k--;
    else if (c.type === 'skip') i--;
    else {
      out[i - 1] = pauses[k - 1];
      i--;
      k--;
    }
  }
  return out;
}

// Expected boundary times between consecutive segments, by text weight over [t0, t1].
function expectedBounds(weights, t0, t1) {
  const total = weights.reduce((a, b) => a + b, 0);
  const out = [];
  let acc = 0;
  for (let i = 0; i < weights.length - 1; i++) {
    acc += weights[i];
    out.push(t0 + ((t1 - t0) * acc) / total);
  }
  return out;
}

// Word timings inside one chapter: phrases (split on punctuation) snapped to pauses, then words
// distributed by character weight.
function alignWords(text, t0, t1, pauses) {
  const phrases = text
    .split(/(?<=[,;:.!?…])\s+/)
    .map((p) => p.trim())
    .filter(Boolean);
  const exp = expectedBounds(phrases.map(textWeight), t0, t1);
  const inner = pauses.filter((p) => p.start > t0 && p.end < t1);
  const m = matchBoundaries(exp, inner, { maxDev: 1.0, durWeight: 1.5, skip: 0.6 });
  const bounds = [t0, ...exp.map((e, i) => (m && m[i]) || e), t1];
  const words = [];
  for (let i = 0; i < phrases.length; i++) {
    const a = bounds[i];
    const b = bounds[i + 1];
    const s = typeof a === 'number' ? a : a.end;
    const e = typeof b === 'number' ? b : b.start;
    const ws = phrases[i].split(/\s+/);
    const wsum = ws.reduce((x, w) => x + weight(w), 0);
    let t = s;
    for (const w of ws) {
      words.push({ w, t });
      t += ((e - s) * weight(w)) / wsum;
    }
  }
  return words;
}

function findCue(words, phrase) {
  const target = norm(phrase).split(' ');
  const ws = words.map((w) => norm(w.w).replace(/^[a-z]'/, ''));
  for (let i = 0; i < ws.length; i++) {
    if (target.every((t, j) => ws[i + j] !== undefined && ws[i + j].startsWith(t))) return words[i].t;
  }
  throw new Error(`cue "${phrase}" not found in: ${words.map((w) => w.w).join(' ')}`);
}

// ---------------------------------------------------------------- main
const file = join(epDir, script.voice.file);
// Optional pace adjustment: narration = raw ElevenLabs take sped up by `tempo` (pitch preserved)
if (script.voice.take) {
  const tempo = script.voice.tempo ?? 1;
  execFileSync('ffmpeg', ['-y', '-v', 'error', '-i', join(epDir, script.voice.take), '-af', `atempo=${tempo}`, '-b:a', '192k', file]);
  console.log(`narration : ${script.voice.take} ×${tempo} → ${script.voice.file}`);
}
const dur = probeDuration(file);
let speechStart = 0;
let speechEnd = dur;
const pauses = [];
for (const s of detectSilences(file)) {
  if (s.start <= 0.02) speechStart = s.end;
  else if (s.end >= dur - 0.02) speechEnd = Math.min(speechEnd, s.start);
  else pauses.push(s);
}

// 1) chapter boundaries = the [pause] tags → long pauses near the expected positions
const chapters = script.chapters;
const expCh = expectedBounds(chapters.map((c) => textWeight(c.text)), speechStart, speechEnd);
const chPauses = matchBoundaries(
  expCh,
  pauses.filter((p) => p.end - p.start >= 0.25),
  { maxDev: 3.5, durWeight: 6, skip: Infinity }
);
if (!chPauses) throw new Error('no pause found between every chapter: check the take or its [pause] tags');

// 2) per chapter: speech span, words, cues
let num = 0;
const out = chapters.map((c, i) => {
  const s0 = i === 0 ? speechStart : chPauses[i - 1].end;
  const s1 = i === chapters.length - 1 ? speechEnd : chPauses[i].start;
  const words = alignWords(c.text, s0, s1, pauses);
  const cues = {};
  for (const [k, phrase] of Object.entries(c.cues || {})) cues[k] = round(LEAD + findCue(words, phrase));
  return {
    id: c.id,
    label: c.label || null,
    num: c.label ? ++num : null,
    // a chapter's visuals start as soon as the previous sentence ends (during the pause)
    start: round(i === 0 ? 0 : LEAD + chPauses[i - 1].start + 0.05),
    end: null,
    audio: { start: round(LEAD + s0), speechEnd: round(LEAD + s1) },
    cues,
    words: words.map((w) => ({ w: w.w, t: round(LEAD + w.t) })),
  };
});
const total = round(LEAD + speechEnd + TAIL);
out.forEach((c, i) => (c.end = i < out.length - 1 ? out[i + 1].start : total));

const timing = {
  title: script.title,
  section: script.section,
  fps: 30,
  duration: total,
  narration: { file: script.voice.file, start: LEAD, dur: round(dur) },
  music: script.music || null,
  chapters: out,
};
writeFileSync(join(epDir, 'timing.json'), JSON.stringify(timing, null, 2));
for (const c of out) {
  const cues = Object.entries(c.cues).map(([k, v]) => `${k}@${v.toFixed(2)}`);
  console.log(`${c.start.toFixed(2).padStart(6)}s  ${c.id.padEnd(15)} voix ${c.audio.start.toFixed(2)}→${c.audio.speechEnd.toFixed(2)}  ${cues.join(' ')}`);
}
console.log(`total ${total}s`);
