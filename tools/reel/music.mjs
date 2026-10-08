// Original 40 s soundtrack for the intro reel. Pure synthesis: no samples, no licensed audio.
// Dreamy lo-fi in D major at 96 BPM; drums enter with scene 2, hats with scene 3, and a soft
// riser marks each scene change (6, 12, 19, 26, 32, 36.5 s). Writes music.wav (44.1 kHz, 16-bit stereo).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SR = 44100, DUR = 40, N = SR * DUR;
const L = new Float32Array(N), R = new Float32Array(N);
const BPM = 96, BEAT = 60 / BPM, BAR = BEAT * 4;
const hz = m => 440 * 2 ** ((m - 69) / 12);
let seed = 7; const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647) * 2 - 1;

function add(t0, buf, pan = 0, gain = 1) {
  const s = Math.floor(t0 * SR), gl = Math.cos((pan + 1) * Math.PI / 4) * gain, gr = Math.sin((pan + 1) * Math.PI / 4) * gain;
  for (let i = 0; i < buf.length && s + i < N; i++) if (s + i >= 0) { L[s + i] += buf[i] * gl; R[s + i] += buf[i] * gr; }
}
function env(i, n, a, r) { const t = i / SR, d = n / SR; return Math.min(1, t / a) * Math.min(1, Math.max(0, (d - t) / r)); }

// chords (MIDI): Dmaj9, Bm9, Gmaj7(#11), Asus2/A, each 2 bars
const CHORDS = [[50, 57, 61, 64, 66], [47, 54, 57, 61, 62], [43, 54, 57, 59, 61], [45, 52, 57, 59, 64]];
function pad(notes, t0, d) {
  const n = Math.floor(d * SR), out = new Float32Array(n);
  for (const m of notes.slice(1)) {
    const f = hz(m + 12);
    for (const det of [-0.11, 0.0, 0.13]) {
      const fr = f * 2 ** (det / 12); let lp = 0;
      for (let i = 0; i < n; i++) {
        const ph = (i / SR) * fr;
        const tri = 4 * Math.abs(ph - Math.floor(ph + 0.5)) - 1;
        const raw = 0.7 * Math.sin(2 * Math.PI * ph) + 0.3 * tri;
        lp += 0.08 * (raw - lp);
        out[i] += lp * env(i, n, 0.9, 1.1) * 0.035;
      }
    }
  }
  return out;
}
function pluck(m, d = 0.5, g = 0.16) {
  const n = Math.floor(d * SR), out = new Float32Array(n), f = hz(m);
  for (let i = 0; i < n; i++) { const t = i / SR; out[i] = (Math.sin(2 * Math.PI * f * t) + 0.35 * Math.sin(4 * Math.PI * f * t) + 0.1 * Math.sin(6 * Math.PI * f * t)) * Math.exp(-t * 7) * Math.min(1, t / 0.004) * g; }
  return out;
}
function bass(m, d) {
  const n = Math.floor(d * SR), out = new Float32Array(n), f = hz(m - 12);
  for (let i = 0; i < n; i++) { const t = i / SR; out[i] = (Math.sin(2 * Math.PI * f * t) + 0.25 * Math.sin(4 * Math.PI * f * t)) * env(i, n, 0.02, 0.25) * 0.2; }
  return out;
}
function kick() {
  const n = Math.floor(0.35 * SR), out = new Float32Array(n); let ph = 0;
  for (let i = 0; i < n; i++) { const t = i / SR, f = 45 + 85 * Math.exp(-t * 30); ph += f / SR; out[i] = Math.sin(2 * Math.PI * ph) * Math.exp(-t * 9) * 0.55; }
  return out;
}
function hat(d = 0.05, g = 0.05) {
  const n = Math.floor(d * SR), out = new Float32Array(n); let prev = 0;
  for (let i = 0; i < n; i++) { const x = rnd(); out[i] = (x - prev) * Math.exp(-(i / SR) * 70) * g; prev = x; }
  return out;
}
function clap() {
  const n = Math.floor(0.22 * SR), out = new Float32Array(n); let lp = 0;
  for (let i = 0; i < n; i++) { const t = i / SR; lp += 0.35 * (rnd() - lp); const burst = t < 0.03 ? (Math.floor(t / 0.01) % 2 ? 0.6 : 1) : 1; out[i] = lp * Math.exp(-t * 18) * burst * 0.16; }
  return out;
}
function riser(d = 1.1) {
  const n = Math.floor(d * SR), out = new Float32Array(n); let lp = 0;
  for (let i = 0; i < n; i++) { const p = i / n, c = 0.02 + 0.5 * p * p; lp += c * (rnd() - lp); out[i] = lp * p * p * 0.22 * (1 - Math.max(0, (p - 0.92) / 0.08)); }
  return out;
}
function sparkle(t0) { [86, 90, 93, 98].forEach((m, i) => add(t0 + i * 0.09, pluck(m, 1.2, 0.07), i % 2 ? 0.5 : -0.5)); }

// arrangement
for (let bar = 0; bar * BAR < DUR; bar++) {
  const t = bar * BAR, ch = CHORDS[Math.floor(bar / 2) % 4];
  if (bar % 2 === 0) add(t, pad(ch, t, BAR * 2 + 0.6), 0, 1);
  if (t >= 2.5) add(t, bass(ch[0], BAR * 0.95), 0, 1);
  if (t >= 4.5) for (let s = 0; s < 8; s++) {            // eighth-note arpeggio
    const m = ch[[1, 2, 3, 4, 3, 2, 4, 1][s]] + 12;
    add(t + s * BEAT / 2, pluck(m), s % 2 ? 0.35 : -0.35, t >= 36.5 ? 0.6 : 1);
  }
  if (t >= 6 && t < 36) for (let b = 0; b < 4; b++) {
    if (b % 2 === 0) add(t + b * BEAT, kick());
    if (t >= 19 && b % 2 === 1) add(t + b * BEAT, clap(), 0.1);
    if (t >= 12) { add(t + b * BEAT + BEAT / 2, hat(), 0.3); if (t >= 26) add(t + b * BEAT + BEAT * 0.75, hat(0.03, 0.03), -0.3); }
  }
}
for (const s of [6, 12, 19, 26, 32, 36.5]) add(s - 1.1, riser(), 0, 0.9);
sparkle(0.4); sparkle(36.6);

// stereo echo (dotted eighth) for space
const dl = Math.floor(BEAT * 0.75 * SR);
for (let i = dl; i < N; i++) { L[i] += R[i - dl] * 0.22; R[i] += L[i - dl] * 0.22; }

// master: fades, gentle soft-clip, normalise
let peak = 0;
for (let i = 0; i < N; i++) {
  const t = i / SR, fade = Math.min(1, t / 1.2) * Math.min(1, (DUR - t) / 3);
  L[i] = Math.tanh(L[i] * 1.2) * fade; R[i] = Math.tanh(R[i] * 1.2) * fade;
  peak = Math.max(peak, Math.abs(L[i]), Math.abs(R[i]));
}
const norm = 0.85 / peak, buf = Buffer.alloc(44 + N * 4);
buf.write('RIFF', 0); buf.writeUInt32LE(36 + N * 4, 4); buf.write('WAVEfmt ', 8); buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20); buf.writeUInt16LE(2, 22);
buf.writeUInt32LE(SR, 24); buf.writeUInt32LE(SR * 4, 28); buf.writeUInt16LE(4, 32); buf.writeUInt16LE(16, 34); buf.write('data', 36); buf.writeUInt32LE(N * 4, 40);
for (let i = 0; i < N; i++) { buf.writeInt16LE(Math.round(L[i] * norm * 32767), 44 + i * 4); buf.writeInt16LE(Math.round(R[i] * norm * 32767), 46 + i * 4); }
const out = path.join(process.env.OUT_DIR || path.dirname(fileURLToPath(import.meta.url)), 'music.wav');
fs.writeFileSync(out, buf);
console.log('wrote', out);
