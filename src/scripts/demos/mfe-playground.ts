/* "Shell + 3 remotes" playground for the micro-frontends post.
   Toggle remotes, pick each remote's framework and design-system version, and choose a sharing
   strategy. The panel shows what the browser would download and where version skew bites.
   Sizes are illustrative gzipped estimates for the model, not benchmarks. All native controls,
   so it works with Tab, Space, arrow keys and screen readers; results are in a polite live region. */
type Fw = 'react19' | 'react18' | 'vue3' | 'angular20';
type Ds = 'ds3' | 'ds2';
type Mode = 'none' | 'ranges' | 'singleton';

const FW: Record<Fw, { pkg: string; ver: string; major: string; kb: number; label: string }> = {
  react19: { pkg: 'react + react-dom', ver: '19.1', major: 'react@19', kb: 60, label: 'React 19' },
  react18: { pkg: 'react + react-dom', ver: '18.3', major: 'react@18', kb: 45, label: 'React 18' },
  vue3: { pkg: 'vue', ver: '3.5', major: 'vue@3', kb: 36, label: 'Vue 3' },
  angular20: { pkg: '@angular/core + common + router', ver: '20.x', major: 'angular@20', kb: 85, label: 'Angular 20' },
};
const DS: Record<Ds, { ver: string; major: string; kb: number; label: string }> = {
  ds3: { ver: '3.4.0', major: 'ds@3', kb: 22, label: 'ds 3.x' },
  ds2: { ver: '2.9.1', major: 'ds@2', kb: 26, label: 'ds 2.x' },
};
const SHELL_KB = 28;
const REMOTES = [
  { id: 'catalog', name: 'Catalog', own: 44, fw: 'react19' as Fw, ds: 'ds3' as Ds, on: true },
  { id: 'checkout', name: 'Checkout', own: 38, fw: 'react19' as Fw, ds: 'ds3' as Ds, on: true },
  { id: 'account', name: 'Account', own: 30, fw: 'react18' as Fw, ds: 'ds2' as Ds, on: true },
];

export function mount(el: HTMLElement) {
  const id = el.id || 'mfe';
  const state = { mode: 'singleton' as Mode, remotes: REMOTES.map(r => ({ ...r })) };

  // Custom segmented radio groups instead of native <select> (keyboard: arrows within a group).
  const seg = (name: string, k: 'fw' | 'ds', keys: string[], labels: Record<string, { label: string }>, sel: string, aria: string) =>
    `<div class="seg mf-seg" role="radiogroup" aria-label="${aria}">${keys.map(v => `<label><input type="radio" name="${name}" data-k="${k}" value="${v}"${v === sel ? ' checked' : ''}><span>${labels[v].label}</span></label>`).join('')}</div>`;
  const fwOpts = (i: number, sel: Fw) => seg(`${id}-fw-${i}`, 'fw', Object.keys(FW), FW, sel, 'Framework');
  const dsOpts = (i: number, sel: Ds) => seg(`${id}-ds-${i}`, 'ds', Object.keys(DS), DS, sel, 'Design system');

  el.innerHTML = `
    <span class="d-kicker">Live demo</span>
    <p class="d-title">Shell + 3 remotes: what does the user actually download?</p>
    <fieldset class="mf-mode"><legend>How are shared dependencies handled?</legend>
      <div class="seg" role="radiogroup" aria-label="Sharing strategy">
        <label><input type="radio" name="${id}-mode" value="none"><span>Not shared</span></label>
        <label><input type="radio" name="${id}-mode" value="ranges"><span>Shared by semver range</span></label>
        <label><input type="radio" name="${id}-mode" value="singleton" checked><span>Singletons</span></label>
      </div>
    </fieldset>
    <div class="mf-grid">
      <div class="mf-remotes">
        ${state.remotes.map((r, i) => `
        <fieldset class="mf-remote" data-i="${i}">
          <legend><label class="d-check"><input type="checkbox" data-k="on" checked> ${r.name} remote</label></legend>
          <div class="mf-sel">
            <div class="mf-field"><span class="mf-lbl">Framework</span>${fwOpts(i, r.fw)}</div>
            <div class="mf-field"><span class="mf-lbl">Design system</span>${dsOpts(i, r.ds)}</div>
          </div>
        </fieldset>`).join('')}
        <div class="d-row">
          <button type="button" data-p="aligned">Preset: aligned versions</button>
          <button type="button" data-p="migration">Preset: mid-migration</button>
        </div>
      </div>
      <div class="mf-out" aria-live="polite">
        <div class="mf-total"><span class="mf-kb">0</span> <span class="mf-unit">KB gzipped JS</span></div>
        <div class="mf-bar" aria-hidden="true"></div>
        <ul class="mf-legend" aria-hidden="true"></ul>
        <p class="mf-h">Copies loaded</p>
        <ul class="mf-list"></ul>
        <p class="mf-h">Risks</p>
        <ul class="mf-risks"></ul>
      </div>
    </div>
    <p class="d-note">Model with illustrative gzipped sizes (shell ${SHELL_KB} KB). Real numbers depend on your bundler, tree shaking and what each remote imports. The point is the shape: duplicates add weight, and singletons trade weight for runtime risk.</p>`;

  const q = <T extends Element>(s: string) => el.querySelector<T>(s)!;

  const render = () => {
    const on = state.remotes.filter(r => r.on);
    type Copy = { key: string; label: string; kb: number; by: string[]; kind: 'fw' | 'ds' | 'own' | 'shell' };
    const copies: Copy[] = [{ key: 'shell', label: 'Shell (router, auth, layout)', kb: SHELL_KB, by: ['shell'], kind: 'shell' }];
    const risks: string[] = [];
    const add = (key: string, label: string, kb: number, by: string, kind: Copy['kind']) => {
      const hit = copies.find(c => c.key === key);
      if (hit) hit.by.push(by); else copies.push({ key, label, kb, by: [by], kind });
    };
    for (const r of on) {
      const f = FW[r.fw], d = DS[r.ds];
      if (state.mode === 'none') {
        add(`${r.id}:fw`, `${f.label} (${f.pkg} ${f.ver})`, f.kb, r.name, 'fw');
        add(`${r.id}:ds`, `Design system ${d.ver}`, d.kb, r.name, 'ds');
      } else if (state.mode === 'ranges') {
        add(f.major, `${f.label} (${f.pkg} ${f.ver})`, f.kb, r.name, 'fw');
        add(d.major, `Design system ${d.ver}`, d.kb, r.name, 'ds');
      } else {
        // Singleton: one copy per package family; the highest version wins.
        const fam = r.fw.startsWith('react') ? 'react' : r.fw;
        const best = (r2: typeof r) => (fam === 'react' ? (on.some(x => x.fw === 'react19') ? 'react19' : 'react18') : r2.fw) as Fw;
        const bf = FW[best(r)];
        add('single:' + fam, `${bf.label} (${bf.pkg} ${bf.ver}), singleton`, bf.kb, r.name, 'fw');
        const bestDs: Ds = on.some(x => x.ds === 'ds3') ? 'ds3' : 'ds2';
        add('single:ds', `Design system ${DS[bestDs].ver}, singleton`, DS[bestDs].kb, r.name, 'ds');
        if (bf.major !== f.major) risks.push(`<b>${r.name}</b> was built against ${f.label} but gets ${bf.label} at runtime. Expect a version warning (or an error with <code>strictVersion</code>) and subtle breakage.`);
        if (bestDs !== r.ds) risks.push(`<b>${r.name}</b> expects design system ${DS[r.ds].ver} but renders with ${DS[bestDs].ver}. Breaking token or prop changes show up as visual drift.`);
      }
      add(`${r.id}:own`, `${r.name} feature code`, r.own, r.name, 'own');
    }
    const fws = new Set(on.map(r => r.fw.startsWith('react') ? 'react' : r.fw));
    if (fws.size > 1) risks.push(`${fws.size} different frameworks on one page. Fine during a migration, expensive as an end state.`);
    const dsVers = new Set(on.map(r => r.ds));
    if (dsVers.size > 1 && state.mode !== 'singleton') risks.push('Two design-system majors on one page: users see two button styles, two focus rings and two spacing scales.');
    const dupes = on.length ? copies.filter(c => c.kind === 'fw').length - fws.size + copies.filter(c => c.kind === 'ds').length - 1 : 0;
    if (state.mode !== 'singleton' && dupes > 0) risks.push(`${dupes} duplicate librar${dupes === 1 ? 'y' : 'ies'} downloaded. Each one is parsed and executed, too.`);
    if (!on.length) risks.push('No remotes enabled: just the shell.');

    const total = copies.reduce((s, c) => s + c.kb, 0);
    q<HTMLElement>('.mf-kb').textContent = String(total);
    const budget = 170;
    q<HTMLElement>('.mf-total').dataset.over = String(total > budget);
    q<HTMLElement>('.mf-unit').textContent = `KB gzipped JS · budget ${budget} KB ${total > budget ? '✗ over' : '✓'}`;
    const colors = { shell: '#8b6bff', fw: '#ff7ab6', ds: '#3fd0e0', own: '#39d98a' } as const;
    const max = Math.max(total, 420);
    q<HTMLElement>('.mf-bar').innerHTML = copies.map(c => `<i style="width:${(c.kb / max) * 100}%;background:${colors[c.kind]}" title="${c.label}"></i>`).join('') +
      `<b style="left:${(budget / max) * 100}%"></b>`;
    q<HTMLElement>('.mf-legend').innerHTML = (['shell', 'fw', 'ds', 'own'] as const).map(k => `<li><i style="background:${colors[k]}"></i>${{ shell: 'Shell', fw: 'Framework', ds: 'Design system', own: 'Feature code' }[k]}</li>`).join('');
    q<HTMLElement>('.mf-list').innerHTML = copies.map(c => `<li class="${c.kind}${c.by.length > 1 ? ' shared' : ''}"><span>${c.label}</span><span class="mf-by">${c.kb} KB · ${c.by.length > 1 ? 'shared by ' + c.by.join(', ') : c.by[0] === 'shell' ? 'host' : c.by[0]}</span></li>`).join('');
    q<HTMLElement>('.mf-risks').innerHTML = risks.length ? risks.map(r => `<li>${r}</li>`).join('') : '<li class="ok">No duplicates, no skew. This is what aligned versions buy you.</li>';
  };

  el.addEventListener('change', e => {
    const t = e.target as HTMLInputElement;
    if (t.name === `${id}-mode`) state.mode = t.value as Mode;
    const box = t.closest<HTMLElement>('.mf-remote');
    if (box) {
      const r = state.remotes[+box.dataset.i!];
      const k = t.dataset.k;
      if (k === 'on') { r.on = (t as HTMLInputElement).checked; box.classList.toggle('off', !r.on); }
      if (k === 'fw') r.fw = t.value as Fw;
      if (k === 'ds') r.ds = t.value as Ds;
    }
    render();
  });
  el.addEventListener('click', e => {
    const p = (e.target as HTMLElement).closest<HTMLElement>('[data-p]')?.dataset.p;
    if (!p) return;
    const set: [Fw, Ds][] = p === 'aligned' ? [['react19', 'ds3'], ['react19', 'ds3'], ['react19', 'ds3']] : [['react19', 'ds3'], ['angular20', 'ds3'], ['react18', 'ds2']];
    el.querySelectorAll<HTMLElement>('.mf-remote').forEach((box, i) => {
      const r = state.remotes[i];
      [r.fw, r.ds] = set[i]; r.on = true; box.classList.remove('off');
      box.querySelector<HTMLInputElement>('[data-k=on]')!.checked = true;
      box.querySelector<HTMLInputElement>(`[data-k=fw][value="${r.fw}"]`)!.checked = true;
      box.querySelector<HTMLInputElement>(`[data-k=ds][value="${r.ds}"]`)!.checked = true;
    });
    render();
  });
  render();
}
