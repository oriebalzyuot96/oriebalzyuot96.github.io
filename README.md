# Orieb Alzyuot · Portfolio

Personal portfolio of **Orieb Alzyuot (عريب الزيوت)**, Senior Front-End & Full-Stack Engineer.

**Live:** https://oriebalzyuot96.github.io · Arabic: https://oriebalzyuot96.github.io/?lang=ar

## What's inside
- **Hand-built:** semantic HTML, CSS custom properties and vanilla JS. No framework, no build step.
- **Bilingual:** English and Arabic with a full RTL layout (`i18n.ar.js`, logical CSS properties throughout).
- **Accessibility drawer** (`Ctrl + ,`), with the same preference contract as mashroo3hub: theme, accent, text size, contrast modes (yellow, grayscale, invert), motion, readable font, link highlighting, wide spacing and a large cursor.
- **Command palette** (`Ctrl + K`), case-study modals, project filters, and a live Amman clock.
- **Motion:** splash, staggered hero, bento pop-in, starfield, magnetic buttons, 3D tilt and a scroll-filled timeline. All of it switches off under reduced motion.
- **Intro video:** a 40-second motion reel (`assets/orieb-intro.{webm,mp4}`) with EN/AR captions.
- **SEO:** JSON-LD (Person, ProfilePage, ProfessionalService, VideoObject), hreflang, a sitemap and robots.txt.

## Regenerating assets
```bash
cd tools/reel && npm i playwright-core && node render.mjs   # video + poster (needs ffmpeg)
```
The CV source is `tools/cv/cv.html`. Print it to A4 to produce `Orieb-Alzyuot-CV.pdf`.
