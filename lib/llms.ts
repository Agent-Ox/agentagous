/**
 * The two plain-text views of the site, for language models.
 *
 * llms.txt is the index: what this site is, then every guide as one line of
 * title, description and canonical URL, grouped by category. llms-full.txt is
 * the whole corpus as prose. Both are generated from guides/content/*.md at
 * build time by the route handlers, so a new guide appears in them the moment
 * it appears anywhere else — there is no second list to keep in step.
 */
import fs from 'fs';
import path from 'path';

import { GUIDES, BUNDLES, GUIDE_COUNT, Guide } from './guides';
import { SITE_URL } from './design';

const CONTENT_DIR = path.join(process.cwd(), 'guides', 'content');
const FRONT_MATTER = /^---\n[\s\S]*?\n---\n/;

/** Display names for the category ids, in the order the homepage shows them. */
const CATEGORY_LABELS: [Guide['category'], string][] = [
  ['foundation', 'Foundation'],
  ['map', 'The map'],
  ['claude', 'Claude and Anthropic'],
  ['work', 'Work agents'],
  ['personal', 'Personal agents'],
  ['platforms', 'Platforms'],
  ['practical', 'Practical'],
  ['creative', 'Creative tools'],
];

function contentPathFor(slug: string): string {
  for (const file of fs.readdirSync(CONTENT_DIR)) {
    if (!file.endsWith('.md')) continue;
    const text = fs.readFileSync(path.join(CONTENT_DIR, file), 'utf8');
    const m = text.match(/^slug:\s*'([^']+)'/m);
    if (m && m[1] === slug) return path.join(CONTENT_DIR, file);
  }
  throw new Error(`no content file carries slug '${slug}'`);
}

/**
 * The dialect stripped back to prose: directives become their text, tables
 * become pipe rows a model can still read, and the markup goes. The point is
 * a faithful plain-text rendering, not a pretty one.
 */
function toPlainText(body: string): string {
  const out: string[] = [];

  for (const raw of body.split('\n')) {
    const line = raw.trimEnd();

    if (!line.trim()) { out.push(''); continue; }
    if (/^@(spacer|pagebreak|tstyle|tcells|table)\b/.test(line)) continue;

    let t = line;
    // "@stat 40% || caption" reads as "40% — caption".
    t = t.replace(/^@stat\s+(.*?)\s*\|\|\s*/, '$1 — ');
    // "@gl <b>Term</b> — body" and the other prose directives keep their text.
    t = t.replace(/^@(body_lead|cap|gl|fit|role|step|quote|note)\s+/, '');
    t = t.replace(/^- → /, '- ');
    t = t.replace(/<[^>]+>/g, '');

    out.push(t);
  }

  return out
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

export function guideText(slug: string): string {
  const raw = fs.readFileSync(contentPathFor(slug), 'utf8');
  return toPlainText(raw.replace(FRONT_MATTER, ''));
}

const header = () => [
  '# WTF Agents',
  '',
  `> Plain-English guides to the agentic economy: what AI agents are, who is building`,
  `> them, and how to put them to work. ${GUIDE_COUNT} guides, each readable in full and free`,
  `> on the site, each also sold as a $7 PDF.`,
  '',
  'Every guide is published in full as HTML at the URL below it — there is no paywall',
  'and no truncation, so the canonical URL is the complete text. Figures are dated and',
  'sourced to primary sources where one exists; guides are revised rather than reissued,',
  'so the date in a numbers box is the date the figure was checked.',
  '',
].join('\n');

export function llmsIndex(): string {
  const parts = [header(), '## Guides', ''];

  for (const [id, label] of CATEGORY_LABELS) {
    const inCat = GUIDES.filter(g => g.category === id);
    if (!inCat.length) continue;
    parts.push(`### ${label}`, '');
    for (const g of inCat) {
      parts.push(`- [${g.title}](${SITE_URL}/guides/${g.slug}): ${g.description}`);
    }
    parts.push('');
  }

  parts.push('## Bundles', '');
  for (const b of BUNDLES) {
    parts.push(`- ${b.title} — $${b.price}, ${b.includes.length} guides in one PDF. ${b.description}`);
  }

  parts.push(
    '',
    '## Directories',
    '',
    `- [The players](${SITE_URL}/companies): every company, product and standard the guides name, by layer.`,
    `- [The stack](${SITE_URL}/tools): the tools the guides recommend buying, by seat.`,
    '',
    '## Full text',
    '',
    `- [All ${GUIDE_COUNT} guides as one plain-text file](${SITE_URL}/llms-full.txt)`,
    '',
  );

  return parts.join('\n');
}

export function llmsFull(): string {
  const parts = [
    header(),
    `This file is the full text of all ${GUIDE_COUNT} guides, concatenated. Each is preceded by its`,
    'canonical URL. Generated from source at build time.',
    '',
  ];

  for (const g of GUIDES) {
    parts.push(
      '',
      '---',
      '',
      `# ${g.title}`,
      '',
      `Canonical: ${SITE_URL}/guides/${g.slug}`,
      `Category: ${g.category}`,
      `Summary: ${g.description}`,
      '',
      guideText(g.slug),
      '',
    );
  }

  return parts.join('\n');
}
