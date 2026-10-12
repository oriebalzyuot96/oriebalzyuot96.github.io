/* Theme playground: light / dark / system + a brand seed colour → a full, contrast-checked palette.
   Mode switches use the View Transitions API with a circle reveal from the click point
   (instant when the API is missing or the reader prefers reduced motion). The choice is
   persisted in this demo's own localStorage key only. */
type Mode = 'light' | 'dark' | 'system';
interface State { mode: Mode; seed: string; safe: boolean }
const KEY = 'blog-demo:theme-playground';
const SEEDS = [
  { hex: '#6d4aff', name: 'Violet' }, { hex: '#12a3a3', name: 'Teal' }, { hex: '#e4572e', name: 'Coral' },
  { hex: '#e0a100', name: 'Gold' }, { hex: '#0a84ff', name: 'Sky' }, { hex: '#6b8e23', name: 'Olive' },
];

/* ---------- colour maths (WCAG 2.x relative luminance) ---------- */
type RGB = [number, number, number];
const hexToRgb = (h: string): RGB => { const n = parseInt(h.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; };
const rgbToHex = (c: RGB) => '#' + c.map(v => Math.round(Math.min(255, Math.max(0, v))).toString(16).padStart(2, '0')).join('');
const lin = (v: number) => { v /= 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
const lum = (h: string) => { const [r, g, b] = hexToRgb(h); return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b); };
export const contrast = (a: string, b: string) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
const mix = (a: string, b: string, t: number) => { const p = hexToRgb(a), q = hexToRgb(b); return rgbToHex([0, 1, 2].map(i => p[i] + (q[i] - p[i]) * t) as RGB); };
function toHsl(h: string): RGB {
  const [r, g, b] = hexToRgb(h).map(v => v / 255); const max = Math.max(r, g, b), min = Math.min(r, g, b); const l = (max + min) / 2;
  if (max === min) return [0, 0, l];
  const d = max - min; const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  const hh = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
  return [hh * 60, s, l];
}
function fromHsl([h, s, l]: RGB): string {
  const k = (n: number) => (n + h / 30) % 12; const a = s * Math.min(l, 1 - l);
  const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return rgbToHex([f(0) * 255, f(8) * 255, f(4) * 255]);
}
/** Walk HSL lightness 1% at a time (hue and saturation kept) until every check passes. */
function shiftToContrast(hex: string, ok: (c: string) => boolean, dir: -1 | 1): string {
  const [h, s, l] = toHsl(hex);
  for (let i = 0; i <= 100; i++) { const c = fromHsl([h, s, Math.min(1, Math.max(0, l + dir * i / 100))]); if (ok(c)) return c; }
  return dir < 0 ? '#000000' : '#ffffff';
}

export function derive(seed: string, dark: boolean, safe: boolean) {
  const page = dark ? mix('#0e0d16', seed, 0.07) : mix('#ffffff', seed, 0.05);
  const card = dark ? mix(page, '#ffffff', 0.05) : '#ffffff';
  const text = dark ? '#eeebf7' : mix('#16131f', seed, 0.12);
  const muted = dark ? mix(text, page, 0.3) : mix(text, '#ffffff', 0.32);
  const line = dark ? mix(page, '#ffffff', 0.14) : mix(page, seed, 0.14);
  let primary = seed;
  if (safe) primary = dark
    ? shiftToContrast(seed, c => contrast(c, card) >= 4.5 && contrast(c, page) >= 4.5, 1)
    : shiftToContrast(seed, c => contrast(c, card) >= 4.5 && contrast(c, page) >= 4.5 && contrast('#ffffff', c) >= 4.5, -1);
  const on = dark ? mix(page, '#000000', 0.45) : '#ffffff';
  const soft = mix(card, primary, dark ? 0.18 : 0.1);
  return { page, card, text, muted, line, primary, on, soft, ratio: contrast(primary, card), onRatio: contrast(on, primary) };
}

function load(): State {
  try { const s = JSON.parse(localStorage.getItem(KEY) || 'null'); if (s && /^#[0-9a-f]{6}$/i.test(s.seed)) return s; } catch { /* storage blocked */ }
  return { mode: 'system', seed: SEEDS[0].hex, safe: true };
}
const save = (s: State) => { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch { /* ignore */ } };

export function mount(el: HTMLElement) {
  const id = el.id || 'tp';
  let st = load();
  const mq = matchMedia('(prefers-color-scheme: dark)');
  el.innerHTML = `
    <span class="d-kicker">Live demo</span>
    <p class="d-title">Theme playground</p>
    <div class="tp-grid">
      <div>
        <fieldset><legend>Mode</legend>
          <div class="seg">${(['light', 'dark', 'system'] as Mode[]).map(m => `<label><input type="radio" name="${id}-mode" value="${m}"><span>${m[0].toUpperCase() + m.slice(1)}</span></label>`).join('')}</div>
        </fieldset>
        <fieldset style="margin-top:14px"><legend>Brand seed colour</legend>
          <div class="tp-sw">${SEEDS.map(s => `<button type="button" data-seed="${s.hex}" style="background:${s.hex}" aria-label="${s.name}" aria-pressed="false"></button>`).join('')}
            <input type="color" aria-label="Custom seed colour" value="${st.seed}">
          </div>
        </fieldset>
        <div class="d-row"><label class="d-check"><input type="checkbox" class="tp-safe"> Contrast-safe accent (≥ 4.5:1)</label></div>
        <div class="d-row"><span>Accent on card:</span> <span class="tp-ratio" aria-live="polite"></span></div>
        <pre><code class="tp-code"></code></pre>
      </div>
      <div class="tp-app" data-theme="light">
        <div class="tp-bar"><span class="tp-logo">◆ Acme</span><span class="tp-nav"><span>Home</span><span>Docs</span><span>Pricing</span></span></div>
        <div class="tp-body">
          <div class="tp-card"><span class="tp-badge">New</span><h5>Your weekly report</h5><p>Three projects moved forward. <a href="#${id}">Open the summary</a> or share it with the team.</p>
            <div class="tp-btns"><button class="tp-b1" type="button">Share report</button><button class="tp-b2" type="button">Later</button></div></div>
          <div class="tp-card"><h5>Seed → palette</h5><p class="tp-sem"></p></div>
        </div>
      </div>
    </div>
    <p class="d-note">Mode changes use a View Transition circle reveal from where you clicked. Your choice is saved in this page's localStorage.</p>`;
  const app = el.querySelector<HTMLElement>('.tp-app')!;
  const radios = [...el.querySelectorAll<HTMLInputElement>(`input[name="${id}-mode"]`)];
  const swatches = [...el.querySelectorAll<HTMLButtonElement>('[data-seed]')];
  const picker = el.querySelector<HTMLInputElement>('input[type=color]')!;
  const safe = el.querySelector<HTMLInputElement>('.tp-safe')!;
  const ratio = el.querySelector<HTMLElement>('.tp-ratio')!;
  const code = el.querySelector<HTMLElement>('.tp-code')!;

  const render = () => {
    const dark = st.mode === 'dark' || (st.mode === 'system' && mq.matches);
    const p = derive(st.seed, dark, st.safe);
    app.dataset.theme = dark ? 'dark' : 'light';
    const vars: Record<string, string> = { page: p.page, card: p.card, text: p.text, muted: p.muted, line: p.line, primary: p.primary, on: p.on, soft: p.soft };
    for (const [k, v] of Object.entries(vars)) app.style.setProperty('--tp-' + k, v);
    radios.forEach(r => (r.checked = r.value === st.mode));
    swatches.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.seed === st.seed)));
    picker.value = st.seed; safe.checked = st.safe;
    const pass = p.ratio >= 4.5;
    ratio.className = 'tp-ratio ' + (pass ? 'ok' : 'bad');
    ratio.textContent = `${p.ratio.toFixed(2)}:1 ${pass ? '✓ passes AA text' : '✗ fails AA text'}`;
    el.querySelector('.tp-sem')!.textContent = `Seed ${st.seed} became ${p.primary} in ${dark ? 'dark' : 'light'} mode.`;
    code.textContent = `[data-theme="${dark ? 'dark' : 'light'}"] {\n  --color-bg: ${p.page};\n  --color-surface: ${p.card};\n  --color-text: ${p.text};\n  --color-accent: ${p.primary}; /* ${p.ratio.toFixed(2)}:1 */\n  --color-on-accent: ${p.on};\n}`;
    delete code.dataset.hl;
    code.className = 'language-css';
    import('../highlight').then(m => { code.innerHTML = m.highlight(code.textContent || '', 'css'); });
  };

  /** Circle reveal: animate the new snapshot's clip-path from the pointer (or the control) outward. */
  const withTransition = (update: () => void, from?: { x: number; y: number }) => {
    const doc = document as Document & { startViewTransition?: (cb: () => void) => { ready: Promise<void> } };
    if (!doc.startViewTransition || matchMedia('(prefers-reduced-motion: reduce)').matches) { update(); return; }
    const r = app.getBoundingClientRect();
    const x = from?.x ?? r.left + r.width / 2, y = from?.y ?? r.top + r.height / 2;
    const end = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    document.documentElement.classList.add('blog-vt');
    const t = doc.startViewTransition(update);
    t.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${end}px at ${x}px ${y}px)`] },
        { duration: 650, easing: 'cubic-bezier(.65,0,.2,1)', pseudoElement: '::view-transition-new(root)' },
      ).finished.finally(() => document.documentElement.classList.remove('blog-vt'));
    }).catch(() => document.documentElement.classList.remove('blog-vt'));
  };

  let lastPointer: { x: number; y: number } | undefined;
  el.addEventListener('pointerdown', e => { lastPointer = { x: e.clientX, y: e.clientY }; });
  el.addEventListener('keydown', () => { lastPointer = undefined; });
  const set = (patch: Partial<State>, animate = false) => {
    st = { ...st, ...patch }; save(st);
    if (animate) withTransition(render, lastPointer); else render();
  };
  radios.forEach(r => r.addEventListener('change', () => set({ mode: r.value as Mode }, true)));
  swatches.forEach(b => b.addEventListener('click', () => set({ seed: b.dataset.seed! })));
  picker.addEventListener('input', () => set({ seed: picker.value }));
  safe.addEventListener('change', () => set({ safe: safe.checked }));
  mq.addEventListener('change', () => { if (st.mode === 'system') withTransition(render); });
  render();
}
