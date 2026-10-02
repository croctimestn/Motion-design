# Grow Lot — Motion design

Vidéos explicatives animées (16:9, 1920×1080, 30 fps) de chaque interface du SaaS Grow Lot,
avec voix off ElevenLabs (voix « Lea », id `KSyQzmsYhFbuOhqj1Xxv`) synchronisée à l'image.

## Principe

Chaque interface est **recréée en HTML** (données d'exemple) puis animée : caméra qui zoome/panne,
spotlight + tooltips, curseur et clics, compteurs, badge de chapitre et barre de progression.
La timeline est **calculée à partir des durées réelles des voix** : l'image suit la voix, jamais l'inverse.

```
engine/gl.css        design system Grow Lot (sidebar, topbar, cartes, tooltips, badges…)
engine/motion.js     runtime : shell de l'app, caméra, spot, tip, curseur, count, badges
episodes/<ep>/
  script.json        texte de chaque chapitre + "cues" (mots déclencheurs d'animations)
  voice/*.mp3        voix ElevenLabs, un fichier par chapitre
  timing.json        généré : début de chaque chapitre, voix, cues (en secondes)
  index.html         réplique de l'interface + chorégraphie
tools/timing.mjs     script.json + voix → timing.json (détection des pauses pour caler les mots)
tools/render.mjs     rendu image par image (Playwright) + mixage des voix → out/<ep>.mp4
tools/serve.mjs      serveur local pour la prévisualisation
```

## Fabriquer un épisode

1. Écrire `episodes/<ep>/script.json` (un chapitre = une phrase de voix off + un badge).
2. Générer chaque phrase avec ElevenLabs (`eleven_multilingual_v2`, voix Lea) → `voice/NN-id.mp3`.
3. `npm run timing -- episodes/<ep>`
4. Construire `index.html` (réplique de l'interface + animations calées sur `ch(id).cues.xxx`).
5. Prévisualiser : `npm run preview` puis http://localhost:5173/episodes/<ep>/ (espace = lecture, `?t=12` = image à 12 s).
6. Rendu : `npm run render -- episodes/<ep>` → `out/<ep>.mp4`
   (`--stills 5,12.4` pour des captures, `--from/--to` pour un extrait, `--audio-only` pour remixer le son).

## Épisodes

| # | Interface | Statut |
|---|-----------|--------|
| 01 | Tableau de bord | ✅ |
| 02 | Clients | à faire |
| 03 | Grow Labs | à faire |
| 04 | Marketing | à faire |
| 05 | Réputation | à faire |
| 06 | Boutique | à faire |
