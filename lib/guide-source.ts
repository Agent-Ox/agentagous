/**
 * Build-time access to guides/content/*.md for the guide pages.
 *
 * Front-matter is not parsed here: build_catalogue.py already reads it with a
 * real YAML parser and compiles it into guides.generated.ts, so this strips the
 * block and renders only the body. One parser, not two.
 */
import fs from 'fs';
import path from 'path';

import { GUIDES, Guide, guideBySlug } from './guides';
import { renderGuideBody, LinkRule } from './guide-dialect';

const CONTENT_DIR = path.join(process.cwd(), 'guides', 'content');
const CROSSLINKS = path.join(process.cwd(), 'guides', 'crosslinks.md');

const FRONT_MATTER = /^---\n[\s\S]*?\n---\n/;

/** Filenames need not match slugs — claude-model.md holds slug 'claude'. */
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
 * Companies the guides name often enough to be worth linking. Curated rather
 * than derived: the Supabase `companies` table lists AI-run companies, not the
 * labs and platforms the prose talks about. /companies#<slug> may not resolve
 * to an anchor yet — that page gains them later.
 */
const COMPANIES: [string, string][] = [
  ['Anthropic', 'anthropic'], ['OpenAI', 'openai'], ['Google DeepMind', 'google-deepmind'],
  ['Microsoft', 'microsoft'], ['Nvidia', 'nvidia'], ['Hugging Face', 'hugging-face'],
  ['DeepSeek', 'deepseek'], ['Alibaba', 'alibaba'], ['Moonshot AI', 'moonshot'],
  ['Zhipu', 'zhipu'], ['MiniMax', 'minimax'], ['Mistral', 'mistral'],
  ['Polsia', 'polsia'], ['NanoCorp', 'nanocorp'], ['Paperclip', 'paperclip'],
  ['OpenClaw', 'openclaw'], ['Manus', 'manus'], ['Stripe', 'stripe'],
  ['GitHub', 'github'], ['Cursor', 'cursor'], ['Perplexity', 'perplexity'],
  ['ElevenLabs', 'elevenlabs'], ['HeyGen', 'heygen'], ['Gamma', 'gamma'],
];

const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/**
 * Link rules for one guide's body.
 *
 * Guide titles link to their own pages, every time they appear, longest first
 * so "WTF is Claude Code" wins over "WTF is Claude". Company names link to the
 * directory on first mention only — linking all 40 mentions of "Anthropic"
 * would turn the prose into a rash.
 */
export function linkRulesFor(slug: string): LinkRule[] {
  const others = GUIDES.filter(g => g.slug !== slug)
    .sort((a, b) => b.title.length - a.title.length);
  const rules: LinkRule[] = [];

  if (others.length) {
    const titles = others.map(g => escapeRe(g.title)).join('|');
    const bySlug = new Map(others.map(g => [g.title, g.slug]));
    rules.push({
      pattern: new RegExp(`(?:${titles})`, 'g'),
      href: m => `/guides/${bySlug.get(m)}`,
      once: false,
    });
  }

  const names = COMPANIES.map(([n]) => escapeRe(n)).sort((a, b) => b.length - a.length).join('|');
  const slugOf = new Map(COMPANIES.map(([n, s]) => [n, s]));
  rules.push({
    pattern: new RegExp(`\\b(?:${names})\\b`, 'g'),
    href: m => `/companies#${slugOf.get(m) ?? m.toLowerCase()}`,
    once: true,
  });
  return rules;
}

export function guideBodyHtml(slug: string): string {
  const raw = fs.readFileSync(contentPathFor(slug), 'utf8');
  const body = raw.replace(FRONT_MATTER, '');
  return renderGuideBody(body, linkRulesFor(slug));
}

/** The five "Go deeper" slugs, read from the map render.py generates. */
export function crosslinksFor(slug: string): Guide[] {
  const text = fs.readFileSync(CROSSLINKS, 'utf8');
  for (const line of text.split('\n')) {
    if (!line.trim().startsWith('|')) continue;
    const cells = line.replace(/^\||\|$/g, '').split('|').map(c => c.trim().replace(/`/g, ''));
    if (cells[0] !== slug) continue;
    return cells.slice(2).map(s => guideBySlug(s)).filter(Boolean) as Guide[];
  }
  return [];
}

/** Catalogue position, matching the counter on the PDF cover. */
export function guideIndex(slug: string): number {
  return GUIDES.findIndex(g => g.slug === slug) + 1;
}
