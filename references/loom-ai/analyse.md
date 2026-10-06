# Work Faster and Smarter with Loom AI

Source : Drive `1WXtM2-wC5ePYV2iZbw83sqIBr6spBD5V` · Auteur : Loom
Format : 16:9 1920×1080, 29,97 i/s, 38 s · Plans : un seul plan-séquence

## Ce qui le rend stylé
L'interface n'est pas une capture : elle est redessinée en version simplifiée (aplats, barres grises à la place du texte) dans les couleurs de la marque, violet et magenta. La caméra se promène sans couper dans ce grand « tableau » d'interface, avec des bulles irisées en profondeur de champ pour les moments IA.

## Décomposition
| Temps | Ce qu'on voit | Technique | Outil probable |
|---|---|---|---|
| 0:00–0:03 | fenêtre « Dashboard Demo » sur fond dégradé violet, bulle caméra ronde avec une vraie personne | UI redessinée + bulle vidéo ronde | Figma + AE |
| 0:03–0:06 | dézoom : la fenêtre devient la vidéo dans la page Loom, le panneau Loom AI se remplit | dézoom (pull-out) dans l'interface | AE |
| 0:06–0:08 | la caméra traverse un flou, sphères irisées en profondeur de champ, « Loom AI ✦ » | passage à travers (push-through) + 3D | C4D ou Blender pour les sphères, AE |
| 0:08–0:12 | gros plans sur le graphique, curseur qui entoure un point en rouge | push-in + annotation dessinée | AE |
| 0:12–0:15 | titre « Quick Adjustment! 📈 » qui s'écrit, caméra qui glisse | frappe + travelling | AE |
| 0:18–0:30 | panneau IA : texte généré, onglets Activity et Transcript cliqués | curseur + changements d'état de l'UI | AE |
| 0:31–0:35 | bulles « Hello! Bonjour! Hallo! Ciao! » qui volent à différentes profondeurs | pilules en 3D simulée : taille + flou selon la profondeur | AE |
| 0:35–0:38 | « Loom AI ✦ » au milieu des sphères | logo final | AE |

## Transitions
Aucune coupe. Tout passe par des mouvements de caméra (zoom, travelling, passage à travers le flou).

## Typo
Grotesque arrondie, blanche sur violet ou violet foncé sur blanc. Titres avec emoji.

## Couleurs
Violet profond `#2A1250`, magenta, lavande `#DED4E8`, fond clair `#F8F7FC`. Sphères irisées rose-bleu.

## Ce qu'on récupère pour la machine
- [ ] UI redessinée en version simplifiée plutôt qu'en capture → HTML/CSS maison, c'est notre point fort
- [ ] Bulle caméra ronde → vidéo dans un cercle (`border-radius`)
- [ ] Caméra qui se promène dans un grand canevas d'UI → `ui-focus-zoom`, `parallax-zoom`
- [ ] Profondeur de champ simulée : taille + flou selon la distance → `camera-rig-depth-stack`, CSS `filter: blur`
- [ ] Annotation dessinée (cercle rouge) → SVG `drawSVG` / stroke-dashoffset
- [ ] Sphères irisées → image pré-rendue ou dégradés radiaux CSS floutés
