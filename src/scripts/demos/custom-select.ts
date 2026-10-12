/* Accessible custom select: the WAI-ARIA APG "select-only combobox" pattern.
   Focus stays on the combobox; the active option is exposed with aria-activedescendant.
   Keys: ↓ ↑ Home End PageUp PageDown, Enter/Space (choose), Esc (close), Tab (choose + move on),
   Alt+↓ / Alt+↑, and type-ahead. Works in English (LTR) and Arabic (RTL). */
const OPTS = [
  ['JO', 'Jordan', 'الأردن'], ['SA', 'Saudi Arabia', 'السعودية'], ['AE', 'United Arab Emirates', 'الإمارات'],
  ['EG', 'Egypt', 'مصر'], ['PS', 'Palestine', 'فلسطين'], ['LB', 'Lebanon', 'لبنان'], ['QA', 'Qatar', 'قطر'],
  ['KW', 'Kuwait', 'الكويت'], ['OM', 'Oman', 'عُمان'], ['BH', 'Bahrain', 'البحرين'], ['MA', 'Morocco', 'المغرب'],
  ['TN', 'Tunisia', 'تونس'], ['IQ', 'Iraq', 'العراق'],
] as const;

export function mount(el: HTMLElement) {
  const id = el.id || 'cs';
  el.innerHTML = `
    <span class="d-kicker">Live demo</span>
    <p class="d-title">A custom select you can drive with the keyboard</p>
    <div class="d-row"><label class="d-check"><input type="checkbox" class="cs-rtl"> العربية (RTL)</label></div>
    <div class="cs-wrap">
      <div class="cs-field">
        <span class="cs-label" id="${id}-lbl">Country (custom)</span>
        <div class="cs-combo" id="${id}-combo" role="combobox" tabindex="0" aria-haspopup="listbox" aria-expanded="false"
             aria-controls="${id}-list" aria-labelledby="${id}-lbl"></div>
        <div class="cs-list" id="${id}-list" role="listbox" aria-labelledby="${id}-lbl" tabindex="-1" hidden></div>
        <input type="hidden" name="country" value="JO">
      </div>
      <div class="cs-field">
        <label class="cs-label" for="${id}-native">Country (native select)</label>
        <select class="cs-native" id="${id}-native"></select>
      </div>
    </div>
    <div class="cs-wrap" style="margin-top:14px">
      <div><div class="cs-label" style="margin-bottom:6px">Key log</div><div class="cs-log" aria-hidden="true">Tab to the custom select, then press ↓.</div></div>
      <div><div class="cs-label" style="margin-bottom:6px">Roughly what a screen reader says</div><div class="cs-sr"></div></div>
    </div>
    <p class="d-note">Try: Tab, ↓, type “q”, Home/End, Enter, Esc. Focus never leaves the combobox; the highlighted option is announced through aria-activedescendant.</p>`;

  const combo = el.querySelector<HTMLElement>('.cs-combo')!;
  const list = el.querySelector<HTMLElement>('.cs-list')!;
  const hidden = el.querySelector<HTMLInputElement>('input[type=hidden]')!;
  const native = el.querySelector<HTMLSelectElement>('.cs-native')!;
  const log = el.querySelector<HTMLElement>('.cs-log')!;
  const sr = el.querySelector<HTMLElement>('.cs-sr')!;
  const rtlBox = el.querySelector<HTMLInputElement>('.cs-rtl')!;
  let ar = false, selected = 0, active = 0, open = false, typed = '', typedAt = 0;
  const lines: string[] = [];

  const label = (i: number) => (ar ? OPTS[i][2] : OPTS[i][1]);
  const note = (s: string) => { lines.push(s); log.textContent = lines.slice(-4).join('\n'); };
  const say = () => {
    sr.textContent = open
      ? `${label(active)}, ${active + 1} of ${OPTS.length}${active === selected ? ', selected' : ''}`
      : `${ar ? 'الدولة' : 'Country'}, combobox, ${label(selected)}, collapsed`;
  };
  const build = () => {
    el.querySelector('.cs-wrap')!.setAttribute('dir', ar ? 'rtl' : 'ltr');
    el.querySelector(`#${id}-lbl`)!.textContent = ar ? 'الدولة (مخصّص)' : 'Country (custom)';
    el.querySelector(`label[for="${id}-native"]`)!.textContent = ar ? 'الدولة (عنصر select أصلي)' : 'Country (native select)';
    list.innerHTML = OPTS.map((o, i) => `<div role="option" class="cs-opt" id="${id}-o${i}" aria-selected="${i === selected}">${label(i)}</div>`).join('');
    native.innerHTML = OPTS.map((o, i) => `<option value="${o[0]}"${i === selected ? ' selected' : ''}>${label(i)}</option>`).join('');
    sync();
  };
  const sync = () => {
    combo.textContent = label(selected);
    combo.setAttribute('aria-expanded', String(open));
    list.hidden = !open;
    [...list.children].forEach((o, i) => { o.classList.toggle('is-active', open && i === active); o.setAttribute('aria-selected', String(i === selected)); });
    if (open) { combo.setAttribute('aria-activedescendant', `${id}-o${active}`); list.children[active]?.scrollIntoView({ block: 'nearest' }); }
    else combo.removeAttribute('aria-activedescendant');
    hidden.value = OPTS[selected][0];
    say();
  };
  const setOpen = (v: boolean) => { open = v; if (v) active = selected; sync(); };
  const choose = (i: number) => { selected = i; native.value = OPTS[i][0]; setOpen(false); note(`→ chose ${label(i)} (value ${OPTS[i][0]})`); };
  const move = (i: number) => { active = Math.max(0, Math.min(OPTS.length - 1, i)); sync(); };
  const typeahead = (ch: string) => {
    const now = Date.now(); typed = now - typedAt > 600 ? ch : typed + ch; typedAt = now;
    const from = typed.length === 1 ? active + 1 : active;
    for (let k = 0; k < OPTS.length; k++) {
      const i = (from + k) % OPTS.length;
      if (label(i).toLowerCase().startsWith(typed.toLowerCase())) return move(i);
    }
  };

  combo.addEventListener('keydown', e => {
    const k = e.key; let handled = true;
    if (!open) {
      if (k === 'ArrowDown' || k === 'ArrowUp' || k === 'Enter' || k === ' ') setOpen(true);
      else if (k === 'Home') { setOpen(true); move(0); }
      else if (k === 'End') { setOpen(true); move(OPTS.length - 1); }
      else if (k.length === 1 && !e.ctrlKey && !e.metaKey) { setOpen(true); typeahead(k); }
      else handled = false;
    } else {
      if (k === 'ArrowDown' && e.altKey) handled = true;
      else if (k === 'ArrowDown') move(active + 1);
      else if (k === 'ArrowUp' && e.altKey) choose(active);
      else if (k === 'ArrowUp') move(active - 1);
      else if (k === 'Home') move(0);
      else if (k === 'End') move(OPTS.length - 1);
      else if (k === 'PageDown') move(active + 10);
      else if (k === 'PageUp') move(active - 10);
      else if (k === 'Enter' || k === ' ') choose(active);
      else if (k === 'Escape') { setOpen(false); note('Esc → closed, value unchanged'); }
      else if (k === 'Tab') { choose(active); handled = false; }
      else if (k.length === 1 && !e.ctrlKey && !e.metaKey) typeahead(k);
      else handled = false;
    }
    if (k !== 'Tab' && k !== 'Shift') note(`${k === ' ' ? 'Space' : k}${open ? ` → ${label(active)}` : ''}`);
    if (handled) e.preventDefault();
  });
  combo.addEventListener('click', () => setOpen(!open));
  combo.addEventListener('blur', e => { if (!list.contains(e.relatedTarget as Node)) { if (open) setOpen(false); } });
  combo.addEventListener('focus', say);
  list.addEventListener('mousedown', e => e.preventDefault()); // keep focus on the combobox
  list.addEventListener('click', e => {
    const o = (e.target as HTMLElement).closest('[role=option]');
    if (o) { choose([...list.children].indexOf(o)); combo.focus(); }
  });
  native.addEventListener('change', () => { selected = native.selectedIndex; sync(); });
  rtlBox.addEventListener('change', () => { ar = rtlBox.checked; build(); });
  build();
}
