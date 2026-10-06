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
  Ils sont posés automatiquement par le moteur (`click`, `tip`, `camera(..., {whoosh})`). Le clic reste rare :
  au plus un toutes les 6 s (`click(at, { sound: true })` force un clic important, `{ sound: false }` le coupe).

**Synchro :** `tools/timing.mjs` détecte les pauses de la prise et découpe les chapitres sur les `[pause]`.
Les mots sont calés sur leur **instant réel** : `tools/words.py` reconnaît la narration en local
(sherpa-onnx, modèle français téléchargé une fois dans `.cache/asr/`) et écrit `voice/words.json` ;
`timing.mjs` aligne chaque mot du script sur le mot reconnu (un mot non reconnu est interpolé entre ses voisins).
Les animations sont déclenchées sur ces repères (cues) : la vidéo suit la voix au mot près.

```
engine/gl.css        design system Grow Lot (sidebar, topbar, cartes, tooltips, badges…)
engine/motion.js     runtime : shell de l'app, caméra, spot, tip, curseur, count, badges, sfx
assets/music, sfx    musique et bruitages ElevenLabs partagés par tous les épisodes
episodes/<ep>/
  script.json        prompt ElevenLabs balisé + texte de chaque chapitre + cues
  voice/take.mp3     la prise ElevenLabs brute retenue
  voice/narration.mp3  la prise au bon tempo (générée par timing.mjs)
  voice/words.json   instants réels des mots (généré par tools/words.py)
  timing.json        généré : chapitres, cues, mots (en secondes)
  index.html         réplique de l'interface + chorégraphie
tools/words.py       narration → voice/words.json (reconnaissance vocale locale, pip install sherpa-onnx)
tools/timing.mjs     narration (+ words.json) → timing.json
tools/render.mjs     rendu image par image (Playwright) + mixage voix/musique/bruitages → out/<ep>.mp4
tools/serve.mjs      serveur local pour la prévisualisation
```

## Fabriquer un épisode

1. Écrire `episodes/<ep>/script.json` (un chapitre = une phrase ; cues = débuts de segments après une virgule).
2. Générer la narration complète en une prise (`eleven_v4`, 4 variantes) avec `[pause]` entre chapitres,
   garder la meilleure dans `voice/narration.mp3`, vérifier avec Scribe.
3. `npm run timing -- episodes/<ep>` (crée `narration.mp3`), puis `python3 tools/words.py episodes/<ep>`,
   puis de nouveau `npm run timing -- episodes/<ep>` pour caler les mots sur leurs vrais instants.
4. Construire `index.html` (réplique de l'interface + animations calées sur `ch(id).cues.xxx`).
5. Prévisualiser : `npm run preview` puis http://localhost:5173/episodes/<ep>/ (espace = lecture, `?t=12` = image à 12 s).
6. Rendu : `npm run render -- episodes/<ep>` → `out/<ep>.mp4`
   (`--stills 5,12.4` pour des captures, `--from/--to` pour un extrait, `--audio-only` pour remixer le son).

## Épisodes

| # | Interface | Statut |
|---|-----------|--------|
| 01 | Tableau de bord (jeux + carte de fidélité) | 🔄 v2 : visuel prêt, voix en attente de crédits ElevenLabs |
| 02 | Clients | ✅ |
| 03 | Grow Labs : carte de fidélité Wallet | ✅ |
| 04 | Marketing | à faire |
| 05 | Réputation | ✅ |
| 06 | Boutique | ✅ |
