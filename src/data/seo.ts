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
  { '@type': 'ProfilePage', '@id': `${SITE}${lang === 'ar' ? '/ar/' : '/'}#page`, url: `${SITE}${lang === 'ar' ? '/ar/' : '/'}`, name: HOME_META[lang].title, inLanguage: lang, mainEntity: { '@id': `${SITE}/#orieb` }, dateModified: '2026-10-08' },
  { '@type': 'ProfessionalService', '@id': `${SITE}/#freelance`, name: 'Orieb Alzyuot · Freelance Senior Front-End & Angular Development', provider: { '@id': `${SITE}/#orieb` },
    areaServed: ['Worldwide (remote)', { '@type': 'Country', name: 'Saudi Arabia' }, { '@type': 'Country', name: 'United Arab Emirates' }, { '@type': 'Country', name: 'Jordan' }],
    availableLanguage: ['Arabic', 'English'], url: `${SITE}/hire/` },
  { '@type': 'VideoObject', name: 'Orieb Alzyuot · 40-second intro', description: 'Motion intro with original music: Senior Front-End & Full-Stack Engineer, platforms shipped, stack and principles.',
    thumbnailUrl: `${SITE}/assets/intro-poster.jpg`, contentUrl: `${SITE}/assets/orieb-intro.mp4`, uploadDate: '2026-10-08', duration: 'PT40S' },
];
