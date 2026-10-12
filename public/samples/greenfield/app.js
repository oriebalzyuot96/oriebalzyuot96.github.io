/* Book a Teacher · 2026 rebuild of the 2020 RBK Greenfield team project (Team-Six-GreenField).
   Student side: search by subject and place, timetable slots, connect form. Teacher side: post ads with live preview, inbox. */
import { $, $$, esc, t, L, lang, onLang, boot, store, toast, money, router, reveal, fieldError, applyI18n } from './core.js';
import { DICT } from './i18n.js';
import { SUBJECTS, PLACES, LEVELS, TEACHERS, DAYS } from './data.js';

boot({ ns: 'bookteacher', dict: DICT });
const S = store('bookteacher');
const st = { ads: S.get('ads', []), reqs: S.get('reqs', []) };
const save = () => { S.set('ads', st.ads); S.set('reqs', st.reqs); };
const all = () => [...st.ads, ...TEACHERS];
const byId = (id) => all().find((x) => x.id === id);
const subj = (id) => SUBJECTS.find((s) => s.id === id) || SUBJECTS[0];
const place = (id) => PLACES.find((p) => p.id === id) || PLACES[0];
const main = $('#main');
const phoneOk = (v) => /^(\+?962|0)7[789]\d{7}$/.test(v.replace(/[\s-]/g, ''));
const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

function setView(html, active, focus = true) {
  main.innerHTML = html;
  $$('.nav a').forEach((a) => { if (a.getAttribute('href') === active) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); });
  if (focus) { main.focus({ preventScroll: true }); scrollTo({ top: 0, behavior: 'instant' }); }
  reveal(main);
}
const initials = (x) => L(x.name).split(/\s+/).map((w) => w[0]).slice(0, 2).join('');
const avatar = (x, cls = '') => `<span class="av ${cls}" style="--c:${subj(x.subject).c}" aria-hidden="true">${esc(initials(x))}</span>`;

function card(x, preview = false) {
  const s = subj(x.subject);
  return `<article class="tcard ${preview ? '' : 'rv'}" style="--c:${s.c}">
    <div class="tc-top"><span class="tc-subj">${s.icon} ${esc(L(s))}</span>${x.online ? `<span class="tc-on">💻 ${t('t.online')}</span>` : ''}</div>
    <div class="tc-h">${avatar(x)}<div><h3>${preview ? esc(L(x.name) || '—') : `<a href="#/t/${x.id}">${esc(L(x.name))}</a>`}</h3><p>📍 ${esc(L(place(x.place)))} · ★ ${x.rating.toFixed(1)}</p></div></div>
    <p class="tc-bio">${esc(L(x.bio) || '—')}</p>
    <div class="tc-lv">${(x.levels || []).map((l) => `<span class="tag">${esc(L(LEVELS[l]))}</span>`).join('')}</div>
    <div class="tc-f"><span class="price"><b>${money(x.price || 0)}</b> <small>${t('t.perHour')}</small></span>${preview ? '' : `<a class="btn primary sm" href="#/t/${x.id}">${t('t.view')}</a>`}</div>
  </article>`;
}

/* ───────── home ───────── */
function viewHome() {
  const top = [...all()].sort((a, b) => b.rating - a.rating || b.students - a.students).slice(0, 3);
  setView(`
  <section class="hero"><div class="wrap hero-g">
    <div>
      <span class="kicker">🎓 ${t('hero.k')}</span>
      <h1>${t('hero.t')}</h1>
      <p class="lead">${t('hero.p')}</p>
      <div class="roles">
        <a class="role student" href="#/find"><span class="role-i" aria-hidden="true">🎒</span><span><b>${t('hero.student')}</b><small>${t('hero.studentP')}</small></span><span class="flip" aria-hidden="true">→</span></a>
        <a class="role teacher" href="#/teach"><span class="role-i" aria-hidden="true">🧑‍🏫</span><span><b>${t('hero.teacher')}</b><small>${t('hero.teacherP')}</small></span><span class="flip" aria-hidden="true">→</span></a>
      </div>
      <dl class="stats"><div><dt>${t('hero.s1')}</dt><dd>${all().length}</dd></div><div><dt>${t('hero.s2')}</dt><dd>${SUBJECTS.length}</dd></div><div><dt>${t('hero.s3')}</dt><dd>4.8★</dd></div></dl>
    </div>
    <div class="board" aria-hidden="true">
      <div class="board-in">
        <span class="chalk c1">E = mc²</span><span class="chalk c2">أ ب ت</span><span class="chalk c3">∫ x dx</span><span class="chalk c4">Hello!</span><span class="chalk c5">H₂O</span>
        <svg class="owl" viewBox="0 0 120 120"><ellipse cx="60" cy="72" rx="38" ry="42" fill="#f5b82e"/><circle cx="45" cy="58" r="14" fill="#fff"/><circle cx="75" cy="58" r="14" fill="#fff"/><circle cx="46" cy="59" r="6" fill="#1d2a2e"/><circle cx="74" cy="59" r="6" fill="#1d2a2e"/><path d="M55 70 l5 8 l5 -8z" fill="#e07a1f"/><path d="M28 30 l32 -14 l32 14 l-32 14z" fill="#1d2a2e"/><path d="M88 31 v14" stroke="#e0565b" stroke-width="3"/><ellipse cx="60" cy="96" rx="20" ry="12" fill="#ffe08a"/></svg>
      </div>
      <div class="board-ledge"></div>
    </div>
  </div></section>
  <section class="sec" aria-labelledby="sjT"><div class="wrap">
    <div class="sec-head"><div><span class="kicker">${t('subj.k')}</span><h2 id="sjT">${t('subj.t')}</h2></div></div>
    <div class="subjs">${SUBJECTS.map((s) => `<a class="subj rv" style="--c:${s.c}" href="#/find?s=${s.id}"><span class="subj-i" aria-hidden="true">${s.icon}</span><b>${L(s)}</b><small>${t('subj.n', { n: all().filter((x) => x.subject === s.id).length })}</small></a>`).join('')}</div>
  </div></section>
  <section class="sec tint" aria-labelledby="tpT"><div class="wrap">
    <div class="sec-head"><div><span class="kicker">${t('top.k')}</span><h2 id="tpT">${t('top.t')}</h2></div><a class="btn" href="#/find">${t('nav.find')} <span class="flip" aria-hidden="true">→</span></a></div>
    <div class="tcards">${top.map((x) => card(x)).join('')}</div>
  </div></section>
  <section class="sec" aria-labelledby="hwT"><div class="wrap">
    <div class="sec-head"><div><span class="kicker">${t('how.k')}</span><h2 id="hwT">${t('how.t')}</h2></div></div>
    <div class="how2">
      <div class="card pad rv"><h3>🎒 ${t('how.s')}</h3><ol><li>${t('how.s1')}</li><li>${t('how.s2')}</li><li>${t('how.s3')}</li></ol><a class="btn primary" href="#/find">${t('nav.find')}</a></div>
      <div class="card pad rv"><h3>🧑‍🏫 ${t('how.t2')}</h3><ol><li>${t('how.t1')}</li><li>${t('how.t22')}</li><li>${t('how.t3')}</li></ol><a class="btn" href="#/teach">${t('teach.t')}</a></div>
    </div>
  </div></section>`, '#/', false);
}

/* ───────── find ───────── */
function viewFind(qs = '') {
  const ps = new URLSearchParams(qs);
  const f = { s: ps.get('s') || '', p: ps.get('p') || '', l: ps.get('l') || '', max: +(ps.get('max') || 25), on: ps.get('on') === '1', sort: ps.get('sort') || 'rating' };
  setView(`<section class="sec page-top" aria-labelledby="fT"><div class="wrap">
    <div class="sec-head"><div><span class="kicker">${t('find.k')}</span><h1 id="fT" class="h2">${t('find.t')}</h1></div></div>
    <div class="chips subj-chips" role="group" aria-label="${esc(t('find.subject'))}"><button class="chip" type="button" data-s="" aria-pressed="${!f.s}">${t('find.allSubj')}</button>${SUBJECTS.map((s) => `<button class="chip" type="button" data-s="${s.id}" aria-pressed="${f.s === s.id}">${s.icon} ${L(s)}</button>`).join('')}</div>
    <form class="fbar card" id="fb" aria-label="${esc(t('find.k'))}">
      <div class="field"><label for="fp">${t('find.place')}</label><select class="select" id="fp" name="p"><option value="">${t('find.anyPlace')}</option>${PLACES.map((p) => `<option value="${p.id}" ${f.p === p.id ? 'selected' : ''}>${L(p)}</option>`).join('')}</select></div>
      <div class="field"><label for="fl">${t('find.level')}</label><select class="select" id="fl" name="l"><option value="">${t('find.anyLevel')}</option>${Object.entries(LEVELS).map(([k, v]) => `<option value="${k}" ${f.l === k ? 'selected' : ''}>${L(v)}</option>`).join('')}</select></div>
      <div class="field"><label for="fm">${t('find.maxPrice')}: <output id="fmo"></output></label><input class="range" id="fm" name="max" type="range" min="5" max="25" value="${f.max}"></div>
      <div class="field"><label for="fs">${t('find.sort')}</label><select class="select" id="fs" name="sort">${['rating', 'price', 'exp'].map((k) => `<option value="${k}" ${f.sort === k ? 'selected' : ''}>${t(`sort.${k}`)}</option>`).join('')}</select></div>
      <label class="check"><input type="checkbox" name="on" ${f.on ? 'checked' : ''}> <span>${t('find.online')}</span></label>
    </form>
    <p class="count" id="cnt" aria-live="polite"></p>
    <div class="tcards" id="list"></div>
  </div></section>`, '#/find');
  const form = $('#fb');
  const draw = () => {
    $('#fmo').textContent = t('find.upTo', { v: money(f.max) });
    const list = all().filter((x) => (!f.s || x.subject === f.s) && (!f.p || x.place === f.p || (f.p === 'online' && x.online)) && (!f.l || x.levels.includes(f.l)) && x.price <= f.max && (!f.on || x.online))
      .sort({ rating: (a, b) => b.rating - a.rating, price: (a, b) => a.price - b.price, exp: (a, b) => b.years - a.years }[f.sort]);
    $('#cnt').textContent = t('find.count', { n: list.length });
    $('#list').innerHTML = list.length ? list.map((x) => card(x)).join('') : `<div class="empty card" style="grid-column:1/-1"><span class="em" aria-hidden="true">🔍</span><p>${t('find.none')}</p><button class="btn primary" type="button" id="rs">${t('find.reset')}</button></div>`;
    $('#rs')?.addEventListener('click', () => viewFind(''));
    reveal($('#list'));
    const q = new URLSearchParams(); Object.entries({ s: f.s, p: f.p, l: f.l, max: f.max < 25 ? f.max : '', on: f.on ? 1 : '', sort: f.sort !== 'rating' ? f.sort : '' }).forEach(([k, v]) => v !== '' && q.set(k, v));
    history.replaceState(null, '', `#/find${q.toString() ? `?${q}` : ''}`);
  };
  form.addEventListener('input', () => { f.p = form.p.value; f.l = form.l.value; f.max = +form.max.value; f.sort = form.sort.value; f.on = form.on.checked; draw(); });
  form.addEventListener('submit', (e) => e.preventDefault());
  $$('.subj-chips .chip').forEach((c) => c.addEventListener('click', () => { f.s = c.dataset.s; $$('.subj-chips .chip').forEach((x) => x.setAttribute('aria-pressed', String(x === c))); draw(); }));
  draw();
}

/* ───────── teacher profile + connect ───────── */
function viewTeacher(id) {
  const x = byId(id);
  if (!x) { setView(`<section class="sec page-top"><div class="wrap empty"><span class="em">🧐</span><p>${t('t.notFound')}</p><a class="btn primary" href="#/find">${t('nav.find')}</a></div></section>`, '#/find'); return; }
  const s = subj(x.subject);
  const hours = [...new Set(Object.values(x.slots || {}).flat())].sort((a, b) => a - b);
  const me = S.get('me', {});
  let picked = null;
  setView(`<section class="sec page-top"><div class="wrap">
    <a class="back" href="#/find?s=${x.subject}"><span class="flip" aria-hidden="true">←</span> ${t('t.back')}</a>
    <div class="tp" style="--c:${s.c}">
      <div class="tp-main">
        <div class="tp-h card">${avatar(x, 'xl')}<div><span class="tc-subj">${s.icon} ${esc(L(s))}</span><h1>${esc(L(x.name))}</h1><p>📍 ${t('t.place')} ${esc(L(place(x.place)))} · ★ ${x.rating.toFixed(1)} · ${t('t.students', { n: x.students })} · ${t('t.years', { n: x.years })}</p></div><span class="price big"><b>${money(x.price)}</b><small>${t('t.perHour')}</small></span></div>
        <div class="card pad"><h2>${t('t.about')}</h2><p>${esc(L(x.bio))}</p><h3>${t('t.levels')}</h3><div class="tc-lv">${x.levels.map((l) => `<span class="tag">${esc(L(LEVELS[l]))}</span>`).join('')}${x.online ? `<span class="tag">💻 ${t('t.online')}</span>` : ''}</div></div>
        <div class="card pad"><h2 id="slT">${t('t.slots')}</h2>
          ${hours.length ? `<div class="tt-wrap"><table class="tt" aria-labelledby="slT"><thead><tr><th scope="col"><span class="sr-only">${t('t.pick')}</span></th>${DAYS.map((d) => `<th scope="col">${L(d)}</th>`).join('')}</tr></thead>
          <tbody>${hours.map((h) => `<tr><th scope="row" class="ltr">${String(h).padStart(2, '0')}:00</th>${DAYS.map((d, i) => (x.slots[i] || []).includes(h) ? `<td><button type="button" class="slot" data-slot="${i}-${h}" aria-pressed="false" aria-label="${esc(`${L(d)} ${h}:00`)}">✓</button></td>` : '<td><span class="noslot" aria-hidden="true">·</span></td>').join('')}</tr>`).join('')}</tbody></table></div>` : '<p>—</p>'}
          <p class="picked" id="picked" aria-live="polite">${t('t.noSlot')}</p>
        </div>
      </div>
      <aside class="card pad tp-side" aria-labelledby="rqT">
        <h2 id="rqT">${t('rq.t', { name: esc(L(x.name).split(' ')[0]) })}</h2>
        <form id="rqF" novalidate><div id="rqErr" tabindex="-1"></div>
          <div class="field"><label for="rn">${t('rq.name')}</label><input class="input" id="rn" name="name" autocomplete="name" value="${esc(me.name || '')}"></div>
          <div class="field"><label for="rp">${t('rq.phone')}</label><input class="input" id="rp" name="phone" type="tel" dir="ltr" autocomplete="tel" value="${esc(me.phone || '')}"></div>
          <div class="field"><label for="re">${t('rq.email')}</label><input class="input" id="re" name="email" type="email" dir="ltr" autocomplete="email" value="${esc(me.email || '')}"></div>
          <div class="field"><label for="rm">${t('rq.msg')}</label><textarea class="textarea" id="rm" name="msg" rows="3" placeholder="${esc(t('rq.msgPh'))}"></textarea></div>
          <button class="btn primary lg block" type="submit">${t('rq.send')}</button>
        </form>
      </aside>
    </div></div></section>`, '#/find');
  $$('.slot').forEach((b) => b.addEventListener('click', () => {
    $$('.slot').forEach((o) => o.setAttribute('aria-pressed', String(o === b)));
    picked = b.dataset.slot; const [d, h] = picked.split('-');
    $('#picked').textContent = t('t.picked', { slot: `${L(DAYS[d])} ${h}:00` }); $('#picked').classList.add('on');
  }));
  const f = $('#rqF');
  const R = { name: (v) => v.trim().length >= 3 || t('v.name'), phone: (v) => phoneOk(v) || t('v.phone'), email: (v) => emailOk(v) || t('v.email') };
  Object.keys(R).forEach((k) => f[k].addEventListener('input', () => { if (f[k].getAttribute('aria-invalid')) { const r = R[k](f[k].value); fieldError(f[k], r === true ? '' : r); } }));
  f.addEventListener('submit', (e) => {
    e.preventDefault();
    const errs = Object.keys(R).map((k) => { const r = R[k](f[k].value); fieldError(f[k], r === true ? '' : r); return r === true ? null : [k, r]; }).filter(Boolean);
    if (!picked) errs.push(['slot', t('rq.slot')]);
    const box = $('#rqErr');
    if (errs.length) { box.className = 'err-summary'; box.setAttribute('role', 'alert'); box.innerHTML = `<h3>${t('v.summary', { n: errs.length })}</h3><ul>${errs.map(([k, m]) => `<li><a href="#" data-f="${k}">${esc(m)}</a></li>`).join('')}</ul>`; box.focus(); $$('[data-f]', box).forEach((a) => a.addEventListener('click', (ev) => { ev.preventDefault(); (a.dataset.f === 'slot' ? $('.slot') : f[a.dataset.f])?.focus(); })); return; }
    S.set('me', { name: f.name.value.trim(), phone: f.phone.value.trim(), email: f.email.value.trim() });
    const [d, h] = picked.split('-');
    st.reqs.unshift({ id: `RQ-${String(Date.now()).slice(-5)}`, teacher: x.id, day: +d, hour: +h, name: f.name.value.trim(), phone: f.phone.value.trim(), email: f.email.value.trim(), msg: f.msg.value.trim(), at: Date.now(), status: 'sent' });
    save();
    toast(t('rq.sent', { name: L(x.name).split(' ')[0] }), { icon: '📨' });
    location.hash = '#/requests';
  });
}

/* ───────── my requests ───────── */
function viewRequests() {
  st.reqs.forEach((r) => { if (r.status === 'sent' && Date.now() - r.at > 15000) r.status = 'seen'; }); save();
  setView(`<section class="sec page-top" aria-labelledby="mrT"><div class="wrap narrow">
    <div class="sec-head"><div><span class="kicker">${t('my.k')}</span><h1 id="mrT" class="h2">${t('my.t')}</h1></div></div>
    ${st.reqs.length ? `<ul class="reqs">${st.reqs.map((r) => { const x = byId(r.teacher); if (!x) return ''; return `<li class="card">${avatar(x)}<div class="rq-c"><b>${esc(L(x.name))}</b><small>${subj(x.subject).icon} ${esc(L(subj(x.subject)))} · ${L(DAYS[r.day])} <span class="ltr">${r.hour}:00</span> · ${money(x.price)}</small>${r.msg ? `<p>“${esc(r.msg)}”</p>` : ''}</div><div class="rq-r"><span class="status s-${r.status}">${t(`my.status.${r.status}`)}</span><button class="btn sm" type="button" data-wd="${r.id}">${t('my.cancel')}</button></div></li>`; }).join('')}</ul>`
      : `<div class="empty card"><span class="em" aria-hidden="true">📨</span><p>${t('my.none')}</p><a class="btn primary" href="#/find">${t('my.find')}</a></div>`}
  </div></section>`, '#/requests');
}

/* ───────── teacher dashboard ───────── */
function viewTeach(editId) {
  const ed = st.ads.find((a) => a.id === editId);
  const d = ed ? { name: L(ed.name), phone: ed.phone, email: ed.email, subject: ed.subject, place: ed.place, price: ed.price, levels: ed.levels, desc: L(ed.bio), online: ed.online } : S.get('adDraft', { subject: 'math', place: 'amman', levels: [], online: false });
  const inbox = st.reqs.filter((r) => st.ads.some((a) => a.id === r.teacher));
  setView(`<section class="sec page-top" aria-labelledby="tdT"><div class="wrap">
    <div class="sec-head"><div><span class="kicker">${t('teach.k')}</span><h1 id="tdT" class="h2">${t('teach.t')}</h1><p>${t('teach.p')}</p></div></div>
    <div class="teach">
      <form class="card pad adf" id="adF" novalidate><div id="adErr" tabindex="-1"></div>
        <div class="row2"><div class="field"><label for="an">${t('teach.name')}</label><input class="input" id="an" name="name" autocomplete="name" value="${esc(d.name || '')}"></div>
        <div class="field"><label for="ap">${t('teach.phone')}</label><input class="input" id="ap" name="phone" type="tel" dir="ltr" value="${esc(d.phone || '')}"></div></div>
        <div class="row2"><div class="field"><label for="ae">${t('teach.email')}</label><input class="input" id="ae" name="email" type="email" dir="ltr" value="${esc(d.email || '')}"></div>
        <div class="field"><label for="apr">${t('teach.price')}</label><input class="input" id="apr" name="price" type="number" min="3" max="60" inputmode="decimal" dir="ltr" value="${esc(d.price ?? '')}"></div></div>
        <div class="row2"><div class="field"><label for="as">${t('teach.subject')}</label><select class="select" id="as" name="subject">${SUBJECTS.map((s) => `<option value="${s.id}" ${d.subject === s.id ? 'selected' : ''}>${s.icon} ${L(s)}</option>`).join('')}</select></div>
        <div class="field"><label for="apl">${t('teach.place')}</label><select class="select" id="apl" name="place">${PLACES.map((p) => `<option value="${p.id}" ${d.place === p.id ? 'selected' : ''}>${L(p)}</option>`).join('')}</select></div></div>
        <fieldset class="field" id="lvls"><legend class="lbl">${t('teach.levels')}</legend><div class="chips">${Object.entries(LEVELS).map(([k, v]) => `<label class="chk"><input type="checkbox" name="levels" value="${k}" ${d.levels?.includes(k) ? 'checked' : ''}><span>${L(v)}</span></label>`).join('')}</div></fieldset>
        <div class="field"><label for="ad">${t('teach.desc')}</label><textarea class="textarea" id="ad" name="desc" rows="3">${esc(d.desc || '')}</textarea></div>
        <label class="check"><input type="checkbox" name="online" ${d.online ? 'checked' : ''}> <span>${t('teach.online')}</span></label>
        <button class="btn primary lg" type="submit">${ed ? t('teach.update') : t('teach.publish')}</button>
      </form>
      <div class="prev"><h2 class="prev-h">👀 ${t('teach.preview')}</h2><div id="prev"></div></div>
    </div>
    <div class="dash">
      <div><h2>${t('teach.mine')}</h2>${st.ads.length ? `<ul class="reqs">${st.ads.map((a) => `<li class="card">${avatar(a)}<div class="rq-c"><b><a href="#/t/${a.id}">${esc(L(a.name))}</a></b><small>${subj(a.subject).icon} ${esc(L(subj(a.subject)))} · ${esc(L(place(a.place)))} · ${money(a.price)}</small></div><div class="rq-r row"><a class="btn sm" href="#/teach/${a.id}">${t('teach.edit')}</a><button class="btn sm" type="button" data-del="${a.id}">${t('teach.delete')}</button></div></li>`).join('')}</ul>` : '<p class="hint">—</p>'}</div>
      <div><h2>${t('teach.inbox')}</h2>${inbox.length ? `<ul class="reqs">${inbox.map((r) => `<li class="card"><div class="rq-c"><b>${esc(r.name)}</b><small>${L(DAYS[r.day])} <span class="ltr">${r.hour}:00</span> · <span class="ltr">${esc(r.phone)}</span></small>${r.msg ? `<p>“${esc(r.msg)}”</p>` : ''}</div><div class="rq-r">${r.status === 'accepted' ? `<span class="status s-accepted">${t('my.status.accepted')}</span>` : `<button class="btn primary sm" type="button" data-acc="${r.id}">${t('teach.accept')}</button>`}</div></li>`).join('')}</ul>` : `<p class="hint">${t('teach.noInbox')}</p>`}</div>
    </div>
  </div></section>`, '#/teach');
  const f = $('#adF');
  const read = () => ({ name: f.name.value, phone: f.phone.value, email: f.email.value, subject: f.subject.value, place: f.place.value, price: f.price.value, levels: $$('input[name="levels"]:checked', f).map((i) => i.value), desc: f.desc.value, online: f.online.checked });
  const toT = (v, id = 'preview') => ({ id, name: { en: v.name.trim(), ar: v.name.trim() }, phone: v.phone.trim(), email: v.email.trim(), subject: v.subject, place: v.place, price: +v.price || 0, levels: v.levels, online: v.online, bio: { en: v.desc.trim(), ar: v.desc.trim() }, rating: ed?.rating ?? 5, students: ed?.students ?? 0, years: ed?.years ?? 1, slots: ed?.slots ?? { 0: [17], 2: [17], 4: [17] } });
  const R = { name: (v) => v.trim().length >= 3 || t('v.name'), phone: (v) => phoneOk(v) || t('v.phone'), email: (v) => emailOk(v) || t('v.email'), price: (v) => (+v >= 3 && +v <= 60) || t('v.price'), desc: (v) => v.trim().length >= 20 || t('v.desc') };
  const upd = () => { const v = read(); if (!ed) S.set('adDraft', v); $('#prev').innerHTML = card(toT(v), true); Object.keys(R).forEach((k) => { if (f[k].getAttribute('aria-invalid')) { const r = R[k](f[k].value); fieldError(f[k], r === true ? '' : r); } }); };
  f.addEventListener('input', upd); upd();
  f.addEventListener('submit', (e) => {
    e.preventDefault();
    const v = read();
    const errs = Object.keys(R).map((k) => { const r = R[k](f[k].value); fieldError(f[k], r === true ? '' : r); return r === true ? null : [k, r]; }).filter(Boolean);
    if (!v.levels.length) errs.push(['levels', t('v.levels')]);
    const box = $('#adErr');
    if (errs.length) { box.className = 'err-summary'; box.setAttribute('role', 'alert'); box.innerHTML = `<h3>${t('v.summary', { n: errs.length })}</h3><ul>${errs.map(([k, m]) => `<li><a href="#" data-f="${k}">${esc(m)}</a></li>`).join('')}</ul>`; box.focus(); $$('[data-f]', box).forEach((a) => a.addEventListener('click', (ev) => { ev.preventDefault(); (a.dataset.f === 'levels' ? $('input[name="levels"]', f) : f[a.dataset.f]).focus(); })); return; }
    const x = toT(v, ed ? ed.id : `ad-${Date.now()}`);
    if (ed) st.ads = st.ads.map((a) => (a.id === ed.id ? x : a)); else st.ads.unshift(x);
    S.del('adDraft'); save();
    toast(t('teach.published'), { icon: '🎉' });
    location.hash = `#/t/${x.id}`;
  });
}

/* ───────── events ───────── */
document.addEventListener('click', (e) => {
  const wd = e.target.closest('[data-wd]');
  if (wd) { st.reqs = st.reqs.filter((r) => r.id !== wd.dataset.wd); save(); toast(t('my.withdrawn'), { icon: '↩' }); viewRequests(); return; }
  const del = e.target.closest('[data-del]');
  if (del) { st.ads = st.ads.filter((a) => a.id !== del.dataset.del); save(); toast(t('teach.deleted'), { icon: '🗑' }); viewTeach(); return; }
  const acc = e.target.closest('[data-acc]');
  if (acc) { const r = st.reqs.find((x) => x.id === acc.dataset.acc); r.status = 'accepted'; save(); toast(t('teach.accepted'), { icon: '✓' }); viewTeach(); }
});

const route = router([
  [/^\/$/, viewHome],
  [/^\/find(?:\?(.*))?$/, (q) => viewFind(q || '')],
  [/^\/t\/([\w-]+)$/, viewTeacher],
  [/^\/requests$/, viewRequests],
  [/^\/teach$/, () => viewTeach()],
  [/^\/teach\/([\w-]+)$/, viewTeach],
], () => viewHome());
onLang(() => route());
route(); applyI18n();
