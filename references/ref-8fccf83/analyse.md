# taap.it (fichier 8fccf83dbc2df98334ded8d489d02603)

Source : Drive `187T7XREVNAZnb4SuEZ_kCxrqKVkG9lmm` · Auteur : taap.it (outil français de liens intelligents qui ouvrent directement la bonne app)
Format : 16:9 1920×1080, 30 i/s, 54 s · Plans : 8

## Ce qui le rend stylé
Même famille que SNAPSS : voix off en français, texte qui s'écrit mot par mot du gris au noir, fond blanc avec une grille très légère, pilules noires pour les chiffres clés. Ici l'accent est un vert fluo, utilisé en aplat plein écran pour les apparitions du logo. Les téléphones sont dessinés au trait, et un point vert joue le rôle du doigt.

## Décomposition
| Temps | Ce qu'on voit | Technique | Outil probable |
|---|---|---|---|
| 0:00–0:06 | profil Instagram de MrBeast dans un iPhone dessiné au trait, point vert qui tape le lien, la page YouTube s'ouvre dans le navigateur d'Instagram | téléphone au trait + indicateur de toucher + changement d'écran | AE |
| 0:06–0:09 | « cliqué », « www.lelien.com », icônes Spotify, Amazon, TikTok, YouTube qui sautent | mot seul + lien + pops d'icônes | AE |
| 0:11–0:13 | liste à puces radio « Audience / Prospects / Clients » qui se coche | sélection qui descend | AE |
| 0:13 | emojis 3D (fâché, qui fond) qui surgissent | emojis 3D façon Apple | AE + images 3D |
| 0:20–0:24 | fond noir, pilules « Engagement », « Téléchargements », « Ventes » qui glissent sur un rail | carrousel de pilules sur une ligne | AE |
| 0:24–0:26 | aplat vert fluo plein écran, logo taap.it | flash de marque | AE |
| 0:26–0:32 | même parcours, cette fois l'app YouTube s'ouvre directement | avant / après | AE |
| 0:33–0:37 | « Boost » vert en italique gras, interrupteurs qui s'allument, téléphone vert | toggles + gros mot | AE |
| 0:37–0:41 | « Compatible avec +50 applications », icônes flottantes, avatars, pilule « Ça marche » | pilules + nuage d'icônes | AE |
| 0:41–0:46 | photos de créateurs en cartes (Artiste, Créateur de contenu, Seller), « 80% de tes conversions » | cartes photo + pilule chiffre | AE |
| 0:48–0:54 | fond noir, bouton pilule « taap.it » cliqué par un curseur vert qui le remplit | bouton qui se remplit au clic | AE |

## Transitions
Fondus et remplacements sur place. Les flashs vert fluo plein écran servent de ponctuation.

## Typo
Grotesque moderne. Mots en cours de lecture en noir, à venir en gris clair. Pilules noires à texte blanc pour les chiffres. « Boost » en italique gras vert.

## Couleurs
Blanc `#FEFEFE` avec grille légère, noir `#1D1D1D`, vert fluo de marque, rouge YouTube.

## Script de la voix off (extrait avec whisper.cpp)
> *(un mec qui râle, devant son téléphone)* Ça fait tout le temps ça, là, c'est vraiment mal fait ce truc, mec.
> T'as déjà cliqué sur un lien en pensant atterrir direct dans une app et… bam, ça t'ouvre un navigateur. C'est ce que ton audience, prospects, clients vivent tous les jours. Et c'est juste plus possible. Avec zéro accès à son compte et zéro interaction possible, il va juste fermer la page et tout plier à jamais. En gros : moins d'engagement, moins de téléchargements, moins de ventes.
> taap.it change la donne. Avec taap.it, un lien = une redirection directe vers l'application désirée. Pour l'utilisateur, l'expérience est fluide et sans friction. Et toi, tu boostes les conversions, les engagements et tu maximises tes résultats. Compatible avec plus de 50 apps : peu importe où tu veux envoyer ton audience, ça marche. T'es créateur de contenu, artiste, seller ? Si tu peux pas perdre 80 % de tes conversions, t'as besoin de taap.it. Et si tu le fais pas… on ne peut plus rien pour toi.

## Rythme et voix
Structure en 7 temps, réutilisable pour n'importe quel produit :
1. mini-sketch d'ouverture (quelqu'un râle, 5 s) ;
2. question « T'as déjà… ? » qui fait dire « moi aussi » ;
3. trois « moins de… » ;
4. flash de marque « X change la donne » ;
5. une équation simple (« un lien = … ») ;
6. bénéfices puis liste de profils (« T'es… ? ») ;
7. chute qui fait sourire.

Tutoiement, voix très expressive (environ 9 demi-tons d'écart, contre 5 pour une voix off classique), −20 LUFS.

## Ce qu'on récupère pour la machine
- [ ] Texte synchronisé à la voix (gris → noir) → même technique que SNAPSS, à faire une fois et réutiliser
- [ ] iPhone dessiné au trait → `device-frame-stage` en version contour
- [ ] Point vert qui tape → `touch-indicator` (à installer)
- [ ] Pilules sur un rail → `swipe-rail` (à installer)
- [ ] Interrupteurs qui s'allument → `toggle-flip` (à installer)
- [ ] Flash plein écran couleur de marque → simple aplat GSAP
- [ ] Fond à grille légère → `dynamic-grid`
