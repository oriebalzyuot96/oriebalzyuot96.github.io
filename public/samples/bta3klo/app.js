/* Bta3 Kolo (بتاع كلّو) · 2026 rebuild of the 2020 RBK team project (TSNO-Group3 / bta3Klo).
   Search pros by service or name, filter, view profiles, book, save favourites and join as a pro. Data in localStorage. */
import { $, $$, esc, t, L, lang, onLang, boot, store, toast, money, router, reveal, fieldError, applyI18n } from './core.js';
import { DICT } from './i18n.js';
import { SERVICES, CITIES, PROS, REVIEWS } from './data.js';

boot({ ns: 'bta3klo', dict: DICT });
const S = store('bta3klo');
const st = { saved: new Set(S.get('saved', [])), bookings: S.get('bookings', []), mine: S.get('mine', []), draft: S.get('joinDraft', {}) };
const save = () => { S.set('saved', [...st.saved]); S.set('bookings', st.bookings); S.set('mine', st.mine); };
const all = () => [...st.mine, ...PROS];
const byId = (id) => all().find((p) => p.id === id);
const svc = (id) => SERVICES.find((s) => s.id === id);
const city = (id) => CITIES.find((c) => c.id === id);
const main = $('#main');
const jd = (n) => money(n);

const initials = (p) => L(p.name).split(/\s+/).map((w) => w[0]).slice(0, 2).join('');
const hue = (id) => [...id].reduce((a, c) => (a * 31 + c.charCodeAt(0)) % 3600, 7) % 360;
const avatar = (p, size = '') => `<span class="av ${size}" style="--h:${hue(p.id)}" aria-hidden="true">${esc(initials(p))}<i class="av-s">${svc(p.service)?.icon || ''}</i></span>`;
const stars = (r) => `<span class="rate" aria-label="${r.toFixed(1)} / 5"><span aria-hidden="true">★</span> ${r.toFixed(1)}</span>`;
const heart = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.5s-7.5-4.6-9.3-9.4C1.4 7.6 3.7 4 7.3 4c2 0 3.6 1.1 4.7 2.7C13.1 5.1 14.7 4 16.7 4c3.6 0 5.9 3.6 4.6 7.1-1.8 4.8-9.3 9.4-9.3 9.4z"/></svg>';

function proCard(p) {
  const sv = st.saved.has(p.id);
  return `<article class="pro rv">
    <div class="pro-h">${avatar(p)}
      <div class="pro-id"><h3><a href="#/pro/${p.id}">${esc(L(p.name))}</a>${p.verified ? `<span class="vf" title="${esc(t('pro.verified'))}" aria-label="${esc(t('pro.verified'))}">✓</span>` : ''}</h3>
        <p>${esc(L(svc(p.service)))} · ${esc(L(city(p.city)))}</p></div>
      <button class="fav" type="button" data-save="${p.id}" aria-pressed="${sv}" aria-label="${esc(t(sv ? 'pro.unsave' : 'pro.save', { name: L(p.name) }))}">${heart}</button>
    </div>
    <p class="pro-bio">${esc(L(p.bio))}</p>
    <div class="pro-m">${stars(p.rating)}<span>${t('pro.jobs', { n: p.jobs })}</span><span>${t('pro.years', { n: p.years })}</span></div>
    <div class="pro-f">
      <span class="avail ${p.avail ? 'on' : ''}">${t(p.avail ? 'pro.availNow' : 'pro.busy')}</span>
      <span class="pr"><b>${jd(p.rate)}</b> <small>${t('pro.perHour')}</small></span>
    </div>
    <div class="pro-a"><a class="btn sm" href="#/pro/${p.id}">${t('pro.view')}</a><a class="btn primary sm" href="#/pro/${p.id}?book=1">${t('pro.book')}</a></div>
  </article>`;
}

function setView(html, active, focus = true) {
  main.innerHTML = html;
  $$('.nav a').forEach((a) => { if (a.getAttribute('href') === active) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); });
  if (focus) { main.focus({ preventScroll: true }); scrollTo({ top: 0, behavior: 'instant' }); }
  reveal(main);
}

/* ───────── home ───────── */
const shuffle = (a) => a.map((v) => [Math.random(), v]).sort((x, y) => x[0] - y[0]).map((x) => x[1]);
function viewHome() {
  const cityOpts = `<option value="">${t('hero.anyCity')}</option>${CITIES.map((c) => `<option value="${c.id}">${L(c)}</option>`).join('')}`;
  setView(`
  <section class="hero">
    <div class="wrap hero-g">
      <div>
        <span class="kicker">🧰 ${t('hero.k')}</span>
        <h1>${t('hero.t')}</h1>
        <p class="lead">${t('hero.p')}</p>
        <form class="hsearch" id="hs" role="search">
          <div class="hs-f"><label for="hq">${t('hero.what')}</label><input id="hq" list="svcList" placeholder="${esc(t('hero.whatPh'))}" autocomplete="off"><datalist id="svcList">${SERVICES.map((s) => `<option value="${esc(L(s))}">`).join('')}</datalist></div>
          <div class="hs-f"><label for="hc">${t('hero.where')}</label><select id="hc">${cityOpts}</select></div>
          <button class="btn primary lg" type="submit"><svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" stroke-width="2.4"/><path d="M20 20l-3.5-3.5" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>${t('hero.go')}</button>
        </form>
        <dl class="stats"><div><dt>${t('hero.s1')}</dt><dd>${all().length * 40}+</dd></div><div><dt>${t('hero.s2')}</dt><dd>12k</dd></div><div><dt>${t('hero.s3')}</dt><dd>4.8★</dd></div></dl>
      </div>
      <div class="hero-v" aria-hidden="true">
        <div class="blob"></div>
        <div class="tool t1">🔧</div><div class="tool t2">💡</div><div class="tool t3">🪚</div><div class="tool t4">🚰</div>
        <div class="mini-card mc1">${avatar(PROS[3])}<div><b>${esc(L(PROS[3].name))}</b><small>${esc(L(svc('plumber')))} · ★ 4.9</small></div></div>
        <div class="mini-card mc2"><span class="dot-ok"></span><div><b>${t('bks.status.confirmed')}</b><small>${esc(L(svc('electrician')))} · 10:30</small></div></div>
      </div>
    </div>
  </section>
  <section class="sec" aria-labelledby="svcT"><div class="wrap">
    <div class="sec-head"><div><span class="kicker">${t('svc.k')}</span><h2 id="svcT">${t('svc.t')}</h2></div></div>
    <div class="svcs">${SERVICES.map((s) => `<a class="svc rv" href="#/browse?s=${s.id}"><span class="svc-i" aria-hidden="true">${s.icon}</span><b>${L(s)}</b><small>${L(s.hint)}</small><span class="svc-n">${t('svc.n', { n: all().filter((p) => p.service === s.id).length })}</span></a>`).join('')}</div>
  </div></section>
  <section class="sec tint" aria-labelledby="featT"><div class="wrap">
    <div class="sec-head"><div><span class="kicker">${t('feat.k')}</span><h2 id="featT">${t('feat.t')}</h2></div><button class="btn" type="button" id="shuf">🎲 ${t('feat.shuffle')}</button></div>
    <div class="pros" id="feat"></div>
  </div></section>
  <section class="sec" aria-labelledby="howT"><div class="wrap">
    <div class="sec-head"><div><span class="kicker">${t('how.k')}</span><h2 id="howT">${t('how.t')}</h2></div></div>
    <ol class="how">${[1, 2, 3].map((n) => `<li class="rv"><span class="how-n">${n}</span><h3>${t(`how.${n}t`)}</h3><p>${t(`how.${n}p`)}</p></li>`).join('')}</ol>
    <figure class="quote rv"><blockquote>${t('quote.t')}</blockquote><figcaption>${t('quote.by')}</figcaption></figure>
  </div></section>
  <section class="sec" aria-labelledby="joinT"><div class="wrap"><div class="join-cta rv"><div><h2 id="joinT">${t('join.cta.t')}</h2><p>${t('join.cta.p')}</p></div><a class="btn lg" href="#/join">${t('join.cta.b')}</a></div></div></section>`, '#/', false);
  const feat = () => { $('#feat').innerHTML = shuffle(all().filter((p) => p.rating >= 4.7)).slice(0, 3).map(proCard).join(''); reveal($('#feat')); };
  feat();
  $('#shuf').addEventListener('click', () => { feat(); toast(t('feat.shuffled'), { icon: '🎲' }); });
  $('#hs').addEventListener('submit', (e) => {
    e.preventDefault();
    const q = $('#hq').value.trim(), c = $('#hc').value;
    const match = SERVICES.find((s) => [s.en, s.ar, s.id].some((x) => x.toLowerCase() === q.toLowerCase()));
    const ps = new URLSearchParams(); if (match) ps.set('s', match.id); else if (q) ps.set('q', q); if (c) ps.set('c', c);
    location.hash = `#/browse${ps.toString() ? `?${ps}` : ''}`;
  });
}

/* ───────── browse ───────── */
function viewBrowse(qs = '') {
  const ps = new URLSearchParams(qs);
  const f = { s: ps.get('s') || '', c: ps.get('c') || '', q: ps.get('q') || '', max: +(ps.get('max') || 60), min: +(ps.get('min') || 0), av: ps.get('av') === '1', vf: ps.get('vf') === '1', sort: ps.get('sort') || 'best' };
  setView(`
  <section class="sec page-top" aria-labelledby="brT"><div class="wrap">
    <div class="sec-head"><div><span class="kicker">${t('br.k')}</span><h1 id="brT" class="h2">${f.s ? esc(L(svc(f.s))) : t('br.t')}</h1></div></div>
    <div class="browse">
      <button class="btn filt-t" type="button" id="ft" aria-expanded="false" aria-controls="filters">⚙️ ${t('br.showFilters')}</button>
      <form class="filters card" id="filters" aria-label="${esc(t('br.filters'))}">
        <div class="field"><label for="fq">${t('hero.what')}</label><input class="input" id="fq" name="q" type="search" value="${esc(f.q)}" placeholder="${esc(t('hero.whatPh'))}"></div>
        <div class="field"><label for="fs">${t('br.service')}</label><select class="select" id="fs" name="s"><option value="">${t('br.allSvc')}</option>${SERVICES.map((s) => `<option value="${s.id}" ${f.s === s.id ? 'selected' : ''}>${s.icon} ${L(s)}</option>`).join('')}</select></div>
        <div class="field"><label for="fc">${t('br.city')}</label><select class="select" id="fc" name="c"><option value="">${t('hero.anyCity')}</option>${CITIES.map((c) => `<option value="${c.id}" ${f.c === c.id ? 'selected' : ''}>${L(c)}</option>`).join('')}</select></div>
        <div class="field"><label for="fmax">${t('br.maxRate')}: <output id="fmaxo">${t('br.upTo', { v: jd(f.max) })}</output></label><input class="range" id="fmax" name="max" type="range" min="5" max="60" step="1" value="${f.max}"></div>
        <fieldset class="field"><legend class="lbl">${t('br.minRating')}</legend><div class="seg">${[0, 4.5, 4.7, 4.9].map((v) => `<label><input type="radio" name="min" value="${v}" ${f.min === v ? 'checked' : ''}><span>${v ? `${v}★` : t('br.any')}</span></label>`).join('')}</div></fieldset>
        <label class="switch"><input type="checkbox" name="av" ${f.av ? 'checked' : ''}><span class="sw" aria-hidden="true"></span>${t('br.avail')}</label>
        <label class="switch"><input type="checkbox" name="vf" ${f.vf ? 'checked' : ''}><span class="sw" aria-hidden="true"></span>${t('br.verified')}</label>
        <button class="btn sm" type="button" id="freset">${t('br.reset')}</button>
      </form>
      <div class="results">
        <div class="res-h"><p id="cnt" aria-live="polite"></p><div class="field sortf"><label for="fsort" class="sr-only">${t('br.sort')}</label><select class="select" id="fsort">${['best', 'rating', 'price', 'jobs'].map((s) => `<option value="${s}" ${f.sort === s ? 'selected' : ''}>${t('br.sort')}: ${t(`sort.${s}`)}</option>`).join('')}</select></div></div>
        <div class="chips svc-chips"><a class="chip" href="#/browse" aria-pressed="${!f.s}">${t('br.allSvc')}</a>${SERVICES.map((s) => `<a class="chip" href="#/browse?s=${s.id}${f.c ? `&c=${f.c}` : ''}" aria-pressed="${f.s === s.id}">${s.icon} ${L(s)}</a>`).join('')}</div>
        <div class="pros" id="list"></div>
      </div>
    </div>
  </div></section>`, '#/browse');
  const form = $('#filters');
  const draw = () => {
    const q = f.q.trim().toLowerCase();
    let list = all().filter((p) => (!f.s || p.service === f.s) && (!f.c || p.city === f.c) && p.rate <= f.max && p.rating >= f.min && (!f.av || p.avail) && (!f.vf || p.verified)
      && (!q || [p.name.en, p.name.ar, L(svc(p.service)), svc(p.service).en, ...(p.skills?.en || []), ...(p.skills?.ar || [])].join(' ').toLowerCase().includes(q)));
    const k = { rating: (a, b) => b.rating - a.rating, price: (a, b) => a.rate - b.rate, jobs: (a, b) => b.jobs - a.jobs, best: (a, b) => (b.rating * 20 + b.avail * 6 - b.rate * 0.4) - (a.rating * 20 + a.avail * 6 - a.rate * 0.4) }[f.sort];
    list.sort(k);
    $('#cnt').textContent = t('br.count', { n: list.length });
    $('#list').innerHTML = list.length ? list.map(proCard).join('') : `<div class="empty card" style="grid-column:1/-1"><span class="em" aria-hidden="true">🔍</span><p>${t('br.none')}</p><button class="btn primary" type="button" id="r2">${t('br.reset')}</button></div>`;
    $('#r2')?.addEventListener('click', reset);
    reveal($('#list'));
    const ps2 = new URLSearchParams(); Object.entries({ s: f.s, c: f.c, q: f.q, max: f.max < 60 ? f.max : '', min: f.min || '', av: f.av ? 1 : '', vf: f.vf ? 1 : '', sort: f.sort !== 'best' ? f.sort : '' }).forEach(([a, b]) => b !== '' && ps2.set(a, b));
    history.replaceState(null, '', `#/browse${ps2.toString() ? `?${ps2}` : ''}`);
  };
  const reset = () => { Object.assign(f, { s: '', c: '', q: '', max: 60, min: 0, av: false, vf: false, sort: 'best' }); viewBrowse(''); };
  form.addEventListener('input', () => {
    f.q = form.q.value; f.s = form.s.value; f.c = form.c.value; f.max = +form.max.value; f.min = +form.querySelector('[name="min"]:checked').value; f.av = form.av.checked; f.vf = form.vf.checked;
    $('#fmaxo').textContent = t('br.upTo', { v: jd(f.max) });
    $$('.svc-chips .chip').forEach((c, i) => c.setAttribute('aria-pressed', String(i === 0 ? !f.s : SERVICES[i - 1].id === f.s)));
    draw();
  });
  form.addEventListener('submit', (e) => e.preventDefault());
  $('#fsort').addEventListener('change', (e) => { f.sort = e.target.value; draw(); });
  $('#freset').addEventListener('click', reset);
  $('#ft').addEventListener('click', (e) => { const open = form.classList.toggle('open'); e.currentTarget.setAttribute('aria-expanded', open); e.currentTarget.textContent = `⚙️ ${t(open ? 'br.hideFilters' : 'br.showFilters')}`; });
  draw();
}

/* ───────── profile + booking ───────── */
const dayISO = (d) => new Date(Date.now() + d * 864e5 - new Date().getTimezoneOffset() * 6e4).toISOString().slice(0, 10);
function viewPro(id, qs = '') {
  const p = byId(id);
  if (!p) { setView(`<section class="sec page-top"><div class="wrap empty"><span class="em">🧐</span><p>${t('pro.notFound')}</p><a class="btn primary" href="#/browse">${t('nav.browse')}</a></div></section>`, '#/browse'); return; }
  const sv = st.saved.has(p.id), s = svc(p.service);
  const reviews = p.jobs ? REVIEWS : [];
  setView(`
  <section class="sec page-top"><div class="wrap">
    <a class="back" href="#/browse?s=${p.service}"><span class="flip" aria-hidden="true">←</span> ${t('pro.back')}</a>
    <div class="prof">
      <div class="prof-main">
        <div class="prof-h card">
          ${avatar(p, 'xl')}
          <div class="prof-id">
            <h1>${esc(L(p.name))} ${p.verified ? `<span class="vf big" aria-label="${esc(t('pro.verified'))}" title="${esc(t('pro.verified'))}">✓</span>` : ''}</h1>
            <p class="prof-s">${s.icon} ${esc(L(s))} · 📍 ${esc(L(city(p.city)))}</p>
            <div class="pro-m">${stars(p.rating)}<span>${t('pro.jobs', { n: p.jobs })}</span><span>${t('pro.years', { n: p.years })}</span>${p.jobs ? '' : `<span class="tag">${t('pro.new')}</span>`}</div>
          </div>
          <button class="fav big" type="button" data-save="${p.id}" aria-pressed="${sv}" aria-label="${esc(t(sv ? 'pro.unsave' : 'pro.save', { name: L(p.name) }))}">${heart}</button>
        </div>
        <div class="card pad"><h2>${t('pro.about')}</h2><p>${esc(L(p.bio))}</p>
          <dl class="kv3"><div><dt>${t('pro.skills')}</dt><dd class="tags">${(L(p.skills) || []).map((k) => `<span class="tag">${esc(k)}</span>`).join('')}</dd></div><div><dt>${t('pro.area')}</dt><dd>${esc(L(city(p.city)))}</dd></div><div><dt>${t('pro.langs')}</dt><dd>${p.langs.map((l) => t(`lang.${l}`)).join(', ')}</dd></div></dl>
        </div>
        ${reviews.length ? `<div class="card pad"><h2>${t('pro.reviews')} <small>${stars(p.rating)}</small></h2><ul class="revs">${reviews.map((r) => `<li><div class="rev-h"><b>${esc(L(r.by))}</b><span class="rate">${'★'.repeat(r.stars)}</span></div><p>${esc(L(r.text))}</p></li>`).join('')}</ul></div>` : ''}
      </div>
      <aside class="book card pad" id="book" aria-labelledby="bkT">
        <div class="book-h"><h2 id="bkT">${t('bk.t')}</h2><span class="pr"><b>${jd(p.rate)}</b> <small>${t('pro.perHour')}</small></span></div>
        <span class="avail ${p.avail ? 'on' : ''}">${t(p.avail ? 'pro.availNow' : 'pro.busy')}</span>
        <form id="bkF" novalidate>
          <div id="bkErr" tabindex="-1"></div>
          <div class="row2"><div class="field"><label for="bdate">${t('bk.date')}</label><input class="input" type="date" id="bdate" name="date" min="${dayISO(0)}" value="${dayISO(p.avail ? 0 : 1)}" required></div>
          <div class="field"><label for="bhours">${t('bk.hours')}</label><select class="select" id="bhours" name="hours">${[1, 2, 3, 4, 6, 8].map((h) => `<option ${h === 2 ? 'selected' : ''}>${h}</option>`).join('')}</select></div></div>
          <fieldset class="field"><legend class="lbl">${t('bk.time')}</legend><div class="seg">${['morning', 'afternoon', 'evening'].map((x, i) => `<label><input type="radio" name="slot" value="${x}" ${i === 0 ? 'checked' : ''}><span>${t(`bk.${x}`)}</span></label>`).join('')}</div></fieldset>
          <div class="field"><label for="bdesc">${t('bk.desc')}</label><textarea class="textarea" id="bdesc" name="desc" rows="3" placeholder="${esc(t('bk.descPh'))}" required></textarea></div>
          <div class="field"><label for="bname">${t('bk.name')}</label><input class="input" id="bname" name="name" autocomplete="name" value="${esc(S.get('me', {}).name || '')}" required></div>
          <div class="field"><label for="bphone">${t('bk.phone')}</label><input class="input" id="bphone" name="phone" type="tel" dir="ltr" autocomplete="tel" value="${esc(S.get('me', {}).phone || '')}" required></div>
          <div class="field"><label for="baddr">${t('bk.address')}</label><input class="input" id="baddr" name="addr" autocomplete="street-address" value="${esc(S.get('me', {}).addr || '')}" required></div>
          <div class="est"><span>${t('bk.est')}</span><b id="est"></b></div>
          <p class="hint">${t('bk.estNote')}</p>
          <button class="btn primary lg block" type="submit">${t('bk.submit')}</button>
        </form>
      </aside>
    </div>
  </div></section>`, '#/browse');
  const f = $('#bkF');
  const est = () => { $('#est').textContent = jd(p.rate * +f.hours.value); };
  f.hours.addEventListener('change', est); est();
  const rules = {
    date: (v) => (v && v >= dayISO(0)) || t('v.date'),
    desc: (v) => v.trim().length >= 10 || t('v.desc'),
    name: (v) => v.trim().length >= 2 || t('v.name'),
    phone: (v) => /^(\+?962|0)7[789]\d{7}$/.test(v.replace(/[\s-]/g, '')) || t('v.phone'),
    addr: (v) => v.trim().length >= 4 || t('v.address'),
  };
  const check = (k) => { const r = rules[k](f[k].value); fieldError(f[k], r === true ? '' : r); return r === true; };
  Object.keys(rules).forEach((k) => f[k].addEventListener('input', () => { if (f[k].getAttribute('aria-invalid')) check(k); }));
  f.addEventListener('submit', (e) => {
    e.preventDefault();
    const bad = Object.keys(rules).filter((k) => !check(k));
    const box = $('#bkErr');
    if (bad.length) { box.className = 'err-summary'; box.setAttribute('role', 'alert'); box.innerHTML = `<h3>${t('v.summary', { n: bad.length })}</h3><ul>${bad.map((k) => `<li><a href="#" data-f="${k}">${esc(rules[k](f[k].value))}</a></li>`).join('')}</ul>`; box.focus(); $$('[data-f]', box).forEach((a) => a.addEventListener('click', (ev) => { ev.preventDefault(); f[a.dataset.f].focus(); })); return; }
    box.className = ''; box.innerHTML = ''; box.removeAttribute('role');
    S.set('me', { name: f.name.value.trim(), phone: f.phone.value.trim(), addr: f.addr.value.trim() });
    st.bookings.unshift({ id: `BK-${String(Date.now()).slice(-5)}`, pro: p.id, date: f.date.value, slot: f.slot.value, hours: +f.hours.value, desc: f.desc.value.trim(), est: p.rate * +f.hours.value, at: Date.now(), status: 'pending' });
    save();
    toast(t('bk.ok', { name: L(p.name) }), { icon: '📨' });
    location.hash = '#/bookings';
  });
  if (new URLSearchParams(qs).get('book')) { requestAnimationFrame(() => { $('#book').scrollIntoView({ block: 'start' }); f.desc.focus({ preventScroll: true }); }); }
}

/* ───────── bookings + saved ───────── */
function viewBookings() {
  // bookings auto-confirm after 20 seconds in the demo
  st.bookings.forEach((b) => { if (b.status === 'pending' && Date.now() - b.at > 20000) b.status = 'confirmed'; }); save();
  setView(`
  <section class="sec page-top" aria-labelledby="bkH"><div class="wrap narrow">
    <div class="sec-head"><div><span class="kicker">${t('bks.k')}</span><h1 id="bkH" class="h2">${t('bks.t')}</h1></div></div>
    ${st.bookings.length ? `<ul class="bks">${st.bookings.map((b) => { const p = byId(b.pro); if (!p) return ''; return `<li class="card">
      ${avatar(p)}<div class="bk-c"><b>${esc(L(p.name))}</b><small>${esc(L(svc(p.service)))} · ${new Date(b.date).toLocaleDateString(lang() === 'ar' ? 'ar-JO-u-nu-latn' : 'en-GB', { weekday: 'short', day: 'numeric', month: 'short' })} · ${t(`bk.${b.slot}`)} · ${b.hours}h</small><p>${esc(b.desc)}</p></div>
      <div class="bk-r"><span class="status s-${b.status}">${t(`bks.status.${b.status}`)}</span><b>${jd(b.est)}</b>${b.status !== 'cancelled' ? `<button class="btn sm" type="button" data-cancel="${b.id}">${t('bks.cancel')}</button>` : ''}</div></li>`; }).join('')}</ul>`
      : `<div class="empty card"><span class="em" aria-hidden="true">📅</span><p>${t('bks.none')}</p><a class="btn primary" href="#/browse">${t('bks.find')}</a></div>`}
  </div></section>`, '#/bookings');
}
function viewSaved() {
  const list = all().filter((p) => st.saved.has(p.id));
  setView(`<section class="sec page-top" aria-labelledby="svH"><div class="wrap">
    <div class="sec-head"><div><span class="kicker">${t('saved.k')}</span><h1 id="svH" class="h2">${t('saved.t')}</h1></div></div>
    ${list.length ? `<div class="pros">${list.map(proCard).join('')}</div>` : `<div class="empty card"><span class="em" aria-hidden="true">🤍</span><p>${t('saved.none')}</p><a class="btn primary" href="#/browse">${t('bks.find')}</a></div>`}
  </div></section>`, '#/saved');
}

/* ───────── join (3-step wizard) ───────── */
function viewJoin(step = 1) {
  const d = st.draft;
  const steps = [t('join.s1'), t('join.s2'), t('join.s3')];
  const body = step === 1 ? `
      <div class="field"><label for="jn">${t('join.name')}</label><input class="input" id="jn" name="name" autocomplete="name" value="${esc(d.name || '')}"></div>
      <div class="row2"><div class="field"><label for="je">${t('join.email')}</label><input class="input" id="je" name="email" type="email" dir="ltr" autocomplete="email" value="${esc(d.email || '')}"></div>
      <div class="field"><label for="jp">${t('join.phone')}</label><input class="input" id="jp" name="phone" type="tel" dir="ltr" autocomplete="tel" value="${esc(d.phone || '')}"></div></div>`
    : step === 2 ? `
      <fieldset class="field"><legend class="lbl">${t('join.service')}</legend><div class="svc-pick">${SERVICES.map((s) => `<label><input type="radio" name="service" value="${s.id}" ${d.service === s.id ? 'checked' : ''}><span><i aria-hidden="true">${s.icon}</i>${L(s)}</span></label>`).join('')}</div></fieldset>
      <div class="row3"><div class="field"><label for="jc">${t('join.city')}</label><select class="select" id="jc" name="city"><option value=""></option>${CITIES.map((c) => `<option value="${c.id}" ${d.city === c.id ? 'selected' : ''}>${L(c)}</option>`).join('')}</select></div>
      <div class="field"><label for="jr">${t('join.rate')}</label><input class="input" id="jr" name="rate" type="number" inputmode="decimal" min="3" max="60" dir="ltr" value="${esc(d.rate || '')}"></div>
      <div class="field"><label for="jy">${t('join.years')}</label><input class="input" id="jy" name="years" type="number" min="0" max="60" dir="ltr" value="${esc(d.years ?? '')}"></div></div>
      <div class="field"><label for="jb">${t('join.bio')}</label><textarea class="textarea" id="jb" name="bio" rows="3">${esc(d.bio || '')}</textarea></div>`
    : `<div class="review">${avatar({ id: d.email || 'x', name: { en: d.name, ar: d.name }, service: d.service })}<div><b>${esc(d.name)}</b><p>${esc(L(svc(d.service)))} · ${esc(L(city(d.city)))} · ${jd(+d.rate)} ${t('pro.perHour')}</p><p class="hint">${esc(d.bio)}</p></div></div>
      <label class="check"><input type="checkbox" id="jt" name="terms"> <span>${t('join.terms')}</span></label>`;
  setView(`<section class="sec page-top" aria-labelledby="jH"><div class="wrap narrow">
    <div class="sec-head"><div><span class="kicker">${t('join.k')}</span><h1 id="jH" class="h2">${t('join.t')}</h1><p>${t('join.p')}</p></div></div>
    <ol class="stepper" aria-label="${esc(t('join.step', { a: step, b: 3 }))}">${steps.map((s, i) => `<li class="${i + 1 < step ? 'done' : ''} ${i + 1 === step ? 'cur' : ''}" ${i + 1 === step ? 'aria-current="step"' : ''}><span>${i + 1 < step ? '✓' : i + 1}</span>${s}</li>`).join('')}</ol>
    <form class="card pad wiz" id="jF" novalidate><div id="jErr" tabindex="-1"></div>${body}
      <div class="wiz-a">${step > 1 ? `<button class="btn" type="button" id="jBack">${t('join.back')}</button>` : '<span></span>'}<button class="btn primary" type="submit">${step < 3 ? t('join.next') : t('join.publish')}</button></div>
    </form></div></section>`, '#/join');
  const f = $('#jF');
  const R = {
    1: { name: (v) => v.trim().length >= 3 || t('v.name'), email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) || t('v.email'), phone: (v) => /^(\+?962|0)7[789]\d{7}$/.test(v.replace(/[\s-]/g, '')) || t('v.phone') },
    2: { city: (v) => !!v || t('v.city'), rate: (v) => (+v >= 3 && +v <= 60) || t('v.rate'), bio: (v) => v.trim().length >= 20 || t('v.bio') },
    3: {},
  }[step];
  const grab = () => { $$('input, select, textarea', f).forEach((el) => { if (el.type === 'radio') { if (el.checked) d[el.name] = el.value; } else if (el.type !== 'checkbox') d[el.name] = el.value; }); S.set('joinDraft', d); };
  f.addEventListener('input', grab);
  $('#jBack')?.addEventListener('click', () => { grab(); viewJoin(step - 1); });
  f.addEventListener('submit', (e) => {
    e.preventDefault(); grab();
    const errs = [];
    Object.entries(R).forEach(([k, fn]) => { const r = fn(f[k].value); fieldError(f[k], r === true ? '' : r); if (r !== true) errs.push([k, r]); });
    if (step === 2 && !d.service) errs.unshift(['service', t('v.service')]);
    if (step === 3 && !$('#jt').checked) errs.push(['terms', t('v.terms')]);
    const box = $('#jErr');
    if (errs.length) { box.className = 'err-summary'; box.setAttribute('role', 'alert'); box.innerHTML = `<h3>${t('v.summary', { n: errs.length })}</h3><ul>${errs.map(([k, m]) => `<li><a href="#" data-f="${k}">${esc(m)}</a></li>`).join('')}</ul>`; box.focus(); $$('[data-f]', box).forEach((a) => a.addEventListener('click', (ev) => { ev.preventDefault(); (f[a.dataset.f]?.length ? f[a.dataset.f][0] : f[a.dataset.f])?.focus(); })); return; }
    if (step < 3) { viewJoin(step + 1); return; }
    const p = { id: `me-${Date.now()}`, name: { en: d.name.trim(), ar: d.name.trim() }, service: d.service, city: d.city, rate: +d.rate, rating: 5, jobs: 0, years: +d.years || 0, langs: [lang()], bio: { en: d.bio.trim(), ar: d.bio.trim() }, skills: { en: [], ar: [] }, avail: true, verified: false };
    st.mine.unshift(p); st.draft = {}; S.del('joinDraft'); save();
    toast(t('join.done', { name: d.name.split(' ')[0] }), { icon: '🎉' });
    location.hash = `#/pro/${p.id}`;
  });
}

/* ───────── events ───────── */
document.addEventListener('click', (e) => {
  const sv = e.target.closest('[data-save]');
  if (sv) {
    const id = sv.dataset.save, on = !st.saved.has(id); on ? st.saved.add(id) : st.saved.delete(id); save();
    const name = L(byId(id).name);
    $$(`[data-save="${id}"]`).forEach((b) => { b.setAttribute('aria-pressed', on); b.setAttribute('aria-label', t(on ? 'pro.unsave' : 'pro.save', { name })); b.classList.remove('pop'); void b.offsetWidth; on && b.classList.add('pop'); });
    toast(`${on ? '♥' : '♡'} ${name}`, { icon: on ? '♥' : '·' });
    return;
  }
  const c = e.target.closest('[data-cancel]');
  if (c) { const b = st.bookings.find((x) => x.id === c.dataset.cancel); if (b) { b.status = 'cancelled'; save(); toast(t('bks.cancelled'), { icon: '✕' }); viewBookings(); } }
});

const route = router([
  [/^\/$/, viewHome],
  [/^\/browse(?:\?(.*))?$/, (q) => viewBrowse(q || '')],
  [/^\/pro\/([\w-]+)(?:\?(.*))?$/, (id, q) => viewPro(id, q || '')],
  [/^\/bookings$/, viewBookings],
  [/^\/saved$/, viewSaved],
  [/^\/join$/, () => viewJoin(1)],
], () => viewHome());

const foot = () => { $('#footSvc').innerHTML = SERVICES.slice(0, 5).map((s) => `<li><a href="#/browse?s=${s.id}">${L(s)}</a></li>`).join(''); };
onLang(() => { route(); foot(); });
foot(); route(); applyI18n();
