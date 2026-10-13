// WCAG AA contrast check for every theme × accent palette, using the real cascade in a browser.
// Resolves the design tokens on the built page, then checks text/background and accent/background pairs.
//   node tools/contrast.mjs [baseUrl]     (needs playwright-core; set PW=<path to playwright-core> if it is not installed here)
// Exit code 1 if any pair is below 4.5:1.
const pwPath = process.env.PW;
const { chromium } = await import(pwPath ? 'file:///' + pwPath.split('\\').join('/') + '/index.mjs' : 'playwright-core');
const base = process.argv[2] || 'http://localhost:4610';
const THEMES = [
  { name: 'Light', attrs: { 'data-theme': 'light' } },
  { name: 'Dark', attrs: { 'data-theme': 'dark' } },
  { name: 'System (dark OS)', attrs: {}, scheme: 'dark' },
  { name: 'Midnight Aurora', attrs: { 'data-theme': 'dark', 'data-skin': 'aurora' } },
  { name: 'Sakura', attrs: { 'data-theme': 'light', 'data-skin': 'sakura' } },
  { name: 'Mint Mochi', attrs: { 'data-theme': 'light', 'data-skin': 'mochi' } },
];
const ACCENTS = [null, 'lilac', 'rose', 'ocean', 'mint', 'amber'];
const TEXT = ['ink', 'ink-2', 'ink-3', 'accent', 'ok', 'warn'];
const BGS = ['bg', 'bg-2', 'surface', 'surface-2', 'soft', 'soft-2'];
const lum = ([r, g, b]) => { const f = v => { v /= 255; return v <= .03928 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4; }; return .2126 * f(r) + .7152 * f(g) + .0722 * f(b); };
const ratio = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + .05) / (Math.min(x, y) + .05); };
const b = await chromium.launch();
let fails = 0; const rows = [];
for (const th of THEMES) {
  const ctx = await b.newContext({ colorScheme: th.scheme || 'light', reducedMotion: 'reduce' });
  const p = await ctx.newPage(); await p.goto(base + '/', { waitUntil: 'domcontentloaded' });
  for (const acc of ACCENTS) {
    const toks = await p.evaluate(({ attrs, acc, names }) => {
      const r = document.documentElement;
      for (const a of ['data-theme', 'data-skin', 'data-accent', 'data-contrast']) r.removeAttribute(a);
      for (const [k, v] of Object.entries(attrs)) r.setAttribute(k, v);
      if (acc) r.setAttribute('data-accent', acc);
      const probe = document.createElement('i'); document.body.appendChild(probe); const out = {};
      for (const n of names) { probe.style.color = `var(--${n})`; const m = getComputedStyle(probe).color.match(/[\d.]+/g).map(Number); out[n] = m.slice(0, 3); }
      probe.remove(); return out;
    }, { attrs: th.attrs, acc, names: [...new Set([...TEXT, ...BGS, 'accent-ink', 'accent-3'])] });
    const pairs = [];
    for (const fg of TEXT) for (const bg of BGS) pairs.push([fg, bg, ratio(toks[fg], toks[bg])]);
    pairs.push(['accent-ink', 'accent', ratio(toks['accent-ink'], toks.accent)], ['accent-ink', 'accent-3', ratio(toks['accent-ink'], toks['accent-3'])]);
    const bad = pairs.filter(x => x[2] < 4.5); fails += bad.length;
    const min = pairs.reduce((m, x) => (x[2] < m[2] ? x : m));
    rows.push({ theme: th.name, accent: acc || '(theme default)', pairs: pairs.length, min: `${min[0]}/${min[1]} ${min[2].toFixed(2)}`, fails: bad.map(x => `${x[0]}/${x[1]} ${x[2].toFixed(2)}`).join(', ') || 'PASS' });
  }
  await ctx.close();
}
await b.close();
console.table(rows);
console.log(fails ? `\n${fails} pair(s) below 4.5:1` : '\nAll themes pass WCAG AA (4.5:1) for every checked pair.');
process.exit(fails ? 1 : 0);
