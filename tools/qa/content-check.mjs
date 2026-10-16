// Compare the content inventory of two Astro builds. Fails (exit 1) if anything in OLD is missing from NEW.
// usage: node tools/qa/content-check.mjs <oldDist> <newDist>   (build main into one folder, this branch into another)
import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
const require = createRequire(new URL('../../package.json', import.meta.url));
const { parse } = require('node-html-parser');
const [oldDir, newDir] = process.argv.slice(2);

function htmlFiles(dir) {
  const out = [];
  (function walk(d) {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const f = path.join(d, e.name);
      if (e.isDirectory()) { if (!['samples', 'assets', '_astro'].includes(e.name)) walk(f); }
      else if (e.name.endsWith('.html')) out.push(f);
    }
  })(dir);
  return out;
}
const norm = s => s.replace(/\s+/g, ' ').trim();
function inventory(dir) {
  const inv = { en: {}, ar: {} };
  const add = (lang, cat, v) => { if (!v) return; (inv[lang][cat] ||= new Set()).add(v); };
  for (const f of htmlFiles(dir)) {
    const rel = path.relative(dir, f).replace(/\\/g, '/');
    const lang = rel.startsWith('ar/') ? 'ar' : 'en';
    const doc = parse(fs.readFileSync(f, 'utf8'));
    add(lang, 'pages', '/' + rel.replace(/index\.html$/, ''));
    for (const a of doc.querySelectorAll('article.proj')) {
      const id = a.getAttribute('id'); if (!id || !id.startsWith('p-')) continue;
      add(lang, 'projects', id);
      if (a.querySelector('.case')) add(lang, 'caseOverlays', id);
      // every text fact of the card: title, paragraph, highlights, org line, float, alt name, case text
      for (const el of a.querySelectorAll('h3, .p-body p, .p-detail p, ul.hl li, .alt-name, .case p, .case li, .float, .illus-note, .pill, .co-tag')) add(lang, 'projectText', id + ' :: ' + norm(el.textContent));
      for (const t of a.querySelectorAll('.tag')) add(lang, 'projectTags', id + ' :: ' + norm(t.textContent));
    }
    for (const a of doc.querySelectorAll('a[href]')) {
      const h = a.getAttribute('href').split('#')[0];
      if (!h) continue;
      add(lang, 'links', h);
      if (/^\/blog\/[^/]+\/$/.test(h)) add(lang, 'articles', h);
    }
    for (const i of doc.querySelectorAll('img[src]')) add(lang, 'images', i.getAttribute('src'));
    for (const s of doc.querySelectorAll('source[srcset]')) add(lang, 'images', s.getAttribute('srcset'));
    for (const fg of doc.querySelectorAll('[data-full]')) add(lang, 'images', fg.getAttribute('data-full'));
    for (const v of doc.querySelectorAll('video')) {
      if (v.getAttribute('poster')) add(lang, 'videos', 'poster ' + v.getAttribute('poster'));
      for (const s of v.querySelectorAll('source')) add(lang, 'videos', s.getAttribute('src'));
      for (const s of v.querySelectorAll('track')) add(lang, 'videos', 'track ' + s.getAttribute('src'));
    }
    for (const ul of doc.querySelectorAll('[data-skills]')) for (const s of ul.getAttribute('data-skills').split(',')) add(lang, 'skills', s);
    for (const w of doc.querySelectorAll('.job .when > span:first-child')) add(lang, 'careerDates', norm(w.textContent));
    for (const li of doc.querySelectorAll('.job li')) add(lang, 'careerBullets', norm(li.textContent));
    for (const e of doc.querySelectorAll('.edu b, .edu span')) add(lang, 'education', norm(e.textContent));
    for (const e of doc.querySelectorAll('.issue')) add(lang, 'openSource', e.getAttribute('href'));
    for (const e of doc.querySelectorAll('.pg')) add(lang, 'playgrounds', e.getAttribute('href'));
    for (const e of doc.querySelectorAll('.svc h3')) add(lang, 'services', norm(e.textContent));
    for (const e of doc.querySelectorAll('.c-card small, .c-card span')) add(lang, 'contact', norm(e.textContent));
    for (const e of doc.querySelectorAll('.arch li, .arch .url')) add(lang, 'archive', norm(e.textContent));
    for (const e of doc.querySelectorAll('.info .item b, .info .item .sub, .principle h4, .principle p')) add(lang, 'aboutFacts', norm(e.textContent));
    for (const e of doc.querySelectorAll('.logos .track > span:not([aria-hidden])')) add(lang, 'logos', norm(e.textContent));
    for (const e of doc.querySelectorAll('.wr h3')) add(lang, 'articleTitles', norm(e.textContent));
    for (const e of doc.querySelectorAll('.faq summary')) add(lang, 'faq', norm(e.textContent));
  }
  return inv;
}
const A = inventory(oldDir), B = inventory(newDir);
let fail = 0;
const ignorePages = new Set();
for (const lang of ['en', 'ar']) {
  console.log(`\n== ${lang.toUpperCase()} ==`);
  for (const cat of Object.keys(A[lang]).sort()) {
    const a = A[lang][cat], b = B[lang][cat] || new Set();
    const missing = [...a].filter(x => !b.has(x) && !ignorePages.has(x));
    console.log(`${missing.length ? 'FAIL' : 'ok  '} ${cat.padEnd(14)} old=${a.size} new=${b.size} missing=${missing.length}`);
    if (missing.length) { fail++; missing.slice(0, 40).forEach(m => console.log('     - ' + m)); }
  }
}
console.log(fail ? `\nRESULT: FAIL (${fail} categories with missing items)` : '\nRESULT: PASS (nothing from the old build is missing)');
process.exit(fail ? 1 : 0);
