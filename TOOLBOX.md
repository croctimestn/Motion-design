# Boîte à outils

Mise à jour à chaque référence analysée. Statut : ✅ prêt · 🟡 à brancher ou à activer · ⛔ bloqué.

## Le moteur : HyperFrames

Framework open source (Apache 2.0, HeyGen) qui transforme une page HTML animée avec GSAP en vidéo MP4. Installé et testé dans le cloud : un rendu 1080p de 10 s sort en 20 s.

| Élément | Rôle | Statut |
|---|---|---|
| Projet `machine/` | base de travail, équipée de 78 briques | ✅ |
| Skill `/hyperframes` | point d'entrée de toute création vidéo | ✅ |
| Skill `/product-launch-video` | vidéos de lancement SaaS : le genre de nos références | ✅ |
| Skill `/motion-graphics` | motions courts sans voix : typo, stats, logo | ✅ |
| Skills de domaine | animation, keyframes, audio, médias, registre, CLI | ✅ |
| Registre de briques | 386 blocs et composants, dont 78 installés | ✅ |
| Rendu WebGL (3D réaliste, shaders) | pas de carte graphique dans le cloud | ⛔ cloud, ✅ sur PC |

`bash tools/setup.sh` réinstalle tout en début de session ; `bash tools/offline.sh` remplace les CDN bloqués par les copies locales de `machine/assets/vendor/`.

### Briques installées dans `machine/`

| Famille | Briques |
|---|---|
| Écrans et appareils | `browser-device-stage`, `device-frame-stage`, `multi-device-splay`, `app-showcase`, `screen-flow-carousel`, `sticky-mock-swap` |
| Caméra sur l'interface | `ui-focus-zoom`, `parallax-zoom`, `parallax-unzoom`, `camera-rig-depth-stack`, `ui-3d-reveal`, `perspective-marquee` |
| Curseur et interactions | `oversized-cursor`, `press-ripple`, `cursor-glyph-trail`, `multiplayer-cursors`, `micro-transitions`, `spotlight-card` |
| Cartes et éléments d'UI | `tilt-card`, `split-tilt-cards`, `card-resize`, `modal-morph`, `morph-swap`, `grid-card-assemble`, `notification-stack`, `gloss-sweep`, `physical-exit`, `tracing-beam`, `ai-chat-reveal`, `terminal-simulator` |
| Interactions mobiles | `touch-indicator`, `swipe-rail`, `toggle-flip`, `message-thread-reveal`, `x-post` |
| Typo et titres | `kinetic-center-build`, `kinetic-type-swap`, `soft-blur-in`, `blur-in`, `per-word-rise`, `focus-blur-resolve`, `typewriter`, `typed-prompt`, `notes-reveal`, `caption-kinetic-slam`, `shutter-slam`, `titlecard-lockup`, `vfx-text-cursor` |
| Texte synchronisé à la voix | `caption-pill-karaoke`, `mk-callout-highlight` |
| Annotations dessinées | `hw-underline`, `hw-callout-circle`, `hw-arrow`, `marker-highlight`, `inline-highlight`, `yt-feather-highlight` |
| Données et schémas | `mk-progress-stat`, `animated-bar-chart`, `flowchart`, `locked-nucleus-orbit` |
| Transitions | `whip-pan-cut`, `cut-the-curve`, `zoom-through-transition`, `iris-reveal`, `colorama-wipe`, `halftone-dissolve`, `grid-pixelate-wipe`, `cinematic-zoom`, `transitions-3d`, `transitions-scale`, `transitions-blur` |
| Fonds et finition | `motion-blur` (flou de mouvement façon After Effects), `dynamic-grid`, `mesh-gradient-bg`, `aurora-drift`, `grain-overlay` |
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
| Google Drive | récupérer tes références | ✅ (dossier partagé par lien + réseau ouvert) |
| Canva | visuels statiques | ✅ |
| HyperFrames (HeyGen) | projets hébergés chez HeyGen ; création désactivée depuis Claude Code | 🟡 |
| Figma | importer tes maquettes pour animer l'interface élément par élément | 🟡 à brancher sur claude.ai |
| Adobe | outils Adobe, dont une animation de design | 🟡 optionnel |

### Voix ElevenLabs : ce qui marche

- **Modèle `eleven_v4`** plutôt que `eleven_v3` : sur le même texte, la voix monte plus haut et varie bien plus (Léa : 245 Hz et 17 à 19 demi-tons d'amplitude, contre 189 Hz et 12 en v3), et les balises `[sighs]`, `[gasps]`, `[laughs]` sont vraiment jouées.
- **Balises de ton vives** : `[upbeat]`, `[excited]`, `[mischievously]`, `[happy]`. Éviter `[sarcastic]`, `[curious]` et `[warmly]` pour une pub, elles ralentissent la lecture.
- **Rythme** : des tirets (—) pour les respirations courtes, une seule suspension (…) pour le suspense, des MAJUSCULES sur les mots à frapper, « ?! » et « ! » en fin de phrase.
- **Noms de marque** : écrire le nom comme il se prononce, pas en API (« Grow Lot » s'écrit « Gros Lot » dans le texte lu). Vérifier ensuite par une transcription Scribe d'un extrait téléversé, car la transcription d'une génération renvoie le texte demandé, pas ce qui a été dit.
- **Niveau** : les prises v4 sortent vers −21 LUFS ; les ramener à −15 LUFS avec `loudnorm` avant le montage.
- **Changer de prise sans tout refaire** : dans la composition, le tableau `WARP` associe les temps de l'ancienne prise à ceux de la nouvelle ; les animations suivent les mots.

## Logiciels hors machine (pour toi)

| Outil | Sert à | Coût |
|---|---|---|
| Screen Studio | enregistrer l'écran avec zooms et curseur fluides (Mac) | 89 $ une fois |
| Cap | enregistreur d'écran | open source, version gratuite |
| Jitter | animer des maquettes Figma dans le navigateur | 24 $/mois |
| Rotato | appareils 3D animés | 7 $/mois ou 59 $ à vie |
| After Effects | la référence du métier, personnages et 3D | abonnement Adobe |
| [Motion](https://motion.so) (Mosaic) | agent IA qui produit des vidéos de lancement de bout en bout ; a fait 2 de nos références | payant (crédits) |

## Les 14 références du Drive : ce qu'on a trouvé

Toutes décortiquées image par image. Fiche détaillée dans `references/<dossier>/analyse.md`, styles regroupés dans `STYLES.md`.

| Vidéo | Dossier | Style | Fabrication constatée |
|---|---|---|---|
| Notion AI | `notion-ai` | 4 Aplats et interface recadrée | After Effects ; mascotte dessinée image par image (studio Buck) |
| That's Framer | `framer` | 7 Atelier de design | After Effects + visuel 3D (Spline ou Blender) |
| Superhuman | `superhuman` | 5 Ciel pastel | After Effects, ciels photo floutés |
| Loom AI | `loom-ai` | 6 UI illustrée en plan-séquence | Figma + After Effects, sphères 3D |
| Meet Airtable | `airtable` | 9 Démo classique | enregistrements d'écran + After Effects (2018) |
| Lemon Squeezy | `lemon-squeezy` | 1 Phrase + capture inclinée | After Effects, captures réelles en calque 3D |
| Front, The Human Touch | `front-human-touch` | hors machine | tournage avec mannequins, texte final |
| Uber Motion Ad Concept | `uber-concept` | 8 Pub d'app macro | Figma + After Effects, motion designer indépendant |
| SNAPSS | `snapss` | 2 Karaoké voix off | After Effects, voix off française |
| taap.it (8fccf83…) | `ref-8fccf83` | 2 Karaoké voix off | After Effects, voix off française |
| motion-launch | `motion-launch` | 11 Multi-styles avec sous-titres | produite par l'agent IA Motion (rendu HTML) |
| motion-ga-launch | `motion-ga-launch` | 11 Multi-styles avec sous-titres | remontage du précédent |
| Ornadyne-O1 | `ornadyne-o1` | 10 Bande-annonce documentaire | montage d'archives + rendus 3D produit (Blender ou C4D) |
| paces-agent-4k | `paces-agent` | 3 Minimal B2B | rendu très net en 4K, probablement HTML (à confirmer) |

Constats :
- 12 vidéos sur 14 reposent sur des interfaces animées : c'est le cœur du genre, et notre point fort puisque HyperFrames anime du vrai HTML.
- Les meilleures redessinent l'interface en version simplifiée au lieu de filmer l'écran (Loom, Uber, Paces, SNAPSS).
- Les plans-séquences sans coupe dominent les vidéos SaaS ; les coupes rapides viennent avec la voix off ou la musique.
- Au moins 2 vidéos (Motion) sont déjà produites par une IA en HTML : la qualité visée est atteignable avec notre approche.

## Outils d'analyse

| Outil | Sert à | Statut |
|---|---|---|
| `tools/decortique.py` | découper une référence en planches, transitions, palette, audio | ✅ |
| ffmpeg, ImageMagick | découpe, encodage, planches | ✅ |
| yt-dlp | télécharger une vidéo depuis un lien | 🟡 réseau ouvert, à tester |
| Recherche web | trouver les making-of et les auteurs | ✅ recherche ; ⛔ lecture de la plupart des sites |

## Techniques repérées

| Technique | Vue dans | Comment la refaire | Brique |
|---|---|---|---|
| Interface redessinée en aplats plutôt que filmée | Loom, Uber, Paces, SNAPSS | reconstruire l'écran en HTML/CSS depuis Figma ou des captures | HTML maison |
| Caméra qui se promène dans l'UI (push-in, pull-out) | Notion, Framer, Loom, Uber | zoom et translation GSAP sur un conteneur | `ui-focus-zoom`, `parallax-zoom`, `parallax-unzoom` |
| Balayage ou zoom éclair avec gros flou | Airtable, Lemon Squeezy, Uber | déplacement très rapide + flou de mouvement | `whip-pan-cut`, `zoom-through-transition`, `motion-blur` |
| Capture inclinée en perspective qui dérive | Lemon Squeezy, SNAPSS | rotation 3D CSS légère + lente translation | `tilt-card`, `ui-3d-reveal` |
| Texte qui monte derrière un masque | Notion | `yPercent` dans un conteneur `overflow:hidden` | `per-word-rise` |
| Texte qui sort du flou mot par mot | Superhuman, Motion GA | opacité + flou + légère montée par mot | `blur-in`, `soft-blur-in`, `focus-blur-resolve` |
| Texte synchronisé à la voix (gris → noir) | SNAPSS, taap.it | voix ElevenLabs + horodatage des mots | `caption-pill-karaoke`, `mk-callout-highlight` |
| Machine à sous de mots ou pastilles | Notion | liste verticale qui défile, voisins floutés | `kinetic-type-swap` |
| Frappe au clavier (prompt, question) | Framer, Motion, Ornadyne, Paces | caractère par caractère + curseur | `typewriter`, `typed-prompt` |
| Mots géants plein cadre sur le temps | Uber, Motion, SNAPSS | un mot par temps fort, coupe sèche | `caption-kinetic-slam`, `shutter-slam` |
| Soulignement, ellipse, surligneur dessinés | Notion, Lemon Squeezy, Loom | tracé SVG animé | `hw-underline`, `hw-callout-circle`, `marker-highlight` |
| Étiquette qui sort de l'UI (Approved, Paid) | Lemon Squeezy, Paces | pilule qui jaillit avec rebond | `notification-stack` |
| Curseur géant, clic, doigt | Notion, Framer, Loom, taap.it | curseur animé + onde de clic | `oversized-cursor`, `press-ripple`, `touch-indicator` |
| Curseurs collaboratifs nommés | Framer, Paces | curseurs avec étiquette | `multiplayer-cursors` |
| Connecteurs en pointillés entre éléments | SNAPSS, Paces | tracé SVG en pointillés | `tracing-beam` |
| Icônes en orbite autour d'un sujet | Superhuman, Paces | satellites sur un cercle | `locked-nucleus-orbit` |
| Téléphones et ordinateurs en perspective | SNAPSS, Notion, Uber, Airtable | maquettes CSS 3D | `device-frame-stage`, `multi-device-splay`, `app-showcase` |
| Fond dégradé doux animé | Superhuman, SNAPSS, Loom | dégradés radiaux qui dérivent | `mesh-gradient-bg`, `aurora-drift` |
| Fond à grille légère | SNAPSS, taap.it, Framer | grille CSS | `dynamic-grid` |
| Volet circulaire lumineux | Superhuman, Paces | `clip-path: circle()` qui s'ouvre | `iris-reveal` |
| Conversation de messages | Motion | bulles qui s'empilent | `message-thread-reveal` |
| Chiffres et graphiques qui se construisent | Paces, Motion | compteurs, barres, schémas | `mk-progress-stat`, `animated-bar-chart`, `flowchart` |
| Grain et cadre vintage | Ornadyne | bruit animé + vignettage | `grain-overlay`, `yt-screen-warp` |
| Cadre de sélection avec poignées | Framer, Motion | div bordée + 4 carrés aux coins | à créer |
| Sphère de points qui tourne | Paces | points en canvas 2D | à créer |
| Profondeur de champ simulée (bulles, pilules) | Loom | taille + flou selon la distance | `camera-rig-depth-stack` + CSS |
