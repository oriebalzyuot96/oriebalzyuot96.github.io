// JAMRA Smash House: procedural Three.js burger with scroll choreography.
// Design & build: Orieb Alzyuot. No frameworks; Three.js is vendored locally.

const root = document.documentElement;
const body = document.body;
const RTL = root.dir === 'rtl';
const RM = root.classList.contains('rm');
const MOBILE = matchMedia('(max-width: 760px)').matches || matchMedia('(pointer: coarse)').matches;
const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const loaderBar = $('.loader .bar span');
const setLoad = p => { if (loaderBar) loaderBar.style.width = p + '%'; };
const T0 = performance.now();
let onLoaded = () => {};
function finishLoading() {
  setLoad(100);
  const wait = Math.max(0, 900 - (performance.now() - T0));
  setTimeout(() => { root.classList.add('loaded'); onLoaded(); }, wait);
}

/* ================================================================
   UI: works with or without WebGL
   ================================================================ */
// menu illustrations (SVG generated from recipes)
let gid = 0;
const svgBurger = (recipe, opts = {}) => {
  const id = 'g' + (++gid);
  const defs = [];
  const grad = (name, stops, vertical = true) => {
    defs.push(`<linearGradient id="${id}${name}" x1="0" y1="0" x2="${vertical ? 0 : 1}" y2="${vertical ? 1 : 0}">${stops.map((c, i) => `<stop offset="${i / (stops.length - 1)}" stop-color="${c}"/>`).join('')}</linearGradient>`);
    return `url(#${id}${name})`;
  };
  const wave = (x0, x1, y, a, f, ph) => { const p = []; for (let x = x0; x <= x1; x += 4) p.push([x, y + a * Math.sin(x * f + ph)]); return p; };
  const P = {
    top: (y, v) => {
      const cols = v === 'dark' ? ['#a8642f', '#7a3f16', '#4e2509'] : ['#f6bd6c', '#d6812f', '#a4521a'];
      const f = grad('tb', cols);
      let s = `<path d="M20 ${y + 52}Q18 ${y + 4} 100 ${y}Q182 ${y + 4} 180 ${y + 52}Q180 ${y + 58} 172 ${y + 58}H28Q20 ${y + 58} 20 ${y + 52}Z" fill="${f}"/>`;
      s += `<ellipse cx="74" cy="${y + 16}" rx="30" ry="8" fill="#fff" opacity=".22" transform="rotate(-10 74 ${y + 16})"/>`;
      const seeds = v === 'seed' ? 26 : v === 'dark' ? 0 : 14;
      for (let i = 0; i < seeds; i++) {
        const x = 40 + ((i * 53) % 120), yy = y + 12 + ((i * 29) % 30) + Math.abs(x - 100) * 0.06;
        s += `<ellipse cx="${x}" cy="${yy}" rx="3.4" ry="1.7" fill="${v === 'seed' && i % 3 === 0 ? '#3b2a1c' : '#fff4dc'}" transform="rotate(${(i * 37) % 60 - 30} ${x} ${yy})"/>`;
      }
      if (v === 'dark') s += `<path d="M44 ${y + 30}q56-18 112 0" stroke="#fff" stroke-opacity=".18" stroke-width="3" fill="none"/>`;
      return [s, 58, 4];
    },
    lettuce: y => {
      const t = wave(14, 186, y + 6, 4, 0.25, 0), b = wave(14, 186, y + 14, 3, 0.31, 1).reverse();
      return [`<path d="M${t.map(p => p.join(' ')).join('L')}L${b.map(p => p.join(' ')).join('L')}Z" fill="${grad('le', ['#a3dc62', '#4f9b2c'])}"/>`, 16, 6];
    },
    tomato: y => [`<rect x="24" y="${y}" width="74" height="13" rx="6.5" fill="#d8341f"/><rect x="102" y="${y}" width="74" height="13" rx="6.5" fill="#d8341f"/><rect x="28" y="${y + 2}" width="66" height="4" rx="2" fill="#f47a5d"/><rect x="106" y="${y + 2}" width="66" height="4" rx="2" fill="#f47a5d"/>`, 13, 3],
    cheese: (y, v) => {
      const c = v === 'swiss' ? '#f7e3a1' : '#ffb21f';
      let s = `<rect x="16" y="${y}" width="168" height="9" rx="3" fill="${c}"/>`;
      for (const x of [38, 118, 162]) s += `<path d="M${x - 9} ${y + 8}Q${x} ${y + 26} ${x + 9} ${y + 8}Z" fill="${c}"/>`;
      if (v === 'swiss') s += `<circle cx="70" cy="${y + 4}" r="2.5" fill="#e0c47a"/><circle cx="140" cy="${y + 5}" r="2" fill="#e0c47a"/>`;
      return [s, 9, 2];
    },
    patty: (y, v) => {
      const f = v === 'plant' ? grad('pp', ['#7a5232', '#4b3020']) : grad('pa', ['#6f3b1c', '#3a1b0b']);
      let s = `<rect x="22" y="${y}" width="156" height="26" rx="13" fill="${f}"/>`;
      for (let i = 0; i < 18; i++) { const x = 34 + (i * 37) % 132, yy = y + 6 + (i * 11) % 15; s += `<circle cx="${x}" cy="${yy}" r="${1.2 + (i % 3) * 0.7}" fill="${i % 2 ? '#2a1208' : '#8a5230'}"/>`; }
      if (v === 'plant') s += `<path d="M40 ${y + 8}h120" stroke="#9fc46a" stroke-width="1.5" stroke-dasharray="3 6"/>`;
      return [s, 26, 3];
    },
    bottom: y => [`<path d="M20 ${y}H180V${y + 12}Q180 ${y + 30} 158 ${y + 30}H42Q20 ${y + 30} 20 ${y + 12}Z" fill="${grad('bb', ['#e9b064', '#c4782e'])}"/><rect x="22" y="${y}" width="156" height="5" rx="2.5" fill="#f6d79c"/>`, 30, 0],
    onion: y => { let s = ''; for (const x of [44, 78, 112, 146]) s += `<ellipse cx="${x + 6}" cy="${y + 7}" rx="19" ry="6.5" fill="none" stroke="#e7a443" stroke-width="6"/><ellipse cx="${x + 6}" cy="${y + 6}" rx="19" ry="6.5" fill="none" stroke="#f6c876" stroke-width="2"/>`; return [s, 14, 3]; },
    bacon: y => [`<path d="M18 ${y + 5}q20-9 41 0t41 0t41 0t41 0" stroke="#9c2d18" stroke-width="8" fill="none" stroke-linecap="round"/><path d="M18 ${y + 5}q20-9 41 0t41 0t41 0t41 0" stroke="#e8866a" stroke-width="2" fill="none"/>`, 10, 2],
    mush: y => { let s = ''; for (const x of [40, 72, 104, 136, 162]) s += `<path d="M${x - 18} ${y + 12}Q${x} ${y - 6} ${x + 18} ${y + 12}Z" fill="#8a5a3a"/><path d="M${x - 12} ${y + 6}Q${x} ${y - 1} ${x + 12} ${y + 6}" stroke="#c49a6c" stroke-width="2" fill="none"/>`; return [s, 12, 2]; },
    chicken: y => {
      let d = `M18 ${y + 14}`; for (let x = 18; x < 182; x += 14) d += `Q${x + 7} ${y - 4} ${x + 14} ${y + 6}`;
      d += `V${y + 24}`; for (let x = 182; x > 18; x -= 14) d += `Q${x - 7} ${y + 36} ${x - 14} ${y + 26}`; d += 'Z';
      let s = `<path d="${d}" fill="${grad('ck', ['#f6bb52', '#c26f1c'])}"/>`;
      for (const x of [60, 104, 150]) s += `<path d="M${x - 8} ${y + 4}Q${x} ${y + 30} ${x + 8} ${y + 4}Z" fill="#e8762a" opacity=".85"/>`;
      return [s, 30, 4];
    },
    slaw: y => { let s = `<path d="M16 ${y + 4}Q100 ${y - 4} 184 ${y + 4}V${y + 11}H16Z" fill="#eaf2c9"/>`; for (let i = 0; i < 16; i++) s += `<rect x="${22 + i * 10}" y="${y + 2 + (i % 3) * 2}" width="7" height="2" rx="1" fill="${i % 2 ? '#9b4f9f' : '#7fb342'}" transform="rotate(${(i * 23) % 40 - 20} ${26 + i * 10} ${y + 4})"/>`; return [s, 11, 2]; },
    avo: y => { let s = ''; for (const x of [36, 70, 104, 138, 168]) s += `<ellipse cx="${x}" cy="${y + 6}" rx="19" ry="7" fill="#4f772d"/><ellipse cx="${x}" cy="${y + 5}" rx="16" ry="5" fill="#bcd97a"/>`; return [s, 12, 3]; },
  };
  const parts = recipe.map(r => { const [k, v] = r.split(':'); return { k, v }; });
  let y = 0; const placed = [];
  for (const p of parts) { const [, h, ov] = P[p.k](0, p.v); placed.push({ ...p, y }); y += h - ov; }
  const total = y + 4, off = (170 - total) / 2;
  let out = '';
  for (let i = placed.length - 1; i >= 0; i--) out += P[placed[i].k](placed[i].y + off, placed[i].v)[0];
  return `<svg viewBox="0 0 200 170" aria-hidden="true" focusable="false"><defs>${defs.join('')}</defs>${out}</svg>`;
};
const svgFries = () => {
  let fries = '';
  const xs = [62, 74, 86, 98, 110, 122, 134, 80, 104, 128, 92, 116];
  xs.forEach((x, i) => { const h = 70 + (i * 17) % 28, r = (i * 13) % 18 - 9; fries += `<rect x="${x}" y="${78 - h + 50}" width="11" height="${h}" rx="3" fill="${i % 3 ? '#ffcb47' : '#f2b02f'}" transform="rotate(${r} ${x + 5} 130)"/><rect x="${x}" y="${78 - h + 50}" width="11" height="6" rx="3" fill="#d98c1c" transform="rotate(${r} ${x + 5} 130)"/>`; });
  return `<svg viewBox="0 0 200 170" aria-hidden="true" focusable="false">${fries}<path d="M52 82H148L136 160H64Z" fill="#d42a1d"/><path d="M52 82H148L146 96H54Z" fill="#b51f14"/><path d="M84 112c6 6 12 10 16 22 4-12 10-16 16-22-6 2-12 0-16-8-4 8-10 10-16 8z" fill="#fff1d6"/></svg>`;
};
const svgDrink = () => `<svg viewBox="0 0 200 170" aria-hidden="true" focusable="false"><rect x="108" y="6" width="9" height="56" rx="3" fill="#fff1d6" transform="rotate(14 112 34)"/><rect x="108" y="16" width="9" height="8" fill="#d42a1d" transform="rotate(14 112 34)"/><rect x="108" y="34" width="9" height="8" fill="#d42a1d" transform="rotate(14 112 34)"/><rect x="58" y="44" width="84" height="14" rx="7" fill="#fff8ea"/><path d="M62 58H138L128 160H72Z" fill="#fff1d6"/><path d="M66 88H134L130 126H70Z" fill="#ff8a1f"/><path d="M66 88H134" stroke="#d96a0c" stroke-width="2"/><circle cx="136" cy="58" r="20" fill="#ffd84a"/><circle cx="136" cy="58" r="15" fill="#fff3a6"/><path d="M136 43V73M121 58H151M125 47l22 22M147 47l-22 22" stroke="#ffd84a" stroke-width="1.6"/></svg>`;
const RECIPES = {
  classic: ['top', 'lettuce', 'tomato', 'cheese', 'patty', 'bottom'],
  double: ['top', 'cheese', 'patty', 'cheese', 'patty', 'bottom'],
  bbq: ['top', 'onion', 'bacon', 'cheese', 'patty', 'bottom'],
  truffle: ['top:dark', 'mush', 'cheese:swiss', 'patty', 'bottom'],
  chicken: ['top', 'slaw', 'chicken', 'bottom'],
  garden: ['top:seed', 'lettuce', 'avo', 'tomato', 'patty:plant', 'bottom'],
};
$$('.art[data-art]').forEach(el => {
  const k = el.dataset.art;
  el.innerHTML = k === 'fries' ? svgFries() : k === 'drink' ? svgDrink() : svgBurger(RECIPES[k]);
});

// cart counter
{
  const cartBtn = $('.cart'), nEl = $('.cart .n'), live = $('#cart-live');
  const ds = body.dataset;
  let n = 0, total = 0;
  const fill = (tpl, o) => tpl.replace(/\{(\w+)\}/g, (_, k) => o[k]);
  $$('.add, .add-main').forEach(btn => btn.addEventListener('click', () => {
    n++; total += +btn.dataset.price;
    nEl.textContent = n;
    cartBtn.setAttribute('aria-label', fill(ds.cartLabel, { n, t: total }));
    if (live) live.textContent = fill(ds.cartMsg, { name: btn.dataset.name, n });
    cartBtn.classList.remove('bump'); void cartBtn.offsetWidth; cartBtn.classList.add('bump');
    if (btn.classList.contains('add')) {
      btn.classList.add('done'); btn.textContent = ds.added + ' ✓';
      clearTimeout(btn._t); btn._t = setTimeout(() => { btn.classList.remove('done'); btn.textContent = ds.add; }, 1300);
    }
  }));
}

// today in the hours table, header state, reveals, cursor glow
{
  const d = new Date().getDay();
  const row = $(`.hours tr[data-d="${d}"]`); if (row) row.classList.add('today');
  const top = $('.top');
  const onS = () => top.classList.toggle('solid', scrollY > 40);
  addEventListener('scroll', onS, { passive: true }); onS();
  if ('IntersectionObserver' in window && !RM) {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -12% 0px' });
    $$('.rv').forEach(el => io.observe(el));
  } else $$('.rv').forEach(el => el.classList.add('in'));
  const glow = $('.cursor-glow');
  if (!RM && matchMedia('(hover: hover)').matches) {
    let gx = -999, gy = -999, cx = gx, cy = gy, on = false;
    addEventListener('pointermove', e => {
      if (e.pointerType !== 'mouse') return;
      gx = e.clientX; gy = e.clientY;
      if (!on) { on = true; cx = gx; cy = gy; root.classList.add('has-pointer'); }
    }, { passive: true });
    const tick = () => { cx += (gx - cx) * 0.16; cy += (gy - cy) * 0.16; glow.style.transform = `translate3d(${cx}px, ${cy}px, 0)`; requestAnimationFrame(tick); };
    tick();
  }
}

/* ================================================================
   3D
   ================================================================ */
setLoad(25);
let THREE, RoomEnvironment;
try {
  THREE = await import('three');
  ({ RoomEnvironment } = await import('three/addons/environments/RoomEnvironment.js'));
} catch (e) { console.warn('Three.js failed to load', e); }
setLoad(55);

const canvas = $('#gl');
let renderer = null;
if (THREE) {
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  } catch (e) { renderer = null; }
}
if (!renderer) {
  root.classList.add('no-gl');
  finishLoading();
} else {
  start();
}

function start() {
  const V2 = THREE.Vector2, V3 = THREE.Vector3;
  const SEG = MOBILE ? 44 : 72;
  const SHADOWS = !MOBILE;
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, MOBILE ? 1.5 : 2));
  renderer.toneMapping = THREE.NeutralToneMapping;
  renderer.toneMappingExposure = 0.95;
  renderer.shadowMap.enabled = SHADOWS;
  renderer.shadowMap.type = THREE.PCFShadowMap;

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environmentIntensity = 0.4;
  pmrem.dispose();

  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 120);
  const TH = Math.tan(THREE.MathUtils.degToRad(16));

  /* ---------- noise ---------- */
  const hash = (x, y, z) => { let h = Math.imul(x | 0, 374761393) ^ Math.imul(y | 0, 668265263) ^ Math.imul(z | 0, 1274126177); h = Math.imul(h ^ (h >>> 13), 1274126177); h ^= h >>> 16; return (h >>> 0) / 4294967295; };
  const vn = (x, y, z) => {
    const xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z);
    const xf = x - xi, yf = y - yi, zf = z - zi;
    const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf), w = zf * zf * (3 - 2 * zf);
    const L = (a, b, t) => a + (b - a) * t;
    return L(L(L(hash(xi, yi, zi), hash(xi + 1, yi, zi), u), L(hash(xi, yi + 1, zi), hash(xi + 1, yi + 1, zi), u), v),
      L(L(hash(xi, yi, zi + 1), hash(xi + 1, yi, zi + 1), u), L(hash(xi, yi + 1, zi + 1), hash(xi + 1, yi + 1, zi + 1), u), v), w);
  };
  const fbm = (x, y, z, o = 4) => { let a = 0.5, f = 1, s = 0, n = 0; for (let i = 0; i < o; i++) { s += a * vn(x * f, y * f, z * f); n += a; f *= 2.03; a *= 0.5; } return s / n; };
  const sstep = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
  const col = h => new THREE.Color(h);
  const mix = (a, b, t, out = new THREE.Color()) => out.copy(a).lerp(b, Math.min(1, Math.max(0, t)));

  /* ---------- textures ---------- */
  const canvasTex = (size, draw, srgb = false) => {
    const c = document.createElement('canvas'); c.width = c.height = size;
    draw(c.getContext('2d'), size);
    const t = new THREE.CanvasTexture(c);
    if (srgb) t.colorSpace = THREE.SRGBColorSpace;
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.anisotropy = 4;
    return t;
  };
  const grainTex = canvasTex(256, (g, s) => {
    const img = g.createImageData(s, s);
    for (let i = 0; i < s * s; i++) {
      const x = i % s, y = (i / s) | 0;
      const v = 150 + (Math.random() - 0.5) * 90 + (fbm(x / 16, y / 16, 1, 3) - 0.5) * 120;
      img.data[i * 4] = img.data[i * 4 + 1] = img.data[i * 4 + 2] = v; img.data[i * 4 + 3] = 255;
    }
    g.putImageData(img, 0, 0);
  });
  grainTex.repeat.set(6, 3);
  const tomatoTex = canvasTex(512, (g, s) => {
    const c = s / 2;
    g.fillStyle = '#9c140e'; g.fillRect(0, 0, s, s);
    let gr = g.createRadialGradient(c, c, 10, c, c, c * 0.95);
    gr.addColorStop(0, '#ef5a3c'); gr.addColorStop(0.55, '#d8301c'); gr.addColorStop(1, '#b81a10');
    g.fillStyle = gr; g.beginPath(); g.arc(c, c, c * 0.95, 0, Math.PI * 2); g.fill();
    const N = 5;
    for (let k = 0; k < N; k++) {
      const a0 = (k / N) * Math.PI * 2 + 0.3;
      g.save(); g.translate(c, c); g.rotate(a0);
      g.beginPath(); g.ellipse(c * 0.5, 0, c * 0.3, c * 0.2, 0, 0, Math.PI * 2);
      const jg = g.createRadialGradient(c * 0.5, 0, 2, c * 0.5, 0, c * 0.3);
      jg.addColorStop(0, '#ff8a62'); jg.addColorStop(0.7, '#f25a38'); jg.addColorStop(1, '#d83820');
      g.fillStyle = jg; g.fill();
      for (let i = 0; i < 9; i++) {
        const sx = c * 0.5 + (Math.random() - 0.5) * c * 0.38, sy = (Math.random() - 0.5) * c * 0.22;
        g.beginPath(); g.ellipse(sx, sy, 7, 4.2, Math.random() * 3, 0, Math.PI * 2);
        g.fillStyle = '#f0c25e'; g.fill(); g.strokeStyle = 'rgba(140,40,10,.6)'; g.lineWidth = 1.2; g.stroke();
      }
      g.restore();
    }
    gr = g.createRadialGradient(c, c, 0, c, c, c * 0.22);
    gr.addColorStop(0, '#ff9e7e'); gr.addColorStop(1, 'rgba(255,120,90,0)');
    g.fillStyle = gr; g.beginPath(); g.arc(c, c, c * 0.22, 0, Math.PI * 2); g.fill();
    g.strokeStyle = '#b81a12'; g.lineWidth = s * 0.03; g.beginPath(); g.arc(c, c, c * 0.95, 0, Math.PI * 2); g.stroke();
  }, true);
  const blobTex = canvasTex(128, (g, s) => {
    const gr = g.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
    gr.addColorStop(0, 'rgba(0,0,0,.75)'); gr.addColorStop(0.45, 'rgba(0,0,0,.35)'); gr.addColorStop(1, 'rgba(0,0,0,0)');
    g.fillStyle = gr; g.fillRect(0, 0, s, s);
  });
  const sparkTex = canvasTex(64, (g, s) => {
    const gr = g.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
    gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(0.25, 'rgba(255,200,120,.8)'); gr.addColorStop(1, 'rgba(255,120,40,0)');
    g.fillStyle = gr; g.fillRect(0, 0, s, s);
  });

  /* ---------- materials ---------- */
  const PM = (o) => MOBILE ? new THREE.MeshStandardMaterial(Object.fromEntries(Object.entries(o).filter(([k]) => !/clearcoat|sheen/.test(k)))) : new THREE.MeshPhysicalMaterial(o);
  const bunMat = PM({ vertexColors: true, roughness: 0.48, bumpMap: grainTex, bumpScale: 1.4, clearcoat: 0.6, clearcoatRoughness: 0.32, sheen: 0.12, sheenColor: new THREE.Color('#ffcf9a'), sheenRoughness: 0.6 });
  const bunBotMat = PM({ vertexColors: true, roughness: 0.62, bumpMap: grainTex, bumpScale: 2.2, sheen: 0.3, sheenColor: new THREE.Color('#ffd7a6') });
  const seedMat = PM({ color: '#f6e7c3', roughness: 0.45, clearcoat: 0.3 });
  const pattyMat = PM({ vertexColors: true, roughness: 0.82, clearcoat: 0.12, clearcoatRoughness: 0.6 });
  const cheeseMat = PM({ color: '#ffa200', roughness: 0.34, clearcoat: 0.35, clearcoatRoughness: 0.3, emissive: new THREE.Color('#8a3a00'), emissiveIntensity: 0.22 });
  const tomatoCap = PM({ map: tomatoTex, roughness: 0.3, clearcoat: 0.55, clearcoatRoughness: 0.18 });
  const tomatoSide = PM({ color: '#b3170f', roughness: 0.3, clearcoat: 0.6 });
  const lettuceMat = PM({ vertexColors: true, roughness: 0.45, side: THREE.DoubleSide, clearcoat: 0.3, clearcoatRoughness: 0.3, emissive: new THREE.Color('#163805'), emissiveIntensity: 0.2 });

  /* ---------- geometry builders ---------- */
  const colorize = (geo, fn) => {
    const pos = geo.attributes.position, n = pos.count, arr = new Float32Array(n * 3), c = new THREE.Color(), p = new V3();
    for (let i = 0; i < n; i++) { p.fromBufferAttribute(pos, i); fn(p, i, c); arr[i * 3] = c.r; arr[i * 3 + 1] = c.g; arr[i * 3 + 2] = c.b; }
    geo.setAttribute('color', new THREE.BufferAttribute(arr, 3));
  };
  const arc = (pts, cx, cy, r, a0, a1, n) => { for (let i = 1; i <= n; i++) { const a = a0 + (a1 - a0) * i / n; pts.push(new V2(cx + r * Math.cos(a), cy + r * Math.sin(a))); } };
  const R = 1.5;

  // top bun: crumb underside, rounded lip, glossy dome
  const TOP_H = 0.98, LIP = 0.09, EXP = 0.78;
  const domeAt = t => { const a = t * Math.PI / 2; return [R * Math.pow(Math.cos(a), EXP), LIP + (TOP_H - LIP) * Math.pow(Math.sin(a), 0.92)]; };
  function buildTopBun() {
    const pts = []; const crumb = 8;
    for (let k = 0; k < crumb; k++) pts.push(new V2((R - LIP) * k / (crumb - 1), 0.02 * (1 - k / (crumb - 1))));
    arc(pts, R - LIP, LIP, LIP, -Math.PI / 2, 0, 6);
    const N = 30;
    for (let k = 1; k <= N; k++) { const [r, y] = domeAt(k / N); pts.push(new V2(Math.max(r, 0.0001 * (N - k)), y)); }
    const geo = new THREE.LatheGeometry(pts, SEG);
    const np = pts.length, crumbC = col('#f2d39b'), crumbT = col('#e2b06a'), lipC = col('#f3c27a');
    const lo = col('#e09440'), mid = col('#b4591a'), hi = col('#73300d');
    const pos = geo.attributes.position;
    // organic wobble
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i), y = pos.getY(i), z = pos.getZ(i);
      const s = 1 + (fbm(x * 0.9 + 3, y * 0.9, z * 0.9) - 0.5) * 0.07;
      pos.setXYZ(i, x * s, y * (1 + (fbm(x * 1.3, 2, z * 1.3) - 0.5) * 0.12), z * s);
    }
    geo.computeVertexNormals();
    colorize(geo, (p, i, c) => {
      const j = i % np;
      if (j < crumb) { mix(crumbC, crumbT, Math.hypot(p.x, p.z) / R * 0.9 + (fbm(p.x * 4, 0, p.z * 4) - 0.5), c); return; }
      if (j < crumb + 6) { c.copy(lipC); return; }
      const h = p.y / TOP_H, n = fbm(p.x * 2.2, p.y * 2.2, p.z * 2.2);
      if (h < 0.35) mix(lo, mid, sstep(0.1, 0.4, h) + (n - 0.5) * 0.6, c);
      else mix(mid, hi, sstep(0.35, 1.0, h) + (n - 0.5) * 0.7, c);
    });
    const mesh = new THREE.Mesh(geo, bunMat);
    // sesame seeds (instanced)
    const count = MOBILE ? 46 : 84;
    const seedGeo = new THREE.SphereGeometry(1, 10, 6);
    const seeds = new THREE.InstancedMesh(seedGeo, seedMat, count);
    const m = new THREE.Matrix4(), q = new THREE.Quaternion(), q2 = new THREE.Quaternion(), up = new V3(0, 1, 0), nrm = new V3(), P0 = new V3(), sc = new V3();
    for (let i = 0; i < count; i++) {
      const u = (i + 0.5) / count;
      const t = 0.16 + 0.8 * (1 - Math.sqrt(1 - u * 0.96)) + (Math.random() - 0.5) * 0.04;
      const th = i * 2.39996 + (Math.random() - 0.5) * 0.5;
      const [r, y] = domeAt(t), [r2, y2] = domeAt(t + 0.01);
      nrm.set(y2 - y, r - r2, 0).normalize();
      nrm.set(nrm.x * Math.cos(th), nrm.y, nrm.x * Math.sin(th)).normalize();
      P0.set(r * Math.cos(th), y, r * Math.sin(th)).addScaledVector(nrm, 0.012);
      q.setFromUnitVectors(up, nrm); q2.setFromAxisAngle(up, Math.random() * Math.PI); q.multiply(q2);
      sc.set(0.052, 0.017, 0.029);
      m.compose(P0, q, sc); seeds.setMatrixAt(i, m);
    }
    seeds.castShadow = true;
    return { meshes: [mesh, seeds], mats: [bunMat, seedMat] };
  }

  function buildBottomBun() {
    const H = 0.46, pts = [];
    for (let k = 0; k < 6; k++) pts.push(new V2((R - 0.14) * k / 5, 0));
    arc(pts, R - 0.14, 0.14, 0.14, -Math.PI / 2, 0, 6);
    pts.push(new V2(R - 0.005, 0.26));
    arc(pts, R - 0.07, H - 0.07, 0.07, 0, Math.PI / 2, 5);
    const topStart = pts.length;
    for (let k = 1; k <= 8; k++) pts.push(new V2((R - 0.07) * (1 - k / 8) + 0.0001, H + 0.012 * Math.sin(k / 8 * Math.PI)));
    const geo = new THREE.LatheGeometry(pts, SEG);
    geo.computeVertexNormals();
    const np = pts.length, crust = col('#d18b40'), crustD = col('#a9581f'), side = col('#e3a75b'), crumb = col('#f8e4ac'), toast = col('#d9a050');
    colorize(geo, (p, i, c) => {
      const j = i % np;
      if (j >= topStart - 1) { mix(crumb, toast, fbm(p.x * 3, 1, p.z * 3) * 1.4 - 0.25, c); return; }
      if (j < 6) { mix(crust, crustD, fbm(p.x * 3, 0, p.z * 3), c); return; }
      mix(crustD, side, sstep(0.0, 0.3, p.y) + (fbm(p.x * 3, p.y * 3, p.z * 3) - 0.5) * 0.5, c);
    });
    return { meshes: [new THREE.Mesh(geo, bunBotMat)], mats: [bunBotMat] };
  }

  function buildPatty() {
    const PR = 1.6, H = 0.3, pts = [];
    for (let k = 0; k < 8; k++) pts.push(new V2((PR - 0.12) * k / 7, 0));
    arc(pts, PR - 0.12, 0.12, 0.12, -Math.PI / 2, Math.PI / 2, 10);
    for (let k = 1; k <= 26; k++) pts.push(new V2((PR - 0.12) * (1 - k / 26) + 0.0001, 0.24 + 0.06 * Math.sin(k / 26 * Math.PI / 2)));
    const geo = new THREE.LatheGeometry(pts, MOBILE ? 64 : 120);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      let x = pos.getX(i), y = pos.getY(i), z = pos.getZ(i);
      const rr = Math.hypot(x, z), a = Math.atan2(z, x);
      const edge = sstep(PR * 0.55, PR, rr);
      const n = fbm(Math.cos(a) * 3.2 + 9, y * 2, Math.sin(a) * 3.2, 5);
      const lace = (n - 0.5) * 0.55 + (fbm(Math.cos(a) * 9, 3, Math.sin(a) * 9, 3) - 0.5) * 0.18;
      const nr = rr + edge * lace;
      const k = rr > 1e-4 ? nr / rr : 1;
      x *= k; z *= k;
      y = y * (1 - 0.38 * edge) + ((fbm(x * 3.5, 4, z * 3.5, 4) - 0.5) * 0.1 + (fbm(x * 13, 8, z * 13, 3) - 0.5) * 0.055 + (vn(x * 30, 2, z * 30) - 0.5) * 0.018) * (y > 0.1 ? 1 : 0.3);
      pos.setXYZ(i, x, y, z);
    }
    geo.computeVertexNormals();
    const charC = col('#120601'), brown = col('#341608'), crust = col('#5c2a10'), hl = col('#8a4a20');
    colorize(geo, (p, i, c) => {
      const n = fbm(p.x * 6, p.y * 6, p.z * 6, 5), rr = Math.hypot(p.x, p.z);
      mix(brown, crust, sstep(0.38, 0.7, n), c);
      if (n > 0.66) mix(c, hl, (n - 0.66) * 3, c);
      if (n < 0.4) mix(c, charC, (0.4 - n) * 4, c);
      const sp = vn(p.x * 28, p.y * 28, p.z * 28);
      if (sp > 0.8) mix(c, hl, (sp - 0.8) * 3, c); else if (sp < 0.22) mix(c, charC, (0.22 - sp) * 3, c);
      mix(c, charC, sstep(PR * 0.85, PR * 1.15, rr) * 0.55, c);
    });
    return { meshes: [new THREE.Mesh(geo, pattyMat)], mats: [pattyMat] };
  }

  function buildCheese() {
    const S = 2.6, sg = MOBILE ? 28 : 44;
    const geo = new THREE.BoxGeometry(S, 0.045, S, sg, 1, sg);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i), z = pos.getZ(i), d = Math.hypot(x, z), a = Math.atan2(z, x);
      let y = pos.getY(i);
      if (d > 1.0) y -= Math.min(0.26, Math.pow(d - 1.0, 1.6) * 0.6);
      if (d > 1.25) y -= Math.min(0.1, Math.pow(Math.max(0, Math.sin(a * 6 + 1.3)), 6) * (d - 1.25) * 0.4);
      y += (fbm(x * 2, 5, z * 2) - 0.5) * 0.03;
      // slightly melted, rounded corners pulled in
      const s = 1 - Math.max(0, d - 1.3) * 0.32;
      pos.setXYZ(i, x * s, y, z * s);
    }
    geo.computeVertexNormals();
    const mesh = new THREE.Mesh(geo, cheeseMat);
    mesh.rotation.y = Math.PI / 4 + 0.15;
    return { meshes: [mesh], mats: [cheeseMat] };
  }

  function buildTomato() {
    const g = new THREE.Group(), meshes = [];
    const geo = new THREE.CylinderGeometry(0.74, 0.76, 0.13, MOBILE ? 36 : 56, 1);
    const ang = [0.3, 2.4, 4.5];
    for (let k = 0; k < 3; k++) {
      const m = new THREE.Mesh(geo, [tomatoSide, tomatoCap, tomatoCap]);
      m.position.set(Math.cos(ang[k]) * 0.62, 0.065 + k * 0.012, Math.sin(ang[k]) * 0.62);
      m.rotation.set((Math.random() - 0.5) * 0.06, Math.random() * 6, (Math.random() - 0.5) * 0.06);
      meshes.push(m);
    }
    return { meshes, mats: [tomatoSide, tomatoCap] };
  }

  function buildLettuce() {
    const meshes = [];
    const sheet = (scale, rot, seed) => {
      const Nr = MOBILE ? 12 : 18, Ns = MOBILE ? 84 : 150;
      const pos = [], idx = [];
      for (let a = 0; a <= Nr; a++) for (let b = 0; b <= Ns; b++) {
        const t = a / Nr, th = b / Ns * Math.PI * 2;
        const ca = Math.cos(th), sa = Math.sin(th);
        const Re = 1.78 * scale * (1 + 0.06 * Math.sin(5 * th + seed) + 0.05 * (fbm(ca * 2 + seed, 1, sa * 2) - 0.5) * 2);
        const r = t * Re;
        let y = -0.16 * Math.pow(t, 3);
        y += 0.1 * Math.pow(t, 2.4) * Math.sin(th * 17 + 2.2 * Math.sin(th * 3 + seed));
        y += (fbm(ca * r * 2 + seed, 7, sa * r * 2) - 0.5) * 0.08 * t;
        pos.push(r * ca, y, r * sa);
      }
      const row = Ns + 1;
      for (let a = 0; a < Nr; a++) for (let b = 0; b < Ns; b++) {
        const i0 = a * row + b, i1 = i0 + 1, i2 = i0 + row, i3 = i2 + 1;
        idx.push(i0, i2, i1, i1, i2, i3);
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
      geo.setIndex(idx);
      geo.computeVertexNormals();
      const pale = col('#c2e576'), mid = col('#62b02e'), dark = col('#2c7512');
      colorize(geo, (p, i, c) => {
        const r = Math.hypot(p.x, p.z) / (1.78 * scale), th = Math.atan2(p.z, p.x);
        mix(pale, mid, sstep(0.15, 0.7, r), c);
        mix(c, dark, sstep(0.7, 1.05, r) * 0.8, c);
        const vein = Math.pow(Math.abs(Math.sin(th * 8 + seed)), 30) * (1 - r);
        mix(c, pale, vein * 0.8, c);
      });
      const m = new THREE.Mesh(geo, lettuceMat);
      m.rotation.y = rot;
      return m;
    };
    const s1 = sheet(1, 0, 1.3); meshes.push(s1);
    const s2 = sheet(0.86, 0.9, 4.1); s2.position.y = 0.045; meshes.push(s2);
    return { meshes, mats: [lettuceMat] };
  }

  /* ---------- assemble the stack ---------- */
  // index order matches the label cards: 0 crown … 5 base
  const defs = [
    { b: buildTopBun, y: 0.99, c: 0.42, w: 1.55 },
    { b: buildLettuce, y: 0.9, c: 0.0, w: 1.8 },
    { b: buildTomato, y: 0.77, c: 0.07, w: 1.4 },
    { b: buildCheese, y: 0.755, c: -0.08, w: 1.75 },
    { b: buildPatty, y: 0.44, c: 0.12, w: 1.7 },
    { b: buildBottomBun, y: 0, c: 0.22, w: 1.5 },
  ];
  const CENTER = 0.98;
  const stage = new THREE.Group();
  scene.add(stage);
  const layers = defs.map((d, i) => {
    const g = new THREE.Group(); const built = d.b();
    built.meshes.forEach(m => { m.castShadow = true; m.receiveShadow = true; g.add(m); });
    built.mats.forEach(mt => { mt.transparent = true; });
    g.position.y = d.y - CENTER;
    stage.add(g);
    setLoad(55 + i * 6);
    return { g, mats: built.mats, base: d.y - CENTER, c: d.c, w: d.w, k: i };
  });
  // grounding: soft blob + shadow catcher under the base
  const blob = new THREE.Mesh(new THREE.PlaneGeometry(4.6, 4.6), new THREE.MeshBasicMaterial({ map: blobTex, transparent: true, depthWrite: false, opacity: 0.9 }));
  blob.rotation.x = -Math.PI / 2; blob.position.y = -0.006; blob.renderOrder = -1;
  layers[5].g.add(blob);
  let catcher = null;
  if (SHADOWS) {
    catcher = new THREE.Mesh(new THREE.PlaneGeometry(14, 14), new THREE.ShadowMaterial({ opacity: 0.35 }));
    catcher.rotation.x = -Math.PI / 2; catcher.position.y = -0.01; catcher.receiveShadow = true;
    layers[5].g.add(catcher);
  }

  /* ---------- lights ---------- */
  scene.add(new THREE.HemisphereLight('#ffe4c4', '#2a1408', 0.45));
  const key = new THREE.DirectionalLight('#ffeedb', 2.4);
  key.position.set(4.5, 9, 6);
  if (SHADOWS) {
    key.castShadow = true;
    key.shadow.mapSize.set(2048, 2048);
    const sc = key.shadow.camera; sc.left = -4.5; sc.right = 4.5; sc.top = 6; sc.bottom = -6; sc.near = 1; sc.far = 32;
    key.shadow.bias = -0.0004; key.shadow.normalBias = 0.025; key.shadow.radius = 4;
  }
  scene.add(key);
  const rim = new THREE.DirectionalLight('#ff6a2a', 2.8); rim.position.set(-5, 1.2, -6); scene.add(rim);
  const rim2 = new THREE.DirectionalLight('#ffb35c', 1.4); rim2.position.set(6, 0.4, -5); scene.add(rim2);
  const fill = new THREE.DirectionalLight('#c9d4ff', 0.45); fill.position.set(-6, 2, 5); scene.add(fill);

  /* ---------- embers ---------- */
  const EN = MOBILE ? 36 : 110;
  const eGeo = new THREE.BufferGeometry(), ePos = new Float32Array(EN * 3), eSp = new Float32Array(EN);
  for (let i = 0; i < EN; i++) { ePos[i * 3] = (Math.random() - 0.5) * 14; ePos[i * 3 + 1] = (Math.random() - 0.5) * 12; ePos[i * 3 + 2] = -2 - Math.random() * 6; eSp[i] = 0.2 + Math.random() * 0.5; }
  eGeo.setAttribute('position', new THREE.BufferAttribute(ePos, 3));
  const embers = new THREE.Points(eGeo, new THREE.PointsMaterial({ map: sparkTex, size: 0.09, color: '#ff8a3d', transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0.85 }));
  scene.add(embers);

  /* ---------- layout ---------- */
  let W = 1, H = 1, portrait = false, gap = 1;
  const L = { hero: {}, anat: {}, focus: {}, asm: {} };
  const sec = {};
  const cards = $$('.lcard');
  const cardSize = [];
  const fsteps = $$('.fstep'), fdots = $$('.fdots li');
  const anatHead = $('#anatomy .pin-head'), anatPin = $('#anatomy .pin');
  const priceTag = $('.price-tag');
  const dir = RTL ? -1 : 1;
  function layout() {
    W = canvas.clientWidth || innerWidth; H = canvas.clientHeight || innerHeight;
    renderer.setSize(W, H, false);
    camera.aspect = W / H;
    const a = W / H; portrait = a < 0.9;
    const dW = (w, f) => w / f / (2 * TH * a), dH = (h, f) => h / f / (2 * TH);
    const BW = 3.6;
    L.hero = portrait ? { d: Math.max(dW(BW, 0.78), dH(2.2, 0.36)), sx: 0, sy: -0.22, el: 0.34 }
      : { d: Math.max(dW(BW, 0.42), dH(2.2, 0.52)), sx: 0.2 * dir, sy: -0.03, el: 0.3 };
    L.anat = portrait ? { d: dW(BW, 0.5), sx: -0.2 * dir, sy: -0.03, el: 0.26 }
      : { d: Math.max(dW(BW, 0.22), dH(2.2, 0.2)), sx: 0, sy: -0.03, el: 0.28 };
    const visH = 2 * TH * L.anat.d;
    gap = Math.min(2.4, Math.max(0.55, (visH * (portrait ? 0.76 : 0.68) - 2.0) / 5));
    L.focus = portrait ? { d: dW(BW, 0.8), sx: 0, sy: 0.22, el: 0.66 }
      : { d: Math.max(dW(BW, 0.36), dH(1.4, 0.4)), sx: 0.2 * dir, sy: -0.02, el: 0.62 };
    L.asm = portrait ? { d: Math.max(dW(BW, 0.8), dH(2.2, 0.32)), sx: 0, sy: 0.02, el: 0.32 }
      : { d: Math.max(dW(BW, 0.3), dH(2.2, 0.4)), sx: -0.04 * dir, sy: -0.04, el: 0.3 };
    for (const id of ['anatomy', 'focus', 'assemble', 'menu']) {
      const el = document.getElementById(id); let top = 0, n = el;
      while (n) { top += n.offsetTop; n = n.offsetParent; }
      sec[id] = { top, len: Math.max(1, el.offsetHeight - innerHeight) };
    }
    cards.forEach((c, i) => { cardSize[i] = [c.offsetWidth, c.offsetHeight]; });
  }

  /* ---------- state ---------- */
  const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
  const remap = (x, a, b) => clamp((x - a) / (b - a));
  const ease = t => t * t * (3 - 2 * t);
  const easeOutBack = t => { const c1 = 1.5, c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2); };
  let sy = scrollY, mx = 0, my = 0, tmx = 0, tmy = 0, time = 0, introT = RM ? 9 : 0, introStart = 0;
  let lastStep = -1, tagOn = false;
  addEventListener('pointermove', e => { tmx = (e.clientX / innerWidth) * 2 - 1; tmy = (e.clientY / innerHeight) * 2 - 1; }, { passive: true });
  const tmpP = new V3(), tmpE = new V3(), camRight = new V3(), target = new V3();
  const lerpL = (A, B, t) => ({ d: A.d + (B.d - A.d) * t, sx: A.sx + (B.sx - A.sx) * t, sy: A.sy + (B.sy - A.sy) * t, el: A.el + (B.el - A.el) * t });

  function frame(dt) {
    time += dt;
    if (introStart) introT = (performance.now() - introStart) / 1000;
    const k = 1 - Math.exp(-dt * 9);
    sy += (scrollY - sy) * (RM ? 1 : k);
    mx += (tmx - mx) * (1 - Math.exp(-dt * 3)); my += (tmy - my) * (1 - Math.exp(-dt * 3));
    const vh = innerHeight;
    const A = sec.anatomy, F = sec.focus, Rr = sec.assemble;
    const pA = RM ? 0 : remap(sy, A.top, A.top + A.len);
    const pF = RM ? 0 : remap(sy, F.top, F.top + F.len);
    const pR = RM ? 0 : remap(sy, Rr.top, Rr.top + Rr.len);
    const wA = RM ? 0 : ease(remap(sy, A.top - vh * 0.85, A.top + A.len * 0.12));
    const wF = RM ? 0 : ease(remap(sy, F.top - vh * 0.7, F.top + F.len * 0.08));
    const wR = RM ? 0 : ease(remap(sy, Rr.top - vh * 0.7, Rr.top + Rr.len * 0.12));
    const e = ease(remap(pA, 0.1, 0.62)) * (1 - ease(remap(pR, 0.06, 0.6)));
    let P = lerpL(L.hero, L.anat, wA); P = lerpL(P, L.focus, wF); P = lerpL(P, L.asm, wR);

    // focus step (continuous, with a soft snap to each layer)
    const sf = remap(pF, 0.06, 0.94) * 4;
    const k0 = Math.min(3, Math.floor(sf)), fr = sf - k0;
    const stepC = k0 + ease(remap(fr, 0.3, 0.7));

    // per-layer placement
    const wFo = wF * (1 - wR);
    const ST = 0.1;
    let focusY = 0;
    layers.forEach((l, i) => {
      const ord = i; // crown leaves first, lands last
      const ei = ease(clamp(e * (1 + ST * 5) - ST * ord));
      const off = ((5 - i) - 2.5) * gap;
      let y = l.base + off * ei;
      y -= Math.max(-1, Math.min(1, i - stepC)) * 1.7 * wFo;
      // stack centred: shift by the assembled centre offset (base already centred)
      y += ei * Math.sin(time * 1.1 + i * 1.3) * 0.05;
      // intro: drop in from above, base first
      const ki = clamp((introT - (5 - i) * 0.11) / 0.62);
      y += (1 - easeOutBack(ki)) * 5 * (ki < 1 ? 1 : 0);
      l.g.position.y = y;
      l.g.rotation.y = ei * (2.5 - i) * 0.24;
      l.g.rotation.x = ei * Math.sin(time * 0.7 + i) * 0.05;
      l.g.rotation.z = ei * Math.cos(time * 0.6 + i * 2) * 0.04;
      const fw = Math.max(0, 1 - Math.abs(i - stepC));
      const op = (1 - wFo * 0.93 * (1 - fw)) * (ki > 0 ? 1 : 0);
      l.mats.forEach(m => { m.opacity = op; m.depthWrite = op > 0.95; });
      l.g.visible = op > 0.01;
      const s = 1 + wF * fw * 0.05;
      l.g.scale.setScalar(s);
    });
    // focus camera target: interpolate between layer centres
    const ia = Math.min(4, Math.floor(stepC)), ib = Math.min(4, ia + 1), ft = stepC - ia;
    const ya = layers[ia].g.position.y + layers[ia].c, yb = layers[ib].g.position.y + layers[ib].c;
    focusY = ya + (yb - ya) * ft;
    const wFocusOnly = wFo;
    if (catcher) catcher.material.opacity = 0.35 * (1 - e);

    // landing squash
    const sq = Math.sin(Math.PI * remap(pR, 0.5, 0.72)) * (pR > 0.5 && pR < 0.72 ? 1 : 0);
    stage.scale.set(1 + sq * 0.03, 1 - sq * 0.07, 1 + sq * 0.03);

    // spin
    stage.rotation.y = (RM ? 0.6 : time * 0.22) + pA * Math.PI * 1.1 + pR * Math.PI * 1.6 + mx * 0.25;
    stage.rotation.x = my * 0.06;
    stage.rotation.z = -mx * 0.04;

    // camera
    target.set(0, focusY * wFocusOnly, 0);
    const d = P.d;
    camera.position.set(target.x + mx * 0.25 * d * 0.05, target.y + Math.sin(P.el) * d - my * 0.15, target.z + Math.cos(P.el) * d);
    camera.lookAt(target);
    // scroll the burger away with the page once the last pinned section releases
    const over = RM ? 0 : Math.max(0, sy - (Rr.top + Rr.len));
    camera.setViewOffset(W, H, -P.sx * W, P.sy * H + over, W, H);
    camera.updateMatrixWorld();

    // embers
    const ep = eGeo.attributes.position;
    for (let i = 0; i < EN; i++) { let y = ep.getY(i) + eSp[i] * dt; if (y > 6) y = -6; ep.setY(i, y); ep.setX(i, ep.getX(i) + Math.sin(time + i) * dt * 0.08); }
    ep.needsUpdate = true;

    if (RM) return;

    // label cards (anatomy)
    const cardsVis = 1 - wF;
    if (pA > 0.05 && cardsVis > 0.01) {
      const pinTop = anatPin.getBoundingClientRect().top;
      camRight.setFromMatrixColumn(camera.matrixWorld, 0);
      layers.forEach((l, i) => {
        const c = cards[i]; const [cw, ch] = cardSize[i];
        l.g.getWorldPosition(tmpP); tmpP.y += l.c;
        tmpE.copy(tmpP).addScaledVector(camRight, l.w);
        tmpP.project(camera); tmpE.project(camera);
        const cx = (tmpP.x * 0.5 + 0.5) * W, cy = (-tmpP.y * 0.5 + 0.5) * H, rp = Math.abs(tmpE.x - tmpP.x) * 0.5 * W;
        let right = portrait ? !RTL : i % 2 === 0;
        let x, lw;
        if (portrait) {
          x = right ? W - cw - 10 : 10;
          lw = right ? x - (cx + rp * 0.75) : (cx - rp * 0.75) - (x + cw);
          lw = Math.max(6, lw);
        } else {
          lw = Math.max(30, Math.min(90, W * 0.04));
          x = right ? cx + rp + lw : cx - rp - lw - cw;
        }
        const y = Math.min(H - ch - 12, Math.max(70, cy - ch / 2)) - pinTop;
        const v = ease(remap(pA, 0.14 + i * 0.06, 0.26 + i * 0.06)) * cardsVis;
        c.classList.toggle('r', right); c.classList.toggle('l', !right);
        c.style.setProperty('--lw', lw.toFixed(0) + 'px');
        c.style.opacity = v.toFixed(3);
        c.style.transform = `translate3d(${(x + (right ? 1 : -1) * (1 - v) * 30).toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
        c.style.visibility = v < 0.01 ? 'hidden' : 'visible';
      });
    } else cards.forEach(c => { c.style.opacity = 0; c.style.visibility = 'hidden'; });
    anatHead.style.opacity = (1 - ease(remap(pA, 0.06, 0.18))).toFixed(3);

    // focus copy
    const step = Math.round(stepC);
    if (step !== lastStep) {
      lastStep = step;
      fsteps.forEach((f, i) => f.classList.toggle('on', i === step));
      fdots.forEach((f, i) => f.classList.toggle('on', i === step));
    }
    // price tag
    const on = pR > 0.6;
    if (on !== tagOn) { tagOn = on; priceTag.classList.toggle('on', on); }
  }

  let last = performance.now(), running = true;
  function loop(now) {
    const dt = Math.min(0.05, (now - last) / 1000); last = now;
    const hidden = sec.menu && scrollY > sec.assemble.top + sec.assemble.len + innerHeight * 1.1;
    if (!hidden) { frame(dt); renderer.render(scene, camera); }
    canvas.style.visibility = hidden ? 'hidden' : 'visible';
    if (running) requestAnimationFrame(loop);
  }

  layout();
  addEventListener('resize', () => { layout(); if (RM) { frame(0); renderer.render(scene, camera); } });
  document.addEventListener('visibilitychange', () => { if (document.hidden) running = false; else if (!running) { running = true; last = performance.now(); requestAnimationFrame(loop); } });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => layout());
  canvas.addEventListener('webglcontextlost', e => { e.preventDefault(); root.classList.add('no-gl'); running = false; });

  // compile & first frame
  frame(0); renderer.compile(scene, camera); renderer.render(scene, camera);
  canvas.dataset.ready = '1';
  onLoaded = () => { introStart = performance.now(); };
  if (RM) { introT = 9; frame(0); renderer.render(scene, camera); running = false; }
  else requestAnimationFrame(loop);
  finishLoading();
  window.__burger = { layers, camera, stage, frame: () => frame(0.016) };
}
