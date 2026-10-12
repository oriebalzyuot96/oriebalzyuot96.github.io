/* Shared micro-core for the RBK 2026 rebuilds: i18n + RTL, theme, storage, toasts, hash router.
   Plain ES module, no dependencies. Orieb Alzyuot, 2026. */

export const $ = (s, r = document) => r.querySelector(s);
export const $$ = (s, r = document) => [...r.querySelectorAll(s)];
export const esc = (v) => String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
export const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- storage (never throws) ---------- */
export function store(ns) {
  const k = (key) => `${ns}:${key}`;
  return {
    get(key, fallback) {
      try { const v = localStorage.getItem(k(key)); return v == null ? fallback : JSON.parse(v); } catch { return fallback; }
    },
    set(key, value) { try { localStorage.setItem(k(key), JSON.stringify(value)); } catch { /* private mode */ } },
    del(key) { try { localStorage.removeItem(k(key)); } catch { /* ignore */ } },
  };
}

/* ---------- i18n ---------- */
let DICT = { en: {}, ar: {} };
let LANG = 'en';
let NS = 'rbk';
const listeners = new Set();

export const lang = () => LANG;
export const isAr = () => LANG === 'ar';
export const onLang = (fn) => { listeners.add(fn); return () => listeners.delete(fn); };

export function t(key, vars) {
  let s = DICT[LANG]?.[key] ?? DICT.en[key] ?? key;
  if (vars) s = s.replace(/\{(\w+)\}/g, (_, v) => (vars[v] ?? ''));
  return s;
}
/* pick a bilingual field: {en, ar} or a plain string */
export const L = (v) => (v && typeof v === 'object' ? (v[LANG] ?? v.en) : v);

export function applyI18n(root = document) {
  $$('[data-i18n]', root).forEach((el) => { el.textContent = t(el.dataset.i18n); });
  $$('[data-i18n-html]', root).forEach((el) => { el.innerHTML = t(el.dataset.i18nHtml); });
  $$('[data-i18n-attr]', root).forEach((el) => {
    el.dataset.i18nAttr.split(',').forEach((pair) => {
      const [attr, key] = pair.split(':').map((s) => s.trim());
      el.setAttribute(attr, t(key));
    });
  });
}

export function setLang(next, { push = true } = {}) {
  LANG = next === 'ar' ? 'ar' : 'en';
  const html = document.documentElement;
  html.lang = LANG;
  html.dir = LANG === 'ar' ? 'rtl' : 'ltr';
  store(NS).set('lang', LANG);
  if (push) {
    const u = new URL(location.href);
    if (LANG === 'ar') u.searchParams.set('lang', 'ar'); else u.searchParams.delete('lang');
    history.replaceState(history.state, '', u);
  }
  if (DICT[LANG]['meta.title']) document.title = t('meta.title');
  applyI18n();
  $$('[data-act="lang"]').forEach((b) => {
    b.setAttribute('aria-label', t('ui.switchLang'));
    const lab = b.querySelector('[data-lang-label]');
    if (lab) lab.textContent = LANG === 'ar' ? 'EN' : 'ع';
  });
  listeners.forEach((fn) => fn(LANG));
}

/* ---------- theme ---------- */
export function setTheme(mode) {
  const html = document.documentElement;
  html.dataset.theme = mode;
  store(NS).set('theme', mode);
  const meta = $('meta[name="theme-color"]');
  if (meta) meta.content = getComputedStyle(html).getPropertyValue('--bg').trim() || meta.content;
  $$('[data-act="theme"]').forEach((b) => {
    b.setAttribute('aria-pressed', String(mode === 'dark'));
    b.setAttribute('aria-label', t(mode === 'dark' ? 'ui.lightMode' : 'ui.darkMode'));
  });
}

/* ---------- toast ---------- */
let toastBox;
export function toast(msg, { icon = '✓', tone = 'ok' } = {}) {
  if (!toastBox) {
    toastBox = document.createElement('div');
    toastBox.className = 'toasts';
    toastBox.setAttribute('role', 'status');
    toastBox.setAttribute('aria-live', 'polite');
    document.body.append(toastBox);
  }
  while (toastBox.children.length >= 2) toastBox.firstElementChild.remove();
  const el = document.createElement('div');
  el.className = `toast ${tone}`;
  el.innerHTML = `<span class="toast-i" aria-hidden="true">${icon}</span><span>${esc(msg)}</span>`;
  toastBox.append(el);
  setTimeout(() => { el.classList.add('out'); setTimeout(() => el.remove(), 400); }, 2800);
}

/* ---------- money ---------- */
export function money(n, cur = 'JOD') {
  try {
    return new Intl.NumberFormat(LANG === 'ar' ? 'ar-JO' : 'en-JO', { style: 'currency', currency: cur, minimumFractionDigits: 2, maximumFractionDigits: 2, numberingSystem: 'latn' }).format(n);
  } catch { return `${n.toFixed(2)} ${cur}`; }
}

/* ---------- hash router ---------- */
export function router(routes, fallback) {
  const run = () => {
    const path = (location.hash || '#/').slice(1) || '/';
    for (const [pattern, fn] of routes) {
      const m = path.match(pattern);
      if (m) { fn(...m.slice(1).map(decodeURIComponent)); return; }
    }
    fallback?.(path);
  };
  addEventListener('hashchange', run);
  return run;
}

/* ---------- reveal on scroll ---------- */
let io;
export function reveal(root = document) {
  if (reducedMotion() || !('IntersectionObserver' in window)) { $$('.rv', root).forEach((e) => e.classList.add('in')); return; }
  io ??= new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px' });
  $$('.rv:not(.in)', root).forEach((e) => io.observe(e));
}

/* ---------- form helpers ---------- */
export function fieldError(input, msg) {
  const id = `${input.id}-err`;
  let err = document.getElementById(id);
  const wrap = input.closest('.field') || input.parentElement;
  if (msg) {
    if (!err) { err = document.createElement('p'); err.className = 'err'; err.id = id; wrap.append(err); }
    err.textContent = msg;
    input.setAttribute('aria-invalid', 'true');
    const d = new Set((input.getAttribute('aria-describedby') || '').split(' ').filter(Boolean)); d.add(id);
    input.setAttribute('aria-describedby', [...d].join(' '));
    wrap.classList.add('bad');
  } else {
    err?.remove();
    input.removeAttribute('aria-invalid');
    const d = (input.getAttribute('aria-describedby') || '').split(' ').filter((x) => x && x !== id);
    if (d.length) input.setAttribute('aria-describedby', d.join(' ')); else input.removeAttribute('aria-describedby');
    wrap.classList.remove('bad');
  }
}

/* ---------- boot ---------- */
export function boot({ ns, dict }) {
  NS = ns; DICT = dict;
  const s = store(ns);
  const q = new URL(location.href).searchParams.get('lang');
  const initial = q === 'ar' || q === 'en' ? q : (s.get('lang', null) || (document.documentElement.lang === 'ar' ? 'ar' : 'en'));
  const theme = s.get('theme', null) || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  setLang(initial, { push: false });
  setTheme(theme);
  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-act]');
    if (!b) return;
    if (b.dataset.act === 'lang') setLang(LANG === 'ar' ? 'en' : 'ar');
    if (b.dataset.act === 'theme') setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark');
  });
  // close <dialog> on backdrop click
  document.addEventListener('click', (e) => {
    if (e.target instanceof HTMLDialogElement && e.target.open) {
      const r = e.target.getBoundingClientRect();
      if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) e.target.close();
    }
  });
  document.documentElement.classList.add('js');
}
