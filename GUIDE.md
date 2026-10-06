# Préparer un motion

Ce que tu choisis et ce que tu m'envoies avant chaque vidéo. Plus la matière est propre, plus le rendu est stylé.

## 1. Le format

| Diffusion | Format | Taille | Durée conseillée |
|---|---|---|---|
| Site, landing page, YouTube | 16:9 | 1920×1080 | 30 à 90 s |
| Reels, TikTok, Shorts | 9:16 | 1080×1920 | 15 à 30 s |
| Feed LinkedIn ou Instagram | 4:5 | 1080×1350 | 15 à 45 s |
| Publicité | 16:9 ou 9:16 | idem | 6 ou 15 s |

Un même motion peut sortir en plusieurs formats : dis-moi lesquels dès le départ, la mise en page change.

## 2. Ce que tu m'envoies

**Le brief, en 5 lignes**
- le produit et ce qu'il fait ;
- la cible ;
- le message clé, en une phrase ;
- l'action finale attendue (site, essai gratuit, téléchargement) ;
- le ton : sobre, punchy, premium, fun.

**La marque**
- logo en SVG (à défaut, PNG transparent d'au moins 1000 px de large) ;
- couleurs en codes hex, ou l'adresse du site pour que je les extraie ;
- polices : leur nom (idéalement disponibles sur Google Fonts), sinon les fichiers `.woff2` ou `.ttf`.

**L'interface, pour les animations de pages**

| Ce que tu m'envoies | Ce que je peux en faire |
|---|---|
| Lien Figma (un frame par état de l'écran) | je reconstruis l'interface en code : chaque carte, bouton ou ligne s'anime séparément. **Le plus stylé.** |
| Captures d'écran PNG | zooms, inclinaisons 3D, écrans dans un téléphone ou un ordinateur. L'écran bouge comme une image d'un seul bloc. |
| Enregistrement d'écran | vrai parcours dans le produit, habillé de zooms et d'un curseur. |

Règles pour les captures :
- résolution Retina : 2880×1800 pour un écran d'ordinateur, 1179×2556 pour un iPhone ;
- une capture par état à animer (avant le clic, après le clic, menu ouvert…) ;
- toujours la même taille de fenêtre, et le même thème (clair ou sombre) ;
- de fausses données réalistes, aucune donnée personnelle, pas de notifications.

Règles pour les enregistrements d'écran : 60 images/s, au moins 1920×1080, gestes de souris lents et nets. Outils : Screen Studio (Mac, 89 $ une fois) ou Cap (open source, version gratuite).

**Le son**
- le texte de la voix off, s'il y en a une : je la génère avec ElevenLabs. Donne un genre, un âge et un ton, ou le nom d'une voix ElevenLabs ;
- la musique : une ambiance et un tempo (« électro calme, 110 BPM »), ou un fichier dont tu as les droits.

**Les références**
La ou les vidéos qui t'inspirent, avec les passages précis : « la transition à 0:12 », « la typo du début ».

## 3. Où me l'envoyer

| Contenu | Où |
|---|---|
| Captures, logo, détail précis | directement dans le chat |
| Fichiers de moins de 25 Mo | GitHub, dossier `references/a-analyser/` |
| Vidéos lourdes | Google Drive (voir `references/a-analyser/drive.md` pour les réglages) |

## 4. Quel outil pour quel effet

| Tu veux | Outil | Où ça tourne |
|---|---|---|
| Interface qui s'anime : cartes, curseur, zoom, pages qui défilent | HyperFrames + briques du registre | cloud |
| Titres et typo animée | HyperFrames + GSAP | cloud |
| Téléphones et écrans en perspective (CSS 3D) | HyperFrames | cloud |
| Voix off | ElevenLabs | connecteur |
| 3D réaliste, shaders, verre liquide (WebGL) | HyperFrames | ton PC (carte graphique) ou rendu cloud HeyGen |
| Personnage ou illustration animés | After Effects, Rive ou Lottie | hors machine, puis import |
| Maquettes d'interface | Figma | connecteur à brancher |
