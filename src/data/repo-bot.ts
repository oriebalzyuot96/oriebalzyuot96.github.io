/* Index for the portfolio's repo assistant. Each entry is one public repository.
   The assistant answers from this list only: it never calls a model or a server. */
export interface RepoEntry {
  id: string;
  name: string;
  url: string;
  npm?: string;
  en: string;
  ar: string;
  /** lower-case words that point to this repo (English and Arabic) */
  kw: string[];
}

export const REPOS: RepoEntry[] = [
  { id: 'pelagic-ui', name: 'pelagic-ui', url: 'https://github.com/oriebalzyuot96/pelagic-ui', npm: 'pelagic',
    en: 'Pelagic UI: accessible, themeable components for React, Vue, Angular, Svelte, Astro, React Native and Flutter.',
    ar: 'Pelagic UI: مكوّنات سهلة الوصول وقابلة للتخصيص لـ React وVue وAngular وSvelte وAstro وReact Native وFlutter.',
    kw: ['pelagic', 'ui', 'component', 'components', 'library', 'react', 'vue', 'angular', 'svelte', 'astro', 'flutter', 'accessible', 'theme', 'مكتبة', 'مكونات', 'مكوّنات', 'واجهة'] },
  { id: 'nawa-captcha', name: 'nawa-captcha', url: 'https://github.com/oriebalzyuot96/nawa-captcha', npm: 'nawa-captcha',
    en: 'Nawa Captcha: a self-hosted, accessible puzzle CAPTCHA with an audio challenge and 3D themes.',
    ar: 'نوى كابتشا: كابتشا ذاتية الاستضافة وسهلة الوصول، بتحدٍّ صوتي وسمات ثلاثية الأبعاد.',
    kw: ['captcha', 'nawa', 'bot', 'security', 'puzzle', 'كابتشا', 'نوى', 'حماية', 'بوت'] },
  { id: 'flowshot', name: 'flowshot', url: 'https://github.com/oriebalzyuot96/flowshot',
    en: 'Flowshot: record one browser action (a HAR file) and get a typed component plus the evidence for every request it makes. Supports React, Angular, Svelte and Astro.',
    ar: 'Flowshot: سجّل إجراءً واحدًا في المتصفح (ملف HAR) واحصل على مكوّن مكتوب الأنواع مع دليل لكل طلب يقوم به. يدعم React وAngular وSvelte وAstro.',
    kw: ['flowshot', 'har', 'flow', 'capture', 'network', 'generator', 'cli', 'تسجيل', 'مولد'] },
  { id: 'orcanix-site', name: 'orcanix-site', url: 'https://github.com/oriebalzyuot96/orcanix-site',
    en: 'Orcanix: an accessible admin and SaaS template with a live demo and product page.',
    ar: 'Orcanix: قالب لوحة إدارة وSaaS سهل الوصول، مع عرض حي وصفحة منتج.',
    kw: ['orcanix', 'template', 'admin', 'dashboard', 'saas', 'قالب', 'لوحة'] },
  { id: 'asset-conversion', name: 'asset-conversion', url: 'https://github.com/oriebalzyuot96/asset-conversion',
    en: 'AED/USDT asset conversion app in React Native and TypeScript (no Expo): live quotes, exact decimal maths, themes, accessibility and Maestro end-to-end tests.',
    ar: 'تطبيق تحويل الأصول AED/USDT بـ React Native وTypeScript (بدون Expo): أسعار حيّة، حسابات عشرية دقيقة، سمات، وإمكانية وصول، واختبارات Maestro من البداية للنهاية.',
    kw: ['asset', 'conversion', 'crypto', 'usdt', 'aed', 'react native', 'mobile', 'app', 'تحويل', 'عملات', 'تطبيق', 'جوال'] },
  { id: 'sample-3', name: 'sample-3', url: 'https://github.com/oriebalzyuot96/sample-3',
    en: 'Sample 03: a 3D bilingual landing page built with Astro and Three.js.',
    ar: 'عينة 03: صفحة هبوط ثنائية اللغة ثلاثية الأبعاد مبنية بـ Astro وThree.js.',
    kw: ['sample', 'three', 'threejs', '3d', 'landing', 'astro', 'ثلاثي', 'هبوط'] },
  { id: 'oriebalzyuot96', name: 'oriebalzyuot96 (profile)', url: 'https://github.com/oriebalzyuot96',
    en: 'The GitHub profile README: a short summary of my work, portfolio and CV.',
    ar: 'ملف الملف الشخصي على GitHub: ملخص قصير لعملي وبورتفوليو والسيرة الذاتية.',
    kw: ['profile', 'github', 'readme', 'about', 'ملف'] },
  { id: 'ahmad', name: 'ahmad', url: 'https://github.com/oriebalzyuot96/ahmad',
    en: 'Portfolio, CV and intro video for Ahmad Al-Hraki, Senior Front-End Engineer (React, Next.js, Angular, .NET, AI).',
    ar: 'بورتفوليو والسيرة الذاتية وفيديو تعريفي لأحمد الحريكي، مهندس واجهات أمامية أول (React وNext.js وAngular وNET وAI).',
    kw: ['ahmad', 'client', 'portfolio', 'cv', 'بورتفوليو', 'احمد', 'أحمد'] },
  { id: 'esraa', name: 'esraa', url: 'https://github.com/oriebalzyuot96/esraa',
    en: 'Portfolio, CV and intro video for Esraa Nasser, Senior Software Engineer (.NET, Blazor, integrations).',
    ar: 'بورتفوليو والسيرة الذاتية وفيديو تعريفي لإسراء ناصر، مهندسة برمجيات أولى (.NET وBlazor والتكاملات).',
    kw: ['esraa', 'client', 'portfolio', 'cv', 'اسراء', 'إسراء', 'بورتفوليو'] },
  { id: 'abdulsamad', name: 'abdulsamad', url: 'https://github.com/oriebalzyuot96/abdulsamad',
    en: 'Portfolio, CV and intro video for Abdul-Samad Hassan, Software Technical Lead (.NET, Angular, microservices).',
    ar: 'بورتفوليو والسيرة الذاتية وفيديو تعريفي لعبد الصمد حسن، قائد تقني للبرمجيات (.NET وAngular والخدمات المصغّرة).',
    kw: ['abdulsamad', 'abdul', 'client', 'portfolio', 'cv', 'عبدالصمد', 'عبد الصمد', 'بورتفوليو'] },
  { id: 'saja', name: 'saja', url: 'https://github.com/oriebalzyuot96/saja',
    en: 'Portfolio and CV of Saja Al-Shannaq, Software Team Leader (.NET, Angular, React).',
    ar: 'بورتفوليو والسيرة الذاتية لسجى الشناق، قائدة فريق برمجيات (.NET وAngular وReact).',
    kw: ['saja', 'client', 'portfolio', 'cv', 'سجى', 'سجا', 'بورتفوليو'] },
  { id: 'mais', name: 'mais', url: 'https://github.com/oriebalzyuot96/mais',
    en: 'Portfolio and CV of Mayis Mazin, Front-End Engineer (Angular).',
    ar: 'بورتفوليو والسيرة الذاتية لميس مازن، مهندسة واجهات أمامية (Angular).',
    kw: ['mais', 'mayis', 'client', 'portfolio', 'cv', 'ميس', 'بورتفوليو'] },
  { id: 'bashar', name: 'bashar', url: 'https://github.com/oriebalzyuot96/bashar',
    en: 'Portfolio built for Bashar.',
    ar: 'بورتفوليو تم بناؤه لبشار.',
    kw: ['bashar', 'client', 'portfolio', 'بشار', 'بورتفوليو'] }
];
