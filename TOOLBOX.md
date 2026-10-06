# Boîte à outils

Mise à jour à chaque référence analysée. Statut : ✅ prêt · 🟡 à brancher ou à activer · ⛔ bloqué.

## Le moteur : HyperFrames

Framework open source (Apache 2.0, HeyGen) qui transforme une page HTML animée avec GSAP en vidéo MP4. Installé et testé dans le cloud : un rendu 1080p de 10 s sort en 20 s.

| Élément | Rôle | Statut |
|---|---|---|
| Projet `machine/` | base de travail, déjà équipée de 45 briques | ✅ |
| Skill `/hyperframes` | point d'entrée de toute création vidéo | ✅ |
| Skill `/product-launch-video` | vidéos de lancement SaaS : le genre de nos références | ✅ |
| Skill `/motion-graphics` | motions courts sans voix : typo, stats, logo | ✅ |
| Skills de domaine | animation, keyframes, audio, médias, registre, CLI | ✅ |
| Registre de briques | 386 blocs et composants, dont 45 installés | ✅ |
| Rendu WebGL (3D réaliste, shaders) | pas de carte graphique dans le cloud | ⛔ cloud, ✅ sur PC |

`bash tools/setup.sh` réinstalle tout en début de session ; `bash tools/offline.sh` remplace les CDN bloqués par les copies locales de `machine/assets/vendor/`.

### Briques installées dans `machine/`

| Famille | Briques |
|---|---|
| Écrans et appareils | `browser-device-stage`, `device-frame-stage`, `multi-device-splay`, `app-showcase`, `screen-flow-carousel`, `sticky-mock-swap` |
| Caméra sur l'interface | `ui-focus-zoom`, `parallax-zoom`, `parallax-unzoom`, `camera-rig-depth-stack`, `ui-3d-reveal`, `perspective-marquee` |
| Curseur et interactions | `oversized-cursor`, `press-ripple`, `cursor-glyph-trail`, `multiplayer-cursors`, `micro-transitions`, `spotlight-card` |
| Cartes et éléments d'UI | `tilt-card`, `split-tilt-cards`, `card-resize`, `modal-morph`, `morph-swap`, `grid-card-assemble`, `notification-stack`, `gloss-sweep`, `physical-exit`, `tracing-beam`, `ai-chat-reveal`, `terminal-simulator` |
| Typo et titres | `kinetic-center-build`, `soft-blur-in`, `titlecard-lockup`, `vfx-text-cursor` |
| Transitions | `zoom-through-transition`, `colorama-wipe`, `halftone-dissolve`, `grid-pixelate-wipe`, `cinematic-zoom`, `transitions-3d`, `transitions-scale` |
| Finition | `motion-blur` (flou de mouvement façon After Effects), `dynamic-grid` (fond grille) |
| WebGL, rendu sur PC | `macos-tahoe-liquid-glass`, `liquid-glass-widgets` |

## Bibliothèques et skills complémentaires

| Outil | Sert à | Coût | Statut |
|---|---|---|---|
| [motion-anything](https://github.com/nexu-io/motion-anything) | 403 recettes d'animation (texte, fonds, transitions, UI), 58 modèles vidéo, 59 chartes graphiques | gratuit, Apache 2.0 | ✅ dans `vendor/` |
| Skill `/motion-anything` | choisir la bonne recette à partir d'une intention | gratuit | ✅ |
| Skill `/web-to-design-md` | extraire couleurs, typo et animations d'un site | gratuit | ✅ (site à autoriser dans le réseau) |
| Skills GSAP officiels | timelines, easings, plugins (SplitText, MorphSVG, CustomEase…) | gratuit, même commercial | ✅ |
| Remotion | autre moteur vidéo (React) | gratuit jusqu'à 3 salariés | 🟡 non installé, HyperFrames suffit |

## Connecteurs

| Connecteur | Sert à | Statut |
|---|---|---|
| ElevenLabs | voix off (toujours), musique, bruitages, transcription | ✅ |
| Google Drive | récupérer tes références | ✅ lecture des listes ; ⛔ téléchargement des vidéos (réseau) |
| Canva | visuels statiques | ✅ |
| HyperFrames (HeyGen) | projets hébergés chez HeyGen ; création désactivée depuis Claude Code | 🟡 |
| Figma | importer tes maquettes pour animer l'interface élément par élément | 🟡 à brancher sur claude.ai |
| Adobe | outils Adobe, dont une animation de design | 🟡 optionnel |

## Logiciels hors machine (pour toi)

| Outil | Sert à | Coût |
|---|---|---|
| Screen Studio | enregistrer l'écran avec zooms et curseur fluides (Mac) | 89 $ une fois |
| Cap | enregistreur d'écran | open source, version gratuite |
| Jitter | animer des maquettes Figma dans le navigateur | 24 $/mois |
| Rotato | appareils 3D animés | 7 $/mois ou 59 $ à vie |
| After Effects | la référence du métier, personnages et 3D | abonnement Adobe |
| [Motion](https://motion.so) (Mosaic) | agent IA qui produit des vidéos de lancement de bout en bout ; a fait 2 de nos références | payant (crédits) |

## Les 14 références du Drive : outils anticipés

Hypothèses tirées du genre, des marques et de la recherche web. À confirmer image par image dès que les vidéos sont téléchargeables.

| Vidéo | Ce qu'on y attend | Outils probables à l'origine | Nos briques pour le refaire |
|---|---|---|---|
| Notion AI | interface en cartes flottantes, illustrations Notion, assistant IA | After Effects ; le studio Buck a animé le personnage de l'assistant Notion AI | `ui-focus-zoom`, `ai-chat-reveal`, `soft-blur-in`, illustrations en SVG ou Lottie |
| That's Framer | construction d'un site en accéléré, curseur rapide, composants qui se placent | After Effects ou Framer lui-même | `oversized-cursor`, `press-ripple`, `modal-morph`, `card-resize`, `screen-flow-carousel` |
| Superhuman | interface sombre, raccourcis clavier, mails qui défilent | After Effects | `notification-stack`, `micro-transitions`, `kinetic-center-build`, `motion-blur` |
| Loom AI | enregistrement d'écran avec bulle caméra | Loom, After Effects | `browser-device-stage`, `ai-chat-reveal`, `ui-focus-zoom` |
| Meet Airtable | grilles et tableaux qui se construisent, blocs colorés | After Effects | `grid-card-assemble`, `dynamic-grid`, `tracing-beam` |
| Lemon Squeezy affiliés | tableau de bord, chiffres qui montent, cartes colorées | After Effects | `tilt-card`, `spotlight-card`, `gloss-sweep`, compteur GSAP |
| Front, The Human Touch | mélange de vraies images et d'interface | tournage + After Effects | briques UI + vidéo filmée à fournir |
| Uber Motion Ad Concept | mouvement de gauche à droite, rythme calqué sur l'app (charte motion Uber) | After Effects | `device-frame-stage`, `physical-exit`, carte animée |
| SNAPSS cartes de fidélité | cartes de wallet en 3D, téléphones | After Effects ou Rotato | `device-frame-stage`, `multi-device-splay`, `tilt-card` |
| motion-launch | vidéo de lancement de Motion | faite avec Motion (agent IA) | même démarche que nous : `/product-launch-video` |
| motion-ga-launch | sortie officielle de Motion | faite avec Motion (agent IA) | idem |
| Ornadyne-O1 | inconnu | à identifier | — |
| paces-agent-4k | inconnu, probablement une démo d'agent IA | à identifier | — |
| 8fccf83dbc2df98334ded8d489d02603 | inconnu | à identifier | — |

## Outils d'analyse

| Outil | Sert à | Statut |
|---|---|---|
| `tools/decortique.py` | découper une référence en planches, transitions, palette, audio | ✅ |
| ffmpeg, ImageMagick | découpe, encodage, planches | ✅ |
| yt-dlp | télécharger une vidéo depuis un lien | ⛔ sites vidéo bloqués par le réseau |
| Recherche web | trouver les making-of et les auteurs | ✅ recherche ; ⛔ lecture de la plupart des sites |

## Techniques repérées

Se remplit au fil des analyses image par image.

| Technique | Vue dans | Comment la refaire | Outil |
|---|---|---|---|
