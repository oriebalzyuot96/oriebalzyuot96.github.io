import type { Lang } from '../i18n';

type T = Record<Lang, string>;
export interface Region {
  slug: string; flag: string; country?: string;
  metaTitle: T; metaDesc: T; h1: T; lede: T;
  why: { icon: string; title: T; text: T }[];
  faq: { q: T; a: T }[];
}

/* Shared blocks */
export const SERVICES: { icon: string; title: T; text: T }[] = [
  { icon: '🔁', title: { en: 'Angular migration', ar: 'ترحيل Angular' }, text: { en: 'AngularJS or legacy Angular to Angular 21 with standalone components and Signals, without freezing feature work.', ar: 'من AngularJS أو الإصدارات القديمة إلى Angular 21 مع المكوّنات المستقلة و Signals، دون إيقاف تطوير الميزات.' } },
  { icon: '🏗️', title: { en: 'Front-end architecture', ar: 'معمارية الواجهات الأمامية' }, text: { en: 'Design systems, tokens, typed API contracts and CI/CD for large Angular, React or Astro codebases.', ar: 'أنظمة تصميم ورموز وعقود API محددة الأنواع وتكامل مستمر لمشاريع Angular و React و Astro الكبيرة.' } },
  { icon: '📱', title: { en: 'React Native apps', ar: 'تطبيقات React Native' }, text: { en: 'Expo / React Native apps sharing logic and design tokens with your web platform.', ar: 'تطبيقات Expo / React Native تتشارك المنطق ورموز التصميم مع منصتك على الويب.' } },
  { icon: '♿', title: { en: 'Accessibility & Arabic RTL', ar: 'إمكانية الوصول والعربية' }, text: { en: 'WCAG audits and fixes, and Arabic-first RTL interfaces that feel native.', ar: 'تدقيق وإصلاح وفق WCAG، وواجهات عربية أصيلة من اليمين لليسار.' } },
];
export const MODELS: { title: T; text: T }[] = [
  { title: { en: 'Full-time (remote or relocation)', ar: 'دوام كامل (عن بُعد أو انتقال)' }, text: { en: 'Senior or lead front-end role inside your team.', ar: 'دور Senior أو Lead في الواجهات الأمامية ضمن فريقك.' } },
  { title: { en: 'Contract', ar: 'تعاقد' }, text: { en: 'Monthly engagement for a platform build or modernisation.', ar: 'تعاقد شهري لبناء منصة أو تحديثها.' } },
  { title: { en: 'Freelance / fixed scope', ar: 'عمل حر / نطاق محدد' }, text: { en: 'A defined deliverable: migration, audit, design system or app.', ar: 'مخرَج محدد: ترحيل أو تدقيق أو نظام تصميم أو تطبيق.' } },
];

const commonFaq = (place: T): { q: T; a: T }[] => [
  { q: { en: `Can you start remotely with a team in ${place.en}?`, ar: `هل يمكنك البدء عن بُعد مع فريق في ${place.ar}؟` },
    a: { en: 'Yes. I work from Amman (GMT+3) and have delivered remotely for Saudi and UAE teams since 2023, joining standups, code review and sprint planning in your working hours.', ar: 'نعم. أعمل من عمّان (GMT+3) وأسلّم عن بُعد لفرق سعودية وإماراتية منذ 2023، مع حضور الاجتماعات اليومية ومراجعة الكود وتخطيط السبرنت في ساعات عملكم.' } },
  { q: { en: 'Which stacks do you take on?', ar: 'ما التقنيات التي تعمل بها؟' },
    a: { en: 'Angular (AngularJS to v22, Signals) is my deepest; also React, Next.js, Astro, Svelte and React Native, with .NET Core and Node.js services on Azure.', ar: 'Angular (من AngularJS حتى v22 مع Signals) هو الأعمق، إضافة إلى React و Next.js و Astro و Svelte و React Native، مع خدمات .NET Core و Node.js على Azure.' } },
  { q: { en: 'Do you build Arabic RTL and accessible interfaces?', ar: 'هل تبني واجهات عربية وسهلة الوصول؟' },
    a: { en: 'Yes. Arabic-first RTL and WCAG are part of every platform I ship, including live Saudi government services.', ar: 'نعم. العربية من اليمين لليسار ومعايير WCAG جزء من كل منصة أسلّمها، ومنها خدمات حكومية سعودية فعّالة.' } },
  { q: { en: 'How do we start?', ar: 'كيف نبدأ؟' },
    a: { en: 'Email alzuotorieb9999@gmail.com or WhatsApp +962 77585 3203 with the scope and timeline. I reply within one working day.', ar: 'راسلني على alzuotorieb9999@gmail.com أو واتساب ‎+962 77585 3203 مع النطاق والجدول الزمني، وأرد خلال يوم عمل.' } },
];

export const REGIONS: Region[] = [
  {
    slug: 'freelance', flag: '🌍',
    metaTitle: { en: 'Freelance Senior Front-End & Angular Developer (Remote, GCC & Worldwide) · Orieb Alzyuot', ar: 'مطور واجهات أمامية و Angular مستقل بخبرة Senior (عن بُعد، الخليج والعالم) · عريب الزيوت' },
    metaDesc: { en: 'Freelance Senior Front-End developer for Angular migrations, front-end architecture, React Native apps, Astro sites and WCAG / Arabic RTL audits. Remote for Saudi Arabia, the UAE, Jordan, Europe and beyond.', ar: 'مطور واجهات أمامية مستقل بخبرة Senior: ترحيل Angular ومعمارية الواجهات وتطبيقات React Native ومواقع Astro وتدقيق WCAG والعربية. عن بُعد للسعودية والإمارات والأردن وأوروبا وغيرها.' },
    h1: { en: 'Freelance Senior Front-End Developer', ar: 'مطور واجهات أمامية مستقل بخبرة Senior' },
    lede: { en: 'Need senior front-end help without a long hiring cycle? I take on fixed-scope projects and monthly contracts, remote, in English or Arabic.', ar: 'تحتاج خبرة Senior في الواجهات الأمامية دون دورة توظيف طويلة؟ أعمل على مشاريع محددة النطاق وعقود شهرية، عن بُعد، بالعربية أو الإنجليزية.' },
    why: [
      { icon: '🚀', title: { en: 'Production-proven', ar: 'مُجرّب في الإنتاج' }, text: { en: '10 platforms shipped, including live national services and a SAMA-licensed fintech.', ar: '10 منصات مُسلّمة، منها خدمات وطنية فعّالة ومنصة مالية مرخّصة من ساما.' } },
      { icon: '🧾', title: { en: 'Clear scope', ar: 'نطاق واضح' }, text: { en: 'Written scope, milestones and a demo at each step. No surprises.', ar: 'نطاق مكتوب ومراحل وعرض في كل خطوة، بلا مفاجآت.' } },
      { icon: '🌍', title: { en: 'Bilingual', ar: 'ثنائي اللغة' }, text: { en: 'Native Arabic, professional English, and RTL done right.', ar: 'عربية أم، وإنجليزية مهنية، وواجهات من اليمين لليسار كما يجب.' } },
    ],
    faq: commonFaq({ en: 'your country', ar: 'بلدك' }),
  },
  {
    slug: 'saudi-arabia', flag: 'KSA', country: 'Saudi Arabia',
    metaTitle: { en: 'Hire a Senior Front-End Developer in Saudi Arabia (Angular, Remote / Freelance) · Orieb Alzyuot', ar: 'توظيف مطور واجهات أمامية Senior في السعودية (Angular، عن بُعد / عمل حر) · عريب الزيوت' },
    metaDesc: { en: 'Senior Front-End & Angular developer who has shipped Saudi government and fintech platforms: Saudi Bar Association, Meerath (Ministry of Justice), Engineering Arbitration and the SAMA-licensed Wasl. Available remote, freelance or for relocation to Riyadh.', ar: 'خبرة Senior في الواجهات الأمامية و Angular مع منصات حكومية ومالية سعودية: الهيئة السعودية للمحامين وميراث (وزارة العدل) والتحكيم الهندسي ومنصة وصل المرخّصة من ساما. متاح عن بُعد أو بنظام العمل الحر أو الانتقال إلى الرياض.' },
    h1: { en: 'Hire a Senior Front-End Developer for your Saudi platform', ar: 'وظّف خبرة Senior في الواجهات الأمامية لمنصتك السعودية' },
    lede: { en: 'Since 2023 I have led front-end architecture on Saudi government and fintech platforms with Saudi Azm. I know Nafath sign-in flows, Arabic-first UX and the security bar these services need.', ar: 'منذ 2023 أقود معمارية الواجهات الأمامية لمنصات حكومية ومالية سعودية مع عزم السعودية، وأعرف مسارات الدخول عبر نفاذ وتجربة المستخدم العربية أولًا ومستوى الأمان الذي تتطلبه هذه الخدمات.' },
    why: [
      { icon: '🏛️', title: { en: 'Saudi government delivery', ar: 'خبرة حكومية سعودية' }, text: { en: 'Saudi Bar Association complaints service, Meerath (the Ministry of Justice estates platform) and the Saudi Engineering Arbitration Center.', ar: 'خدمة الشكاوى في الهيئة السعودية للمحامين، ومنصة ميراث التابعة لوزارة العدل، ومركز التحكيم الهندسي السعودي.' } },
      { icon: '💸', title: { en: 'Fintech under SAMA', ar: 'تقنية مالية تحت إشراف ساما' }, text: { en: 'Wasl, a digital financing brokerage (Saudi Azm × National Housing Co.) licensed by SAMA in 2026.', ar: 'وصل، منصة وساطة تمويل رقمية (عزم × الوطنية للإسكان) مرخّصة من ساما في 2026.' } },
      { icon: '🕒', title: { en: 'Same working hours', ar: 'نفس ساعات العمل' }, text: { en: 'Amman is GMT+3, identical to Riyadh. Real-time collaboration, no handover lag.', ar: 'عمّان على توقيت GMT+3 مثل الرياض تمامًا: تعاون لحظي بلا تأخير.' } },
    ],
    faq: commonFaq({ en: 'Saudi Arabia', ar: 'السعودية' }),
  },
  {
    slug: 'uae', flag: 'UAE', country: 'United Arab Emirates',
    metaTitle: { en: 'Hire a Senior Front-End Developer in the UAE (Dubai, Abu Dhabi · Angular, Remote / Freelance) · Orieb Alzyuot', ar: 'توظيف مطور واجهات أمامية Senior في الإمارات (دبي، أبوظبي · Angular، عن بُعد / عمل حر) · عريب الزيوت' },
    metaDesc: { en: 'Senior Front-End & Angular developer with UAE government and enterprise experience (Tahaluf Al Emarat low-code platform). Remote, contract or freelance for Dubai and Abu Dhabi teams; open to relocation.', ar: 'خبرة Senior في الواجهات الأمامية و Angular مع جهات حكومية ومؤسسية إماراتية (منصة تحالف الإمارات منخفضة الكود). عن بُعد أو تعاقد أو عمل حر لفرق دبي وأبوظبي، مع إمكانية الانتقال.' },
    h1: { en: 'Hire a Senior Front-End Developer for your UAE team', ar: 'وظّف خبرة Senior في الواجهات الأمامية لفريقك في الإمارات' },
    lede: { en: 'I built core modules of a low-code automation platform for UAE government and enterprise at Tahaluf Al Emarat, and I now ship Gulf platforms remotely every day.', ar: 'بنيت وحدات أساسية لمنصة أتمتة منخفضة الكود للحكومة والمؤسسات في الإمارات مع تحالف الإمارات، وأسلّم اليوم منصات خليجية عن بُعد بشكل يومي.' },
    why: [
      { icon: '🏙️', title: { en: 'UAE platform experience', ar: 'خبرة بمنصات إماراتية' }, text: { en: 'Form and workflow designers in Angular 16 + PrimeNG for Tahaluf Al Emarat.', ar: 'مصمّمات النماذج وسير العمل بـ Angular 16 و PrimeNG لصالح تحالف الإمارات.' } },
      { icon: '⚡', title: { en: 'Performance focus', ar: 'تركيز على الأداء' }, text: { en: 'Cut initial load and memory overhead on data-heavy enterprise apps.', ar: 'تقليل زمن التحميل واستهلاك الذاكرة في التطبيقات المؤسسية الثقيلة.' } },
      { icon: '🕒', title: { en: 'One hour from Dubai', ar: 'ساعة واحدة عن دبي' }, text: { en: 'GMT+3 against GMT+4, which leaves a full shared working day.', ar: 'GMT+3 مقابل GMT+4: يوم عمل مشترك كامل.' } },
    ],
    faq: commonFaq({ en: 'the UAE', ar: 'الإمارات' }),
  },
  {
    slug: 'jordan', flag: 'JOR', country: 'Jordan',
    metaTitle: { en: 'Hire a Senior Front-End Developer in Jordan (Amman · Angular, React, Freelance) · Orieb Alzyuot', ar: 'توظيف مطور واجهات أمامية Senior في الأردن (عمّان · Angular و React، عمل حر) · عريب الزيوت' },
    metaDesc: { en: 'Amman-based Senior Front-End & Full-Stack developer: 6+ years with Angular, React and React Native at Saudi Azm, Tahaluf, Shepherd and PenguinIN. Available on-site in Amman, hybrid, remote or freelance.', ar: 'خبرة Senior في الواجهات الأمامية والتطوير المتكامل من عمّان: أكثر من 6 سنوات مع Angular و React و React Native في عزم وتحالف و Shepherd و PenguinIN. متاح حضوريًا في عمّان أو هجينًا أو عن بُعد أو بنظام العمل الحر.' },
    h1: { en: 'Hire a Senior Front-End Developer in Amman, Jordan', ar: 'وظّف خبرة Senior في الواجهات الأمامية في عمّان' },
    lede: { en: 'I have built products in Amman since 2020: an HR and e-learning suite across AngularJS, Angular 8 and 14 at Shepherd, an indoor-navigation CMS at PenguinIN, and now Saudi platforms with Saudi Azm.', ar: 'أبني منتجات في عمّان منذ 2020: منظومة موارد بشرية وتعليم إلكتروني عبر AngularJS و Angular 8 و 14 في Shepherd، ونظام إدارة محتوى للملاحة الداخلية في PenguinIN، واليوم منصات سعودية مع عزم.' },
    why: [
      { icon: '📍', title: { en: 'Local and available', ar: 'محلي ومتاح' }, text: { en: 'On-site, hybrid or remote in Amman, with no relocation or visa delays.', ar: 'حضوري أو هجين أو عن بُعد في عمّان، بلا تأخير انتقال أو تأشيرات.' } },
      { icon: '🔁', title: { en: 'Every Angular era', ar: 'كل أجيال Angular' }, text: { en: 'From AngularJS through Angular 8, 14 and 16 to 21/22 with Signals.', ar: 'من AngularJS مرورًا بـ Angular 8 و 14 و 16 حتى 21/22 مع Signals.' } },
      { icon: '🎓', title: { en: 'Strong foundations', ar: 'أساس قوي' }, text: { en: 'B.Sc. Communication & Software Engineering, Al-Balqa Applied University: ranked 2nd in class.', ar: 'بكالوريوس هندسة الاتصالات والبرمجيات من جامعة البلقاء التطبيقية، الثاني على الدفعة.' } },
    ],
    faq: commonFaq({ en: 'Jordan', ar: 'الأردن' }),
  }
];

export const HIRE_INDEX = {
  metaTitle: { en: 'Hire Orieb Alzyuot · Senior Front-End Developer in Saudi Arabia, UAE, Jordan or Freelance', ar: 'وظّف عريب الزيوت · واجهات أمامية Senior في السعودية والإمارات والأردن أو عمل حر' } as T,
  metaDesc: { en: 'Hire a Senior Front-End & Angular developer for Saudi Arabia, the UAE or Jordan: full-time, contract or freelance. Remote, hybrid or relocation.', ar: 'وظّف خبرة Senior في الواجهات الأمامية و Angular للسعودية أو الإمارات أو الأردن: دوام كامل أو تعاقد أو عمل حر، عن بُعد أو هجين أو بالانتقال.' } as T,
  h1: { en: 'Hire me as your Senior Front-End Developer', ar: 'وظّفني كخبرة Senior في الواجهات الأمامية' } as T,
  lede: { en: 'Pick your market. Each page explains the relevant experience, how we can work together, and answers common questions.', ar: 'اختر سوقك: كل صفحة تشرح الخبرة ذات الصلة وطرق التعاون وتجيب على الأسئلة الشائعة.' } as T,
};

export const UI: Record<string, T> = {
  why: { en: 'Why me', ar: 'لماذا أنا' },
  services: { en: 'What I can do for you', ar: 'ما يمكنني تقديمه' },
  models: { en: 'Ways to work together', ar: 'طرق التعاون' },
  faq: { en: 'Frequently asked questions', ar: 'أسئلة شائعة' },
  cta: { en: 'Email me about your project', ar: 'راسلني بخصوص مشروعك' },
  wa: { en: 'WhatsApp', ar: 'واتساب' },
  cv: { en: 'Download CV', ar: 'تحميل السيرة الذاتية' },
  work: { en: 'See my work', ar: 'شاهد أعمالي' },
  markets: { en: 'Other markets', ar: 'أسواق أخرى' },
  kicker: { en: 'hire me', ar: 'وظّفني' },
  crumbHome: { en: 'Home', ar: 'الرئيسية' },
  crumbHire: { en: 'Hire', ar: 'التوظيف' },
};
export const regionName: Record<string, T> = {
  'saudi-arabia': { en: 'Saudi Arabia', ar: 'السعودية' }, uae: { en: 'UAE', ar: 'الإمارات' }, jordan: { en: 'Jordan', ar: 'الأردن' }, freelance: { en: 'Freelance / remote', ar: 'عمل حر / عن بُعد' },
};
