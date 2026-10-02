#!/usr/bin/env node
// Minimal static server for the repo root (preview + render).
// Usage: node tools/serve.mjs [port]   → http://localhost:5173/episodes/01-tableau-de-bord/
import { createServer } from 'node:http';
import { createReadStream, statSync } from 'node:fs';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.mjs': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.mp3': 'audio/mpeg',
  '.woff2': 'font/woff2',
};

export function serve(port = 5173) {
  const server = createServer((req, res) => {
    let p = normalize(decodeURIComponent(new URL(req.url, 'http://x').pathname));
    if (p.endsWith('/')) p += 'index.html';
    const file = join(ROOT, p);
    try {
      if (!file.startsWith(ROOT) || !statSync(file).isFile()) throw new Error();
      res.writeHead(200, { 'content-type': TYPES[extname(file)] || 'application/octet-stream' });
      createReadStream(file).pipe(res);
    } catch {
      res.writeHead(404).end('not found');
    }
  });
  return new Promise((ok) => server.listen(port, () => ok(server)));
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const port = +(process.argv[2] || 5173);
  await serve(port);
  console.log(`http://localhost:${port}/`);
}
