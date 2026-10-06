# That's Framer – The pro site builder loved by designers

Source : Drive `1QEdMrCUeaAY0yEI1XvC5cDVCyE-ElvMX` · Auteur : Framer
Format : 16:9 1920×1080, 24 i/s, 38 s · Plans : 4 (presque tout s'enchaîne par des zooms)

## Ce qui le rend stylé
On assiste à la fabrication du site en temps réel : poignées de sélection, cadres, curseurs nommés, texte qui se tape. Fond noir, un seul visuel 3D bleu très brillant comme héros, et des zooms qui passent d'un détail à la page puis à l'éditeur entier.

## Décomposition
| Temps | Ce qu'on voit | Technique | Outil probable |
|---|---|---|---|
| 0:00–0:01 | « Get started for free » tapé dans un bouton, sur un tube 3D bleu | frappe simulée + visuel 3D en fond | C4D/Blender ou Spline pour la 3D, AE |
| 0:01–0:03 | cercle, cercles concentriques, rectangle en dégradé qui se transforme en pilule, avec poignées de sélection | formes d'outil de design avec cadre de sélection et poignées | AE ou Framer |
| 0:03–0:05 | menu de navigation et titre « The Internet Canvas » encadrés, curseurs collaboratifs | surlignage de sélection + `multiplayer-cursors` | AE |
| 0:05–0:11 | le titre rétrécit et se place dans la page, dézoom sur la page entière | dézoom (pull-out) élément → page → éditeur | AE |
| 0:12–0:15 | icône Figma qui tombe, la page se remplit | import illustré par une icône + remplissage | AE |
| 0:16–0:18 | pile de captures de sites en éventail 3D qui se déploie | cartes en perspective décalées (deck) | AE (3D layers) |
| 0:20–0:27 | cadres fil de fer qui deviennent une grille bento remplie | wireframe → contenu | AE |
| 0:28–0:31 | même page en ordinateur, tablette, mobile côte à côte | points de rupture responsive | AE |
| 0:32–0:33 | gros plan sur le bouton « Publish » cliqué | macro-zoom sur un élément d'UI | AE |
| 0:33–0:37 | logo Framer blanc sur noir | logo final | AE |

## Transitions
Zooms continus : on part d'un détail, on recule jusqu'à la page puis jusqu'à l'éditeur. Les 4 coupes tombent sur des changements de chapitre.

## Typo
Grotesque fine et très grande pour les titres (« The Internet Canvas »), interface en petite typo grise.

## Couleurs
Noir `#050505`, blanc, bleu électrique du visuel 3D, dégradés bleu → rouge sur les formes, bleu `#0099FF` du bouton Publish.

## Ce qu'on récupère pour la machine
- [ ] Cadre de sélection avec poignées autour d'un élément → à créer (petite brique maison)
- [ ] Curseurs nommés → `multiplayer-cursors`
- [ ] Dézoom détail → page → éditeur → `ui-focus-zoom` en sens inverse, `parallax-unzoom`
- [ ] Pile de captures en éventail → `camera-rig-depth-stack`, `perspective-marquee`
- [ ] Fil de fer → bento rempli → `grid-card-assemble`
- [ ] Macro-zoom sur un bouton cliqué → `press-ripple` + zoom GSAP
- [ ] Visuel 3D brillant → image ou vidéo pré-rendue (Spline, Blender) posée en fond
