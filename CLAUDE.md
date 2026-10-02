# Grow Lot — Motion design

Vidéos explicatives animées des interfaces du SaaS Grow Lot (voir README.md pour le pipeline).

## Charte graphique : règles obligatoires

- **Toujours le logo officiel**, jamais un logo redessiné ou approximé.
  Source : Google Drive « GROW LOT / Brand Guidline (DA) - Grow Lot / Grow Lot - Brand Guideline / Ressources / Logo ».
  - `assets/brand/logo-typo.svg` ← « Logo typo.svg » (logotype, rempli en `currentColor`)
  - `assets/brand/logo-icon.svg` ou `.png` ← « Icône » (étoile jaune expressive avec des yeux)
  - Dans le code : `M.logo({ h })` uniquement. `Motion.init()` échoue si un fichier manque : ne jamais contourner.
- Couleurs : violet principal `#654a98`, jaune principal `#fdd643`, orange secondaire `#eb5d3b`,
  blanc complément `#fffbee`, compléments `#faed3c` `#f18767` `#ccc9c0` `#c299ff` (tokens `--brand-*` dans `engine/gl.css`).
- Typo : **Poppins** (Bold pour logo et grands titres, Regular pour le texte). Gambarino seulement en très grand décoratif.
- Signatures de marque : « Faites grandir l'engagement ! », « L'engagement qui fait la différence ».

## Voix et son

- Voix ElevenLabs « Lea » `KSyQzmsYhFbuOhqj1Xxv`, modèle `eleven_v4`, **une seule prise continue** par épisode,
  balisée `[pause]` entre chapitres ; 4 variantes, garder celle aux pauses les plus nettes, vérifier par Scribe.
- Musique `assets/music/`, bruitages `assets/sfx/` (générés ElevenLabs), mixés par `tools/render.mjs`.
