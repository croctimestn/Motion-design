# Grow Lot — Motion design

Vidéos explicatives animées (16:9, 1920×1080, 30 fps) de chaque interface du SaaS Grow Lot,
avec voix off ElevenLabs (voix « Lea », id `KSyQzmsYhFbuOhqj1Xxv`) synchronisée à l'image.

## Principe

Chaque interface est **recréée en HTML** (données d'exemple) puis animée : caméra qui zoome/panne,
spotlight + tooltips, curseur et clics, compteurs, badge de chapitre et barre de progression.

**Son (ElevenLabs) :**
- **Voix off en une seule prise continue** (`eleven_v4`, voix Lea) : intonation naturelle, pas de raccords.
  Le texte est balisé : `[warmly]` pour le ton, `[pause]` entre chaque chapitre, `…` pour les respirations,
  `[long pause]` avant la conclusion. On génère 4 prises, on garde celle dont les pauses sont les plus nettes,
  et on la vérifie par transcription (Scribe).
- **Musique de fond** générée (`eleven_music_v2_5`, instrumentale), automatiquement baissée sous la voix (sidechain).
- **Bruitages** générés (`eleven_text_to_sound_v2`) : clic, pop d'info-bulle, whoosh de transition, sting logo.
  Ils sont posés automatiquement par le moteur (chaque `click`, `tip`, `camera(..., {whoosh})`).

**Synchro :** `tools/timing.mjs` détecte les pauses de la prise, découpe les chapitres sur les `[pause]`,
puis cale les mots sur les virgules. Les animations sont déclenchées sur ces repères (cues) : la vidéo suit la voix.

```
engine/gl.css        design system Grow Lot (sidebar, topbar, cartes, tooltips, badges…)
engine/motion.js     runtime : shell de l'app, caméra, spot, tip, curseur, count, badges, sfx
assets/music, sfx    musique et bruitages ElevenLabs partagés par tous les épisodes
episodes/<ep>/
  script.json        prompt ElevenLabs balisé + texte de chaque chapitre + cues
  voice/narration.mp3  la prise retenue
  timing.json        généré : chapitres, cues, mots (en secondes)
  index.html         réplique de l'interface + chorégraphie
tools/timing.mjs     narration → timing.json
tools/render.mjs     rendu image par image (Playwright) + mixage voix/musique/bruitages → out/<ep>.mp4
tools/serve.mjs      serveur local pour la prévisualisation
```

## Fabriquer un épisode

1. Écrire `episodes/<ep>/script.json` (un chapitre = une phrase ; cues = débuts de segments après une virgule).
2. Générer la narration complète en une prise (`eleven_v4`, 4 variantes) avec `[pause]` entre chapitres,
   garder la meilleure dans `voice/narration.mp3`, vérifier avec Scribe.
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
| 05 | Réputation | ✅ |
| 06 | Boutique | ✅ |
