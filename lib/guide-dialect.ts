/**
 * The guide dialect → semantic HTML.
 *
 * `guides/content/<slug>.md` is the single source for both the PDF and the web
 * page. guides/render.py turns the dialect into reportlab flowables; this turns
 * the same dialect into HTML. Every directive render.py understands is handled
 * here, and anything it does not recognise throws — a guide that would silently
 * lose a paragraph on the website fails the build instead.
 *
 * Keep DIRECTIVES in step with the style registry in render.py::_styles.
 */

/** Directives that map to a styled block of prose. Mirrors render.py's registry. */
const PROSE_DIRECTIVES = new Set([
  'body_lead', 'bullet', 'small', 'cap', 'cat', 'ev', 'task', 'step', 'step_num',
  'prod', 'acc', 'person', 'role', 'fit', 'callout', 'quote', 'caveat',
  'link_style', 'subheading', 'section_heading', 'ng_title', 'ng_desc', 'ng_link',
  'cta_h', 'cta_link', 'qr_text', 'footer_s', 'stat_lbl', 'cover_desc',
  'cover_meta', 'cover_sub', 'cover_title', 'hs', 'hs2', 'cs', 'cs2', 'body',
]);

/** Directives with their own handling rather than a prose style. */
const SPECIAL_DIRECTIVES = new Set([
  'spacer', 'rule', 'zinc_rule', 'pagebreak', 'stat', 'gl', 'table', 'tcells', 'tstyle',
]);

export class DialectError extends Error {}

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export type LinkRule = { pattern: RegExp; href: (match: string) => string; once: boolean };

/**
 * Inline markup. The dialect passes a small amount of reportlab markup through
 * verbatim; only <b> appears in the content, and it becomes <strong>. Everything
 * else is escaped, then the link rules are applied to the plain text runs.
 */
function inline(text: string, rules: LinkRule[], used: Set<string>): string {
  // Protect the one tag the dialect allows before escaping.
  const parts = text.split(/(<\/?b>)/);
  const out = parts.map(part => {
    if (part === '<b>') return '<strong>';
    if (part === '</b>') return '</strong>';
    return linkify(escapeHtml(part), rules, used);
  });
  return out.join('');
}

function linkify(text: string, rules: LinkRule[], used: Set<string>): string {
  let result = text;
  for (const rule of rules) {
    rule.pattern.lastIndex = 0;
    result = result.replace(rule.pattern, match => {
      const key = match.toLowerCase();
      if (rule.once && used.has(key)) return match;
      used.add(key);
      return `<a href="${rule.href(match)}">${match}</a>`;
    });
  }
  return result;
}

type Ctx = { rules: LinkRule[]; used: Set<string> };

/** `@tcells hs-row`, `hs-row+col` — which cells take the header treatment. */
function parseCellSpec(spec: string) {
  return { headerRow: spec.includes('row'), headerCol: spec.includes('col') };
}

function renderTable(lines: string[], start: number, ctx: Ctx): [string, number] {
  let i = start;
  let spec = '';
  const rows: string[][] = [];
  while (i < lines.length) {
    const raw = lines[i].trim();
    if (raw.startsWith('@tcells ')) {
      spec = raw.slice(8).trim();
      i++;
    } else if (raw.startsWith('@tstyle ')) {
      // Presentation for reportlab only; the web table is styled in CSS.
      i++;
    } else if (raw.startsWith('|')) {
      rows.push(raw.replace(/^\||\|$/g, '').split('|').map(c => c.trim()));
      i++;
    } else {
      break;
    }
  }
  if (!rows.length) throw new DialectError('@table with no rows');

  const { headerRow, headerCol } = parseCellSpec(spec);
  const cell = (c: string, isHead: boolean) =>
    isHead ? `<th scope="col">${inline(c, ctx.rules, ctx.used)}</th>`
           : `<td>${inline(c, ctx.rules, ctx.used)}</td>`;

  let html = '<div class="g-tablewrap"><table class="g-table">';
  rows.forEach((row, r) => {
    if (r === 0 && headerRow) {
      html += '<thead><tr>' + row.map(c => cell(c, true)).join('') + '</tr></thead><tbody>';
    } else {
      html += '<tr>' + row.map((c, ci) =>
        headerCol && ci === 0
          ? `<th scope="row">${inline(c, ctx.rules, ctx.used)}</th>`
          : cell(c, false)).join('') + '</tr>';
    }
  });
  html += (headerRow ? '</tbody>' : '') + '</table></div>';
  return [html, i];
}

/**
 * Renders one guide body to HTML.
 *
 * @throws DialectError on any directive the renderer does not know, so the
 *         build fails rather than dropping content.
 */
export function renderGuideBody(body: string, rules: LinkRule[] = []): string {
  const ctx: Ctx = { rules, used: new Set() };
  const lines = body.split('\n');
  const out: string[] = [];
  let para: string[] = [];
  let list: string[] = [];
  let stats: string[] = [];
  let glossary: string[] = [];

  const flushPara = () => {
    if (!para.length) return;
    const text = para.join(' ').trim();
    if (text) out.push(`<p>${inline(text, ctx.rules, ctx.used)}</p>`);
    para = [];
  };
  const flushList = () => {
    if (!list.length) return;
    out.push('<ul class="g-list">' + list.join('') + '</ul>');
    list = [];
  };
  const flushStats = () => {
    if (!stats.length) return;
    out.push('<div class="g-stats">' + stats.join('') + '</div>');
    stats = [];
  };
  const flushGlossary = () => {
    if (!glossary.length) return;
    out.push('<dl class="g-glossary">' + glossary.join('') + '</dl>');
    glossary = [];
  };
  const flushAll = () => { flushPara(); flushList(); flushStats(); flushGlossary(); };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (!line) { flushPara(); continue; }

    if (line.startsWith('## ')) {
      flushAll();
      out.push(`<h2>${inline(line.slice(3).trim(), ctx.rules, ctx.used)}</h2>`);
      continue;
    }
    if (line.startsWith('### ')) {
      flushAll();
      out.push(`<h3>${inline(line.slice(4).trim(), ctx.rules, ctx.used)}</h3>`);
      continue;
    }
    if (line.startsWith('> ')) {
      flushAll();
      out.push(`<blockquote class="g-callout">${inline(line.slice(2).trim(), ctx.rules, ctx.used)}</blockquote>`);
      continue;
    }
    if (line.startsWith('- ')) {
      flushPara(); flushStats(); flushGlossary();
      // The content writes bullets as "- → text"; the arrow is decoration the
      // list marker already provides.
      const text = line.slice(2).replace(/^→\s*/, '').trim();
      list.push(`<li>${inline(text, ctx.rules, ctx.used)}</li>`);
      continue;
    }
    if (!line.startsWith('@')) {
      flushList(); flushStats(); flushGlossary();
      para.push(line);
      continue;
    }

    // ── directives ──────────────────────────────────────────────────────
    const name = line.slice(1).split(/\s/)[0];
    const rest = line.slice(1 + name.length).trim();

    if (!PROSE_DIRECTIVES.has(name) && !SPECIAL_DIRECTIVES.has(name)) {
      throw new DialectError(
        `unknown directive @${name} — add it to guide-dialect.ts or remove it from the content`);
    }

    if (name === 'table') {
      flushAll();
      const [html, next] = renderTable(lines, i + 1, ctx);
      out.push(html);
      i = next - 1;
      continue;
    }
    if (name === 'tcells' || name === 'tstyle') {
      throw new DialectError(`@${name} outside a @table block`);
    }
    if (name === 'stat') {
      flushPara(); flushList(); flushGlossary();
      const [num, label = ''] = rest.split('||');
      stats.push(
        '<div class="g-stat">' +
        `<span class="g-stat-n">${inline(num.trim(), ctx.rules, ctx.used)}</span>` +
        `<span class="g-stat-l">${inline(label.trim(), ctx.rules, ctx.used)}</span>` +
        '</div>');
      continue;
    }
    if (name === 'gl') {
      flushPara(); flushList(); flushStats();
      // "<b>Term</b> — definition"
      // [\s\S] rather than the /s flag: tsconfig targets es2017.
      const m = rest.match(/^<b>([\s\S]*?)<\/b>\s*(?:—|-)?\s*([\s\S]*)$/);
      const term = m ? m[1] : rest;
      const def = m ? m[2] : '';
      glossary.push(
        '<div class="g-gl">' +
        `<dt>${inline(term, ctx.rules, ctx.used)}</dt>` +
        `<dd>${inline(def, ctx.rules, ctx.used)}</dd>` +
        '</div>');
      continue;
    }
    if (name === 'spacer') {
      // Vertical rhythm is handled by CSS margins on the web; a spacer only
      // needs to survive as a paragraph break.
      flushPara();
      continue;
    }
    if (name === 'pagebreak') { flushAll(); continue; }
    if (name === 'rule' || name === 'zinc_rule') { flushAll(); out.push('<hr class="g-hr">'); continue; }

    // Everything else is a styled block of prose.
    flushAll();
    const tag = name === 'subheading' ? 'h3' : name === 'section_heading' ? 'h2' : 'p';
    const cls = tag === 'p' ? ` class="g-${name.replace(/_/g, '-')}"` : '';
    out.push(`<${tag}${cls}>${inline(rest, ctx.rules, ctx.used)}</${tag}>`);
  }

  flushAll();
  return out.join('\n');
}
