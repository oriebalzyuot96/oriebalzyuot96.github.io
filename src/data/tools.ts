/* Public developer tools shown on the portfolio. Each one is an open-source repo under github.com/oriebalzyuot96. */
export interface Tool {
  id: string;
  /** the command shown on the card image */
  cmd: string;
  hue: number;
  en: { tagline: string; points: [string, string, string] };
  ar: { tagline: string; points: [string, string, string] };
  tags: string[];
}

export const TOOLS: Tool[] = [
  {
    id: 'arabic-ui-audit', cmd: 'node src/cli.js page.html', hue: 160,
    en: { tagline: 'Checks a page for Arabic and RTL problems: missing lang or dir, unlabeled fields, images without alt, native selects and Arabic inputs without dir.', points: ['Eight rules, each with a fix hint', 'Markdown and JSON reports', 'Exit code for CI'] },
    ar: { tagline: 'يفحص صفحة على مشاكل العربي والـ RTL: lang أو dir ناقص، حقول بدون label، صور بدون alt، وselect أصلي وحقول عربية بدون dir.', points: ['ثمانية قواعد، لكل وحدة تلميح للإصلاح', 'تقارير Markdown وJSON', 'كود خروج يصلح لـ CI'] },
    tags: ['Node.js', 'Accessibility', 'RTL', 'jsdom'],
  },
  {
    id: 'flow-tests', cmd: 'flow-tests flow.har --out tests/flow.spec.ts', hue: 265,
    en: { tagline: 'Turns a HAR capture of a browser flow into a Playwright test skeleton, with an accessibility check after every page.', points: ['Never copies cookies, tokens or passwords', 'axe check for WCAG 2.2 AA per navigation', 'TODO markers instead of guessed selectors'] },
    ar: { tagline: 'يحوّل تسجيل HAR لرحلة في المتصفح إلى هيكل اختبار Playwright، مع فحص وصول بعد كل صفحة.', points: ['ما ينسخ الكوكيز ولا التوكنات ولا كلمات المرور', 'فحص axe لمعيار WCAG 2.2 AA عند كل تنقل', 'علامات TODO بدل مُحدِّدات مخمّنة'] },
    tags: ['Node.js', 'Playwright', 'HAR', 'axe-core'],
  },
  {
    id: 'bundle-explainer', cmd: 'bundle-explainer app.js.map --top 15', hue: 30,
    en: { tagline: 'Reads a build’s source map and reports which packages and files take the most room in the bundle.', points: ['Groups scoped and nested node_modules packages', 'Table or JSON output', 'Sizes are approximate (from original source text)'] },
    ar: { tagline: 'يقرأ source map للبناء ويبيّن أي الحزم والملفات تاخذ أكبر مساحة داخل الـ bundle.', points: ['يجمّع الحزم المحدّدة بنطاق والمتداخلة داخل node_modules', 'مخرجات جدول أو JSON', 'الأحجام تقريبية (من نص المصدر الأصلي)'] },
    tags: ['Node.js', 'Source maps', 'Performance', 'CLI'],
  },
  {
    id: 'har-verify', cmd: 'har-verify capture.har client.ts', hue: 200,
    en: { tagline: 'Statically checks that a generated typed API client still matches the calls recorded in a HAR capture.', points: ['Finds missing endpoints and response keys', 'Fails the build when the client drifts', 'Ships with a CI workflow'] },
    ar: { tagline: 'يتأكد بشكل ثابت أن الـ client المولَّد ما زال يطابق الاستدعاءات المسجّلة في ملف HAR.', points: ['يكتشف endpoints ومفاتيح ردود ناقصة', 'يفشّل الـ build لما ينحرف الـ client', 'يجي مع workflow جاهز لـ CI'] },
    tags: ['Node.js', 'HAR', 'TypeScript', 'CI'],
  },
  {
    id: 'a11y-pr-diff', cmd: 'a11y-pr-diff --base base/ --head head/', hue: 340,
    en: { tagline: 'A GitHub Action that compares axe-core results before and after a pull request and comments only on the new violations.', points: ['Ignores problems that were already there', 'Least-privilege workflow permissions', 'Exit code 1 on new serious issues'] },
    ar: { tagline: 'GitHub Action يقارن نتائج axe-core قبل وبعد الـ pull request ويعلّق فقط على المخالفات الجديدة.', points: ['يتجاهل المشاكل اللي كانت موجودة أصلاً', 'صلاحيات workflow بأقل مستوى', 'كود خروج 1 عند وجود مشاكل خطيرة جديدة'] },
    tags: ['GitHub Actions', 'axe-core', 'Accessibility', 'jsdom'],
  },
  {
    id: 'token-sync', cmd: 'token-sync tokens.json --out dist/tokens', hue: 45,
    en: { tagline: 'One design-token JSON source becomes CSS custom properties, a Tailwind theme and an Angular SCSS file.', points: ['Light and dark values', 'Resolves {references} and catches cycles', 'No dependencies'] },
    ar: { tagline: 'مصدر واحد لرموز التصميم (JSON) يتحول إلى متغيرات CSS وثيم Tailwind وملف SCSS لـ Angular.', points: ['قيم فاتحة وغامقة', 'يحلّ المراجع {} ويكشف الدوائر', 'بدون أي مكتبات'] },
    tags: ['Node.js', 'Design tokens', 'Tailwind', 'Angular'],
  },
  {
    id: 'har-mock-api', cmd: 'har-mock capture.har --port 4010', hue: 120,
    en: { tagline: 'An offline mock API server built from a HAR capture, so a front end can run without the real back end.', points: ['Recognises numeric and UUID ids in paths', 'Redacts secret-looking fields', 'Unknown routes return the list of known ones'] },
    ar: { tagline: 'خادم API وهمي يشتغل بدون إنترنت، مبني من تسجيل HAR، ليشتغل الـ front end بدون الـ back end الحقيقي.', points: ['يتعرف على المعرّفات الرقمية وUUID في المسارات', 'يخفي الحقول اللي شكلها سر', 'المسار المجهول يرجّع قائمة المسارات المعروفة'] },
    tags: ['Node.js', 'HAR', 'Mock server', 'CORS'],
  },
  {
    id: 'app-map', cmd: 'app-map ./my-app --out app-map.html', hue: 235,
    en: { tagline: 'Builds a graph of routes, components and services for an Angular or React app and exports it as one interactive HTML page.', points: ['Self-contained page with search', 'Angular and React Router detection', 'Heuristic: the README lists what it misses'] },
    ar: { tagline: 'يبني رسمًا لمسارات ومكوّنات وخدمات تطبيق Angular أو React ويصدّره كصفحة HTML تفاعلية وحدة.', points: ['صفحة مستقلة فيها بحث', 'يكتشف Angular وReact Router', 'تقديري: الـ README يذكر اللي يفوته'] },
    tags: ['Node.js', 'Angular', 'React', 'Graph'],
  },
];
