// Renders intro.html to assets/orieb-intro.mp4 + assets/intro-poster.jpg.
// Every CSS animation is paused and scrubbed to the exact frame time, so output is deterministic.
// Usage: npm i playwright-core && node render.mjs   (needs ffmpeg on PATH and a Playwright Chromium)
import { chromium } from 'playwright-core';
import { spawn } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const here = process.env.REEL_DIR || path.dirname(fileURLToPath(import.meta.url));
const assets = path.resolve(here, '../../assets');
const FPS = 30, DURATION = 40, W = 1280, H = 720;

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH });
const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
await page.goto(pathToFileURL(path.join(here, 'intro.html')).href, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.evaluate(() => document.getAnimations().forEach(a => a.pause()));
const seek = t => page.evaluate(ms => document.getAnimations().forEach(a => { a.currentTime = ms; }), t * 1000);

const ff = spawn('ffmpeg', ['-y', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-',
  '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-preset', 'slow', '-crf', '20', '-movflags', '+faststart',
  path.join(assets, 'orieb-intro.mp4')], { stdio: ['pipe', 'inherit', 'inherit'] });

for (let f = 0; f < FPS * DURATION; f++) {
  await seek(f / FPS);
  const buf = await page.screenshot({ type: 'jpeg', quality: 92 });
  if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
  if (f % 150 === 0) console.log(`frame ${f}/${FPS * DURATION}`);
}
ff.stdin.end();
await new Promise(r => ff.on('close', r));

await seek(4.2);
await page.screenshot({ path: path.join(assets, 'intro-poster.jpg'), type: 'jpeg', quality: 88 });
await browser.close();
console.log('done');
