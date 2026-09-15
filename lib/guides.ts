// Guide catalogue, compiled from guides/content/*.md front-matter into
// guides.generated.ts. Store page, success page, bundle builder and homepage
// counts all read from here — never hardcode a guide count anywhere.

import { GENERATED_GUIDES } from './guides.generated';

export type Guide = {
  slug: string;
  title: string;
  description: string;
  price: number;
  badge: string | null;
  featured: boolean;
  category: 'foundation' | 'platforms' | 'claude' | 'practical';
  file: string;
  /** Optional affiliate slug from lib/affiliates.ts, surfaced as "Start with X →". */
  relatedTool?: string;
};

/**
 * Catalogue order and content come from guides/content/*.md front-matter,
 * compiled by `python3 guides/build_catalogue.py`.
 */
export const GUIDES: Guide[] = GENERATED_GUIDES;

export type Bundle = {
  slug: string;
  title: string;
  description: string;
  price: number;
  file: string;
  /** Guide slugs, in the order they appear in the merged PDF. */
  includes: string[];
};

export const BUNDLES: Bundle[] = [
  {
    slug: 'starter-pack',
    title: 'The Agentic Economy Starter Pack',
    description: 'The five guides that take you from "WTF is going on" to hiring your first agent.',
    price: 29,
    file: 'agentic-economy-starter-pack.pdf',
    includes: ['agentic-economy', 'ai-agent', 'llm', 'claude', 'hire-agent'],
  },
  {
    slug: 'complete-pack',
    title: 'The Complete WTF Agents Pack',
    description: 'Everything. The full picture of the agentic economy, the platforms, the AI, and how to use it.',
    price: 49,
    file: 'complete-wtf-agents-pack.pdf',
    includes: GUIDES.map(g => g.slug),
  },
];

export const GUIDE_COUNT = GUIDES.length;
export const MIN_GUIDE_PRICE = Math.min(...GUIDES.map(g => g.price));

export function guideBySlug(slug: string): Guide | undefined {
  return GUIDES.find(g => g.slug === slug);
}

export function bundleBySlug(slug: string): Bundle | undefined {
  return BUNDLES.find(b => b.slug === slug);
}

/** Resolves a checkout slug (guide or bundle) to what the buyer downloads. */
export function productBySlug(slug: string): { title: string; file: string; description: string } | undefined {
  const guide = guideBySlug(slug);
  if (guide) return { title: guide.title, file: guide.file, description: guide.description };
  const bundle = bundleBySlug(slug);
  if (bundle) return { title: bundle.title, file: bundle.file, description: bundle.description };
  return undefined;
}

/** Full saving vs buying each included guide separately. */
export function bundleSaving(bundle: Bundle): number {
  const full = bundle.includes.reduce((sum, s) => sum + (guideBySlug(s)?.price ?? 0), 0);
  return full - bundle.price;
}
