/* Accessibility modes toggler. Every mode is a data-attribute on ONE container, and the CSS reads
   those attributes (never a filter on <html>: it breaks fixed positioning and stacking). */
export function mount(el: HTMLElement) {
  const id = el.id || 'am';
  el.innerHTML = `
    <span class="d-kicker">Live demo</span>
    <p class="d-title">Contrast and reading modes</p>
    <div class="am-grid">
      <div class="am-ctrls">
        <fieldset><legend>Contrast</legend>
          <div class="seg">${[['none', 'Default'], ['high', 'High'], ['grayscale', 'Grayscale'], ['invert', 'Invert']]
            .map(([v, t], i) => `<label><input type="radio" name="${id}-c" value="${v}"${i ? '' : ' checked'}><span>${t}</span></label>`).join('')}</div>
        </fieldset>
        <label class="d-check"><input type="checkbox" data-k="readable"> Readable font</label>
        <label class="d-check"><input type="checkbox" data-k="links"> Highlight links</label>
        <label class="d-check"><input type="checkbox" data-k="spacing"> Text spacing (WCAG 1.4.12)</label>
        <label class="d-check"><input type="checkbox" data-k="motion"> Reduce motion</label>
        <label class="am-scale">Text size <input type="range" min="90" max="160" step="10" value="100" aria-describedby="${id}-sv"> <output id="${id}-sv">100%</output></label>
      </div>
      <div class="am-sample" data-contrast="none">
        <div class="am-photo" role="img" aria-label="Decorative gradient banner"></div>
        <h5>Quarterly applications</h5>
        <p>Applications grew this quarter. <a href="#${id}">See the full breakdown</a> or <a href="#${id}">download the CSV</a>.</p>
        <div class="am-bars" role="img" aria-label="Bar chart: 40, 75 and 55 applications"><i style="height:55%"></i><i style="height:100%"></i><i style="height:75%"></i></div>
        <button class="am-cta" type="button">Review applications</button>
      </div>
    </div>
    <p class="d-note">The default sample uses low-contrast greys and a pale button on purpose. Switch modes and watch what each one fixes.</p>`;
  const sample = el.querySelector<HTMLElement>('.am-sample')!;
  el.querySelectorAll<HTMLInputElement>(`input[name="${id}-c"]`).forEach(r => r.addEventListener('change', () => { sample.dataset.contrast = r.value; }));
  el.querySelectorAll<HTMLInputElement>('input[data-k]').forEach(c => c.addEventListener('change', () => {
    const k = c.dataset.k!;
    if (k === 'motion') sample.dataset.motion = c.checked ? 'reduced' : 'full';
    else sample.dataset[k] = String(c.checked);
  }));
  const range = el.querySelector<HTMLInputElement>('input[type=range]')!;
  const out = el.querySelector<HTMLOutputElement>('output')!;
  range.addEventListener('input', () => { sample.style.setProperty('--am-scale', String(+range.value / 100)); out.value = range.value + '%'; });
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    sample.dataset.motion = 'reduced';
    el.querySelector<HTMLInputElement>('input[data-k=motion]')!.checked = true;
  }
}
