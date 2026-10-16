/* Every project shown on /work (and the featured six on the home page).
   Copy lives in src/i18n/{en,ar}.json under the project's `key` prefix:
   `${key}.t` title · `${key}.s` one-line summary · `${key}.p` full description · `${key}.h1…hN` highlights
   · `${key}.c / a1-a3 / r` case study (company projects) · `${key}.alt` screenshot alt · `${key}.org` org line (own work).
   Developer tools and video apps come from ./tools.ts. */

export type Part = 'company' | 'lib' | 'app' | 'theme';
type Href = string | { en: string; ar: string };
export interface Action { kind: 'case' | 'link' | 'shots'; href?: Href; label?: string; raw?: string; primary?: boolean }
export interface Media {
  kind: 'img' | 'mock';
  bar: string;
  src?: string; w?: number; h?: number;
  /** literal alt text (company screenshots) or an i18n key */
  alt?: string; altKey?: string; pos?: string;
  html?: string;
}
export interface Project {
  id: string; key: string; part: Part; c: string;
  featured?: boolean;
  /** company projects: organisation text; own work uses `${key}.org` */
  company?: { org: string; fe?: boolean };
  pill: [cls: 'live' | 'gated' | 'soon', key: string];
  altName?: string;
  hl: number;
  float?: [emoji: string, key: string];
  tags: string[];
  media: Media;
  hasCase?: boolean;
  actions: Action[];
}

const MOCK_WASL = `<div class="row"><div class="box"><b>Financing request</b><div class="ln a w80"></div><div class="ln w60"></div><div class="bar-p"><i style="width:72%"></i></div></div><div class="box"><b>Offers received</b><span class="num">4</span><div class="ln w40"></div></div></div>
<div class="offer best"><span class="row" style="align-items:center"><span class="bank" style="background:linear-gradient(135deg,#6d4aff,#b9a7ff)"></span><b>Lender A · 3.9% APR</b></span><span class="chip-s">Best match</span></div>
<div class="offer"><span class="row" style="align-items:center"><span class="bank" style="background:linear-gradient(135deg,#0c7c5f,#a8ecd6)"></span><b>Lender B · 4.2% APR</b></span><span class="chip-s">Compare</span></div>
<div class="offer"><span class="row" style="align-items:center"><span class="bank" style="background:linear-gradient(135deg,#cf6a10,#ffd58a)"></span><b>Lender C · 4.5% APR</b></span><span class="chip-s">Compare</span></div>`;
const MOCK_MIRAFH = `<div class="row"><div class="box"><b>Requests</b><span class="num">1,284</span><div class="bar-p"><i style="width:64%"></i></div></div><div class="box"><b>In review</b><span class="num">312</span><div class="bar-p"><i style="width:28%"></i></div></div><div class="box"><b>Closed</b><span class="num">972</span><div class="bar-p"><i style="width:82%"></i></div></div></div>
<div class="row"><div class="box"><div class="ln a w60"></div><div class="ln w80"></div><div class="ln w40"></div><div class="ln w80"></div></div><div class="box"><div class="ln a w40"></div><div class="ln w60"></div><div class="ln w80"></div><div class="ln w60"></div></div></div>`;
const MOCK_HR = `<div class="row"><div class="box"><b>Payroll run · Oct</b><span class="num">JOD 248,900</span><div class="bar-p"><i style="width:90%"></i></div></div><div class="box"><b>Review cycle</b><span class="num">86%</span><div class="bar-p"><i style="width:86%"></i></div></div></div>
<div class="row"><div class="box"><div class="row" style="justify-content:space-between"><b>Employees</b><span class="chip-s">412</span></div><div class="ln a w80"></div><div class="ln w60"></div><div class="ln w80"></div><div class="ln w40"></div></div><div class="box"><div class="row" style="justify-content:space-between"><b>Goals</b><span class="chip-s">Q4</span></div><div class="ln w60"></div><div class="ln a w40"></div><div class="ln w80"></div></div></div>`;
const MOCK_LMS = `<div class="row">
<div class="course"><div class="th" style="background:linear-gradient(135deg,#6d4aff,#ffb8d6)"></div><div><b>Onboarding 101</b><div class="bar-p"><i style="width:100%"></i></div></div></div>
<div class="course"><div class="th" style="background:linear-gradient(135deg,#0c7c5f,#bfe0ff)"></div><div><b>Security basics</b><div class="bar-p"><i style="width:60%"></i></div></div></div>
<div class="course"><div class="th" style="background:linear-gradient(135deg,#cf6a10,#ffe6a3)"></div><div><b>Leadership</b><div class="bar-p"><i style="width:25%"></i></div></div></div>
</div>
<div class="row"><div class="box"><b>My learning</b><div class="ln a w80"></div><div class="ln w60"></div></div><div class="box"><b>Certificates</b><span class="num">3</span></div></div>`;
const MOCK_TAHALUF = `<div class="row" style="align-items:center;justify-content:center;gap:6px"><span class="node on">Form</span><span class="arrow">→</span><span class="node">Approve</span><span class="arrow">→</span><span class="node">Notify</span><span class="arrow">→</span><span class="node on">Done</span></div>
<div class="row"><div class="box"><b>Fields</b><div class="ln a w60"></div><div class="ln w80"></div><div class="ln w40"></div></div><div class="box"><b>Rules</b><div class="ln w80"></div><div class="ln a w40"></div><div class="ln w60"></div></div><div class="box"><b>Preview</b><div class="ln w60"></div><div class="ln w80"></div></div></div>`;

const img = (bar: string, src: string, altKey: string, w = 1280, h = 800, pos?: string): Media => ({ kind: 'img', bar, src, w, h, altKey, pos });
const live = (en: string, ar: string): Href => ({ en, ar });

export const PROJECTS: Project[] = [
  /* ───────── 01 · company projects ───────── */
  { id: 'p-wasl', key: 'wasl', part: 'company', c: 'fin', featured: true, company: { org: 'Saudi Azm × National Housing Co.', fe: true }, pill: ['soon', 'st.launch'],
    altName: 'منصة وصل للخدمات التمويلية', hl: 3, float: ['🏦', 'wasl.float'], tags: ['Angular', 'Signals', '.NET Core', 'Azure', 'Fintech'],
    media: { kind: 'mock', bar: 'wasl · financing brokerage', html: MOCK_WASL }, hasCase: true,
    actions: [{ kind: 'case' }, { kind: 'link', href: 'https://www.argaam.com/en/article/articledetail/id/1832972', label: 'btn.news' }] },
  { id: 'p-sba', key: 'sba', part: 'company', c: 'gov', featured: true, company: { org: 'Saudi Azm · Saudi Bar Association', fe: true }, pill: ['gated', 'st.nafath'],
    altName: 'خدمة الشكاوى والبلاغات — الهيئة السعودية للمحامين', hl: 3, float: ['🏛️', 'sba.float'], tags: ['Angular', '.NET Core', 'PostgreSQL', 'RTL', 'WCAG'],
    media: { kind: 'img', bar: 'qccx.sba.gov.sa', src: '/assets/sba-qc.jpg', w: 800, h: 503, alt: 'Saudi Bar Association complaints and reports service home page' }, hasCase: true,
    actions: [{ kind: 'case' }, { kind: 'link', href: 'https://qccx.sba.gov.sa/', label: 'btn.visit' }] },
  { id: 'p-seac', key: 'seac', part: 'company', c: 'gov', featured: true, company: { org: 'Saudi Azm · Saudi Council of Engineers', fe: true }, pill: ['gated', 'st.client'],
    altName: 'مركز التحكيم الهندسي السعودي', hl: 3, float: ['⚖️', 'seac.float'], tags: ['Angular', '.NET Core', 'Azure', 'RTL'],
    media: { kind: 'img', bar: 'web01.techprocess.net:28059', src: '/assets/seac.jpg', w: 800, h: 503, alt: 'Saudi Engineering Arbitration Center e-arbitration home page' }, hasCase: true,
    actions: [{ kind: 'case' }, { kind: 'link', href: 'https://web01.techprocess.net:28059', label: 'btn.visit' }] },
  { id: 'p-contracts', key: 'ct', part: 'company', c: 'gov', company: { org: 'Saudi Azm · Legal-tech', fe: true }, pill: ['live', 'st.public'],
    altName: 'عقود — منصة العقود الرقمية', hl: 3, float: ['✍️', 'ct.float'], tags: ['Angular', '.NET Core', 'Node.js', 'i18n'],
    media: { kind: 'img', bar: 'contracts.com.sa', src: '/assets/contracts.jpg', w: 800, h: 500, alt: 'Contracts digital contracts platform sign-in for individuals and companies' }, hasCase: true,
    actions: [{ kind: 'case' }, { kind: 'link', href: 'https://contracts.com.sa', label: 'btn.visit' }] },
  { id: 'p-mirafh', key: 'moj', part: 'company', c: 'gov', company: { org: 'Saudi Azm', fe: true }, pill: ['gated', 'st.restricted'],
    altName: 'ميراث · وحدة التركات', hl: 3, tags: ['Angular', 'Design system', 'Arabic RTL'],
    media: { kind: 'mock', bar: 'mirafh · estates module', html: MOCK_MIRAFH }, actions: [] },
  { id: 'p-hr', key: 'hr', part: 'company', c: 'saas', company: { org: 'Shepherd Technologies' }, pill: ['gated', 'st.customer'],
    hl: 3, float: ['🔁', 'hr.float'], tags: ['AngularJS', 'Angular 8', 'Angular 14', 'REST'],
    media: { kind: 'mock', bar: 'shepherd · hr suite', html: MOCK_HR }, hasCase: true, actions: [{ kind: 'case' }] },
  { id: 'p-lms', key: 'lms', part: 'company', c: 'saas', company: { org: 'Shepherd Technologies' }, pill: ['gated', 'st.customer'],
    hl: 3, tags: ['Angular', 'REST', 'a11y'], media: { kind: 'mock', bar: 'shepherd · e-learning', html: MOCK_LMS }, actions: [] },
  { id: 'p-tahaluf', key: 'th', part: 'company', c: 'saas', company: { org: 'Tahaluf Al Emarat · UAE' }, pill: ['gated', 'st.internal'],
    hl: 3, tags: ['Angular 16', 'PrimeNG', 'RxJS'], media: { kind: 'mock', bar: 'tahaluf · low-code studio', html: MOCK_TAHALUF }, actions: [] },
  { id: 'p-penguin', key: 'pg', part: 'company', c: 'saas', company: { org: 'PenguinIN' }, pill: ['live', 'st.site'],
    hl: 3, tags: ['React', 'OpenLayers', 'Node.js', 'PostgreSQL'],
    media: { kind: 'img', bar: 'penguinin.com', src: '/assets/penguinin.jpg', w: 799, h: 506, alt: 'PenguinIN indoor and campus-wide navigation website', pos: '50% 100%' },
    actions: [{ kind: 'link', href: 'https://penguinin.com', label: 'btn.visit' }] },

  /* ───────── 02 · libraries (tools and chatbot kit are appended from tools.ts) ───────── */
  { id: 'p-nawa', key: 'nw', part: 'lib', c: 'lib', featured: true, pill: ['live', 'st.live'], hl: 3, float: ['🧩', 'nw.float'],
    tags: ['React', 'Vue', 'Svelte', 'Angular', 'React Native', 'Charts', 'WCAG 2.2'],
    media: img('oriebalzyuot96.github.io/pelagic-ui', '/assets/pelagic-ui.jpg', 'nw.alt'),
    actions: [{ kind: 'link', href: live('https://oriebalzyuot96.github.io/pelagic-ui/', 'https://oriebalzyuot96.github.io/pelagic-ui/ar/'), label: 'nw.docs', primary: true },
      { kind: 'link', href: 'https://www.npmjs.com/package/pelagic', raw: 'npm ↗' }, { kind: 'link', href: 'https://github.com/oriebalzyuot96/pelagic-ui', label: 'nw.gh' },
      { kind: 'link', href: 'https://oriebalzyuot96.github.io/pelagic-ui/space/', label: 'nw.space' }] },
  { id: 'p-pelagic-space', key: 'osp', part: 'lib', c: 'lib', pill: ['live', 'st.live'], hl: 3, float: ['🧱', 'osp.float'],
    tags: ['Drag & drop', 'AI-style "describe it"', 'Code export', 'React', 'Vue', 'Angular'],
    media: img('oriebalzyuot96.github.io/pelagic-ui/space', '/assets/pelagic-space.jpg', 'osp.alt'),
    actions: [{ kind: 'link', href: 'https://oriebalzyuot96.github.io/pelagic-ui/space/', label: 'osp.open', primary: true }] },
  { id: 'p-flowshot', key: 'fs', part: 'lib', c: 'lib', pill: ['live', 'st.live'], hl: 3, float: ['', 'fs.float'],
    tags: ['TypeScript', 'React', 'Angular', 'Svelte', 'Astro', 'CLI'],
    media: img('github.com/oriebalzyuot96/flowshot', '/assets/flowshot-overview.svg', 'fs.alt', 960, 420),
    actions: [{ kind: 'link', href: 'https://github.com/oriebalzyuot96/flowshot', label: 'fs.open', primary: true }] },
  { id: 'p-nawa-guard', key: 'ng', part: 'lib', c: 'lib', pill: ['live', 'st.live'], altName: 'نوى كابتشا', hl: 4, float: ['🛡️', 'ng.float'],
    tags: ['Node.js', 'ASP.NET Core', 'React · Vue · Svelte · Angular', 'AES-256-GCM', 'Audio challenge', '6 themes', 'WCAG'],
    media: img('npm i nawa-captcha', '/assets/nawa-captcha.jpg', 'ng.alt'),
    actions: [{ kind: 'link', href: 'https://www.npmjs.com/package/nawa-captcha', raw: 'npm ↗', primary: true }, { kind: 'link', href: 'https://github.com/oriebalzyuot96/nawa-captcha', raw: 'GitHub ↗' }] },

  /* ───────── 03 · projects (calm-plan is prepended from tools.ts) ───────── */
  { id: 'p-5min', key: 'fm', part: 'app', c: 'app', pill: ['live', 'st.live'], hl: 3, float: ['🐋', 'fm.float'],
    tags: ['SvelteKit', 'Three.js', 'Custom UI kit', 'i18n · RTL', 'a11y'],
    media: img('oriebalzyuot96.github.io/samples/5min', '/assets/5min.jpg', 'fm.alt'),
    actions: [{ kind: 'link', href: live('/samples/5min/', '/samples/5min/?lang=ar'), label: 'btn.live', primary: true }] },
  { id: 'p-5min-refresh', key: 'rf', part: 'app', c: 'app', featured: true, pill: ['live', 'st.live'], hl: 3, float: ['🧩', 'rf.float'],
    tags: ['SvelteKit', 'Three.js', '100 puzzles', 'i18n · RTL', 'a11y'],
    media: img('oriebalzyuot96.github.io/samples/5min-refresh', '/assets/5min-refresh.jpg', 'rf.alt'),
    actions: [{ kind: 'link', href: live('/samples/5min-refresh/', '/samples/5min-refresh/?lang=ar'), label: 'btn.live', primary: true }] },
  { id: 'p-5min-api', key: 'na', part: 'app', c: 'app', pill: ['live', 'na.live'], hl: 3, float: ['🔐', 'na.float'],
    tags: ['Node.js 22', 'Fastify', 'PostgreSQL', 'OpenAPI', 'Security'],
    media: img('5min-api · /docs', '/assets/5min-api.jpg', 'na.alt'),
    actions: [{ kind: 'link', href: 'https://fivemin-api-v45t.onrender.com/docs', label: 'na.docs', primary: true }, { kind: 'shots', label: 'na.btn' }] },
  { id: 'p-bustan', key: 'bn', part: 'app', c: 'app', pill: ['live', 'st.live'], altName: 'بستان', hl: 3, float: ['🐦', 'bn.float'],
    tags: ['React 19', 'Three.js', 'Arabic RTL', 'EdTech', 'Multilingual'],
    media: img('oriebalzyuot96.github.io/samples/bustan', '/assets/bustan.jpg', 'bn.alt'),
    actions: [{ kind: 'link', href: live('/samples/bustan/?lang=en', '/samples/bustan/'), label: 'btn.live', primary: true }] },
  { id: 'p-yanbu', key: 'yb', part: 'app', c: 'app', pill: ['live', 'st.done'], altName: 'ينبع تشوقك', hl: 3, float: ['🌊', 'yb.float'],
    tags: ['Angular 22', 'Signals', 'SCSS design system', 'i18n · RTL', 'a11y'],
    media: img('yanbu · tourism portal', '/assets/yanbu.jpg', 'yb.alt'), actions: [{ kind: 'shots', label: 'btn.shots', primary: true }] },
  { id: 'p-taqadum', key: 'tq', part: 'app', c: 'app', pill: ['live', 'st.done'], altName: 'التقدّم المستمر', hl: 3, float: ['🧭', 'tq.float'],
    tags: ['Angular 22', 'Figma → code', 'i18n · RTL', 'Forms', 'a11y'],
    media: img('altaqadum · website', '/assets/altaqadum.jpg', 'tq.alt'), actions: [{ kind: 'shots', label: 'btn.shots', primary: true }] },
  { id: 'p-bareeq', key: 'bq', part: 'app', c: 'app', pill: ['live', 'st.done'], altName: 'بريق العقيق', hl: 3, float: ['💎', 'bq.float'],
    tags: ['Angular 21', 'Signals', 'React Native · Expo', 'Design tokens', 'i18n · RTL'],
    media: img('bareeq-al-aeeq · web', '/assets/bareeq.jpg', 'bq.alt'), actions: [{ kind: 'shots', label: 'btn.shots', primary: true }] },
  { id: 'p-convert', key: 'cv', part: 'app', c: 'app', pill: ['live', 'st.done'], hl: 3, float: ['📱', 'cv.float'],
    tags: ['React Native', 'TypeScript', 'Jest', 'Maestro', 'a11y'],
    media: img('convert · react native app', '/assets/asset-conversion.jpg', 'cv.alt'),
    actions: [{ kind: 'shots', label: 'btn.shots', primary: true }, { kind: 'link', href: 'https://github.com/oriebalzyuot96/asset-conversion/blob/main/demo/video/convert-demo.mp4', label: 'cv.video' }] },

  /* ───────── 04 · themes & design samples ───────── */
  { id: 'p-orcanix', key: 'orx', part: 'theme', c: 'theme', pill: ['live', 'st.live'], hl: 3, float: ['', 'orx.float'],
    tags: ['Admin template', 'SaaS', 'Arabic RTL', 'WCAG 2.2', 'Dark mode'],
    media: img('oriebalzyuot96.github.io/orcanix-site', '/assets/orcanix.jpg', 'orx.alt'),
    actions: [{ kind: 'link', href: 'https://oriebalzyuot96.github.io/orcanix-site/', label: 'orx.open', primary: true }] },
  { id: 'p-sample3', key: 's3', part: 'theme', c: 'theme', pill: ['live', 'st.live'], hl: 3, float: ['✨', 's3.float'],
    tags: ['Astro', 'Three.js', 'WebGL', 'i18n · RTL', 'a11y'],
    media: img('oriebalzyuot96.github.io/sample-3', '/assets/sample3.jpg', 's3.alt'),
    actions: [{ kind: 'link', href: live('https://oriebalzyuot96.github.io/sample-3/', 'https://oriebalzyuot96.github.io/sample-3/ar/'), label: 'btn.live', primary: true }] },
  { id: 'p-burger', key: 'bg', part: 'theme', c: 'theme', pill: ['live', 'st.live'], hl: 3, float: ['🍔', 'bg.float'],
    tags: ['Three.js', 'WebGL', 'Scroll animation', 'i18n · RTL', 'a11y'],
    media: img('oriebalzyuot96.github.io/samples/burger', '/assets/burger.jpg', 'bg.alt'),
    actions: [{ kind: 'link', href: live('/samples/burger/', '/samples/burger/ar/'), label: 'btn.live', primary: true }] },
  { id: 'p-descent', key: 'ds', part: 'theme', c: 'theme', pill: ['live', 'st.live'], hl: 3, float: ['🪼', 'ds.float'],
    tags: ['Three.js', 'WebGL', 'Cursor-reactive', 'Scroll storytelling', 'a11y'],
    media: img('oriebalzyuot96.github.io/samples/descent', '/assets/descent.jpg', 'ds.alt'),
    actions: [{ kind: 'link', href: live('/samples/descent/', '/samples/descent/ar/'), label: 'btn.live', primary: true }] },
  { id: 'p-bakery', key: 'bk', part: 'theme', c: 'theme', pill: ['live', 'st.live'], altName: 'مخبز جود داي', hl: 3, float: ['🥐', 'bk.float'],
    tags: ['React 19 · TypeScript', 'Three.js', 'Custom UI kit', 'i18n · RTL', 'a11y'],
    media: img('goodday · bakery shop', '/assets/bakery.jpg', 'bk.alt'),
    actions: [{ kind: 'link', href: live('/samples/bakery/', '/samples/bakery/?lang=ar'), label: 'btn.live', primary: true }] },
  { id: 'p-bta3klo', key: 'b3', part: 'theme', c: 'theme', pill: ['live', 'st.live'], altName: 'بتاع كلّو', hl: 3, float: ['🧰', 'b3.float'],
    tags: ['Next.js 15 · static export', 'Three.js', 'Custom UI kit', 'i18n · RTL', 'a11y'],
    media: img('bta3 kolo · home services', '/assets/bta3klo.jpg', 'b3.alt'),
    actions: [{ kind: 'link', href: live('/samples/bta3klo/', '/samples/bta3klo/?lang=ar'), label: 'btn.live', primary: true }] },
  { id: 'p-travelnji', key: 'tv', part: 'theme', c: 'theme', pill: ['live', 'st.live'], altName: 'ترافلنجي', hl: 3, float: ['🗺️', 'tv.float'],
    tags: ['Svelte 5 · TypeScript', 'Three.js 3D map', 'Custom UI kit', 'i18n · RTL', 'a11y'],
    media: img('travelnji · eco travel', '/assets/travelnji.jpg', 'tv.alt'),
    actions: [{ kind: 'link', href: live('/samples/travelnji/', '/samples/travelnji/?lang=ar'), label: 'btn.live', primary: true }] },
  { id: 'p-greenfield', key: 'gf', part: 'theme', c: 'theme', pill: ['live', 'st.live'], altName: 'احجز معلّم', hl: 3, float: ['🎓', 'gf.float'],
    tags: ['React 19 · Vite', 'Three.js', 'Custom UI kit', 'i18n · RTL', 'a11y'],
    media: img('book a teacher · tutors', '/assets/greenfield.jpg', 'gf.alt'),
    actions: [{ kind: 'link', href: live('/samples/greenfield/', '/samples/greenfield/?lang=ar'), label: 'btn.live', primary: true }] },
];

export const hrefFor = (h: Href | undefined, isAr: boolean) => (!h ? '' : typeof h === 'string' ? h : isAr ? h.ar : h.en);
