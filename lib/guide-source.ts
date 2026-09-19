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
import { GUIDE_DATES } from './guide-dates.generated';

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
  ['Runway', 'runway'], ['Devin', 'devin'], ['Cognition', 'cognition'],
  ['Windsurf', 'windsurf'], ['Zapier', 'zapier'],
  ['Hermes Agent', 'hermes-agent'], ['Nous Research', 'nous-research'],
  ['Butterfly Effect', 'butterfly-effect'], ['Agentforce', 'salesforce-agentforce'],
  ['Sierra', 'sierra'],
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

  // Terms a guide claims, e.g. "MCP". Once per page, like company names: a
  // bare acronym can appear a dozen times and linking each is a rash.
  const terms = others.flatMap(g => (g.linkTerms ?? []).map(t => [t, g.slug] as const))
    .sort((a, b) => b[0].length - a[0].length);
  if (terms.length) {
    const termSlug = new Map(terms);
    rules.push({
      pattern: new RegExp(`\\b(?:${terms.map(([t]) => escapeRe(t)).join('|')})\\b`, 'g'),
      href: m => `/guides/${termSlug.get(m)}`,
      once: true,
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

/**
 * Question-and-answer pairs, for FAQPage markup.
 *
 * Only headings that are literally questions count. Six guides have them
 * ("Do you need to be a developer?"); the rest use a "Yes / Not yet / No"
 * shape that reads like a Q&A to a person but is not one, and marking that up
 * as FAQPage would be describing content that is not on the page.
 */
export function faqsFor(slug: string): { question: string; answer: string }[] {
  const raw = fs.readFileSync(contentPathFor(slug), 'utf8').replace(FRONT_MATTER, '');
  const out: { question: string; answer: string }[] = [];

  for (const section of raw.split(/^## /m).slice(1)) {
    const nl = section.indexOf('\n');
    const heading = section.slice(0, nl).trim();
    if (!heading.endsWith('?')) continue;

    const answer = section
      .slice(nl)
      .split('\n')
      .map(l => l.trim())
      // Directive lines carry their own structure; the prose is what answers.
      .filter(l => l && !l.startsWith('@') && !l.startsWith('|') && !l.startsWith('###'))
      .join(' ')
      .replace(/<[^>]+>/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    if (answer) out.push({ question: heading, answer: answer.slice(0, 1200) });
  }
  return out;
}

/**
 * First and last change dates for a guide, for datePublished and dateModified.
 *
 * Read from the generated file rather than from git: the Vercel deploy is a
 * shallow clone, so a git lookup here returns nothing for most guides and
 * silently falls back to the build time. guides/build_dates.py resolves them
 * where the history is.
 */
export function guideDates(slug: string): { published: string; modified: string } {
  const row = GUIDE_DATES.find(d => d.slug === slug);
  if (row) return { published: row.published, modified: row.modified };
  const now = new Date().toISOString();
  return { published: now, modified: now };
}
