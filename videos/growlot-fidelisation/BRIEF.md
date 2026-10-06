# Grow Lot – Fidélisation ludique

| | |
|---|---|
| Produit | Grow Lot, le jeu qui fait revenir les clients des commerces (QR code → roue → cadeau) |
| Workflow | `/product-launch-video` (HyperFrames) |
| Formats | 9:16 (`index.html`, 1080×1920) puis 16:9 (`../growlot-fidelisation-16x9`, 1920×1080) |
| Durée | 21,6 s |
| Angle | Fidélisation ludique : le client vient une fois, le jeu le fait revenir |
| Ton | Vouvoiement, punchy, chaleureux |
| Voix | ElevenLabs, Léa (`KSyQzmsYhFbuOhqj1Xxv`), modèle eleven_v3 avec balises d'émotion, prise 4 |
| Musique | ElevenLabs Music, électro-pop punchy, prise 2, calée pour que le drop tombe sur « REJOUER » |
| Charte | crème `#fffbee`, jaune `#fdd643`, violet `#654a98`, lavande `#c299ff`, orange `#eb5d3b` · Poppins + Gambarino · mascottes du site |

## Script (prise retenue)

> Vos clients viennent une fois… *[soupir]* et puis plus rien.
> Et s'ils revenaient… juste pour REJOUER ?
> Un QR code. Ils scannent, ils font tourner la roue… *[souffle de surprise]* et ils gagnent. À tous les coups !
> *[rire]* Leur cadeau les fait revenir. Encore. Et encore.
> Grow Lot (prononcé /ɡʁo lo/). Le jeu qui fait revenir vos clients. Réservez votre démo !

## Découpage

| Temps | Scène | Transition d'entrée |
|---|---|---|
| 0 – 3,9 s | S1 Le client passe une fois puis s'en va, l'image se désature | – |
| 3,8 – 7 s | S2 « Et s'ils revenaient… juste pour REJOUER ? » (slam sur le drop) | étoile Grow Lot qui remplit l'écran |
| 6,6 – 8,7 s | S3 Chevalet QR code, téléphone, scan, validation | poussée verticale avec flou |
| 8,6 – 12,4 s | S4 Roue de la chance, « GAGNÉ ! », confettis, tampon « 100 % GAGNANT » | plongée dans l'écran du téléphone |
| 12,1 – 16 s | S5 Notification cadeau, retour du client, « ENCORE. » puis « ET ENCORE. » | iris circulaire depuis la carte gagnante, puis coupes sur le temps |
| 15,8 – 21,6 s | S6 Logo, signature, bouton « Réservez votre démo », grow-lot.com | rideau festonné jaune puis lavande |

Sous-titres karaoké mot à mot (timings issus de l'alignement Scribe) jusqu'à 14 s.

## Rendu

```bash
npx hyperframes check
npx hyperframes render -o renders/growlot-9x16.mp4 --fps 30 -q delivery
```

Pour changer de prise de voix ou de musique : générer dans le flow ElevenLabs, remplacer `assets/audio/voice.mp3` ou `music.mp3`, puis recaler les timings (`groups` des sous-titres, positions des bruitages).
