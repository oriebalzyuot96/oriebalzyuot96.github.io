# Orieb Alzyuot · Portfolio

Personal portfolio of **Orieb Alzyuot (عريب الزيوت)**, Senior Front-End & Full-Stack Engineer. Built with **Astro**.

**Live:** https://oriebalzyuot96.github.io · العربية: https://oriebalzyuot96.github.io/ar/
**Hire pages:** [Saudi Arabia](https://oriebalzyuot96.github.io/hire/saudi-arabia/) · [UAE](https://oriebalzyuot96.github.io/hire/uae/) · [Jordan](https://oriebalzyuot96.github.io/hire/jordan/) · [Freelance](https://oriebalzyuot96.github.io/hire/freelance/)

## Stack and structure
- **Astro 5, static output.** Every page is pre-rendered in English (`/`) and Arabic (`/ar/`, full RTL) with build-time i18n (`src/i18n/*.json`).
- `src/components/sections/*` holds the home sections. `src/components/HirePage.astro` renders market landing pages from `src/data/hire.ts`.
- `public/app.js` handles preferences, the command palette (`Ctrl+K`), modals and motion. `public/sound.js` adds synthesised UI sounds (Web Audio, ported from mashroo3hub).
- **Accessibility drawer** (`Ctrl+,`): theme, accent, text size, contrast (yellow, grayscale, invert), motion, readable font, link highlighting, spacing, cursor, language and sound.
- **SEO:** per-page titles and descriptions, hreflang, JSON-LD (Person, ProfilePage, Service, FAQPage, BreadcrumbList, VideoObject) and `@astrojs/sitemap`.

## Develop
```bash
npm install
npm run dev
```
Pushing to `main` deploys through `.github/workflows/deploy.yml`.

## Assets
- `tools/reel/`: the 40-second intro video (`render.mjs`, which needs ffmpeg) and its original synthesised soundtrack (`music.mjs`).
- `tools/cv/cv.html`: the source of `public/Orieb-Alzyuot-CV.pdf`.
