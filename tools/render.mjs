#!/usr/bin/env node
// Renders an episode to MP4 (1920x1080, 30 fps) with its voiceover, frame-accurate.
// Usage: node tools/render.mjs episodes/01-tableau-de-bord [--from 10 --to 20] [--stills 5,12.4]
import { spawn, execFileSync } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import { basename, join, resolve } from 'node:path';
import { chromium } from 'playwright';
import { serve } from './serve.mjs';

const args = process.argv.slice(2);
const epDir = args[0];
const opt = (name) => {
  const i = args.indexOf(`--${name}`);
  return i > -1 ? args[i + 1] : undefined;
};
if (!epDir) {
  console.error('usage: node tools/render.mjs <episode-dir> [--from s] [--to s] [--stills t1,t2]');
  process.exit(1);
}
const ep = basename(resolve(epDir));
const outDir = resolve('out');
mkdirSync(outDir, { recursive: true });

const PORT = 5199;
const server = await serve(PORT);
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
page.on('pageerror', (e) => console.error('page error:', e.message));
page.on('console', (m) => m.type() === 'error' && console.error('console:', m.text()));
await page.goto(`http://localhost:${PORT}/episodes/${ep}/?render`);
await page.waitForFunction(() => window.__ready === true, null, { timeout: 30000 });
const duration = await page.evaluate(() => window.__duration);
const plan = await page.evaluate(() => window.__audioPlan);
const fps = await page.evaluate(() => window.__fps);

const stills = opt('stills');
if (stills) {
  for (const t of stills.split(',').map(Number)) {
    await page.evaluate((t) => window.__seek(t), t);
    const f = join(outDir, `${ep}_${t.toFixed(2)}.png`);
    await page.screenshot({ path: f });
    console.log(f);
  }
  await browser.close();
  server.close();
  process.exit(0);
}

const audioOnly = args.includes('--audio-only');
const from = +(opt('from') ?? 0);
const to = Math.min(+(opt('to') ?? duration), duration);
const partial = from > 0 || to < duration;
const videoOnly = join(outDir, `${ep}${partial ? '_part' : ''}_video.mp4`);
const ff = audioOnly ? null : spawn('ffmpeg', ['-y', '-v', 'error', '-f', 'image2pipe', '-framerate', String(fps), '-c:v', 'mjpeg', '-i', '-', '-c:v', 'libx264', '-preset', 'medium', '-crf', '17', '-pix_fmt', 'yuv420p', videoOnly], {
  stdio: ['pipe', 'inherit', 'inherit'],
});
const n0 = Math.round(from * fps);
const n1 = Math.round(to * fps);
const t0 = Date.now();
for (let n = audioOnly ? n1 : n0; n < n1; n++) {
  await page.evaluate((t) => window.__seek(t), n / fps);
  const buf = await page.screenshot({ type: 'jpeg', quality: 94 });
  if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once('drain', r));
  if (n % 60 === 0) process.stdout.write(`\rframe ${n - n0}/${n1 - n0}  (${((Date.now() - t0) / 1000).toFixed(0)}s)`);
}
if (ff) {
  ff.stdin.end();
  await new Promise((r) => ff.on('close', r));
}
await browser.close();
server.close();
console.log(`\nvideo: ${videoOnly}`);

// ---- audio mix: narration (one take) + music bed ducked under the voice + sound effects,
// each placed at its exact time from the page's audio plan, then loudness-normalised.
const root = resolve('.');
const len = to - from;
const inputs = [];
const filters = [];
const add = (src) => {
  inputs.push('-i', join(root, src));
  return inputs.length / 2; // input 0 is the video
};
const place = (i, at, label, extra = '') => {
  const d = Math.round((at - from) * 1000);
  const shift = d >= 0 ? `adelay=${d}:all=1` : `atrim=start=${-d / 1000},asetpts=PTS-STARTPTS`;
  filters.push(`[${i}:a]aresample=48000,aformat=channel_layouts=stereo,${shift}${extra}[${label}]`);
};
const mix = [];
place(add(plan.narration.src), plan.narration.at, 'voice');
filters.push('[voice]asplit=2[vo][sc]');
mix.push('[vo]');
if (plan.music) {
  const mi = add(plan.music.file);
  const fadeOut = Math.max(0, len - 2.5);
  filters.push(
    `[${mi}:a]aresample=48000,aformat=channel_layouts=stereo,atrim=start=${from},asetpts=PTS-STARTPTS,volume=${plan.music.volume},` +
      `afade=t=in:st=0:d=${from > 0 ? 0.01 : 1.2},afade=t=out:st=${fadeOut.toFixed(2)}:d=2.5[mus]`
  );
  // duck the music while the voice speaks
  filters.push('[mus][sc]sidechaincompress=threshold=0.02:ratio=5:attack=40:release=500[duck]');
  mix.push('[duck]');
} else filters.push('[sc]anullsink');
plan.sfx
  .filter((x) => x.at >= from - 0.5 && x.at < to)
  .forEach((x, k) => {
    place(add(x.src), x.at, `s${k}`, `,volume=${x.vol}`);
    mix.push(`[s${k}]`);
  });
filters.push(`${mix.join('')}amix=inputs=${mix.length}:normalize=0:duration=longest,apad,atrim=0:${len.toFixed(3)},loudnorm=I=-15:TP=-1.5:LRA=9[aout]`);
const final = join(outDir, `${ep}${partial ? '_part' : ''}.mp4`);
execFileSync(
  'ffmpeg',
  ['-y', '-v', 'error', '-i', videoOnly, ...inputs, '-filter_complex', filters.join(';'), '-map', '0:v', '-map', '[aout]', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-ar', '48000', '-shortest', final],
  { stdio: 'inherit' }
);
console.log(`final: ${final}`);
