---
workflow: product-launch-video
flow: automation
storyboard: no
message: "Ton client a adoré… et tu ne le reverras jamais. Avec Grow Lot, un QR code = un jeu = un client qui revient."
destination: site, LinkedIn, Reels et TikTok
aspect: "16:9 + 9:16"
language: fr
audience: commerçants indépendants (restaurants, boulangeries, coiffeurs, boutiques)
length: 55s
angle: sketch humoristique façon taap.it, fenêtres et tableau de bord en 3D façon Lemon Squeezy et Motion
voice: duo ElevenLabs eleven_v4 — Léa (KSyQzmsYhFbuOhqj1Xxv) narratrice, Oris (BilXxxvRLrA8YTteM2sl) commerçant
---

# Grow Lot – « Il reviendra peut-être » (3D)

## Intent
« Je souhaite tester avec de l'animation 3D comme ci-joint, de l'animation d'onglet comme ci-joint […] des tons de voix dans le style de taap.it, avec de l'humour : tu extrais le script de ce qui me va et tu essaies de faire un truc similaire pour nous, innover, assez corporate et un peu plus animé, plus vivant. »

Références : Lemon Squeezy (`references/lemon-squeezy`, dashboard incliné qui dérive, deux enregistrements d'écran envoyés), Motion (`references/motion-launch`, bureau macOS à fenêtres flottantes), taap.it (`references/ref-8fccf83`, script extrait et structure en 7 temps). Style 13 de `STYLES.md`.

## Réponses de l'utilisateur
- Script : validé tel quel.
- Format : les deux d'un coup (16:9 construit d'abord, 9:16 généré par `make-9x16.py`).
- Ton : tutoiement, comme taap.it.
- Voix : duo commerçant + Léa.

## Script (tags eleven_v4)
**Commerçant (Oris)** : [annoyed] Il avait ADORÉ son pad thaï… [frustrated] et pas un avis. Pas un follow. Et je l'ai jamais revu. [sighs] [sarcastic] Super.

**Léa** : [upbeat] T'as déjà eu un client ravi… qui repart sans laisser d'avis, sans te suivre, et que tu revois JAMAIS ? [sighs] C'est ce que vivent des milliers de commerçants, tous les jours. En gros : moins d'avis, moins d'abonnés, moins de clients qui reviennent.
[excited] Gros Lot change la donne ! Avec Gros Lot : un QR code… égale un jeu… égale un client qui revient. Il scanne, il joue, il gagne… et pour récupérer son lot, il te laisse un avis, il te suit, et surtout… [laughs] il revient !
[upbeat] Et toi ? Tu suis tout depuis ton tableau de bord : avis, abonnés, visites… tout monte. Restau, boulangerie, coiffeur, boutique : ça marche partout. Déjà plus de cent commerces !
[mischievously] Et si tu préfères compter sur le bouche-à-oreille…

**Commerçant** : [hesitant] … Il reviendra peut-être.

**Léa** : [deadpan] Ou pas. [happy] Gros Lot. Faites grandir l'engagement !

## Production
- Voix : 4 prises de chaque personnage. Léa prise 2 (la 3 sautait une phrase), commerçant prise 1 (la plus expressive). Montage du duo : commerçant 0,2 s → Léa 8,2 s → commerçant 47,96 s → Léa 49,99 s ; normalisé à −15 LUFS. Mots horodatés par whisper.cpp dans `assets/voice-words.js` (avec le locuteur).
- Musique : ElevenLabs Music v2.5, 3 essais, retenu le 3 (intro calme sous le commerçant, groove à l'arrivée de Léa), décalé de 0,45 s pour qu'un temps fort tombe sur le flash de marque ; coupée à 3 % pendant l'attente comique (47,4 → 49,9 s).
- Bruitages : 62 placés à la main ; trombone triste et scratch de vinyle générés avec ElevenLabs Sound Effects, tic-tac synthétisé.
- Flow ElevenLabs : https://elevenlabs.io/app/flows/iZKATa0b8fHecIjdFuwe

| Scène | Début (s) | Contenu |
|---|---|---|
| s1-bureau | 0 | bureau macOS, fenêtres Google, Instagram et caisse en 3D, sous-titres en pilules, tout s'affaisse sur « Super. » |
| s2-question | 7,8 | aplat violet, question mot par mot, ellipse sur « JAMAIS », cartes fantômes en profondeur |
| s3-moins | 17,3 | rail de pilules « moins de… » sur fond sombre |
| s4-flash | 20,8 | flash jaune Grow Lot « change la donne » |
| s5-equation | 22,45 | QR code = jeu = client qui revient, cartes 3D |
| s6-parcours | 26,85 | téléphone 3D (scan, roue, lot) puis fenêtres avis, abonnement, carte fidélité |
| s7-dashboard | 34,45 | tableau de bord incliné qui dérive, onglets, KPI, courbe « tout monte » |
| s8-metiers | 39,4 | restos, boulangeries, coiffeurs, boutiques, « Déjà +100 commerces » |
| s9-chute | 44,5 | caisse avec toile d'araignée, horloge, « Il reviendra peut-être. », tampon « Ou pas. » |
| s10-logo | 50,3 | logo, « Faites grandir l'engagement », grow-lot.com |

## Deux formats, une source
Les scènes lisent `window.FMT` (« h » ou « v ») et choisissent leur mise en page avec `Kit.P(h, v)`. Après toute modification ici, lancer `python3 make-9x16.py` pour régénérer `videos/growlot-3d-9x16`.
