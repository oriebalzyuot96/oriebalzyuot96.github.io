// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://oriebalzyuot96.github.io',
  trailingSlash: 'always',
  devToolbar: { enabled: false },
  build: { format: 'directory' },
  // Plain <pre><code> for Markdown posts: Medium's importer drops Shiki's inline-styled blocks.
  // A tiny client-side highlighter (src/scripts/blog-enhance.ts) colours them after load.
  markdown: { syntaxHighlight: false },
  i18n: { defaultLocale: 'en', locales: ['en', 'ar'], routing: { prefixDefaultLocale: false } },
  integrations: [sitemap({ i18n: { defaultLocale: 'en', locales: { en: 'en', ar: 'ar' } } })],
});
