/* 3D hero: "Orieb's studio desk".
   An open laptop cycling through her real project screenshots, a phone with her React Native convert app,
   glassy mini-UI cards for the skills she ships (design systems, charts, theming, a11y, Arabic RTL, code)
   and tech tokens on a slow orbit. Built with three.js (vendored, tree-shaken by tools/build-hero3d.mjs).
   - every colour and every canvas texture is re-drawn from the live CSS tokens on theme / accent change
   - tilts toward the cursor, cards bob and lift on hover, the camera eases with scroll
   - clicking the laptop or phone jumps to #projects (the page also has a real link for keyboard / AT users)
   - pixel ratio ≤ 2, textures ≤ 1024 px, lighter scene on phones, pauses off-screen / hidden tab / pause button
   - decorative: the canvas is aria-hidden and never focusable */
import {
  WebGLRenderer, Scene, PerspectiveCamera, Mesh, Group, Shape, ExtrudeGeometry, PlaneGeometry,
  BoxGeometry, BufferGeometry, Float32BufferAttribute, LineLoop, LineBasicMaterial, MeshBasicMaterial,
  MeshStandardMaterial, CanvasTexture, SRGBColorSpace, Color, Vector2, Vector3, Raycaster, PMREMGenerator,
  HemisphereLight, DirectionalLight, BackSide, MathUtils, Box3,
} from '../vendor/three/three.module.js';

const SCREENS = [
  ['pelagic-ui', 'Pelagic UI', 'Accessible component library'],
  ['nawa-captcha', 'Nawa Captcha', 'Self-hosted puzzle CAPTCHA'],
  ['yanbu', 'Visit Yanbu', 'Tourism site · EN / AR'],
  ['burger', 'Jamra', 'Restaurant landing'],
  ['travelnji', 'Travelnji', 'Sustainable tourism'],
  ['descent', 'Noctiluca', 'Scroll-driven story'],
];
const PHONES = ['convert-1', 'convert-2', 'convert-3'];
const TECH = [
  ['Angular', '#dd3355'], ['React', '#38bdf8'], ['React|Native', '#22a6d8'], ['TypeScript', '#3178c6'],
  ['.NET', '#7c4dff'], ['Node.js', '#3c9a46'], ['Three.js', '#8b8b9e'],
];
const AR = document.documentElement.lang === 'ar';
const L = AR
  ? { dark: 'الوضع الداكن', on: 'مفعّل', chart: 'زيارات أسبوعية', themes: ['فاتح', 'داكن', 'أورورا'], ship: 'Ship it', hello: 'مرحبًا', rtl: 'RTL' }
  : { dark: 'Dark mode', on: 'On', chart: 'Weekly visits', themes: ['Light', 'Dark', 'Aurora'], ship: 'Ship it', hello: 'مرحبًا', rtl: 'RTL' };

const css = n => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
const col = (n, fb) => { try { return new Color().setStyle(css(n) || fb); } catch (e) { return new Color(fb); } };
const hex = c => '#' + c.getHexString();
const rgba = (c, a) => `rgba(${Math.round(c.r * 255)},${Math.round(c.g * 255)},${Math.round(c.b * 255)},${a})`;
const FONT = '"Pretendard","IBM Plex Sans Arabic",system-ui,"Segoe UI",sans-serif';
const FONT_AR = '"IBM Plex Sans Arabic","Pretendard",system-ui,"Segoe UI",sans-serif';
const MONO = '"JetBrains Mono",ui-monospace,Consolas,monospace';

function roundShape(w, h, r) {
  const s = new Shape(), x = -w / 2, y = -h / 2;
  s.moveTo(x + r, y); s.lineTo(x + w - r, y); s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + h - r); s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h); s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r); s.quadraticCurveTo(x, y, x + r, y);
  return s;
}
const slab = (w, h, r, d, bevel = .018) => new ExtrudeGeometry(roundShape(w, h, r), { depth: d, bevelEnabled: true, bevelThickness: bevel, bevelSize: bevel, bevelSegments: 3, curveSegments: 10 });
function rr(ctx, x, y, w, h, r) { ctx.beginPath(); ctx.roundRect ? ctx.roundRect(x, y, w, h, r) : ctx.rect(x, y, w, h); }

export function mount(host, opts = {}) {
  const mobile = opts.mobile ?? (matchMedia('(max-width: 900px)').matches || matchMedia('(pointer: coarse)').matches);
  const renderer = new WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
  let DPR = Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 2);
  renderer.setPixelRatio(DPR);
  renderer.setClearColor(0x000000, 0);
  const canvas = renderer.domElement;
  canvas.setAttribute('aria-hidden', 'true'); canvas.setAttribute('role', 'presentation'); canvas.tabIndex = -1;
  host.appendChild(canvas);
  const maxAniso = Math.min(8, renderer.capabilities.getMaxAnisotropy());

  let raf = 0, running = false, visible = true, paused = false, t0 = performance.now(), t = 0, frames = 0, dirty = false;
  const scene = new Scene();
  const camera = new PerspectiveCamera(26, 1, .1, 80);
  const world = new Group(); scene.add(world);
  const rig = new Group(); world.add(rig);          // tilts toward the cursor
  const disposables = [];
  const keep = x => (disposables.push(x), x);

  /* ---------- canvas textures ---------- */
  const K = mobile ? 1.6 : 2.4;                       // canvas px per design px
  const U = 1 / 108;                                  // world units per design px
  function canvasTex(w, h) {
    const c = document.createElement('canvas'); c.width = Math.min(1024, Math.round(w)); c.height = Math.min(1024, Math.round(h));
    const t = keep(new CanvasTexture(c)); t.colorSpace = SRGBColorSpace; t.anisotropy = maxAniso;
    return { c, ctx: c.getContext('2d'), t };
  }

  /* ---------- theme ---------- */
  let T = {};
  function readTheme() {
    const root = document.documentElement;
    const dark = root.getAttribute('data-theme') === 'dark' || (root.getAttribute('data-theme') !== 'light' && matchMedia('(prefers-color-scheme: dark)').matches);
    T = {
      dark, bg: col('--bg', '#f8f6ff'), surface: col('--surface', '#ffffff'), surface2: col('--surface-2', '#faf9ff'),
      ink: col('--ink', '#1f1b2e'), ink2: col('--ink-2', '#4f4a68'), ink3: col('--ink-3', '#7a7495'), line: col('--line-2', '#d9d0f5'),
      accent: col('--accent', '#6d4aff'), accentInk: col('--accent-ink', '#ffffff'), accent2: col('--accent-2', '#b9a7ff'), accent3: col('--accent-3', '#8f73ff'),
      pink: col('--pink', '#ffb8d6'), mint: col('--mint', '#a8ecd6'), sky: col('--sky', '#bfe0ff'), butter: col('--butter', '#ffe6a3'), soft: col('--soft', '#efeaff'),
    };
  }
  readTheme();

  /* ---------- environment (soft studio reflections, generated, no HDR download) ---------- */
  const pmrem = new PMREMGenerator(renderer);
  let envRT = null;
  function buildEnv() {
    const es = new Scene();
    const room = new Mesh(new BoxGeometry(20, 12, 20), new MeshBasicMaterial({ side: BackSide, color: T.dark ? new Color('#17151e').lerp(T.accent2, .06) : new Color('#e9e4f8').lerp(T.accent2, .25) }));
    es.add(room);
    const panel = (w, h, c, p, ry = 0, rx = 0) => { const m = new Mesh(new PlaneGeometry(w, h), new MeshBasicMaterial({ color: c, side: 2 })); m.position.copy(p); m.rotation.set(rx, ry, 0); es.add(m); };
    const k = T.dark ? 2.2 : 3.2;
    panel(10, 4, new Color(k, k, k), new Vector3(0, 5.9, 0), 0, Math.PI / 2);                  // top softbox
    panel(4, 8, new Color(k * .9, k * .85, k), new Vector3(-9.9, 1, 2), Math.PI / 2);           // left strip
    panel(3, 6, T.pink.clone().multiplyScalar(k * .6), new Vector3(9.9, 0, -2), -Math.PI / 2);  // warm right strip
    panel(6, 3, T.accent2.clone().multiplyScalar(k * (T.dark ? .25 : .5)), new Vector3(0, 1, -9.9));             // back accent glow
    const rt = pmrem.fromScene(es, .035);
    es.traverse(o => { o.geometry?.dispose(); o.material?.dispose(); });
    if (envRT) envRT.dispose();
    envRT = rt; scene.environment = rt.texture;
  }

  /* ---------- lights ---------- */
  const hemi = new HemisphereLight(0xffffff, 0xd8ccff, .7); scene.add(hemi);
  const key = new DirectionalLight(0xffffff, 1.25); key.position.set(-3, 6, 5); scene.add(key);

  /* ---------- materials ---------- */
  const metal = keep(new MeshStandardMaterial({ metalness: .62, roughness: .3 }));
  const bezelMat = keep(new MeshStandardMaterial({ color: 0x0b0a10, metalness: .2, roughness: .25 }));
  const shadowTex = canvasTex(256, 256);
  { const g = shadowTex.ctx.createRadialGradient(128, 128, 0, 128, 128, 128); g.addColorStop(0, 'rgba(0,0,0,.55)'); g.addColorStop(.55, 'rgba(0,0,0,.18)'); g.addColorStop(1, 'rgba(0,0,0,0)'); shadowTex.ctx.fillStyle = g; shadowTex.ctx.fillRect(0, 0, 256, 256); }
  const shadowMat = keep(new MeshBasicMaterial({ map: shadowTex.t, transparent: true, depthWrite: false, opacity: .5 }));
  const shadow = (w, d, p) => { const m = new Mesh(keep(new PlaneGeometry(w, d)), shadowMat); m.rotation.x = -Math.PI / 2; m.position.copy(p); m.renderOrder = -1; rig.add(m); return m; };

  /* ---------- laptop ---------- */
  const LW = 3.3, LD = 2.22, LH = .07, SW = 3.04, SH = 1.9;
  const laptop = new Group(); rig.add(laptop); laptop.scale.setScalar(mobile ? 1.15 : 1.24); laptop.position.z = -.25;
  const base = new Mesh(keep(slab(LW, LD, .14, LH)), metal); base.rotation.x = -Math.PI / 2; laptop.add(base);
  const deckTex = canvasTex(1024, 688);
  const deck = new Mesh(keep(new PlaneGeometry(LW - .16, LD - .16)), keep(new MeshStandardMaterial({ map: deckTex.t, metalness: .5, roughness: .42 })));
  deck.rotation.x = -Math.PI / 2; deck.position.y = LH + .019; laptop.add(deck);
  const lid = new Group(); lid.position.set(0, LH + .01, -LD / 2 + .02); laptop.add(lid);
  const lidBody = new Mesh(keep(slab(LW, 2.16, .14, .04)), metal); lidBody.position.set(0, 1.08, -.06); lid.add(lidBody);
  const bezel = new Mesh(keep(new ExtrudeGeometry(roundShape(LW - .05, 2.11, .12), { depth: .004, bevelEnabled: false, curveSegments: 10 })), bezelMat);
  bezel.position.set(0, 1.08, .0); lid.add(bezel);
  // screen: two stacked planes cross-fade between project screenshots
  const screenGeo = keep(new PlaneGeometry(SW, SH));
  const scrA = new Mesh(screenGeo, keep(new MeshBasicMaterial({ toneMapped: false })));
  const scrB = new Mesh(screenGeo, keep(new MeshBasicMaterial({ toneMapped: false, transparent: true, opacity: 0, depthWrite: false })));
  scrA.position.set(0, 1.1, .006); scrB.position.set(0, 1.1, .007); scrB.renderOrder = 2;
  lid.add(scrA, scrB);
  // soft glass glare on the screen
  const glareTex = canvasTex(256, 256);
  { const g = glareTex.ctx.createLinearGradient(0, 0, 256, 256); g.addColorStop(0, 'rgba(255,255,255,.16)'); g.addColorStop(.38, 'rgba(255,255,255,.04)'); g.addColorStop(.39, 'rgba(255,255,255,0)'); g.addColorStop(1, 'rgba(255,255,255,0)'); glareTex.ctx.fillStyle = g; glareTex.ctx.fillRect(0, 0, 256, 256); }
  const glare = new Mesh(screenGeo, keep(new MeshBasicMaterial({ map: glareTex.t, transparent: true, depthWrite: false, toneMapped: false })));
  glare.position.set(0, 1.1, .008); glare.renderOrder = 3; lid.add(glare);
  { const sh = shadow(LW * 1.5, LD * 1.45, new Vector3(0, -.012, .05)); rig.remove(sh); laptop.add(sh); }

  /* ---------- phone ---------- */
  const PW = .82, PH = 1.7;
  const phone = new Group(); rig.add(phone); phone.scale.setScalar(mobile ? 1.05 : 1.12);
  const pBody = new Mesh(keep(slab(PW, PH, .14, .05, .02)), metal); pBody.position.z = -.05; phone.add(pBody);
  const pBezel = new Mesh(keep(new ExtrudeGeometry(roundShape(PW - .03, PH - .03, .125), { depth: .003, bevelEnabled: false, curveSegments: 10 })), bezelMat); pBezel.position.z = .02; phone.add(pBezel);
  const pGeo = keep(new PlaneGeometry(PW - .1, PH - .1));
  const phA = new Mesh(pGeo, keep(new MeshBasicMaterial({ toneMapped: false, transparent: true })));
  const phB = new Mesh(pGeo, keep(new MeshBasicMaterial({ toneMapped: false, transparent: true, opacity: 0, depthWrite: false })));
  phA.position.z = .025; phB.position.z = .026; phB.renderOrder = 2; phone.add(phA, phB);
  const pGlare = new Mesh(pGeo, glare.material); pGlare.position.z = .027; pGlare.renderOrder = 3; phone.add(pGlare);
  const phoneShadow = shadow(1.5, .7, new Vector3(0, -.012, 0));

  /* ---------- screen textures (real project screenshots) ---------- */
  const ssScale = mobile ? .62 : 1;
  const screens = SCREENS.map(([file, name, sub]) => ({ file, name, sub, img: null, tex: canvasTex(1024 * ssScale, 640 * ssScale) }));
  const phones = PHONES.map(file => ({ file, img: null, tex: canvasTex(320 * (mobile ? .75 : 1), 664 * (mobile ? .75 : 1)) }));
  function drawScreen(s) {
    const { c, ctx } = s.tex, W = c.width, H = c.height, k = W / 1024, bar = Math.round(34 * k);
    ctx.fillStyle = T.dark ? '#1c1928' : '#f4f1fb'; ctx.fillRect(0, 0, W, bar);
    [['#ff6b6b'], ['#ffc94d'], ['#4cd28a']].forEach(([cc], i) => { ctx.fillStyle = cc; ctx.beginPath(); ctx.arc((18 + i * 18) * k, bar / 2, 5.2 * k, 0, 7); ctx.fill(); });
    const tw = 300 * k, tx = (W - tw) / 2;
    ctx.fillStyle = T.dark ? '#2a2638' : '#ffffff'; rr(ctx, tx, 6 * k, tw, bar - 12 * k, 9 * k); ctx.fill();
    ctx.fillStyle = T.dark ? '#d9d3ee' : '#4f4a68'; ctx.font = `600 ${13 * k}px ${FONT}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(`${s.name} · ${s.sub}`, W / 2, bar / 2 + .5 * k, tw - 20 * k);
    if (s.img) ctx.drawImage(s.img, 0, 0, s.img.width, s.img.height * (H - bar) / H, 0, bar, W, H - bar);
    else { ctx.fillStyle = hex(T.soft); ctx.fillRect(0, bar, W, H - bar); }
    s.tex.t.needsUpdate = true;
  }
  function drawPhone(p) {
    const { c, ctx } = p.tex, W = c.width, H = c.height;
    ctx.clearRect(0, 0, W, H); ctx.save(); rr(ctx, 0, 0, W, H, W * .14); ctx.clip();
    if (p.img) ctx.drawImage(p.img, 0, 0, W, H); else { ctx.fillStyle = hex(T.soft); ctx.fillRect(0, 0, W, H); }
    ctx.restore(); p.tex.t.needsUpdate = true;
  }
  const loads = [];
  const loadImg = (src, cb) => loads.push(new Promise(res => { const im = new Image(); im.decoding = 'async'; im.onload = () => { cb(im); res(); }; im.onerror = res; im.src = src; }));
  screens.forEach((s, i) => loadImg(`/assets/studio/${s.file}.webp`, im => { s.img = im; drawScreen(s); if (i === 0) requestRender(); }));
  phones.forEach((p, i) => loadImg(`/assets/studio/${p.file}.webp`, im => { p.img = im; drawPhone(p); if (i === 0) requestRender(); }));
  scrA.material.map = screens[0].tex.t; scrB.material.map = screens[1].tex.t;
  phA.material.map = phones[0].tex.t; phB.material.map = phones[1].tex.t;

  function drawDeck() {
    const { c, ctx } = deckTex, W = c.width, H = c.height;
    const baseC = T.dark ? new Color('#4a4858').lerp(T.accent2, .04) : new Color('#e6e1f2').lerp(T.accent2, .12);
    ctx.fillStyle = hex(baseC); ctx.fillRect(0, 0, W, H);
    const keyC = T.dark ? '#16131f' : '#d3cce6', kw = 58, gap = 9, cols = 14, rows = 5;
    const kx0 = (W - (cols * kw + (cols - 1) * gap)) / 2, ky0 = 70;
    ctx.fillStyle = T.dark ? 'rgba(0,0,0,.25)' : 'rgba(80,60,140,.08)'; rr(ctx, kx0 - 16, ky0 - 16, W - 2 * kx0 + 32, rows * (kw * .82 + gap) + 24, 18); ctx.fill();
    ctx.fillStyle = keyC;
    for (let r = 0; r < rows; r++) for (let i = 0; i < cols; i++) {
      let x = kx0 + i * (kw + gap), w = kw;
      if (r === rows - 1 && i === 5) { w = kw * 5 + gap * 4; } else if (r === rows - 1 && i > 5 && i < 10) continue;
      rr(ctx, x, ky0 + r * (kw * .82 + gap), w, kw * .82, 8); ctx.fill();
    }
    ctx.fillStyle = T.dark ? 'rgba(255,255,255,.05)' : 'rgba(255,255,255,.55)'; ctx.strokeStyle = T.dark ? 'rgba(255,255,255,.08)' : 'rgba(80,60,140,.12)'; ctx.lineWidth = 2;
    rr(ctx, W / 2 - 190, ky0 + rows * (kw * .82 + gap) + 34, 380, 210, 18); ctx.fill(); ctx.stroke();
    deckTex.t.needsUpdate = true;
  }

  /* ---------- glass UI cards ---------- */
  const cards = [];
  const PAD = 26;                                         // design px around a card for its soft shadow
  function glass(ctx, x, y, w, h, r) {
    ctx.save();
    ctx.shadowColor = T.dark ? 'rgba(0,0,0,.55)' : rgba(T.accent, .22); ctx.shadowBlur = 22; ctx.shadowOffsetY = 9;
    const g = ctx.createLinearGradient(x, y, x, y + h);
    if (T.dark) { g.addColorStop(0, rgba(T.surface2.clone().lerp(T.accent2, .12), .94)); g.addColorStop(1, rgba(T.surface, .9)); }
    else { g.addColorStop(0, 'rgba(255,255,255,.97)'); g.addColorStop(1, rgba(new Color(1, 1, 1).lerp(T.soft, .55), .93)); }
    ctx.fillStyle = g; rr(ctx, x, y, w, h, r); ctx.fill(); ctx.restore();
    ctx.lineWidth = 1.2; ctx.strokeStyle = T.dark ? 'rgba(255,255,255,.13)' : rgba(T.line, .9); rr(ctx, x + .5, y + .5, w - 1, h - 1, r); ctx.stroke();
    const hl = ctx.createLinearGradient(x, y, x, y + h * .5); hl.addColorStop(0, T.dark ? 'rgba(255,255,255,.08)' : 'rgba(255,255,255,.9)'); hl.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.strokeStyle = hl; rr(ctx, x + 1.5, y + 1.5, w - 3, h - 3, r - 1); ctx.stroke();
  }
  const DRAW = {
    toggle(ctx, w, h) {
      glass(ctx, 0, 0, w, h, 18);
      ctx.fillStyle = hex(T.ink); ctx.font = `700 15px ${AR ? FONT_AR : FONT}`; ctx.textBaseline = 'middle'; ctx.textAlign = AR ? 'right' : 'left';
      const tx = AR ? w - 18 : 18; ctx.fillText(L.dark, tx, h / 2 - 8);
      ctx.fillStyle = hex(T.ink3); ctx.font = `500 12px ${AR ? FONT_AR : FONT}`; ctx.fillText(L.on, tx, h / 2 + 11);
      const sx = AR ? 16 : w - 16 - 50, sy = h / 2 - 14;
      const g = ctx.createLinearGradient(sx, 0, sx + 50, 0); g.addColorStop(0, hex(T.accent)); g.addColorStop(1, hex(T.accent3));
      ctx.fillStyle = g; rr(ctx, sx, sy, 50, 28, 14); ctx.fill();
      ctx.save(); ctx.shadowColor = 'rgba(0,0,0,.25)'; ctx.shadowBlur = 5; ctx.shadowOffsetY = 1.5; ctx.fillStyle = '#fff';
      ctx.beginPath(); ctx.arc(AR ? sx + 14 : sx + 36, sy + 14, 11, 0, 7); ctx.fill(); ctx.restore();
    },
    ship(ctx, w, h) {
      glass(ctx, 0, 0, w, h, 20);
      const bx = 14, by = 13, bw = w - 28, bh = h - 26;
      ctx.save(); ctx.shadowColor = rgba(T.accent, .45); ctx.shadowBlur = 14; ctx.shadowOffsetY = 5;
      const g = ctx.createLinearGradient(bx, by, bx + bw, by + bh); g.addColorStop(0, hex(T.accent)); g.addColorStop(1, hex(T.accent3));
      ctx.fillStyle = g; rr(ctx, bx, by, bw, bh, bh / 2); ctx.fill(); ctx.restore();
      ctx.fillStyle = hex(T.accentInk); ctx.font = `800 16px ${FONT}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(L.ship + '  →', w / 2, h / 2 + 1);
    },
    chart(ctx, w, h) {
      glass(ctx, 0, 0, w, h, 20);
      ctx.textBaseline = 'alphabetic'; ctx.textAlign = AR ? 'right' : 'left';
      const tx = AR ? w - 16 : 16;
      ctx.fillStyle = hex(T.ink3); ctx.font = `600 11.5px ${AR ? FONT_AR : FONT}`; ctx.fillText(L.chart, tx, 26);
      ctx.fillStyle = hex(T.ink); ctx.font = `800 21px ${FONT}`; ctx.fillText('12.4k', tx, 51);
      ctx.fillStyle = T.dark ? '#7fe6c4' : '#0b7a5c'; ctx.font = `700 12px ${FONT}`; ctx.textAlign = AR ? 'left' : 'right'; ctx.fillText('▲ 18%', AR ? 16 : w - 16, 51);
      const vals = [.42, .58, .5, .74, .66, .9, .8], n = vals.length, x0 = 16, bw = (w - 32 - (n - 1) * 7) / n, yb = h - 16, hm = h - 84;
      vals.forEach((v, i) => {
        const g = ctx.createLinearGradient(0, yb - hm * v, 0, yb);
        g.addColorStop(0, hex(i === 5 ? T.accent : T.accent3)); g.addColorStop(1, rgba(i === 5 ? T.accent : T.accent2, i === 5 ? .85 : .45));
        ctx.fillStyle = g; rr(ctx, x0 + i * (bw + 7), yb - hm * v, bw, hm * v, 5); ctx.fill();
      });
    },
    themes(ctx, w, h) {
      glass(ctx, 0, 0, w, h, 18);
      const sw = [['#f8f6ff', '#6d4aff'], ['#0f0d16', '#b8a4ff'], ['#070b1a', '#5eead4']];
      const cw = (w - 32) / 3;
      sw.forEach(([bg, ac], i) => {
        const cx = 16 + cw * i + cw / 2, cy = h / 2 - 8;
        ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, 15, 0, 7); ctx.clip();
        ctx.fillStyle = bg; ctx.fillRect(cx - 15, cy - 15, 30, 30);
        ctx.fillStyle = ac; ctx.beginPath(); ctx.moveTo(cx + 15, cy - 15); ctx.lineTo(cx + 15, cy + 15); ctx.lineTo(cx - 15, cy + 15); ctx.fill(); ctx.restore();
        ctx.lineWidth = i === 0 ? 2.6 : 1.2; ctx.strokeStyle = i === 0 ? hex(T.accent) : rgba(T.ink3, .45);
        ctx.beginPath(); ctx.arc(cx, cy, i === 0 ? 18 : 15.5, 0, 7); ctx.stroke();
        ctx.fillStyle = hex(i === 0 ? T.ink : T.ink2); ctx.font = `${i === 0 ? 700 : 500} 11px ${AR ? FONT_AR : FONT}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(L.themes[i], cx, h - 15);
      });
    },
    wcag(ctx, w, h) {
      glass(ctx, 0, 0, w, h, h / 2);
      const cx = 16 + 16, cy = h / 2;
      ctx.fillStyle = T.dark ? rgba(T.mint, .2) : '#e3f7ef'; ctx.beginPath(); ctx.arc(cx, cy, 16, 0, 7); ctx.fill();
      const ic = T.dark ? '#7fe6c4' : '#0b7a5c'; ctx.fillStyle = ic; ctx.strokeStyle = ic; ctx.lineWidth = 2.2; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.arc(cx, cy - 7, 2.6, 0, 7); ctx.fill();
      ctx.beginPath(); ctx.moveTo(cx - 8, cy - 2.5); ctx.lineTo(cx + 8, cy - 2.5); ctx.moveTo(cx, cy - 2.5); ctx.lineTo(cx, cy + 3); ctx.lineTo(cx - 4.5, cy + 9.5); ctx.moveTo(cx, cy + 3); ctx.lineTo(cx + 4.5, cy + 9.5); ctx.stroke();
      ctx.fillStyle = hex(T.ink); ctx.font = `800 15px ${FONT}`; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillText('WCAG 2.2 AA', cx + 26, cy + 1);
    },
    hello(ctx, w, h) {
      glass(ctx, 0, 0, w, h, h / 2);
      ctx.direction = 'rtl'; ctx.fillStyle = hex(T.ink); ctx.font = `700 19px ${FONT_AR}`; ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
      ctx.fillText('«' + L.hello + '»', w - 18, h / 2 + 1);
      ctx.direction = 'ltr'; ctx.textAlign = 'center';
      const g = ctx.createLinearGradient(14, 0, 54, 0); g.addColorStop(0, hex(T.accent)); g.addColorStop(1, hex(T.accent3));
      ctx.fillStyle = g; rr(ctx, 14, h / 2 - 11, 40, 22, 11); ctx.fill();
      ctx.fillStyle = hex(T.accentInk); ctx.font = `800 10.5px ${FONT}`; ctx.fillText(L.rtl, 34, h / 2 + 1);
    },
    code(ctx, w, h) {
      ctx.save(); ctx.shadowColor = T.dark ? 'rgba(0,0,0,.6)' : rgba(T.accent, .28); ctx.shadowBlur = 22; ctx.shadowOffsetY = 9;
      ctx.fillStyle = T.dark ? '#13111c' : '#1c1830'; rr(ctx, 0, 0, w, h, 16); ctx.fill(); ctx.restore();
      ctx.strokeStyle = 'rgba(255,255,255,.1)'; ctx.lineWidth = 1.2; rr(ctx, .5, .5, w - 1, h - 1, 16); ctx.stroke();
      ['#ff6b6b', '#ffc94d', '#4cd28a'].forEach((cc, i) => { ctx.fillStyle = cc; ctx.beginPath(); ctx.arc(18 + i * 14, 17, 4.2, 0, 7); ctx.fill(); });
      ctx.fillStyle = 'rgba(255,255,255,.45)'; ctx.font = `500 10.5px ${MONO}`; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillText('orieb.ts', 68, 17.5);
      const parts = [['const ', '#c4a7ff'], ['orieb', '#f3f0fc'], [' = { ', '#a39bc4'], ['ship', '#7dd3fc'], [': ', '#a39bc4'], ["'with care 💜'", '#f9a8d4'], [' }', '#a39bc4']];
      ctx.font = `600 14px ${MONO}`; let x = 18; const y = h / 2 + 11;
      for (const [s, c] of parts) { ctx.fillStyle = c; ctx.fillText(s, x, y); x += ctx.measureText(s).width; }
    },
  };
  // design px size, world position (LTR; mirrored in RTL), bob speed, mobile?
  const CARD_DEFS = [
    ['code', 346, 64, [-3.0, 2.75, .3], .7, false],
    ['toggle', 184, 58, [-3.95, 1.55, .45], .9, false],
    ['themes', 196, 74, [-3.6, .42, .9], .8, false],
    ['ship', 148, 58, [-1.9, .02, 1.6], 1.1, [-1.35, -.2, 1.5]],
    ['chart', 186, 130, [3.75, 2.3, -.2], .75, false],
    ['hello', 146, 48, [1.95, 3.0, .5], 1, [-1.25, 3.15, .3]],
    ['wcag', 186, 50, [3.85, .5, 1.0], .95, [1.15, 3.05, .1]],
  ];
  const rtl = document.documentElement.dir === 'rtl';
  for (let [kind, w, h, pos, speed, onMobile] of CARD_DEFS) {
    if (mobile && !onMobile) continue;
    if (mobile) pos = onMobile;
    const cw = w + PAD * 2, ch = h + PAD * 2;
    const tex = canvasTex(cw * K, ch * K);
    const mat = keep(new MeshBasicMaterial({ map: tex.t, transparent: true, depthWrite: false, toneMapped: false }));
    const m = new Mesh(keep(new PlaneGeometry(cw * U, ch * U)), mat);
    const p = new Vector3(rtl ? -pos[0] : pos[0], pos[1], pos[2]);
    m.position.copy(p); m.renderOrder = 5;
    m.userData = { kind, w, h, tex, base: p, speed, phase: Math.random() * 6.28, lift: 0, hover: 0, ry: (p.x > 0 ? -1 : 1) * .16 };
    rig.add(m); cards.push(m);
  }
  function drawCard(m) {
    const { kind, w, h, tex } = m.userData, { ctx, c } = tex, s = c.width / (w + PAD * 2);
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, c.width, c.height);
    ctx.setTransform(s, 0, 0, s, PAD * s, PAD * s); DRAW[kind](ctx, w, h);
    tex.t.needsUpdate = true;
  }

  /* ---------- tech tokens on a slow, tilted orbit ---------- */
  const tokens = [];
  const ORB = mobile ? { rx: 2.3, rz: 1.35, cy: 1.2, k: 1.25 } : { rx: 4.6, rz: 2.1, cy: 1.3, k: 1.35 };
  const tokenList = mobile ? TECH.filter((_, i) => i !== 6 && i !== 2) : TECH;
  const TR = mobile ? .34 : .36;
  const coinGeo = keep(new PlaneGeometry(TR * 2, TR * 2));
  tokenList.forEach(([label, tint], i) => {
    const tex = canvasTex(mobile ? 160 : 256, mobile ? 160 : 256);
    const face = keep(new MeshBasicMaterial({ map: tex.t, transparent: true, depthWrite: false, toneMapped: false }));
    // cylinder groups: 0 side, 1 top cap, 2 bottom cap (top faces +z after rotateX)
    const m = new Mesh(coinGeo, face); m.renderOrder = 5;
    m.userData = { label, tint, tex, a: (i / tokenList.length) * Math.PI * 2 };
    rig.add(m); tokens.push(m);
  });
  function drawToken(m) {
    const { label, tint, tex } = m.userData, { ctx, c } = tex, S = c.width, r = S / 2;
    ctx.clearRect(0, 0, S, S);
    const tc = new Color(tint);
    ctx.save(); ctx.translate(r, r); ctx.scale(.84, .84); ctx.translate(-r, -r);
    ctx.save(); ctx.shadowColor = T.dark ? 'rgba(0,0,0,.6)' : rgba(T.accent, .3); ctx.shadowBlur = S * .08; ctx.shadowOffsetY = S * .03;
    ctx.fillStyle = T.dark ? '#2b2740' : '#ffffff'; ctx.beginPath(); ctx.arc(r, r, r - 1, 0, 7); ctx.fill(); ctx.restore();
    const g = ctx.createLinearGradient(0, 0, 0, S);
    if (T.dark) { g.addColorStop(0, rgba(T.surface2.clone().lerp(tc, .22), 1)); g.addColorStop(1, rgba(T.surface.clone().lerp(tc, .1), 1)); }
    else { g.addColorStop(0, '#ffffff'); g.addColorStop(1, rgba(new Color(1, 1, 1).lerp(tc, .12), 1)); }
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(r, r, r, 0, 7); ctx.fill();
    ctx.lineWidth = S * .035; ctx.strokeStyle = rgba(tc, T.dark ? .75 : .6); ctx.beginPath(); ctx.arc(r, r, r - S * .045, 0, 7); ctx.stroke();
    ctx.fillStyle = T.dark ? '#f3f0fc' : hex(new Color('#1f1b2e').lerp(tc, .25)); ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    const lines = label.split('|'), fs = S * (lines.length > 1 ? .17 : label.length > 7 ? .155 : .19);
    ctx.font = `800 ${fs}px ${FONT}`;
    lines.forEach((ln, j) => ctx.fillText(ln, r, r + (j - (lines.length - 1) / 2) * fs * 1.1, S * .8));
    const hl = ctx.createLinearGradient(0, 0, 0, r); hl.addColorStop(0, T.dark ? 'rgba(255,255,255,.14)' : 'rgba(255,255,255,.7)'); hl.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = hl; ctx.beginPath(); ctx.ellipse(r, r * .55, r * .72, r * .38, 0, 0, 7); ctx.fill();
    ctx.restore();
    tex.t.needsUpdate = true;
  }
  const orbitPos = (a, out) => out.set(ORB.rx * Math.cos(a), ORB.cy - ORB.k * Math.sin(a) * .62, ORB.rz * Math.sin(a) - .35);
  const ringPts = []; const tmp = new Vector3();
  for (let i = 0; i < 160; i++) { orbitPos(i / 160 * Math.PI * 2, tmp); ringPts.push(tmp.x, tmp.y, tmp.z); }
  const ringGeo = keep(new BufferGeometry()); ringGeo.setAttribute('position', new Float32BufferAttribute(ringPts, 3));
  const ringMat = keep(new LineBasicMaterial({ transparent: true, opacity: .32, depthWrite: false }));
  const ring = new LineLoop(ringGeo, ringMat); rig.add(ring);

  /* ---------- colours ---------- */
  function setColors() {
    readTheme();
    metal.color.copy(T.dark ? new Color('#55526a').lerp(T.accent2, .05) : new Color('#ebe8f4').lerp(T.accent2, .1));
    metal.metalness = T.dark ? .6 : .5; metal.roughness = T.dark ? .36 : .3;
    hemi.color.set(0xffffff); hemi.groundColor.copy(T.accent2); hemi.intensity = T.dark ? .55 : .75;
    key.intensity = T.dark ? 1 : 1.25;
    shadowMat.color.copy(T.dark ? new Color(0, 0, 0) : new Color('#2a1a66')); shadowMat.opacity = T.dark ? .7 : .32;
    ringMat.color.copy(T.accent); ringMat.opacity = T.dark ? .3 : .24;
    buildEnv(); drawDeck();
    screens.forEach(drawScreen); phones.forEach(drawPhone); cards.forEach(drawCard); tokens.forEach(drawToken);
    requestRender();
  }

  /* ---------- layout ---------- */
  let W = 1, H = 1;
  const camBase = new Vector3(), look = new Vector3();
  function fit(w, h) {
    renderer.setSize(w, h, false); camera.aspect = w / h;
    // fit the composition (content box ≈ 10.4 × 3.9 world units on desktop, 6.6 × 4.2 on phones)
    const bw = mobile ? 5.5 : 10.8, bh = mobile ? 4.9 : 4.3;
    const vf = MathUtils.degToRad(camera.fov) / 2;
    const dist = Math.max(bh / 2 / Math.tan(vf), bw / 2 / (Math.tan(vf) * camera.aspect));
    look.set(0, mobile ? 1.35 : 1.22, 0);
    camBase.set(0, look.y + dist * .2, dist * .98);
    camera.updateProjectionMatrix();
  }
  function resize() { const r = host.getBoundingClientRect(); W = Math.max(1, r.width); H = Math.max(1, r.height); fit(W, H); requestRender(); }
  // phone placement (mirrored in RTL); on phones it sits closer to the laptop
  const phonePos = new Vector3(mobile ? 1.75 : 2.78, mobile ? .9 : 1.0, mobile ? .9 : .72); if (rtl) phonePos.x *= -1;
  phone.rotation.set(-.05, rtl ? .34 : -.34, rtl ? -.03 : .03);
  phoneShadow.position.set(phonePos.x, -.012, phonePos.z); phoneShadow.rotation.z = rtl ? -.34 : .34;
  resize();
  const ro = new ResizeObserver(resize); ro.observe(host);

  /* ---------- input ---------- */
  const ptr = new Vector2(), ptrS = new Vector2(), ndc = new Vector2(-9, -9);
  let inside = false;
  const onMove = e => {
    ptr.set((e.clientX / innerWidth) * 2 - 1, -((e.clientY / innerHeight) * 2 - 1));
    const r = canvas.getBoundingClientRect();
    inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
    if (inside) ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1); else ndc.set(-9, -9);
  };
  addEventListener('pointermove', onMove, { passive: true });
  let scrollP = 0;
  const onScroll = () => { const r = host.getBoundingClientRect(); scrollP = MathUtils.clamp(1 - (r.top + r.height / 2) / innerHeight, -1, 1.5); };
  addEventListener('scroll', onScroll, { passive: true }); onScroll();
  const ray = new Raycaster();
  const clickables = [scrA, scrB, glare, pGlare, phA, phB];
  function pick() {
    if (!inside) return null;
    ray.setFromCamera(ndc, camera);
    const hit = ray.intersectObjects([...cards, ...clickables], false)[0];
    return hit ? hit.object : null;
  }
  const onClick = e => {
    onMove(e); const o = pick();
    if (o && clickables.includes(o)) {
      const target = document.getElementById('projects');
      if (target) { target.scrollIntoView({ behavior: window.OA?.reducedMotion?.() ? 'auto' : 'smooth' }); history.replaceState(null, '', '#projects'); }
    }
  };
  canvas.addEventListener('click', onClick);

  /* ---------- loop ---------- */
  let slow = 0, slowN = 0;
  let slide = 0, slideT = 0, pslide = 0, pslideT = 0, hovered = null;
  const SLIDE = 4.2, FADE = .9;
  function step(dt) {
    t += dt;
    ptrS.lerp(ptr, .06);
    // hover
    if (frames % 3 === 0) {
      const o = pick(); hovered = o && cards.includes(o) ? o : null;
      canvas.style.cursor = o && clickables.includes(o) ? 'pointer' : '';
    }
    // laptop screenshots cross-fade
    slideT += dt;
    if (slideT > SLIDE) {
      const f = Math.min(1, (slideT - SLIDE) / FADE);
      scrB.material.opacity = f * f * (3 - 2 * f);
      if (f >= 1) {
        slide = (slide + 1) % screens.length; slideT = 0;
        scrA.material.map = screens[slide].tex.t; scrA.material.needsUpdate = true;
        scrB.material.map = screens[(slide + 1) % screens.length].tex.t; scrB.material.needsUpdate = true; scrB.material.opacity = 0;
      }
    }
    pslideT += dt;
    if (pslideT > SLIDE * 1.3) {
      const f = Math.min(1, (pslideT - SLIDE * 1.3) / FADE);
      phB.material.opacity = f * f * (3 - 2 * f);
      if (f >= 1) {
        pslide = (pslide + 1) % phones.length; pslideT = 0;
        phA.material.map = phones[pslide].tex.t; phA.material.needsUpdate = true;
        phB.material.map = phones[(pslide + 1) % phones.length].tex.t; phB.material.needsUpdate = true; phB.material.opacity = 0;
      }
    }
  }
  function pose() {
    const sp = MathUtils.clamp(scrollP, 0, 1);
    rig.rotation.y = ptrS.x * .14; rig.rotation.x = -ptrS.y * .05;
    lid.rotation.x = -.2 - sp * .1;
    camera.position.set(camBase.x, camBase.y + sp * .9, camBase.z * (1 - sp * .06));
    camera.lookAt(look.x, look.y + sp * .15, look.z);
    phone.position.set(phonePos.x, phonePos.y + Math.sin(t * .9) * .05, phonePos.z);
    for (const m of cards) {
      const d = m.userData;
      d.hover += ((hovered === m ? 1 : 0) - d.hover) * .14;
      m.position.set(d.base.x - ptrS.x * .1 * d.speed, d.base.y + Math.sin(t * d.speed + d.phase) * .06 + d.hover * .1, d.base.z + d.hover * .35);
      m.rotation.set(-ptrS.y * .06, d.ry + ptrS.x * .1, 0);
      m.scale.setScalar(1 + d.hover * .06);
    }
    for (const m of tokens) {
      const a = m.userData.a + t * .07;
      orbitPos(a, m.position);
      m.lookAt(camera.position); m.rotateY(Math.sin(t * .6 + m.userData.a) * .35);
    }
  }
  const render = () => { pose(); renderer.render(scene, camera); frames++; };
  const loop = now => {
    raf = requestAnimationFrame(loop);
    const raw = (now - t0) / 1000, dt = Math.min(.05, raw); t0 = now;
    // adaptive resolution: if the GPU struggles (≈ < 40 fps over 90 frames), drop to 1.25× pixels once
    if (DPR > 1.25 && raw < .5) { slow += raw; slowN++; if (slowN === 90) { if (slow / slowN > .025) { DPR = 1.25; renderer.setPixelRatio(DPR); resize(); } slowN = 999; } }
    step(dt); render();
  };
  function requestRender() { if (running || dirty) return; dirty = true; requestAnimationFrame(() => { dirty = false; if (!running) render(); }); }
  function sync() {
    const should = visible && !paused && !document.hidden;
    if (should && !running) { running = true; t0 = performance.now(); raf = requestAnimationFrame(loop); }
    else if (!should && running) { running = false; cancelAnimationFrame(raf); }
    state.running = running;
  }
  const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; sync(); }, { rootMargin: '80px' });
  io.observe(host);
  const onVis = () => sync();
  document.addEventListener('visibilitychange', onVis);
  const fontsReady = document.fonts ? Promise.all([
    document.fonts.load(`800 16px ${FONT}`), document.fonts.load(`600 14px ${MONO}`), document.fonts.load(`700 19px ${FONT_AR}`),
  ]).catch(() => {}) : Promise.resolve();

  const state = {
    get frames() { return frames; }, running: false, mobile,
    setColors, pause(v) { paused = !!v; sync(); if (paused) requestRender(); },
    /* renders one deterministic frame at a given size and returns it as a PNG data URL (used to make the static fallback) */
    still(w = 1600, h = 720, at = 1.2) {
      const keepT = t, keepP = ptrS.clone(), keepS = scrollP;
      t = at; ptrS.set(0, 0); scrollP = 0; hovered = null;
      for (const m of cards) m.userData.hover = 0;
      renderer.setPixelRatio(1); fit(w, h); pose();
      // keep the still calm: no token in front of the laptop screen or the phone
      scene.updateMatrixWorld(true);
      const rects = [scrA, phA].map(o => { const b = new Box3().setFromObject(o), r = [9, 9, -9, -9];
        for (let i = 0; i < 8; i++) { const v = new Vector3(i & 1 ? b.max.x : b.min.x, i & 2 ? b.max.y : b.min.y, i & 4 ? b.max.z : b.min.z).project(camera); r[0] = Math.min(r[0], v.x); r[1] = Math.min(r[1], v.y); r[2] = Math.max(r[2], v.x); r[3] = Math.max(r[3], v.y); }
        return r; });
      const pad = .06;
      for (const m of tokens) { const v = m.position.clone().applyMatrix4(rig.matrixWorld).project(camera); m.visible = !rects.some(r => v.x > r[0] - pad && v.x < r[2] + pad && v.y > r[1] - pad * 2 && v.y < r[3] + pad * 2); }
      renderer.render(scene, camera); tokens.forEach(m => (m.visible = true));
      const url = canvas.toDataURL('image/png');
      t = keepT; ptrS.copy(keepP); scrollP = keepS; renderer.setPixelRatio(DPR); resize();
      return url;
    },
    ready: Promise.resolve(),
    destroy() {
      cancelAnimationFrame(raf); running = false; io.disconnect(); ro.disconnect();
      removeEventListener('pointermove', onMove); removeEventListener('scroll', onScroll); document.removeEventListener('visibilitychange', onVis);
      canvas.removeEventListener('click', onClick);
      scene.traverse(o => { if (o.geometry) o.geometry.dispose(); });
      disposables.forEach(d => d.dispose?.()); envRT?.dispose(); pmrem.dispose();
      renderer.dispose(); renderer.forceContextLoss?.(); canvas.remove(); host.classList.remove('on'); state.running = false;
    },
  };
  setColors();
  state.ready = Promise.all([fontsReady.then(() => setColors()), ...loads]);

  // first frame, then fade in
  render();
  requestAnimationFrame(() => host.classList.add('on'));
  sync();
  return state;
}
