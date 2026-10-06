# Introducing Superhuman

Source : Drive `1qQSNP0LZZLxEkda8GwGHgvoNsW6oD529` · Auteur : Superhuman (la suite qui réunit Grammarly, Coda, Mail et Go)
Format : 16:9 1920×1080, 24 i/s, 60 s · Plans : 2 (tout est enchaîné en fondus et en morphings)

## Ce qui le rend stylé
Une douceur extrême : ciels nuageux flous en dégradés pastel, texte fin qui apparaît mot par mot dans un flou, icônes rondes qui tournent en orbite. Chaque produit de la suite a sa couleur de ciel (lavande, menthe, coucher de soleil magenta, bleu).

## Décomposition
| Temps | Ce qu'on voit | Technique | Outil probable |
|---|---|---|---|
| 0:00–0:02 | « All work depends on people » apparaît mot par mot, « people » souligné | fondu + flou mot par mot (blur-in) | AE |
| 0:02–0:06 | photo de personne dans un cadre arrondi, icônes d'apps en orbite autour d'elle, la carte grandit jusqu'au plein écran | orbite d'icônes + agrandissement de carte | AE |
| 0:06–0:14 | la flèche (logo Superhuman) tourne comme une boussole vers chaque icône posée sur un arc | rotation pilotée + pops d'icônes | AE |
| 0:14–0:15 | halo lumineux qui s'élargit en blanc, logo Grammarly | volet circulaire lumineux | AE |
| 0:16–0:24 | fenêtre Slack + barre Grammarly sur ciel menthe, curseur qui clique une suggestion | UI flottante sur fond photo flou | AE + enregistrement d'écran |
| 0:25–0:28 | carrousel horizontal d'icônes rondes lavande, celle du centre s'illumine et devient le logo Coda | carrousel avec focus + morph en logo | AE |
| 0:28–0:52 | même schéma pour Coda, Mail et Go, chacun sur son ciel | gabarit de scène répété | AE |
| 0:52–0:57 | phrase finale mot par mot sur ciel bleu | blur-in mot par mot | AE |

## Transitions
Fondus enchaînés et flous, halos qui s'ouvrent, carrousel d'icônes qui sert de « menu » entre deux chapitres. Rien de brutal.

## Typo
Grotesque légère (poids regular), taille moyenne, centrée en haut du cadre au-dessus de l'interface. Un mot clé souligné.

## Couleurs
Ciels pastel : lavande `#A8A7C6`, bleu `#D0DFF7`, menthe, magenta. Interfaces blanches, icônes dans des disques lavande translucides.

## Ce qu'on récupère pour la machine
- [ ] Texte qui apparaît mot par mot dans un flou → `soft-blur-in`
- [ ] Icônes en orbite autour d'un sujet → GSAP sur un cercle (`motionPath` ou rotation de conteneur)
- [ ] Carrousel d'icônes avec focus central → `screen-flow-carousel` adapté
- [ ] Fond ciel pastel flou → image floutée ou dégradé animé (`dynamic-grid` non, plutôt CSS gradient + flou)
- [ ] UI qui entre en verre dépoli (flou + opacité) → `soft-blur-in` sur la fenêtre
- [ ] Un gabarit de scène réutilisé par produit → sous-composition HyperFrames avec variables
