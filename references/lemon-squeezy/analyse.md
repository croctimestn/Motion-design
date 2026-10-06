# Introducing the Lemon Squeezy affiliate platform

Source : Drive `1B621o8918IOT9CydGBOu4iySGapPXTB7` · Auteur : Lemon Squeezy
Format : 16:9 1920×1080, 29,97 i/s, 44 s · Plans : un seul plan-séquence

## Ce qui le rend stylé
La formule la plus simple et la plus efficace du lot : un fond lavande uni, une phrase blanche, puis une vraie capture d'écran inclinée en perspective qui dérive lentement. Des petites étiquettes (« Approved », « Paid ») sortent de l'interface pour pointer l'info importante. Facile à refaire pour n'importe quel produit.

## Décomposition
| Temps | Ce qu'on voit | Technique | Outil probable |
|---|---|---|---|
| 0:00–0:04 | « Introducing », « built-in Affiliates », « by Lemon Squeezy » | phrases courtes qui se remplacent en fondu | AE |
| 0:04–0:08 | fenêtre blanche qui se remplit, puis bascule en perspective et dérive | capture inclinée (rotation 3D légère) + dérive lente de caméra | AE (calque 3D) |
| 0:08 | la fenêtre part vers le haut, très floutée | sortie rapide avec flou de mouvement | AE |
| 0:08–0:11 | « integrated » souligné d'un trait de surligneur jaune | soulignement dessiné à la main | AE (trim paths) |
| 0:17–0:19 | « Approve » entouré d'une ellipse jaune dessinée | annotation dessinée | AE |
| 0:20–0:22 | badge vert « ✓ Approved » qui sort de la ligne du tableau | étiquette qui jaillit hors de l'UI (callout) | AE |
| 0:29 | badge « ✓ Paid » | même callout | AE |
| 0:35–0:37 | « www.lemonsqueezy.com » dont les lettres ondulent | vague lettre par lettre | AE |
| 0:38–0:44 | logo sur lavande | logo final | AE |

## Transitions
Fondus enchaînés pour le texte, entrées et sorties d'écran rapides avec flou de mouvement vertical.

## Typo
Grotesque ronde mi-grasse, blanche, centrée, 2 à 3 lignes. Les mots clés reçoivent un trait ou une ellipse jaune dessinés.

## Couleurs
Lavande `#A791F3` partout, blanc, jaune citron pour les annotations et le logo.

## Ce qu'on récupère pour la machine
- [ ] Gabarit « phrase sur aplat → capture inclinée » → `tilt-card` ou `ui-3d-reveal` + `soft-blur-in`
- [ ] Étiquette qui sort de l'UI → `notification-stack` ou petite pilule GSAP avec `back.out`
- [ ] Surligneur et ellipse dessinés → SVG stroke animé (`hw-arrow` du registre pour les flèches)
- [ ] Sortie verticale floutée → GSAP y + `motion-blur`
- [ ] Lettres en vague → `SplitText` + stagger sinusoïdal
