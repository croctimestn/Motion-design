"""Décline la composition 9:16 (index.html) en 16:9 dans ../growlot-fidelisation-16x9/index.html.

Même timeline, même audio : seules les positions, tailles et origines de zoom changent.
Relancer après chaque modification de index.html :  python3 make-16x9.py
"""
from pathlib import Path

here = Path(__file__).resolve().parent
src = (here / "index.html").read_text()
out_dir = here.parent / "growlot-fidelisation-16x9"
s = src


def rep(a, b, count=1):
    global s
    n = s.count(a)
    if n != count:
        raise SystemExit(f"{n} occurrence(s) au lieu de {count} pour : {a!r}")
    s = s.replace(a, b)


# ---------- cadre ----------
rep('data-resolution="portrait"', 'data-resolution="landscape"')
rep('content="width=1080, height=1920"', 'content="width=1920, height=1080"')
rep("width: 1080px; height: 1920px;", "width: 1920px; height: 1080px;", 5)
rep("width: 1080px;\n        height: 1920px;", "width: 1920px;\n        height: 1080px;")
rep('data-width="1080" data-height="1920"', 'data-width="1920" data-height="1080"')

# ---------- S1 ----------
rep("#s1-blob { left: 340px; top: 790px;", "#s1-blob { left: 760px; top: 330px;")
rep("#s1-chip { left: 0; right: 0; top: 590px;", "#s1-chip { left: 0; right: 0; top: 190px;")
rep("#s1-chip2 { left: 0; right: 0; top: 1060px;", "#s1-chip2 { left: 0; right: 0; top: 560px;")
rep("#s1-shadow { left: 390px; top: 1196px;", "#s1-shadow { left: 810px; top: 736px;")
rep("{ x: -560, rotation: -14 }", "{ x: -1100, rotation: -14 }")
rep("{ x: -560, opacity: 0 }", "{ x: -1100, opacity: 0 }")
rep('tl.to("#s1-blob", { x: 900,', 'tl.to("#s1-blob", { x: 1400,')
rep('tl.to("#s1-shadow", { x: 900,', 'tl.to("#s1-shadow", { x: 1400,')

# ---------- T1 étoile ----------
rep("#fx-star-in { position: absolute; left: 390px; top: 810px;", "#fx-star-in { position: absolute; left: 810px; top: 390px;")
rep("{ x: 420, y: 900, scale: 0.12, rotation: -160 }, { x: 0, y: 0, scale: 26,", "{ x: 900, y: 500, scale: 0.12, rotation: -160 }, { x: 0, y: 0, scale: 34,")

# ---------- S2 ----------
rep("#s2-glow { left: -300px; top: 160px;", "#s2-glow { left: 120px; top: -300px;")
rep("#s2-rays { left: -460px; top: 260px; width: 2000px; height: 2000px; }", "#s2-rays { left: -340px; top: -600px; width: 2600px; height: 2600px; }")
rep('<svg viewBox="-100 -100 200 200" width="2000" height="2000">', '<svg viewBox="-100 -100 200 200" width="2600" height="2600">')
rep("#s2-l1 { top: 470px;", "#s2-l1 { top: 100px;")
rep("#s2-l2 { top: 566px;", "#s2-l2 { top: 196px;")
rep("#s2-l3 { top: 822px;", "#s2-l3 { top: 400px;")
rep("#s2-l4 { top: 1004px;", "#s2-l4 { top: 560px;")
rep("#s2-mascot { left: 300px; top: 1380px; width: 480px; height: 595px; }", "#s2-mascot { left: 1480px; top: 560px; width: 380px; height: 471px; }")
rep('style="left: 120px; top: 960px"', 'style="left: 380px; top: 540px"')
rep('style="left: 900px; top: 930px"', 'style="left: 1500px; top: 470px"')
rep('style="left: 860px; top: 1260px;', 'style="left: 1380px; top: 800px;')
rep('style="left: 170px; top: 1270px;', 'style="left: 420px; top: 820px;')

# ---------- T2 poussée ----------
rep('tl.to("#s2-cam", { y: -1920,', 'tl.to("#s2-cam", { y: -1080,')
rep('tl.fromTo("#s3-cam", { y: 1920 }', 'tl.fromTo("#s3-cam", { y: 1080 }')

# ---------- S3 : la scène 9:16 réduite dans une scène centrée ----------
rep("#s3-tent { left: 240px;", "#s3-stage { position: absolute; left: 593px; top: -157px; width: 1080px; height: 1920px; transform-origin: 0 0; transform: scale(0.68); }\n      #s3-tent { left: 240px;")
rep('<div id="s3-pattern" class="abs"></div>\n          <div id="s3-tent" class="abs">', '<div id="s3-pattern" class="abs"></div>\n          <div id="s3-stage">\n          <div id="s3-tent" class="abs">')
rep('<div class="phone-notch"></div>\n          </div>\n        </div>', '<div class="phone-notch"></div>\n          </div>\n          </div>\n        </div>')
rep('scale: 6.5, duration: 0.3, ease: "power3.in", transformOrigin: "540px 900px"', 'scale: 20, duration: 0.3, ease: "power3.in", transformOrigin: "960px 455px"')

# ---------- S4 : titre à gauche, roue à droite ----------
rep("#s4-head { left: 0; right: 0; top: 150px; display: flex; flex-direction: column; align-items: center; }", "#s4-head { left: 130px; top: 260px; display: flex; flex-direction: column; align-items: flex-start; }")
rep("#s4-title { margin-top: 26px; font-weight: 800; font-size: 82px;", "#s4-title { margin-top: 30px; font-weight: 800; font-size: 88px;")
rep("#s4-sub { margin-top: 16px; font-weight: 600; font-size: 40px;", "#s4-sub { margin-top: 18px; font-weight: 600; font-size: 46px;")
rep("#s4-wheelwrap { left: 130px; top: 600px;", "#s4-wheelwrap { left: 1000px; top: 70px;")
rep("#s4-pointer { left: 485px; top: 548px;", "#s4-pointer { left: 1355px; top: 18px;")
rep("#s4-hl { left: 130px; top: 600px;", "#s4-hl { left: 1000px; top: 70px;")
rep("#s4-card { left: 150px; top: 820px;", "#s4-card { left: 1020px; top: 290px;")
rep("#s4-stamp { left: 0; right: 0; top: 1236px;", "#s4-stamp { left: 1000px; right: 100px; top: 690px;")
rep(".confetti { position: absolute; left: 540px; top: 1010px;", ".confetti { position: absolute; left: 1410px; top: 480px;")
rep("var dx = (rnd() - 0.5) * 1100;", "var dx = (rnd() - 0.5) * 1500;")
rep("var up = -260 - rnd() * 520;", "var up = -180 - rnd() * 300;")
rep("y: up + 1100,", "y: up + 900,")
rep('transformOrigin: "540px 1010px"', 'transformOrigin: "1410px 480px"', 2)

# ---------- T4 iris + S5 ----------
rep('{ clipPath: "circle(0px at 540px 1010px)" }, { clipPath: "circle(1250px at 540px 1010px)"', '{ clipPath: "circle(0px at 1410px 480px)" }, { clipPath: "circle(1650px at 1410px 480px)"')
rep("#s5-ring { left: 140px; top: 600px;", "#s5-ring { left: 1010px; top: 80px;")
rep("{ scale: 2.8, opacity: 0, duration: 0.42", "{ scale: 4, opacity: 0, duration: 0.42")
rep("#s5-notif { left: 110px; top: 210px;", "#s5-notif { left: 120px; top: 330px;")
rep("#s5-blob { left: 340px; top: 790px;", "#s5-blob { left: 1260px; top: 330px;")
rep("#s5-shadow { left: 390px; top: 1196px;", "#s5-shadow { left: 1310px; top: 736px;")
rep("#s5-chip { left: 0; right: 0; top: 620px;", "#s5-chip { left: 1060px; right: 60px; top: 190px;")
rep("#s5-b-word { top: 720px; font-size: 212px;", "#s5-b-word { top: 180px; font-size: 260px;")
rep("#s5-c-et { top: 540px; font-size: 170px;", "#s5-c-et { top: 30px; font-size: 190px;")
rep("#s5-c-word { top: 770px; font-size: 212px;", "#s5-c-word { top: 266px; font-size: 260px;")
rep("#s5-b-count { top: 1000px; }", "#s5-b-count { top: 470px; }")
rep("#s5-c-count { top: 1040px; }", "#s5-c-count { top: 580px; }")
rep("#s5-b-blob { left: 500px; top: 1300px;", "#s5-b-blob { left: 1000px; top: 620px;")
rep("#s5-b-cloud { left: 210px; top: 1450px;", "#s5-b-cloud { left: 680px; top: 760px;")
rep("#s5-c-1 { left: 90px; top: 1370px;", "#s5-c-1 { left: 560px; top: 730px;")
rep("#s5-c-2 { left: 400px; top: 1300px;", "#s5-c-2 { left: 830px; top: 690px;")
rep("#s5-c-3 { left: 700px; top: 1440px;", "#s5-c-3 { left: 1150px; top: 820px;")

# ---------- T5 rideau ----------
rep(".curtain { position: absolute; left: -40px; top: 0; width: 1160px; height: 3600px; }", ".curtain { position: absolute; left: -40px; top: 0; width: 2000px; height: 2400px; }")
rep('<svg viewBox="0 0 1160 3600" preserveAspectRatio="none">', '<svg viewBox="0 0 2000 2400" preserveAspectRatio="none">', 2)
rep('<rect x="0" y="80" width="1160" height="3440" />', '<rect x="0" y="80" width="2000" height="2240" />', 2)
top_row = "".join(f'<circle cx="{70 + 140 * i}" cy="80" r="72" />' for i in range(9))
bottom_row = "".join(f'<circle cx="{70 + 140 * i}" cy="3520" r="72" />' for i in range(9))
rep(top_row, "".join(f'<circle cx="{70 + 140 * i}" cy="80" r="72" />' for i in range(15)), 2)
rep(bottom_row, "".join(f'<circle cx="{70 + 140 * i}" cy="2320" r="72" />' for i in range(15)), 2)
rep("{ y: 1960 }, { y: -3700,", "{ y: 1100 }, { y: -2500,", 2)

# ---------- S6 ----------
rep("#s6-glow { left: -260px; top: 120px;", "#s6-glow { left: 160px; top: -380px;")
rep("bottom: 0; height: 620px;", "bottom: 0; height: 380px;")
rep("#s6-lock { left: 0; right: 0; top: 540px;", "#s6-lock { left: 0; right: 0; top: 150px;")
rep("#s6-tag { left: 90px; right: 90px; top: 930px;", "#s6-tag { left: 120px; right: 120px; top: 460px;")
rep("#s6-cta { left: 0; right: 0; top: 1260px;", "#s6-cta { left: 0; right: 0; top: 640px;")
rep("#s6-url { left: 0; right: 0; top: 1500px;", "#s6-url { left: 0; right: 0; top: 830px;")
rep("#s6-proof { left: 0; right: 0; top: 1584px;", "#s6-proof { left: 0; right: 0; top: 905px;")
rep("#s6-cursor { left: 760px; top: 1480px;", "#s6-cursor { left: 1180px; top: 860px;")
rep("#s6-ripple { left: 620px; top: 1290px;", "#s6-ripple { left: 1040px; top: 670px;")

# ---------- sous-titres ----------
rep(".cg { position: absolute; opacity: 0; left: 70px; right: 70px; top: 1488px; text-align: center; font-weight: 800; font-size: 64px;",
    ".cg { position: absolute; opacity: 0; left: 260px; right: 260px; top: 905px; text-align: center; font-weight: 800; font-size: 56px;")

out_dir.mkdir(exist_ok=True)
(out_dir / "index.html").write_text(s)
print("écrit :", out_dir / "index.html")
