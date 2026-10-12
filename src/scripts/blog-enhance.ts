/* Progressive enhancement for blog posts. The static HTML is what Medium imports
   (plain <pre><code>, GIFs, links). In the browser we add:
   1. a tiny syntax highlighter for code blocks,
   2. GIF → muted looping <video> swap (smaller, sharper, respects reduced motion),
   3. live demos mounted into <div data-demo="…"> placeholders. */
import './demos/demos.css';

import { highlight } from './highlight';

function highlightAll(root: ParentNode = document) {
  root.querySelectorAll<HTMLElement>('pre > code[class*="language-"]').forEach(el => {
    if (el.dataset.hl) return;
    const lang = (el.className.match(/language-(\w+)/) || [])[1] || '';
    el.innerHTML = highlight(el.textContent || '', lang);
    el.dataset.hl = '1';
  });
}

function swapGifs() {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll<HTMLImageElement>('article img[data-video]').forEach(img => {
    const base = img.dataset.video!;
    const v = document.createElement('video');
    v.muted = true; v.loop = true; v.playsInline = true; v.preload = 'metadata';
    v.setAttribute('aria-label', img.alt);
    if (img.width) v.width = img.width;
    if (img.height) v.height = img.height;
    if (img.dataset.poster) v.poster = img.dataset.poster;
    if (reduce) v.controls = true; else { v.autoplay = true; v.setAttribute('autoplay', ''); }
    v.innerHTML = `<source src="${base}.webm" type="video/webm"><source src="${base}.mp4" type="video/mp4">`;
    v.addEventListener('error', () => v.replaceWith(img), true);
    img.replaceWith(v);
  });
}

const DEMOS: Record<string, () => Promise<{ mount: (el: HTMLElement) => void }>> = {
  'scss-css': () => import('./demos/scss-css'),
  'theme-playground': () => import('./demos/theme-playground'),
  'custom-select': () => import('./demos/custom-select'),
  'a11y-modes': () => import('./demos/a11y-modes'),
  'xss-storage': () => import('./demos/xss-storage'),
  'mfe-playground': () => import('./demos/mfe-playground'),
};

function mountDemos() {
  document.querySelectorAll<HTMLElement>('[data-demo]').forEach(async el => {
    const load = DEMOS[el.dataset.demo!];
    if (!load) return;
    try {
      const mod = await load();
      mod.mount(el);
      el.classList.add('demo', 'is-live');
      highlightAll(el);
      // On the site the demo is right here, so the Medium-only "Try it live" line is noise.
      if (el.id) document.querySelectorAll<HTMLElement>(`.try-live a[href$="#${el.id}"]`).forEach(a => a.closest<HTMLElement>('.try-live')!.hidden = true);
    } catch (err) {
      console.warn('demo failed', el.dataset.demo, err);
    }
  });
}

export function enhance() {
  highlightAll();
  swapGifs();
  mountDemos();
}
