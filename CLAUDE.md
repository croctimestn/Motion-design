# Grow Lot — Motion design

Vidéos explicatives animées des interfaces du SaaS Grow Lot (voir README.md pour le pipeline).

## Charte graphique : règles obligatoires

- **Toujours le logo officiel**, jamais un logo redessiné ou approximé.
  Source : Google Drive « GROW LOT / Brand Guidline (DA) - Grow Lot / Grow Lot - Brand Guideline / Ressources / Logo ».
  - `assets/brand/logo-typo.svg` ← « Logo typo.svg » (logotype, rempli en `currentColor`)
  - `assets/brand/logo-icon.png` ← étoile jaune expressive avec des yeux, détourée (fond transparent) depuis le
    lockup officiel fourni par Timéo (« Grow Lot / Brand » sur son bureau). Un `logo-icon.svg` officiel, s'il est ajouté, est prioritaire.
  - Proportions du lockup : hauteur du logotype = 31 % de la hauteur de l'étoile, espace = 14 %.
  - Dans le code : `M.logo({ h })` uniquement. `Motion.init()` échoue si un fichier manque : ne jamais contourner.
- Couleurs : violet principal `#654a98`, jaune principal `#fdd643`, orange secondaire `#eb5d3b`,
  blanc complément `#fffbee`, compléments `#faed3c` `#f18767` `#ccc9c0` `#c299ff` (tokens `--brand-*` dans `engine/gl.css`).
- Typo : **Poppins** (Bold pour logo et grands titres, Regular pour le texte). Gambarino seulement en très grand décoratif.
- Signatures de marque : « Faites grandir l'engagement ! », « L'engagement qui fait la différence ».

## Voix et son

- **Prononciation : dans tout texte envoyé à ElevenLabs, écrire « Gros Lo » (jamais « Grow Lot »).**
  À l'écran, le nom s'écrit toujours « Grow Lot ». Le prompt se construit avec `node tools/prompt.mjs <ep>`
  (applique les prononciations et refuse un prompt contenant encore « Grow Lot »).
- **Ton : dynamique, souriant, rythmé (style créatrice UGC), jamais lent ni monotone.**
  Balises `[excited]`, `[upbeat]`, `[enthusiastic]`, `[confident]` en tête de chapitre, points d'exclamation,
  phrases courtes ; éviter les « … » qui ralentissent le débit.
- **Débit : ×0,98 par défaut** (= le ×1,10 de l'épisode 01 baissé de 11 %, demande de Timéo).
  Garder la prise brute dans `voice/take.mp3` ; `timing.mjs` produit `narration.mp3` au bon tempo.
  Ne mettre `voice.tempo` dans un script.json que pour une exception.

- Voix ElevenLabs « Lea » `KSyQzmsYhFbuOhqj1Xxv`, modèle `eleven_v4`, **une seule prise continue** par épisode,
  balisée `[pause]` entre chapitres ; 4 variantes, garder celle aux pauses les plus nettes, vérifier par Scribe.
- Musique `assets/music/`, bruitages `assets/sfx/` (générés ElevenLabs), mixés par `tools/render.mjs`.
