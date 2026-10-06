# Motion Design Machine

Une machine pour produire du motion design ultra stylé, construite à partir de ce qui se fait déjà.

## La méthode

1. **Référence** : on part d'un motion existant qui nous plaît.
2. **Décorticage** : on découpe la vidéo image par image (coupes, transitions, couleurs, rythme).
3. **Extraction** : on identifie les techniques et les outils qui ont servi (typo, transitions, effets, son).
4. **Boîte à outils** : chaque technique trouvée rejoint [`TOOLBOX.md`](TOOLBOX.md), avec l'outil qui permet de la refaire.
5. **Machine** : on assemble les techniques dans un moteur qui génère nos propres motions.

La voix passe toujours par **ElevenLabs**.

## Structure

| Dossier | Contenu |
|---|---|
| `references/` | une fiche d'analyse par motion de référence ([mode d'emploi](references/README.md)) |
| `tools/` | outils d'analyse et de production |
| `machine/` | projet HyperFrames de base, équipé de 45 briques d'animation |
| `GUIDE.md` | format, fichiers et captures à préparer pour chaque motion |
| `TOOLBOX.md` | catalogue des outils et des techniques |

## Démarrer une session

```bash
bash tools/setup.sh
```

## Décortiquer une vidéo

```bash
python3 tools/decortique.py ma_video.mp4 --nom nom-du-motion
```

Il faut `ffmpeg` et ImageMagick. Le résultat arrive dans `references/nom-du-motion/`.
