import type { Lang } from '../i18n';

const SITE = 'https://oriebalzyuot96.github.io';

export const HOME_META: Record<Lang, { title: string; description: string }> = {
  en: {
    title: 'Orieb Alzyuot (عريب الزيوت) · Senior Front-End & Angular Developer · Freelance',
    description: 'Orieb Alzyuot, Senior Front-End & Full-Stack Engineer in Amman, Jordan. Angular, React, React Native, Astro, .NET and Node developer for Saudi government and fintech platforms. Hire for remote, freelance or relocation in Saudi Arabia, the UAE and Jordan.',
  },
  ar: {
    title: 'عريب الزيوت (Orieb Alzyuot) · مطور واجهات أمامية Senior و Angular · عمل حر',
    description: 'عريب الزيوت، خبرة Senior في تطوير الواجهات الأمامية والتطوير المتكامل من عمّان. Angular و React و React Native و Astro و .NET و Node لمنصات حكومية ومالية سعودية. متاح للعمل عن بُعد أو بنظام العمل الحر أو الانتقال إلى السعودية والإمارات والأردن.',
  },
};

export const homeSchema = (lang: Lang) => [
  { '@type': 'ProfilePage', '@id': `${SITE}${lang === 'ar' ? '/ar/' : '/'}#page`, url: `${SITE}${lang === 'ar' ? '/ar/' : '/'}`, name: HOME_META[lang].title, inLanguage: lang, mainEntity: { '@id': `${SITE}/#orieb` }, dateModified: '2026-10-08' },
  { '@type': 'ProfessionalService', '@id': `${SITE}/#freelance`, name: 'Orieb Alzyuot · Freelance Senior Front-End & Angular Development', provider: { '@id': `${SITE}/#orieb` },
    areaServed: [{ '@type': 'Country', name: 'Saudi Arabia' }, { '@type': 'Country', name: 'United Arab Emirates' }, { '@type': 'Country', name: 'Jordan' }, 'Worldwide (remote)'],
    availableLanguage: ['Arabic', 'English'], url: `${SITE}/hire/` },
  { '@type': 'VideoObject', name: 'Orieb Alzyuot · 40-second intro', description: 'Motion intro with original music: Senior Front-End & Full-Stack Engineer, platforms shipped, stack and principles.',
    thumbnailUrl: `${SITE}/assets/intro-poster.jpg`, contentUrl: `${SITE}/assets/orieb-intro.mp4`, uploadDate: '2026-10-08', duration: 'PT40S' },
];
