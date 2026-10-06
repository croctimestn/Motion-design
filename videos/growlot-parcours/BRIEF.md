---
workflow: product-launch-video
flow: automation
storyboard: yes
message: "Grow Lot transforme chaque visite en jeu : le client joue et revient, le commerçant règle tout en une minute et pilote ses résultats."
destination: reels-tiktok
aspect: "9:16"
language: fr
audience: commerçants indépendants (restaurants, boutiques)
length: 60-90s
angle: parcours en production, côté client puis côté commerçant, puis le tableau de bord SaaS
voice: ElevenLabs Léa (KSyQzmsYhFbuOhqj1Xxv), eleven_v4, ton vif
---

# Grow Lot – Parcours client et commerçant

## Intent
« Je veux un motion qui mets des interfaces aussi, anime-les et montre en prod ce que ça donne pour un client. Genre pour le commerçant, comment ça se passe, et pour l'utilisateur. Ensuite visuel du SaaS. »

Style 12 de `STYLES.md` (Parcours client et commerçant), d'après les deux motions Grow Lot envoyés (`references/growlot-gamification-v3`, `references/growlot-motion-v7`).

## Réponses de l'utilisateur
- Écrans : reconstruits en HTML d'après les deux vidéos de référence.
- Commerce mis en scène : Wokki (fictif, mascotte panda roux), comme dans les références.
- Durée : 60 à 90 s, parcours complet (problème, client, commerçant, tableau de bord, résultats).
- Voix : Léa en eleven_v4, ton vif ; « Grow Lot » écrit « Gros Lot » dans le texte lu.

## Déduit ou par défaut
- Format 9:16 d'abord (les deux références sont en 9:16) ; 16:9 à décliner ensuite si besoin.
- Charte : crème `#F9F8F5`, violet `#5B4294` / `#654a98`, lavande `#c299ff`, jaune `#fdd643`, doré Wokki `#B8863B`, Poppins.
- Musique générée avec ElevenLabs Music ; bruitages de la bibliothèque media-use.
- Chiffres repris de la référence v3 (+10 000 avis collectés, +8 000 abonnés gagnés, 94 % de commerçants satisfaits), confirmés par l'utilisateur.

## Script lu (validé, tags eleven_v4)
> [upbeat] Vos clients adorent votre commerce… mais en ligne, personne ne le sait. Douze avis Google. Un Instagram à plat. Et des clients qui ne reviennent JAMAIS. [excited] Avec Gros Lot, chaque visite devient un jeu… et chaque client, un ambassadeur !
> Côté client ? Il scanne le QR code en caisse. Il s'inscrit en un clic — sans appli à télécharger. Il choisit son jeu, il fait tourner la roue… [gasps] et il GAGNE ! Une boîte de sushis offerte !
> En échange, une petite action : un avis Google, un abonnement Instagram… c'est vous qui choisissez.
> Et pour profiter de son cadeau ? [laughs] Il revient chez vous !
> [excited] Côté commerçant ? Un jeu d'enfant. Vos jeux, vos lots, vos couleurs. Vous réglez tout en quelques clics… et votre QR code est prêt. En UNE minute !
> [upbeat] Ensuite, vous pilotez tout depuis votre tableau de bord : les avis qui tombent, les abonnés qui arrivent, les clients qui reviennent. Et vos relances partent au bon moment — automatiquement.
> [excited] Résultat ? Plus d'avis. Plus d'abonnés. Plus de clients fidèles.
> [happy] Gros Lot ! Faites grandir l'engagement. [excited] Réservez votre démo !

## Production
- Voix : prise v2 sur 4 (rire et relances les plus vivants), normalisée à −15 LUFS, 56,0 s, posée à 0,5 s. Mots horodatés (eleven_scribe_v1) dans `assets/voice-words.js` : chaque mot des titres apparaît pile quand il est dit.
- Musique : ElevenLabs Music, 4 essais, retenu m3 (drop à 10,16 s calé sur « Avec Gros Lot »), ducking sous la voix.
- Bruitages : 76 sons placés à la main sur les actions à l'écran (taps, roue, notifications, volets).
- Flow ElevenLabs : https://elevenlabs.io/app/flows/Z5vHmIazD4LDIcKX1yTF

| Scène | Début (s) | Contenu |
|---|---|---|
| s1-probleme | 0 | Fiche Google à 12 avis, Instagram à plat, « Jamais revenu » |
| s2-bascule | 10,36 | Logo Grow Lot, visite → jeu → client ambassadeur |
| s3-client | 14,6 | Scan, inscription, roue, lot, avis Google, coupon, retour en caisse |
| s4-commercant | 32,9 | Back-office : jeux, lots, couleurs, QR prêt en 1 minute |
| s5-tableau | 40,6 | Tableau de bord, notifications en direct, relances automatiques |
| s6-resultats | 49,7 | +10 000 / +8 000 / 94 % |
| s7-signature | 53,2 | Logo, « Faites grandir l'engagement », « Réservez votre démo » |

Kit d'interface réutilisable : `assets/kit.css` + `assets/kit.js` (téléphone, navigateur, titres synchronisés à la voix, frappe, compteurs, taps, confettis, étoiles, interrupteurs).
