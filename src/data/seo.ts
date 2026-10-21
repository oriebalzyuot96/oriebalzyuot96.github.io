import type { Lang } from '../i18n';

const SITE = 'https://oriebalzyuot96.github.io';

export const HOME_META: Record<Lang, { title: string; description: string }> = {
  en: {
    title: 'Orieb Alzyuot (عريب الزيوت) · Senior Front-End & Angular Developer · Freelance',
    description: 'Orieb Alzyuot, Senior Front-End & Full-Stack Engineer (Angular, React, React Native, Astro, .NET, Node) building government, fintech and enterprise products that help people. Available worldwide: remote, freelance or relocation.',
  },
  ar: {
    title: 'عريب الزيوت (Orieb Alzyuot) · خبرة Senior في الواجهات الأمامية و Angular · عمل حر',
    description: 'عريب الزيوت، خبرة Senior في الواجهات الأمامية والتطوير المتكامل (Angular و React و React Native و Astro و .NET و Node)، أبني منتجات حكومية ومالية ومؤسسية تساعد الناس. متاح للعمل حول العالم: عن بُعد أو بنظام العمل الحر أو بالانتقال.',
  },
};

export const homeSchema = (lang: Lang) => [
  { '@type': 'ProfilePage', '@id': `${SITE}${lang === 'ar' ? '/ar/' : '/'}#page`, url: `${SITE}${lang === 'ar' ? '/ar/' : '/'}`, name: HOME_META[lang].title, inLanguage: lang, mainEntity: { '@id': `${SITE}/#orieb` }, dateModified: '2026-10-16' },
  { '@type': 'ProfessionalService', '@id': `${SITE}/#freelance`, name: 'Orieb Alzyuot · Freelance Senior Front-End & Angular Development', provider: { '@id': `${SITE}/#orieb` },
    areaServed: ['Worldwide (remote)', { '@type': 'Country', name: 'Saudi Arabia' }, { '@type': 'Country', name: 'United Arab Emirates' }, { '@type': 'Country', name: 'Jordan' }],
    availableLanguage: ['Arabic', 'English'], url: `${SITE}/hire/` },
];

export const VIDEO_SCHEMA = { '@type': 'VideoObject', name: 'Orieb Alzyuot · 40-second intro', description: 'Motion intro with original music: Senior Front-End & Full-Stack Engineer, platforms shipped, stack and principles.',
    thumbnailUrl: `${SITE}/assets/intro-poster.jpg`, contentUrl: `${SITE}/assets/orieb-intro.mp4`, uploadDate: '2026-10-08', duration: 'PT40S' };

/* inner pages: /work, /about, /lab, /writing (and /ar/…) */
type PageKey = 'work' | 'about' | 'lab' | 'writing' | 'tutoring';
export const PAGE_META: Record<PageKey, Record<Lang, { title: string; description: string; name: string }>> = {
  work: {
    en: { name: 'Work', title: 'Work · Orieb Alzyuot · Government, fintech and open-source projects',
      description: 'All projects by Orieb Alzyuot: Saudi government and fintech platforms delivered with company teams, open-source libraries and developer tools, products, and themes and design samples.' },
    ar: { name: 'الأعمال', title: 'الأعمال · عريب الزيوت · مشاريع حكومية ومالية ومفتوحة المصدر',
      description: 'كل مشاريع عريب الزيوت: منصات حكومية ومالية سعودية سُلّمت ضمن فرق الشركات، ومكتبات وأدوات مفتوحة المصدر للمطوّرين، ومنتجات، وثيمات وعيّنات تصميم.' },
  },
  about: {
    en: { name: 'About', title: 'About · Orieb Alzyuot · Senior Front-End & Full-Stack Engineer',
      description: 'How Orieb Alzyuot works: a 40-second intro video, skills with honest levels, a full career at Saudi Azm, Tahaluf, Shepherd and PenguinIN, education, and where to find her work online.' },
    ar: { name: 'نبذة', title: 'نبذة · عريب الزيوت · خبرة Senior في الواجهات الأمامية والتطوير المتكامل',
      description: 'كيف تعمل عريب الزيوت: فيديو تعريفي من 40 ثانية، ومهارات بمستويات صادقة، ومسيرة كاملة في عزم السعودية وتحالف الإمارات و Shepherd و PenguinIN، والتعليم، وأين تجد أعمالها على الإنترنت.' },
  },
  lab: {
    en: { name: 'Lab', title: 'Lab · Orieb Alzyuot · UI kit, playgrounds and open-source reports',
      description: 'A live, themeable UI kit, StackBlitz and CodePen playgrounds, and the pdf.js and PrimeNG issues Orieb Alzyuot reported upstream with reproductions.' },
    ar: { name: 'المختبر', title: 'المختبر · عريب الزيوت · مكتبة واجهات وساحات تجربة وبلاغات مفتوحة المصدر',
      description: 'مكتبة واجهات حيّة قابلة لتغيير الثيم، وساحات تجربة على StackBlitz و CodePen، وبلاغات pdf.js و PrimeNG التي رفعتها عريب الزيوت مع نماذج لإعادة الإنتاج.' },
  },
  writing: {
    en: { name: 'Writing', title: 'Writing · Orieb Alzyuot · Articles on front-end engineering',
      description: 'Articles by Orieb Alzyuot on micro-frontends, front-end security, accessibility, theming, SCSS, AI-assisted engineering and moving from Angular to React Native.' },
    ar: { name: 'المقالات', title: 'المقالات · عريب الزيوت · مقالات في هندسة الواجهات الأمامية',
      description: 'مقالات عريب الزيوت عن الواجهات المصغّرة، وأمان الواجهات الأمامية، وسهولة الوصول، والثيمات، و SCSS، والهندسة بمساعدة الذكاء الاصطناعي، والانتقال من Angular إلى React Native.' },
  },
  tutoring: {
    en: { name: 'Tutoring', title: 'Private tutoring · Physics & Chemistry · Orieb Alzyuot',
      description: 'Private physics and chemistry tutoring for Jordanian students in grade 10, grade 11 and Tawjihi, plus university intro courses (Circuits 1, Electronics 1, C++, Physics 1 and 2), online or in person, with Orieb G: interactive Arabic lessons, quizzes and short videos.' },
    ar: { name: 'دروس خصوصية', title: 'دروس خصوصية · فيزياء وكيمياء · عريب الزيوت',
      description: 'دروس خصوصية في الفيزياء والكيمياء لطلاب الصف العاشر والأول الثانوي والتوجيهي في الأردن، ومواد جامعية تمهيدية (دوائر كهربائية 1، إلكترونيات 1، C++، فيزياء 1 و2)، عن بُعد أو حضورياً، مع المعلمة Orieb G.' },
  },
};

export const pageSchema = (page: PageKey, lang: Lang) => {
  const pre = lang === 'ar' ? '/ar' : '';
  const url = `${SITE}${pre}/${page}/`;
  const type = page === 'about' ? 'AboutPage' : page === 'work' ? 'CollectionPage' : 'WebPage';
  return [
    { '@type': type, '@id': `${url}#page`, url, name: PAGE_META[page][lang].title, description: PAGE_META[page][lang].description, inLanguage: lang, about: { '@id': `${SITE}/#orieb` } },
    ...(page === 'about' ? [VIDEO_SCHEMA] : []),
    { '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: lang === 'ar' ? 'الرئيسية' : 'Home', item: `${SITE}${pre}/` },
      { '@type': 'ListItem', position: 2, name: PAGE_META[page][lang].name, item: url } ] },
  ];
};
