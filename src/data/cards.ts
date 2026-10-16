/* Normalises projects.ts, tools.ts (developer tools + video apps) into one card model,
   so /work and the home page render every project with the same ProjectCard component. */
import { PROJECTS, hrefFor, type Part, type Media } from './projects';
import { TOOLS, VIDEO_APPS } from './tools';

export interface CardAction { kind: 'link' | 'shots'; href?: string; html: string; primary?: boolean }
export interface Card {
  id: string; part: Part | 'tool'; c: string; featured?: boolean;
  company?: { org: string; fe?: boolean }; org?: string;
  pill: [string, string];
  title: string; titleLtr?: boolean; altName?: string;
  summary: string; desc?: string; hl: string[]; float?: string;
  tags: string[];
  media: (Media & { video?: undefined }) | { kind: 'video'; bar: string; video: string; poster: string; alt: string };
  mediaAlt?: string;
  caseStudy?: { c: string; a: string[]; r: string };
  actions: CardAction[];
}

export function buildCards(t: (k: string) => string, isAr: boolean): Card[] {
  const fromProject = (p: (typeof PROJECTS)[number]): Card => ({
    id: p.id, part: p.part, c: p.c, featured: p.featured,
    company: p.company, org: p.company ? undefined : t(`${p.key}.org`),
    pill: [p.pill[0], t(p.pill[1])],
    title: t(`${p.key}.t`), altName: p.altName,
    summary: t(`${p.key}.s`), desc: t(`${p.key}.p`),
    hl: Array.from({ length: p.hl }, (_, i) => t(`${p.key}.h${i + 1}`)),
    float: p.float ? (p.float[0] ? `${p.float[0]} ` : '') + t(p.float[1]) : undefined,
    tags: p.tags,
    media: p.media, mediaAlt: p.media.alt ?? (p.media.altKey ? t(p.media.altKey) : ''),
    caseStudy: p.hasCase ? { c: t(`${p.key}.c`), a: [1, 2, 3].map(i => t(`${p.key}.a${i}`)), r: t(`${p.key}.r`) } : undefined,
    actions: p.actions.filter(a => a.kind !== 'case').map(a => ({ kind: a.kind as 'link' | 'shots', href: hrefFor(a.href, isAr), html: a.raw ?? t(a.label!), primary: a.primary })),
  });
  const fromVideo = (app: (typeof VIDEO_APPS)[number]): Card => {
    const L = isAr ? app.ar : app.en;
    return {
      id: `p-${app.id}`, part: app.group, c: app.group, featured: app.id === 'calm-plan',
      org: t('tool.org2'), pill: ['live', t('tool.pill')], title: L.title, summary: L.summary, desc: L.tagline, hl: [...L.points],
      float: t('vid.float'), tags: app.tags,
      media: { kind: 'video', bar: `github.com/oriebalzyuot96/${app.id}`, video: app.video, poster: `/assets/videos/${app.video.replace('-demo', '')}-poster.jpg`, alt: L.alt },
      actions: [
        ...(app.demo ? [{ kind: 'link' as const, href: isAr ? `${app.demo}?lang=ar` : app.demo, html: t('btn.live'), primary: true }] : []),
        { kind: 'link', href: `https://github.com/oriebalzyuot96/${app.id}`, html: 'GitHub ↗', primary: !app.demo },
      ],
    };
  };
  const fromTool = (tool: (typeof TOOLS)[number]): Card => {
    const L = isAr ? tool.ar : tool.en;
    return {
      id: `p-${tool.id}`, part: 'tool', c: 'tool', org: t('tool.org'), pill: ['live', t('tool.pill')],
      title: tool.id, titleLtr: true, summary: L.tagline, hl: [...L.points], float: t('tool.float'), tags: tool.tags,
      media: { kind: 'img', bar: `github.com/oriebalzyuot96/${tool.id}`, src: `/assets/tools/${tool.id}.svg`, w: 960, h: 540 }, mediaAlt: `${tool.id}: ${tool.cmd}`,
      actions: [{ kind: 'link', href: `https://github.com/oriebalzyuot96/${tool.id}`, html: 'GitHub ↗', primary: true }],
    };
  };
  const proj = (part: Part) => PROJECTS.filter(p => p.part === part).map(fromProject);
  return [
    ...proj('company'),
    ...proj('lib'),
    ...VIDEO_APPS.filter(a => a.group === 'lib').map(fromVideo),
    ...TOOLS.map(fromTool),
    ...VIDEO_APPS.filter(a => a.group === 'app').map(fromVideo),
    ...proj('app'),
    ...proj('theme'),
  ];
}
