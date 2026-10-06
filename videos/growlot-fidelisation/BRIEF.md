# Grow Lot – Fidélisation ludique

| | |
|---|---|
| Produit | Grow Lot, le jeu qui fait revenir les clients des commerces (QR code → roue → cadeau) |
| Workflow | `/product-launch-video` (HyperFrames) |
| Formats | 9:16 (`index.html`, 1080×1920) puis 16:9 (`../growlot-fidelisation-16x9`, 1920×1080) |
| Durée | 20,1 s |
| Angle | Fidélisation ludique : le client vient une fois, le jeu le fait revenir |
| Ton | Vouvoiement, punchy, chaleureux |
| Voix | ElevenLabs, Léa (`KSyQzmsYhFbuOhqj1Xxv`), modèle eleven_v4 avec balises d'émotion, prise 3 de la série « Gros Lot », normalisée à −15 LUFS |
| Musique | ElevenLabs Music, électro-pop punchy, prise 2, démarrée à 2,91 s pour que le drop tombe sur « REJOUER » (5,1 s) |
| Charte | crème `#fffbee`, jaune `#fdd643`, violet `#654a98`, lavande `#c299ff`, orange `#eb5d3b` · Poppins + Gambarino · mascottes du site |

## Script (texte envoyé à ElevenLabs)

```
[upbeat] [mischievously] Vos clients viennent une fois — [sighs] et puis plus rien.
[excited] Et s'ils revenaient — juste pour REJOUER ?!
[excited] Un QR code ! Ils scannent, ils font tourner la roue… [gasps] et ils GAGNENT ! À TOUS les coups !
[laughs] Leur cadeau les fait revenir. Encore ! Et ENCORE !
[happy] Gros Lot ! Le jeu qui fait revenir vos clients. [excited] Réservez votre démo !
```

« Gros Lot » est écrit comme il se prononce (/ɡʁo lo/) ; à l'écran, le nom reste « Grow Lot ». Une transcription à l'aveugle de l'extrait entend « Grollo ».

## Découpage

| Temps | Scène | Transition d'entrée |
|---|---|---|
| 0 – 3,7 s | S1 Le client passe une fois puis s'en va, l'image se désature | – |
| 3,6 – 6,1 s | S2 « Et s'ils revenaient… juste pour REJOUER ? » (slam sur le drop) | étoile Grow Lot qui remplit l'écran |
| 5,8 – 7,7 s | S3 Chevalet QR code, téléphone, scan, validation | poussée verticale avec flou |
| 7,6 – 11,3 s | S4 Roue de la chance, « GAGNÉ ! », confettis, tampon « 100 % GAGNANT » | plongée dans l'écran du téléphone |
| 11 – 14,8 s | S5 Notification cadeau, retour du client, « ENCORE. » puis « ET ENCORE. » | iris circulaire depuis la carte gagnante, puis coupes sur le temps |
| 14,6 – 20,1 s | S6 Logo, signature, bouton « Réservez votre démo », grow-lot.com | rideau festonné jaune puis lavande |

Les animations ont été écrites sur une première prise (v3) ; le tableau `WARP` du script les recale sur la prise actuelle, mot par mot.

Sous-titres karaoké mot à mot (timings issus de l'alignement Scribe) jusqu'à 13,3 s.

## Rendu

```bash
npx hyperframes check
npx hyperframes render -o renders/growlot-9x16.mp4 --fps 30 -q delivery
```

Pour changer de prise de voix : la générer dans le flow ElevenLabs, la normaliser à −15 LUFS dans `assets/audio/voice.mp3`, la transcrire avec Scribe, puis mettre à jour les nouveaux temps dans `WARP`, `groups` (sous-titres), `tagStarts` (signature) et les `data-start` des clips et des sons. Relancer ensuite `python3 make-16x9.py` pour la version 16:9.
