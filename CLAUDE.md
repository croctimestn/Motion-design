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

## Données affichées : anonymat obligatoire

- **Aucune donnée réelle à l'écran** : prénoms, noms, e-mails, téléphones, avis, codes, établissements clients
  vus dans les enregistrements du SaaS sont toujours remplacés par des données fictives
  (ex. Lucas Martin, lucas.martin@gmail.com, 06 12 34 56 78 ; établissement de démo « SauceQuiPeut »).
- Ne jamais recopier le texte d'un vrai avis client ; réécrire un avis générique.

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
- **Bruit de clic : de temps en temps seulement**, jamais à chaque action (demande de Timéo). Le moteur garde au plus
  un clic sonore toutes les 6 s ; réserver `click(at, { sound: true })` aux actions clés (créer, publier…).

## Synchro voix / image

- **Toujours caler sur les vrais instants des mots** : après `timing.mjs`, lancer `python3 tools/words.py episodes/<ep>`
  puis relancer `timing.mjs` (il doit afficher « mots : N/M calés sur la reconnaissance vocale »).
  Sans `words.json`, les mots sont seulement estimés et la synchro peut dériver d'une seconde.
- Vérifier le décalage global de la vidéo finale (enveloppe voix vs `narration.mp3`) : il doit valoir `lead` (1,6 s).
