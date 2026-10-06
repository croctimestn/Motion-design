# Grow Lot – Motion v7 (carte de fidélité digitale)

Source : fichier envoyé par l'utilisateur (`grow-lot-motion-9x16-v7.mp4`) · Auteur : Grow Lot
Format : 9:16 1080×1920, 30 i/s, 51 s · Plans : un plan-séquence, une seule bascule (noir → crème à 14,7 s)

## Ce qui le rend stylé
C'est la recette SNAPSS appliquée à Grow Lot. Un titre en haut suit la voix off : la première ligne est en noir, la suite arrive en gris. Sous le titre, de vraies interfaces reconstruites entrent, se remplissent et réagissent comme si on les utilisait : on tape un e-mail, on clique sur « Ajouter », un tampon s'imprime. Récit en deux temps : le problème sur fond noir quadrillé, la solution sur fond crème avec des halos pastel qui dérivent.

## Décomposition
| Temps | Ce qu'on voit | Technique | Outil probable |
|---|---|---|---|
| 0–3 s | carte sombre « Ventes du jour », les clients s'ajoutent, puis tous passent « Jamais revenu » en rouge | liste d'UI qui se remplit, changement d'état en cascade | AE ou HTML |
| 3–8 s | cartes de fidélité papier qui tombent, s'empilent, disparaissent | cartes 2D en perspective + chute | AE |
| 8–12 s | grille d'icônes d'applis, bouton « Obtenir » → « Non merci », croix rouges en tuiles | curseur qui clique, tuiles qui tombent en rotation | AE |
| 12–14,7 s | « Votre fidélisation n'est plus adaptée », tuiles « ? » et croix flottantes, flash blanc | flash de transition | AE |
| 15–19 s | « Avec Grow Lot, votre carte de fidélité devient enfin… digitale », pilules noires « devient enfin », carte orange qui surgit, badges « Sans appli » / « Apple Wallet » | mots en pilule inversée, mot géant flou → net, objet en avant-plan | AE |
| 19–24 s | balayage diagonal en dégradé, chevalet QR en caisse, champ e-mail qui se tape, « Lien magique envoyé », « Aucune application à télécharger » reliés par des pointillés | trait lumineux diagonal, frappe au clavier, connecteurs | AE |
| 25–28 s | boutons Google Wallet / Apple Wallet, curseur qui clique « Ajouter », compteur « + 2 membres » | curseur + bascule d'état + badge compteur | AE |
| 28–32 s | iPhone incliné : la carte se remplit d'un tampon à chaque passage, 10/10, notification « Un poke offert », confettis | téléphone en perspective, tampons qui s'impriment | AE (+ Rotato possible) |
| 32–36 s | écran verrouillé 9:41, relances automatiques qui s'empilent, « au bon moment » géant flou | notifications en pile, mot géant | AE |
| 36–40 s | ordinateur en perspective, tableau de bord qui se remplit (barres, anneau), « simple et claire » | appareil 3D + graphiques qui poussent | AE |
| 40–45 s | « +20 % → +30 % de fréquence d'achat », « +18 % de panier moyen », courbe lavande qui se dessine avec étiquettes | compteurs + courbe tracée | AE |
| 45–51 s | logo, « Faites grandir l'engagement. », bouton « Testez Grow Lot dès aujourd'hui », clic + confettis | signature + CTA cliqué | AE |

## Transitions
Plan-séquence : le titre se réécrit et les éléments entrent et sortent avec un flou. Une seule bascule forte, un flash blanc entre le noir et le crème. Deux traits lumineux diagonaux (violet → orange) servent de raccord.

## Typo
Poppins grasse pour le titre, deuxième ligne en gris clair, mots clés en violet ou en pilule noire. Mots géants gris foncé en dégradé pour les temps forts (« digitale », « au bon moment », « simple et claire »).

## Couleurs
Noir quadrillé `#0D0C10` pour le problème, crème `#F8F6F5` pour la solution. Halos flous jaune, orange et lavande. Accents : violet Grow Lot, orange de la carte client, rouge pour les croix.

## Ce qu'on récupère pour la machine
- [ ] Titre deux tons qui suit la voix (noir puis gris) → voix ElevenLabs + horodatage Scribe + GSAP
- [ ] Interfaces reconstruites qui « s'utilisent » (frappe, clic, changement d'état) → HTML/CSS + curseur animé
- [ ] Fond crème avec halos pastel qui dérivent + quadrillage léger → CSS (dégradés radiaux flous)
- [ ] Trait lumineux diagonal comme raccord → bande dégradée qui traverse l'écran
- [ ] Téléphone et ordinateur en perspective → `device-frame-stage`, `multi-device-splay`
- [ ] Compteurs et courbe qui se trace → count-up + SVG stroke-dashoffset
