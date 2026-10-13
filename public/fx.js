/* Orieb Alzyuot · fx.js — motion system + 3D hero loader (v2).
   Runs after app.js (both deferred) and uses its small window.OA API.
   Every effect checks the motion preference (system + in-page setting) and the pause button. */
(() => {
  'use strict';
  const OA = window.OA; if (!OA) return;
  const root = document.documentElement;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  let paused = false;
  const calm = () => OA.reducedMotion() || paused;

  /* ───────── split-text headline (words only, so Arabic letter joining is never broken) ───────── */
  const h1 = $('.hero h1');
  if (h1 && !OA.reducedMotion()) {
    let wi = 0;
    const walk = node => {
      for (const n of [...node.childNodes]) {
        if (n.nodeType === 3) {
          if (!n.textContent.trim()) continue;
          const frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(part => {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
            const s = document.createElement('span'); s.className = 'sw-w'; s.style.setProperty('--wi', String(wi++)); s.textContent = part; frag.appendChild(s);
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1 && !n.classList.contains('rot')) walk(n);
        else if (n.nodeType === 1 && n.classList.contains('rot')) { n.classList.add('sw-w'); n.style.setProperty('--wi', String(wi++)); }
      }
    };
    walk(h1);
    h1.classList.add('split');
    requestAnimationFrame(() => h1.classList.add('split-go'));
  }

  /* ───────── headline height lock: measure every rotating word once, reserve the tallest
     so the rotation never pushes the content below it (CLS) ───────── */
  function lockH1() {
    const w = $('#rot .w'), words = ($('#rot')?.dataset.words || '').split('|');
    if (!h1 || !w || words.length < 2) return;
    const cur = w.textContent; h1.style.minHeight = '';
    let max = 0; for (const x of words) { w.textContent = x; max = Math.max(max, h1.getBoundingClientRect().height); }
    w.textContent = cur; h1.style.minHeight = Math.ceil(max) + 'px';
  }
  lockH1(); document.fonts?.ready.then(lockH1);
  let rzT; addEventListener('resize', () => { clearTimeout(rzT); rzT = setTimeout(lockH1, 150); }, { passive: true });

  /* ───────── magnetic buttons (spring back via CSS transition) ───────── */
  if (fine) {
    $$('.btn.primary:not(.magnet), .ft-cta .btn, .sv-cta .btn, #services .cta .btn, .fx-toggle').forEach(b => {
      b.style.transition = 'transform .5s cubic-bezier(.2,1.5,.4,1), box-shadow .25s, border-color .25s, color .25s, background-color .25s';
      b.addEventListener('pointermove', e => {
        if (calm()) return;
        const r = b.getBoundingClientRect();
        b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .22}px,${(e.clientY - r.top - r.height / 2) * .32}px)`;
      });
      b.addEventListener('pointerleave', () => { b.style.transform = ''; });
    });
    // glare + smooth state for the 3D-tilt frames (angles are set by app.js)
    $$('.tilt').forEach(f => {
      f.addEventListener('pointermove', e => {
        if (calm()) return;
        const r = f.getBoundingClientRect();
        f.classList.add('tilting');
        f.style.setProperty('--gx', ((e.clientX - r.left) / r.width * 100).toFixed(1) + '%');
        f.style.setProperty('--gy', ((e.clientY - r.top) / r.height * 100).toFixed(1) + '%');
      });
      f.addEventListener('pointerleave', () => f.classList.remove('tilting'));
    });
    // subtle tilt on bento tiles
    $$('.bento .tile').forEach(tile => {
      tile.addEventListener('pointermove', e => {
        if (calm()) return;
        const r = tile.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
        tile.style.transform = `perspective(900px) rotateX(${(-y * 4).toFixed(2)}deg) rotateY(${(x * 5).toFixed(2)}deg) translateY(-6px)`;
      });
      tile.addEventListener('pointerleave', () => { tile.style.transform = ''; });
    });
  }

  /* ───────── parallax on decorative layers + timeline "reached" dots ───────── */
  const para = $$('[data-parallax]').map(el => ({ el, k: parseFloat(el.dataset.parallax) || .1 }));
  const jobs = $$('.timeline .job');
  let ticking = false;
  function onScroll() {
    ticking = false;
    const y = scrollY;
    if (!calm()) for (const p of para) { if (y < innerHeight * 1.6) p.el.style.transform = `translate3d(0,${(y * p.k).toFixed(1)}px,0)`; }
    const line = innerHeight * .62;
    for (const j of jobs) { const d = j.querySelector('.dot'); if (d) j.classList.toggle('reached', d.getBoundingClientRect().top < line); }
  }
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();

  /* ───────── counters: filter chip counts tick up when they come into view ───────── */
  const countIO = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return; countIO.unobserve(e.target);
    const el = e.target, to = parseInt(el.textContent, 10); if (!to || calm()) return;
    const t0 = performance.now(), dur = 700 + to * 40;
    const step = now => { const k = Math.min(1, (now - t0) / dur); el.textContent = String(Math.round(to * (1 - Math.pow(1 - k, 3)))); if (k < 1) requestAnimationFrame(step); };
    el.textContent = '0'; requestAnimationFrame(step);
  }), { threshold: .6 });
  $$('.chip .c[data-n]').forEach(c => countIO.observe(c));

  /* ───────── skills: index list items for the cascade ───────── */
  $$('.sk ul').forEach(ul => [...ul.children].forEach((li, i) => li.style.setProperty('--li', String(Math.min(i, 8)))));

  /* ───────── in-page jumps: soft flash on the destination heading ───────── */
  function land(id) {
    const sec = document.getElementById(id); if (!sec || calm()) return;
    const h = sec.querySelector('.sec-title h2, h2'); if (!h) return;
    setTimeout(() => { h.classList.remove('fx-land'); void h.offsetWidth; h.classList.add('fx-land'); }, 650);
  }
  document.addEventListener('click', e => { const a = e.target.closest('a[href*="#"]'); if (!a) return; const u = new URL(a.href, location.href); if (u.pathname === location.pathname && u.hash.length > 1) land(u.hash.slice(1)); });
  addEventListener('hashchange', () => land(location.hash.slice(1)));

  /* ───────── pause button (WCAG 2.2.2: pause, stop, hide) ───────── */
  const tog = $('#fxToggle'), togLbl = tog && $('span', tog);
  function setPaused(v) {
    paused = v; root.classList.toggle('fx-paused', v);
    if (tog) { tog.setAttribute('aria-pressed', String(v)); const l = v ? togLbl.dataset.playLabel : togLbl.dataset.pauseLabel; togLbl.textContent = l; tog.title = l; }
    if (hero) hero.pause(v);
    try { sessionStorage.setItem('oa-fx-paused', v ? '1' : '0'); } catch (e) {}
  }
  tog?.addEventListener('click', () => { setPaused(!paused); OA.sfx('step'); });

  /* ───────── 3D hero: lazy, after first paint, only when it can run well ───────── */
  const host = $('#hero3d');
  let hero = null, loading = false;
  function webglOK() {
    try { const c = document.createElement('canvas'); return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl'))); } catch (e) { return false; }
  }
  const canRun = () => host && !OA.reducedMotion() && !matchMedia('(forced-colors: active)').matches && root.getAttribute('data-contrast') !== 'yellow' && (navigator.connection?.saveData !== true);
  // tells the boot splash (Base.astro) whether the 3D hero is coming: 'ready', 'skip' or 'fail'
  const HERO_URL = '/hero3d.js?v=5';
  const signal3D = state => document.dispatchEvent(new CustomEvent('oa:hero3d', { detail: state }));
  function boot3D() {
    if (hero || loading || !canRun() || !webglOK()) return;
    loading = true;
    import(HERO_URL).then(m => {
      loading = false;
      if (!canRun()) return;
      hero = m.mount(host); window.__hero3d = hero;
      if (paused) hero.pause(true);
    }).catch(() => { loading = false; });
  }
  const later = cb => ('requestIdleCallback' in window ? requestIdleCallback(cb, { timeout: 1800 }) : setTimeout(cb, 600));
  const start3D = () => later(boot3D);
  // during the first-visit splash the module is fetched and evaluated straight away (its progress milestone);
  // mounting (shader compile) still waits for load + idle so it never holds the splash or the main thread
  if (root.dataset.boot === 'splash') {
    if (!canRun() || !webglOK()) signal3D('skip');
    else import(HERO_URL).then(() => signal3D('ready'), () => signal3D('fail'));
  }
  const kick3D = () => { if (document.readyState === 'complete') start3D(); else addEventListener('load', start3D, { once: true }); };
  if (root.dataset.boot === 'splash' && !window.__oaBootLeft) document.addEventListener('oa:boot-leave', () => setTimeout(kick3D, 1300), { once: true });
  else kick3D();

  // follow preference changes: colours, theme, motion
  document.addEventListener('oa:prefs', () => {
    if (hero && !canRun()) { hero.destroy(); hero = null; window.__hero3d = null; }
    else if (hero) requestAnimationFrame(() => hero.setColors());
    else if (canRun()) start3D();
    if (OA.reducedMotion()) $$('[data-parallax]').forEach(el => { el.style.transform = ''; });
  });
  matchMedia('(prefers-color-scheme: dark)').addEventListener?.('change', () => hero && hero.setColors());

  try { if (sessionStorage.getItem('oa-fx-paused') === '1') setPaused(true); } catch (e) {}
})();
