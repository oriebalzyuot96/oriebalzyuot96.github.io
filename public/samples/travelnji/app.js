/* Travelnji · 2026 rebuild of the 2020 RBK team project (Travelnji/travelnji-frontend).
   Interactive map, destination guides with eco activities, trip planner, slideshow, eco shop with cart, contact form. */
import { $, $$, esc, t, L, onLang, boot, store, toast, money, router, reveal, fieldError, reducedMotion, applyI18n } from './core.js';
import { DICT } from './i18n.js';
import { PLACES, PRODUCTS, TIPS } from './data.js';

boot({ ns: 'travelnji', dict: DICT });
const S = store('travelnji');
const st = { trip: S.get('trip', []), cart: S.get('cart', []) }; // trip: [actId], cart: [{id, qty}]
const save = () => { S.set('trip', st.trip); S.set('cart', st.cart); };
const main = $('#main');
const place = (id) => PLACES.find((p) => p.id === id);
const actOf = (aid) => { for (const p of PLACES) { const a = p.acts.find((x) => x.id === aid); if (a) return { a, p }; } return null; };
const prod = (id) => PRODUCTS.find((p) => p.id === id);
const totalActs = PLACES.reduce((n, p) => n + p.acts.length, 0);
let stopView = null;

function setView(html, active, focus = true) {
  stopView?.(); stopView = null;
  main.innerHTML = html;
  $$('.nav a').forEach((a) => { if (a.getAttribute('href') === active) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); });
  if (focus) { main.focus({ preventScroll: true }); scrollTo({ top: 0, behavior: 'instant' }); }
  reveal(main);
}
const scene = (p, cls = '') => `<div class="scene ${cls}" style="--a:${p.grad[0]};--b:${p.grad[1]}" aria-hidden="true"><span class="sun"></span><svg class="hills" viewBox="0 0 400 120" preserveAspectRatio="none"><path d="M0 70 Q60 30 120 60 T240 50 T400 60 V120 H0z" fill="rgb(255 255 255 / .18)"/><path d="M0 95 Q80 60 160 88 T320 80 T400 90 V120 H0z" fill="rgb(0 0 0 / .14)"/></svg><span class="em">${p.emoji}</span></div>`;

const HERO = `<svg class="hero-svg" viewBox="0 0 800 520" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
  <defs>
    <linearGradient id="sky" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="var(--sky-1)"/><stop offset="1" stop-color="var(--sky-2)"/></linearGradient>
    <linearGradient id="m1" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#e7956b"/><stop offset="1" stop-color="#c46a45"/></linearGradient>
    <linearGradient id="m2" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#c8603d"/><stop offset="1" stop-color="#9b4429"/></linearGradient>
    <linearGradient id="sand" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#f2b47c"/><stop offset="1" stop-color="#df8f57"/></linearGradient>
  </defs>
  <rect width="800" height="520" fill="url(#sky)"/>
  <circle class="h-sun" cx="590" cy="170" r="62" fill="#ffd27a"/><circle cx="590" cy="170" r="92" fill="#ffd27a" opacity=".18"/>
  <g class="birds" fill="none" stroke="var(--bird)" stroke-width="3" stroke-linecap="round"><path d="M200 120 q10 -10 20 0 q10 -10 20 0"/><path d="M262 92 q7 -7 14 0 q7 -7 14 0"/></g>
  <path d="M0 330 L70 250 L120 280 L190 190 L260 270 L320 230 L380 290 L460 210 L520 260 L600 220 L680 280 L740 240 L800 270 V520 H0z" fill="url(#m1)" opacity=".75"/>
  <path d="M0 370 L90 290 L150 320 L230 250 L300 330 L380 300 L450 350 L530 280 L620 330 L700 300 L800 340 V520 H0z" fill="url(#m2)"/>
  <g transform="translate(250 300)"><rect x="0" y="0" width="70" height="56" rx="2" fill="#7d3420" opacity=".85"/><path d="M-6 0 h82 l-41 -26z" fill="#7d3420" opacity=".85"/><g fill="#5b2414"><rect x="8" y="12" width="6" height="44"/><rect x="22" y="12" width="6" height="44"/><rect x="42" y="12" width="6" height="44"/><rect x="56" y="12" width="6" height="44"/><rect x="30" y="26" width="10" height="30" rx="5"/></g></g>
  <path d="M0 430 Q160 380 330 420 T640 410 T800 420 V520 H0z" fill="url(#sand)"/>
  <path d="M0 470 Q200 440 420 465 T800 455 V520 H0z" fill="#e9a26a"/>
  <g transform="translate(560 392)"><path d="M0 34 L28 0 L56 34z" fill="#fff4e6"/><path d="M28 0 L28 34" stroke="#c46a45" stroke-width="2"/><path d="M22 34 L28 18 L34 34z" fill="#c46a45"/></g>
  <g class="camel" transform="translate(120 400)" fill="#6a3a24"><path d="M0 30 q6 -24 22 -22 q8 -14 18 0 q10 -4 14 -16 q6 -2 8 4 q-2 10 -10 22 l0 36 h-4 l-2 -28 h-22 l-2 28 h-4 l-2 -28 q-8 -2 -10 6 z"/></g>
</svg>`;

/* ───────── home ───────── */
function viewHome() {
  setView(`
  <section class="hero">
    ${HERO}
    <div class="wrap hero-c">
      <span class="kicker">🌿 ${t('hero.k')}</span>
      <h1>${t('hero.t')}</h1>
      <p class="lead">${t('hero.p')}</p>
      <div class="hero-cta"><a class="btn primary lg" href="#/map">🗺️ ${t('hero.cta')}</a><a class="btn lg glass" href="#/shop">♻️ ${t('hero.cta2')}</a></div>
    </div>
  </section>
  <section class="stats-band"><div class="wrap stats"><div><b>${PLACES.length}</b><span>${t('stats.1')}</span></div><div><b>${totalActs}</b><span>${t('stats.2')}</span></div><div><b>156</b><span>${t('stats.3')}</span></div></div></section>
  <section class="sec" aria-labelledby="slT"><div class="wrap">
    <div class="sec-head"><div><span class="kicker">${t('slides.k')}</span><h2 id="slT">${t('slides.t')}</h2></div>
      <div class="sl-ctl"><button class="ibtn" type="button" id="slPrev" aria-label="${t('slides.prev')}"><span class="flip" aria-hidden="true">‹</span></button><button class="ibtn" type="button" id="slPlay"></button><button class="ibtn" type="button" id="slNext" aria-label="${t('slides.next')}"><span class="flip" aria-hidden="true">›</span></button></div></div>
    <div class="slides" id="slides" role="region" aria-roledescription="carousel" aria-label="${esc(t('slides.t'))}">
      ${PLACES.map((p, i) => `<article class="slide ${i === 0 ? 'on' : ''}" role="group" aria-roledescription="slide" aria-label="${esc(t('slides.of', { a: i + 1, b: PLACES.length }))}" ${i ? 'hidden' : ''}>
        ${scene(p, 'big')}
        <div class="slide-c"><span class="tag">📅 ${esc(L(p.season))}</span><h3>${esc(L(p.name))}</h3><p>${esc(L(p.tag))}</p><a class="btn primary" href="#/place/${p.id}">${t('slides.go', { name: esc(L(p.name)) })}</a></div>
      </article>`).join('')}
      <div class="dots" role="group">${PLACES.map((p, i) => `<button type="button" class="dot" data-sl="${i}" aria-label="${esc(L(p.name))}" aria-current="${i === 0}"></button>`).join('')}</div>
    </div>
  </div></section>
  <section class="sec tint" aria-labelledby="tipT"><div class="wrap">
    <div class="sec-head"><div><span class="kicker">${t('tips.k')}</span><h2 id="tipT">${t('tips.t')}</h2></div></div>
    <div class="tips">${TIPS.map((x) => `<div class="tip rv"><span class="tip-i" aria-hidden="true">${x.icon}</span><h3>${L(x)}</h3><p>${L(x.p)}</p></div>`).join('')}</div>
  </div></section>
  <section class="sec" aria-labelledby="shT"><div class="wrap">
    <div class="sec-head"><div><span class="kicker">${t('shop.k')}</span><h2 id="shT">${t('shop.t')}</h2></div><a class="btn" href="#/shop">${t('nav.shop')} <span class="flip" aria-hidden="true">→</span></a></div>
    <div class="prods">${PRODUCTS.slice(0, 4).map(prodCard).join('')}</div>
  </div></section>`, '#/', false);

  // accessible carousel
  const slides = $$('.slide'), dots = $$('.dot');
  let i = 0, playing = !reducedMotion(), tm;
  const show = (n) => { i = (n + slides.length) % slides.length; slides.forEach((s, k) => { s.hidden = k !== i; s.classList.toggle('on', k === i); }); dots.forEach((d, k) => d.setAttribute('aria-current', String(k === i))); };
  const play = () => { $('#slPlay').innerHTML = playing ? '<span aria-hidden="true">❚❚</span>' : '<span aria-hidden="true">▶</span>'; $('#slPlay').setAttribute('aria-label', t(playing ? 'slides.pause' : 'slides.play')); clearInterval(tm); if (playing) tm = setInterval(() => show(i + 1), 5000); $('#slides').setAttribute('aria-live', playing ? 'off' : 'polite'); };
  $('#slPrev').addEventListener('click', () => { show(i - 1); playing = false; play(); });
  $('#slNext').addEventListener('click', () => { show(i + 1); playing = false; play(); });
  $('#slPlay').addEventListener('click', () => { playing = !playing; play(); });
  dots.forEach((d) => d.addEventListener('click', () => { show(+d.dataset.sl); playing = false; play(); }));
  $('#slides').addEventListener('focusin', () => { if (playing) { playing = false; play(); } });
  play();
  stopView = () => clearInterval(tm);
}

/* ───────── map ───────── */
const JORDAN = 'M128 72 L170 66 L215 76 L240 70 L312 112 L300 132 L212 188 L246 240 L222 300 L190 370 L172 430 L138 478 L122 472 L118 420 L112 360 L108 300 L112 240 L118 190 L122 130 Z';
function mapSvg(sel) {
  return `<svg class="jmap" viewBox="60 40 290 460" role="group" aria-label="${esc(t('map.label'))}">
    <defs><pattern id="dots" width="8" height="8" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="var(--map-dot)"/></pattern></defs>
    <path d="${JORDAN}" fill="var(--map-fill)" stroke="var(--map-line)" stroke-width="2" stroke-linejoin="round"/>
    <path d="${JORDAN}" fill="url(#dots)"/>
    <path d="M118 74 C114 120 116 160 118 190" fill="none" stroke="#4fb3d9" stroke-width="2.5" stroke-linecap="round" opacity=".8"/>
    <ellipse cx="112" cy="232" rx="6" ry="30" fill="#4fb3d9" opacity=".85"/>
    <path d="M126 478 L118 500 L110 500 L114 476z" fill="#4fb3d9" opacity=".85"/>
    <g class="pins">${PLACES.map((p) => `<a href="#/map/${p.id}" class="pin ${sel === p.id ? 'sel' : ''}" aria-label="${esc(L(p.name))}" ${sel === p.id ? 'aria-current="true"' : ''} data-pin="${p.id}">
      <circle class="pulse" cx="${p.x}" cy="${p.y}" r="10"/><path d="M${p.x} ${p.y} c-7 -9 -11 -14 -11 -20 a11 11 0 0 1 22 0 c0 6 -4 11 -11 20z" class="drop"/><circle cx="${p.x}" cy="${p.y - 20}" r="4" fill="#fff"/>
      <text x="${p.x + 16}" y="${p.y - 14}" class="pl">${esc(L(p.name).split(/ & | و/)[0])}</text></a>`).join('')}</g>
  </svg>`;
}
function panel(id) {
  const p = place(id);
  if (!p) return `<div class="panel-empty"><span aria-hidden="true">👆</span><p>${t('map.pick')}</p><div class="chips">${PLACES.map((x) => `<a class="chip" href="#/map/${x.id}">${x.emoji} ${esc(L(x.name))}</a>`).join('')}</div></div>`;
  return `${scene(p)}<div class="panel-b"><h2>${esc(L(p.name))}</h2><p class="lead2">${esc(L(p.tag))}</p>
    <p class="meta">📅 ${t('map.best')}: <b>${esc(L(p.season))}</b> · 🌿 ${t('map.acts', { n: p.acts.length })}</p>
    <ul class="acts sm">${p.acts.map(actRow).join('')}</ul>
    <a class="btn primary block" href="#/place/${p.id}">${t('map.open')} <span class="flip" aria-hidden="true">→</span></a></div>`;
}
function viewMap(id) {
  if ($('#jmapWrap')) { // update in place, keep focus on the pin
    $('#jmapWrap').innerHTML = mapSvg(id);
    $('#panel').innerHTML = panel(id);
    $(`[data-pin="${id}"]`)?.focus();
    return;
  }
  setView(`<section class="sec page-top" aria-labelledby="mapT"><div class="wrap">
    <div class="sec-head"><div><span class="kicker">${t('map.k')}</span><h1 id="mapT" class="h2">${t('map.t')}</h1><p>${t('map.p')}</p></div></div>
    <div class="mapg"><div class="card map-card" id="jmapWrap">${mapSvg(id)}</div><aside class="card panel" id="panel" aria-live="polite">${panel(id)}</aside></div>
  </div></section>`, '#/map');
}

/* ───────── place guide ───────── */
const ecoDots = (n) => `<span class="eco" aria-label="${esc(t('pl.eco', { n }))}">${[1, 2, 3].map((k) => `<i class="${k <= n ? 'on' : ''}"></i>`).join('')}</span>`;
function actRow(a) {
  const on = st.trip.includes(a.id);
  return `<li><span class="act-i" aria-hidden="true">${a.icon}</span><span class="act-c"><b>${esc(L(a))}</b><small>⏱ ${t('pl.hrs', { n: a.hrs })} ${ecoDots(a.eco)}</small></span>
    <button class="btn sm ${on ? 'in' : ''}" type="button" data-trip="${a.id}" aria-pressed="${on}">${on ? `✓ ${t('pl.added')}` : `+ ${t('pl.add')}`}</button></li>`;
}
function viewPlace(id) {
  const p = place(id);
  if (!p) { setView(`<section class="sec page-top"><div class="wrap empty"><span class="em">🧭</span><p>${t('pl.notFound')}</p><a class="btn primary" href="#/map">${t('pl.back')}</a></div></section>`, '#/map'); return; }
  const idx = PLACES.indexOf(p), next = PLACES[(idx + 1) % PLACES.length];
  const tip = TIPS[idx % TIPS.length];
  setView(`<section class="pl-hero" style="--a:${p.grad[0]};--b:${p.grad[1]}">${scene(p, 'cover')}<div class="wrap pl-hc"><a class="back light" href="#/map/${p.id}"><span class="flip" aria-hidden="true">←</span> ${t('pl.back')}</a><h1>${esc(L(p.name))}</h1><p>${esc(L(p.tag))}</p></div></section>
  <section class="sec"><div class="wrap pl-g">
    <div><p class="lead">${esc(L(p.info))}</p>
      <h2>${t('pl.acts')}</h2><ul class="acts">${p.acts.map(actRow).join('')}</ul></div>
    <aside class="pl-side">
      <div class="card pad"><h3>📅 ${t('pl.best')}</h3><p>${esc(L(p.season))}</p></div>
      <div class="card pad tipc"><h3>${tip.icon} ${t('pl.tip')}</h3><p><b>${L(tip)}.</b> ${L(tip.p)}</p></div>
      <a class="card pad nextc" href="#/place/${next.id}"><small>${t('pl.next')}</small><b>${next.emoji} ${esc(L(next.name))} <span class="flip" aria-hidden="true">→</span></b></a>
    </aside>
  </div></section>`, '#/map');
}

/* ───────── trip ───────── */
function viewTrip() {
  const items = st.trip.map(actOf).filter(Boolean);
  const groups = PLACES.map((p) => ({ p, list: items.filter((x) => x.p.id === p.id).map((x) => x.a) })).filter((g) => g.list.length);
  const hrs = items.reduce((n, x) => n + x.a.hrs, 0);
  const score = items.length ? items.reduce((n, x) => n + x.a.eco, 0) / items.length : 0;
  setView(`<section class="sec page-top" aria-labelledby="tripT"><div class="wrap narrow">
    <div class="sec-head"><div><span class="kicker">${t('trip.k')}</span><h1 id="tripT" class="h2">${t('trip.t')}</h1></div>
      ${items.length ? `<div class="row-btns"><button class="btn" type="button" id="share">📋 ${t('trip.share')}</button><button class="btn ghost" type="button" id="clear">${t('trip.clear')}</button></div>` : ''}</div>
    ${items.length ? `
    <div class="trip-sum card pad"><div><b>${t('trip.acts', { n: items.length })}</b><span>${t('trip.days', { n: Math.max(1, Math.ceil(hrs / 8)) })}</span></div>
      <div class="score"><span>${t('trip.score')}</span><div class="meter" role="meter" aria-valuemin="0" aria-valuemax="3" aria-valuenow="${score.toFixed(1)}" aria-label="${esc(t('trip.score'))}"><span style="width:${(score / 3) * 100}%"></span></div><b>${score.toFixed(1)} / 3</b></div></div>
    ${groups.map((g, gi) => `<div class="trip-g rv"><div class="trip-h"><span class="trip-n">${gi + 1}</span>${scene(g.p, 'mini')}<h2><a href="#/place/${g.p.id}">${esc(L(g.p.name))}</a></h2></div>
      <ul class="acts">${g.list.map((a) => `<li><span class="act-i" aria-hidden="true">${a.icon}</span><span class="act-c"><b>${esc(L(a))}</b><small>⏱ ${t('pl.hrs', { n: a.hrs })} ${ecoDots(a.eco)}</small></span><button class="ibtn" type="button" data-trip="${a.id}" aria-label="${esc(t('trip.remove', { name: L(a) }))}">✕</button></li>`).join('')}</ul></div>`).join('')}`
    : `<div class="empty card"><span class="em" aria-hidden="true">🧭</span><p>${t('trip.none')}</p><a class="btn primary" href="#/map">${t('trip.explore')}</a></div>`}
  </div></section>`, '#/trip');
  $('#clear')?.addEventListener('click', () => { st.trip = []; save(); viewTrip(); });
  $('#share')?.addEventListener('click', async () => {
    const txt = groups.map((g) => `${L(g.p.name)}\n${g.list.map((a) => `  - ${L(a)} (${a.hrs}h)`).join('\n')}`).join('\n\n');
    try { await navigator.clipboard.writeText(`Travelnji\n\n${txt}`); toast(t('trip.copied'), { icon: '📋' }); } catch { toast(t('trip.copied'), { icon: '📋' }); }
  });
}

/* ───────── shop ───────── */
function prodCard(p) {
  return `<article class="prod rv"><div class="prod-art" style="--a:${p.grad[0]};--b:${p.grad[1]}" aria-hidden="true"><span>${p.icon}</span></div>
    <div class="prod-b"><h3>${esc(L(p.name))}</h3><p>${esc(L(p.desc))}</p><div class="prod-f"><b>${money(p.price)}</b><button class="btn primary sm" type="button" data-buy="${p.id}" aria-label="${esc(t('shop.add'))}: ${esc(L(p.name))}">+ ${t('shop.add')}</button></div></div></article>`;
}
function viewShop(cat = 'all') {
  setView(`<section class="sec page-top" aria-labelledby="shopT"><div class="wrap">
    <div class="sec-head"><div><span class="kicker">${t('shop.k')}</span><h1 id="shopT" class="h2">${t('shop.t')}</h1><p>${t('shop.p')}</p></div></div>
    <div class="chips" style="margin-bottom:20px">${['all', 'bags', 'bottles'].map((c) => `<a class="chip" href="#/shop${c === 'all' ? '' : `/${c}`}" aria-pressed="${c === cat}">${t(`shop.${c}`)}</a>`).join('')}</div>
    <div class="prods">${PRODUCTS.filter((p) => cat === 'all' || p.cat === cat).map(prodCard).join('')}</div>
  </div></section>`, '#/shop');
}
const cartTotal = () => st.cart.reduce((n, x) => n + (prod(x.id)?.price || 0) * x.qty, 0);
const cartCount = () => st.cart.reduce((n, x) => n + x.qty, 0);
function renderCart(done) {
  const n = cartCount(); $('#cartN').hidden = !n; $('#cartN').textContent = n; $('#cartBtn').setAttribute('aria-label', t('ui.cartN', { n }));
  const body = $('#cartBody');
  if (done) { body.innerHTML = `<div class="empty"><span class="em" aria-hidden="true">🌳</span><h3>${t('co.ok')}</h3><p>${esc(done)}</p><button class="btn primary" type="button" data-close>${t('ui.close')}</button></div>`; return; }
  if (!n) { body.innerHTML = `<div class="empty"><span class="em" aria-hidden="true">🛍️</span><p>${t('cart.empty')}</p><a class="btn primary" href="#/shop" data-close>${t('nav.shop')}</a></div>`; return; }
  body.innerHTML = `<ul class="lines">${st.cart.map((x) => { const p = prod(x.id); return `<li><div class="prod-art sm" style="--a:${p.grad[0]};--b:${p.grad[1]}" aria-hidden="true"><span>${p.icon}</span></div><div class="ln-c"><b>${esc(L(p.name))}</b><small>${money(p.price)}</small>
      <div class="qty"><button type="button" class="ibtn" data-q="${p.id}" data-d="-1" aria-label="${t('cart.dec')}: ${esc(L(p.name))}">−</button><output>${x.qty}</output><button type="button" class="ibtn" data-q="${p.id}" data-d="1" aria-label="${t('cart.inc')}: ${esc(L(p.name))}">+</button></div></div><b>${money(p.price * x.qty)}</b></li>`; }).join('')}</ul>
    <div class="cart-f"><p class="trees">${t('cart.trees', { n })}</p><div class="tot"><span>${t('cart.total')}</span><b>${money(cartTotal())}</b></div>
    <form id="coF" class="co" novalidate><h3>${t('co.t')}</h3><div id="coErr" tabindex="-1"></div>
      <div class="field"><label for="cn">${t('co.name')}</label><input class="input" id="cn" name="name" autocomplete="name"></div>
      <div class="field"><label for="ce">${t('co.email')}</label><input class="input" id="ce" name="email" type="email" dir="ltr" autocomplete="email"></div>
      <div class="field"><label for="ca">${t('co.address')}</label><input class="input" id="ca" name="addr" autocomplete="street-address"></div>
      <p class="hint">ℹ️ ${t('co.demo')}</p>
      <button class="btn primary lg block" type="submit">${t('co.place', { total: money(cartTotal()) })}</button></form></div>`;
}
const R = { name: (v) => v.trim().length >= 2 || t('v.name'), email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) || t('v.email'), addr: (v) => v.trim().length >= 4 || t('v.address'), msg: (v) => v.trim().length >= 15 || t('v.msg') };
function validate(f, keys, box) {
  const bad = keys.filter((k) => { const r = R[k](f[k].value); fieldError(f[k], r === true ? '' : r); return r !== true; });
  if (bad.length) { box.className = 'err-summary'; box.setAttribute('role', 'alert'); box.innerHTML = `<h3>${t('v.summary', { n: bad.length })}</h3><ul>${bad.map((k) => `<li><a href="#" data-f="${k}">${esc(R[k](f[k].value))}</a></li>`).join('')}</ul>`; box.focus(); $$('[data-f]', box).forEach((a) => a.addEventListener('click', (e) => { e.preventDefault(); f[a.dataset.f].focus(); })); }
  else { box.className = ''; box.innerHTML = ''; box.removeAttribute('role'); }
  keys.forEach((k) => { f[k].oninput = () => { if (f[k].getAttribute('aria-invalid')) { const r = R[k](f[k].value); fieldError(f[k], r === true ? '' : r); } }; });
  return !bad.length;
}

/* ───────── contact ───────── */
function viewContact() {
  setView(`<section class="sec page-top" aria-labelledby="ctT"><div class="wrap ct-g">
    <div><span class="kicker">${t('ct.k')}</span><h1 id="ctT" class="h2">${t('ct.t')}</h1><p class="lead">${t('ct.p')}</p>
      <dl class="ct-dl"><div><dt>📞 ${t('ct.phone')}</dt><dd class="ltr">+962 79 855 0000</dd></div><div><dt>✉️ ${t('ct.mail')}</dt><dd class="ltr">hello@travelnji.example</dd></div><div><dt>📍 ${t('ct.where')}</dt><dd>${L({ en: 'Rainbow Street, Amman', ar: 'شارع الرينبو، عمّان' })}</dd></div></dl></div>
    <form class="card pad ctf" id="ctF" novalidate><div id="ctErr" tabindex="-1"></div>
      <div class="field"><label for="tn">${t('ct.name')}</label><input class="input" id="tn" name="name" autocomplete="name"></div>
      <div class="field"><label for="te">${t('ct.email')}</label><input class="input" id="te" name="email" type="email" dir="ltr" autocomplete="email"></div>
      <div class="field"><label for="tt">${t('ct.topic')}</label><select class="select" id="tt" name="topic"><option>${t('ct.t1')}</option><option>${t('ct.t2')}</option><option>${t('ct.t3')}</option></select></div>
      <div class="field"><label for="tm">${t('ct.msg')}</label><textarea class="textarea" id="tm" name="msg" rows="5"></textarea></div>
      <button class="btn primary lg" type="submit">${t('ct.send')}</button>
    </form></div></section>`, '#/contact');
  $('#ctF').addEventListener('submit', (e) => {
    e.preventDefault(); const f = e.target;
    if (!validate(f, ['name', 'email', 'msg'], $('#ctErr'))) return;
    const msg = t('ct.sent', { name: f.name.value.trim().split(' ')[0], email: f.email.value.trim() });
    f.outerHTML = `<div class="card pad sent" role="status" tabindex="-1" id="sent"><span class="em" aria-hidden="true">📨</span><p>${esc(msg)}</p></div>`;
    $('#sent').focus();
  });
}

/* ───────── events ───────── */
document.addEventListener('click', (e) => {
  const tr = e.target.closest('[data-trip]');
  if (tr) {
    const id = tr.dataset.trip, on = !st.trip.includes(id), { a } = actOf(id);
    st.trip = on ? [...st.trip, id] : st.trip.filter((x) => x !== id); save();
    toast(t(on ? 'trip.added' : 'trip.removed', { name: L(a) }), { icon: on ? a.icon : '−' });
    if (location.hash.startsWith('#/trip')) { viewTrip(); return; }
    $$(`[data-trip="${id}"]`).forEach((b) => { b.setAttribute('aria-pressed', on); b.classList.toggle('in', on); b.textContent = on ? `✓ ${t('pl.added')}` : `+ ${t('pl.add')}`; });
    return;
  }
  const buy = e.target.closest('[data-buy]');
  if (buy) { const x = st.cart.find((c) => c.id === buy.dataset.buy); if (x) x.qty++; else st.cart.push({ id: buy.dataset.buy, qty: 1 }); save(); renderCart(); const b = $('#cartN'); b.classList.remove('bump'); void b.offsetWidth; b.classList.add('bump'); toast(t('shop.added', { name: L(prod(buy.dataset.buy).name) }), { icon: prod(buy.dataset.buy).icon }); return; }
  const q = e.target.closest('[data-q]');
  if (q) { const x = st.cart.find((c) => c.id === q.dataset.q); x.qty += +q.dataset.d; if (x.qty <= 0) st.cart = st.cart.filter((c) => c !== x); save(); renderCart(); ($(`#cartBody [data-q="${q.dataset.q}"][data-d="${q.dataset.d}"]`) || $('#cart [data-close]')).focus(); return; }
  if (e.target.closest('#cartBtn')) { renderCart(); $('#cart').showModal(); return; }
  const c = e.target.closest('[data-close]'); if (c) c.closest('dialog')?.close();
});
document.addEventListener('submit', (e) => {
  if (e.target.id !== 'coF') return;
  e.preventDefault();
  if (!validate(e.target, ['name', 'email', 'addr'], $('#coErr'))) return;
  const n = cartCount(); const id = `TJ-${String(Date.now()).slice(-5)}`;
  st.cart = []; save(); renderCart(t('co.done', { id, n }));
  $('#cartBody .btn').focus();
});

const route = router([
  [/^\/$/, viewHome],
  [/^\/map$/, () => viewMap('')],
  [/^\/map\/(\w+)$/, viewMap],
  [/^\/place\/(\w+)$/, viewPlace],
  [/^\/trip$/, viewTrip],
  [/^\/shop$/, () => viewShop('all')],
  [/^\/shop\/(\w+)$/, viewShop],
  [/^\/contact$/, viewContact],
], () => viewHome());
onLang(() => { main.innerHTML = ''; route(); renderCart(); });
renderCart(); route(); applyI18n();
