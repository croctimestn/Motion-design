#!/usr/bin/env node
// Builds the ElevenLabs prompt for an episode's narration (ONE continuous take) from script.json:
// chapter texts + tone tags, a [pause] between chapters, and pronunciation fixes.
// What is shown on screen keeps the real spelling ("Grow Lot"); only the voice gets "Gros Lo".
//
// Usage: node tools/prompt.mjs episodes/01-tableau-de-bord
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

// Always applied, on top of the episode's own "pronunciations"
const PRONUNCIATIONS = { 'Grow Lot': 'Gros Lo', GrowLot: 'Gros Lo', 'Grow-Lot': 'Gros Lo' };

const epDir = process.argv[2];
if (!epDir) {
  console.error('usage: node tools/prompt.mjs <episode-dir>');
  process.exit(1);
}
const script = JSON.parse(readFileSync(join(epDir, 'script.json'), 'utf8'));
const fixes = { ...PRONUNCIATIONS, ...(script.pronunciations || {}) };
const speak = (t) => Object.entries(fixes).reduce((s, [from, to]) => s.replaceAll(from, to), t);

const parts = script.chapters.map((c, i) => {
  const line = [c.tags, speak(c.text)].filter(Boolean).join(' ');
  const last = i === script.chapters.length - 1;
  return last ? line : `${line} ${c.pause || '[pause]'}`;
});
const prompt = parts.join(' ');
if (/grow\s*-?\s*lot/i.test(prompt)) throw new Error('« Grow Lot » reste dans le prompt : la prononciation sera fausse');
console.log(prompt);
