# Meet Airtable

Source : Drive `1nEpzICozktUXIeCeqXuanlleSKu7JuHj` · Auteur : équipe Airtable (interface datée de juillet 2018)
Format : 16:9 1920×1080, 30 i/s, 1 min 50 · Plans : aucune coupe franche, un seul plan-séquence

## Ce qui le rend stylé
Une démo produit « classique » : de vrais enregistrements d'écran posés à plat sur un fond bleu uni, enchaînés par des balayages rapides très floutés. Le rythme vient des transitions, pas des coupes.

## Décomposition
| Temps | Ce qu'on voit | Technique | Outil probable |
|---|---|---|---|
| 0:00–0:09 | logo qui tombe avec flou de mouvement, puis icônes (formes, smiley, ampoule) qui apparaissent en orbite | logo build + pops décalés | After Effects |
| 0:09 | le logo est balayé vers le haut, l'interface arrive par en dessous | balayage vertical avec gros flou directionnel | After Effects (flou de mouvement) |
| 0:09–0:20 | base Airtable plein écran sur fond bleu, curseur qui édite | enregistrement d'écran posé sur fond uni, ombre portée douce | Screen recording + AE |
| 0:20–0:26 | glissement latéral vers un iPhone plat (cadre blanc minimal) | balayage horizontal flouté, maquette de téléphone 2D | AE |
| 0:27–1:12 | vues calendrier, galerie, site web, chaque vue reliée par un balayage | même grammaire répétée | AE |
| 1:48 | logo + wordmark sur blanc | lockup final | AE |

## Transitions
Balayages (whip pan) horizontaux ou verticaux : l'écran sortant part en 4 à 6 images avec un flou directionnel très fort, l'écran entrant arrive du côté opposé avec le même flou. Aucune coupe sèche.

## Typo
Quasi absente : tout le message passe par l'interface. Wordmark Airtable à la fin.

## Couleurs
Bleu `#4185F1` en fond permanent, blanc des interfaces, couleurs d'accent de chaque base (vert, rose) qui changent d'un écran à l'autre.

## Ce qu'on récupère pour la machine
- [ ] Fond uni de marque + écran posé à plat avec ombre douce → `browser-device-stage`
- [ ] Balayage flouté entre deux écrans → GSAP x/y + brique `motion-blur`
- [ ] Logo qui tombe avec flou + icônes en orbite → GSAP stagger + `motion-blur`
