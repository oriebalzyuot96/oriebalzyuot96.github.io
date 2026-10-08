/* Orieb Alzyuot · portfolio runtime (static Astro pages: / is English, /ar/ is Arabic).
   Preferences (theme, accent, a11y) · language links · motion · palette · modals. No dependencies. */
(() => {
  'use strict';
  const root = document.documentElement;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const I18N = window.I18N || {};
  const PAGE_LANG = root.lang === 'ar' ? 'ar' : 'en';
  const reduceMQ = matchMedia('(prefers-reduced-motion: reduce)');
  const sfx = k => window.UiSound && window.UiSound.play(k);
  const darkMQ = matchMedia('(prefers-color-scheme: dark)');

  /* ───────── preferences ───────── */
  const DEF = { theme: 'system', accent: 'lavender', font: 'm', contrast: 'none', motion: 'system', lang: 'en',
    readable: false, links: false, spacing: false, cursor: false };
  let prefs = { ...DEF };
  try { Object.assign(prefs, JSON.parse(localStorage.getItem('oa-prefs') || '{}')); } catch (e) { /* storage blocked */ }
  prefs.lang = PAGE_LANG; // the URL decides the language; prefs only remember the visitor's last choice
  const save = () => { try { localStorage.setItem('oa-prefs', JSON.stringify(prefs)); } catch (e) {} };
  const reducedMotion = () => prefs.motion === 'reduced' || (prefs.motion === 'system' && reduceMQ.matches);
  const isDark = () => prefs.theme === 'dark' || (prefs.theme === 'system' && darkMQ.matches);

  function applyPrefs() {
    prefs.theme === 'system' ? root.removeAttribute('data-theme') : root.setAttribute('data-theme', prefs.theme);
    for (const k of ['accent', 'font', 'contrast', 'motion']) {
      prefs[k] === DEF[k] ? root.removeAttribute('data-' + k) : root.setAttribute('data-' + k, prefs[k]);
    }
    for (const k of ['readable', 'links', 'spacing', 'cursor']) {
      prefs[k] ? root.setAttribute('data-' + k, 'on') : root.removeAttribute('data-' + k);
    }
    $$('[data-pref]').forEach(g => {
      const k = g.dataset.pref;
      if (g.getAttribute('role') === 'switch') { g.setAttribute('aria-checked', String(!!prefs[k])); return; }
      $$('[data-v]', g).forEach(b => { const on = b.dataset.v === String(prefs[k]); b.setAttribute('aria-checked', String(on)); b.tabIndex = on ? 0 : -1; });
    });
    const n = ['font', 'contrast', 'motion', 'readable', 'links', 'spacing', 'cursor'].filter(k => prefs[k] !== DEF[k]).length;
    $$('[data-count]').forEach(c => { c.textContent = n; c.classList.toggle('show', n > 0); });
    const meta = $('meta[name="theme-color"]'); if (meta) meta.content = isDark() ? '#0f0d16' : '#6d4aff';
    save();
  }
  function setPref(k, v) {
    prefs[k] = v;
    if (k === 'lang' && v !== PAGE_LANG) { prefs.lang = v; save(); goLang(v); return; }
    applyPrefs();
  }

  /* ───────── i18n (strings are rendered at build time; these are the few runtime ones) ───────── */
  const t = (key, fallback) => I18N[key] ?? fallback ?? key;
  function altPath(lang) {
    const p = location.pathname.replace(/^\/ar(\/|$)/, '/');
    return (lang === 'ar' ? '/ar' + (p === '/' ? '/' : p) : p) + location.hash;
  }
  function goLang(lang) { location.href = altPath(lang); }
  { const v = $('#introVideo'); if (v && v.textTracks) [...v.textTracks].forEach(tr => { tr.mode = tr.language === PAGE_LANG ? 'showing' : 'disabled'; }); }

  /* ───────── controls ───────── */
  $$('[data-pref]').forEach(g => {
    const k = g.dataset.pref;
    if (g.getAttribute('role') === 'switch') { g.addEventListener('click', () => setPref(k, !prefs[k])); return; }
    g.addEventListener('click', e => { const b = e.target.closest('[data-v]'); if (b) setPref(k, b.dataset.v); });
    g.addEventListener('keydown', e => {
      if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) return;
      e.preventDefault();
      const bs = $$('[data-v]', g), i = bs.findIndex(b => b.dataset.v === String(prefs[k]));
      let d = (e.key === 'ArrowRight' || e.key === 'ArrowDown') ? 1 : -1;
      if (root.dir === 'rtl' && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) d = -d;
      const nb = bs[(i + d + bs.length) % bs.length]; setPref(k, nb.dataset.v); nb.focus();
    });
  });
  const toggleTheme = () => { setPref('theme', isDark() ? 'light' : 'dark'); sfx('pop'); };
  const toggleLang = () => { sfx('step'); setPref('lang', PAGE_LANG === 'ar' ? 'en' : 'ar'); };
  $('#themeBtn').addEventListener('click', toggleTheme);
  $('#reset').addEventListener('click', () => { const lang = prefs.lang; prefs = { ...DEF, lang }; applyPrefs(); window.UiSound && window.UiSound.reset(); syncSound(); sfx('pop'); toast(t('toast.reset', 'Settings reset')); });

  /* sound toggle (header button, drawer switch, Alt+S, palette) */
  function syncSound() {
    const on = !!(window.UiSound && window.UiSound.enabled);
    $('#soundToggle').setAttribute('aria-checked', String(on));
    $('#soundBtn').setAttribute('aria-pressed', String(on));
    root.toggleAttribute('data-sound', on);
  }
  const toggleSound = () => { if (!window.UiSound) return; window.UiSound.setEnabled(!window.UiSound.enabled); syncSound(); toast(window.UiSound.enabled ? t('toast.soundOn', 'Sound on 🔊') : t('toast.soundOff', 'Sound off 🔇')); };
  $('#soundToggle').addEventListener('click', toggleSound);
  $('#soundBtn').addEventListener('click', toggleSound);
  syncSound();

  /* ───────── toast ───────── */
  let toastT;
  function toast(msg) { const el = $('#toast'); el.textContent = msg; el.classList.add('show'); clearTimeout(toastT); toastT = setTimeout(() => el.classList.remove('show'), 2200); }
  $$('[data-copy]').forEach(b => b.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(b.dataset.copy); sfx('success'); toast(t('toast.copied', 'Copied ✓')); } catch (e) { toast(b.dataset.copy); }
  }));

  /* ───────── overlays: shared focus handling ───────── */
  const scrim = $('#scrim');
  let lastFocus = null, openLayer = null;
  function trap(container, e) {
    if (e.key !== 'Tab') return;
    const f = $$('button:not([disabled]):not([tabindex="-1"]),[href],input,video,[tabindex="0"]', container).filter(x => x.offsetParent !== null);
    if (!f.length) return;
    const a = f[0], z = f[f.length - 1];
    if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); }
    else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
  }
  function openOverlay(name, el, focusEl) {
    closeOverlay(true);
    lastFocus = document.activeElement; openLayer = name;
    el.classList.add('open'); el.removeAttribute('inert'); scrim.classList.add('open');
    document.body.style.overflow = 'hidden';
    sfx(name === 'palette' ? 'pop' : 'whoosh');
    setTimeout(() => (focusEl || el).focus(), 40);
  }
  function closeOverlay(silent) {
    if (!openLayer) return;
    const el = { drawer: $('#drawer'), palette: $('#palette'), modal: $('#modal') }[openLayer];
    el.classList.remove('open', 'image'); if (openLayer === 'drawer') el.setAttribute('inert', '');
    if (openLayer === 'modal') { const v = $('video', el); if (v) v.pause(); $('#sheet').innerHTML = ''; }
    scrim.classList.remove('open'); document.body.style.overflow = '';
    openLayer = null;
    if (!silent && lastFocus) lastFocus.focus();
  }
  scrim.addEventListener('click', () => closeOverlay());

  /* settings drawer */
  const drawer = $('#drawer');
  const openSettings = () => openOverlay('drawer', drawer, $('#dClose'));
  $$('[data-open-settings]').forEach(b => b.addEventListener('click', openSettings));
  $('#dClose').addEventListener('click', () => closeOverlay());
  $('#done').addEventListener('click', () => closeOverlay());
  drawer.addEventListener('keydown', e => trap(drawer, e));
  const tabs = $$('.tabs [role=tab]');
  tabs.forEach((tb, i) => {
    tb.addEventListener('click', () => tabs.forEach(x => { const on = x === tb; x.setAttribute('aria-selected', String(on)); x.tabIndex = on ? 0 : -1; $('#' + x.getAttribute('aria-controls')).hidden = !on; }));
    tb.addEventListener('keydown', e => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      let d = e.key === 'ArrowRight' ? 1 : -1; if (root.dir === 'rtl') d = -d;
      const n = tabs[(i + d + tabs.length) % tabs.length]; n.click(); n.focus();
    });
  });

  /* modal: case studies, screenshots, video */
  const modal = $('#modal'), sheet = $('#sheet');
  modal.addEventListener('keydown', e => trap(modal, e));
  modal.addEventListener('click', e => { if (e.target === modal) closeOverlay(); });
  const closeBtn = () => `<button class="ibtn x" data-close aria-label="${t('close', 'Close')}">✕</button>`;
  sheet.addEventListener('click', e => { if (e.target.closest('[data-close]')) closeOverlay(); });

  function openCase(id) {
    const card = document.getElementById(id); if (!card) return;
    const img = $('.frame > img', card);
    const media = img ? `<div class="hero-img"><img src="${img.src}" alt="${img.alt}"></div>` : `<div class="hero-img">${$('.frame', card).outerHTML.replace('frame tilt', 'frame')}</div>`;
    sheet.innerHTML = `${closeBtn()}${media}<div class="content">
      <div class="org" style="display:flex;gap:8px;flex-wrap:wrap;font-weight:700;color:var(--ink-3);font-size:.85rem">${$('.org', card).innerHTML}</div>
      <h2 id="mTitle">${$('h3', card).innerHTML}</h2>
      ${$('.alt-name', card) ? `<div class="ar-text" style="color:var(--ink-3)">${$('.alt-name', card).innerHTML}</div>` : ''}
      <p style="color:var(--ink-2);margin-top:12px">${$('.p-body > p', card).innerHTML}</p>
      <div class="cs-grid">${$('.case', card).innerHTML}</div>
      <div class="tags" style="margin-top:20px">${$('.tags', card).innerHTML}</div>
      <div class="p-actions">${$$('.p-actions a', card).map(a => a.outerHTML).join('')}</div></div>`;
    modal.setAttribute('aria-labelledby', 'mTitle'); modal.removeAttribute('aria-label');
    openOverlay('modal', modal, $('[data-close]', sheet));
  }
  function openImage(fig) {
    const img = $('img', fig);
    modal.classList.add('image');
    sheet.innerHTML = `${closeBtn()}<figure><img src="${fig.dataset.full}" alt="${img.alt}"><figcaption>${img.alt}</figcaption></figure>`;
    modal.setAttribute('aria-label', img.alt); modal.removeAttribute('aria-labelledby');
    openOverlay('modal', modal, $('[data-close]', sheet));
  }
  function playIntro() {
    const sec = $('#intro'); const v = $('#introVideo');
    if (!sec || !v) { location.href = (document.documentElement.lang === 'ar' ? '/ar/' : '/') + '#intro'; return; }
    sec.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth', block: 'center' });
    setTimeout(() => { v.focus(); const p = v.play(); if (p && p.catch) p.catch(() => {}); }, reducedMotion() ? 0 : 650);
  }
  $$('[data-case]').forEach(b => b.addEventListener('click', () => openCase(b.dataset.case)));
  $$('.frame[data-full]').forEach(f => {
    f.addEventListener('click', () => openImage(f));
    f.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openImage(f); } });
  });
  $$('[data-play-intro]').forEach(b => b.addEventListener('click', playIntro));

  /* ───────── command palette ───────── */
  const palette = $('#palette'), pq = $('#pq'), plist = $('#plist');
  const L = (en, ar) => () => (prefs.lang === 'ar' ? ar : en);
  const go = id => () => { closeOverlay(true); const el = document.getElementById(id); if (el) el.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth' }); else location.href = (document.documentElement.lang === 'ar' ? '/ar/' : '/') + '#' + id; };
  const CMDS = [
    { e: '🏠', l: L('Home', 'الرئيسية'), g: L('Section', 'قسم'), run: go('home') },
    { e: '👋', l: L('About me', 'عنّي'), g: L('Section', 'قسم'), run: go('about') },
    { e: '🎬', l: L('Watch intro video', 'شاهد الفيديو التعريفي'), g: L('Action', 'إجراء'), run: () => { closeOverlay(true); playIntro(); } },
    { e: '🧰', l: L('Skills', 'المهارات'), g: L('Section', 'قسم'), run: go('skills') },
    { e: '🚀', l: L('Projects', 'المشاريع'), g: L('Section', 'قسم'), run: go('projects') },
    { e: '🐛', l: L('Open-source radar', 'المساهمات المفتوحة المصدر'), g: L('Section', 'قسم'), run: go('oss') },
    { e: '🧭', l: L('Career', 'المسيرة المهنية'), g: L('Section', 'قسم'), run: go('career') },
    { e: '✉️', l: L('Contact', 'تواصل'), g: L('Section', 'قسم'), run: go('contact') },
    { e: '💸', l: L('Wasl · financing platform', 'وصل · منصة التمويل'), g: L('Project', 'مشروع'), run: () => { closeOverlay(true); openCase('p-wasl'); } },
    { e: '🏛️', l: L('Saudi Bar Association', 'الهيئة السعودية للمحامين'), g: L('Project', 'مشروع'), run: () => { closeOverlay(true); openCase('p-sba'); } },
    { e: '🏗️', l: L('Engineering Arbitration Center', 'مركز التحكيم الهندسي'), g: L('Project', 'مشروع'), run: () => { closeOverlay(true); openCase('p-seac'); } },
    { e: '📄', l: L('Contracts e-signature', 'عقود · التوقيع الإلكتروني'), g: L('Project', 'مشروع'), run: () => { closeOverlay(true); openCase('p-contracts'); } },
    { e: '👥', l: L('HR solution (Shepherd)', 'نظام الموارد البشرية (Shepherd)'), g: L('Project', 'مشروع'), run: () => { closeOverlay(true); openCase('p-hr'); } },
    { e: '🌗', l: L('Toggle dark mode', 'تبديل الوضع الداكن'), g: L('Action', 'إجراء'), run: () => { closeOverlay(true); toggleTheme(); } },
    { e: '🌐', l: L('العربية / English', 'English / العربية'), g: L('Action', 'إجراء'), run: () => { closeOverlay(true); toggleLang(); } },
    { e: '🔊', l: L('Sound on / off', 'تشغيل / إيقاف الأصوات'), g: L('Action', 'إجراء'), run: () => { closeOverlay(true); toggleSound(); } },
    { e: '♿', l: L('Accessibility settings', 'إعدادات الوصول'), g: L('Action', 'إجراء'), run: () => { closeOverlay(true); openSettings(); } },
    { e: '🟨', l: L('High contrast (yellow)', 'تباين عالٍ (أصفر)'), g: L('Action', 'إجراء'), run: () => { closeOverlay(true); setPref('contrast', prefs.contrast === 'yellow' ? 'none' : 'yellow'); } },
    { e: '📥', l: L('Download CV (PDF)', 'تحميل السيرة الذاتية'), g: L('Link', 'رابط'), run: () => { closeOverlay(true); open('/Orieb-Alzyuot-CV.pdf', '_blank', 'noopener'); } },
    { e: '📧', l: L('Copy email address', 'نسخ البريد الإلكتروني'), g: L('Action', 'إجراء'), run: async () => { closeOverlay(true); try { await navigator.clipboard.writeText('alzuotorieb9999@gmail.com'); toast(t('toast.copied', 'Copied ✓')); } catch (e) {} } },
    { e: '🐙', l: L('GitHub profile', 'حساب GitHub'), g: L('Link', 'رابط'), run: () => { closeOverlay(true); open('https://github.com/oriebalzyuot96', '_blank', 'noopener'); } },
    { e: '💼', l: L('LinkedIn profile', 'حساب LinkedIn'), g: L('Link', 'رابط'), run: () => { closeOverlay(true); open('https://www.linkedin.com/in/orieb-alzyuot996', '_blank', 'noopener'); } },
  ];
  let shown = [], sel = 0;
  function buildPalette(q) {
    const s = (q || '').trim().toLowerCase();
    shown = CMDS.filter(c => !s || c.l().toLowerCase().includes(s) || c.g().toLowerCase().includes(s));
    sel = Math.min(sel, Math.max(shown.length - 1, 0));
    plist.innerHTML = shown.length ? shown.map((c, i) => `<li role="option" id="opt${i}" aria-selected="${i === sel}"><span class="e" aria-hidden="true">${c.e}</span>${c.l()}<small>${c.g()}</small></li>`).join('')
      : `<li class="empty" role="option" aria-disabled="true">${t('cmd.empty', 'No results')}</li>`;
    pq.setAttribute('aria-activedescendant', shown.length ? 'opt' + sel : '');
  }
  window.buildPalette = buildPalette;
  const openPalette = () => { pq.value = ''; sel = 0; buildPalette(''); openOverlay('palette', palette, pq); };
  $('#cmdBtn').addEventListener('click', openPalette);
  pq.addEventListener('input', () => { sel = 0; buildPalette(pq.value); });
  pq.addEventListener('keydown', e => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); if (!shown.length) return; sel = (sel + (e.key === 'ArrowDown' ? 1 : -1) + shown.length) % shown.length; buildPalette(pq.value); $('#opt' + sel)?.scrollIntoView({ block: 'nearest' }); }
    else if (e.key === 'Enter' && shown[sel]) { e.preventDefault(); sfx('step'); shown[sel].run(); }
  });
  plist.addEventListener('click', e => { const li = e.target.closest('li[id]'); if (li) shown[+li.id.slice(3)].run(); });
  palette.addEventListener('keydown', e => trap(palette, e));

  /* ───────── global keyboard ───────── */
  const SECS = ['home', 'about', 'intro', 'skills', 'projects', 'career', 'contact'];
  document.addEventListener('keydown', e => {
    const mod = e.ctrlKey || e.metaKey;
    if (mod && (e.key === 'k' || e.key === 'K')) { e.preventDefault(); openLayer === 'palette' ? closeOverlay() : openPalette(); }
    else if (mod && e.key === ',') { e.preventDefault(); openLayer === 'drawer' ? closeOverlay() : openSettings(); }
    else if (e.key === 'Escape' && openLayer) { e.preventDefault(); closeOverlay(); }
    else if (e.altKey && e.code === 'KeyT') { e.preventDefault(); toggleTheme(); }
    else if (e.altKey && e.code === 'KeyL') { e.preventDefault(); toggleLang(); }
    else if (e.altKey && e.code === 'KeyS') { e.preventDefault(); toggleSound(); }
    else if (e.altKey && /^Digit[1-7]$/.test(e.code)) { e.preventDefault(); go(SECS[+e.code.slice(5) - 1])(); }
  });

  /* ───────── skills ───────── */
  const LV = { x: ['lv.x', 'Expert'], a: ['lv.a', 'Advanced'], p: ['lv.p', 'Proficient'] };
  $$('[data-skills]').forEach(ul => {
    ul.innerHTML = ul.dataset.skills.split(',').map(s => {
      const [ic, label, lv] = s.split('|');
      return `<li><span><img src="https://cdn.jsdelivr.net/npm/simple-icons@11/icons/${ic}.svg" alt="" loading="lazy" width="18" height="18" onerror="this.remove()"><span class="ltr">${label}</span></span><span class="lv ${lv}">${t(LV[lv][0], LV[lv][1])}</span></li>`;
    }).join('');
  });

  /* ───────── project filters ───────── */
  const projs = $$('.proj');
  $$('[data-n]').forEach(c => { const f = c.dataset.n; c.textContent = f === 'all' ? projs.length : projs.filter(p => p.dataset.c === f).length; });
  $$('.chip').forEach(c => c.addEventListener('click', () => {
    $$('.chip').forEach(x => x.setAttribute('aria-pressed', String(x === c)));
    const f = c.dataset.f; projs.forEach(p => { p.hidden = f !== 'all' && p.dataset.c !== f; });
  }));

  /* ───────── hero motion ───────── */
  let words = ($('#rot')?.dataset.words || 'trust').split('|'), wi = 0;
  setInterval(() => {
    if (reducedMotion() || document.hidden) return;
    const w = $('#rot .w'); if (!w || words.length < 2) return;
    wi = (wi + 1) % words.length;
    const n = w.cloneNode(); n.textContent = words[wi]; w.replaceWith(n);
  }, 2600);

  // typed code tile
  const CODE = [
    ['c', '// signals-first, accessible by default'],
    ['', '<span class="c-k">@Component</span>({ selector: <span class="c-s">\'orieb-dev\'</span> })'],
    ['', '<span class="c-k">export class</span> <span class="c-f">Orieb</span> {'],
    ['', '  years    = <span class="c-f">signal</span>(<span class="c-n">6</span>);'],
    ['', '  stack    = [<span class="c-s">\'Angular\'</span>, <span class="c-s">\'.NET\'</span>, <span class="c-s">\'RN\'</span>];'],
    ['', '  shipped  = <span class="c-f">computed</span>(() =&gt; <span class="c-s">\'gov + fintech\'</span>);'],
    ['', '  <span class="c-f">ship</span>() { <span class="c-k">return</span> <span class="c-s">\'with care 💜\'</span>; }'],
    ['', '}'],
  ].map(([c, s]) => c ? `<span class="c-c">${s}</span>` : s);
  const typed = $('#typed');
  function typeCode() {
    if (!typed) return;
    if (reducedMotion()) { typed.innerHTML = CODE.join('\n'); return; }
    let i = 0; const step = () => { typed.innerHTML = CODE.slice(0, i + 1).join('\n'); if (++i < CODE.length) setTimeout(step, 180); };
    step();
  }

  // live Amman clock
  function tick() {
    const fmt = new Intl.DateTimeFormat(prefs.lang === 'ar' ? 'ar-JO-u-nu-latn' : 'en-GB', { timeZone: 'Asia/Amman', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
    const c = $('#clock'); if (c) c.textContent = fmt.format(new Date());
  }
  tick(); setInterval(tick, 1000);

  // count-up
  function countUp(el) {
    const to = +el.dataset.countTo; if (reducedMotion()) { el.textContent = to; return; }
    let v = 0; const iv = setInterval(() => { el.textContent = ++v; if (v >= to) clearInterval(iv); }, 120);
  }

  // starfield
  function stars() {
    const c = $('#stars'); if (!c || reducedMotion()) return;
    const ctx = c.getContext('2d'); let w, h, pts = [], raf;
    const resize = () => { const r = c.getBoundingClientRect(); w = c.width = r.width * devicePixelRatio; h = c.height = r.height * devicePixelRatio;
      pts = Array.from({ length: Math.min(90, Math.floor(r.width / 14)) }, () => ({ x: Math.random() * w, y: Math.random() * h, r: (Math.random() * 1.4 + .4) * devicePixelRatio, s: Math.random() * .25 + .05, p: Math.random() * 6.28 })); };
    const draw = t => {
      ctx.clearRect(0, 0, w, h);
      const col = getComputedStyle(root).getPropertyValue('--accent').trim() || '#6d4aff';
      for (const p of pts) { p.y -= p.s; if (p.y < 0) { p.y = h; p.x = Math.random() * w; }
        ctx.globalAlpha = .35 + .35 * Math.sin(t / 900 + p.p); ctx.fillStyle = col; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.28); ctx.fill(); }
      raf = requestAnimationFrame(draw);
    };
    resize(); addEventListener('resize', resize, { passive: true });
    new IntersectionObserver(([e]) => { cancelAnimationFrame(raf); if (e.isIntersecting && !reducedMotion()) raf = requestAnimationFrame(draw); }).observe(c);
  }

  // pointer effects: spotlight, magnetic buttons, 3D tilt (fine pointers only)
  if (matchMedia('(hover: hover) and (pointer: fine)').matches) {
    document.addEventListener('pointermove', e => {
      const s = e.target.closest('.spot');
      if (s) { const r = s.getBoundingClientRect(); s.style.setProperty('--mx', (e.clientX - r.left) + 'px'); s.style.setProperty('--my', (e.clientY - r.top) + 'px'); }
    }, { passive: true });
    $$('.magnet').forEach(b => {
      b.addEventListener('pointermove', e => { if (reducedMotion()) return; const r = b.getBoundingClientRect(); b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .18}px,${(e.clientY - r.top - r.height / 2) * .3}px)`; });
      b.addEventListener('pointerleave', () => { b.style.transform = ''; });
    });
    $$('.tilt').forEach(f => {
      f.addEventListener('pointermove', e => { if (reducedMotion()) return; const r = f.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
        f.style.setProperty('--ry', (x * 8) + 'deg'); f.style.setProperty('--rx', (-y * 8) + 'deg'); });
      f.addEventListener('pointerleave', () => { f.style.setProperty('--ry', '0deg'); f.style.setProperty('--rx', '0deg'); });
    });
  }

  /* ───────── scroll: header, progress, active nav, timeline, to-top ───────── */
  const hdr = $('#hdr'), bar = $('#progress'), top = $('#toTop'), rail = $('#timeline .rail i'), tl = $('#timeline');
  let ticking = false;
  function onScroll() {
    ticking = false;
    const y = scrollY, max = document.documentElement.scrollHeight - innerHeight;
    hdr.classList.toggle('scrolled', y > 10);
    bar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    top.classList.toggle('show', y > 700);
    const r = tl ? tl.getBoundingClientRect() : { top: 0, height: 1 }; const p = Math.min(1, Math.max(0, (innerHeight * .6 - r.top) / r.height));
    if (rail) rail.style.height = (p * 100).toFixed(1) + '%';
  }
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  top.addEventListener('click', () => scrollTo({ top: 0, behavior: reducedMotion() ? 'auto' : 'smooth' }));
  const links = $$('.menu a');
  const so = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id)); }), { rootMargin: '-45% 0px -50% 0px' });
  ['about', 'intro', 'skills', 'projects', 'oss', 'career', 'archiving', 'contact'].forEach(id => { const el = document.getElementById(id); if (el) so.observe(el); });
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .08, rootMargin: '0px 0px -40px 0px' });
  $$('.reveal').forEach(el => io.observe(el));

  /* ───────── boot ───────── */
  applyPrefs(); onScroll();
  let splashShown = false;
  try { splashShown = sessionStorage.getItem('oa-splash') === '1'; sessionStorage.setItem('oa-splash', '1'); } catch (e) {}
  const splash = $('#splash');
  const startHero = () => { root.classList.add('ready'); setTimeout(typeCode, reducedMotion() ? 0 : 900); setTimeout(() => $$('[data-count-to]').forEach(countUp), reducedMotion() ? 0 : 900); stars(); };
  if (!splashShown && !reducedMotion() && !location.hash) {
    splash.classList.add('run'); root.style.setProperty('--d0', '1500ms');
    setTimeout(() => splash.remove(), 2300);
  } else splash.remove();
  startHero();
  darkMQ.addEventListener?.('change', applyPrefs);
})();
