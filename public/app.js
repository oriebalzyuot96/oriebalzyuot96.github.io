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
  const DEF = { theme: 'system', skin: 'none', accent: 'lavender', font: 'm', contrast: 'none', motion: 'system', lang: 'en',
    readable: false, links: false, spacing: false, cursor: false };
  let prefs = { ...DEF };
  try { Object.assign(prefs, JSON.parse(localStorage.getItem('oa-prefs') || '{}')); } catch (e) { /* storage blocked */ }
  prefs.lang = PAGE_LANG; // the URL decides the language; prefs only remember the visitor's last choice
  const save = () => { try { localStorage.setItem('oa-prefs', JSON.stringify(prefs)); } catch (e) {} };
  const reducedMotion = () => prefs.motion === 'reduced' || (prefs.motion === 'system' && reduceMQ.matches);
  /* premium themes ("skins") are full token sets with their own light/dark base */
  const SKINS = { aurora: 'dark', sakura: 'light', mochi: 'light' };
  const SKIN_BG = { aurora: '#070b1a', sakura: '#fff6f8', mochi: '#f3fbf7' };
  if (!SKINS[prefs.skin]) prefs.skin = 'none'; else prefs.theme = SKINS[prefs.skin];
  const look = () => (prefs.skin !== 'none' ? prefs.skin : prefs.theme);
  const isDark = () => prefs.theme === 'dark' || (prefs.theme === 'system' && darkMQ.matches);

  function applyPrefs() {
    prefs.theme === 'system' ? root.removeAttribute('data-theme') : root.setAttribute('data-theme', prefs.theme);
    prefs.skin !== 'none' ? root.setAttribute('data-skin', prefs.skin) : root.removeAttribute('data-skin');
    for (const k of ['accent', 'font', 'contrast', 'motion']) {
      prefs[k] === DEF[k] ? root.removeAttribute('data-' + k) : root.setAttribute('data-' + k, prefs[k]);
    }
    for (const k of ['readable', 'links', 'spacing', 'cursor']) {
      prefs[k] ? root.setAttribute('data-' + k, 'on') : root.removeAttribute('data-' + k);
    }
    $$('[data-pref]').forEach(g => {
      const k = g.dataset.pref;
      if (g.getAttribute('role') === 'switch') { g.setAttribute('aria-checked', String(!!prefs[k])); return; }
      const cur = k === 'look' ? look() : prefs[k];
      $$('[data-v]', g).forEach(b => { const on = b.dataset.v === String(cur); b.setAttribute('aria-checked', String(on)); b.tabIndex = on ? 0 : -1; });
    });
    const n = ['font', 'contrast', 'motion', 'readable', 'links', 'spacing', 'cursor'].filter(k => prefs[k] !== DEF[k]).length;
    $$('[data-count]').forEach(c => { c.textContent = n; c.classList.toggle('show', n > 0); });
    const meta = $('meta[name="theme-color"]'); if (meta) meta.content = SKIN_BG[prefs.skin] || (isDark() ? '#0f0d16' : '#6d4aff');
    $$('[data-preset]').forEach(b => b.setAttribute('aria-pressed', String(presetOn(b.dataset.preset))));
    save();
    document.dispatchEvent(new CustomEvent('oa:prefs', { detail: { ...prefs, look: look(), dark: isDark(), reduced: reducedMotion() } }));
  }
  /* View Transitions, ported from mashroo3hub: theme = circular reveal from the click point; other prefs fade */
  function runVT(apply, kind = 'fade', to) {
    if (typeof document.startViewTransition !== 'function' || reducedMotion()) { apply(); return; }
    root.dataset.vt = kind; if (to) root.dataset.vtTo = to; else delete root.dataset.vtTo;
    const done = () => { if (root.dataset.vt === kind) { delete root.dataset.vt; delete root.dataset.vtTo; } };
    document.startViewTransition(apply).finished.then(done, done);
  }
  document.addEventListener('pointerdown', e => { root.style.setProperty('--vt-x', Math.round(e.clientX) + 'px'); root.style.setProperty('--vt-y', Math.round(e.clientY) + 'px'); }, { capture: true, passive: true });
  document.addEventListener('keydown', () => { root.style.removeProperty('--vt-x'); root.style.removeProperty('--vt-y'); }, { capture: true, passive: true });
  const VISUAL = new Set(['theme', 'accent', 'contrast', 'font', 'readable', 'spacing']);

  function setPref(k, v) {
    if (k === 'look') {
      if (SKINS[v]) { prefs.skin = v; prefs.theme = SKINS[v]; } else { prefs.skin = 'none'; prefs.theme = v; }
      runVT(applyPrefs, 'reveal', isDark() ? 'dark' : 'light'); return;
    }
    prefs[k] = v;
    if (k === 'lang' && v !== PAGE_LANG) { prefs.lang = v; save(); goLang(v); return; }
    if (k === 'theme') { runVT(applyPrefs, 'reveal', isDark() ? 'dark' : 'light'); return; }
    if (VISUAL.has(k)) { runVT(applyPrefs, 'fade'); return; }
    applyPrefs();
  }

  /* ───────── i18n (strings are rendered at build time; these are the few runtime ones) ───────── */
  const t = (key, fallback) => I18N[key] ?? fallback ?? key;
  function altPath(lang) {
    const p = location.pathname.replace(/^\/ar(\/|$)/, '/');
    return (lang === 'ar' ? '/ar' + (p === '/' ? '/' : p) : p) + location.hash;
  }
  function goLang(lang) { location.href = altPath(lang); }
  // captions stay off by default (they covered the reel); viewers turn them on from the player's captions menu
  { const v = $('#introVideo'); if (v && v.textTracks) { const off = () => [...v.textTracks].forEach(tr => { tr.mode = 'disabled'; }); off(); v.textTracks.addEventListener?.('addtrack', off, { once: true }); } }

  /* ───────── controls ───────── */
  $$('[data-pref]').forEach(g => {
    const k = g.dataset.pref;
    if (g.getAttribute('role') === 'switch') { g.addEventListener('click', () => setPref(k, !prefs[k])); return; }
    g.addEventListener('click', e => { const b = e.target.closest('[data-v]'); if (b) setPref(k, b.dataset.v); });
    g.addEventListener('keydown', e => {
      if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) return;
      e.preventDefault();
      const cur = k === 'look' ? look() : prefs[k];
      const bs = $$('[data-v]', g), i = bs.findIndex(b => b.dataset.v === String(cur));
      let d = (e.key === 'ArrowRight' || e.key === 'ArrowDown') ? 1 : -1;
      if (root.dir === 'rtl' && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) d = -d;
      const nb = bs[(i + d + bs.length) % bs.length]; setPref(k, nb.dataset.v); nb.focus();
    });
  });
  const toggleTheme = () => { setPref('look', isDark() ? 'light' : 'dark'); sfx('pop'); };
  const toggleLang = () => { sfx('step'); setPref('lang', PAGE_LANG === 'ar' ? 'en' : 'ar'); };
  /* theme picker popover (header): previews of every theme, radio semantics, Esc / outside click / Tab-out closes */
  const lookPop = $('#lookPop'), themeBtn = $('#themeBtn');
  function setLookPop(open, focusBack) {
    if (!lookPop) return;
    lookPop.hidden = !open; themeBtn.setAttribute('aria-expanded', String(open));
    if (open) { sfx('pop'); setTimeout(() => ($('[aria-checked="true"]', lookPop) || $('[role=radio]', lookPop)).focus(), 20); }
    else if (focusBack) themeBtn.focus();
  }
  themeBtn.addEventListener('click', () => setLookPop(lookPop ? lookPop.hidden : false));
  if (lookPop) {
    lookPop.addEventListener('keydown', e => { if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); setLookPop(false, true); } });
    lookPop.addEventListener('focusout', e => { if (!lookPop.hidden && e.relatedTarget && !lookPop.contains(e.relatedTarget) && e.relatedTarget !== themeBtn) setLookPop(false); });
    document.addEventListener('pointerdown', e => { if (!lookPop.hidden && !lookPop.contains(e.target) && !themeBtn.contains(e.target)) setLookPop(false); });
    $('[data-close-look]', lookPop)?.addEventListener('click', () => setLookPop(false, true));
  }

  /* accessibility presets: each one is a bundle of settings; pressing an active preset undoes it */
  const PRESETS = {
    lowvision: { font: 'xl', readable: true, links: true },
    dyslexia: { readable: true, spacing: true },
    motion: { motion: 'reduced' },
    contrast: { contrast: 'yellow', links: true },
  };
  function presetOn(name) { const p = PRESETS[name]; return !!p && Object.keys(p).every(k => prefs[k] === p[k]); }
  $$('[data-preset]').forEach(b => b.addEventListener('click', () => {
    const p = PRESETS[b.dataset.preset]; if (!p) return;
    const on = presetOn(b.dataset.preset);
    for (const k of Object.keys(p)) prefs[k] = on ? DEF[k] : p[k];
    sfx(on ? 'step' : 'success');
    runVT(applyPrefs, 'fade');
    toast((on ? t('pre.off', 'Preset off') : t('pre.on', 'Preset on')) + ': ' + b.querySelector('b').textContent);
  }));
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

  /* project overlay: built from the card itself (summary, full description, highlights, case study, every link) */
  function openCase(id) {
    const card = document.getElementById(id); if (!card) return;
    const img = $('.frame > img', card), vid = $('.frame > video', card);
    const media = img ? `<div class="hero-img"><img src="${$('.frame', card).dataset.full || img.src}" alt="${img.alt}"></div>`
      : vid ? `<div class="hero-img">${vid.outerHTML}</div>`
      : `<div class="hero-img">${$('.frame', card).outerHTML.replace('frame tilt', 'frame')}</div>`;
    const title = $('.p-title, h3', card), detail = $('.p-detail', card), cs = $('.case', card);
    const hl = detail && $('ul.hl', detail), links = detail ? $$('.p-links a', detail) : [];
    sheet.innerHTML = `${closeBtn()}${media}<div class="content">
      <div class="org m-org">${$('.org', card).innerHTML}${detail && $('.float', detail) ? `<span class="m-float">${$('.float', detail).innerHTML}</span>` : ''}</div>
      <h2 id="mTitle"${title.classList.contains('ltr') ? ' dir="ltr" class="ltr"' : ''}>${title.innerHTML}</h2>
      ${detail && $('.alt-name', detail) ? `<div class="ar-text m-alt">${$('.alt-name', detail).innerHTML}</div>` : ''}
      <p class="m-sum">${$('.p-sum', card).innerHTML}</p>
      ${detail && $('.p-desc', detail) ? `<p class="m-desc">${$('.p-desc', detail).innerHTML}</p>` : ''}
      ${hl && hl.children.length ? `<h3 class="m-h">${t('detail.hl', 'Highlights')}</h3><ul class="hl m-hl">${hl.innerHTML}</ul>` : ''}
      ${cs ? `<div class="cs-grid">${cs.innerHTML}</div>` : ''}
      <div class="tags m-tags">${$('.tags', card).innerHTML}</div>
      ${links.length ? `<div class="p-actions">${links.map(a => a.outerHTML).join('')}</div>` : ''}</div>`;
    const v = $('video', sheet); if (v) { v.removeAttribute('id'); v.preload = 'metadata'; }
    modal.setAttribute('aria-labelledby', 'mTitle'); modal.removeAttribute('aria-label');
    openOverlay('modal', modal, $('[data-close]', sheet));
  }
  // "View screenshots" buttons open the card's screenshot
  document.addEventListener('click', e => { const b = e.target.closest('[data-shots]'); if (!b) return; const f = $('.frame[data-full]', b.closest('.proj')); if (f) openImage(f); });
  function openImage(fig) {
    const img = $('img', fig);
    modal.classList.add('image');
    sheet.innerHTML = `${closeBtn()}<figure><img src="${fig.dataset.full}" alt="${img.alt}"><figcaption>${img.alt}</figcaption></figure>`;
    modal.setAttribute('aria-label', img.alt); modal.removeAttribute('aria-labelledby');
    openOverlay('modal', modal, $('[data-close]', sheet));
  }
  function playIntro() {
    const sec = $('#intro'); const v = $('#introVideo');
    if (!sec || !v) { location.href = (document.documentElement.lang === 'ar' ? '/ar' : '') + '/about/#intro'; return; }
    showTarget(sec);
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
  const PRE = PAGE_LANG === 'ar' ? '/ar' : '';
  const smooth = () => (reducedMotion() ? 'auto' : 'smooth');
  /* go to a page (and optionally an anchor on it); on the same page, open the tab that holds the anchor and scroll */
  const goto = (path, hash = '') => () => {
    closeOverlay(true);
    const here = location.pathname === PRE + path || (path === '/' && location.pathname === PRE);
    const el = hash ? document.getElementById(hash) : null;
    if (here && (!hash || el)) {
      if (el) { showTarget(el); history.replaceState(null, '', '#' + hash); el.scrollIntoView({ behavior: smooth() }); } else scrollTo({ top: 0, behavior: smooth() });
      return;
    }
    location.href = PRE + path + (hash ? '#' + hash : '');
  };
  /* project commands: open the overlay here when the card is on this page, otherwise on /work */
  const caseCmd = id => () => {
    closeOverlay(true);
    const local = document.getElementById(id) || document.getElementById(id.replace(/^p-/, 'f-'));
    if (local) { showTarget(local); openCase(local.id); return; }
    try { sessionStorage.setItem('oa-open-case', id); } catch (e) {}
    location.href = PRE + '/work/#' + id;
  };
  const PAGE = L('Page', 'صفحة'), SEC = L('Section', 'قسم'), PRJ = L('Project', 'مشروع');
  const CMDS = [
    { e: '🏠', l: L('Home', 'الرئيسية'), g: PAGE, run: goto('/') },
    { e: '🚀', l: L('Work: all projects', 'الأعمال: كل المشاريع'), g: PAGE, run: goto('/work/') },
    { e: '🏢', l: L('Company projects', 'مشاريع الشركات'), g: SEC, run: goto('/work/', 'company') },
    { e: '📦', l: L('Libraries & developer tools', 'المكتبات وأدوات المطوّرين'), g: SEC, run: goto('/work/', 'libraries') },
    { e: '🛠️', l: L('Developer tools', 'أدوات المطوّرين'), g: SEC, run: goto('/work/', 'tools') },
    { e: '🧪', l: L('My projects', 'مشاريعي'), g: SEC, run: goto('/work/', 'projects') },
    { e: '🎨', l: L('Themes & design samples', 'الثيمات وعيّنات التصميم'), g: SEC, run: goto('/work/', 'themes') },
    { e: '👋', l: L('About me', 'عنّي'), g: PAGE, run: goto('/about/') },
    { e: '🎬', l: L('Watch intro video', 'شاهد الفيديو التعريفي'), g: L('Action', 'إجراء'), run: () => { closeOverlay(true); playIntro(); } },
    { e: '🧰', l: L('Skills', 'المهارات'), g: SEC, run: goto('/about/', 'skills') },
    { e: '🧭', l: L('Career', 'المسيرة المهنية'), g: SEC, run: goto('/about/', 'career') },
    { e: '🗂️', l: L('Archive: GitHub, LinkedIn, CV', 'الأرشيف: GitHub و LinkedIn والسيرة'), g: SEC, run: goto('/about/', 'archive') },
    { e: '⚗️', l: L('Lab', 'المختبر'), g: PAGE, run: goto('/lab/') },
    { e: '🧩', l: L('UI kit demo', 'عرض مكتبة الواجهات'), g: SEC, run: goto('/lab/', 'uikit') },
    { e: '⚡', l: L('StackBlitz & CodePen playgrounds', 'ساحات StackBlitz و CodePen'), g: SEC, run: goto('/lab/', 'playgrounds') },
    { e: '🐛', l: L('Open-source radar', 'المساهمات المفتوحة المصدر'), g: SEC, run: goto('/lab/', 'oss') },
    { e: '✍️', l: L('Writing: articles', 'المقالات'), g: PAGE, run: goto('/writing/') },
    { e: '💼', l: L('Hire me', 'وظّفني'), g: PAGE, run: goto('/hire/') },
    { e: '🤝', l: L('Freelance services', 'خدمات العمل الحر'), g: SEC, run: goto('/hire/', 'services') },
    { e: '✉️', l: L('Contact', 'تواصل'), g: SEC, run: goto('/', 'contact') },
    { e: '💸', l: L('Wasl · financing platform', 'وصل · منصة التمويل'), g: PRJ, run: caseCmd('p-wasl') },
    { e: '🏛️', l: L('Saudi Bar Association', 'الهيئة السعودية للمحامين'), g: PRJ, run: caseCmd('p-sba') },
    { e: '🏗️', l: L('Engineering Arbitration Center', 'مركز التحكيم الهندسي'), g: PRJ, run: caseCmd('p-seac') },
    { e: '📄', l: L('Contracts e-signature', 'عقود · التوقيع الإلكتروني'), g: PRJ, run: caseCmd('p-contracts') },
    { e: '👥', l: L('HR solution (Shepherd)', 'نظام الموارد البشرية (Shepherd)'), g: PRJ, run: caseCmd('p-hr') },
    { e: '🌊', l: L('Pelagic UI · component library', 'Pelagic UI · مكتبة مكوّنات'), g: PRJ, run: caseCmd('p-nawa') },
    { e: '🛡️', l: L('Nawa Captcha', 'نوى كابتشا'), g: PRJ, run: caseCmd('p-nawa-guard') },
    { e: '🌿', l: L('Calm Plan', 'خطة الهدوء'), g: PRJ, run: caseCmd('p-calm-plan') },
    { e: '🐋', l: L('5min Refresh', '5min Refresh'), g: PRJ, run: caseCmd('p-5min-refresh') },
    { e: '🌗', l: L('Toggle dark mode', 'تبديل الوضع الداكن'), g: L('Action', 'إجراء'), run: () => { closeOverlay(true); toggleTheme(); } },
    { e: '🌌', l: L('Theme: Midnight Aurora', 'السمة: شفق منتصف الليل'), g: L('Theme', 'سمة'), run: () => { closeOverlay(true); setPref('look', 'aurora'); } },
    { e: '🌸', l: L('Theme: Sakura', 'السمة: ساكورا'), g: L('Theme', 'سمة'), run: () => { closeOverlay(true); setPref('look', 'sakura'); } },
    { e: '🍡', l: L('Theme: Mint Mochi', 'السمة: موتشي النعناع'), g: L('Theme', 'سمة'), run: () => { closeOverlay(true); setPref('look', 'mochi'); } },
    { e: '☀️', l: L('Theme: Light', 'السمة: فاتح'), g: L('Theme', 'سمة'), run: () => { closeOverlay(true); setPref('look', 'light'); } },
    { e: '🌙', l: L('Theme: Dark', 'السمة: داكن'), g: L('Theme', 'سمة'), run: () => { closeOverlay(true); setPref('look', 'dark'); } },
    { e: '🎨', l: L('Choose a theme…', 'اختيار السمة…'), g: L('Theme', 'سمة'), run: () => { closeOverlay(true); setLookPop(true); } },
    { e: '👓', l: L('Preset: Low vision', 'إعداد جاهز: ضعف البصر'), g: L('Accessibility', 'الوصول'), run: () => { closeOverlay(true); $('[data-preset="lowvision"]').click(); } },
    { e: '📖', l: L('Preset: Dyslexia-friendly', 'إعداد جاهز: عسر القراءة'), g: L('Accessibility', 'الوصول'), run: () => { closeOverlay(true); $('[data-preset="dyslexia"]').click(); } },
    { e: '⏸', l: L('Preset: Motion-sensitive', 'إعداد جاهز: حساسية الحركة'), g: L('Accessibility', 'الوصول'), run: () => { closeOverlay(true); $('[data-preset="motion"]').click(); } },
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
  const SECS = [['/'], ['/work/'], ['/about/'], ['/lab/'], ['/writing/'], ['/hire/'], ['/', 'contact']];
  document.addEventListener('keydown', e => {
    const mod = e.ctrlKey || e.metaKey;
    if (mod && (e.key === 'k' || e.key === 'K')) { e.preventDefault(); openLayer === 'palette' ? closeOverlay() : openPalette(); }
    else if (mod && e.key === ',') { e.preventDefault(); openLayer === 'drawer' ? closeOverlay() : openSettings(); }
    else if (e.key === 'Escape' && openLayer) { e.preventDefault(); closeOverlay(); }
    else if (e.altKey && e.code === 'KeyT') { e.preventDefault(); toggleTheme(); }
    else if (e.altKey && e.code === 'KeyL') { e.preventDefault(); toggleLang(); }
    else if (e.altKey && e.code === 'KeyS') { e.preventDefault(); toggleSound(); }
    else if (e.altKey && /^Digit[1-7]$/.test(e.code)) { e.preventDefault(); goto(...SECS[+e.code.slice(5) - 1])(); }
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
  // each part (company / own work) has its own filter row
  $$('.pj-part').forEach(part => {
    const projs = $$('.proj', part), chips = $$('.chip', part);
    $$('[data-n]', part).forEach(c => { const f = c.dataset.n; c.textContent = f === 'all' ? projs.length : projs.filter(p => p.dataset.c === f).length; });
    const live = $('[data-pj-live]', part);
    let anims = [];
    chips.forEach(c => c.addEventListener('click', () => {
      if (c.getAttribute('aria-pressed') === 'true') return;
      chips.forEach(x => x.setAttribute('aria-pressed', String(x === c)));
      const f = c.dataset.f, show = p => f === 'all' || p.dataset.c === f;
      anims.forEach(a => a.cancel()); anims = [];
      // FLIP: First (old boxes) → apply filter → Last → Invert → Play. Transform/opacity only.
      const first = new Map(projs.filter(p => !p.hidden).map(p => [p, p.getBoundingClientRect()]));
      projs.forEach(p => { p.hidden = !show(p); p.classList.add('in'); });
      const n = projs.filter(show).length;
      if (live) live.textContent = t('pj.showing', 'Showing {n} of {t} projects').replace('{n}', n).replace('{t}', projs.length);
      sfx('step');
      if (reducedMotion() || !Element.prototype.animate) return;
      const ease = 'cubic-bezier(.2,.8,.2,1)';
      projs.filter(p => !p.hidden).forEach((p, i) => {
        const a = first.get(p), b = p.getBoundingClientRect();
        if (a) {
          const dy = a.top - b.top, dx = a.left - b.left;
          if (Math.abs(dy) > 1 || Math.abs(dx) > 1) anims.push(p.animate([{ transform: `translate(${dx}px,${Math.max(-600, Math.min(600, dy))}px)` }, { transform: 'none' }], { duration: 620, easing: ease }));
        } else {
          anims.push(p.animate([{ opacity: 0, transform: 'translateY(36px) scale(.96)' }, { opacity: 1, transform: 'none' }], { duration: 560, delay: Math.min(i, 6) * 70, easing: ease, fill: 'backwards' }));
        }
      });
    }));
  });

  /* ───────── hero motion ───────── */
  let words = ($('#rot')?.dataset.words || 'trust').split('|'), wi = 0;
  setInterval(() => {
    if (reducedMotion() || document.hidden) return;
    const w = $('#rot .w'); if (!w || words.length < 2) return;
    wi = (wi + 1) % words.length;
    // reuse the same node (restart the CSS animation) so the swap never creates a new LCP candidate
    w.textContent = words[wi]; w.style.animation = 'none'; void w.offsetWidth; w.style.animation = '';
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
    const now = fmt.format(new Date());
    const c = $('#clock'); if (c) c.textContent = now;
    $$('[data-clock]').forEach(el => { el.textContent = now.slice(0, 5); });
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
      if (document.hidden) { raf = requestAnimationFrame(draw); return; }
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
    top.classList.toggle('show', y > 500);
    const pct = max > 0 ? Math.round((y / max) * 100) : 0;
    const ring = $('#topRing'); if (ring) ring.style.strokeDashoffset = String(100 - pct);
    const pl = $('#topPct'); if (pl) pl.textContent = pct + '%';
    const r = tl ? tl.getBoundingClientRect() : { top: 0, height: 1 }; const p = Math.min(1, Math.max(0, (innerHeight * .6 - r.top) / r.height));
    // transform-only (scaleY + translateY) so drawing the line never counts as a layout shift
    if (rail) { rail.style.transform = `scaleY(${p.toFixed(4)})`; const hd = rail.nextElementSibling; if (hd) hd.style.transform = `translateY(${(p * rail.parentElement.clientHeight).toFixed(1)}px)`; }
  }
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  top.addEventListener('click', () => scrollTo({ top: 0, behavior: reducedMotion() ? 'auto' : 'smooth' }));
  /* ───────── page tabs (/work, /about, /lab): APG tabs with automatic activation, hash = selected tab ───────── */
  const tabBar = $('[data-ptabs]');
  const ptabs = tabBar ? $$('[role=tab]', tabBar) : [];
  function selectTab(tab, { focus = false, push = false, scroll = false } = {}) {
    if (!tab) return;
    ptabs.forEach(x => {
      const on = x === tab, panel = document.getElementById(x.getAttribute('aria-controls'));
      x.setAttribute('aria-selected', String(on)); x.tabIndex = on ? 0 : -1;
      if (panel) panel.hidden = !on;
    });
    if (focus) tab.focus();
    const id = tab.getAttribute('aria-controls');
    if (push && location.hash.slice(1) !== id) history.replaceState(null, '', '#' + id);
    // the bar is sticky: if the reader is already below the top of the panels, bring the start of the new panel into view
    if (scroll) { const p = document.getElementById(id), top = tabBar.getBoundingClientRect().top; if (p && p.getBoundingClientRect().top < top) p.scrollIntoView({ behavior: 'auto' }); }
    // newly shown cards: reveal those already on screen
    requestAnimationFrame(() => $$('.reveal:not(.in)', document.getElementById(id) || document).forEach(el => { if (el.getBoundingClientRect().top < innerHeight) el.classList.add('in'); }));
    document.dispatchEvent(new CustomEvent('oa:tab', { detail: id }));
  }
  /* make an element visible: open the tab panel that contains it */
  function showTarget(el) {
    const panel = el && el.closest('[role=tabpanel]');
    if (panel && panel.hidden) selectTab(document.getElementById(panel.getAttribute('aria-labelledby')));
  }
  ptabs.forEach((tb, i) => {
    tb.addEventListener('click', () => { selectTab(tb, { push: true, scroll: true }); sfx('step'); });
    tb.addEventListener('keydown', e => {
      let n = null;
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { let d = e.key === 'ArrowRight' ? 1 : -1; if (root.dir === 'rtl') d = -d; n = ptabs[(i + d + ptabs.length) % ptabs.length]; }
      else if (e.key === 'Home') n = ptabs[0]; else if (e.key === 'End') n = ptabs[ptabs.length - 1];
      if (n) { e.preventDefault(); selectTab(n, { focus: true, push: true }); }
    });
  });
  function fromHash(onChange) {
    const id = decodeURIComponent(location.hash.slice(1)); if (!id) return;
    const el = document.getElementById(id); if (!el) return;
    const tab = ptabs.find(x => x.getAttribute('aria-controls') === id);
    if (tab) { selectTab(tab); if (onChange) el.scrollIntoView({ behavior: 'auto' }); return; }
    showTarget(el); requestAnimationFrame(() => el.scrollIntoView({ behavior: 'auto' }));
  }
  if (ptabs.length) { fromHash(false); addEventListener('hashchange', () => fromHash(true)); }
  // a project command from another page asked for this overlay
  try { const pend = sessionStorage.getItem('oa-open-case'); if (pend) { sessionStorage.removeItem('oa-open-case'); const c = document.getElementById(pend); if (c) { showTarget(c); setTimeout(() => openCase(pend), 300); } } } catch (e) {}

  /* ───────── mobile navigation (disclosure) ───────── */
  const navBtn = $('#navBtn'), mnav = $('#mnav');
  if (navBtn && mnav) {
    const setNav = (open, back) => { mnav.hidden = !open; navBtn.setAttribute('aria-expanded', String(open)); if (open) $('a', mnav)?.focus(); else if (back) navBtn.focus(); };
    navBtn.addEventListener('click', () => { setNav(mnav.hidden); sfx('pop'); });
    mnav.addEventListener('keydown', e => { if (e.key === 'Escape') { e.stopPropagation(); setNav(false, true); } });
    document.addEventListener('pointerdown', e => { if (!mnav.hidden && !mnav.contains(e.target) && !navBtn.contains(e.target)) setNav(false); });
    mnav.addEventListener('focusout', e => { if (e.relatedTarget && !mnav.contains(e.relatedTarget) && e.relatedTarget !== navBtn) setNav(false); });
  }
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: 0, rootMargin: '0px 0px -40px 0px' });
  // stagger: siblings revealed together cascade in (index per parent, capped so long lists never wait)
  const groups = new Map();
  $$('.reveal').forEach(el => { const k = el.parentElement; const i = groups.get(k) || 0; groups.set(k, i + 1); el.style.setProperty('--ri', String(Math.min(i, 6))); io.observe(el); });
  // safety net: anything already scrolled past (fast scroll, anchors, find-in-page) is shown
  let sweepT; addEventListener('scroll', () => { clearTimeout(sweepT); sweepT = setTimeout(() => $$('.reveal:not(.in)').forEach(el => { if (el.getBoundingClientRect().top < innerHeight) el.classList.add('in'); }), 140); }, { passive: true });

  /* ───────── boot ───────── */
  applyPrefs(); onScroll();
  // the hero entrance starts as the boot splash (inline in Base.astro) opens, so it plays in view instead of behind the splash
  let heroStarted = false;
  const startHero = () => { if (heroStarted) return; heroStarted = true; root.classList.add('ready'); setTimeout(typeCode, reducedMotion() ? 0 : 900); setTimeout(() => $$('[data-count-to]').forEach(countUp), reducedMotion() ? 0 : 900); stars(); };
  if (root.dataset.boot === 'splash' && !window.__oaBootLeft) { document.addEventListener('oa:boot-leave', startHero, { once: true }); setTimeout(startHero, 4000); }
  else startHero();
  darkMQ.addEventListener?.('change', applyPrefs);
  reduceMQ.addEventListener?.('change', applyPrefs);
  /* small API for fx.js (motion system + 3D hero) */
  window.OA = { prefs: () => ({ ...prefs, look: look(), dark: isDark() }), reducedMotion, isDark, setPref, toast, t, sfx, openLookPicker: () => setLookPop(true) };
  document.dispatchEvent(new CustomEvent('oa:ready'));
})();
