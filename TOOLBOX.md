# Boîte à outils

Mise à jour à chaque référence analysée. Statut : ✅ prêt · 🟡 à installer ou à activer · ⛔ bloqué.

## Déjà disponible dans la session cloud

| Outil | Type | Sert à | Coût | Statut |
|---|---|---|---|---|
| ElevenLabs | connecteur | voix off (toujours), design de voix, transcription, génération image et vidéo | abonnement ElevenLabs (crédits) | ✅ |
| Google Drive | connecteur | récupérer les vidéos de référence lourdes | gratuit | ✅ |
| Canva | connecteur | visuels statiques, brand kits | gratuit / Pro | ✅ |
| HyperFrames (HeyGen) | connecteur | projets vidéo HTML hébergés chez HeyGen ; création désactivée depuis Claude Code, lecture seule | compte HeyGen | 🟡 |
| ffmpeg | logiciel | découpe, encodage, assemblage vidéo et son | gratuit | ✅ |
| ImageMagick | logiciel | planches d'images, palettes de couleurs | gratuit | ✅ |
| Chromium + Playwright | logiciel | rendre une animation HTML image par image, puis l'encoder en vidéo | gratuit | ✅ |
| Node 22, Python 3.13 | logiciel | faire tourner les moteurs d'animation et les scripts | gratuit | ✅ |
| yt-dlp | logiciel | télécharger une vidéo depuis un lien | gratuit | ⛔ sites vidéo bloqués par le réseau |
| Recherche web | outil Claude | trouver les making-of, tutos, outils | inclus | ✅ |
| `tools/decortique.py` | script maison | découper une référence en planches, transitions, palette, audio | gratuit | ✅ |

## Moteurs d'animation candidats

À choisir après les premières références, selon les techniques qu'on veut reproduire.

| Moteur | Principe | Licence | Coût |
|---|---|---|---|
| [HyperFrames](https://github.com/heygen-com/hyperframes) | HTML + GSAP rendu en MP4, pensé pour être piloté par une IA | Apache 2.0 | gratuit |
| [GSAP](https://gsap.com) | moteur d'animation JS ; SplitText, MorphSVG et tous les plugins inclus | licence GSAP « no charge » | gratuit, même commercial |
| [Remotion](https://www.remotion.dev) | vidéos écrites en React, rendu MP4 | licence Remotion | gratuit pour un particulier ou une boîte de 3 salariés max, payant au-delà |
| [Motion Canvas](https://motioncanvas.io) | animations écrites en TypeScript, très précis pour les schémas et le texte | MIT | gratuit |
| After Effects | la référence du métier | propriétaire | abonnement Adobe, en local uniquement |
| Blender | 3D et rendu | GPL | gratuit, en local uniquement |

## Techniques repérées

Vide pour l'instant : chaque référence analysée ajoute ses techniques ici.

| Technique | Vue dans | Comment la refaire | Outil |
|---|---|---|---|
