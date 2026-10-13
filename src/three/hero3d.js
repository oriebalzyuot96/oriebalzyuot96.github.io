/* 3D hero layer: an iridescent lavender "glass" blob with floating UI shapes.
   Built with three.js (vendored, tree-shaken by tools/build-hero3d.mjs into public/hero3d.js).
   - colours come from the live CSS tokens (accent palette + theme), re-read on every preference change
   - reacts to pointer (desktop) and scroll; lighter geometry on small / coarse-pointer screens
   - pixel ratio ≤ 2, pauses off-screen and in hidden tabs, stops entirely for reduced motion
   - decorative only: aria-hidden container, never focusable, pointer-events: none (no focus trap) */
import {
  WebGLRenderer, Scene, PerspectiveCamera, Mesh, Group, IcosahedronGeometry, TorusGeometry, CapsuleGeometry,
  ShaderMaterial, Color, Vector2, Vector3, NormalBlending, MathUtils,
} from '../vendor/three/three.module.js';

const NOISE = /* glsl */`
vec3 mod289(vec3 x){return x-floor(x*(1./289.))*289.;}
vec4 mod289(vec4 x){return x-floor(x*(1./289.))*289.;}
vec4 permute(vec4 x){return mod289(((x*34.)+1.)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1./6.,1./3.);const vec4 D=vec4(0.,.5,1.,2.);
  vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.-g;vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.,i1.z,i2.z,1.))+i.y+vec4(0.,i1.y,i2.y,1.))+i.x+vec4(0.,i1.x,i2.x,1.));
  float n_=.142857142857;vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.*floor(p*ns.z*ns.z);vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.*x_);
  vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.+1.;vec4 s1=floor(b1)*2.+1.;vec4 sh=-step(h,vec4(0.));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.);m=m*m;
  return 42.*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}`;

const VERT = /* glsl */`
uniform float uTime; uniform float uAmp; uniform vec2 uPointer; uniform float uSeed;
varying vec3 vN; varying vec3 vV; varying float vNoise; varying vec3 vPos;
${NOISE}
float disp(vec3 p){
  float t=uTime*.22+uSeed;
  float n=snoise(p*.95+vec3(t,t*.7,-t*.5))*.7+snoise(p*2.1-vec3(t*.6))*.1;
  // the pointer pulls a soft bulge towards itself
  vec3 pd=normalize(vec3(uPointer*1.2,1.1));
  n+=smoothstep(.35,1.,dot(normalize(p),pd))*.55*length(uPointer);
  return n*uAmp;
}
void main(){
  vec3 p=position; vec3 n=normalize(normal);
  vec3 t=normalize(cross(n,abs(n.y)<.99?vec3(0.,1.,0.):vec3(1.,0.,0.))); vec3 b=normalize(cross(n,t));
  float e=.012;
  float d=disp(p); vec3 P=p+n*d;
  vec3 Pt=(p+t*e)+n*disp(p+t*e); vec3 Pb=(p+b*e)+n*disp(p+b*e);
  vec3 N=normalize(cross(Pt-P,Pb-P)); if(dot(N,n)<0.)N=-N;
  vec4 mv=modelViewMatrix*vec4(P,1.);
  vN=normalize(normalMatrix*N); vV=normalize(-mv.xyz); vNoise=d; vPos=P;
  gl_Position=projectionMatrix*mv;
}`;

const FRAG = /* glsl */`
uniform vec3 uA; uniform vec3 uB; uniform vec3 uC; uniform vec3 uD; uniform float uDark; uniform float uAlpha; uniform float uTime;
varying vec3 vN; varying vec3 vV; varying float vNoise; varying vec3 vPos;
void main(){
  vec3 N=normalize(vN); vec3 V=normalize(vV);
  float ndv=clamp(dot(N,V),0.,1.);
  float fres=pow(1.-ndv,2.2);
  // thin-film style iridescence: hue walks around the palette with view angle + surface noise
  float h=fract(ndv*.9+vNoise*.9+vPos.y*.18+uTime*.03);
  vec3 c1=mix(uA,uB,smoothstep(0.,.35,h));
  vec3 c2=mix(c1,uC,smoothstep(.33,.7,h));
  vec3 iri=mix(c2,uA,smoothstep(.66,1.,h));
  // two soft key lights + a cool rim
  vec3 L1=normalize(vec3(-.5,.8,.6)); vec3 L2=normalize(vec3(.7,-.2,.5));
  float s1=pow(max(dot(reflect(-L1,N),V),0.),38.); float s2=pow(max(dot(reflect(-L2,N),V),0.),12.)*.35;
  float diff=max(dot(N,L1),0.)*.35+.65;
  vec3 col=iri*diff;
  col=mix(col,uD,fres*.35);
  col+=vec3(1.)*(s1*.9+s2);
  // glass: the middle stays clear so the headline on top keeps its contrast
  float a=mix(.07+.07*(1.-uDark),.82,fres)+s1*.6+s2*.4;
  a*=uAlpha;
  // light themes: richer, more saturated film so the glass never reads as grey on a pale page
  vec3 g=vec3(dot(col,vec3(.299,.587,.114)));
  col=mix(mix(g,col,1.45),col*1.15+.04,uDark);
  gl_FragColor=vec4(col,clamp(a,0.,1.));
}`;

function cssColor(name, fallback) {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  try { return new Color().setStyle(v || fallback); } catch (e) { return new Color(fallback); }
}

export function mount(host, opts = {}) {
  const mobile = opts.mobile ?? (matchMedia('(max-width: 760px)').matches || matchMedia('(pointer: coarse)').matches);
  const renderer = new WebGLRenderer({ alpha: true, antialias: !mobile, powerPreference: 'low-power', premultipliedAlpha: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 2));
  renderer.setClearColor(0x000000, 0);
  const canvas = renderer.domElement;
  canvas.setAttribute('aria-hidden', 'true'); canvas.setAttribute('role', 'presentation'); canvas.tabIndex = -1;
  host.appendChild(canvas);

  const scene = new Scene();
  const camera = new PerspectiveCamera(35, 1, .1, 50); camera.position.set(0, 0, 7);
  const world = new Group(); scene.add(world);

  const uniforms = () => ({
    uTime: { value: 0 }, uAmp: { value: .26 }, uPointer: { value: new Vector2() }, uSeed: { value: Math.random() * 10 },
    uA: { value: new Color() }, uB: { value: new Color() }, uC: { value: new Color() }, uD: { value: new Color() },
    uDark: { value: 0 }, uAlpha: { value: 1 },
  });
  const mat = (amp, alpha) => {
    const m = new ShaderMaterial({ uniforms: uniforms(), vertexShader: VERT, fragmentShader: FRAG, transparent: true, depthWrite: false, blending: NormalBlending });
    m.uniforms.uAmp.value = amp; m.uniforms.uAlpha.value = alpha; return m;
  };

  const blobMat = mat(.3, 1);
  const blob = new Mesh(new IcosahedronGeometry(1.45, mobile ? 16 : 40), blobMat);
  world.add(blob);

  // floating UI shapes: a ring, a pill-card, a chip and two droplets
  const shapes = [];
  const add = (geo, amp, pos, scale, speed) => {
    const m = new Mesh(geo, mat(amp, .95)); m.position.copy(pos); m.scale.setScalar(scale);
    m.userData = { base: pos.clone(), speed, phase: Math.random() * 6.28, spin: new Vector3(Math.random() - .5, Math.random() - .5, Math.random() - .5).multiplyScalar(.6) };
    world.add(m); shapes.push(m); return m;
  };
  add(new TorusGeometry(.42, .13, mobile ? 12 : 28, mobile ? 32 : 72), .05, new Vector3(-2.55, 1.15, -.4), 1, .8);
  add(new IcosahedronGeometry(.32, mobile ? 4 : 10), .22, new Vector3(2.45, -1.05, .3), 1, 1.1);
  if (!mobile) {
    add(new CapsuleGeometry(.2, .75, 8, 24), .04, new Vector3(2.35, 1.35, -.9), 1, .6).rotation.z = Math.PI / 2.6;
    add(new CapsuleGeometry(.12, .42, 6, 18), .04, new Vector3(-2.3, -1.35, .2), 1, .9).rotation.z = Math.PI / 2;
    add(new IcosahedronGeometry(.18, 6), .18, new Vector3(-1.1, 1.85, .6), 1, 1.4);
    add(new TorusGeometry(.2, .07, 12, 40), .04, new Vector3(1.25, -1.9, .5), 1, 1.2);
  }
  const all = [blob, ...shapes];

  function setColors() {
    const root = document.documentElement;
    const dark = root.getAttribute('data-theme') === 'dark' || (root.getAttribute('data-theme') !== 'light' && matchMedia('(prefers-color-scheme: dark)').matches);
    const A = cssColor('--accent-2', '#b9a7ff'), B = cssColor('--pink', '#ffb8d6'), C = cssColor('--accent', '#6440f5'), D = cssColor('--sky', '#bfe0ff');
    for (const m of all) { const u = m.material.uniforms; u.uA.value.copy(A); u.uB.value.copy(B); u.uC.value.copy(C); u.uD.value.copy(D); u.uDark.value = dark ? 1 : 0; }
  }
  setColors();

  // layout: bigger + centred on desktop, smaller + higher on mobile
  let W = 1, H = 1;
  function resize() {
    const r = host.getBoundingClientRect(); W = Math.max(1, r.width); H = Math.max(1, r.height);
    renderer.setSize(W, H, false); camera.aspect = W / H; camera.updateProjectionMatrix();
    const narrow = W < 760;
    world.scale.setScalar(narrow ? .6 : W < 1100 ? .9 : 1);
    world.position.set(narrow ? .95 : 0, narrow ? 1.7 : .25, 0);
    blobMat.userData.base = narrow ? .6 : 1;
  }
  resize();
  const ro = new ResizeObserver(resize); ro.observe(host);

  // input: smoothed pointer + scroll
  const ptr = new Vector2(), ptrS = new Vector2();
  const onMove = e => { ptr.set((e.clientX / innerWidth) * 2 - 1, -((e.clientY / innerHeight) * 2 - 1)); };
  if (!mobile) addEventListener('pointermove', onMove, { passive: true });
  let scrollP = 0;
  const onScroll = () => { scrollP = Math.min(1.4, scrollY / Math.max(1, H)); };
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  // run loop with pause controls
  let raf = 0, running = false, visible = true, paused = false, t0 = performance.now(), t = 0, frames = 0;
  const loop = now => {
    raf = requestAnimationFrame(loop);
    const dt = Math.min(.05, (now - t0) / 1000); t0 = now; t += dt; frames++;
    ptrS.lerp(ptr, .06);
    const sp = scrollP;
    blob.rotation.y = t * .12 + ptrS.x * .45; blob.rotation.x = Math.sin(t * .2) * .15 - ptrS.y * .3 + sp * .6;
    blob.position.y = sp * 1.6; blob.scale.setScalar(1 - sp * .18);
    blobMat.uniforms.uAlpha.value = MathUtils.clamp(1 - sp * .55, 0, 1) * (blobMat.userData.base ?? 1);
    for (const m of all) { m.material.uniforms.uTime.value = t; m.material.uniforms.uPointer.value.copy(ptrS); }
    for (const s of shapes) {
      const d = s.userData;
      s.position.set(d.base.x + Math.sin(t * d.speed * .5 + d.phase) * .12 - ptrS.x * .25 * d.speed, d.base.y + Math.cos(t * d.speed * .6 + d.phase) * .16 + sp * 2.4 * d.speed - ptrS.y * .2, d.base.z);
      s.rotation.x += d.spin.x * dt; s.rotation.y += d.spin.y * dt + dt * .2; s.rotation.z += d.spin.z * dt;
      s.material.uniforms.uAlpha.value = MathUtils.clamp(1 - sp * .8, 0, 1);
    }
    world.rotation.y = ptrS.x * .08; world.rotation.x = -ptrS.y * .05;
    renderer.render(scene, camera);
  };
  function sync() {
    const should = visible && !paused && !document.hidden;
    if (should && !running) { running = true; t0 = performance.now(); raf = requestAnimationFrame(loop); }
    else if (!should && running) { running = false; cancelAnimationFrame(raf); }
    state.running = running;
  }
  const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; sync(); }, { rootMargin: '0px' });
  io.observe(host);
  const onVis = () => sync();
  document.addEventListener('visibilitychange', onVis);

  // first frame, then fade in
  renderer.render(scene, camera);
  requestAnimationFrame(() => host.classList.add('on'));

  const state = {
    get frames() { return frames; }, running: false, mobile,
    setColors, pause(v) { paused = !!v; sync(); },
    destroy() {
      cancelAnimationFrame(raf); running = false; io.disconnect(); ro.disconnect();
      removeEventListener('pointermove', onMove); removeEventListener('scroll', onScroll); document.removeEventListener('visibilitychange', onVis);
      for (const m of all) { m.geometry.dispose(); m.material.dispose(); }
      renderer.dispose(); renderer.forceContextLoss?.(); canvas.remove(); host.classList.remove('on'); state.running = false;
    },
  };
  sync();
  return state;
}
