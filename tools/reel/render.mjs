// Renders intro.html to public/assets/orieb-intro.{mp4,webm} + intro-poster.jpg.
// Every CSS animation is paused and scrubbed to the exact frame time, so output is deterministic.
// Usage: npm i playwright-core && node render.mjs            (full render; needs ffmpeg on PATH)
//        node render.mjs sheet                               (contact sheet of 10 frames → sheet.jpg)
// Env: REEL_DIR (folder with intro.html), FRAMES_DIR (temp frames), CHROMIUM_PATH (optional).
//
// Encoding: frames are JPEG (full-range YUV), so both encodes convert to TV range yuv420p explicitly.
// A full-range (yuvj420p) H.264 file does not play in Safari / iOS.
import { chromium } from 'playwright-core';
import { spawnSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const here = process.env.REEL_DIR || path.dirname(fileURLToPath(import.meta.url));
const assets = path.resolve(here, '../../public/assets');
const FPS = 30, DURATION = 40, W = 1280, H = 720;
const mode = process.argv[2] || 'full';
const frames = process.env.FRAMES_DIR || path.join(os.tmpdir(), 'orieb-reel-frames');

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH });
const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
await page.goto(pathToFileURL(path.join(here, 'intro.html')).href, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.evaluate(() => Promise.all([...document.images].map(i => i.decode().catch(() => {}))));
await page.evaluate(() => document.getAnimations().forEach(a => a.pause()));
const seek = t => page.evaluate(ms => document.getAnimations().forEach(a => { a.currentTime = ms; }), t * 1000);
const run = (cmd, args) => { const r = spawnSync(cmd, args, { stdio: 'inherit' }); if (r.status !== 0) throw new Error(`${cmd} failed`); };

if (mode === 'sheet') {
  const dir = path.join(frames, 'sheet'); fs.mkdirSync(dir, { recursive: true });
  const times = [2.6, 4.8, 8.5, 14.5, 20.5, 26.5, 28.4, 31.8, 35.5, 39.5];
  for (const [i, t] of times.entries()) { await seek(t); await page.screenshot({ path: path.join(dir, `s${i}.jpg`), type: 'jpeg', quality: 85 }); }
  await browser.close();
  run('ffmpeg', ['-y', '-loglevel', 'error', '-i', path.join(dir, 's%d.jpg'), '-vf', 'scale=640:-1,tile=2x5:padding=6', '-frames:v', '1', path.join(here, 'sheet.jpg')]);
  console.log('sheet →', path.join(here, 'sheet.jpg'));
  process.exit(0);
}

fs.rmSync(frames, { recursive: true, force: true }); fs.mkdirSync(frames, { recursive: true });
for (let f = 0; f < FPS * DURATION; f++) {
  await seek(f / FPS);
  await page.screenshot({ path: path.join(frames, `f${String(f).padStart(4, '0')}.jpg`), type: 'jpeg', quality: 93 });
  if (f % 150 === 0) console.log(`frame ${f}/${FPS * DURATION}`);
}
await seek(2.6);
await page.screenshot({ path: path.join(assets, 'intro-poster.jpg'), type: 'jpeg', quality: 86 });
await browser.close();

// soundtrack (original synthesis, see music.mjs)
run(process.execPath, [path.join(here, 'music.mjs')]);
const wav = path.join(process.env.OUT_DIR || here, 'music.wav');
const input = ['-y', '-loglevel', 'error', '-framerate', String(FPS), '-i', path.join(frames, 'f%04d.jpg'), '-i', wav, '-t', String(DURATION), '-shortest'];
const vf = ['-vf', 'scale=in_range=full:out_range=tv,format=yuv420p'];
run('ffmpeg', [...input, ...vf, '-c:v', 'libx264', '-profile:v', 'high', '-level', '4.0', '-preset', 'slow', '-crf', '21',
  '-color_range', 'tv', '-colorspace', 'bt709', '-color_primaries', 'bt709', '-color_trc', 'bt709',
  '-c:a', 'aac', '-b:a', '160k', '-ar', '44100', '-movflags', '+faststart', path.join(assets, 'orieb-intro.mp4')]);
run('ffmpeg', [...input, ...vf, '-c:v', 'libvpx-vp9', '-b:v', '0', '-crf', '34', '-row-mt', '1', '-deadline', 'good', '-cpu-used', '2', '-g', '60',
  '-c:a', 'libopus', '-b:a', '128k', path.join(assets, 'orieb-intro.webm')]);
console.log('done');
