#!/usr/bin/env python3
"""Décortique une vidéo de référence pour l'analyser image par image.

Usage :
    python3 tools/decortique.py <video> [--nom NOM] [--fps 6] [--seuil 0.3]

Produit dans references/<nom>/ :
    infos.txt          durée, fps, résolution, audio
    coupes.txt         timestamps des changements de plan détectés
    planche*.jpg       timeline complète, échantillonnée à --fps images/s
    transition_XX.jpg  chaque coupe image par image (±0.25 s) pour lire la transition
    palette.png/.txt   couleurs dominantes
    audio.mp3          piste son (pour la musique, le rythme, la voix)

Dépendances : ffmpeg, ffprobe, ImageMagick (montage, convert).
"""

import argparse
import json
import re
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

RACINE = Path(__file__).resolve().parent.parent
COLONNES = 6
LIGNES = 6
LARGEUR_VIGNETTE = 320
FENETRE_TRANSITION = 0.25  # secondes avant et après chaque coupe


def run(cmd, **kw):
    return subprocess.run(cmd, check=True, capture_output=True, text=True, **kw)


def sonde(video):
    out = run(["ffprobe", "-v", "error", "-print_format", "json",
               "-show_format", "-show_streams", str(video)]).stdout
    data = json.loads(out)
    v = next(s for s in data["streams"] if s["codec_type"] == "video")
    num, den = v.get("avg_frame_rate", "0/1").split("/")
    fps = float(num) / float(den) if float(den) else 0.0
    return {
        "duree": float(data["format"]["duration"]),
        "fps": fps,
        "largeur": v["width"],
        "hauteur": v["height"],
        "codec": v["codec_name"],
        "audio": any(s["codec_type"] == "audio" for s in data["streams"]),
    }


def detecte_coupes(video, seuil):
    res = subprocess.run(
        ["ffmpeg", "-hide_banner", "-i", str(video), "-map", "0:V:0", "-an",
         "-vf", f"select='gt(scene,{seuil})',showinfo", "-f", "null", "-"],
        capture_output=True, text=True)
    return [float(t) for t in re.findall(r"pts_time:([0-9.]+)", res.stderr)]


def extrait(video, dossier, debut=None, duree=None, fps=None):
    """Extrait des images étiquetées avec leur timestamp."""
    dossier.mkdir(parents=True, exist_ok=True)
    cmd = ["ffmpeg", "-hide_banner", "-loglevel", "error"]
    if debut is not None:
        cmd += ["-ss", f"{debut:.3f}"]
    cmd += ["-i", str(video), "-map", "0:V:0"]
    if duree is not None:
        cmd += ["-t", f"{duree:.3f}"]
    offset = debut or 0.0
    filtres = []
    if fps:
        filtres.append(f"fps={fps}")
    filtres.append(f"scale={LARGEUR_VIGNETTE}:-2")
    # Timestamp en bas à gauche de chaque vignette.
    filtres.append(
        "drawtext=text='%{pts\\:hms\\:" + f"{offset:.3f}" + "}':"
        "x=6:y=h-th-6:fontsize=14:fontcolor=white:box=1:boxcolor=black@0.6:boxborderw=3")
    cmd += ["-vf", ",".join(filtres), "-q:v", "3", str(dossier / "f_%05d.jpg")]
    run(cmd)
    return sorted(dossier.glob("f_*.jpg"))


def planches(images, sortie, prefixe, par_planche=COLONNES * LIGNES):
    fichiers = []
    for i in range(0, len(images), par_planche):
        lot = images[i:i + par_planche]
        unique = par_planche >= len(images)
        cible = sortie / (f"{prefixe}.jpg" if unique else f"{prefixe}_{len(fichiers) + 1:02d}.jpg")
        run(["montage", *map(str, lot), "-tile", f"{COLONNES}x",
             "-geometry", "+2+2", "-background", "#111", str(cible)])
        fichiers.append(cible)
    return fichiers


def palette(images, sortie, n=8):
    echantillon = images[:: max(1, len(images) // 24)]
    mosaique = sortie / "_mosaique.png"
    run(["montage", *map(str, echantillon), "-tile", "6x", "-geometry", "+0+0", str(mosaique)])
    txt = run(["convert", str(mosaique), "-resize", "400x", "+dither", "-colors", str(n),
               "-format", "%c", "histogram:info:"]).stdout
    couleurs = []
    for ligne in txt.splitlines():
        m = re.match(r"\s*(\d+):.*?(#[0-9A-Fa-f]{6})", ligne)
        if m:
            couleurs.append((int(m.group(1)), m.group(2).upper()))
    couleurs.sort(reverse=True)
    total = sum(c for c, _ in couleurs) or 1
    lignes = [f"{hexa}  {100 * c / total:5.1f}%" for c, hexa in couleurs]
    (sortie / "palette.txt").write_text("\n".join(lignes) + "\n")
    # Bandes proportionnelles à la présence de chaque couleur.
    args = []
    for c, hexa in couleurs:
        largeur = max(8, round(800 * c / total))
        args += ["(", "-size", f"{largeur}x120", f"xc:{hexa}", ")"]
    run(["convert", *args, "+append", str(sortie / "palette.png")])
    mosaique.unlink()
    return lignes


def main():
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument("video", type=Path)
    p.add_argument("--nom", help="dossier de sortie dans references/ (défaut : nom du fichier)")
    p.add_argument("--fps", type=float, default=6, help="images/s pour les planches timeline (défaut 6)")
    p.add_argument("--seuil", type=float, default=0.3, help="sensibilité de détection des coupes, 0-1 (défaut 0.3)")
    a = p.parse_args()

    if not a.video.exists():
        sys.exit(f"Fichier introuvable : {a.video}")
    nom = a.nom or re.sub(r"[^a-z0-9]+", "-", a.video.stem.lower()).strip("-")
    sortie = RACINE / "references" / nom
    sortie.mkdir(parents=True, exist_ok=True)

    info = sonde(a.video)
    coupes = detecte_coupes(a.video, a.seuil)
    duree_moy = info["duree"] / (len(coupes) + 1)

    (sortie / "infos.txt").write_text(
        f"source      {a.video.name}\n"
        f"durée       {info['duree']:.2f} s\n"
        f"fps         {info['fps']:.2f}\n"
        f"résolution  {info['largeur']}x{info['hauteur']}\n"
        f"codec       {info['codec']}\n"
        f"audio       {'oui' if info['audio'] else 'non'}\n"
        f"plans       {len(coupes) + 1} (durée moyenne {duree_moy:.2f} s)\n")
    (sortie / "coupes.txt").write_text("".join(f"{t:.3f}\n" for t in coupes))

    with tempfile.TemporaryDirectory() as tmp:
        tmp = Path(tmp)
        timeline = extrait(a.video, tmp / "timeline", fps=a.fps)
        fichiers = planches(timeline, sortie, "planche")

        transitions = []
        for i, t in enumerate(coupes):
            debut = max(0.0, t - FENETRE_TRANSITION)
            images = extrait(a.video, tmp / f"cut{i:03d}", debut=debut, duree=2 * FENETRE_TRANSITION)
            transitions += planches(images, sortie, f"transition_{i + 1:02d}", par_planche=max(1, len(images)))

        couleurs = palette(timeline, sortie)

    if info["audio"]:
        run(["ffmpeg", "-hide_banner", "-loglevel", "error", "-y", "-i", str(a.video),
             "-vn", "-c:a", "libmp3lame", "-q:a", "4", str(sortie / "audio.mp3")])

    print((sortie / "infos.txt").read_text())
    print(f"coupes      {', '.join(f'{t:.2f}s' for t in coupes) or 'aucune'}")
    print(f"planches    {len(fichiers)} timeline, {len(transitions)} transitions")
    print("palette     " + "  ".join(c.split()[0] for c in couleurs))
    print(f"→ {sortie.relative_to(RACINE)}/")


if __name__ == "__main__":
    if not shutil.which("ffmpeg") or not shutil.which("montage"):
        sys.exit("Il faut ffmpeg et ImageMagick installés.")
    main()
