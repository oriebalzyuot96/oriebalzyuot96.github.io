/* UI sounds, ported from mashroo3hub's UiSoundService: synthesised with Web Audio, so no audio files.
   Cues: tick (buttons/links), switch (toggles), pop, step, success, whoosh (panels), error.
   On by default on desktop (fine pointer), off on touch. The visitor's choice persists. */
(() => {
  'use strict';
  const INTERACTIVE = 'button, a, [role="button"], [role="tab"], [role="switch"], [role="radio"], [role="option"], .frame[data-full]';
  const SWITCH_LIKE = '[role="switch"], [role="radio"], [role="tab"]';
  const MASTER_GAIN = 0.55, MASTER_LOWPASS_HZ = 5200;
  const SWEEPS = {
    tick: { f0: 1250, f1: 820, d: 0.05, g: 0.045, body: 0.35 },
    pop: { f0: 460, f1: 780, d: 0.13, g: 0.065, body: 0.5, room: true },
    switch: { f0: 700, f1: 1050, d: 0.08, g: 0.05, type: 'triangle', body: 0.3 },
  };
  const SUCCESS_NOTES = [523.25, 659.25, 783.99];
  const VARIED = new Set(['tick', 'switch', 'pop']);
  const REPEAT_GAP_MS = 45, CUE_GAP_MS = 90;
  const KEY = 'oa-sound';

  let ctx = null, master = null, room = null, noiseBuf = null;
  const lastAt = new Map();
  const deskDefault = () => { try { return matchMedia('(hover: hover) and (pointer: fine)').matches; } catch (e) { return false; } };
  let enabled;
  try { const s = localStorage.getItem(KEY); enabled = s === '1' ? true : s === '0' ? false : deskDefault(); } catch (e) { enabled = deskDefault(); }

  const audio = () => ctx || (ctx = new (window.AudioContext || window.webkitAudioContext)());
  function out(c) {
    if (master) return master;
    master = c.createGain(); master.gain.value = MASTER_GAIN;
    const lp = c.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = MASTER_LOWPASS_HZ; lp.Q.value = 0.5;
    const comp = c.createDynamicsCompressor();
    comp.threshold.value = -18; comp.knee.value = 12; comp.ratio.value = 3; comp.attack.value = 0.003; comp.release.value = 0.12;
    master.connect(lp).connect(comp).connect(c.destination);
    return master;
  }
  function roomSend(c) {
    if (room) return room;
    const send = c.createGain(); send.gain.value = 0.22;
    const delay = c.createDelay(0.5); delay.delayTime.value = 0.085;
    const fb = c.createGain(); fb.gain.value = 0.28;
    const tone = c.createBiquadFilter(); tone.type = 'lowpass'; tone.frequency.value = 2400;
    send.connect(delay); delay.connect(tone).connect(fb).connect(delay); tone.connect(out(c));
    return (room = send);
  }
  function tone(c, at, f0, f1, d, g, type, body = 0, useRoom = false) {
    const gain = c.createGain();
    gain.gain.setValueAtTime(0, at);
    gain.gain.linearRampToValueAtTime(g, at + Math.min(0.012, d / 3));
    gain.gain.linearRampToValueAtTime(0, at + d);
    gain.connect(out(c)); if (useRoom) gain.connect(roomSend(c));
    const voices = [[type, 1, 1]]; if (body > 0) voices.push(['sine', 0.5, body]);
    for (const [wave, ratio, level] of voices) {
      const o = c.createOscillator(), v = c.createGain();
      o.type = wave;
      o.frequency.setValueAtTime(Math.max(1, f0 * ratio), at);
      o.frequency.linearRampToValueAtTime(Math.max(1, f1 * ratio), at + d);
      v.gain.value = level; o.connect(v).connect(gain); o.start(at); o.stop(at + d + 0.03);
    }
  }
  function whoosh(c, at) {
    const d = 0.36;
    if (!noiseBuf) { const len = Math.floor(c.sampleRate * 0.4); noiseBuf = c.createBuffer(1, len, c.sampleRate); const ch = noiseBuf.getChannelData(0); for (let i = 0; i < len; i++) ch[i] = Math.random() * 2 - 1; }
    const src = c.createBufferSource(); src.buffer = noiseBuf;
    const f = c.createBiquadFilter(); f.type = 'bandpass'; f.Q.value = 1.05;
    f.frequency.setValueAtTime(320, at); f.frequency.linearRampToValueAtTime(2600, at + d * 0.55); f.frequency.linearRampToValueAtTime(720, at + d);
    const g = c.createGain(); g.gain.setValueAtTime(0, at); g.gain.linearRampToValueAtTime(0.09, at + 0.07); g.gain.linearRampToValueAtTime(0, at + d);
    src.connect(f).connect(g).connect(out(c)); g.connect(roomSend(c)); src.start(at); src.stop(at + d + 0.02);
  }
  function render(kind, c, vary) {
    const now = c.currentTime;
    switch (kind) {
      case 'success': SUCCESS_NOTES.forEach((f, i) => tone(c, now + i * 0.08, f, f * 1.004, 0.24 + i * 0.05, 0.055, 'sine', 0.45, true)); break;
      case 'step': tone(c, now, 740, 1180, 0.09, 0.05, 'triangle', 0.3, true); tone(c, now + 0.07, 1180, 1560, 0.11, 0.04, 'sine', 0.25, true); break;
      case 'error': tone(c, now, 220, 165, 0.14, 0.09, 'triangle', 0.5); tone(c, now + 0.15, 196, 147, 0.18, 0.08, 'triangle', 0.5); break;
      case 'whoosh': whoosh(c, now); break;
      default: { const p = SWEEPS[kind]; if (p) tone(c, now, p.f0 * vary.pitch, p.f1 * vary.pitch, p.d, p.g * vary.gain, p.type || 'sine', p.body || 0, !!p.room); }
    }
  }
  function play(kind = 'tick') {
    if (!enabled) return;
    const now = performance.now(), gap = VARIED.has(kind) ? REPEAT_GAP_MS : CUE_GAP_MS, last = lastAt.get(kind);
    if (last !== undefined && now - last < gap) return;
    lastAt.set(kind, now);
    const vary = VARIED.has(kind) ? { pitch: 1 + (Math.random() - 0.5) * 0.06, gain: 0.85 + Math.random() * 0.15 } : { pitch: 1, gain: 1 };
    try { const c = audio(); if (c.state === 'suspended') c.resume().then(() => enabled && render(kind, c, vary)); else render(kind, c, vary); } catch (e) { /* audio unavailable */ }
  }
  function setEnabled(on) { enabled = !!on; try { localStorage.setItem(KEY, on ? '1' : '0'); } catch (e) {} if (on) play('pop'); document.dispatchEvent(new CustomEvent('oa-sound', { detail: enabled })); }
  function reset() { try { localStorage.removeItem(KEY); } catch (e) {} enabled = deskDefault(); document.dispatchEvent(new CustomEvent('oa-sound', { detail: enabled })); }

  /* click + keyboard cues, plus the mashroo3hub ripple */
  function ripple(el, ev) {
    const html = document.documentElement;
    if (html.dataset.motion === 'reduced' || matchMedia('(prefers-reduced-motion: reduce)').matches && html.dataset.motion !== 'full') return;
    if (el.matches('a:not(.btn):not(.c-card)') || el.closest('[data-no-ripple]')) return;
    const r = el.getBoundingClientRect(); if (!r.width || r.width > 600) return;
    const size = Math.max(r.width, r.height);
    if (getComputedStyle(el).position === 'static') el.style.position = 'relative';
    let layer = el.querySelector(':scope > .ripple-layer');
    if (!layer) { layer = document.createElement('span'); layer.className = 'ripple-layer'; layer.setAttribute('aria-hidden', 'true'); el.appendChild(layer); }
    const dot = document.createElement('span'); dot.className = 'ripple';
    dot.style.width = dot.style.height = size + 'px';
    dot.style.left = (ev.clientX - r.left - size / 2) + 'px'; dot.style.top = (ev.clientY - r.top - size / 2) + 'px';
    layer.appendChild(dot); dot.addEventListener('animationend', () => dot.remove(), { once: true });
  }
  document.addEventListener('pointerdown', ev => {
    const el = ev.target.closest && ev.target.closest(INTERACTIVE); if (!el) return;
    play(el.matches(SWITCH_LIKE) ? 'switch' : 'tick'); ripple(el, ev);
  }, { passive: true });
  document.addEventListener('keydown', ev => {
    if ((ev.key !== 'Enter' && ev.key !== ' ') || ev.repeat || ev.isComposing || ev.ctrlKey || ev.metaKey || ev.altKey) return;
    const t = ev.target; if (!t || t.matches('input, textarea')) return;
    const el = t.closest(INTERACTIVE); if (!el) return;
    if (ev.key === ' ' && el.matches('a[href]:not([role])')) return;
    play(el.matches(SWITCH_LIKE) ? 'switch' : 'tick');
  });

  window.UiSound = { play, setEnabled, reset, get enabled() { return enabled; } };
})();
