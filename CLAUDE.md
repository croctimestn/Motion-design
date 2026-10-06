# Motion Design Machine

Projet mené en français avec l'utilisateur, étape par étape. Lire `README.md` (méthode), `STYLES.md` (catalogue de styles), `GUIDE.md` (ce que l'utilisateur prépare) et `TOOLBOX.md` (outils) avant de commencer.

## Rôle

Conseiller l'utilisateur à chaque motion : quel outil utiliser, quel format choisir, quelles informations, captures ou fichiers m'envoyer. On va créer beaucoup de styles de motion différents : partir d'un style de `STYLES.md` et lui demander exactement ce que sa fiche liste.

## Début de session

Lancer `bash tools/setup.sh` : il réinstalle les skills HyperFrames, motion-anything et GSAP, le navigateur de rendu, et remplace les CDN par les copies locales. Les skills `/hyperframes`, `/product-launch-video`, `/motion-graphics` et `/motion-anything` deviennent alors disponibles.

## Règles

- Moteur de rendu : HyperFrames (HTML + GSAP → MP4), projet de base dans `machine/`. Passer par le skill `/hyperframes` pour toute création vidéo.
- Avant de coder un effet à la main, chercher une brique dans le registre (`npx hyperframes catalog <mots>`), puis lancer `bash tools/offline.sh` après chaque `hyperframes add`.
- Pas de WebGL dans le cloud : les briques 3D réalistes et shaders se rendent sur le PC de l'utilisateur ou via le rendu cloud HeyGen.
- Voix : toujours ElevenLabs.
- Références : les 14 vidéos du Drive sont analysées (`references/*/analyse.md`). Pour une nouvelle référence : la décortiquer avec `tools/decortique.py --fps 2`, écrire une fiche `references/<nom>/analyse.md`, ajouter ses techniques au tableau « Techniques repérées » de `TOOLBOX.md` et, si c'est un nouveau style, une entrée dans `STYLES.md`. Les planches et l'audio ne sont pas versionnés : les régénérer au besoin.
