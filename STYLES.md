# Catalogue de styles

Chaque style vient d'une ou plusieurs vidéos de référence décortiquées (fiches dans `references/<nom>/analyse.md`). Pour lancer un motion, choisis un style : la fiche dit ce que tu dois m'envoyer et avec quelles briques je le construis.

| # | Style | Référence | En une phrase | Idéal pour |
|---|---|---|---|---|
| 1 | Phrase + capture inclinée | Lemon Squeezy | aplat de couleur, une phrase, puis une capture en perspective qui dérive | annonce de fonctionnalité rapide |
| 2 | Karaoké voix off | SNAPSS, taap.it | le texte suit la voix mot par mot, pilules noires, grille légère | pub réseaux sociaux en français |
| 3 | Minimal B2B | Paces | beaucoup de blanc, un élément à la fois, une seule couleur | logiciel pro, agent IA, chiffres |
| 4 | Aplats et interface recadrée | Notion AI | titres noirs sur blanc, UI coupée par le cadre sur aplats vifs | lancement grand public, produit à personnalité |
| 5 | Ciel pastel | Superhuman | dégradés nuageux, texte qui sort du flou, icônes en orbite | marque premium, suite de produits |
| 6 | UI illustrée en plan-séquence | Loom AI | interface redessinée en aplats, caméra qui se promène sans couper | démo produit fluide et chaleureuse |
| 7 | Atelier de design | Framer | fond noir, poignées de sélection, zoom du détail à l'éditeur | outil créatif, no-code |
| 8 | Pub d'app macro | Uber (concept) | UI en très gros plan, zooms éclair floutés, mots géants plein cadre | app mobile, rythme rapide |
| 9 | Démo classique | Airtable | vrais enregistrements d'écran sur aplat, balayages floutés | tutoriel, démo longue |
| 10 | Bande-annonce documentaire | Ornadyne | question tapée, archives, cadres HUD, produit en 3D | produit physique, deeptech |
| 11 | Multi-styles avec sous-titres | Motion | sous-titres en pilules, chaque plan dans un style différent | vidéo vitrine, montage énergique |

Hors machine : la publicité filmée (Front). Il faut des images tournées ou générées par IA.

---

## 1. Phrase + capture inclinée
**Format :** 16:9 ou 1:1, 20 à 45 s.
**Tu m'envoies :** 3 à 5 phrases courtes, 3 à 5 captures PNG de l'interface (une par fonctionnalité), la couleur de fond, le logo SVG, et l'info à pointer sur chaque capture (« le badge Approved », « le total »).
**Briques :** `tilt-card`, `ui-3d-reveal`, `soft-blur-in`, `marker-highlight`, `hw-callout-circle`, `notification-stack`, `motion-blur`.

## 2. Karaoké voix off
**Format :** 9:16 pour TikTok et Reels (16:9 possible), 30 à 60 s, 60 i/s.
**Tu m'envoies :** le texte de la voix off découpé en phrases, le type de voix ElevenLabs (homme ou femme, âge, ton), la couleur d'accent, le logo, des captures ou maquettes Figma des écrans clés, le problème et la solution en une phrase chacun.
**Briques :** `caption-pill-karaoke`, `mk-callout-highlight`, `per-word-rise`, `device-frame-stage`, `touch-indicator`, `swipe-rail`, `toggle-flip`, `tracing-beam`, `dynamic-grid`, `physical-exit`. Voix : ElevenLabs, puis transcription horodatée pour caler chaque mot.

## 3. Minimal B2B
**Format :** 16:9, 45 à 75 s, 4K possible.
**Tu m'envoies :** 4 à 6 titres de section (« Autonomous Execution »), un exemple réaliste de prompt et de résultat, 1 ou 2 chiffres forts (« 5× »), une couleur unique, éventuellement une vidéo aérienne ou de stock pour l'ouverture.
**Briques :** `ai-chat-reveal`, `typed-prompt`, `tracing-beam`, `mk-progress-stat`, `animated-bar-chart`, `locked-nucleus-orbit`, `soft-blur-in`, `iris-reveal`.

## 4. Aplats et interface recadrée
**Format :** 16:9, 45 à 60 s.
**Tu m'envoies :** les titres (2 lignes max chacun), un mot clé à souligner par titre, 3 couleurs vives de marque, les écrans en Figma (idéal) ou en captures, et une mascotte ou un logo animable si tu en as un (SVG ou Lottie).
**Briques :** `kinetic-type-swap` (machine à sous de pastilles), `hw-underline`, `browser-device-stage`, `ui-focus-zoom`, `oversized-cursor`, `per-word-rise`.

## 5. Ciel pastel
**Format :** 16:9, 45 à 60 s.
**Tu m'envoies :** une phrase par produit ou fonctionnalité, les icônes de chaque produit (SVG), une couleur d'ambiance par chapitre, des captures d'interface, et éventuellement des photos de personnes.
**Briques :** `blur-in`, `focus-blur-resolve`, `mesh-gradient-bg`, `aurora-drift`, `locked-nucleus-orbit`, `iris-reveal`, `screen-flow-carousel`.

## 6. UI illustrée en plan-séquence
**Format :** 16:9, 30 à 45 s.
**Tu m'envoies :** les écrans en Figma de préférence (je les simplifie en aplats), la palette, une vidéo de visage si tu veux une bulle caméra, et le parcours utilisateur en 4 ou 5 étapes.
**Briques :** `ui-focus-zoom`, `parallax-zoom`, `camera-rig-depth-stack`, `hw-callout-circle`, `oversized-cursor`, `press-ripple`, `typed-prompt`.

## 7. Atelier de design
**Format :** 16:9, 30 à 40 s.
**Tu m'envoies :** le titre phare, 2 ou 3 pages de ton site ou de ton app (captures ou Figma), un visuel héros (3D, image forte), la couleur d'accent.
**Briques :** `multiplayer-cursors`, `parallax-unzoom`, `camera-rig-depth-stack`, `grid-card-assemble`, `press-ripple`, `typewriter`. Le cadre de sélection avec poignées reste à créer.

## 8. Pub d'app macro
**Format :** 4:5 ou 9:16, 15 à 25 s, rythme sur la musique.
**Tu m'envoies :** les écrans de l'app en Figma (indispensable pour les gros plans nets), 3 ou 4 mots-chocs (« PLAN YOUR RIDE »), la musique ou son tempo, le logo.
**Briques :** `zoom-through-transition`, `whip-pan-cut`, `motion-blur`, `caption-kinetic-slam`, `shutter-slam`, `device-frame-stage`, `cut-the-curve`.

## 9. Démo classique
**Format :** 16:9, 1 à 2 min.
**Tu m'envoies :** des enregistrements d'écran (60 i/s, souris lente) découpés par fonctionnalité, la couleur de fond, le logo.
**Briques :** `browser-device-stage`, `whip-pan-cut`, `motion-blur`, `ui-focus-zoom`.

## 10. Bande-annonce documentaire
**Format :** 16:9, 45 à 60 s.
**Tu m'envoies :** la question d'ouverture, le texte de la voix off, des images d'archives ou de stock (dont tu as les droits), des rendus 3D ou photos du produit, le logo en SVG au trait.
**Briques :** `typewriter`, `grain-overlay`, `yt-screen-warp`, `yt-feather-highlight`, `transitions-blur`. Les rendus 3D du produit se font hors machine (ou sur ton PC).

## 11. Multi-styles avec sous-titres
**Format :** 16:9 ou 9:16, 45 à 80 s.
**Tu m'envoies :** le script de la voix off, la liste des styles voulus plan par plan (en piochant dans ce catalogue), les éléments de marque.
**Briques :** `caption-pill-karaoke`, `message-thread-reveal`, `x-post`, `flowchart`, `typewriter`, plus les briques de chaque style choisi.
