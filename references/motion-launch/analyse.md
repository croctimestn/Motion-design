# Motion – vidéo de lancement

Source : Drive `1soZWzWGOabVJLXC4SjJOP8-kBVf72LuL` · Auteur : Motion (Mosaic), vidéo produite avec leur propre agent IA
Format : 16:9 3840×2160 (4K), 30 i/s, 1 min 16 · Plans : 27 (2,8 s en moyenne)

## Ce qui le rend stylé
Le concurrent direct de notre machine se met en scène. Une mini-histoire racontée en sous-titres façon TikTok (« uh oh time to make a video », « hmm let's see »), la démo de l'outil, puis un montage rapide des styles que l'agent sait produire : chaque plan est un style différent. C'est notre catalogue d'objectifs.

## Décomposition
| Temps | Ce qu'on voit | Technique | Outil probable |
|---|---|---|---|
| 0:00–0:06 | bureau macOS, post X, notification Messages « Launch is in 5 mins! » | enregistrement d'écran recadré + sous-titres en pilules blanches | capture + HTML |
| 0:06–0:16 | « motion.so » tapé dans la barre d'adresse, prompt « Make a 30-second launch video… », menus Aspect, Duration, DESIGN.md (presets Stripe, Figma, Notion, Apple…) | UI sombre en macro, frappe, menus qui s'ouvrent | HTML (rendu par l'agent) |
| 0:16 | après « send », lignes de lumière en hyperespace | transition « warp » | shader ou canvas |
| 0:17–0:25 | « Designing scene 1/3 », « V1 », « V2 » avec poignées de sélection, Export, barre de rendu | états d'UI successifs | HTML |
| 0:25–0:33 | conversation iMessage en grosses bulles | fil de messages qui s'empile | HTML (`message-thread-reveal`) |
| 0:33–0:36 | « LAUNCH / VIDEO / TOOL » en capitales grasses décalées, filets verts | typo cinétique en escalier | HTML |
| 0:39–0:41 | « the world's best motion design agent » tapé en très gros avec curseur lumineux, la caméra suit le texte | frappe géante + travelling horizontal | HTML |
| 0:42–0:46 | vidéo d'un youtubeur en polaroïd, titres « THE WATCH JOURNEY », « DEEP WATCHES », fiches produit en cartes | habillage de talking-head (cartes photo, titres soulignés) | HTML |
| 0:46–0:48 | point vert, classement en barres colorées | data-viz | HTML |
| 0:48–0:50 | carte mentale « OpenAI » reliée à des fiches | schéma nodal qui se construit | HTML |
| 0:50–0:59 | grille de points, HUD cyan circulaire, portes logiques néon, plan technique de train d'atterrissage, fusée « MAX-Q » | style blueprint / HUD technique | HTML + SVG |
| 0:59–1:04 | castor illustré, calendrier « 2 WEEKS AGO », pyramide de cartes d'UI colorées avec un trône | illustration vectorielle + empilement | HTML + SVG |
| 1:05–1:11 | prompt sombre, bouton orange « Plan », « Thinking through the brief », lecteur vidéo, pouce levé | UI en macro | HTML |

## Transitions
Coupes franches très fréquentes, souvent sur des mouvements de caméra déjà lancés. Quelques passages par flou, un warp en hyperespace.

## Typo
Sous-titres : petites pilules blanches à texte noir, en bas. Titres : grotesque très grasse en capitales, ou grotesque fine géante pour la frappe.

## Couleurs
Une charte par style : sombre `#0D0D10` pour l'outil, blanc cassé `#F8F7F6` pour les scènes claires, cyan néon pour le HUD, orange pour les boutons.

## Ce qu'on récupère pour la machine
- [ ] Sous-titres en pilules → bloc captions du registre (tag `captions`)
- [ ] Conversation iMessage → `message-thread-reveal` (à installer)
- [ ] Warp hyperespace → recherche registre (`shader`, WebGL donc rendu sur PC) ou version canvas 2D
- [ ] Frappe géante + travelling → GSAP `TextPlugin` + translation
- [ ] Habillage de talking-head (polaroïds, titres) → workflow `/talking-head-recut`
- [ ] Schéma nodal → bloc `flowchart`
- [ ] Style blueprint / HUD → SVG `drawSVG` + `dynamic-grid`
- [ ] Chaque style = un preset de la machine : c'est exactement le modèle à suivre
