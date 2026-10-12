/* Tiny regex highlighter for blog code blocks (runs client-side, so Medium imports plain <pre><code>). */
type Rule = [RegExp, string];
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const STR: Rule = [/"(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*'|`(?:[^`\\]|\\.)*`/, 'tk-s'];
const BLOCK_C: Rule = [/\/\*[\s\S]*?\*\//, 'tk-c'];
const LINE_C: Rule = [/\/\/[^\n]*/, 'tk-c'];
const NUM: Rule = [/\b\d+(?:\.\d+)?(?:px|rem|em|ms|s|%|ch|vw|vh|dvh|deg|fr)?\b/, 'tk-n'];

const LANGS: Record<string, Rule[]> = {
  css: [BLOCK_C, LINE_C, STR, [/@[\w-]+/, 'tk-a'], [/\$[\w-]+/, 'tk-v'], [/--[\w-]+/, 'tk-v'],
    [/[a-z-]+(?=\s*:(?!:)[^{\n]*(?:;|$))/m, 'tk-p'], [/#[0-9a-fA-F]{3,8}\b/, 'tk-n'], NUM,
    [/\b(?:var|color-mix|oklch|light-dark|calc|clamp|min|max|rgb|hsl|url|map\.get|color\.adjust|math\.div)(?=\()/, 'tk-f'],
    [/!important|!default/, 'tk-k']],
  ts: [BLOCK_C, LINE_C, STR, [/\b(?:const|let|var|function|return|if|else|for|of|in|new|await|async|import|export|from|type|interface|class|extends|throw|try|catch|finally|typeof|instanceof|null|undefined|true|false|this|default|as|void|while|switch|case|break)\b/, 'tk-k'],
    NUM, [/\b[A-Za-z_$][\w$]*(?=\()/, 'tk-f']],
  http: [[/^(?:GET|POST|PUT|PATCH|DELETE|HTTP\/[\d.]+)[^\n]*/m, 'tk-k'], [/^[A-Za-z][\w-]*(?=:)/m, 'tk-p'], [/#[^\n]*/, 'tk-c'], STR,
    [/'(?:self|none|strict-dynamic|nonce-[^']+|sha\d+-[^']+|unsafe-inline|unsafe-eval|script)'/, 'tk-s']],
  html: [[/<!--[\s\S]*?-->/, 'tk-c'], STR, [/<\/?[\w-]+/, 'tk-k'], [/\b[\w:-]+(?==)/, 'tk-p']],
  bash: [[/#[^\n]*/, 'tk-c'], STR, [/\b(?:npx|npm|git|curl|export|echo)\b/, 'tk-k']],
};
const ALIAS: Record<string, string> = { scss: 'css', sass: 'css', css: 'css', ts: 'ts', typescript: 'ts', js: 'ts', javascript: 'ts', tsx: 'ts', json: 'ts', http: 'http', html: 'html', astro: 'html', bash: 'bash', sh: 'bash', shell: 'bash' };

export function highlight(code: string, lang: string): string {
  const rules = LANGS[ALIAS[lang] ?? ''];
  if (!rules) return esc(code);
  const re = new RegExp(rules.map(([r]) => `(${r.source})`).join('|'), 'gm');
  let out = '', last = 0, m: RegExpExecArray | null;
  while ((m = re.exec(code))) {
    if (!m[0]) { re.lastIndex++; continue; }
    const i = m.slice(1).findIndex(g => g !== undefined);
    out += esc(code.slice(last, m.index)) + `<span class="${rules[i][1]}">${esc(m[0])}</span>`;
    last = m.index + m[0].length;
  }
  return out + esc(code.slice(last));
}
