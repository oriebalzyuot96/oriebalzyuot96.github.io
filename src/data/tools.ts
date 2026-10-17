/* Public developer tools shown on the portfolio. Each one is an open-source repo under github.com/oriebalzyuot96. */
export interface Tool {
  id: string;
  /** the command shown on the card image */
  cmd: string;
  hue: number;
  en: { tagline: string; points: [string, string, string] };
  ar: { tagline: string; points: [string, string, string] };
  tags: string[];
  /** private products: shown with a card and description only, no repository link */
  private?: boolean;
  /** implementation language shown on private cards, e.g. "Go" */
  lang?: string;
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
  {
    id: 'portfolio-health', cmd: 'portfolio-health https://oriebalzyuot96.github.io', hue: 190,
    en: { tagline: 'Crawls a portfolio site and finds broken links, missing metadata, Arabic pages without dir="rtl" and a missing CV before visitors do.', points: ['Reads the sitemap or the home page links', 'Weekly GitHub Actions run with a report artifact', 'Exit code 1 on errors'] },
    ar: { tagline: 'يزحف على موقع البورتفوليو ويلاقي الروابط المكسورة والبيانات الناقصة والصفحات العربية بدون dir="rtl" وملف السيرة الذاتية الناقص قبل ما يشوفها الزوار.', points: ['يقرأ الـ sitemap أو روابط الصفحة الرئيسية', 'تشغيل أسبوعي على GitHub Actions مع تقرير', 'كود خروج 1 عند وجود أخطاء'] },
    tags: ['Node.js', 'SEO', 'Accessibility', 'GitHub Actions'],
  },
  {
    id: "brand-forge", cmd: "brand-forge brand.json --out dist/brand", hue: 270, private: true, lang: "Node.js",
    en: { tagline: "Describe a brand once in JSON and generate every logo, favicon, icon, splash and token file from it.", points: ["Zero runtime dependencies: built-in rasteriser, PNG encoder and ICO packer","Colour, mono and inverse variants of mark, wordmark and lockup stay in sync","Typed brand.ts tokens so code and assets never drift apart"] },
    ar: { tagline: "صِف هويتك مرة واحدة بملف JSON وولّد منه كل الشعارات والأيقونات وشاشة البداية وملف الرموز.", points: ["بدون أي اعتماديات وقت التشغيل: تحويل نقطي وترميز PNG وتجميع ICO مدمجة","نسخ ملونة وأحادية ومعكوسة للعلامة والاسم والتركيبة تبقى متطابقة","ملف brand.ts مُنمّط يضمن ألا تختلف الأصول عن الشيفرة"] },
    tags: ["cli","branding","svg","icons"],
  },
  {
    id: "mail-forge", cmd: "mail-forge templates/ --out dist/mail --sql seed.sql", hue: 15, private: true, lang: "Node.js",
    en: { tagline: "One source file per email, rendered into Outlook-safe Arabic and English HTML, plain text and SQL seeds.", points: ["RTL and LTR from the same template, with mirrored layout and correct dir/lang","Table-based inlined HTML plus a plain-text fallback for every language","Optional SQL upsert seed for apps that store templates in a database"] },
    ar: { tagline: "ملف مصدر واحد لكل رسالة يتحول إلى HTML عربي وإنجليزي متوافق مع Outlook ونص بديل وبذور SQL.", points: ["اتجاه من اليمين لليسار ومن اليسار لليمين من القالب نفسه مع تخطيط معكوس وسمات dir/lang صحيحة","HTML مبني على الجداول بأنماط مضمّنة مع نسخة نصية بديلة لكل لغة","ملف SQL اختياري لإدراج القوالب أو تحديثها في قاعدة البيانات"] },
    tags: ["email","i18n","rtl","cli"],
  },
  {
    id: "agents-md-gen", cmd: "agents-md-gen . --out AGENTS.md --check", hue: 175, private: true, lang: "Node.js",
    en: { tagline: "Generates AGENTS.md, CLAUDE.md and Cursor rules from your repo's manifests and configs, and fails CI when they drift.", points: ["Scans package.json, .sln/.csproj, go.mod, pyproject, CI workflows, lint configs and .env.example names","Layered output: one file at the root plus one per workspace, with a marker block so hand-written notes survive","--check exits 1 when the generated section is out of date; zero runtime dependencies, Node 22"] },
    ar: { tagline: "يولّد ملفات AGENTS.md وCLAUDE.md وقواعد Cursor من ملفات المشروع نفسها، ويُفشل CI عندما تصبح قديمة.", points: ["يفحص package.json وملفات ‎.sln/.csproj وgo.mod وpyproject وسير عمل CI وإعدادات الفحص وأسماء متغيرات ‎.env.example","مخرجات طبقية: ملف في الجذر وملف لكل مساحة عمل، مع علامات تحفظ الملاحظات المكتوبة يدويًا","الخيار ‎--check يُرجع 1 عندما يكون القسم المولَّد قديمًا؛ بلا اعتماديات تشغيل، Node 22"] },
    tags: ["ai-context","cli","monorepo","ci"],
  },
  {
    id: "skill-scaffold", cmd: "skill-scaffold add add-api-feature --name orders && skill-scaffold lint", hue: 95, private: true, lang: "Node.js",
    en: { tagline: "Scaffolds and lints AI-assistant skills and editor rules from shared templates so every repo gets the same guardrails.", points: ["Five built-in templates: API feature, frontend client, mobile screen, repo workflow, review checklist","Lint enforces frontmatter, required sections, 200-char descriptions and unique names, failing CI on problems","Zero runtime dependencies on Node 22 with a tiny built-in YAML frontmatter parser"] },
    ar: { tagline: "ينشئ ويتحقق من مهارات مساعد الذكاء الاصطناعي وقواعد المحرر من قوالب مشتركة ليحصل كل مستودع على الضوابط نفسها.", points: ["خمسة قوالب مدمجة: ميزة API، واجهة أمامية، شاشة موبايل، سير عمل المستودع، قائمة مراجعة","أمر lint يفرض الترويسة والأقسام المطلوبة ووصفاً بحد 200 حرف وأسماء فريدة ويُفشل CI عند وجود مشاكل","بدون أي اعتماديات وقت التشغيل على Node 22 مع محلل YAML صغير مدمج"] },
    tags: ["cli","ai-skills","scaffolding","linting"],
  },
  {
    id: "api-batch-e2e", cmd: "api-batch-e2e run plan.json --first-run --junit report.xml", hue: 210, private: true, lang: "Node.js",
    en: { tagline: "Run stateful API end-to-end batches from one plan file, with test accounts, captured tokens, retries and secret redaction.", points: ["Accounts register on --first-run and just log in afterwards; saved tokens and ids flow into later steps as {{vars}}.","Per-step timing, retries with backoff for flaky steps, readable console report plus JUnit and JSON output.","Secrets come only from {{env.NAME}} and are redacted everywhere; zero runtime dependencies and a built-in demo server."] },
    ar: { tagline: "شغّل دفعات اختبار شاملة لواجهات API من ملف خطة واحد، مع حسابات اختبار ورموز محفوظة وإعادة محاولة وإخفاء للأسرار.", points: ["تُسجَّل الحسابات في التشغيل الأول ثم تكتفي بتسجيل الدخول لاحقًا، وتنتقل الرموز والمعرّفات المحفوظة إلى الخطوات التالية كمتغيرات.","توقيت لكل خطوة، وإعادة محاولة بتراجع تدريجي للخطوات المتقلبة، وتقرير مقروء في الطرفية مع مخرجات JUnit وJSON.","الأسرار تأتي من متغيرات البيئة فقط وتُخفى في كل المخرجات، بدون أي اعتماديات وقت التشغيل ومع خادم تجريبي مدمج."] },
    tags: ["api-testing","e2e","cli","junit"],
  },
  {
    id: "arch-digest", cmd: "arch-digest . --out docs/architecture --since main", hue: 250, private: true, lang: "Node.js",
    en: { tagline: "Architecture docs generated from the code itself: modules, public surface, import graph, routes and data models, deterministic and diffable.", points: ["Regex analysers for JS/TS, C# and Go extract exports, controllers, packages and HTTP routes","Mermaid import graph between modules plus external packages per module","--since <ref> turns git diff into a per-module change digest you can commit and review"] },
    ar: { tagline: "توثيق معماري يُولَّد من الشيفرة نفسها: الوحدات والواجهة العامة ورسم الاستيرادات والمسارات ونماذج البيانات، بنتيجة ثابتة قابلة للمقارنة.", points: ["محلّلات تعتمد على التعابير النمطية لـ JS/TS و C# و Go تستخرج التصديرات والمتحكمات والحزم ومسارات HTTP","رسم Mermaid لاستيرادات الوحدات بينها مع الحزم الخارجية لكل وحدة","الخيار --since يحوّل git diff إلى ملخص تغييرات لكل وحدة يمكن حفظه ومراجعته"] },
    tags: ["docs","static-analysis","mermaid","cli"],
  },
  {
    id: "style-dups", cmd: "style-dups --root src/styles --json report.json", hue: 330, private: true, lang: "Go",
    en: { tagline: "A single Go binary that finds repeated SCSS and CSS declarations while ignoring intentional overrides such as media queries, RTL, dark themes and hover states.", points: ["Reports only true duplicates: same selector, property and context.","Ignores intentional overrides in media, RTL, theme, state and mixin blocks.","Standard library only, parallel scans, and CI-friendly exit codes."] },
    ar: { tagline: "أداة Go واحدة تجد تصريحات SCSS وCSS المكررة وتتجاهل التجاوزات المقصودة مثل استعلامات الوسائط والاتجاه والوضع الداكن.", points: ["تُبلغ عن التكرارات الحقيقية فقط: نفس المحدد والخاصية والسياق.","تتجاهل التجاوزات المقصودة في الوسائط والاتجاه والسمات والحالات.","مكتبة قياسية فقط، ومسح متوازٍ، ورموز خروج مناسبة لـ CI."] },
    tags: ["Go","SCSS","CLI"],
  },
  {
    id: "i18n-leak", cmd: "i18n-leak --root . --scope src/api,src/app", hue: 140, private: true, lang: "Go",
    en: { tagline: "Finds human-readable strings hardcoded in server code, so text moves into resource files.", points: ["Single static Go binary, standard library only","Checks C# and TypeScript/JavaScript with a heuristic lexer","JSON report and exit codes make it CI-friendly"] },
    ar: { tagline: "يكشف النصوص المكتوبة للبشر والمضمّنة في كود الخادم، لنقلها إلى ملفات الموارد.", points: ["ملف تنفيذي واحد بمكتبة Go القياسية فقط","يفحص ملفات C# وTypeScript وJavaScript","تقرير JSON ورموز خروج مناسبة للتكامل المستمر"] },
    tags: ["Go","i18n","CLI"],
  },
];

/* Apps and kits shown with a short demo video. */
export interface VideoApp {
  id: string;
  group: 'app' | 'lib';
  video: string;
  /** path of a live demo inside this site, if any */
  demo?: string;
  en: { title: string; summary: string; tagline: string; points: [string, string, string]; alt: string };
  ar: { title: string; summary: string; tagline: string; points: [string, string, string]; alt: string };
  tags: string[];
}
export const VIDEO_APPS: VideoApp[] = [
  {
    id: 'calm-plan', group: 'app', video: 'calm-plan-demo', demo: '/samples/calm-plan/',
    en: { title: 'Calm Plan: tasks, mood and meditation in one calm place', summary: 'Tasks, mood check-ins and guided meditation in one full-stack app, Arabic first.',tagline: 'A full-stack wellbeing companion: a daily to-do list, mood check-ins, guided meditation with music generated in the browser, and a supportive chat. Arabic first, with English, colour themes and accessibility settings.', points: ['Crisis guidance replaces chat replies when needed', 'Meditation sounds are generated live, no audio files', 'Self-help only: not therapy and not a diagnosis'], alt: 'Demo of Calm Plan: adding tasks, saving a mood, changing the theme, a breathing session and the chat.' },
    ar: { title: 'خطة الهدوء: مهام ومزاج وتأمل بمكان هادئ واحد', summary: 'المهام وتسجيل المزاج والتأمّل الموجّه في تطبيق متكامل واحد، بالعربية أولًا.',tagline: 'رفيق عافية كامل بواجهة وخادم: قائمة مهام يومية، وتسجيل للمزاج، وتأمل موجّه بموسيقى تتولد داخل المتصفح، وشات داعم. عربي أولًا مع الإنجليزية وثيمات وإعدادات وصول.', points: ['إرشاد الطوارئ يحل محل ردود الشات عند الحاجة', 'أصوات التأمل تتولد مباشرة بدون ملفات صوت', 'للدعم الذاتي فقط: ليس علاجًا ولا تشخيصًا'], alt: 'عرض لتطبيق خطة الهدوء: إضافة مهام، وحفظ المزاج، وتغيير الثيم، وجلسة تنفس، والشات.' },
    tags: ['Node.js', 'SQLite', 'Web Audio', 'Arabic RTL', 'Accessibility'],
  },
  {
    id: 'chatbot-kit', group: 'lib', video: 'chatbot-demo',
    en: { title: 'Chatbot Kit: an embeddable chat with its own back end', summary: 'An embeddable chat widget with a small Node back end that streams answers.',tagline: 'A reusable web-component chat widget plus a small Node back end that streams answers from the Claude API, or from local answers when no key is set.', points: ['Streaming answers over server-sent events', 'Rate limit, size limits and an origin allow-list', 'English and Arabic with RTL'], alt: 'Demo of the chat widget answering a question in English and one in Arabic.' },
    ar: { title: 'Chatbot Kit: شات قابل للتضمين مع خادم خاص', summary: 'ودجت محادثة قابل للتضمين مع خادم Node صغير يبثّ الإجابات.',tagline: 'ودجت شات (web component) قابل لإعادة الاستخدام مع خادم Node صغير يبث الإجابات من Claude API، أو من إجابات محلية إذا ما في مفتاح.', points: ['إجابات تتدفق عبر server-sent events', 'حد للطلبات وللحجم وقائمة مصادر مسموحة', 'إنجليزي وعربي مع RTL'], alt: 'عرض للودجت وهو يجاوب عن سؤال بالإنجليزية وآخر بالعربية.' },
    tags: ['Node.js', 'Web Component', 'SSE', 'Claude API'],
  },
];
