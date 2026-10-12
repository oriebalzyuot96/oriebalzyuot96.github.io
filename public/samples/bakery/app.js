/* GoodDay Bakery · 2026 rebuild of the 2020 RBK team project (LadyBugs4/BakeryShop4).
   Plain ES modules, no framework. Cart, favourites, orders and kitchen products live in localStorage. */
import { $, $$, esc, t, L, lang, isAr, onLang, boot, store, toast, money, router, reveal, fieldError, reducedMotion, applyI18n } from './core.js';
import { DICT } from './i18n.js';
import { CATS, PRODUCTS, CITIES, TAX, FREE_DELIVERY, PROMOS, CAKE } from './data.js';

CATS.forEach((c) => { DICT.en[`cats.${c.id}`] = c.en; DICT.ar[`cats.${c.id}`] = c.ar; });
boot({ ns: 'goodday', dict: DICT });

const S = store('goodday');
const st = {
  cart: S.get('cart', []),            // [{key, id, qty} | {key, cake, price, qty}]
  favs: new Set(S.get('favs', [])),
  promo: S.get('promo', null),
  orders: S.get('orders', []),
  mine: S.get('mine', []),            // kitchen-dashboard products
};
const save = () => { S.set('cart', st.cart); S.set('favs', [...st.favs]); S.set('promo', st.promo); S.set('orders', st.orders); S.set('mine', st.mine); };

const all = () => [...PRODUCTS, ...st.mine];
const byId = (id) => all().find((p) => p.id === id);
const main = $('#main');
let leave = null; // cleanup for the current view

/* ───────── shared bits ───────── */
const stars = (r) => `<span class="stars" aria-hidden="true">★</span><b>${r.toFixed(1)}</b>`;
const heartSvg = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.5s-7.5-4.6-9.3-9.4C1.4 7.6 3.7 4 7.3 4c2 0 3.6 1.1 4.7 2.7C13.1 5.1 14.7 4 16.7 4c3.6 0 5.9 3.6 4.6 7.1-1.8 4.8-9.3 9.4-9.3 9.4z"/></svg>';
const art = (p, cls = '') => `<div class="art ${cls}" style="--a:${p.tone[0]};--b:${p.tone[1]}" aria-hidden="true"><span class="crumbs"></span><span class="em">${p.emoji}</span></div>`;

function card(p) {
  const fav = st.favs.has(p.id);
  const tag = p.tags?.[0];
  return `<article class="pcard rv" data-id="${p.id}">
    <a class="pcard-link" href="#/p/${p.id}" aria-label="${esc(t('p.view', { name: L(p.name) }))}">${art(p)}</a>
    ${tag ? `<span class="ptag t-${tag}">${t(`tag.${tag}`)}</span>` : ''}
    <button class="fav" type="button" data-fav="${p.id}" aria-pressed="${fav}" aria-label="${esc(t(fav ? 'p.unfav' : 'p.fav'))}: ${esc(L(p.name))}">${heartSvg}</button>
    <div class="pcard-b">
      <div class="pcard-meta">${stars(p.rating || 4.5)}<span>· ${t(`cats.${p.cat}`)}</span></div>
      <h3><a href="#/p/${p.id}">${esc(L(p.name))}</a></h3>
      <p>${esc(L(p.desc))}</p>
      <div class="pcard-f"><span class="price">${money(p.price)}</span>
        <button class="btn primary sm add" type="button" data-add="${p.id}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/></svg><span>${t('p.add')}</span></button>
      </div>
    </div>
  </article>`;
}

function setView(html, { focus = true, active } = {}) {
  leave?.(); leave = null;
  main.innerHTML = html;
  $$('.nav a').forEach((a) => { if (a.getAttribute('href') === active) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); });
  if (focus) { main.focus({ preventScroll: true }); scrollTo({ top: 0, behavior: 'instant' }); }
  reveal(main);
}

/* ───────── hero illustration ───────── */
const HERO_ART = `<svg class="hero-art" viewBox="0 0 520 470" role="img" aria-label="">
  <defs>
    <radialGradient id="gLoaf" cx="45%" cy="30%" r="80%"><stop offset="0" stop-color="#f6cf95"/><stop offset=".55" stop-color="#d98d45"/><stop offset="1" stop-color="#9c5626"/></radialGradient>
    <radialGradient id="gCro" cx="50%" cy="30%" r="75%"><stop offset="0" stop-color="#ffd98a"/><stop offset=".6" stop-color="#e59a3c"/><stop offset="1" stop-color="#b0601f"/></radialGradient>
    <linearGradient id="gBoard" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#d6a674"/><stop offset="1" stop-color="#a87444"/></linearGradient>
  </defs>
  <circle cx="270" cy="225" r="205" fill="var(--hero-disc)"/>
  <circle cx="270" cy="225" r="160" fill="none" stroke="var(--brand)" stroke-opacity=".18" stroke-width="2" stroke-dasharray="4 10"/>
  <g class="wheat" stroke="#c99a4c" stroke-width="3" stroke-linecap="round" fill="#e7bf73">
    <path d="M78 330 C90 250 110 190 150 130" fill="none"/>
    <ellipse cx="148" cy="138" rx="7" ry="15" transform="rotate(35 148 138)"/><ellipse cx="136" cy="160" rx="7" ry="15" transform="rotate(30 136 160)"/><ellipse cx="125" cy="184" rx="7" ry="15" transform="rotate(25 125 184)"/>
    <ellipse cx="160" cy="160" rx="7" ry="15" transform="rotate(70 160 160)"/><ellipse cx="148" cy="184" rx="7" ry="15" transform="rotate(65 148 184)"/>
    <path d="M470 320 C462 250 446 200 410 150" fill="none"/>
    <ellipse cx="412" cy="156" rx="7" ry="15" transform="rotate(-35 412 156)"/><ellipse cx="424" cy="178" rx="7" ry="15" transform="rotate(-30 424 178)"/><ellipse cx="433" cy="202" rx="7" ry="15" transform="rotate(-25 433 202)"/>
    <ellipse cx="400" cy="178" rx="7" ry="15" transform="rotate(-70 400 178)"/>
  </g>
  <ellipse cx="275" cy="402" rx="215" ry="22" fill="#5b3418" opacity=".18"/>
  <rect x="70" y="352" width="410" height="38" rx="19" fill="url(#gBoard)"/>
  <rect x="440" y="362" width="62" height="16" rx="8" fill="#b98353"/>
  <path d="M128 358 C122 250 200 186 292 186 C384 186 448 246 440 358 Z" fill="url(#gLoaf)"/>
  <g fill="none" stroke="#fbe3bf" stroke-width="7" stroke-linecap="round" opacity=".9">
    <path d="M196 248 C220 232 248 226 270 230"/><path d="M226 286 C258 264 296 258 330 264"/><path d="M286 230 C312 222 342 226 366 240"/>
  </g>
  <g fill="#fff4dd" opacity=".85"><circle cx="220" cy="214" r="3"/><circle cx="300" cy="204" r="2.5"/><circle cx="352" cy="214" r="3"/><circle cx="250" cy="300" r="2.5"/><circle cx="380" cy="292" r="3"/></g>
  <g class="cro" transform="translate(300 300) rotate(-8)">
    <ellipse cx="0" cy="0" rx="40" ry="44" fill="url(#gCro)"/>
    <ellipse cx="-52" cy="10" rx="30" ry="34" transform="rotate(-25 -52 10)" fill="url(#gCro)"/>
    <ellipse cx="52" cy="10" rx="30" ry="34" transform="rotate(25 52 10)" fill="url(#gCro)"/>
    <ellipse cx="-92" cy="30" rx="20" ry="22" transform="rotate(-45 -92 30)" fill="url(#gCro)"/>
    <ellipse cx="92" cy="30" rx="20" ry="22" transform="rotate(45 92 30)" fill="url(#gCro)"/>
    <g fill="none" stroke="#9c5626" stroke-opacity=".5" stroke-width="3" stroke-linecap="round"><path d="M-18 -30 C-8 -10 -8 14 -16 34"/><path d="M18 -30 C8 -10 8 14 16 34"/><path d="M-66 -10 C-56 8 -58 26 -64 38"/><path d="M66 -10 C56 8 58 26 64 38"/></g>
  </g>
  <g class="steam" fill="none" stroke="var(--steam)" stroke-width="6" stroke-linecap="round">
    <path d="M232 160 c-14 -18 14 -30 0 -50 s14 -30 0 -48"/><path d="M286 150 c-14 -18 14 -30 0 -50 s14 -30 0 -48"/><path d="M340 162 c-14 -18 14 -30 0 -50 s14 -30 0 -48"/>
  </g>
</svg>`;

/* ───────── views ───────── */
function viewHome() {
  const best = all().filter((p) => p.tags?.includes('best')).slice(0, 4);
  setView(`
  <section class="hero">
    <div class="wrap hero-g">
      <div class="hero-c">
        <span class="kicker"><span class="dot" aria-hidden="true"></span>${t('hero.kicker')}</span>
        <h1>${t('hero.t')}</h1>
        <p class="lead">${t('hero.p')}</p>
        <div class="hero-cta"><a class="btn primary lg" href="#/menu">${t('hero.cta')}</a><a class="btn lg" href="#/cake">🎂 ${t('hero.cta2')}</a></div>
        <dl class="stats">
          <div><dt>${t('hero.s1')}</dt><dd>1,200+</dd></div>
          <div><dt>${t('hero.s2')}</dt><dd>4.8★</dd></div>
          <div><dt>${t('hero.s3')}</dt><dd>45</dd></div>
        </dl>
      </div>
      <div class="hero-v">${HERO_ART}
        <div class="float-card fc1"><span aria-hidden="true">🔥</span><div><b>${t('hero.badge')}</b><small>${t('hero.badge2')}</small></div></div>
        <div class="float-card fc2"><span aria-hidden="true">🥯</span><div><b>${esc(L(byId('jerusalem-kaek').name))}</b><small>${money(2.5)}</small></div></div>
      </div>
    </div>
  </section>

  <section class="sec" aria-labelledby="catsT">
    <div class="wrap">
      <div class="sec-head"><div><span class="kicker">${t('cats.k')}</span><h2 id="catsT">${t('cats.t')}</h2></div></div>
      <div class="cats">
        ${CATS.map((c, i) => `<a class="cat rv c${i}" href="#/menu/${c.id}"><span class="cat-em" aria-hidden="true">${c.icon}</span><span><b>${L(c)}</b><small>${L(c.blurb)}</small></span><span class="cat-n">${all().filter((p) => p.cat === c.id).length}</span></a>`).join('')}
      </div>
    </div>
  </section>

  <section class="sec tint" aria-labelledby="bestT">
    <div class="wrap">
      <div class="sec-head"><div><span class="kicker">${t('best.k')}</span><h2 id="bestT">${t('best.t')}</h2></div><a class="btn" href="#/menu">${t('best.all')} <span class="flip" aria-hidden="true">→</span></a></div>
      <div class="grid">${best.map(card).join('')}</div>
    </div>
  </section>

  <section class="sec" aria-labelledby="howT">
    <div class="wrap">
      <div class="sec-head"><div><span class="kicker">${t('how.k')}</span><h2 id="howT">${t('how.t')}</h2></div></div>
      <ol class="how">
        ${[['🥖', 1], ['👩‍🍳', 2], ['🛵', 3]].map(([e, n]) => `<li class="rv"><span class="how-n">${n}</span><span class="how-e" aria-hidden="true">${e}</span><h3>${t(`how.${n}t`)}</h3><p>${t(`how.${n}p`)}</p></li>`).join('')}
      </ol>
    </div>
  </section>

  <section class="sec" aria-labelledby="cakeT">
    <div class="wrap">
      <div class="cake-cta rv">
        <div><span class="kicker">${t('builder.k')}</span><h2 id="cakeT">${t('cake.cta.t')}</h2><p>${t('cake.cta.p')}</p><a class="btn primary lg" href="#/cake">${t('cake.cta.b')}</a></div>
        <div class="cake-cta-v" aria-hidden="true">${cakeSvg({ size: 's8', sponge: 'chocolate', frosting: 'strawberry', toppings: ['berries', 'candles'], msg: '' })}</div>
      </div>
    </div>
  </section>

  <section class="sec" aria-labelledby="storyT">
    <div class="wrap story rv">
      <span class="story-em" aria-hidden="true">🌾</span>
      <div><span class="kicker">${t('story.k')}</span><h2 id="storyT">${t('story.t')}</h2><p>${t('story.p')}</p></div>
    </div>
  </section>`, { focus: false, active: '#/' });
}

const menuState = { q: '', sort: 'pop' };
function viewMenu(cat = 'all') {
  const chips = [['all', '🧺', t('menu.all')], ...CATS.map((c) => [c.id, c.icon, L(c)]), ['fav', '♥', t('menu.fav')]];
  setView(`
  <section class="sec page-top" aria-labelledby="menuT">
    <div class="wrap">
      <div class="sec-head"><div><span class="kicker">${t('menu.k')}</span><h1 id="menuT" class="h2">${t('menu.t')}</h1><p>${t('menu.p')}</p></div></div>
      <div class="toolbar">
        <div class="search">
          <label class="sr-only" for="q">${t('menu.search')}</label>
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" stroke-width="2"/><path d="M20 20l-3.5-3.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
          <input class="input" id="q" type="search" autocomplete="off" placeholder="${esc(t('menu.searchPh'))}" value="${esc(menuState.q)}">
        </div>
        <div class="field sort"><label class="sr-only" for="sort">${t('menu.sort')}</label>
          <select class="select" id="sort">${['pop', 'rate', 'low', 'high'].map((s) => `<option value="${s}" ${menuState.sort === s ? 'selected' : ''}>${t(`sort.${s}`)}</option>`).join('')}</select>
        </div>
      </div>
      <div class="chips cat-chips" role="group" aria-label="${esc(t('menu.k'))}">
        ${chips.map(([id, ic, label]) => `<a class="chip" href="#/menu${id === 'all' ? '' : `/${id}`}" aria-pressed="${id === cat}" ${id === cat ? 'aria-current="true"' : ''}><span aria-hidden="true">${ic}</span>${esc(label)}</a>`).join('')}
      </div>
      <p class="count" id="count" aria-live="polite"></p>
      <div class="grid" id="grid"></div>
    </div>
  </section>`, { active: '#/menu' });

  const draw = () => {
    const q = menuState.q.trim().toLowerCase();
    let list = all().filter((p) => (cat === 'all' ? true : cat === 'fav' ? st.favs.has(p.id) : p.cat === cat));
    if (q) list = list.filter((p) => `${p.name.en} ${p.name.ar} ${p.desc.en} ${p.desc.ar}`.toLowerCase().includes(q));
    const s = menuState.sort;
    list.sort((a, b) => (s === 'low' ? a.price - b.price : s === 'high' ? b.price - a.price : s === 'rate' ? b.rating - a.rating : (b.reviews || 0) - (a.reviews || 0)));
    $('#count').textContent = t('menu.count', { n: list.length });
    $('#grid').innerHTML = list.length ? list.map(card).join('')
      : `<div class="empty" style="grid-column:1/-1"><span class="em" aria-hidden="true">${cat === 'fav' && !q ? '🤍' : '🔍'}</span><p>${t(cat === 'fav' && !q ? 'menu.noneFav' : 'menu.none')}</p>${q ? '<button class="btn" type="button" id="reset">' + t('menu.reset') + '</button>' : ''}</div>`;
    reveal($('#grid'));
    $('#reset')?.addEventListener('click', () => { menuState.q = ''; $('#q').value = ''; draw(); $('#q').focus(); });
  };
  let tm;
  $('#q').addEventListener('input', (e) => { clearTimeout(tm); tm = setTimeout(() => { menuState.q = e.target.value; draw(); }, 120); });
  $('#sort').addEventListener('change', (e) => { menuState.sort = e.target.value; draw(); });
  draw();
}

function viewProduct(id) {
  const p = byId(id);
  if (!p) { setView(`<section class="sec page-top"><div class="wrap empty"><span class="em">🥲</span><p>${t('p.notFound')}</p><a class="btn primary" href="#/menu">${t('p.back')}</a></div></section>`, { active: '#/menu' }); return; }
  const more = all().filter((x) => x.cat === p.cat && x.id !== p.id).sort((a, b) => b.reviews - a.reviews).slice(0, 4);
  const fav = st.favs.has(p.id);
  setView(`
  <section class="sec page-top">
    <div class="wrap">
      <a class="back" href="#/menu/${p.cat}"><span class="flip" aria-hidden="true">←</span> ${t('p.back')}</a>
      <div class="pd">
        <div class="pd-v">${art(p, 'big')}<span class="pd-fresh">🔥 ${t('p.fresh')}</span></div>
        <div class="pd-c">
          <div class="pcard-meta">${stars(p.rating || 4.5)}<span>· ${t('p.reviews', { n: p.reviews || 0 })}</span><span>· ${t(`cats.${p.cat}`)}</span></div>
          <h1>${esc(L(p.name))}</h1>
          <p class="lead">${esc(L(p.desc))}</p>
          ${p.tags?.length ? `<div class="tags">${p.tags.map((g) => `<span class="tag">${t(`tag.${g}`)}</span>`).join('')}</div>` : ''}
          <p class="pd-price">${money(p.price)}</p>
          <div class="pd-buy">
            <div class="qty" role="group" aria-label="${t('p.qty')}">
              <button type="button" class="ibtn" id="dec" aria-label="${t('p.dec')}">−</button>
              <output id="qn" aria-live="polite">1</output>
              <button type="button" class="ibtn" id="inc" aria-label="${t('p.inc')}">+</button>
            </div>
            <button class="btn primary lg" type="button" id="addN" data-add="${p.id}" data-qty="1">${t('p.addN', { n: 1, price: money(p.price) })}</button>
            <button class="ibtn fav big" type="button" data-fav="${p.id}" aria-pressed="${fav}" aria-label="${esc(t(fav ? 'p.unfav' : 'p.fav'))}">${heartSvg}</button>
          </div>
          ${p.allergens?.length ? `<div class="allergens"><h2>${t('p.allergens')}</h2><ul>${p.allergens.map((a) => `<li>${t(`al.${a}`)}</li>`).join('')}</ul></div>` : ''}
        </div>
      </div>
      ${more.length ? `<div class="sec-head" style="margin-top:64px"><h2>${t('p.more')}</h2></div><div class="grid">${more.map(card).join('')}</div>` : ''}
    </div>
  </section>`, { active: '#/menu' });
  let n = 1;
  const upd = () => { $('#qn').textContent = n; const b = $('#addN'); b.dataset.qty = n; b.textContent = t('p.addN', { n, price: money(p.price * n) }); $('#dec').disabled = n <= 1; };
  $('#dec').addEventListener('click', () => { n = Math.max(1, n - 1); upd(); });
  $('#inc').addEventListener('click', () => { n = Math.min(20, n + 1); upd(); });
  upd();
}

/* ───────── cake builder ───────── */
function cakeSvg(c) {
  const size = CAKE.sizes.find((s) => s.id === c.size) || CAKE.sizes[1];
  const sp = CAKE.sponges.find((s) => s.id === c.sponge) || CAKE.sponges[0];
  const fr = CAKE.frostings.find((s) => s.id === c.frosting) || CAKE.frostings[0];
  const w = { s6: 170, s8: 205, s10: 240 }[size.id];
  const x = 160 - w / 2, lh = 34, base = 250;
  let g = '';
  for (let i = 0; i < size.layers; i++) {
    const y = base - (i + 1) * (lh + 6);
    g += `<rect x="${x}" y="${y}" width="${w}" height="${lh}" rx="6" fill="${sp.color}"/>`;
    g += `<rect x="${x - 2}" y="${y + lh}" width="${w + 4}" height="7" rx="3.5" fill="${fr.color}"/>`;
  }
  const top = base - size.layers * (lh + 6);
  const drips = Array.from({ length: Math.floor(w / 22) }, (_, i) => { const dx = x + 8 + i * 22; const h = 10 + ((i * 37) % 17); return `<path d="M${dx} ${top + 4} v${h} a5 5 0 0 0 10 0 v-${h}z" fill="${fr.color}"/>`; }).join('');
  const tops = c.toppings || [];
  let tp = '';
  if (tops.includes('sprinkles')) tp += Array.from({ length: 18 }, (_, i) => `<rect x="${x + 12 + ((i * 53) % (w - 24))}" y="${top - 6 + ((i * 7) % 8)}" width="7" height="2.6" rx="1.3" fill="${['#ff6b9a', '#4cc9f0', '#ffd166', '#7bd389', '#b388ff'][i % 5]}" transform="rotate(${(i * 47) % 180} ${x + 15 + ((i * 53) % (w - 24))} ${top - 4})"/>`).join('');
  if (tops.includes('berries')) tp += Array.from({ length: 7 }, (_, i) => `<circle cx="${x + 20 + i * ((w - 40) / 6)}" cy="${top - 8}" r="8" fill="${i % 2 ? '#4b3fa8' : '#d7263d'}"/><circle cx="${x + 17 + i * ((w - 40) / 6)}" cy="${top - 11}" r="2" fill="#fff" opacity=".6"/>`).join('');
  if (tops.includes('gold')) tp += Array.from({ length: 5 }, (_, i) => `<path d="M${x + 30 + i * ((w - 60) / 4)} ${top - 2} l6 -10 l6 10 z" fill="#e6b422" opacity=".95"/>`).join('');
  if (tops.includes('candles')) tp += [-1, 0, 1].map((k) => `<g class="candle"><rect x="${156 + k * 34}" y="${top - 46}" width="8" height="40" rx="3" fill="${['#7bb6ff', '#ff9ec4', '#ffe08a'][k + 1]}"/><path class="flame" d="M${160 + k * 34} ${top - 66} c-7 10 -6 16 0 17 c6 -1 7 -7 0 -17z" fill="#ffb703"/></g>`).join('');
  const msg = (c.msg || '').trim();
  const plaque = msg ? `<g><rect x="${160 - Math.min(w - 20, 30 + msg.length * 7) / 2}" y="${base - lh - 2}" width="${Math.min(w - 20, 30 + msg.length * 7)}" height="24" rx="12" fill="#fffaf2" stroke="#e8d6c0"/><text x="160" y="${base - lh + 14}" text-anchor="middle" font-size="12" font-weight="700" fill="#7a3f1d" font-family="var(--f-body)" direction="${/[؀-ۿ]/.test(msg) ? 'rtl' : 'ltr'}">${esc(msg.slice(0, 24))}</text></g>` : '';
  return `<svg class="cake-svg" viewBox="0 0 320 300" aria-hidden="true">
    <ellipse cx="160" cy="268" rx="${w / 2 + 40}" ry="16" fill="#000" opacity=".12"/>
    <ellipse cx="160" cy="258" rx="${w / 2 + 34}" ry="14" fill="#f2ece4" stroke="#d8cbbb"/>
    <rect x="${160 - 6}" y="258" width="12" height="18" fill="#d8cbbb"/>
    ${g}
    <rect x="${x - 3}" y="${top - 2}" width="${w + 6}" height="12" rx="6" fill="${fr.color}"/>
    ${drips}${tp}${plaque}
  </svg>`;
}
const cakePrice = (c) => {
  const s = CAKE.sizes.find((x) => x.id === c.size), sp = CAKE.sponges.find((x) => x.id === c.sponge), fr = CAKE.frostings.find((x) => x.id === c.frosting);
  return (s?.price || 0) + (sp?.price || 0) + (fr?.price || 0) + (c.toppings || []).reduce((a, id) => a + (CAKE.toppings.find((x) => x.id === id)?.price || 0), 0) + ((c.msg || '').trim() ? 1 : 0);
};
const dayISO = (d) => new Date(Date.now() + d * 864e5 - new Date().getTimezoneOffset() * 6e4).toISOString().slice(0, 10);

function viewCake() {
  const c = S.get('cakeDraft', { size: 's8', sponge: 'vanilla', frosting: 'cream', toppings: ['berries'], msg: '', date: dayISO(3) });
  const opt = (group, list, type = 'radio') => list.map((o) => `<label class="radio-card"><input type="${type}" name="${group}" value="${o.id}" ${(type === 'radio' ? c[group] === o.id : c[group].includes(o.id)) ? 'checked' : ''}><span>${o.color ? `<i class="sw" style="background:${o.color}"></i>` : ''}<span class="rc-t">${esc(L(o))}</span><small>${o.price ? `+${money(o.price)}` : ''}</small></span></label>`).join('');
  setView(`
  <section class="sec page-top" aria-labelledby="cakeH">
    <div class="wrap">
      <div class="sec-head"><div><span class="kicker">${t('builder.k')}</span><h1 id="cakeH" class="h2">${t('builder.t')}</h1><p>${t('builder.p')}</p></div></div>
      <div class="builder">
        <div class="builder-v card"><figure><div id="cakeV" role="img" aria-label="${esc(t('builder.preview'))}"></div><figcaption id="cakeCap" aria-live="polite"></figcaption></figure></div>
        <form class="builder-f" id="cakeF" novalidate>
          <fieldset><legend>${t('builder.size')}</legend><div class="radio-cards">${opt('size', CAKE.sizes)}</div></fieldset>
          <fieldset><legend>${t('builder.sponge')}</legend><div class="radio-cards">${opt('sponge', CAKE.sponges)}</div></fieldset>
          <fieldset><legend>${t('builder.frosting')}</legend><div class="radio-cards">${opt('frosting', CAKE.frostings)}</div></fieldset>
          <fieldset><legend>${t('builder.toppings')}</legend><div class="radio-cards">${opt('toppings', CAKE.toppings, 'checkbox')}</div></fieldset>
          <div class="field"><label for="msg">${t('builder.msg')} <small>(+${money(1)})</small></label><input class="input" id="msg" name="msg" maxlength="24" placeholder="${esc(t('builder.msgPh'))}" value="${esc(c.msg)}" aria-describedby="msgC"><p class="hint" id="msgC"></p></div>
          <div class="field"><label for="date">${t('builder.date')}</label><input class="input" id="date" name="date" type="date" min="${dayISO(2)}" value="${c.date && c.date >= dayISO(2) ? c.date : dayISO(3)}" aria-describedby="dateH"><p class="hint" id="dateH">${t('builder.dateHint')}</p></div>
          <button class="btn primary lg block" type="submit" id="cakeAdd"></button>
        </form>
      </div>
    </div>
  </section>`, { active: '#/cake' });
  const f = $('#cakeF');
  const read = () => ({ size: f.size.value, sponge: f.sponge.value, frosting: f.frosting.value, toppings: $$('input[name="toppings"]:checked', f).map((i) => i.value), msg: f.msg.value, date: f.date.value });
  const upd = () => {
    const v = read();
    S.set('cakeDraft', v);
    $('#cakeV').innerHTML = cakeSvg(v);
    const s = CAKE.sizes.find((x) => x.id === v.size), sp = CAKE.sponges.find((x) => x.id === v.sponge), fr = CAKE.frostings.find((x) => x.id === v.frosting);
    $('#cakeCap').textContent = `${L(s)} · ${L(sp)} · ${L(fr)}`;
    $('#msgC').textContent = t('builder.msgCount', { n: v.msg.length });
    $('#cakeAdd').textContent = t('builder.add', { price: money(cakePrice(v)) });
  };
  f.addEventListener('input', upd); f.addEventListener('change', upd);
  f.addEventListener('submit', (e) => {
    e.preventDefault();
    const v = read();
    if (!v.date || v.date < dayISO(2)) { fieldError(f.date, t('builder.vDate')); f.date.focus(); return; }
    fieldError(f.date, '');
    st.cart.push({ key: `cake-${Date.now()}`, cake: v, price: cakePrice(v), qty: 1 });
    save(); renderCart(); bump();
    toast(t('cart.added', { name: t('cart.custom') }), { icon: '🎂' });
    openCart();
  });
  upd();
}

/* ───────── cart ───────── */
const lineInfo = (it) => {
  if (it.cake) {
    const sp = CAKE.sponges.find((x) => x.id === it.cake.sponge), s = CAKE.sizes.find((x) => x.id === it.cake.size);
    return { name: `${t('cart.custom')} · ${L(s).split('·')[0].trim()}`, sub: `${L(sp)}${it.cake.msg ? ` · “${it.cake.msg}”` : ''}`, price: it.price, art: `<div class="art sm" style="--a:#fde2e4;--b:#f4a3b8" aria-hidden="true"><span class="em">🎂</span></div>` };
  }
  const p = byId(it.id);
  if (!p) return null;
  return { name: L(p.name), sub: t(`cats.${p.cat}`), price: p.price, art: art(p, 'sm') };
};
function totals(cityId) {
  const lines = st.cart.map((it) => ({ it, info: lineInfo(it) })).filter((x) => x.info);
  const sub = lines.reduce((a, x) => a + x.info.price * x.it.qty, 0);
  const rate = st.promo ? (PROMOS[st.promo] || 0) : 0;
  const disc = +(sub * rate).toFixed(2);
  const tax = +((sub - disc) * TAX).toFixed(2);
  const city = CITIES.find((c) => c.id === cityId) || CITIES[0];
  const del = sub === 0 || sub >= FREE_DELIVERY ? 0 : city.fee;
  return { lines, sub, disc, tax, del, total: +(sub - disc + tax + del).toFixed(2), count: lines.reduce((a, x) => a + x.it.qty, 0) };
}
const sumRows = (T, { promo = true, code = st.promo } = {}) => `
  <dl class="sum">
    <div><dt>${t('cart.sub')}</dt><dd>${money(T.sub)}</dd></div>
    ${T.disc ? `<div class="good"><dt>${t('cart.disc', { code })}</dt><dd>−${money(T.disc)}</dd></div>` : ''}
    <div><dt>${t('cart.tax')}</dt><dd>${money(T.tax)}</dd></div>
    <div><dt>${t('cart.del')}</dt><dd>${T.del ? money(T.del) : `<span class="free">${t('cart.free')}</span>`}</dd></div>
    <div class="tot"><dt>${t('cart.total')}</dt><dd>${money(T.total)}</dd></div>
  </dl>
  ${promo ? `<form class="promo" id="promoF" novalidate><label class="sr-only" for="promo">${t('cart.promo')}</label><input class="input" id="promo" placeholder="${esc(t('cart.promo'))} · ${esc(t('cart.promoHint'))}" value="${esc(st.promo || '')}" autocomplete="off"><button class="btn" type="submit">${t('cart.apply')}</button></form>` : ''}`;

function renderCart() {
  const T = totals(S.get('city', 'amman'));
  const n = $('#cartN');
  n.hidden = T.count === 0; n.textContent = T.count;
  $('#cartBtn').setAttribute('aria-label', t('ui.cartN', { n: T.count }));
  const body = $('#cartBody');
  if (!T.lines.length) {
    body.innerHTML = `<div class="empty"><span class="em" aria-hidden="true">🧺</span><p><b>${t('cart.empty')}</b><br>${t('cart.emptyP')}</p><a class="btn primary" href="#/menu" data-close>${t('cart.browse')}</a></div>`;
    return;
  }
  const left = FREE_DELIVERY - T.sub;
  body.innerHTML = `
    <div class="ship ${left <= 0 ? 'done' : ''}"><p>${left > 0 ? t('cart.freeLeft', { amt: money(left) }) : '🎉 ' + t('cart.freeYes')}</p><div class="bar"><span style="width:${Math.min(100, (T.sub / FREE_DELIVERY) * 100)}%"></span></div></div>
    <ul class="lines">${T.lines.map(({ it, info }) => `
      <li>${info.art}<div class="ln-c"><b>${esc(info.name)}</b><small>${esc(info.sub)}</small>
        <div class="ln-q"><div class="qty sm" role="group" aria-label="${t('p.qty')}: ${esc(info.name)}"><button type="button" class="ibtn" data-dec="${it.key}" aria-label="${t('p.dec')}">−</button><output>${it.qty}</output><button type="button" class="ibtn" data-inc="${it.key}" aria-label="${t('p.inc')}">+</button></div>
        <button class="rm" type="button" data-rm="${it.key}" aria-label="${esc(t('cart.remove', { name: info.name }))}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 7h14M10 7V5h4v2M7 7l1 12h8l1-12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button></div></div>
        <span class="ln-p">${money(info.price * it.qty)}</span></li>`).join('')}
    </ul>
    <div class="cart-f">${sumRows(T)}<a class="btn primary lg block" href="#/checkout" data-close>${t('cart.checkout')} · ${money(T.total)}</a></div>`;
}
function openCart() { renderCart(); const d = $('#cart'); if (!d.open) d.showModal(); }
const bump = () => { const n = $('#cartN'); n.classList.remove('bump'); void n.offsetWidth; n.classList.add('bump'); };

function addToCart(id, qty, from) {
  const p = byId(id); if (!p) return;
  const it = st.cart.find((x) => x.id === id && !x.cake);
  if (it) it.qty = Math.min(99, it.qty + qty); else st.cart.push({ key: id, id, qty });
  save(); renderCart(); bump();
  toast(t('cart.added', { name: L(p.name) }), { icon: p.emoji });
  if (from && !reducedMotion()) fly(from, p.emoji);
  if (from) { const lab = from.querySelector('span') || from; const old = lab.textContent; from.classList.add('done'); lab.textContent = `✓ ${t('p.added')}`; setTimeout(() => { from.classList.remove('done'); if (from.isConnected) lab.textContent = old; }, 1200); }
}
function fly(from, emoji) {
  const a = from.getBoundingClientRect(), b = $('#cartBtn').getBoundingClientRect();
  const el = document.createElement('span'); el.className = 'flyer'; el.textContent = emoji; document.body.append(el);
  el.style.left = `${a.left + a.width / 2}px`; el.style.top = `${a.top}px`;
  el.animate([{ transform: 'translate(-50%,0) scale(1)', opacity: 1 }, { transform: `translate(calc(-50% + ${b.left - a.left - a.width / 2 + b.width / 2}px), ${b.top - a.top}px) scale(.4)`, opacity: .3 }], { duration: 650, easing: 'cubic-bezier(.5,-0.3,.6,1)' }).onfinish = () => el.remove();
}

/* ───────── checkout ───────── */
const luhn = (n) => { const d = n.replace(/\D/g, ''); if (d.length < 13 || d.length > 19) return false; let s = 0; for (let i = 0; i < d.length; i++) { let x = +d[d.length - 1 - i]; if (i % 2) { x *= 2; if (x > 9) x -= 9; } s += x; } return s % 10 === 0; };
function viewCheckout() {
  const T0 = totals(S.get('city', 'amman'));
  if (!T0.lines.length) { setView(`<section class="sec page-top"><div class="wrap empty"><span class="em">🧺</span><p>${t('co.empty')}</p><a class="btn primary" href="#/menu">${t('cart.browse')}</a></div></section>`); return; }
  const d = S.get('addr', {});
  const fld = (id, label, attrs = '', extra = '') => `<div class="field"><label for="${id}">${label}</label><input class="input" id="${id}" name="${id}" value="${esc(d[id] || '')}" ${attrs}>${extra}</div>`;
  setView(`
  <section class="sec page-top" aria-labelledby="coT">
    <div class="wrap">
      <a class="back" href="#/menu"><span class="flip" aria-hidden="true">←</span> ${t('p.back')}</a>
      <div class="sec-head"><div><span class="kicker">${t('co.k')}</span><h1 id="coT" class="h2">${t('co.t')}</h1></div></div>
      <div class="co">
        <form class="co-f" id="coF" novalidate>
          <div id="errBox" tabindex="-1"></div>
          <fieldset class="card pad"><legend><span class="step">1</span>${t('co.step1')}</legend>
            <div class="row2">
              ${fld('name', t('co.name'), 'autocomplete="name" required')}
              ${fld('phone', t('co.phone'), 'type="tel" inputmode="tel" autocomplete="tel" dir="ltr" required aria-describedby="phoneH"', `<p class="hint" id="phoneH">${t('co.phoneHint')}</p>`)}
            </div>
            <div class="row2">
              <div class="field"><label for="city">${t('co.city')}</label><select class="select" id="city" name="city" required><option value="">${t('co.cityPick')}</option>${CITIES.map((c) => `<option value="${c.id}" ${(d.city || S.get('city', '')) === c.id ? 'selected' : ''}>${L(c)} · ${money(c.fee)}</option>`).join('')}</select></div>
              ${fld('area', t('co.area'), 'autocomplete="address-level3" required')}
            </div>
            <div class="row3">
              ${fld('road', t('co.road'), 'autocomplete="address-line1" required')}
              ${fld('building', t('co.building'), 'inputmode="numeric" required')}
              ${fld('floor', t('co.floor'), '')}
            </div>
            <div class="field"><label for="notes">${t('co.notes')}</label><textarea class="textarea" id="notes" name="notes" rows="2">${esc(d.notes || '')}</textarea></div>
          </fieldset>
          <fieldset class="card pad"><legend><span class="step">2</span>${t('co.step2')}</legend>
            <div class="radio-cards">${['asap', 'morning', 'noon', 'evening'].map((s, i) => `<label class="radio-card"><input type="radio" name="slot" value="${s}" ${i === 0 ? 'checked' : ''}><span>${['⚡', '🌅', '☀️', '🌙'][i]} ${t(`co.${s}`)}</span></label>`).join('')}</div>
          </fieldset>
          <fieldset class="card pad"><legend><span class="step">3</span>${t('co.step3')}</legend>
            <div class="radio-cards"><label class="radio-card"><input type="radio" name="pay" value="cash" checked><span>💵 ${t('co.cash')}</span></label><label class="radio-card"><input type="radio" name="pay" value="card"><span>💳 ${t('co.card')}</span></label></div>
            <div id="cardBox" class="card-box" hidden>
              <p class="demo-note">ℹ️ ${t('co.demo')}</p>
              ${fld('cardName', t('co.cardName'), 'autocomplete="off"')}
              ${fld('cardNo', t('co.cardNo'), 'inputmode="numeric" autocomplete="off" dir="ltr" maxlength="23" placeholder="4242 4242 4242 4242"')}
              <div class="row2">${fld('exp', t('co.exp'), 'inputmode="numeric" autocomplete="off" dir="ltr" maxlength="5" placeholder="MM/YY"')}${fld('cvc', t('co.cvc'), 'inputmode="numeric" autocomplete="off" dir="ltr" maxlength="4" placeholder="123"')}</div>
            </div>
          </fieldset>
          <button class="btn primary lg block" type="submit" id="placeB"></button>
        </form>
        <aside class="co-s card pad" aria-labelledby="sumT">
          <div class="row-sb"><h2 id="sumT">${t('co.summary')}</h2><button class="btn ghost sm" type="button" id="editCart">${t('co.edit')}</button></div>
          <div id="coSum"></div>
        </aside>
      </div>
    </div>
  </section>`, { active: '' });

  const f = $('#coF');
  const sum = () => {
    const T = totals(f.city.value || 'amman');
    $('#coSum').innerHTML = `<ul class="mini">${T.lines.map(({ it, info }) => `<li>${info.art}<span><b>${esc(info.name)}</b><small>× ${it.qty}</small></span><span>${money(info.price * it.qty)}</span></li>`).join('')}</ul>${sumRows(T)}`;
    $('#placeB').textContent = t('co.place', { total: money(T.total) });
  };
  sum();
  $('#editCart').addEventListener('click', openCart);
  f.addEventListener('change', (e) => {
    if (e.target.name === 'pay') $('#cardBox').hidden = f.pay.value !== 'card';
    if (e.target.name === 'city') { S.set('city', f.city.value); sum(); renderCart(); }
  });
  // input masks
  f.cardNo.addEventListener('input', () => { f.cardNo.value = f.cardNo.value.replace(/\D/g, '').slice(0, 19).replace(/(.{4})/g, '$1 ').trim(); });
  f.exp.addEventListener('input', (e) => { let v = f.exp.value.replace(/\D/g, '').slice(0, 4); if (v.length > 2) v = `${v.slice(0, 2)}/${v.slice(2)}`; if (e.inputType !== 'deleteContentBackward') f.exp.value = v; });
  f.cvc.addEventListener('input', () => { f.cvc.value = f.cvc.value.replace(/\D/g, '').slice(0, 3); });

  const rules = {
    name: (v) => v.trim().length >= 3 || t('v.name'),
    phone: (v) => /^(\+?962|0)7[789]\d{7}$/.test(v.replace(/[\s-]/g, '')) || t('v.phone'),
    city: (v) => !!v || t('v.city'),
    area: (v) => v.trim().length >= 2 || t('v.area'),
    road: (v) => v.trim().length >= 2 || t('v.road'),
    building: (v) => /^\d{1,4}[a-zA-Z]?$/.test(v.trim()) || t('v.building'),
    cardName: (v) => f.pay.value !== 'card' || v.trim().length >= 3 || t('v.cardName'),
    cardNo: (v) => f.pay.value !== 'card' || luhn(v) || t('v.cardNo'),
    exp: (v) => { if (f.pay.value !== 'card') return true; const m = v.match(/^(0[1-9]|1[0-2])\/(\d\d)$/); if (!m) return t('v.exp'); const end = new Date(2000 + +m[2], +m[1], 1); return end > new Date() || t('v.exp'); },
    cvc: (v) => f.pay.value !== 'card' || /^\d{3}$/.test(v) || t('v.cvc'),
  };
  const check = (name) => { const r = rules[name](f[name].value); fieldError(f[name], r === true ? '' : r); return r === true; };
  // fix-as-you-type: errors clear on input; new errors only appear on blur of a filled field
  Object.keys(rules).forEach((k) => {
    const ev = f[k].tagName === 'SELECT' ? 'change' : 'input';
    f[k].addEventListener(ev, () => { if (f[k].getAttribute('aria-invalid')) check(k); });
    f[k].addEventListener('blur', () => { if (f[k].value && !f[k].getAttribute('aria-invalid')) check(k); });
  });
  f.addEventListener('submit', (e) => {
    e.preventDefault();
    const bad = Object.keys(rules).filter((k) => !check(k));
    const box = $('#errBox');
    if (bad.length) {
      box.className = 'err-summary';
      box.setAttribute('role', 'alert');
      box.innerHTML = `<h3>${t('co.errT', { n: bad.length })}</h3><ul>${bad.map((k) => `<li><a href="#${k}" data-focus="${k}">${esc(rules[k](f[k].value))}</a></li>`).join('')}</ul>`;
      box.focus();
      box.querySelectorAll('[data-focus]').forEach((a) => a.addEventListener('click', (ev) => { ev.preventDefault(); f[a.dataset.focus].focus(); }));
      return;
    }
    box.className = ''; box.innerHTML = ''; box.removeAttribute('role');
    const addr = { name: f.name.value.trim(), phone: f.phone.value.trim(), city: f.city.value, area: f.area.value.trim(), road: f.road.value.trim(), building: f.building.value.trim(), floor: f.floor.value.trim(), notes: f.notes.value.trim() };
    S.set('addr', addr);
    const T = totals(addr.city);
    const order = {
      id: `GD-${String(Date.now()).slice(-6)}`, at: Date.now(), addr, slot: f.slot.value, pay: f.pay.value,
      last4: f.pay.value === 'card' ? f.cardNo.value.replace(/\D/g, '').slice(-4) : null,
      items: T.lines.map(({ it, info }) => ({ name: info.name, qty: it.qty, price: info.price, id: it.id || null, cake: it.cake || null })),
      sub: T.sub, disc: T.disc, tax: T.tax, del: T.del, total: T.total, promo: st.promo,
    };
    st.orders.unshift(order); st.cart = []; st.promo = null; save(); renderCart();
    location.hash = `#/order/${order.id}`;
  });
}

/* ───────── order confirmation + tracking ───────── */
const STEPS = [0, 8, 25, 60]; // seconds on the demo clock
function viewOrder(id) {
  const o = st.orders.find((x) => x.id === id);
  if (!o) { setView(`<section class="sec page-top"><div class="wrap empty"><span class="em">🧾</span><p>${t('ok.notFound')}</p><a class="btn primary" href="#/orders">${t('nav.orders')}</a></div></section>`, { active: '#/orders' }); return; }
  const city = CITIES.find((c) => c.id === o.addr.city) || CITIES[0];
  setView(`
  <section class="sec page-top" aria-labelledby="okT">
    <div class="wrap ok">
      <div class="ok-hero card">
        <div class="ok-badge" aria-hidden="true"><svg viewBox="0 0 52 52"><circle cx="26" cy="26" r="24" fill="none" stroke="currentColor" stroke-width="3"/><path d="M15 27l7 7 15-16" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
        <span class="kicker">${t('ok.k')}</span>
        <h1 id="okT" class="h2">${t('ok.t', { name: esc(o.addr.name.split(' ')[0]) })}</h1>
        <p>${t('ok.p', { id: `<b class="ltr">${o.id}</b>`, eta: L(city.eta) })}</p>
      </div>
      <div class="ok-g">
        <div class="card pad">
          <h2>${t('ok.track')}</h2>
          <ol class="track" id="track">${['s1', 's2', 's3', 's4'].map((s, i) => `<li data-i="${i}"><span class="tdot" aria-hidden="true">${['🧾', '🔥', '🛵', '🏡'][i]}</span><span class="tl">${t(`ok.${s}`)}</span><span class="tt"></span></li>`).join('')}</ol>
          <p class="hint">${t('ok.demoNote')}</p>
        </div>
        <div class="card pad">
          <h2>${t('co.summary')}</h2>
          <ul class="mini">${o.items.map((it) => `<li><span class="mini-q">${it.qty}×</span><span><b>${esc(it.name)}</b></span><span>${money(it.price * it.qty)}</span></li>`).join('')}</ul>
          ${sumRows(o, { promo: false, code: o.promo })}
          <dl class="kv">
            <div><dt>${t('ok.to')}</dt><dd>${esc(o.addr.name)}<br>${esc([o.addr.road, `#${o.addr.building}`, o.addr.floor].filter(Boolean).join(', '))}<br>${esc(o.addr.area)}, ${esc(L(city))}<br><span class="ltr">${esc(o.addr.phone)}</span></dd></div>
            <div><dt>${t('ok.pay')}</dt><dd>${o.pay === 'card' ? `💳 ${t('ok.cardEnding', { n: o.last4 })}` : `💵 ${t('co.cash')}`}</dd></div>
          </dl>
          <div class="row-btns"><button class="btn primary" type="button" id="again">${t('ok.again')}</button><a class="btn" href="#/">${t('ok.home')}</a></div>
        </div>
      </div>
    </div>
  </section>`, { active: '#/orders' });
  const tick = () => {
    const sec = (Date.now() - o.at) / 1000;
    $$('#track li').forEach((li) => {
      const i = +li.dataset.i, done = sec >= STEPS[i], cur = done && (i === 3 || sec < STEPS[i + 1]);
      li.classList.toggle('done', done); li.classList.toggle('cur', cur);
      if (cur) li.setAttribute('aria-current', 'step'); else li.removeAttribute('aria-current');
      li.querySelector('.tt').textContent = done ? new Date(o.at + [0, 10, 25, 45][i] * 60000).toLocaleTimeString(lang() === 'ar' ? 'ar-JO-u-nu-latn' : 'en-GB', { hour: '2-digit', minute: '2-digit' }) : '';
    });
  };
  tick();
  const iv = setInterval(tick, 1000);
  leave = () => clearInterval(iv);
  $('#again').addEventListener('click', () => {
    o.items.forEach((it) => { if (it.id && byId(it.id)) { const ex = st.cart.find((x) => x.id === it.id && !x.cake); if (ex) ex.qty += it.qty; else st.cart.push({ key: it.id, id: it.id, qty: it.qty }); } else if (it.cake) st.cart.push({ key: `cake-${Date.now()}`, cake: it.cake, price: it.price, qty: it.qty }); });
    save(); openCart(); bump();
  });
}

function viewOrders() {
  setView(`
  <section class="sec page-top" aria-labelledby="ordT">
    <div class="wrap narrow">
      <div class="sec-head"><div><span class="kicker">${t('orders.k')}</span><h1 id="ordT" class="h2">${t('orders.t')}</h1></div></div>
      ${st.orders.length ? `<ul class="orders">${st.orders.map((o) => `<li class="card"><div><b class="ltr">${o.id}</b><small>${new Date(o.at).toLocaleString(lang() === 'ar' ? 'ar-JO-u-nu-latn' : 'en-GB', { dateStyle: 'medium', timeStyle: 'short' })} · ${t('orders.items', { n: o.items.reduce((a, i) => a + i.qty, 0) })}</small></div><span class="price">${money(o.total)}</span><a class="btn sm" href="#/order/${o.id}">${t('orders.view')}</a></li>`).join('')}</ul>`
        : `<div class="empty card"><span class="em" aria-hidden="true">🧾</span><p>${t('orders.none')}</p><a class="btn primary" href="#/menu">${t('cart.browse')}</a></div>`}
    </div>
  </section>`, { active: '#/orders' });
}

function viewAbout() {
  setView(`
  <section class="sec page-top" aria-labelledby="abT">
    <div class="wrap">
      <div class="about">
        <div><span class="kicker">${t('about.k')}</span><h1 id="abT" class="h2">${t('about.t')}</h1><p class="lead">${t('about.p')}</p><p>${t('story.p')}</p></div>
        <div class="about-art card" aria-hidden="true">${HERO_ART}</div>
      </div>
      <div class="about-g">
        <div class="card pad"><h2>🕖 ${t('about.hours')}</h2><p>${t('about.h1')}<br>${t('about.h2')}</p></div>
        <div class="card pad"><h2>🛵 ${t('about.zones')}</h2><ul class="zones">${CITIES.map((c) => `<li><b>${L(c)}</b><span>${money(c.fee)} · ${L(c.eta)}</span></li>`).join('')}</ul><p class="hint">${t('cart.freeLeft', { amt: money(FREE_DELIVERY) }).replace(/^\S+\s/, '')}</p></div>
        <div class="card pad"><h2>👩‍💻 ${t('about.team')}</h2><p>${t('about.teamP')}</p></div>
        <div class="card pad"><h2>📍 ${t('about.contact')}</h2><p>${t('about.address')}<br><span class="ltr">+962 6 461 2020</span><br><span class="ltr">hello@goodday.example</span></p></div>
      </div>
    </div>
  </section>`, { active: '#/about' });
}

function viewAdmin() {
  const emojis = ['🍞', '🥐', '🥖', '🥯', '🧁', '🍰', '🍪', '🥧', '🍩', '🫓'];
  setView(`
  <section class="sec page-top" aria-labelledby="adT">
    <div class="wrap narrow">
      <div class="sec-head"><div><span class="kicker">${t('foot.kitchen')}</span><h1 id="adT" class="h2">${t('admin.t')}</h1><p>${t('admin.p')}</p></div></div>
      <form class="card pad admin" id="adF" novalidate>
        <div class="row2"><div class="field"><label for="aName">${t('admin.name')}</label><input class="input" id="aName" required></div>
        <div class="field"><label for="aPrice">${t('admin.price')}</label><input class="input" id="aPrice" type="number" step="0.25" min="0.25" max="99" inputmode="decimal" dir="ltr" required></div></div>
        <div class="row2"><div class="field"><label for="aCat">${t('admin.cat')}</label><select class="select" id="aCat">${CATS.map((c) => `<option value="${c.id}">${L(c)}</option>`).join('')}</select></div>
        <fieldset class="field"><legend class="lbl">${t('admin.emoji')}</legend><div class="emoji-pick">${emojis.map((e, i) => `<label><input type="radio" name="aEm" value="${e}" ${i === 0 ? 'checked' : ''}><span>${e}</span></label>`).join('')}</div></fieldset></div>
        <div class="field"><label for="aDesc">${t('admin.desc')}</label><textarea class="textarea" id="aDesc" rows="2"></textarea></div>
        <button class="btn primary" type="submit">${t('admin.add')}</button>
      </form>
      <h2 style="margin-top:40px">${t('admin.mine')}</h2>
      <ul class="orders" id="mine"></ul>
    </div>
  </section>`, { active: '' });
  const list = () => { $('#mine').innerHTML = st.mine.length ? st.mine.map((p) => `<li class="card">${art(p, 'sm')}<div><b>${esc(L(p.name))}</b><small>${t(`cats.${p.cat}`)}</small></div><span class="price">${money(p.price)}</span><button class="btn sm" type="button" data-del="${p.id}" aria-label="${esc(t('admin.del', { name: L(p.name) }))}">🗑</button></li>`).join('') : `<li class="empty">—</li>`; };
  list();
  $('#mine').addEventListener('click', (e) => { const b = e.target.closest('[data-del]'); if (!b) return; st.mine = st.mine.filter((p) => p.id !== b.dataset.del); st.cart = st.cart.filter((x) => x.id !== b.dataset.del); save(); renderCart(); list(); });
  $('#adF').addEventListener('submit', (e) => {
    e.preventDefault();
    const n = $('#aName'), pr = $('#aPrice');
    const okN = n.value.trim().length >= 2, price = parseFloat(pr.value), okP = price >= 0.25 && price <= 99;
    fieldError(n, okN ? '' : t('admin.vName')); fieldError(pr, okP ? '' : t('admin.vPrice'));
    if (!okN) { n.focus(); return; } if (!okP) { pr.focus(); return; }
    const name = n.value.trim(), desc = $('#aDesc').value.trim() || '—';
    const tones = [['#f6d8a8', '#e7a85b'], ['#f8c9d4', '#d9577a'], ['#dfeec9', '#86a85a'], ['#d9dcf7', '#6a6fc9']];
    const p = { id: `mine-${Date.now()}`, cat: $('#aCat').value, emoji: $('input[name="aEm"]:checked').value, tone: tones[st.mine.length % 4], price: Math.round(price * 100) / 100, rating: 5, reviews: 0, tags: ['new'], allergens: [], name: { en: name, ar: name }, desc: { en: desc, ar: desc } };
    st.mine.push(p); save(); list(); e.target.reset();
    toast(t('admin.added', { name }), { icon: p.emoji });
  });
}

/* ───────── global events ───────── */
document.addEventListener('click', (e) => {
  const add = e.target.closest('[data-add]');
  if (add) { addToCart(add.dataset.add, +(add.dataset.qty || 1), add); return; }
  const fav = e.target.closest('[data-fav]');
  if (fav) {
    const id = fav.dataset.fav, on = !st.favs.has(id);
    on ? st.favs.add(id) : st.favs.delete(id); save();
    $$(`[data-fav="${id}"]`).forEach((b) => { b.setAttribute('aria-pressed', on); b.classList.remove('pop'); void b.offsetWidth; if (on) b.classList.add('pop'); });
    toast(`${on ? '♥' : '♡'} ${L(byId(id).name)}`, { icon: on ? '♥' : '·' });
    if (location.hash === '#/menu/fav') route();
    return;
  }
  const inc = e.target.closest('[data-inc]'), dec = e.target.closest('[data-dec]'), rm = e.target.closest('[data-rm]');
  if (inc || dec || rm) {
    const key = (inc || dec || rm).dataset.inc || (inc || dec || rm).dataset.dec || (inc || dec || rm).dataset.rm;
    const it = st.cart.find((x) => x.key === key); if (!it) return;
    const name = lineInfo(it)?.name;
    if (inc) it.qty = Math.min(99, it.qty + 1);
    if (dec) it.qty -= 1;
    if (rm || it.qty <= 0) { st.cart = st.cart.filter((x) => x !== it); toast(t('cart.removed', { name }), { icon: '−' }); }
    save(); renderCart();
    // keep focus inside the drawer
    const again = $(`#cartBody [data-${inc ? 'inc' : 'dec'}="${key}"]`) || $('#cartBody .btn, #cartBody [data-close]') || $('#cart [data-close]');
    again?.focus();
    if (location.hash === '#/checkout') route();
    return;
  }
  if (e.target.closest('#cartBtn')) { openCart(); return; }
  const close = e.target.closest('[data-close]');
  if (close) close.closest('dialog')?.close();
});
document.addEventListener('submit', (e) => {
  if (e.target.id !== 'promoF') return;
  e.preventDefault();
  const code = $('#promo', e.target).value.trim().toUpperCase();
  if (!code) { st.promo = null; } else if (PROMOS[code]) { st.promo = code; toast(t('cart.promoOk', { code }), { icon: '🏷️' }); } else { toast(t('cart.promoBad'), { icon: '!', tone: 'bad' }); return; }
  save(); renderCart();
  if (location.hash === '#/checkout') route();
});

const route = router([
  [/^\/$/, viewHome],
  [/^\/menu\/?$/, () => viewMenu('all')],
  [/^\/menu\/(\w+)$/, (c) => viewMenu(c)],
  [/^\/p\/([\w-]+)$/, viewProduct],
  [/^\/cake$/, viewCake],
  [/^\/checkout$/, viewCheckout],
  [/^\/order\/([\w-]+)$/, viewOrder],
  [/^\/orders$/, viewOrders],
  [/^\/about$/, viewAbout],
  [/^\/admin$/, viewAdmin],
], () => viewHome());

onLang(() => { route(); renderCart(); });
renderCart();
route();
// first paint should not steal focus
if (!location.hash || location.hash === '#/') main.blur();
applyI18n();
