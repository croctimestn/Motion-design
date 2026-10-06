#!/usr/bin/env bash
# Prépare une session cloud (ou un PC) pour produire des vidéos.
# À lancer une fois au début de chaque session : bash tools/setup.sh
set -euo pipefail
cd "$(dirname "$0")/.."

echo "→ Skills HyperFrames (routeur, domaines, lancement produit, motion graphics)"
npx -y hyperframes@latest skills update product-launch-video motion-graphics >/dev/null

echo "→ Navigateur de rendu"
npx -y hyperframes@latest browser ensure >/dev/null

echo "→ motion-anything (403 recettes d'animation) et skills GSAP officiels"
[ -d vendor/motion-anything ] || git clone --depth 1 -q https://github.com/nexu-io/motion-anything vendor/motion-anything
mkdir -p ~/.claude/skills
for s in motion-anything web-to-design-md; do cp -r "vendor/motion-anything/skills/$s" ~/.claude/skills/; done
for s in gsap-core gsap-timeline gsap-plugins gsap-utils gsap-performance; do cp -r "vendor/motion-anything/skills/gsap/$s" ~/.claude/skills/; done

echo "→ Bibliothèques locales pour le projet machine/"
bash tools/offline.sh >/dev/null

echo "→ yt-dlp"
command -v yt-dlp >/dev/null || pip install --quiet --break-system-packages yt-dlp

npx -y hyperframes@latest doctor | sed 's/\x1b\[[0-9;]*m//g' | grep -E "✓|✗" | grep -E "Chrome|FFmpeg|Node" || true
echo "Prêt."
