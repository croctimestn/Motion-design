# Ornadyne O1

Source : Drive `1SEQKJYv6_Rh1BfZOImUvzC2cYdooH5zk` · Auteur : Ornadyne (start-up de drones en forme d'oiseau)
Format : 16:9 1920×1080, 24 i/s, 56 s · Plans : 35 (1,6 s en moyenne)

## Ce qui le rend stylé
Un lancement de produit matériel façon bande-annonce documentaire : une question tapée sur fond noir, des images d'archives dans un cadre de vieux téléviseur, des images militaires avec des cadres de détection, puis le produit en 3D dans un studio sombre. Le logo final est un dessin au trait qui se trace en tourbillons.

## Décomposition
| Temps | Ce qu'on voit | Technique | Outil probable |
|---|---|---|---|
| 0:00–0:06 | « What if birds weren't real? » tapé lettre par lettre, curseur fin | machine à écrire sur noir | AE |
| 0:06–0:12 | photos d'archives, croquis de Léonard de Vinci, essais d'ornithoptères, dans un cadre arrondi façon écran cathodique | images d'archives + cadre vintage, grain, vignettage | Premiere + AE |
| 0:12–0:15 | aigle qui pêche, sous-titre bas en minuscules | images d'archives + sous-titres discrets | Premiere |
| 0:15–0:20 | drone dans le ciel, forme d'onde audio en surimpression, cadre de détection cyan | waveform + boîte de suivi (HUD) | AE |
| 0:20–0:26 | drone écrasé, écran militaire « FLIGHT TIME », cadre rouge sur une cible | images d'actualité + cadres HUD | AE |
| 0:27–0:29 | « Introducing O1 » tapé sur un oiseau flou | machine à écrire sur image floue | AE |
| 0:30–0:47 | le drone-oiseau en 3D, studio noir, lumière de contour, rotation lente | rendu 3D produit (turntable) | Blender, C4D ou KeyShot |
| 0:47–0:49 | morphing vers un vrai corbeau, flash en négatif | fondu morph + inversion des couleurs | AE (+ vidéo IA possible) |
| 0:49–0:54 | « Ornadyne », traits blancs qui tourbillonnent et dessinent l'emblème circulaire | dessin au trait animé (tracé de contour) | AE (trim paths) |

## Transitions
Coupes rapides au rythme de la voix off, un flash négatif avant le logo, des fondus au noir entre les chapitres.

## Typo
Grotesque géométrique ronde, blanche. Sous-titres très petits en minuscules, centrés en bas.

## Couleurs
Noir et gris anthracite, images d'archives désaturées, accents cyan et rouge pour les cadres HUD.

## Ce qu'on récupère pour la machine
- [ ] Machine à écrire avec curseur → bloc `notes-reveal` ou GSAP `TextPlugin`
- [ ] Cadre de vieux téléviseur + grain → recherche registre « crt », « film grain » (`yt-screen-warp` en partie)
- [ ] Cadres de détection HUD → div bordée animée en GSAP
- [ ] Forme d'onde audio → bloc audio-réactif HyperFrames
- [ ] Dessin au trait qui se trace → SVG + `DrawSVGPlugin`
- [ ] Hors machine : images d'archives, rendus 3D du produit (à fournir ou à générer)
