/* Motion runtime: deterministic GSAP timeline driven by timing.json (voice-synced).
 *  - Preview: open the episode in a browser, press Space / click "Lecture".
 *  - Render:  tools/render.mjs calls window.__seek(t) frame by frame.
 * World coordinates = app coordinates (camera zooms/pans over #world).
 */
(function () {
  const W = 1920;
  const H = 1080;
  const $ = (s, root = document) => (typeof s === 'string' ? root.querySelector(s) : s);
  const $$ = (s, root = document) => Array.from(root.querySelectorAll(s));

  async function inlineIcons() {
    const els = $$('[data-icon]');
    const names = [...new Set(els.map((e) => e.dataset.icon))];
    const svgs = {};
    await Promise.all(
      names.map(async (n) => {
        const r = await fetch(`/node_modules/lucide-static/icons/${n}.svg`);
        if (!r.ok) throw new Error(`icon not found: ${n}`);
        svgs[n] = (await r.text()).replace(/<!--.*?-->/gs, '').replace('class="lucide', 'class="ico lucide');
      })
    );
    for (const e of els) {
      e.outerHTML = svgs[e.dataset.icon];
    }
  }

  // ---------- Brand (charte graphique Grow Lot) ----------
  // Official files only, from Drive « Brand Guidline (DA) - Grow Lot / Ressources / Logo ».
  // Never redraw the logo: if a file is missing, init() fails so nothing renders with a fake logo.
  const BRAND = {
    typo: '/assets/brand/logo-typo.svg', // « Logo typo.svg » (wordmark)
    icons: ['/assets/brand/logo-icon.svg', '/assets/brand/logo-icon.png'], // « Icône » (étoile jaune)
  };
  let brandTypo = null;
  let brandIcon = null;
  async function loadBrand() {
    const r = await fetch(BRAND.typo);
    if (!r.ok) throw new Error(`Logo officiel manquant : ${BRAND.typo}`);
    brandTypo = (await r.text()).replace(/<\?xml[^>]*>/, '').replace('<svg ', '<svg class="gl-typo" ');
    for (const src of BRAND.icons) {
      const res = await fetch(src, { method: 'HEAD' });
      if (res.ok) {
        brandIcon = src;
        break;
      }
    }
    if (!brandIcon) throw new Error(`Icône officielle manquante : ${BRAND.icons.join(' ou ')} (charte Drive, dossier Logo, « Icône »)`);
  }
  // logo({ h: 96, typo: true, icon: true }) → HTML of the official logo, h = icon height in px
  function logo({ h = 48, typo = true, icon = true, color = 'currentColor' } = {}) {
    if (!brandTypo || !brandIcon) throw new Error('logo() appelé avant le chargement de la charte');
    return `<span class="gl-logo" style="--h:${h}px;color:${color}">${icon ? `<img class="gl-icon" src="${brandIcon}" alt="">` : ''}${typo ? brandTypo : ''}</span>`;
  }

  // Shared app shell (sidebar + topbar). Returns the .page element where the episode puts its content.
  function shell(win, { active = 'dashboard', establishment = 'SauceQuiPeut' } = {}) {
    const items = [
      ['dashboard', 'layout-grid', 'Tableau de bord'],
      ['clients', 'users', 'Clients'],
      ['labs', 'sparkles', 'Grow Labs'],
      ['marketing', 'mail', 'Marketing'],
      ['reputation', 'star', 'Réputation'],
      ['boutique', 'shopping-cart', 'Boutique'],
    ];
    win.innerHTML = `
      <aside class="sidebar">
        <div class="brand" data-logo="58"></div>
        <div class="side-label">Établissement</div>
        <div class="select"><span class="dot"></span>${establishment}<i data-icon="chevron-down"></i></div>
        <div class="side-label" style="margin-top:38px">Menu</div>
        <nav class="menu">${items
          .map(([id, ic, label]) => `<div class="menu-item${id === active ? ' active' : ''}" data-menu="${id}"><span class="active-bg"></span><i data-icon="${ic}"></i><span>${label}</span></div>`)
          .join('')}</nav>
        <div class="plan"><small>Plan actuel</small><b>Réseau</b><div class="btn-plan">Gérer mon offre</div></div>
      </aside>
      <section class="main">
        <header class="topbar">
          <div class="coin"><i></i>49150</div>
          <i data-icon="bell" class="bell"></i>
          <div class="user-pill"><span class="avatar-sm">P</span>Pixmo</div>
          <div class="lang"><span class="emoji">🇫🇷</span>FR<i data-icon="chevron-down"></i></div>
        </header>
        <div class="page"></div>
      </section>`;
    return $('.page', win);
  }

  function worldRect(el) {
    el = $(el);
    if (!el) throw new Error('worldRect: element not found');
    let x = 0;
    let y = 0;
    let n = el;
    const world = $('#world');
    while (n && n !== world) {
      x += n.offsetLeft;
      y += n.offsetTop;
      n = n.offsetParent;
    }
    return { x, y, w: el.offsetWidth, h: el.offsetHeight };
  }

  function unionRect(targets) {
    const rs = [].concat(targets).map(worldRect);
    const x = Math.min(...rs.map((r) => r.x));
    const y = Math.min(...rs.map((r) => r.y));
    return { x, y, w: Math.max(...rs.map((r) => r.x + r.w)) - x, h: Math.max(...rs.map((r) => r.y + r.h)) - y };
  }

  async function init({ timingUrl = 'timing.json' } = {}) {
    const timing = await (await fetch(timingUrl)).json();
    await inlineIcons();
    await loadBrand();
    $$('[data-logo]').forEach((el) => (el.innerHTML = logo({ h: +el.dataset.logo })));
    // load every weight before measuring anything: fallback-font metrics would shift the layout
    await Promise.all(
      ['400', '500', '600', '650', '700', '750', '780'].map((w) => document.fonts.load(`${w} 20px "Inter Variable"`))
    ).catch(() => {});
    await document.fonts.load('20px "Noto Color Emoji"', '🎉📦🇫🇷').catch(() => {});
    await document.fonts.ready;
    // render hooks run after every seek (GSAP callbacks are suppressed while seeking)
    const hooks = [];

    const world = $('#world');
    const hud = $('#hud');
    const tl = gsap.timeline({ paused: true });
    tl.set({}, {}, timing.duration);

    // ---------- camera ----------
    const cam = { x: W / 2, y: H / 2, s: 1 };
    const applyCam = () => {
      world.style.transform = `translate(${W / 2 - cam.x * cam.s}px, ${H / 2 - cam.y * cam.s}px) scale(${cam.s})`;
    };
    function camTarget(target, o = {}) {
      if (target && typeof target.x === 'number' && typeof target.s === 'number') return target;
      const r = unionRect(target);
      const pad = o.pad ?? 70;
      const s = o.zoom ?? Math.min(W / (r.w + pad * 2), H / (r.h + pad * 2), o.max ?? 3);
      return { x: r.x + r.w / 2 + (o.dx || 0), y: r.y + r.h / 2 + (o.dy || 0), s };
    }

    // ---------- spotlight (dim + rings) ----------
    const NS = 'http://www.w3.org/2000/svg';
    const dim = document.createElementNS(NS, 'svg');
    dim.id = 'dim';
    const app = $('.window');
    const AW = app.offsetWidth + 400;
    const AH = app.offsetHeight + 400;
    dim.setAttribute('width', AW);
    dim.setAttribute('height', AH);
    dim.style.left = '-200px';
    dim.style.top = '-200px';
    dim.innerHTML = `<defs><mask id="holes"><rect width="${AW}" height="${AH}" fill="#fff"/></mask></defs><rect width="${AW}" height="${AH}" fill="rgba(45,28,100,0.30)" mask="url(#holes)"/>`;
    world.appendChild(dim);
    const mask = $('#holes', dim);
    const holes = [];
    const rings = [];
    for (let i = 0; i < 4; i++) {
      const h = document.createElementNS(NS, 'rect');
      h.setAttribute('fill', '#000');
      h.setAttribute('rx', 18);
      h.setAttribute('width', 0);
      h.setAttribute('height', 0);
      mask.appendChild(h);
      holes.push(h);
      const r = document.createElement('div');
      r.className = 'ring';
      world.appendChild(r);
      rings.push(r);
    }
    let spotOn = false;
    const ringOn = [false, false, false, false];

    // ---------- cursor ----------
    const cursor = document.createElement('div');
    cursor.id = 'cursor';
    cursor.innerHTML = `<svg viewBox="0 0 24 24"><path d="M4 2.5 L4 19.5 L8.6 15.3 L11.6 22 L14.6 20.7 L11.7 14.2 L18 14.2 Z" fill="#1d1a2e" stroke="#fff" stroke-width="1.6" stroke-linejoin="round"/></svg>`;
    world.appendChild(cursor);
    const ripple = document.createElement('div');
    ripple.className = 'ripple';
    world.appendChild(ripple);
    let cursorPos = null;

    // ---------- progress ----------
    const progress = document.createElement('div');
    progress.id = 'progress';
    hud.appendChild(progress);
    tl.to(progress, { scaleX: 1, ease: 'none', duration: timing.duration }, 0);

    // ---------- sound design (mixed by tools/render.mjs, played live in preview) ----------
    const sfxEvents = [];
    const SFX = { click: 0.9, pop: 0.32, whoosh: 0.45, sting: 0.7 };
    const sfx = (name, at, vol) => sfxEvents.push({ src: `/assets/sfx/${name}.mp3`, at: Math.max(0, at), vol: vol ?? SFX[name] ?? 0.6 });

    const ch = (id) => {
      const c = timing.chapters.find((c) => c.id === id);
      if (!c) throw new Error(`chapter ${id} not in timing.json`);
      return c;
    };

    const M = {
      timing,
      tl,
      world,
      hud,
      ch,
      $: $,
      $$: $$,
      rect: worldRect,
      logo,
      W,
      H,

      camSet(target, o = {}) {
        Object.assign(cam, camTarget(target, o));
        applyCam();
      },
      sfx,
      camera(target, at, o = {}) {
        const t = camTarget(target, o);
        if (o.whoosh) sfx('whoosh', at + 0.05, typeof o.whoosh === 'number' ? o.whoosh : undefined);
        tl.to(cam, { x: t.x, y: t.y, s: t.s, duration: o.dur ?? 1.2, ease: o.ease ?? 'power3.inOut', onUpdate: applyCam }, at);
      },

      spot(targets, at, o = {}) {
        const list = [].concat(targets).map((t) => $(t));
        const pad = o.pad ?? 8;
        const d = o.dur ?? 0.45;
        if (!spotOn) tl.to(dim, { opacity: 1, duration: d, ease: 'power2.out' }, at);
        spotOn = true;
        holes.forEach((h, i) => {
          const el = list[i];
          if (el) {
            const r = worldRect(el);
            const box = { x: r.x - pad + 200, y: r.y - pad + 200, width: r.w + pad * 2, height: r.h + pad * 2 };
            const ringBox = { x: r.x - pad, y: r.y - pad, width: r.w + pad * 2, height: r.h + pad * 2 };
            if (ringOn[i]) {
              tl.to(h, { attr: box, duration: d, ease: 'power3.inOut' }, at);
              tl.to(rings[i], { ...ringBox, duration: d, ease: 'power3.inOut' }, at);
            } else {
              // appear in place (no slide from the previous/initial position)
              tl.set(h, { attr: box }, at);
              tl.set(rings[i], ringBox, at);
              tl.fromTo(rings[i], { opacity: 0, scale: 1.04 }, { opacity: 1, scale: 1, duration: d, ease: 'power2.out' }, at);
            }
            ringOn[i] = true;
          } else if (ringOn[i]) {
            tl.to(rings[i], { opacity: 0, duration: d * 0.6 }, at);
            tl.set(h, { attr: { width: 0, height: 0 } }, at + d * 0.6);
            ringOn[i] = false;
          }
        });
      },
      spotOff(at, o = {}) {
        const d = o.dur ?? 0.4;
        spotOn = false;
        ringOn.fill(false);
        tl.to(dim, { opacity: 0, duration: d }, at);
        tl.to(rings, { opacity: 0, duration: d }, at);
        tl.set(holes, { attr: { width: 0, height: 0 } }, at + d);
      },

      // Tooltip next to a target. side: top | bottom | left | right
      tip(target, at, { title, text, side = 'right', until, gap = 16, dx = 0, dy = 0, small = false, align = 'center', silent = false } = {}) {
        if (!silent) sfx('pop', at);
        const el = document.createElement('div');
        el.className = 'tip' + (small ? ' small' : '');
        el.innerHTML = `<b>${title}</b>${text ? `<span>${text}</span>` : ''}`;
        world.appendChild(el);
        const r = worldRect(target);
        const tw = el.offsetWidth;
        const th = el.offsetHeight;
        let x;
        let y;
        if (side === 'right') [x, y] = [r.x + r.w + gap, r.y + r.h / 2 - th / 2];
        if (side === 'left') [x, y] = [r.x - tw - gap, r.y + r.h / 2 - th / 2];
        if (side === 'top') [x, y] = [r.x + r.w / 2 - tw / 2, r.y - th - gap];
        if (side === 'bottom') [x, y] = [r.x + r.w / 2 - tw / 2, r.y + r.h + gap];
        if ((side === 'top' || side === 'bottom') && align === 'start') x = r.x;
        if ((side === 'top' || side === 'bottom') && align === 'end') x = r.x + r.w - tw;
        const from = { right: [-14, 0], left: [14, 0], top: [0, 14], bottom: [0, -14] }[side];
        gsap.set(el, { x: x + dx, y: y + dy });
        tl.fromTo(el, { opacity: 0, scale: 0.92, xPercent: 0, marginLeft: from[0], marginTop: from[1] }, { opacity: 1, scale: 1, marginLeft: 0, marginTop: 0, duration: 0.42, ease: 'back.out(1.6)' }, at);
        if (until != null) tl.to(el, { opacity: 0, scale: 0.96, duration: 0.3, ease: 'power2.in' }, until);
        return el;
      },

      cursorTo(target, at, o = {}) {
        let p;
        if (target && typeof target.x === 'number' && target.s === undefined && target.w === undefined) p = target;
        else {
          const r = worldRect(target);
          p = { x: r.x + r.w * (o.fx ?? 0.5) + (o.dx || 0), y: r.y + r.h * (o.fy ?? 0.55) + (o.dy || 0) };
        }
        const d = o.dur ?? 0.8;
        if (!cursorPos) {
          const start = o.from || { x: p.x + 260, y: p.y + 180 };
          gsap.set(cursor, { x: start.x, y: start.y });
          tl.to(cursor, { opacity: 1, duration: 0.25 }, at);
        }
        tl.to(cursor, { x: p.x, y: p.y, duration: d, ease: o.ease ?? 'power2.inOut' }, at);
        cursorPos = p;
        return at + d;
      },
      click(at) {
        if (!cursorPos) throw new Error('click before cursorTo');
        sfx('click', at);
        tl.to(cursor, { scale: 0.82, duration: 0.09, ease: 'power2.in', transformOrigin: '6px 4px' }, at);
        tl.to(cursor, { scale: 1, duration: 0.18, ease: 'back.out(2)' }, at + 0.09);
        tl.fromTo(ripple, { x: cursorPos.x + 5, y: cursorPos.y + 4, scale: 0.2, opacity: 0.9 }, { scale: 1.3, opacity: 0, duration: 0.6, ease: 'power2.out' }, at + 0.05);
      },
      cursorHide(at) {
        tl.to(cursor, { opacity: 0, duration: 0.3 }, at);
        cursorPos = null;
      },

      count(el, to, at, o = {}) {
        el = $(el);
        const obj = { v: o.from ?? 0 };
        const dec = o.decimals ?? 0;
        const fmt = (v) => (o.prefix || '') + v.toFixed(dec).replace('.', ',') + (o.suffix || '');
        let last;
        hooks.push(() => {
          const txt = fmt(obj.v);
          if (txt !== last) el.textContent = last = txt;
        });
        tl.to(obj, { v: to, duration: o.dur ?? 1.1, ease: o.ease ?? 'power2.out' }, at);
      },

      // Chapter badges ("01 — Accéder au tableau de bord"), auto-placed from timing.json
      badges(section = timing.section) {
        const chs = timing.chapters.filter((c) => c.label);
        chs.forEach((c, i) => {
          const b = document.createElement('div');
          b.className = 'badge';
          b.innerHTML = `<div class="n">${String(c.num).padStart(2, '0')}</div><div><small>${section}</small><b>${c.label}</b></div>`;
          hud.appendChild(b);
          tl.fromTo(b, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, c.start + 0.1);
          const next = chs[i + 1];
          const out = next ? next.start - 0.05 : c.end - 0.3;
          tl.to(b, { opacity: 0, y: -14, duration: 0.3, ease: 'power2.in' }, out - 0.3);
        });
      },

      titleCard(html) {
        const el = document.createElement('div');
        el.className = 'title-card';
        el.innerHTML = html;
        hud.insertBefore(el, progress);
        return el;
      },
    };

    // ---------- playback ----------
    window.__duration = timing.duration;
    window.__fps = timing.fps;
    window.__seek = (t) => {
      tl.seek(t, true);
      applyCam();
      hooks.forEach((h) => h());
    };
    M.onRender = (fn) => hooks.push(fn);
    M.audioPlan = () => ({
      duration: timing.duration,
      narration: { src: new URL(timing.narration.file, location.href).pathname, at: timing.narration.start },
      music: timing.music,
      sfx: sfxEvents.slice().sort((a, b) => a.at - b.at),
    });
    M.ready = () => {
      window.__seek(0);
      window.__audioPlan = M.audioPlan();
      setupPreview(M);
      window.__ready = true;
    };
    return M;
  }

  function setupPreview(M) {
    if (new URLSearchParams(location.search).has('render')) return;
    const { tl, timing } = M;
    // fit the 1920x1080 stage into the browser window
    const fit = () => {
      const k = Math.min(innerWidth / W, innerHeight / H);
      document.documentElement.style.cssText = `width:100vw;height:100vh;overflow:hidden;background:#111`;
      document.body.style.cssText = `width:${W}px;height:${H}px;transform-origin:0 0;transform:translate(${(innerWidth - W * k) / 2}px,${(innerHeight - H * k) / 2}px) scale(${k})`;
    };
    fit();
    addEventListener('resize', fit);
    const plan = M.audioPlan();
    const track = (src, at, vol = 1) => {
      const a = new Audio(src);
      a.preload = 'auto';
      a.volume = Math.min(1, vol);
      return { a, at };
    };
    const audios = [track(plan.narration.src, plan.narration.at), ...plan.sfx.map((x) => track(x.src, x.at, x.vol))];
    if (plan.music) audios.push(track(plan.music.file, 0, plan.music.volume * 0.6));
    let raf;
    let t0;
    let playing = false;
    const stop = () => {
      playing = false;
      cancelAnimationFrame(raf);
      audios.forEach(({ a }) => a.pause());
    };
    const play = (from = 0) => {
      stop();
      playing = true;
      t0 = performance.now() / 1000 - from;
      audios.forEach((x) => (x.started = x.at < from - 0.05));
      const loop = () => {
        const t = performance.now() / 1000 - t0;
        if (t >= timing.duration) return stop();
        window.__seek(t);
        for (const x of audios)
          if (!x.started && t >= x.at) {
            x.started = true;
            x.a.currentTime = 0;
            x.a.play();
          }
        raf = requestAnimationFrame(loop);
      };
      loop();
    };
    const btn = document.createElement('button');
    btn.textContent = '▶ Lecture (espace)';
    btn.style.cssText = 'position:fixed;left:16px;top:16px;z-index:99;font:600 14px Inter Variable,sans-serif;padding:10px 16px;border-radius:10px;border:0;background:#6b3fc8;color:#fff;cursor:pointer';
    document.documentElement.appendChild(btn);
    const toggle = () => (playing ? stop() : play(0));
    btn.onclick = toggle;
    addEventListener('keydown', (e) => e.code === 'Space' && (e.preventDefault(), toggle()));
    const at = parseFloat(new URLSearchParams(location.search).get('t'));
    if (!isNaN(at)) window.__seek(at);
  }

  window.Motion = { init, shell, worldRect };
})();
