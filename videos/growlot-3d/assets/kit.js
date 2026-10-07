/* Kit d'animation Grow Lot : aides partagées par les scènes (chargé par index.html, après GSAP et voice-words.js).
   Tout est déterministe : pas d'horloge, hasard tiré d'une graine. */
window.Kit = (function () {
  var VOICE_OFFSET = 0; // la piste voix est déjà calée sur la vidéo

  function rng(seed) {
    var a = seed | 0;
    return function () {
      a = (a + 0x6d2b79f5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  // Horloge de scène : temps de la voix -> temps local de la scène
  function clock(sceneStart) {
    return function (voiceTime) {
      return Math.round((voiceTime + VOICE_OFFSET - sceneStart) * 1000) / 1000;
    };
  }

  function norm(s) {
    return s.toLowerCase().replace(/[…,.!?:;«»"()\[\]—–]/g, "").replace(/’/g, "'").trim();
  }

  // Instant (voix) du premier mot `word` prononcé à partir de `from`
  function when(word, from) {
    var n = norm(word);
    var list = window.VO_WORDS || [];
    for (var i = 0; i < list.length; i++) {
      if (list[i][1] >= (from || 0) - 0.05 && norm(list[i][0]) === n) return list[i][1];
    }
    return null;
  }

  function el(tag, cls, parent, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html !== undefined) e.innerHTML = html;
    if (parent) parent.appendChild(e);
    return e;
  }

  /* Titre deux tons calé sur la voix.
     lines : ["texte", "~ligne grise", "^ligne violette"] ; [mot] = pilule noire, {mot} = pilule violette.
     opts : { from: temps voix du début, out: temps voix de sortie, clock, dark } */
  function headline(tl, parent, lines, opts) {
    var v = opts.clock;
    var box = el("div", "k-hl" + (opts.dark ? " k-on-dark" : ""), parent);
    if (opts.top !== undefined) box.style.top = opts.top + "px";
    var cursor = opts.from || 0;
    var last = v(cursor);
    lines.forEach(function (raw) {
      var cls = "k-line";
      if (raw[0] === "~") { cls += " k-soft"; raw = raw.slice(1); }
      else if (raw[0] === "^") { cls += " k-violet"; raw = raw.slice(1); }
      var line = el("div", cls, box);
      raw.split(" ").forEach(function (tok) {
        var pill = null;
        if (tok[0] === "[") { pill = "k-pill"; tok = tok.replace(/[\[\]]/g, ""); }
        else if (tok[0] === "!" && tok.length > 1) { pill = "k-pill k-pr"; tok = tok.slice(1); }
        else if (tok[0] === "{") { pill = "k-pill k-pv"; tok = tok.replace(/[{}]/g, ""); }
        var w = el("span", pill ? "k-w " + pill : "k-w", line);
        w.textContent = tok;
        var at = when(tok.split("\u00a0")[0], cursor);
        var t;
        if (at !== null && at - cursor < 3) { t = v(at) - 0.04; cursor = at + 0.01; }
        else { t = last + 0.12; }
        last = t;
        tl.fromTo(w, { opacity: 0, y: 34, filter: "blur(14px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.34, ease: "power3.out" }, Math.max(0, t));
      });
    });
    if (opts.out !== undefined) {
      tl.to(box, { opacity: 0, y: -26, filter: "blur(12px)", duration: 0.24, ease: "power2.in" }, v(opts.out));
    }
    return box;
  }

  // Frappe au clavier : un caractère après l'autre, curseur qui suit
  function type(tl, target, text, t, cps) {
    cps = cps || 20;
    target.innerHTML = "";
    var chars = [], glyphs = Array.from(text);
    text = glyphs;
    for (var i = 0; i < glyphs.length; i++) {
      var c = el("span", "", target);
      c.textContent = glyphs[i];
      c.style.whiteSpace = "pre";
      c.style.opacity = "0";
      chars.push(c);
    }
    var caret = el("span", "k-caret", target);
    chars.forEach(function (c, i) {
      tl.set(c, { opacity: 1 }, t + i / cps);
    });
    tl.fromTo(caret, { opacity: 1 }, { opacity: 0, duration: 0.3, repeat: 3, yoyo: true, ease: "steps(1)" }, t + text.length / cps);
    return t + text.length / cps;
  }

  // Compteur qui défile
  function count(tl, target, from, to, t, dur, fmt) {
    var o = { v: from };
    fmt = fmt || function (x) { return Math.round(x).toLocaleString("fr-FR"); };
    target.textContent = fmt(from);
    tl.to(o, { v: to, duration: dur, ease: "power2.out", onUpdate: function () { target.textContent = fmt(o.v); } }, t);
  }

  // Appui du doigt
  function tap(tl, parent, x, y, t) {
    var r = el("div", "k-tap", parent);
    r.style.left = x + "px";
    r.style.top = y + "px";
    tl.fromTo(r, { scale: 0.4, opacity: 0.95 }, { scale: 1.5, opacity: 0, duration: 0.5, ease: "power2.out", immediateRender: false }, t);
    return r;
  }

  // Confettis tirés d'une graine
  function confetti(tl, parent, o) {
    var r = rng(o.seed || 7);
    var colors = o.colors || ["#fdd643", "#5b3fa0", "#eb5d3b", "#c7b3ff", "#22b35e", "#ffffff"];
    for (var i = 0; i < (o.n || 40); i++) {
      var p = el("div", "k-conf", parent);
      p.style.left = o.x + "px";
      p.style.top = o.y + "px";
      p.style.background = colors[i % colors.length];
      if (i % 3 === 0) { p.style.width = "18px"; p.style.height = "18px"; p.style.borderRadius = "50%"; }
      var dx = (r() - 0.5) * (o.spread || 900);
      var up = -(o.up || 420) * (0.4 + r() * 0.8);
      var rot = (r() - 0.5) * 900;
      var t0 = o.t + r() * 0.08;
      tl.fromTo(p, { opacity: 0, x: 0, y: 0, rotation: 0 }, { opacity: 1, x: dx * 0.08, duration: 0.08, ease: "none", immediateRender: false }, t0);
      tl.to(p, { x: dx, rotation: rot, duration: 1.62, ease: "power1.out" }, t0 + 0.08);
      tl.to(p, { y: up, duration: 0.5, ease: "power2.out" }, t0);
      tl.to(p, { y: up + (o.fall || 1100), duration: 1.2, ease: "power2.in" }, t0 + 0.5);
      tl.to(p, { opacity: 0, duration: 0.3 }, t0 + 1.4);
    }
  }

  function starSVG(color) {
    return '<svg viewBox="0 0 24 24"><path d="M12 1.8l3.1 6.5 7.1.9-5.2 4.9 1.3 7.1L12 17.8l-6.3 3.4 1.3-7.1L1.8 9.2l7.1-.9z" fill="' + color + '"/></svg>';
  }

  // Rangée d'étoiles : gris dessous, jaunes au-dessus (à faire apparaître)
  function stars(parent, size, n) {
    var row = el("div", "k-stars", parent);
    var on = [];
    for (var i = 0; i < (n || 5); i++) {
      var s = el("div", "k-star", row);
      s.style.width = s.style.height = size + "px";
      el("div", "k-fill", s, starSVG("#e3dee9"));
      on.push(el("div", "k-fill", s, starSVG("#f5b400")));
    }
    return { row: row, on: on };
  }

  function toggleOn(tl, toggle, t) {
    tl.fromTo(toggle.querySelector(".k-knob"), { x: 0 }, { x: 32, duration: 0.22, ease: "power2.out" }, t);
    tl.fromTo(toggle.querySelector(".k-on"), { opacity: 0 }, { opacity: 1, duration: 0.18 }, t);
  }

  function toggleEl(parent) {
    var tg = el("div", "k-toggle", parent);
    el("div", "k-on", tg);
    el("div", "k-knob", tg);
    return tg;
  }


  /* ---------- ajouts motion 3D ---------- */
  var V = window.FMT === "v";
  if (V) document.documentElement.classList.add("fmt-v");
  function P(h, v) { return V ? v : h; }

  // Fenêtre macOS : renvoie {win, body}
  function win(parent, o) {
    var w = el("div", "k-win" + (o.dark ? " k-dark" : "") + (o.cls ? " " + o.cls : ""), parent);
    if (o.id) w.id = o.id;
    w.style.left = o.x + "px"; w.style.top = o.y + "px"; w.style.width = o.w + "px"; w.style.height = o.h + "px";
    var bar = el("div", "k-wbar", w, "<i></i><i></i><i></i>");
    if (o.title) el("div", "k-wt", bar, o.title);
    var body = el("div", "k-wbody", w);
    return { win: w, body: body };
  }

  // Mots prononcés entre deux instants (vidéo), filtrés par locuteur
  function words(t0, t1, who) {
    return (window.VO_WORDS || []).filter(function (w) { return w[1] >= t0 - 0.02 && w[1] < t1 && (!who || w[3] === who); });
  }

  // Sous-titres en pilules, une ligne à la fois (groupes de mots), mot par mot
  function captions(tl, parent, groups, o) {
    var v = o.clock;
    groups.forEach(function (g) {
      var box = el("div", "k-cap", parent);
      box.style.top = o.top + "px";
      if (o.size) box.style.fontSize = o.size + "px";
      var ws = words(g[0], g[1], o.who);
      ws.forEach(function (w) {
        var e = el("span", "k-cw" + ((o.hot || []).indexOf(w[0].replace(/[,.!?…]/g, "")) >= 0 ? " k-hot" : ""), box);
        e.textContent = w[0];
        if (o.size) e.style.fontSize = o.size + "px";
        tl.fromTo(e, { opacity: 0, y: 18, scale: 0.85 }, { opacity: 1, y: 0, scale: 1, duration: 0.18, ease: "back.out(2.4)" }, v(w[1]) - 0.03);
      });
      tl.to(box, { opacity: 0, y: -12, duration: 0.16, ease: "power2.in" }, v(g[2] !== undefined ? g[2] : g[1]));
    });
  }

  /* Gros texte : lignes de tokens, chaque mot apparaît quand il est dit.
     lines : ["mot mot", ...] ; préfixe "~" = ligne atténuée. opts : {clock, from, top, size, ink, out, outY} */
  function say(tl, parent, lines, opts) {
    var v = opts.clock;
    var box = el("div", "k-say" + (opts.ink ? " k-ink" : ""), parent);
    box.style.top = opts.top + "px";
    box.style.fontSize = (opts.size || 96) + "px";
    var cursor = opts.from || 0, last = v(cursor), spans = {};
    lines.forEach(function (raw) {
      var dim = raw[0] === "~"; if (dim) raw = raw.slice(1);
      var line = el("div", "k-sl" + (dim ? " k-dim" : ""), box);
      raw.split(" ").forEach(function (tok) {
        var key = null;
        var m = tok.match(/^#(\w+):(.*)$/); if (m) { key = m[1]; tok = m[2]; }
        var w = el("span", "k-w", line);
        w.textContent = tok.replace(/_/g, " ");
        if (key) spans[key] = w;
        var at = when(tok.split("_")[0], cursor), t;
        if (at !== null && at - cursor < 3) { t = v(at) - 0.05; cursor = at + 0.01; } else { t = last + 0.1; }
        last = t;
        tl.fromTo(w, { opacity: 0, y: 40, filter: "blur(16px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.32, ease: "power3.out" }, Math.max(0, t));
      });
    });
    if (opts.out !== undefined) tl.to(box, { opacity: 0, y: opts.outY || -40, filter: "blur(14px)", duration: 0.26, ease: "power2.in" }, v(opts.out));
    box.spans = spans;
    return box;
  }

  // Gribouillis autour / sous un mot : le SVG vit dans le mot (aucune mesure nécessaire)
  function scribble(tl, target, kind, t, o) {
    o = o || {};
    target.style.position = "relative";
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "k-scrib");
    svg.setAttribute("viewBox", "0 0 100 100");
    svg.setAttribute("preserveAspectRatio", "none");
    if (kind === "under") { svg.style.left = "-4%"; svg.style.width = "108%"; svg.style.top = "62%"; svg.style.height = "50%"; }
    else { svg.style.left = "-16%"; svg.style.width = "132%"; svg.style.top = "-22%"; svg.style.height = "150%"; }
    var d = kind === "under"
      ? "M2 58 C 25 40, 60 66, 98 44"
      : "M44 4 C 104 0, 106 92, 50 96 C -6 98, -6 6, 64 8";
    var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", d);
    path.setAttribute("vector-effect", "non-scaling-stroke");
    path.setAttribute("stroke-width", o.width || 9);
    if (o.color) path.style.stroke = o.color;
    svg.appendChild(path);
    target.appendChild(svg);
    // révélation de gauche à droite (pas de pointillés : le trait reste continu quelle que soit l'échelle)
    tl.fromTo(svg, { clipPath: "inset(-20% 100% -20% -5%)" }, { clipPath: "inset(-20% -5% -20% -5%)", duration: o.dur || 0.45, ease: "power2.inOut" }, t);
    return svg;
  }

  // Sortie verticale floutée (faux flou de mouvement)
  function zipOut(tl, target, t, o) {
    o = o || {};
    tl.to(target, { y: o.y || -1400, scaleY: 1.12, filter: "blur(22px)", opacity: o.fade === false ? 1 : 0.85, duration: o.dur || 0.42, ease: "power3.in" }, t);
  }

  return { V: V, P: P, win: win, words: words, captions: captions, say: say, scribble: scribble, zipOut: zipOut, rng: rng, clock: clock, when: when, el: el, headline: headline, type: type, count: count, tap: tap, confetti: confetti, starSVG: starSVG, stars: stars, toggleOn: toggleOn, toggleEl: toggleEl };
})();
