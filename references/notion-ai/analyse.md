# Introducing the new Notion AI

Source : Drive `1fKLAUz6xNlgIOtePn2kvJVLFm-0j_1aO` · Auteur : Notion (le personnage de l'assistant a été animé avec le studio Buck)
Format : 16:9 1920×1080, 23,976 i/s, 57 s · Plans : 12 (4,7 s en moyenne)

## Ce qui le rend stylé
Alternance très nette entre deux mondes : des titres noirs en gras sur fond blanc cassé, et des morceaux d'interface recadrés sur des aplats de couleur primaire (bleu, rouge, jaune). Le petit visage dessiné de l'assistant fait le lien et donne de la personnalité.

## Décomposition
| Temps | Ce qu'on voit | Technique | Outil probable |
|---|---|---|---|
| 0:00–0:02 | logo Notion cliqué au curseur, puis visage de l'IA sur aplat bleu | coupe sèche sur aplat + personnage dessiné | AE + animation image par image |
| 0:02–0:04 | « Meet the *new* Notion AI », mot souligné à la main | lignes de texte qui montent derrière un masque, soulignement qui se dessine | AE |
| 0:04–0:08 | « One AI tool to [pastille] » : les pastilles (Ask a question, Find in Google Drive…) défilent | machine à sous verticale, éléments voisins floutés et transparents | AE |
| 0:09–0:12 | rangée d'icônes d'apps qui apparaissent puis rétrécissent sous le titre | pop décalé (stagger) + mise à l'échelle | AE |
| 0:12–0:20 | panneau de chat IA coupé par le bord du cadre, visage animé dans un cercle à droite | interface recadrée sur aplat, personnage en boucle | AE + Lottie |
| 0:23–0:31 | page Notion sur aplat rouge, zoom avant, curseur et texte qui s'écrit | poussée de caméra (push-in) sur l'UI, frappe simulée | AE |
| 0:43–0:50 | clavier iPhone en gros plan sur aplat jaune, puis dézoom sur le téléphone entier | gros plan → plan large (pull-out) | AE |
| 0:50–0:54 | « Try Notion AI for free », visage final | titre + logo | AE |

## Transitions
Coupes sèches sur le temps fort, d'un aplat de couleur à un autre. À l'intérieur des plans, la caméra pousse ou recule doucement sur l'interface.

## Typo
Grotesque noire très grasse, centrée, deux lignes maximum. Un mot clé en italique souligné à la main. Les pastilles reprennent le style des composants Notion (icône + libellé gris).

## Couleurs
Fond `#F9F9F9`, texte noir, aplats bleu `#1484E2`, rouge, jaune `#F2B01B`. L'interface reste blanche et sobre.

## Ce qu'on récupère pour la machine
- [ ] Ligne de titre qui monte derrière un masque → `soft-blur-in` ou GSAP `yPercent` dans un conteneur `overflow:hidden`
- [ ] Machine à sous de pastilles avec voisins floutés → recette `rotating-text` (motion-anything) ou GSAP sur liste verticale
- [ ] Interface recadrée sur aplat de couleur → `browser-device-stage` décalé hors cadre
- [ ] Push-in sur l'UI + curseur → `ui-focus-zoom` + `oversized-cursor`
- [ ] Mascotte dessinée → Lottie (rendue par HyperFrames)
