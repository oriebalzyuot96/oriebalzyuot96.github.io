// Noctiluca: Descent. A cursor-reactive bioluminescent creature and a scroll-driven dive
// through five ocean zones. Design & build: Orieb Alzyuot. Three.js is vendored locally.

const root = document.documentElement;
const RTL = root.dir === 'rtl';
const RM = root.classList.contains('rm');
const MOBILE = matchMedia('(max-width: 760px)').matches || matchMedia('(pointer: coarse)').matches;
const FINE = matchMedia('(hover: hover) and (pointer: fine)').matches;
const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const L = JSON.parse($('#i18n').textContent);
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const lerp = (a, b, t) => a + (b - a) * t;
const smooth = t => t * t * (3 - 2 * t);

/* ================================================================
   Loader
   ================================================================ */
const loaderBar = $('.loader .bar span');
const loaderN = $('.loader-n span');
const T0 = performance.now();
const setLoad = p => {
  if (loaderBar) loaderBar.style.width = p + '%';
  if (loaderN) loaderN.textContent = Math.round(p * 2);
};
let onLoaded = () => {};
function finishLoading() {
  setLoad(100);
  const wait = Math.max(0, (RM ? 300 : 1100) - (performance.now() - T0));
  setTimeout(() => { root.classList.add('loaded'); onLoaded(); }, wait);
}
setLoad(12);

/* ================================================================
   Scroll → depth (works with or without WebGL)
   ================================================================ */
const zones = $$('.zone');
const DEPTHS = [0, 200, 1000, 4000, 10994];
const TEMPS = [24, 9, 4, 2, 380];
let anchors = [0, 1, 2, 3, 4];
function measure() {
  const max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
  anchors = zones.map((z, i) => i === zones.length - 1 ? max : Math.min(max, z.offsetTop));
  anchors[0] = 0;
}
function progressAt(y) {
  if (y <= anchors[0]) return 0;
  for (let i = 0; i < anchors.length - 1; i++) {
    if (y < anchors[i + 1]) return i + (y - anchors[i]) / Math.max(1, anchors[i + 1] - anchors[i]);
  }
  return anchors.length - 1;
}
const depthAt = p => {
  const i = Math.min(3, Math.floor(p)), f = p - i;
  return lerp(DEPTHS[i], DEPTHS[i + 1], f);
};
const tempAt = p => {
  const i = Math.min(3, Math.floor(p)), f = p - i;
  return lerp(TEMPS[i], TEMPS[i + 1], i === 3 ? Math.pow(f, 6) : smooth(f));
};
measure();
addEventListener('load', measure);
if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);

const fmt = new Intl.NumberFormat('en-US');
const mDepth = $('.m-depth b'), mZone = $('.m-zone'), mTemp = $('.m-temp'), mAtm = $('.m-atm'), mFill = $('.m-fill');
const mRead = $('.m-read');
const railLinks = $$('.m-rail a');
const navLinks = $$('.nav a');
let lastZone = -1, lastDepthTxt = '';
let onZone = () => {};
function updateMeter(p) {
  const d = depthAt(p);
  const txt = d < 0.5 ? '0' : '−' + fmt.format(Math.round(d));
  if (txt !== lastDepthTxt) {
    lastDepthTxt = txt;
    mDepth.textContent = txt;
    mTemp.textContent = Math.round(tempAt(p)) + '°C';
    mAtm.textContent = fmt.format(Math.round(1 + d / 10)) + ' ' + L.pressure;
  }
  root.classList.toggle('scrolled', scrollY > 40);
  mFill.style.transform = `scaleY(${(p / 4).toFixed(4)})`;
  const z = clamp(Math.round(p), 0, 4);
  if (z !== lastZone) {
    lastZone = z;
    mZone.textContent = L.zones[z];
    mRead.setAttribute('aria-label', L.meterAria.replace('{d}', fmt.format(DEPTHS[z])).replace('{z}', L.zones[z]));
    railLinks.forEach((a, i) => { a.classList.toggle('on', i === z); if (i === z) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current'); });
    navLinks.forEach(a => a.setAttribute('aria-current', String(a.getAttribute('href') === '#' + zones[z].id)));
    onZone(z);
  }
}

/* ---------- reveal ---------- */
$$('.zone').forEach(z => $$('.rv', z).forEach((el, i) => el.style.setProperty('--i', i)));
if ('IntersectionObserver' in window && !RM) {
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { rootMargin: '0px 0px -12% 0px', threshold: 0.05 });
  $$('.rv').forEach(el => io.observe(el));
} else root.classList.add('no-io');

/* ================================================================
   Pointer, touch, gyroscope
   ================================================================ */
const ptr = { x: 0, y: 0, nx: 0, ny: 0, last: -1e9, speed: 0, burst: 0, down: false, has: false };
let lastMove = { x: 0, y: 0, t: 0 };
function feedPointer(x, y) {
  const t = performance.now();
  const dt = Math.max(8, t - lastMove.t);
  const v = Math.hypot(x - lastMove.x, y - lastMove.y) / dt * 1000; // px/s
  if (t - lastMove.t < 120) {
    ptr.speed = Math.max(ptr.speed, v);
    ptr.burst = Math.max(ptr.burst, v);
  }
  lastMove = { x, y, t };
  ptr.x = x; ptr.y = y;
  ptr.nx = (x / innerWidth) * 2 - 1;
  ptr.ny = -(y / innerHeight) * 2 + 1;
  ptr.last = t; ptr.has = true;
}
addEventListener('pointermove', e => feedPointer(e.clientX, e.clientY), { passive: true });
addEventListener('pointerdown', e => { ptr.down = true; feedPointer(e.clientX, e.clientY); }, { passive: true });
addEventListener('pointerup', () => { ptr.down = false; }, { passive: true });
addEventListener('touchstart', e => { const t = e.touches[0]; if (t) feedPointer(t.clientX, t.clientY); }, { passive: true });
addEventListener('touchmove', e => { const t = e.touches[0]; if (t) feedPointer(t.clientX, t.clientY); }, { passive: true });
const gyro = { x: 0, y: 0, on: false };
if (MOBILE && 'DeviceOrientationEvent' in window) {
  addEventListener('deviceorientation', e => {
    if (e.gamma == null || e.beta == null) return;
    gyro.x = clamp(e.gamma / 28, -1, 1);
    gyro.y = clamp((45 - e.beta) / 28, -1, 1);
    gyro.on = true;
  }, { passive: true });
}

/* ---------- custom cursor ---------- */
const cursor = $('.cursor');
if (FINE && !RM && cursor) {
  const ring = $('.c-ring'), dot = $('.c-dot');
  let rx = -100, ry = -100, on = false;
  addEventListener('pointermove', e => {
    if (e.pointerType !== 'mouse') return;
    if (!on) { on = true; rx = e.clientX; ry = e.clientY; root.classList.add('has-cursor'); }
    dot.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
  }, { passive: true });
  document.addEventListener('pointerover', e => {
    const hit = e.target.closest && e.target.closest('a, button, [role="option"], .case, label');
    cursor.classList.toggle('hover', !!hit);
  });
  addEventListener('pointerdown', () => cursor.classList.add('down'));
  addEventListener('pointerup', () => cursor.classList.remove('down'));
  document.addEventListener('mouseleave', () => root.classList.remove('has-cursor'));
  document.addEventListener('mouseenter', () => { if (on) root.classList.add('has-cursor'); });
  const tick = () => {
    rx += (ptr.x - rx) * 0.2; ry += (ptr.y - ry) * 0.2;
    ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
    requestAnimationFrame(tick);
  };
  tick();
}

/* ================================================================
   Ambient sound (Web Audio, synthesised, off by default)
   ================================================================ */
const Sound = (() => {
  let ctx = null, master, filt, drone = [], noiseGain, lfo, pingBus, on = false;
  function build() {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return false;
    ctx = new AC();
    master = ctx.createGain(); master.gain.value = 0;
    const comp = ctx.createDynamicsCompressor();
    master.connect(comp).connect(ctx.destination);
    filt = ctx.createBiquadFilter(); filt.type = 'lowpass'; filt.frequency.value = 520; filt.Q.value = 3;
    const dg = ctx.createGain(); dg.gain.value = 0.11;
    filt.connect(dg).connect(master);
    [55, 55.35, 82.4].forEach((f, i) => {
      const o = ctx.createOscillator(); o.type = i === 2 ? 'triangle' : 'sawtooth'; o.frequency.value = f;
      const g = ctx.createGain(); g.gain.value = i === 2 ? 0.35 : 0.5;
      o.connect(g).connect(filt); o.start(); drone.push(o);
    });
    const sub = ctx.createOscillator(); sub.type = 'sine'; sub.frequency.value = 41.2;
    const sg = ctx.createGain(); sg.gain.value = 0.16; sub.connect(sg).connect(master); sub.start(); drone.push(sub);
    // ocean noise
    const buf = ctx.createBuffer(1, ctx.sampleRate * 3, ctx.sampleRate);
    const ch = buf.getChannelData(0);
    let b = 0;
    for (let i = 0; i < ch.length; i++) { b = 0.985 * b + 0.15 * (Math.random() * 2 - 1); ch[i] = b; }
    const ns = ctx.createBufferSource(); ns.buffer = buf; ns.loop = true;
    const bp = ctx.createBiquadFilter(); bp.type = 'lowpass'; bp.frequency.value = 600;
    noiseGain = ctx.createGain(); noiseGain.gain.value = 0.05;
    ns.connect(bp).connect(noiseGain).connect(master); ns.start();
    lfo = ctx.createOscillator(); lfo.frequency.value = 0.09;
    const lg = ctx.createGain(); lg.gain.value = 0.035; lfo.connect(lg).connect(noiseGain.gain); lfo.start();
    // ping bus with echo
    pingBus = ctx.createGain(); pingBus.gain.value = 0.22;
    const dl = ctx.createDelay(2); dl.delayTime.value = 0.42;
    const fb = ctx.createGain(); fb.gain.value = 0.38;
    const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 2200;
    pingBus.connect(master); pingBus.connect(dl); dl.connect(lp).connect(fb).connect(dl); lp.connect(master);
    return true;
  }
  return {
    get on() { return on; },
    toggle() {
      if (!ctx && !build()) return false;
      on = !on;
      const t = ctx.currentTime;
      if (on) { ctx.resume(); master.gain.cancelScheduledValues(t); master.gain.setTargetAtTime(0.6, t, 0.6); this.ping(0.8); }
      else { master.gain.cancelScheduledValues(t); master.gain.setTargetAtTime(0, t, 0.25); }
      return on;
    },
    depth(p) {
      if (!ctx || !on) return;
      const t = ctx.currentTime;
      filt.frequency.setTargetAtTime(lerp(620, 140, p / 4) + (p > 3.5 ? (p - 3.5) * 700 : 0), t, 0.3);
    },
    ping(strength = 1, p = 0) {
      if (!ctx || !on) return;
      const t = ctx.currentTime;
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.type = 'sine';
      const f = 1240 / Math.pow(1.22, p);
      o.frequency.setValueAtTime(f, t); o.frequency.exponentialRampToValueAtTime(f * 0.94, t + 1.2);
      g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.5 * strength, t + 0.012); g.gain.exponentialRampToValueAtTime(0.0001, t + 1.6);
      o.connect(g).connect(pingBus); o.start(t); o.stop(t + 1.7);
    },
    chirp() {
      if (!ctx || !on) return;
      const t = ctx.currentTime;
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.type = 'triangle';
      o.frequency.setValueAtTime(520, t); o.frequency.exponentialRampToValueAtTime(1500, t + 0.18);
      g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.12, t + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.5);
      o.connect(g).connect(pingBus); o.start(t); o.stop(t + 0.55);
    },
  };
})();
const soundBtn = $('.sound');
soundBtn.addEventListener('click', () => {
  const on = Sound.toggle();
  soundBtn.setAttribute('aria-pressed', String(on));
  soundBtn.setAttribute('aria-label', on ? L.soundOnAria : L.soundOffAria);
  $('.lbl', soundBtn).textContent = on ? L.soundOn : L.soundOff;
});

/* ================================================================
   Contact dialog + custom listboxes (no native <select>)
   ================================================================ */
function Listbox(el) {
  const btn = $('.lb-btn', el), list = $('[role="listbox"]', el), val = $('.lb-btn span', el);
  const opts = $$('[role="option"]', list);
  let idx = -1, act = -1, typed = '', typedT = 0;
  btn.classList.add('empty');
  const setAct = i => {
    act = clamp(i, 0, opts.length - 1);
    opts.forEach((o, j) => o.classList.toggle('act', j === act));
    list.setAttribute('aria-activedescendant', opts[act].id);
  };
  const open = () => { list.hidden = false; btn.setAttribute('aria-expanded', 'true'); setAct(idx >= 0 ? idx : 0); list.focus(); };
  const close = (focus = true) => { list.hidden = true; btn.setAttribute('aria-expanded', 'false'); list.removeAttribute('aria-activedescendant'); if (focus) btn.focus(); };
  const choose = i => {
    idx = i;
    opts.forEach((o, j) => o.setAttribute('aria-selected', String(j === i)));
    val.textContent = opts[i].textContent;
    btn.classList.remove('empty');
    el.dataset.value = opts[i].textContent;
  };
  btn.addEventListener('click', () => (list.hidden ? open() : close()));
  btn.addEventListener('keydown', e => { if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); open(); } });
  list.addEventListener('keydown', e => {
    const k = e.key;
    if (k === 'ArrowDown') { e.preventDefault(); setAct(act + 1); }
    else if (k === 'ArrowUp') { e.preventDefault(); setAct(act - 1); }
    else if (k === 'Home') { e.preventDefault(); setAct(0); }
    else if (k === 'End') { e.preventDefault(); setAct(opts.length - 1); }
    else if (k === 'Enter' || k === ' ') { e.preventDefault(); choose(act); close(); }
    else if (k === 'Escape') { e.preventDefault(); e.stopPropagation(); close(); }
    else if (k === 'Tab') { close(false); }
    else if (k.length === 1) {
      const now = performance.now();
      typed = (now - typedT > 700 ? '' : typed) + k.toLowerCase(); typedT = now;
      const hit = opts.findIndex(o => o.textContent.trim().toLowerCase().startsWith(typed));
      if (hit >= 0) setAct(hit);
    }
  });
  opts.forEach((o, i) => {
    o.addEventListener('click', () => { choose(i); close(); });
    o.addEventListener('pointermove', () => setAct(i));
  });
  document.addEventListener('pointerdown', e => { if (!list.hidden && !el.contains(e.target)) close(false); });
  return { reset() { idx = -1; opts.forEach(o => o.setAttribute('aria-selected', 'false')); val.textContent = L.pick; btn.classList.add('empty'); delete el.dataset.value; } };
}
const dlg = $('#contact-dialog');
const boxes = $$('.lb', dlg).map(Listbox);
let celebrate = () => {};
function openDialog() {
  if (typeof dlg.showModal !== 'function') { location.hash = '#contact'; return; }
  dlg.showModal();
  setTimeout(() => $('#f-name').focus(), 30);
}
$$('[data-open-contact]').forEach(b => b.addEventListener('click', openDialog));
$$('[data-close]', dlg).forEach(b => b.addEventListener('click', () => dlg.close()));
dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close(); });
dlg.addEventListener('close', () => {
  const f = $('form', dlg);
  f.reset(); boxes.forEach(b => b.reset());
  $('.dlg-body', dlg).hidden = false; $('.dlg-done', dlg).hidden = true; $('.err', dlg).textContent = '';
});
$('form', dlg).addEventListener('submit', e => {
  e.preventDefault();
  const name = $('#f-name').value.trim(), email = $('#f-email').value.trim();
  const err = $('.err', dlg);
  if (!name) { err.textContent = L.needName; $('#f-name').focus(); return; }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { err.textContent = L.needEmail; $('#f-email').focus(); return; }
  err.textContent = '';
  $('.dlg-body', dlg).hidden = true;
  const done = $('.dlg-done', dlg);
  done.hidden = false;
  $('.done-t', done).textContent = L.sent.replace('{name}', name.split(' ')[0] || L.friend);
  $('.done-t', done).focus();
  Sound.chirp();
  celebrate();
});

/* ================================================================
   3D
   ================================================================ */
let THREE = null;
try {
  THREE = await import('three');
  setLoad(45);
} catch (e) { console.warn('Three.js failed to load', e); }
setLoad(65);

const canvas = $('#gl');
let renderer = null;
const glOK = (() => { try { const c = document.createElement('canvas'); return !!(c.getContext('webgl2') || c.getContext('webgl')); } catch (e) { return false; } })();
if (THREE && glOK) {
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: !MOBILE || (devicePixelRatio || 1) < 2, alpha: false, powerPreference: 'high-performance' });
  } catch (e) { console.warn('WebGL unavailable', e); renderer = null; }
}
if (!renderer) {
  root.classList.add('no-gl');
  uiOnlyLoop();
  finishLoading();
} else {
  start();
}

function uiOnlyLoop() {
  let p = -1;
  const step = () => {
    const np = progressAt(scrollY);
    if (np !== p) { p = np; updateMeter(p); }
    requestAnimationFrame(step);
  };
  addEventListener('resize', measure);
  step();
}

function start() {
  const { Vector3, Color } = THREE;
  const PR = Math.min(devicePixelRatio || 1, MOBILE ? 1.5 : 2);
  renderer.setPixelRatio(PR);
  renderer.setClearColor(0x04121f, 1);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(MOBILE ? 50 : 40, 1, 0.1, 220);
  camera.position.set(0, 0, 12);
  const ZH = 36; // world units per zone
  const CORE_Y = -4 * ZH;

  /* ---------- zone palettes ---------- */
  const P = [
    { top: '#2a9fbc', bot: '#05304e', ent: '#c9fbff', snow: '#d4f8ff', spark: '#a8f7ff', shaft: 1, snowA: 0.5, sparkA: 0.25, glow: 0.16, core: 0 },
    { top: '#0f5590', bot: '#03193a', ent: '#82f0ff', snow: '#9fd6ff', spark: '#62e6ff', shaft: 0.32, snowA: 0.42, sparkA: 0.55, glow: 0.6, core: 0 },
    { top: '#191556', bot: '#030311', ent: '#b996ff', snow: '#8d8ad6', spark: '#6fffd2', shaft: 0, snowA: 0.36, sparkA: 0.95, glow: 0.95, core: 0 },
    { top: '#2a0a2c', bot: '#020004', ent: '#ff5f9e', snow: '#b0708f', spark: '#ff6a7e', shaft: 0, snowA: 0.3, sparkA: 0.85, glow: 1.0, core: 0.05 },
    { top: '#3a1206', bot: '#080101', ent: '#ffb44d', snow: '#e0a070', spark: '#ffd07a', shaft: 0, snowA: 0.34, sparkA: 1, glow: 0.95, core: 1 },
  ].map(z => ({ ...z, top: new Color(z.top), bot: new Color(z.bot), ent: new Color(z.ent), snow: new Color(z.snow), spark: new Color(z.spark) }));
  const cur = { top: new Color(), bot: new Color(), ent: new Color(), snow: new Color(), spark: new Color(), shaft: 1, snowA: 0.5, sparkA: 0.3, glow: 0.6, core: 0 };
  function blendPalette(p) {
    const i = Math.min(3, Math.floor(p)), f = smooth(clamp(p - i, 0, 1));
    const a = P[i], b = P[i + 1];
    for (const k of ['top', 'bot', 'ent', 'snow', 'spark']) cur[k].lerpColors(a[k], b[k], f);
    for (const k of ['shaft', 'snowA', 'sparkA', 'glow', 'core']) cur[k] = lerp(a[k], b[k], f);
  }

  const U = { uTime: { value: 0 } };
  const hashGLSL = 'float hash12(vec2 p){ vec3 p3 = fract(vec3(p.xyx) * .1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }';

  /* ---------- background dome ---------- */
  const bgMat = new THREE.ShaderMaterial({
    uniforms: { uTime: U.uTime, uTop: { value: new Color() }, uBot: { value: new Color() }, uShaft: { value: 1 }, uCore: { value: 0 }, uCoreCol: { value: new Color('#ff7a1f') } },
    vertexShader: 'varying vec3 vDir; void main(){ vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
    fragmentShader: `
      uniform float uTime, uShaft, uCore; uniform vec3 uTop, uBot, uCoreCol; varying vec3 vDir;
      ${hashGLSL}
      void main(){
        float h = vDir.y;
        vec3 col = mix(uBot, uTop, smoothstep(-0.55, 0.8, h));
        float ang = atan(vDir.x, -vDir.z);
        float s = pow(0.5 + 0.5 * sin(ang * 9.0 + uTime * 0.12 + sin(ang * 3.0 + uTime * 0.07) * 1.6), 7.0);
        s += 0.7 * pow(0.5 + 0.5 * sin(ang * 17.0 - uTime * 0.09 + 1.3), 12.0);
        s *= smoothstep(-0.25, 0.7, h);
        col += mix(uTop, vec3(1.0), 0.3) * s * uShaft * 0.3;
        col += uCoreCol * uCore * pow(1.0 - smoothstep(-0.8, 0.15, h), 1.5) * 0.35;
        gl_FragColor = vec4(col, 1.0);
        gl_FragColor.rgb = max(gl_FragColor.rgb, vec3(0.0));
        #ifdef SRGB_OUT
        gl_FragColor.rgb = pow(gl_FragColor.rgb, vec3(0.4545));
        #endif
        gl_FragColor.rgb += (hash12(gl_FragCoord.xy + uTime) - 0.5) / 160.0;
      }`,
    side: THREE.BackSide, depthWrite: false, 
  });
  const bg = new THREE.Mesh(new THREE.SphereGeometry(150, 32, 24), bgMat);
  bg.renderOrder = -10;
  scene.add(bg);

  /* ---------- water surface + light shafts (surface zone) ---------- */
  const surfMat = new THREE.ShaderMaterial({
    uniforms: { uTime: U.uTime, uCol: { value: new Color('#bdf6ff') }, uOp: { value: 1 } },
    vertexShader: 'varying vec3 vW; void main(){ vec4 w = modelMatrix * vec4(position, 1.0); vW = w.xyz; gl_Position = projectionMatrix * viewMatrix * w; }',
    fragmentShader: `
      uniform float uTime, uOp; uniform vec3 uCol; varying vec3 vW;
      float caus(vec2 p, float t){
        float v = 0.0;
        for (int k = 0; k < 3; k++) {
          float fk = float(k) + 1.0;
          p = mat2(1.6, 1.2, -1.2, 1.6) * p + vec2(t * 0.21 * fk, -t * 0.17);
          v += abs(sin(p.x + sin(p.y * 0.8 + t)) * cos(p.y * 0.9 + cos(p.x * 0.7 - t)));
        }
        return pow(clamp(1.0 - v / 1.6, 0.0, 1.0), 4.0);
      }
      void main(){
        float d = length(vW.xz - cameraPosition.xz);
        float c = caus(vW.xz * 0.16, uTime * 0.6);
        float fade = exp(-d * 0.05);
        vec3 col = uCol * (0.1 + c * 1.1) * fade * uOp;
        gl_FragColor = vec4(col, 1.0);
        gl_FragColor.rgb = max(gl_FragColor.rgb, vec3(0.0));
        #ifdef SRGB_OUT
        gl_FragColor.rgb = pow(gl_FragColor.rgb, vec3(0.4545));
        #endif
      }`,
    side: THREE.DoubleSide, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false,
  });
  const surf = new THREE.Mesh(new THREE.PlaneGeometry(220, 160), surfMat);
  surf.rotation.x = Math.PI / 2;
  surf.position.set(0, 6.2, -50);
  scene.add(surf);

  const shaftMat = new THREE.ShaderMaterial({
    uniforms: { uTime: U.uTime, uCol: { value: new Color('#bff7ff') }, uOp: { value: 1 } },
    vertexShader: 'attribute float aK; varying vec2 vUv; varying float vK; void main(){ vUv = uv; vK = aK; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
    fragmentShader: `
      uniform float uTime, uOp; uniform vec3 uCol; varying vec2 vUv; varying float vK;
      void main(){
        float x = vUv.x;
        float edge = pow(max(sin(x * 3.14159), 0.0), 2.5);
        float fall = pow(clamp(vUv.y, 0.0, 1.0), 1.6) * (1.0 - smoothstep(0.82, 1.0, vUv.y));
        float flick = 0.65 + 0.35 * sin(uTime * (0.4 + vK * 0.5) + vK * 9.0);
        vec3 col = uCol * edge * fall * flick * uOp * 0.13;
        gl_FragColor = vec4(col, 1.0);
        gl_FragColor.rgb = max(gl_FragColor.rgb, vec3(0.0));
        #ifdef SRGB_OUT
        gl_FragColor.rgb = pow(gl_FragColor.rgb, vec3(0.4545));
        #endif
      }`,
    transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide,
  });
  const shafts = new THREE.Group();
  for (let i = 0; i < (MOBILE ? 5 : 9); i++) {
    const w = 1.2 + Math.random() * 2.6, h = 30;
    const g = new THREE.PlaneGeometry(w, h);
    const k = new Float32Array(g.attributes.position.count).fill(Math.random());
    g.setAttribute('aK', new THREE.BufferAttribute(k, 1));
    const m = new THREE.Mesh(g, shaftMat);
    m.position.set((i / 8 - 0.5) * 30 + (Math.random() - 0.5) * 4, -8, -6 - Math.random() * 18);
    m.rotation.z = -0.32 + (Math.random() - 0.5) * 0.12;
    m.userData.sway = Math.random() * 6;
    shafts.add(m);
  }
  scene.add(shafts);

  /* ---------- marine snow + bioluminescent sparks ---------- */
  const PH = 44;
  function makeField(count, opts) {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3), rnd = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 34;
      pos[i * 3 + 1] = Math.random() * PH;
      pos[i * 3 + 2] = -24 + Math.random() * 33;
      rnd[i * 3] = Math.random(); rnd[i * 3 + 1] = Math.random(); rnd[i * 3 + 2] = Math.random();
    }
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    g.setAttribute('aR', new THREE.BufferAttribute(rnd, 3));
    const mat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: U.uTime, uCamY: { value: 0 }, uH: { value: PH }, uSize: { value: opts.size }, uScale: { value: PR },
        uPointer: { value: new Vector3(0, 0, -100) }, uRad: { value: opts.rad }, uRepel: { value: opts.repel },
        uColor: { value: new Color() }, uSpark: { value: new Color() }, uAlpha: { value: 0.5 }, uTw: { value: opts.tw },
        uDrift: { value: opts.drift }, uWake: { value: 0 },
      },
      vertexShader: `
        uniform float uTime, uCamY, uH, uSize, uScale, uRad, uRepel, uAlpha, uTw, uDrift, uWake;
        uniform vec3 uPointer, uColor, uSpark;
        attribute vec3 aR;
        varying float vA; varying vec3 vC;
        void main(){
          vec3 p = position;
          p.x += sin(uTime * (0.1 + 0.25 * aR.x) + aR.y * 6.283) * 0.6;
          p.z += cos(uTime * (0.08 + 0.2 * aR.y) + aR.x * 6.283) * 0.5;
          float yy = p.y + uTime * uDrift * (0.25 + aR.z * 0.75);
          p.y = uCamY + mod(yy - uCamY + uH * 0.5, uH) - uH * 0.5;
          vec3 d = p - uPointer;
          float r2 = dot(d.xy, d.xy);
          float w = exp(-r2 / (uRad * uRad)) * exp(-d.z * d.z / 20.0);
          vec2 dir = normalize(d.xy + vec2(0.0001));
          vec2 tang = vec2(-dir.y, dir.x);
          p.xy += (dir * uRepel + tang * uRepel * 0.6 * (aR.x - 0.5)) * w;
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_Position = projectionMatrix * mv;
          float dist = -mv.z;
          gl_PointSize = uSize * uScale * (0.35 + aR.x * aR.x * 1.3) * (12.0 / max(dist, 0.5));
          float tw = 0.5 + 0.5 * sin(uTime * (0.6 + aR.y * 2.6) + aR.x * 40.0);
          vA = uAlpha * mix(1.0, tw * tw * 1.6, uTw) * smoothstep(0.8, 3.5, dist) * (1.0 - smoothstep(24.0, 36.0, dist));
          float lit = clamp(w * 2.2 + uWake * exp(-r2 / 30.0), 0.0, 1.0);
          vA *= 1.0 + lit * 3.5;
          vC = mix(uColor, uSpark, lit);
        }`,
      fragmentShader: `
        varying float vA; varying vec3 vC;
        void main(){
          float d = length(gl_PointCoord - 0.5);
          float a = 1.0 - smoothstep(0.0, 0.5, d);
          a = a * a;
          gl_FragColor = vec4(vC * a * vA, 1.0);
          gl_FragColor.rgb = max(gl_FragColor.rgb, vec3(0.0));
          #ifdef SRGB_OUT
        gl_FragColor.rgb = pow(gl_FragColor.rgb, vec3(0.4545));
        #endif
        }`,
      transparent: true, blending: THREE.AdditiveBlending, depthWrite: false,
    });
    const pts = new THREE.Points(g, mat);
    pts.frustumCulled = false;
    scene.add(pts);
    return mat;
  }
  const snow = makeField(MOBILE ? 1100 : 2800, { size: MOBILE ? 3.2 : 3.6, rad: 2.2, repel: 1.6, tw: 0.2, drift: -0.22 });
  const sparks = makeField(MOBILE ? 220 : 520, { size: MOBILE ? 7 : 8, rad: 2.6, repel: 1.1, tw: 1, drift: 0.05 });

  /* ---------- the creature ---------- */
  const S = MOBILE ? 0.95 : 1.3;
  const THETA = Math.PI * 0.54;
  const ent = new THREE.Group();
  ent.scale.setScalar(S);
  scene.add(ent);
  const bellU = {
    uTime: U.uTime, uC: { value: 0 }, uColor: { value: new Color() }, uGlow: { value: 1 }, uFlash: { value: 0 },
    uLook: { value: new Vector3(0, 1, 0) }, uTheta: { value: THETA }, uInt: { value: 1 },
  };
  const bellVert = `
    uniform float uTime, uC, uTheta;
    varying vec3 vN, vV, vON; varying float vH, vA;
    void main(){
      vec3 p = position;
      float th = acos(clamp(p.y, -1.0, 1.0));
      float s = th / uTheta;
      float r = length(p.xz);
      float ang = r > 1e-5 ? atan(p.z, p.x) : 0.0;
      float nr = r * (1.0 - uC * 0.3 * pow(s, 1.5));
      nr *= 1.0 + 0.045 * sin(ang * 8.0) * pow(s, 7.0);
      nr += 0.022 * sin(s * 9.0 - uTime * 2.4 + ang * 2.0) * s;
      float ny = p.y * 0.74 * (1.0 + uC * 0.16) + 0.05 * pow(s, 6.0) * uC;
      vec3 q = vec3(cos(ang) * nr, ny, sin(ang) * nr);
      vH = s; vA = ang; vON = normal;
      vec4 mv = modelViewMatrix * vec4(q, 1.0);
      vV = -mv.xyz; vN = normalize(normalMatrix * normal);
      gl_Position = projectionMatrix * mv;
    }`;
  const bellFrag = `
    uniform float uTime, uGlow, uFlash, uInt; uniform vec3 uColor, uLook;
    varying vec3 vN, vV, vON; varying float vH, vA;
    void main(){
      float fres = pow(clamp(1.0 - abs(dot(normalize(vN), normalize(vV))), 0.0, 1.0), 2.0);
      float canals = pow(abs(cos(vA * 4.0)), 70.0) * smoothstep(0.08, 0.85, vH);
      float rings = smoothstep(0.9, 1.0, sin(vH * 26.0 - uTime * 1.7)) * 0.22 * vH;
      float rim = smoothstep(0.8, 1.0, vH);
      float apex = (1.0 - smoothstep(0.0, 0.35, vH)) * 0.35;
      float look = pow(max(dot(normalize(vON), uLook), 0.0), 5.0);
      float body = 0.035 + fres * 0.62 + canals * 0.42 + rings * 0.8 + rim * 0.5 + apex * 0.5 + look * 0.5;
      vec3 col = uColor * body * (1.0 + uFlash * 1.6);
      col += vec3(1.0) * (pow(fres, 5.0) * 0.12 + look * 0.05 + uFlash * 0.1 * fres);
      gl_FragColor = vec4(col * uGlow * uInt, 1.0);
      gl_FragColor.rgb = max(gl_FragColor.rgb, vec3(0.0));
      #ifdef SRGB_OUT
        gl_FragColor.rgb = pow(gl_FragColor.rgb, vec3(0.4545));
        #endif
    }`;
  const bellMat = new THREE.ShaderMaterial({ uniforms: bellU, vertexShader: bellVert, fragmentShader: bellFrag, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide });
  const bellGeo = new THREE.SphereGeometry(1, MOBILE ? 48 : 80, MOBILE ? 20 : 34, 0, Math.PI * 2, 0, THETA);
  const bell = new THREE.Mesh(bellGeo, bellMat);
  ent.add(bell);
  const innerMat = bellMat.clone();
  innerMat.uniforms = { ...bellU, uInt: { value: 0.3 } };
  const inner = new THREE.Mesh(bellGeo, innerMat);
  inner.scale.set(0.8, 0.82, 0.8);
  inner.position.y = -0.06;
  ent.add(inner);

  // gonads: four glowing horseshoes
  const gonMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.55, blending: THREE.AdditiveBlending, depthWrite: false });
  for (let i = 0; i < 4; i++) {
    const t = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.035, 8, 28, Math.PI * 1.25), gonMat);
    t.rotation.x = Math.PI / 2;
    t.rotation.z = i * Math.PI / 2 + 0.9;
    t.position.set(Math.cos(i * Math.PI / 2 + Math.PI / 4) * 0.3, 0.38, Math.sin(i * Math.PI / 2 + Math.PI / 4) * 0.3);
    ent.add(t);
  }
  // halo sprite (soft glow, also the bloom stand-in on mobile)
  const haloTex = (() => {
    const c = document.createElement('canvas'); c.width = c.height = 128;
    const x = c.getContext('2d');
    const g = x.createRadialGradient(64, 64, 0, 64, 64, 64);
    g.addColorStop(0, 'rgba(255,255,255,1)'); g.addColorStop(0.25, 'rgba(255,255,255,.45)'); g.addColorStop(0.6, 'rgba(255,255,255,.1)'); g.addColorStop(1, 'rgba(255,255,255,0)');
    x.fillStyle = g; x.fillRect(0, 0, 128, 128);
    const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
  })();
  const halo = new THREE.Sprite(new THREE.SpriteMaterial({ fog: false, map: haloTex, color: 0xffffff, transparent: true, opacity: MOBILE ? 0.5 : 0.28, blending: THREE.AdditiveBlending, depthWrite: false }));
  halo.scale.setScalar(5.5);
  halo.position.y = 0.2;
  ent.add(halo);
  const coreDot = new THREE.Sprite(new THREE.SpriteMaterial({ fog: false, map: haloTex, color: 0xffffff, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending, depthWrite: false }));
  coreDot.scale.setScalar(0.9);
  coreDot.position.y = 0.42;
  ent.add(coreDot);
  const entLight = new THREE.PointLight(0xffffff, 0, 30, 1.4);
  scene.add(entLight);

  /* ---------- tentacles: verlet chains rendered as camera-facing ribbons ---------- */
  const chains = [];
  const NT = MOBILE ? 12 : 18;
  for (let i = 0; i < NT; i++) {
    const a = (i / NT) * Math.PI * 2 + 0.1;
    chains.push({ lx: Math.cos(a), lz: Math.sin(a), rim: true, n: MOBILE ? 28 : 38, seg: 0.1 + (i % 3) * 0.018, w0: 0.026, w1: 0.004, I: 0.85, frill: 0 });
  }
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * Math.PI * 2 + Math.PI / 4;
    chains.push({ lx: Math.cos(a) * 0.12, lz: Math.sin(a) * 0.12, rim: false, n: MOBILE ? 20 : 26, seg: 0.085, w0: 0.1, w1: 0.02, I: 1.0, frill: 1 });
  }
  let totalN = 0;
  for (const c of chains) { c.off = totalN; totalN += c.n; c.p = new Float32Array(c.n * 3); c.q = new Float32Array(c.n * 3); c.ph = Math.random() * 6.28; }
  const rGeo = new THREE.BufferGeometry();
  const rPos = new Float32Array(totalN * 2 * 3), rUv = new Float32Array(totalN * 2 * 2), rI = new Float32Array(totalN * 2);
  const idx = [];
  for (const c of chains) {
    for (let i = 0; i < c.n; i++) {
      const v = (c.off + i) * 2;
      rUv[v * 2] = 0; rUv[v * 2 + 1] = i / (c.n - 1);
      rUv[v * 2 + 2] = 1; rUv[v * 2 + 3] = i / (c.n - 1);
      rI[v] = rI[v + 1] = c.I + c.frill * 0.0001;
      if (i < c.n - 1) idx.push(v, v + 1, v + 2, v + 1, v + 3, v + 2);
    }
  }
  rGeo.setAttribute('position', new THREE.BufferAttribute(rPos, 3).setUsage(THREE.DynamicDrawUsage));
  rGeo.setAttribute('uv', new THREE.BufferAttribute(rUv, 2));
  rGeo.setAttribute('aI', new THREE.BufferAttribute(rI, 1));
  rGeo.setIndex(idx);
  const ribMat = new THREE.ShaderMaterial({
    uniforms: { uTime: U.uTime, uColor: bellU.uColor, uGlow: bellU.uGlow, uFlash: bellU.uFlash },
    vertexShader: 'attribute float aI; varying vec2 vUv; varying float vI; void main(){ vUv = uv; vI = aI; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
    fragmentShader: `
      uniform float uTime, uGlow, uFlash; uniform vec3 uColor; varying vec2 vUv; varying float vI;
      void main(){
        float across = 1.0 - min(1.0, pow(abs(vUv.x * 2.0 - 1.0), 2.0));
        float along = 1.0 - vUv.y;
        float pulse = smoothstep(0.8, 1.0, sin(vUv.y * 22.0 - uTime * 4.5 + vI * 40.0)) * 0.9;
        float a = across * (pow(max(along, 0.0), 0.8) * 0.85 + 0.12) * (0.45 + pulse) * vI;
        vec3 col = uColor * a * (1.0 + uFlash) + vec3(1.0) * pulse * across * along * 0.12;
        gl_FragColor = vec4(col * uGlow, 1.0);
        gl_FragColor.rgb = max(gl_FragColor.rgb, vec3(0.0));
        #ifdef SRGB_OUT
        gl_FragColor.rgb = pow(gl_FragColor.rgb, vec3(0.4545));
        #endif
      }`,
    transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide,
  });
  const ribbons = new THREE.Mesh(rGeo, ribMat);
  ribbons.frustumCulled = false;
  scene.add(ribbons);

  /* ---------- the core: seabed, vents, glowing heart ---------- */
  const coreGroup = new THREE.Group();
  scene.add(coreGroup);
  const vn = (() => {
    const h = (x, y) => { let n = Math.imul(x | 0, 374761393) ^ Math.imul(y | 0, 668265263); n = Math.imul(n ^ (n >>> 13), 1274126177); return ((n ^ (n >>> 16)) >>> 0) / 4294967295; };
    return (x, y) => {
      const xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi;
      const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
      return lerp(lerp(h(xi, yi), h(xi + 1, yi), u), lerp(h(xi, yi + 1), h(xi + 1, yi + 1), u), v);
    };
  })();
  const fbm = (x, y) => vn(x, y) * 0.55 + vn(x * 2.1, y * 2.1) * 0.28 + vn(x * 4.3, y * 4.3) * 0.17;
  const floorGeo = new THREE.PlaneGeometry(130, 80, MOBILE ? 90 : 160, MOBILE ? 56 : 100);
  floorGeo.rotateX(-Math.PI / 2);
  const CX = MOBILE ? 0 : (RTL ? -1.6 : 1.6), CZ = -10;
  {
    const a = floorGeo.attributes.position;
    for (let i = 0; i < a.count; i++) {
      const x = a.getX(i), z = a.getZ(i);
      const dx = x - CX, dz = z - (CZ + 20);
      const r = Math.hypot(dx, dz);
      let y = (fbm(x * 0.09 + 3, z * 0.09) - 0.5) * 3.2 + Math.pow(clamp((r - 12) / 34, 0, 1), 2) * 5;
      y -= 3.2 * Math.exp(-r * r / 40);
      y += 1.6 * Math.exp(-Math.pow(r - 6.5, 2) / 6);
      a.setY(i, y);
    }
    floorGeo.computeVertexNormals();
  }
  const floor = new THREE.Mesh(floorGeo, new THREE.MeshStandardMaterial({ color: 0x1a0c08, roughness: 0.95, metalness: 0.0 }));
  floor.position.set(0, CORE_Y - 7.4, -20);
  coreGroup.add(floor);
  // vents
  const ventMat = new THREE.MeshStandardMaterial({ color: 0x1c0d08, roughness: 0.85, flatShading: true, emissive: 0x3a0f02, emissiveIntensity: 0.25 });
  const ventSpots = [[-7, -14, 7], [-11, -20, 10], [6.5, -16, 6], [11, -24, 12], [-3.5, -26, 9], [15, -12, 5], [-15, -11, 6]];
  for (const [x, z, h] of ventSpots) {
    const g = new THREE.CylinderGeometry(0.25, 1.5, h, 9, 8);
    const a = g.attributes.position;
    for (let i = 0; i < a.count; i++) {
      const y = a.getY(i);
      const k = 1 + (vn(a.getX(i) * 2 + x, y * 0.9 + z) - 0.5) * 0.7;
      a.setX(i, a.getX(i) * k); a.setZ(i, a.getZ(i) * k);
    }
    g.computeVertexNormals();
    const m = new THREE.Mesh(g, ventMat);
    m.position.set(x + CX, CORE_Y - 7.6 + h / 2, z);
    m.rotation.z = (Math.random() - 0.5) * 0.12;
    coreGroup.add(m);
  }
  const heartU = { uTime: U.uTime, uCol: { value: new Color('#ff6a12') }, uHot: { value: new Color('#ffd08a') }, uPulse: { value: 0 } };
  const heart = new THREE.Mesh(new THREE.IcosahedronGeometry(1.5, MOBILE ? 24 : 48), new THREE.ShaderMaterial({
    uniforms: heartU,
    vertexShader: `
      uniform float uTime, uPulse; varying vec3 vN, vV, vP;
      float wave(vec3 p){ return sin(p.x * 3.1 + uTime * 0.9) * sin(p.y * 2.7 - uTime * 0.7) * sin(p.z * 3.3 + uTime * 0.5); }
      void main(){
        vec3 p = position;
        float w = wave(normalize(p) * 1.6);
        p += normal * (w * 0.07 + uPulse * 0.05);
        vP = normalize(position);
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        vV = -mv.xyz; vN = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * mv;
      }`,
    fragmentShader: `
      uniform float uTime, uPulse; uniform vec3 uCol, uHot; varying vec3 vN, vV, vP;
      void main(){
        float f = clamp(1.0 - abs(dot(normalize(vN), normalize(vV))), 0.0, 1.0);
        float veins = 0.5 + 0.5 * sin(vP.x * 9.0 + sin(vP.y * 7.0 + uTime * 0.8) * 2.0 + uTime * 0.3) * sin(vP.z * 8.0 - uTime * 0.4);
        veins = pow(clamp(veins, 0.0, 1.0), 3.0);
        vec3 col = mix(uCol * 0.7, uHot, pow(1.0 - f, 2.0) * 0.75 + veins * 0.3) * (1.0 + uPulse * 0.5) + uCol * pow(f, 1.5) * 1.6;
        gl_FragColor = vec4(col, 1.0);
        gl_FragColor.rgb = max(gl_FragColor.rgb, vec3(0.0));
        #ifdef SRGB_OUT
        gl_FragColor.rgb = pow(gl_FragColor.rgb, vec3(0.4545));
        #endif
      }`,
  }));
  heart.position.set(CX, CORE_Y - 5.2, CZ);
  coreGroup.add(heart);
  const heartHalo = new THREE.Sprite(new THREE.SpriteMaterial({ fog: false, map: haloTex, color: 0xff8a2a, transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending, depthWrite: false }));
  heartHalo.scale.setScalar(18);
  heartHalo.position.copy(heart.position);
  coreGroup.add(heartHalo);
  const coreLight = new THREE.PointLight(0xff7a26, 0, 60, 1.25);
  coreLight.position.set(CX, CORE_Y - 3.6, CZ + 1);
  coreGroup.add(coreLight);
  scene.add(new THREE.HemisphereLight(0x3a4a70, 0x100404, 0.15));
  scene.fog = new THREE.Fog(0x080101, 14, 46);

  scene.traverse(o => { if (o.material && o.material.isShaderMaterial) { o.material.defines = { ...(o.material.defines || {}), SRGB_OUT: '' }; o.material.needsUpdate = true; } });

  /* ---------- sizing ---------- */
  let W = 0, H = 0;
  function resize() {
    const w = innerWidth, h = innerHeight;
    if (MOBILE && w === W && Math.abs(h - H) < 140) return; // ignore URL bar jitter
    W = w; H = h;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    snow.uniforms.uScale.value = sparks.uniforms.uScale.value = PR * (h / 900);
    measure();
  }
  resize();
  addEventListener('resize', resize);

  /* ---------- per-zone placement of the creature ---------- */
  const narrow = () => W / H < 1.05;
  const ANCH = [[2.9, 0.4], [3.0, 0.7], [3.5, 1.3], [2.9, 0.4], [2.5, 0.9]];
  const ANCH_M = [[0, 2.0], [0, 2.2], [0.9, 2.9], [0, 2.2], [0, 2.4]];
  function anchorAt(p, out) {
    const A = narrow() ? ANCH_M : ANCH;
    const i = Math.min(3, Math.floor(p)), f = smooth(clamp(p - i, 0, 1));
    let x = lerp(A[i][0], A[i + 1][0], f), y = lerp(A[i][1], A[i + 1][1], f);
    if (!narrow()) x *= clamp(camera.aspect / 1.6, 0.75, 1.25);
    if (RTL) x = -x;
    return out.set(x, y, 0);
  }

  /* ---------- state ---------- */
  const st = {
    pos: new Vector3(3, 0, 0), vel: new Vector3(), up: new Vector3(0, 1, 0), twist: 0,
    phase: 0, c: 0, cPrev: 0, excite: 0, startle: 0, cool: 0, flash: 0, look: new Vector3(0, 0, 1),
    camY: 0, p: 0, prevP: 0, wake: 0, attn: 0,
  };
  const Y = new Vector3(0, 1, 0);
  const tmp = new Vector3(), tmp2 = new Vector3(), tmp3 = new Vector3(), aim = new Vector3(), ptrW = new Vector3(), ptrWs = new Vector3(0, 0, -100);
  const qa = new THREE.Quaternion(), qb = new THREE.Quaternion();
  const ray = new Vector3();
  function pointerWorld(nx, ny, out) {
    ray.set(nx, ny, 0.5).unproject(camera).sub(camera.position).normalize();
    const t = -camera.position.z / ray.z;
    return out.copy(camera.position).addScaledVector(ray, t);
  }
  celebrate = () => { st.startle = 1; st.flash = 1.4; st.wake = 1; };
  onZone = z => { st.flash = Math.max(st.flash, 0.5); Sound.ping(0.7, z); };

  // initialise chains hanging down
  function placeChains() {
    ent.updateMatrixWorld(true);
    for (const c of chains) {
      tmp.set(c.lx * 0.98, c.rim ? -0.16 : 0.12, c.lz * 0.98).applyMatrix4(ent.matrixWorld);
      for (let i = 0; i < c.n; i++) {
        c.p[i * 3] = c.q[i * 3] = tmp.x;
        c.p[i * 3 + 1] = c.q[i * 3 + 1] = tmp.y - i * c.seg * S;
        c.p[i * 3 + 2] = c.q[i * 3 + 2] = tmp.z;
      }
    }
  }

  const grav = new Vector3();
  function stepChains(dt, t) {
    const k = dt * 60;
    const damp = Math.pow(0.9, k);
    const rimK = 1 - st.c * 0.3;
    grav.copy(st.up).multiplyScalar(-0.6).add(tmp3.set(0, -0.4, 0)).normalize().multiplyScalar(0.0032 * k * k * S);
    for (const c of chains) {
      const P0 = c.p, Q0 = c.q;
      tmp.set(c.lx * 0.98 * (c.rim ? rimK : 1), c.rim ? -0.16 + st.c * 0.05 : 0.12, c.lz * 0.98 * (c.rim ? rimK : 1)).applyMatrix4(ent.matrixWorld);
      P0[0] = Q0[0] = tmp.x; P0[1] = Q0[1] = tmp.y; P0[2] = Q0[2] = tmp.z;
      const seg = c.seg * S;
      for (let i = 1; i < c.n; i++) {
        const j = i * 3;
        const sx = Math.sin(t * 1.1 + i * 0.35 + c.ph) * 0.0009 * k * S, sz = Math.cos(t * 0.9 + i * 0.3 + c.ph) * 0.0009 * k * S;
        const vx = (P0[j] - Q0[j]) * damp, vy = (P0[j + 1] - Q0[j + 1]) * damp, vz = (P0[j + 2] - Q0[j + 2]) * damp;
        Q0[j] = P0[j]; Q0[j + 1] = P0[j + 1]; Q0[j + 2] = P0[j + 2];
        P0[j] += vx + grav.x + sx; P0[j + 1] += vy + grav.y; P0[j + 2] += vz + grav.z + sz;
      }
      for (let i = 1; i < c.n; i++) {
        const j = i * 3, h = j - 3;
        let dx = P0[j] - P0[h], dy = P0[j + 1] - P0[h + 1], dz = P0[j + 2] - P0[h + 2];
        const d = Math.hypot(dx, dy, dz) || 1e-5;
        const f = seg / d;
        P0[j] = P0[h] + dx * f; P0[j + 1] = P0[h + 1] + dy * f; P0[j + 2] = P0[h + 2] + dz * f;
      }
    }
  }
  const cp = camera.position;
  function buildRibbons() {
    for (const c of chains) {
      const P0 = c.p;
      for (let i = 0; i < c.n; i++) {
        const j = i * 3;
        const a = Math.max(0, i - 1) * 3, b = Math.min(c.n - 1, i + 1) * 3;
        const tx = P0[b] - P0[a], ty = P0[b + 1] - P0[a + 1], tz = P0[b + 2] - P0[a + 2];
        const vx = cp.x - P0[j], vy = cp.y - P0[j + 1], vz = cp.z - P0[j + 2];
        let sx = ty * vz - tz * vy, sy = tz * vx - tx * vz, sz = tx * vy - ty * vx;
        const sl = Math.hypot(sx, sy, sz) || 1;
        const u = i / (c.n - 1);
        let w = lerp(c.w0, c.w1, Math.pow(u, 0.7)) * S;
        if (c.frill) w *= 0.7 + 0.45 * Math.sin(i * 1.4 + c.ph) * Math.sin(i * 0.37);
        sx *= w / sl; sy *= w / sl; sz *= w / sl;
        const v = (c.off + i) * 6;
        rPos[v] = P0[j] - sx; rPos[v + 1] = P0[j + 1] - sy; rPos[v + 2] = P0[j + 2] - sz;
        rPos[v + 3] = P0[j] + sx; rPos[v + 4] = P0[j + 1] + sy; rPos[v + 5] = P0[j + 2] + sz;
      }
    }
    rGeo.attributes.position.needsUpdate = true;
  }

  /* ---------- main loop ---------- */
  let last = performance.now(), time = 0, running = true, first = true;
  document.addEventListener('visibilitychange', () => {
    running = !document.hidden;
    if (running) { last = performance.now(); requestAnimationFrame(frame); }
  });

  function frame(now) {
    if (!running) return;
    const dt = Math.min(0.05, Math.max(0.001, (now - last) / 1000));
    last = now;
    const ts = RM ? 0.35 : 1;
    time += dt * ts;
    U.uTime.value = time;

    // scroll → camera
    const pT = progressAt(scrollY);
    st.p = RM || first ? pT : lerp(st.p, pT, 1 - Math.exp(-dt * 5.5));
    if (Math.abs(st.p - pT) < 0.0005) st.p = pT;
    const p = st.p;
    const scrollVel = (p - st.prevP) / dt; st.prevP = p;
    updateMeter(p);
    blendPalette(p);
    Sound.depth(p);
    const newCamY = -p * ZH, dCam = newCamY - st.camY;
    st.camY = newCamY;
    if (dCam !== 0 && !first) {
      // carry the creature (and its tentacles) along with the descent so it never gets left behind;
      // the remaining fraction is what makes the tentacles stream upward while you scroll
      const carry = RM || Math.abs(dCam) > 2.5 ? dCam : dCam * 0.9;
      st.pos.y += carry;
      for (const c of chains) for (let i = 1; i < c.p.length; i += 3) { c.p[i] += carry; c.q[i] += carry; }
    }

    // pointer input / autonomous drift
    const idle = performance.now() - ptr.last > (MOBILE ? 2600 : 6000);
    let nx, ny;
    if (!ptr.has || idle) {
      nx = Math.sin(time * 0.31) * 0.45 + Math.sin(time * 0.13) * 0.2;
      ny = Math.cos(time * 0.23) * 0.3;
      if (gyro.on) { nx = gyro.x * 0.8; ny = gyro.y * 0.6; }
      st.attn = lerp(st.attn, 0.35, 1 - Math.exp(-dt * 2));
    } else {
      nx = ptr.nx; ny = ptr.ny;
      st.attn = lerp(st.attn, 1, 1 - Math.exp(-dt * 3));
    }
    // camera parallax
    const camTX = (ptr.has && !idle ? ptr.nx : nx * 0.4) * (RM ? 0.12 : 0.45);
    const camTY = (ptr.has && !idle ? ptr.ny : ny * 0.4) * (RM ? 0.08 : 0.3);
    cp.x = lerp(cp.x, camTX, 1 - Math.exp(-dt * 2.5));
    cp.y = st.camY + lerp(cp.y - st.camY, camTY, 1 - Math.exp(-dt * 2.5));
    camera.lookAt(cp.x * 0.3, st.camY - 0.2, 0);
    camera.rotation.z += clamp(scrollVel * 0.004, -0.02, 0.02) * (RM ? 0 : 1);
    camera.updateMatrixWorld();
    bg.position.copy(cp);

    pointerWorld(nx, ny, ptrW);
    ptrWs.lerp(ptrW, 1 - Math.exp(-dt * (RM ? 3 : 10)));

    // excitement from pointer speed
    ptr.speed *= Math.exp(-dt * 4);
    const ex = clamp(ptr.speed / 2200, 0, 1) * (RM ? 0.25 : 1);
    st.excite = lerp(st.excite, ex, 1 - Math.exp(-dt * (ex > st.excite ? 8 : 1.5)));
    st.cool -= dt;
    if (!RM && ptr.burst > 3200 && st.cool <= 0 && !idle) {
      st.startle = 1; st.flash = Math.max(st.flash, 1); st.cool = 1.4; st.wake = 1;
      Sound.chirp();
    }
    ptr.burst = 0;

    // pulse cycle: quick contraction, slow relaxation
    const freq = (RM ? 0.32 : 0.5) + st.excite * 1.5;
    st.phase += dt * freq;
    const x = st.phase % 1;
    let c = x < 0.28 ? smooth(x / 0.28) : 1 - smooth((x - 0.28) / 0.72);
    c = c * (RM ? 0.45 : 0.85) + st.startle * 0.9;
    st.startle *= Math.exp(-dt * 3.2);
    st.flash *= Math.exp(-dt * 2.6);
    st.wake *= Math.exp(-dt * 1.2);
    st.cPrev = st.c; st.c = clamp(c, 0, 1.2);
    const dc = Math.max(0, st.c - st.cPrev);

    // motion: spring to anchor + lean toward pointer + thrust on contraction
    anchorAt(p, aim);
    aim.y += st.camY;
    tmp.copy(ptrWs).sub(aim);
    const leanMax = narrow() ? 1.4 : 2.4;
    if (tmp.length() > leanMax) tmp.setLength(leanMax);
    aim.addScaledVector(tmp, 0.32 * st.attn);
    aim.y += Math.sin(time * 0.7) * 0.15;
    const k = RM ? 1.2 : 2.6;
    st.vel.addScaledVector(tmp2.copy(aim).sub(st.pos), k * dt);
    st.vel.addScaledVector(st.up, dc * (RM ? 0.3 : 1.5));
    st.vel.multiplyScalar(Math.exp(-dt * 2.6));
    st.pos.addScaledVector(st.vel, dt);
    // keep up with the descent
    st.pos.y = lerp(st.pos.y, aim.y, 1 - Math.exp(-dt * 3.2));
    st.pos.x = lerp(st.pos.x, aim.x, 1 - Math.exp(-dt * 0.8));

    // orientation: apex turns toward the pointer, leans into motion
    tmp.copy(ptrWs).sub(st.pos);
    const dist = tmp.length();
    tmp2.set(0, 1.25, 0).addScaledVector(tmp.normalize(), 0.95 * st.attn).addScaledVector(st.vel, 0.25);
    tmp2.y -= clamp(scrollVel * 0.02, -0.4, 0.4);
    tmp2.normalize();
    if (tmp2.y < 0.45) { tmp2.y = 0.45; tmp2.normalize(); }
    st.up.lerp(tmp2, 1 - Math.exp(-dt * (RM ? 1.2 : 3))).normalize();
    st.twist += dt * (0.12 + st.excite * 0.4) * ts;
    qa.setFromUnitVectors(Y, st.up);
    qb.setFromAxisAngle(Y, st.twist);
    ent.quaternion.copy(qa).multiply(qb);
    ent.position.copy(st.pos);
    ent.updateMatrixWorld(true);

    // "look" highlight: pointer direction in the creature's local space
    tmp.copy(ptrWs).sub(st.pos).applyQuaternion(qb.copy(ent.quaternion).invert()).normalize();
    st.look.lerp(tmp, 1 - Math.exp(-dt * 6)).normalize();
    bellU.uLook.value.copy(st.look);
    const near = clamp(1 - (dist - 1.2) / 4, 0, 1) * st.attn;

    // colours + glow
    bellU.uColor.value.copy(cur.ent);
    bellU.uC.value = st.c;
    bellU.uFlash.value = st.flash + st.excite * 0.35;
    bellU.uGlow.value = (0.9 + near * 0.35 + Math.sin(time * 1.3) * 0.05) * cur.glow;
    gonMat.color.copy(cur.ent).lerp(tmp3.set(1, 1, 1), 0.4);
    halo.material.color.copy(cur.ent);
    halo.material.opacity = 0.45 * (0.5 + cur.glow * 0.5) * (1 + st.flash * 0.8 + near * 0.3);
    halo.scale.setScalar(5.5 + st.c * 0.6);
    coreDot.material.color.copy(cur.ent).lerp(tmp3.set(1, 1, 1), 0.6);
    entLight.color.copy(cur.ent);
    entLight.intensity = (6 + st.flash * 10) * smooth(clamp(p - 2.6, 0, 1));
    entLight.position.copy(st.pos);

    stepChains(dt * ts, time);
    buildRibbons();

    // environment
    bgMat.uniforms.uTop.value.copy(cur.top);
    bgMat.uniforms.uBot.value.copy(cur.bot);
    bgMat.uniforms.uShaft.value = cur.shaft;
    bgMat.uniforms.uCore.value = cur.core;
    renderer.setClearColor(cur.bot);
    scene.fog.color.copy(cur.bot).lerp(cur.top, 0.35);
    const surfOp = 1 - smooth(clamp(p / 0.9, 0, 1));
    surfMat.uniforms.uOp.value = surfOp;
    surf.visible = surfOp > 0.001;
    shaftMat.uniforms.uOp.value = cur.shaft;
    shafts.visible = cur.shaft > 0.01;
    shafts.children.forEach(m => { m.rotation.z = -0.32 + Math.sin(time * 0.2 + m.userData.sway) * 0.04; });
    const coreOn = smooth(clamp(p - 3.2, 0, 0.8) / 0.8);
    coreGroup.visible = coreOn > 0.001;
    heartU.uPulse.value = 0.5 + 0.5 * Math.sin(time * 1.6);
    coreLight.intensity = 70 * coreOn * (0.85 + heartU.uPulse.value * 0.25);
    heart.rotation.y = time * 0.08;
    heartHalo.material.opacity = 0.75 * coreOn;

    for (const m of [snow, sparks]) {
      m.uniforms.uCamY.value = st.camY;
      m.uniforms.uPointer.value.copy(ptrWs);
      m.uniforms.uWake.value = st.wake;
    }
    snow.uniforms.uColor.value.copy(cur.snow);
    snow.uniforms.uSpark.value.copy(cur.spark);
    snow.uniforms.uAlpha.value = cur.snowA;
    sparks.uniforms.uColor.value.copy(cur.spark);
    sparks.uniforms.uSpark.value.copy(cur.ent).lerp(tmp3.set(1, 1, 1), 0.3);
    sparks.uniforms.uAlpha.value = cur.sparkA * 0.55;
    sparks.uniforms.uDrift.value = lerp(0.05, 0.9, coreOn);
    snow.uniforms.uRepel.value = 1.6 + st.excite * 1.4;

    renderer.render(scene, camera);
    first = false;
    requestAnimationFrame(frame);
  }

  // warm up: place everything, compile shaders, then reveal
  st.p = progressAt(scrollY);
  st.camY = -st.p * ZH;
  anchorAt(st.p, st.pos); st.pos.y += st.camY;
  ent.position.copy(st.pos); ent.updateMatrixWorld(true);
  placeChains();
  setLoad(85);
  coreGroup.visible = true;
  // (shaders compile on the first frame)
  requestAnimationFrame(t => { last = t; frame(t); setLoad(95); finishLoading(); });
  onLoaded = () => { st.flash = 1.2; st.startle = 0.6; st.wake = 0.6; };
}
