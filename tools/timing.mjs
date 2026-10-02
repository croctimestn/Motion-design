#!/usr/bin/env node
// Builds episodes/<ep>/timing.json from script.json + the voice clips.
// The video timeline is derived from the real audio durations, so picture and voice stay in sync.
//
// Usage: node tools/timing.mjs episodes/01-tableau-de-bord
import { execFileSync, spawnSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const DEFAULT_LEAD = 0.35; // silence before a chapter's voice starts
const DEFAULT_TAIL = 0.55; // breathing room after a chapter's voice ends

const epDir = process.argv[2];
if (!epDir) {
  console.error('usage: node tools/timing.mjs <episode-dir>');
  process.exit(1);
}
const script = JSON.parse(readFileSync(join(epDir, 'script.json'), 'utf8'));

const round = (x) => Math.round(x * 1000) / 1000;
const norm = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9' ]+/g, ' ').trim();

function probeDuration(file) {
  return parseFloat(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', file]).toString());
}

function detectSilences(file) {
  const { stderr } = spawnSync('ffmpeg', ['-hide_banner', '-nostats', '-i', file, '-af', 'silencedetect=n=-38dB:d=0.07', '-f', 'null', '-'], {
    encoding: 'utf8',
  });
  const log = stderr;
  const res = [];
  let cur = null;
  for (const line of log.split('\n')) {
    const s = line.match(/silence_start: ([\d.]+)/);
    const e = line.match(/silence_end: ([\d.]+)/);
    if (s) cur = { start: parseFloat(s[1]) };
    if (e && cur) {
      cur.end = parseFloat(e[1]);
      res.push(cur);
      cur = null;
    }
  }
  if (cur) cur.end = Infinity;
  if (cur) res.push(cur);
  return res;
}

// Approximate word timings: split the speech span by phrases (punctuation) snapped to detected
// pauses, then distribute words inside each phrase by character weight.
function alignWords(text, dur, sil) {
  let speechStart = 0;
  let speechEnd = dur;
  const internal = [];
  for (const s of sil) {
    if (s.start <= 0.02) speechStart = s.end;
    else if (s.end >= dur - 0.02 || s.end === Infinity) speechEnd = Math.min(speechEnd, s.start);
    else internal.push(s);
  }
  const phrases = text
    .split(/(?<=[,;:.!?])\s+/)
    .map((p) => p.trim())
    .filter(Boolean);
  const weight = (s) => s.replace(/[^\p{L}\p{N}]/gu, '').length + 2;
  const phraseW = phrases.map((p) => p.split(/\s+/).reduce((a, w) => a + weight(w), 0));
  const total = phraseW.reduce((a, b) => a + b, 0);

  // Expected phrase boundaries (by characters), matched in order to detected pauses.
  // DP picks the monotonic assignment that favours long pauses close to the expected time.
  const span = speechEnd - speechStart;
  const expected = [];
  let acc = 0;
  for (let i = 0; i < phrases.length - 1; i++) {
    acc += phraseW[i];
    expected.push(speechStart + (span * acc) / total);
  }
  const B = expected.length;
  const P = internal.length;
  const SKIP = 0.6; // cost of a boundary with no matching pause
  const cost = (i, k) => {
    const p = internal[k];
    const dev = Math.abs((p.start + p.end) / 2 - expected[i]);
    return dev > 1.2 ? Infinity : dev - 1.5 * (p.end - p.start);
  };
  // dp[i][k]: best cost for the first i boundaries using pauses < k
  const dp = Array.from({ length: B + 1 }, () => new Array(P + 1).fill(Infinity));
  const choice = Array.from({ length: B + 1 }, () => new Array(P + 1).fill(null));
  for (let k = 0; k <= P; k++) dp[0][k] = 0;
  for (let i = 1; i <= B; i++) {
    for (let k = 0; k <= P; k++) {
      // boundary i-1 unmatched
      let best = dp[i - 1][k] + SKIP;
      let ch = { type: 'skip', k };
      // pause k-1 skipped
      if (k > 0 && dp[i][k - 1] < best) {
        best = dp[i][k - 1];
        ch = { type: 'drop', k: k - 1 };
      }
      // boundary i-1 matched to pause k-1
      if (k > 0) {
        const c = dp[i - 1][k - 1] + cost(i - 1, k - 1);
        if (c < best) {
          best = c;
          ch = { type: 'match', k: k - 1 };
        }
      }
      dp[i][k] = best;
      choice[i][k] = ch;
    }
  }
  const matched = new Array(B).fill(null);
  for (let i = B, k = P; i > 0; ) {
    const ch = choice[i][k];
    if (ch.type === 'drop') k = ch.k;
    else if (ch.type === 'skip') i--;
    else {
      matched[i - 1] = internal[ch.k];
      i--;
      k = ch.k;
    }
  }
  // pause object: phrase ends at p.start, next one starts at p.end
  const bounds = [speechStart, ...expected.map((e, i) => matched[i] || e)];
  bounds.push(speechEnd);

  const words = [];
  for (let i = 0; i < phrases.length; i++) {
    const a = bounds[i];
    const b = bounds[i + 1];
    const t0 = typeof a === 'number' ? a : a.end;
    const t1 = typeof b === 'number' ? b : b.start;
    const ws = phrases[i].split(/\s+/);
    const wsum = ws.reduce((x, w) => x + weight(w), 0);
    let t = t0;
    for (const w of ws) {
      const d = ((t1 - t0) * weight(w)) / wsum;
      words.push({ w, t0: t, t1: t + d });
      t += d;
    }
  }
  return { words, speechStart, speechEnd };
}

function findCue(words, phrase) {
  const target = norm(phrase).split(' ');
  const ws = words.map((w) => norm(w.w).replace(/^[a-z]'/, ''));
  for (let i = 0; i < ws.length; i++) {
    let ok = true;
    for (let j = 0; j < target.length; j++) {
      if (ws[i + j] === undefined || !ws[i + j].startsWith(target[j])) {
        ok = false;
        break;
      }
    }
    if (ok) return words[i].t0;
  }
  throw new Error(`cue "${phrase}" not found in: ${words.map((w) => w.w).join(' ')}`);
}

let t = 0;
let num = 0;
const chapters = [];
for (const ch of script.chapters) {
  const file = join(epDir, ch.audio);
  const dur = probeDuration(file);
  const sil = detectSilences(file);
  const { words, speechStart, speechEnd } = alignWords(ch.text, dur, sil);
  const lead = ch.lead ?? DEFAULT_LEAD;
  const tail = ch.tail ?? DEFAULT_TAIL;
  const start = t;
  const audioStart = start + lead;
  const end = audioStart + speechEnd + tail;
  const cues = {};
  for (const [k, phrase] of Object.entries(ch.cues || {})) cues[k] = round(audioStart + findCue(words, phrase));
  chapters.push({
    id: ch.id,
    label: ch.label || null,
    num: ch.label ? ++num : null,
    start: round(start),
    end: round(end),
    audio: { file: ch.audio, start: round(audioStart), dur: round(dur), speechStart: round(audioStart + speechStart), speechEnd: round(audioStart + speechEnd) },
    cues,
    words: words.map((w) => ({ w: w.w, t: round(audioStart + w.t0) })),
  });
  t = end;
}

const timing = { title: script.title, section: script.section, fps: 30, duration: round(t), chapters };
writeFileSync(join(epDir, 'timing.json'), JSON.stringify(timing, null, 2));
for (const c of chapters) {
  console.log(`${c.start.toFixed(2).padStart(6)}s  ${c.id.padEnd(16)} voice ${c.audio.start.toFixed(2)}→${c.audio.speechEnd.toFixed(2)}  ${Object.entries(c.cues).map(([k, v]) => `${k}@${v.toFixed(2)}`).join(' ')}`);
}
console.log(`total ${timing.duration}s`);
