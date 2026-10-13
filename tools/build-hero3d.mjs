// Bundles the 3D hero (src/three/hero3d.js + vendored three.js) into one minified, tree-shaken ES module:
//   public/hero3d.js  — loaded lazily by public/fx.js after first paint (never on reduced motion / no WebGL).
// Run: node tools/build-hero3d.mjs
import { build } from 'esbuild';
const r = await build({
  entryPoints: ['src/three/hero3d.js'], outfile: 'public/hero3d.js', bundle: true, format: 'esm', minify: true,
  treeShaking: true, target: 'es2020', legalComments: 'none', metafile: true,
  banner: { js: '/* Orieb Alzyuot · 3D hero. Includes three.js r186 (MIT © 2010-2026 three.js authors). */' },
});
const out = Object.values(r.metafile.outputs)[0];
console.log('public/hero3d.js', (out.bytes / 1024).toFixed(1) + ' KB');
