#!/usr/bin/env node
// Captures d'écran rapides d'un épisode via le serveur de prévisualisation (npm run preview, port 5173),
// utilisables pendant qu'un rendu tourne (render.mjs occupe son propre port).
// Usage : node tools/shots.mjs 03-carte-fidelite 4.2 12.6 30  → out/<ep>_<t>.png
import { chromium } from 'playwright';

const [ep, ...ts] = process.argv.slice(2);
if (!ep || !ts.length) {
  console.error('usage: node tools/shots.mjs <episode> <t1> [t2 …]');
  process.exit(1);
}
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
p.on('pageerror', (e) => {
  console.error('erreur page :', e.message);
  process.exit(1);
});
await p.goto(`http://localhost:5173/episodes/${ep}/?render`);
await p.waitForFunction(() => window.__ready === true, null, { timeout: 30000 });
for (const t of ts) {
  await p.evaluate((t) => window.__seek(+t), t);
  await p.screenshot({ path: `out/${ep}_${t}.png` });
  console.log(`out/${ep}_${t}.png`);
}
await b.close();
