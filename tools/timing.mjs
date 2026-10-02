#!/usr/bin/env node
// Builds episodes/<ep>/timing.json from script.json + ONE continuous narration take.
// The narration is generated in a single ElevenLabs take (natural prosody), with [pause] tags
// between chapters. This tool finds those pauses, cuts the take into chapters, then aligns words
// inside each chapter on the shorter pauses (commas). The video timeline IS the audio timeline.
//
// Usage: node tools/timing.mjs episodes/01-tableau-de-bord
import { execFileSync, spawnSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

const epDir = process.argv[2];
if (!epDir) {
  console.error('usage: node tools/timing.mjs <episode-dir>');
  process.exit(1);
}
const script = JSON.parse(readFileSync(join(epDir, 'script.json'), 'utf8'));
const LEAD = script.lead ?? 1.0; // video time before the narration starts
// Default narration pace for new episodes: ep. 01 shipped at ×1.10, then −11 % was requested
// → 1.10 × 0.89 ≈ ×0.98 on the raw ElevenLabs take. An episode can still set voice.tempo.
const DEFAULT_TEMPO = 0.98;
const TAIL = script.tail ?? 1.5; // video time after the narration ends

const round = (x) => Math.round(x * 1000) / 1000;
const norm = (s) => s.replace(/-/g, '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9' ]+/g, ' ').trim();
const weight = (s) => s.replace(/[^\p{L}\p{N}]/gu, '').length + 2;
const textWeight = (t) => t.split(/\s+/).reduce((a, w) => a + weight(w), 0);

function probeDuration(file) {
  return parseFloat(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', file]).toString());
}

function detectSilences(file, minDur = 0.06) {
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
  // one pause per punctuation mark, each near its expected spot: map them directly; otherwise match by
  // position (a missed comma pause must not shift every following phrase)
  const direct = inner.length === exp.length && inner.every((p, i) => Math.abs((p.start + p.end) / 2 - exp[i]) < 1);
  const m = direct ? inner : matchBoundaries(exp, inner, { maxDev: 1.5, durWeight: 2, skip: 1.5 });
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

// ---------------------------------------------------------------- vrais temps des mots (words.json)
// tools/words.py reconnaît la narration et donne l'instant réel de chaque mot. On aligne les mots du
// script sur les mots reconnus (alignement de séquences, tolérant aux mots mal reconnus ou fusionnés) ;
// un mot non apparié est interpolé entre ses voisins appariés.
const bare = (s) => norm(s).replace(/[' ]/g, '');
function lev(a, b) {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return d[a.length][b.length];
}
function sim(a, b) {
  if (!a || !b) return 0;
  const l = 1 - lev(a, b) / Math.max(a.length, b.length);
  const p = a.startsWith(b) || b.startsWith(a) ? 0.55 + 0.45 * (Math.min(a.length, b.length) / Math.max(a.length, b.length)) : 0;
  return Math.max(l, p);
}
function realTimes(scriptWords, rec) {
  const A = scriptWords.map(bare);
  const B = rec.map((r) => bare(r.w));
  const n = A.length;
  const m = B.length;
  const GAP = -0.25;
  const S = Array.from({ length: n + 1 }, (_, i) => Float64Array.from({ length: m + 1 }, (_, j) => (i + j) * GAP));
  const P = Array.from({ length: n + 1 }, () => new Int8Array(m + 1));
  for (let i = 1; i <= n; i++)
    for (let j = 1; j <= m; j++) {
      const s = sim(A[i - 1], B[j - 1]);
      const opts = [S[i - 1][j - 1] + (s >= 0.5 ? s : -1), S[i - 1][j] + GAP, S[i][j - 1] + GAP];
      const k = opts.indexOf(Math.max(...opts));
      S[i][j] = opts[k];
      P[i][j] = k;
    }
  const t = new Array(n).fill(null);
  for (let i = n, j = m; i > 0 && j > 0; ) {
    if (P[i][j] === 0) {
      if (sim(A[i - 1], B[j - 1]) >= 0.5) t[i - 1] = rec[j - 1].t;
      i--;
      j--;
    } else if (P[i][j] === 1) i--;
    else j--;
  }
  return t;
}

function findCue(words, phrase) {
  const target = norm(phrase).split(' ').map((t) => t.replace(/^[a-z]'/, ''));
  const ws = words.map((w) => norm(w.w).replace(/^[a-z]'/, ''));
  for (let i = 0; i < ws.length; i++) {
    if (target.every((t, j) => ws[i + j] !== undefined && ws[i + j].startsWith(t))) return words[i].t;
  }
  throw new Error(`cue "${phrase}" not found in: ${words.map((w) => w.w).join(' ')}`);
}

// ---------------------------------------------------------------- main
const file = join(epDir, script.voice.file);
// Pace adjustment: narration = raw ElevenLabs take played at `tempo` (pitch preserved)
if (script.voice.take) {
  const tempo = script.voice.tempo ?? DEFAULT_TEMPO;
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
const wordsFile = join(epDir, dirname(script.voice.file), 'words.json');
const rec = existsSync(wordsFile) ? JSON.parse(readFileSync(wordsFile, 'utf8')).words : null;
const spans = chapters.map((c, i) => [i === 0 ? speechStart : chPauses[i - 1].end, i === chapters.length - 1 ? speechEnd : chPauses[i].start]);
// estimation (pauses + longueur des mots), remplacée mot à mot par les vrais temps quand words.json existe
const est = chapters.map((c, i) => alignWords(c.text, ...spans[i], pauses));
if (rec) {
  const flat = est.flat();
  const real = realTimes(flat.map((w) => w.w), rec);
  let k = 0;
  let hits = 0;
  est.forEach((ws, ci) => {
    const [s0, s1] = spans[ci];
    const idx = ws.map(() => k++);
    // garder les temps réels cohérents (dans le chapitre, croissants), interpoler les autres
    let last = s0 - 0.01;
    const tt = idx.map((g) => {
      const v = real[g];
      if (v != null && v >= last && v >= s0 - 0.15 && v <= s1 + 0.05) {
        // un mot qui démarre juste après une pause démarre exactement à la fin de cette pause
        const p = pauses.find((x) => x.end <= v + 0.05 && x.end >= v - 0.3);
        const r = Math.max(s0, p ? p.end : v);
        last = r;
        return r;
      }
      return null;
    });
    ws.forEach((w, j) => {
      if (tt[j] != null) {
        w.t = tt[j];
        hits++;
        return;
      }
      // mot non reconnu : interpolé entre ses voisins calés (ou les bords du chapitre)
      const p = tt.slice(0, j).findLastIndex((x) => x != null);
      const q = tt.findIndex((x, z) => z > j && x != null);
      if (p < 0 && q < 0) return; // aucun mot calé dans le chapitre : on garde l'estimation
      const t0 = p >= 0 ? tt[p] : s0;
      const t1 = q >= 0 ? tt[q] : s1;
      const j0 = p >= 0 ? p : -1;
      const j1 = q >= 0 ? q : ws.length;
      w.t = t0 + ((t1 - t0) * (j - j0)) / (j1 - j0);
    });
  });
  console.log(`mots : ${hits}/${flat.length} calés sur la reconnaissance vocale (words.json)`);
} else console.log('mots : estimés (lancer tools/words.py pour les vrais temps)');
const out = chapters.map((c, i) => {
  const [s0, s1] = spans[i];
  const words = est[i];
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
