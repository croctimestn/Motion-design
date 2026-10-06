# Paces Agent

Source : Drive `1uPUg37teuQTx6b1p5Ux4Nm_Wyyv4CJ41` · Auteur : Paces (agent IA pour le développement de projets énergétiques). Le rendu net en 4K, très « HTML », fait penser à une production par code ou par agent (comme les vidéos Motion), à confirmer.
Format : 16:9 3840×2160 (4K), 24 i/s, 1 min 06 · Plans : 8

## Ce qui le rend stylé
Le minimalisme B2B poussé au maximum : beaucoup de blanc, un petit titre centré, très peu d'éléments à la fois, un vert sapin comme seule couleur. Les interfaces sont redessinées en version épurée et se construisent pièce par pièce. La deuxième moitié bascule en vert foncé pour les chiffres.

## Décomposition
| Temps | Ce qu'on voit | Technique | Outil probable |
|---|---|---|---|
| 0:00–0:02 | deux cercles qui se croisent, « PACES AGENT » | logo qui se dessine + fondu du nom | HTML / AE |
| 0:02–0:06 | vues aériennes d'un datacenter et d'une ferme solaire, « Built for Power Development » | vidéo de stock + titre centré | stock + HTML |
| 0:07–0:09 | « Autonomous Execution », trois petites icônes reliées par un trait | étapes qui s'allument l'une après l'autre | HTML |
| 0:10–0:12 | carte de résultat, pilule « Verified by Expert », curseur avec avatar | callout + curseur nommé | HTML |
| 0:13–0:20 | prompt tapé, étapes cochées, tableau « 1,254 qualifying sites found » | chat d'agent + tableau qui se remplit | HTML |
| 0:22–0:25 | carte satellite verte, parcelle en polygone, étiquettes qui sortent | carte + annotations | HTML + SVG |
| 0:26–0:32 | document de permis avec lignes surlignées, « Done! » | document + surlignage | HTML |
| 0:34–0:38 | tableau kanban « Busywork runs itself. You close. » (mot vert souligné) | pipeline + cartes qui changent de colonne | HTML |
| 0:38–0:45 | fond vert sapin, « 5× » : rangées de blocs qui se remplissent, frise comparative « Traditional » vs « with Paces » | data-viz en blocs + diagramme de Gantt | HTML |
| 0:46 | éclair blanc-vert | flash lumineux de transition | HTML |
| 0:47–0:54 | sphère de points qui tourne, étiquettes en orbite, pilule « Trusted Data » → « Automated » | globe de points + orbite + pilule qui change | canvas ou SVG |
| 0:54–1:06 | « Validated by Experts », phrases finales, « paces.com/agent », cercles, logo | titres sobres + logo | HTML |

## Transitions
Fondus doux, blanc vers vert, un éclair lumineux, des cercles qui s'élargissent avant le logo. Les éléments arrivent un par un, jamais tous ensemble.

## Typo
Grotesque sobre (style Inter), petite taille, gras pour le titre, gris pour le secondaire. Un mot clé en vert souligné.

## Couleurs
Blanc `#FCFCFC`, vert sapin `#1E3C34`, vert clair pour les accents. Rien d'autre.

## Ce qu'on récupère pour la machine
- [ ] Minimalisme : un titre + un élément à la fois → gabarit de scène très réutilisable
- [ ] Étapes reliées qui s'allument → `tracing-beam`
- [ ] Chat d'agent + tableau qui se remplit → `ai-chat-reveal` + GSAP stagger
- [ ] Kanban avec cartes qui changent de colonne → GSAP Flip
- [ ] « 5× » en blocs + frise comparative → data-viz HTML (`mk-progress-stat` à installer)
- [ ] Sphère de points avec étiquettes en orbite → canvas 2D (pas besoin de WebGL)
- [ ] 4K 24 i/s → réglage du rendu
