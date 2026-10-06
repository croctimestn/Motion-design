# Grow Lot – Gamification v3 (parcours client et commerçant)

Source : fichier envoyé par l'utilisateur (`grow-lot-gamification-9x16-v3.mp4`) · Auteur : Grow Lot
Format : 9:16 1080×1920, 30 i/s, 1 min 30 · Plans : plan-séquence, raccords par bandes diagonales

## Ce qui le rend stylé
Il montre le produit en vrai, des deux côtés. Côté client : il scanne, s'inscrit, joue, gagne, laisse un avis, revient consommer. Côté commerçant : il crée son compte, choisit son offre, paie, règle son jeu et imprime son QR code, en 6 étapes numérotées. Chaque écran est reconstruit et animé comme une démo réelle : on tape, on clique, l'état change, des confettis valident. Le commerce fictif « Wokki » (mascotte panda roux) donne un fil rouge concret.

## Décomposition
| Temps | Ce qu'on voit | Technique | Outil probable |
|---|---|---|---|
| 0–4,5 s | fond noir : fiche Google « Wokki 3,9 ★ (12 avis) » face au concurrent « Sushi 4,8 ★, n°1 du quartier » | cartes d'UI sombres, badge doré | AE |
| 4,5–9 s | compteur d'avis bloqué à 12, carte Instagram avec un électrocardiogramme qui devient plat (« encéphalogramme plat ») | métaphore animée sur une ligne SVG | AE |
| 9–10 s | bandes diagonales violet, lavande, jaune qui balaient l'écran vers le crème | raccord par bandes | AE |
| 10–13 s | logo Grow Lot, « chaque visite devient de la visibilité » (mots en pilules violettes) | pilules qui tombent mot à mot | AE |
| 13–20 s | le panda au centre, orbites pointillées, icônes Google, Instagram, TikTok, Facebook, Snapchat qui se posent, note 3,9 → 4,8, abonnés 0 → 2 400 | diagramme orbital + compteurs | AE |
| 21–25 s | cartes « Commerçant » et « Client » reliées par un arc, un cadeau 3D voyage, des icônes reviennent | arc pointillé + objet sur trajectoire | AE |
| 25–27 s | vraie photo : main qui tient un téléphone et scanne le QR du comptoir, fond flou | photo plein cadre, zoom lent | photo / IA |
| 27–31 s | téléphone : « 3 étapes, c'est tout », e-mail tapé, « Vérifie tes e-mails », « Compte activé ! » + confettis | frappe, changement d'écran dans le téléphone | AE |
| 32–37 s | hub de mini-jeux, roue qui tourne, « Félicitations ! Une boîte de sushi offerte » sur un soleil rayonnant | roue, carte de lot, rayons | AE |
| 37–44 s | « En échange : une action » : étoiles Google qui se remplissent, texte d'avis tapé, « Avis publié ✓ », liste d'actions au choix (avis, Instagram, TikTok, partage) | étoiles qui s'allument, bouton qui passe au vert | AE |
| 44–47 s | « Mes coupons cadeaux », tampon « Utilisé ✓ », notification « Retour chez Wokki +1 visite » | tampon + notification | AE |
| 47–53 s | bandes diagonales, « Client satisfait. Commerçant satisfait. », symbole infini tracé, « réciprocité » | tracé SVG + mot géant | AE |
| 53–58 s | « Vos jeux. Vos lots. Vos couleurs. » : interrupteurs Spin Wheel / Quiz / Candy Pop / Tic Tac Toe, téléphone qui change de thème | toggles + recoloration | AE |
| 58–59 s | « Et pour le lancer ? Un jeu d'enfant. » + chrono 1 minute | mot géant flou → net, anneau de progression | AE |
| 59–1:12 | navigateur grow-lot.com, étapes 1 à 6 : créer son compte, choisir l'offre (19 € / 59 €), cocher les modules (total 19 € → 52 €), Apple Pay + Face ID, régler apparence, lot et parcours d'actions | maquette navigateur + curseur + barre d'étapes | AE |
| 1:12–1:14 | « Votre QR code est prêt », QR qui se dessine, confettis | QR dessiné module par module | AE |
| 1:14–1:22 | fond violet : +10 000 avis collectés, +8 000 abonnés, 94 % de commerçants satisfaits | compteurs empilés | AE |
| 1:22–1:30 | logo, « Faites grandir l'engagement. », bouton « Réserver une démo », grow-lot.com, curseur qui clique | signature + CTA | AE |

## Transitions
Plan-séquence avec flous d'entrée et de sortie, et trois raccords par bandes diagonales (violet, lavande, jaune, doré) qui balaient l'écran en biais. Une photo plein cadre casse le rythme au moment du scan.

## Typo
Poppins grasse pour le titre en haut, deuxième ligne en gris, mots clés en violet. Grands chiffres jaunes sur fond violet pour les statistiques.

## Couleurs
Noir pour le problème, crème `#F9F8F5` pour la solution, violet `#5B4294`. Côté joueur, le thème du commerce (doré `#AC986C` pour Wokki) : l'appli prend les couleurs du client.

## Ce qu'on récupère pour la machine
- [ ] Parcours client puis commerçant, chacun en étapes concrètes, sur un commerce fil rouge
- [ ] Téléphone et navigateur reconstruits en HTML, écrans qui s'enchaînent dans le cadre
- [ ] Barre d'étapes « Étape n / 6 » qui se remplit
- [ ] Raccord par bandes diagonales colorées → `stripe-wipe` maison (3 à 4 bandes décalées)
- [ ] Diagramme orbital avec compteurs → SVG + GSAP
- [ ] Recoloration du téléphone pour montrer la personnalisation → variables CSS animées
- [ ] QR qui se dessine module par module + confettis
