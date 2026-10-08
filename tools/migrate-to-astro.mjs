// One-off migration: index.html (runtime-i18n) → Astro components with build-time i18n.
// Every data-i18n element's inner HTML becomes <Fragment set:html={t('key')} />, and data-i18n-attr
// attributes become {t('key')} expressions. English comes from the existing markup; Arabic from i18n.ar.js.
import fs from 'node:fs';
import { parse } from 'node-html-parser';

const ROOT = new URL('../', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1');
const html = fs.readFileSync(ROOT + 'index.html', 'utf8');
global.window = {}; eval(fs.readFileSync(ROOT + 'i18n.ar.js', 'utf8'));
const AR = window.I18N_AR;
const doc = parse(html, { comment: true });
const body = doc.querySelector('body');

const EN = {};
// footer tagline removed at the owner's request
body.querySelectorAll('[data-i18n="ft.b"]').forEach(el => el.remove());
for (const el of body.querySelectorAll('[data-i18n]')) {
  const k = el.getAttribute('data-i18n');
  if (!(k in EN)) EN[k] = el.innerHTML.trim();
  el.set_content(`__T__${k}__`);
  el.removeAttribute('data-i18n');
}
for (const el of body.querySelectorAll('[data-i18n-attr]')) {
  for (const pair of el.getAttribute('data-i18n-attr').split(';')) {
    const [attr, k] = pair.split(':');
    if (!(k in EN)) EN[k] = el.getAttribute(attr);
    el.setAttribute(attr, `__A__${k}__`);
  }
  el.removeAttribute('data-i18n-attr');
}
// runtime-only strings (toasts, palette) also need English values
Object.assign(EN, { 'hero.words': 'trust|understand|enjoy', 'cmd.empty': 'No results', 'toast.copied': 'Copied ✓', 'toast.reset': 'Settings reset', 'toast.soundOn': 'Sound on 🔊', 'toast.soundOff': 'Sound off 🔇', 'close': EN.close || 'Close' });

const toAstro = s => s
  .replace(/\{/g, "{'{'}").replace(/(?<!\{'\{')\}(?!')/g, "{'}'}")   // escape literal braces in text
  .replace(/__T__([\w.]+)__/g, (_, k) => `<Fragment set:html={t('${k}')} />`)
  .replace(/="__A__([\w.]+)__"/g, (_, k) => `={t('${k}')}`);

// split body into sections by the existing ─── comment markers
const parts = {};
const order = [];
let cur = 'Chrome', buf = [];
const flush = () => { parts[cur] = (parts[cur] || '') + buf.join(''); if (!order.includes(cur)) order.push(cur); buf = []; };
const nodes = [];
for (const node of body.childNodes) {
  if (node.tagName === 'MAIN') { nodes.push({ mark: 'MAIN_START' }); nodes.push(...node.childNodes); nodes.push({ mark: 'MAIN_END' }); }
  else nodes.push(node);
}
for (const node of nodes) {
  if (node.mark === 'MAIN_START') { flush(); cur = 'Hero'; continue; }
  if (node.mark === 'MAIN_END') { flush(); cur = 'Overlays'; continue; }
  const txt = node.toString();
  const m = node.nodeType === 8 && txt.match(/<!--\s*─+\s*([\w &]+?)\s*─+\s*-->/);
  if (m) { parts[cur] = (parts[cur] || '') + buf.join(''); if (!order.includes(cur)) order.push(cur); cur = m[1].trim(); buf = []; continue; }
  if (node.tagName === 'SCRIPT') continue;
  buf.push(txt);
}
parts[cur] = (parts[cur] || '') + buf.join(''); if (!order.includes(cur)) order.push(cur);

const name = s => s.replace(/(^|[\s&]+)(\w)/g, (_, __, c) => c.toUpperCase()).replace(/\W/g, '');
fs.mkdirSync(ROOT + 'src/components/sections', { recursive: true });
const made = [];
for (const k of order) {
  const n = name(k) || 'Chrome';
  const src = toAstro(parts[k]).trim();
  if (!src) continue;
  fs.writeFileSync(ROOT + `src/components/sections/${n}.astro`,
    `---\nimport { useT } from '../../i18n';\nconst t = useT(Astro.currentLocale);\n---\n${src}\n`);
  made.push(n);
}
fs.mkdirSync(ROOT + 'src/i18n', { recursive: true });
fs.writeFileSync(ROOT + 'src/i18n/en.json', JSON.stringify(EN, null, 1));
fs.writeFileSync(ROOT + 'src/i18n/ar.json', JSON.stringify(AR, null, 1));
const missing = Object.keys(EN).filter(k => !(k in AR));
console.log('sections:', made.join(', '));
console.log('keys:', Object.keys(EN).length, 'missing AR:', missing);
