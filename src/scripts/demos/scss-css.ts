/* SCSS → CSS before/after. The CSS was compiled with Dart Sass (1.101) from the SCSS shown, not hand-written. */
import { highlight } from '../highlight';

const EXAMPLES = [
  {
    "title": "Tokens → custom properties",
    "scss": "$space: (1: 0.25rem, 2: 0.5rem, 3: 0.75rem, 4: 1rem, 6: 1.5rem);\n$radius: (sm: 6px, md: 10px, lg: 16px);\n\n:root {\n  @each $key, $value in $space {\n    --space-#{$key}: #{$value};\n  }\n  @each $key, $value in $radius {\n    --radius-#{$key}: #{$value};\n  }\n}",
    "css": ":root {\n  --space-1: 0.25rem;\n  --space-2: 0.5rem;\n  --space-3: 0.75rem;\n  --space-4: 1rem;\n  --space-6: 1.5rem;\n  --radius-sm: 6px;\n  --radius-md: 10px;\n  --radius-lg: 16px;\n}",
    "why": "A Sass loop turns one token map into custom properties. The map exists only at build time; the variables exist at runtime, so themes can override them."
  },
  {
    "title": "BEM + @layer + :has()",
    "scss": "@layer reset, base, components, utilities;\n\n@layer components {\n  .card {\n    padding: var(--space-4);\n    border-radius: var(--radius-lg);\n\n    &__title {\n      margin-block-end: var(--space-2);\n    }\n\n    &--featured {\n      border: 2px solid var(--color-accent);\n    }\n\n    &:has(> img:first-child) {\n      padding-block-start: 0;\n    }\n  }\n}",
    "css": "@layer reset, base, components, utilities;\n@layer components {\n  .card {\n    padding: var(--space-4);\n    border-radius: var(--radius-lg);\n  }\n  .card__title {\n    margin-block-end: var(--space-2);\n  }\n  .card--featured {\n    border: 2px solid var(--color-accent);\n  }\n  .card:has(> img:first-child) {\n    padding-block-start: 0;\n  }\n}",
    "why": "BEM suffixes (&__title) are still a Sass feature: native CSS nesting cannot glue selectors together. @layer and :has() pass straight through."
  },
  {
    "title": "Mixin + logical properties",
    "scss": "@mixin focus-ring($offset: 2px) {\n  &:focus-visible {\n    outline: 2px solid var(--color-focus);\n    outline-offset: $offset;\n  }\n}\n\n.btn {\n  padding-block: var(--space-2);\n  padding-inline: var(--space-4);\n  margin-inline-start: auto;\n\n  @include focus-ring;\n\n  @media (prefers-reduced-motion: no-preference) {\n    transition: background-color 150ms ease;\n  }\n}",
    "css": ".btn {\n  padding-block: var(--space-2);\n  padding-inline: var(--space-4);\n  margin-inline-start: auto;\n}\n.btn:focus-visible {\n  outline: 2px solid var(--color-focus);\n  outline-offset: 2px;\n}\n@media (prefers-reduced-motion: no-preference) {\n  .btn {\n    transition: background-color 150ms ease;\n  }\n}",
    "why": "Mixins with parameters are still the best reason to keep Sass. The media query bubbles out on its own, and every property is logical, so RTL needs no extra code."
  },
  {
    "title": "Container query + color-mix()",
    "scss": "@use 'sass:map';\n\n$cq: (sm: 30rem, md: 40rem);\n\n@mixin cq($name) {\n  @container (inline-size > #{map.get($cq, $name)}) {\n    @content;\n  }\n}\n\n.product {\n  container-type: inline-size;\n}\n\n.product__body {\n  display: grid;\n  gap: var(--space-3);\n\n  @include cq(md) {\n    grid-template-columns: 12rem 1fr;\n  }\n}\n\n.product__badge {\n  background: color-mix(in oklch, var(--color-accent) 18%, transparent);\n}",
    "css": ".product {\n  container-type: inline-size;\n}\n\n.product__body {\n  display: grid;\n  gap: var(--space-3);\n}\n@container (inline-size > 40rem) {\n  .product__body {\n    grid-template-columns: 12rem 1fr;\n  }\n}\n\n.product__badge {\n  background: color-mix(in oklch, var(--color-accent) 18%, transparent);\n}",
    "why": "A tiny mixin gives container queries named sizes. color-mix() is native CSS, so Sass just passes it through. No darken() or lighten()."
  }
];

/** Accessible tabs (WAI-ARIA APG "Tabs, automatic activation"): ←/→ (mirrored in RTL), Home, End. */
export function mount(el: HTMLElement) {
  const id = el.id || 'scss-demo';
  el.innerHTML = `
    <span class="d-kicker">Live demo</span>
    <p class="d-title">SCSS in, CSS out</p>
    <div class="sc-tabs" role="tablist" aria-label="SCSS examples">
      ${EXAMPLES.map((x, i) => `<button role="tab" id="${id}-t${i}" aria-controls="${id}-p" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}">${x.title}</button>`).join('')}
    </div>
    <div id="${id}-p" role="tabpanel" tabindex="0">
      <div class="sc-panes">
        <div class="sc-pane"><h4>You write (SCSS)</h4><pre><code class="sc-in"></code></pre></div>
        <div class="sc-pane"><h4>Browser gets (CSS)</h4><pre><code class="sc-out"></code></pre></div>
      </div>
      <p class="sc-why"></p>
    </div>
    <p class="d-note">Use ← and → to switch examples. The CSS is real Dart Sass output.</p>`;
  const tabs = [...el.querySelectorAll<HTMLButtonElement>('[role=tab]')];
  const panel = el.querySelector<HTMLElement>('[role=tabpanel]')!;
  const show = (i: number, focus = false) => {
    tabs.forEach((t, k) => { t.setAttribute('aria-selected', String(k === i)); t.tabIndex = k === i ? 0 : -1; });
    panel.setAttribute('aria-labelledby', tabs[i].id);
    el.querySelector('.sc-in')!.innerHTML = highlight(EXAMPLES[i].scss, 'scss');
    el.querySelector('.sc-out')!.innerHTML = highlight(EXAMPLES[i].css, 'css');
    el.querySelector('.sc-why')!.textContent = EXAMPLES[i].why;
    if (focus) tabs[i].focus();
  };
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => show(i));
    t.addEventListener('keydown', e => {
      const rtl = getComputedStyle(el).direction === 'rtl';
      const next = rtl ? 'ArrowLeft' : 'ArrowRight', prev = rtl ? 'ArrowRight' : 'ArrowLeft';
      let k = -1;
      if (e.key === next) k = (i + 1) % tabs.length;
      else if (e.key === prev) k = (i - 1 + tabs.length) % tabs.length;
      else if (e.key === 'Home') k = 0;
      else if (e.key === 'End') k = tabs.length - 1;
      if (k >= 0) { e.preventDefault(); show(k, true); }
    });
  });
  show(0);
}
