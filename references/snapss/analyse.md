# SNAPSS – Cartes de fidélité digitales

Source : Drive `1j08yQKZ-7FPNySVYk3Q754cKqFpWN-rn` · Auteur : SNAPSS (start-up française)
Format : 16:9 1920×1080, 60 i/s, 1 min 06 · Plans : 3 (le reste est enchaîné)

## Ce qui le rend stylé
Le texte suit la voix off mot par mot : le mot prononcé passe en noir gras, les suivants attendent en gris clair. Récit en deux temps : le problème sur fond noir avec des objets qui tombent, la solution sur fond blanc avec des morceaux d'interface reliés par des pointillés. Les 60 i/s rendent tout très fluide.

## Décomposition
| Temps | Ce qu'on voit | Technique | Outil probable |
|---|---|---|---|
| 0:00–0:02 | commerce en photo, avatars clients qui flottent puis se brisent | photo détourée + cartes d'avatar + éclatement | AE |
| 0:03–0:08 | « le problème » entouré de tuiles « ? », aimant 3D rouge, croix rouges en tuiles inclinées | objets 3D et tuiles qui tombent en rotation | AE + rendus 3D |
| 0:08–0:12 | vraies cartes de fidélité papier en vrac, badges « NEW » | photos détourées qui flottent | AE |
| 0:15–0:16 | « stop » répété verticalement, défilement | typo répétée en colonne | AE |
| 0:16–0:19 | passage au blanc, « SNAPSS », « votre carte de fidélité » puis pilule noire « devient enfin » | mot surligné en pilule inversée | AE |
| 0:19–0:20 | « digitale » géant, une carte de fidélité inclinée passe devant | mot géant + objet en avant-plan (profondeur) | AE |
| 0:20–0:23 | boutons Google Wallet / Apple Wallet reliés par des pointillés, curseur qui clique | cartes d'UI + connecteurs en pointillés qui se tracent | AE |
| 0:23–0:30 | iPhones en perspective, notification, carte avec cercle de géolocalisation | téléphones 3D + notification + carte | AE (+ Rotato possible) |
| 0:31 | « au bon moment » géant, tuiles ✓ bleues | mot géant + tuiles | AE |
| 0:43–0:47 | ordinateur en perspective avec le dashboard, « simple et claire » qui glisse, graphiques flottants | appareil 3D + mot géant en travelling | AE |
| 0:48–0:54 | ticket de caisse « analysé automatiquement », halo pastel, mots en dégradé | dégradé flou animé + texte dégradé | AE |

## Transitions
Peu de coupes : le texte se remplace mot par mot pendant que les éléments d'UI entrent et sortent. Une seule bascule forte, du noir au blanc.

## Typo
Grotesque moderne (style Inter ou Satoshi), grasse pour le mot prononcé, légère et grise pour les autres. Mots géants en gris foncé pour les temps forts.

## Couleurs
Noir quadrillé pour le problème, blanc `#FDFDFD` pour la solution. Accents : rouge (croix, aimant), bleu (✓), dégradé orange-rose de la carte, halo pastel pour l'IA.

## Ce qu'on récupère pour la machine
- [ ] Texte synchronisé à la voix : mot prononcé en noir, suivants en gris → voix ElevenLabs + transcription horodatée + GSAP (workflow captions de HyperFrames)
- [ ] Bascule problème (noir) → solution (blanc) → structure de récit réutilisable
- [ ] Connecteurs en pointillés entre cartes d'UI → `tracing-beam` ou SVG stroke-dashoffset
- [ ] Mot géant avec objet qui passe devant → calques HTML superposés (z-index) + GSAP
- [ ] Tuiles qui tombent en rotation → GSAP + physique simple (`physical-exit`)
- [ ] Téléphones et ordinateur en perspective → `multi-device-splay`, `device-frame-stage`
- [ ] 60 i/s → réglage du rendu HyperFrames
