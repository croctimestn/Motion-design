# Uber Motion Ad Concept

Source : Drive `1fJkVmYQPFcGB4bjRO--R-KcYjbOS9nLe` · Auteur : motion designer indépendant (le profil chauffeur affiche « yasin.vfx »), concept non officiel
Format : 5:4 1350×1080, 25 i/s, 23 s · Plans : 8 (2,8 s en moyenne)

## Ce qui le rend stylé
Le style « pub d'app » des motion designers sur Instagram et Dribbble : l'interface Uber est redessinée en vecteur, on la regarde en très gros plan, les transitions sont des zooms éclair noyés de flou de mouvement, et le rythme est cassé par des mots géants plein cadre.

## Décomposition
| Temps | Ce qu'on voit | Technique | Outil probable |
|---|---|---|---|
| 0:00–0:02 | carré noir « Uber » qui grossit, la voiture arrive de la gauche, le logo s'aligne | logo + objet qui glisse avec flou | AE |
| 0:02–0:04 | barre d'onglets Uber, Eats, Courier, champ « Hanover Airport » en gros plan | UI redessinée en macro, frappe | Figma + AE |
| 0:04–0:06 | « Choose a trip », la sélection noire saute d'une option à l'autre | cadre de sélection qui se déplace (focus) | AE |
| 0:06 | la carte Uber XL sort sur fond noir | isolement d'un élément d'UI | AE |
| 0:07–0:08 | « PLAN » « YOUR » « RIDE » plein cadre, fond qui alterne blanc et noir | typo cinétique géante coupée sur le temps | AE |
| 0:09–0:13 | itinéraire, épingle qui tombe, carte qui zoome, bouton « Confirm pick-up spot » pressé | épingle + zoom de carte + bouton qui change de couleur | AE |
| 0:14–0:15 | carte du chauffeur : avatar 3D, note, nombre de courses | carte profil + compteurs | AE |
| 0:15–0:18 | « REAL-TIME UPDATES » puis iPhone avec Live Activity sur fond vert | mot géant + téléphone en gros plan | AE |

## Transitions
Zooms éclair : on fonce dans un élément ou on en sort en 3 ou 4 images avec un flou de mouvement très fort. Coupes sèches sur les mots géants.

## Typo
Uber Move (ou équivalent : une grotesque géométrique grasse). Mots géants en capitales qui remplissent toute la largeur.

## Couleurs
Blanc `#F9F9F9`, noir `#121212`, gris clair `#D0D5D8`, une seule touche de couleur à la fin (vert).

## Ce qu'on récupère pour la machine
- [ ] UI redessinée en vecteur, vue en macro → HTML/CSS + zoom GSAP
- [ ] Zoom éclair avec gros flou → `zoom-through-transition` + `motion-blur`
- [ ] Cadre de sélection qui saute d'une option à l'autre → GSAP Flip ou cadre absolu animé
- [ ] Mots géants plein cadre en coupe sur le temps → `kinetic-center-build` ou titres GSAP synchronisés au tempo
- [ ] Épingle et zoom de carte → bloc carte du registre (`flight-map-route` à installer)
