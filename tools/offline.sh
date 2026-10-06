#!/usr/bin/env bash
# Remplace les bibliothèques chargées depuis un CDN par leurs copies locales
# dans machine/assets/vendor/. À relancer après chaque `hyperframes add`.
set -euo pipefail
cd "$(dirname "$0")/../machine"

fichiers=$(grep -rlE "cdn.jsdelivr.net/npm/(gsap|three)|cdnjs.cloudflare.com/ajax/libs/three.js" index.html compositions 2>/dev/null || true)
[ -z "$fichiers" ] && { echo "Rien à remplacer."; exit 0; }

for f in $fichiers; do
  sed -i -E \
    -e 's#https://cdn\.jsdelivr\.net/npm/gsap@[0-9.]+/dist/([A-Za-z]+\.min\.js)#/assets/vendor/\1#g' \
    -e 's#https://cdn\.jsdelivr\.net/npm/three@[0-9.]+/build/three\.min\.js#/assets/vendor/three.min.js#g' \
    -e 's#https://cdn\.jsdelivr\.net/npm/three@[0-9.]+/examples/js/loaders/([A-Za-z]+\.js)#/assets/vendor/\1#g' \
    -e 's#https://cdnjs\.cloudflare\.com/ajax/libs/three\.js/r[0-9]+/three\.min\.js#/assets/vendor/three.min.js#g' \
    "$f"
  echo "  $f"
done
