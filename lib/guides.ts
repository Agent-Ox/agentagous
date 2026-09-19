// Guide catalogue, compiled from guides/content/*.md front-matter into
// guides.generated.ts. Store page, success page, bundle builder and homepage
// counts all read from here — never hardcode a guide count anywhere.

import { GENERATED_GUIDES, GENERATED_BUNDLES } from './guides.generated';

export type Guide = {
  slug: string;
  title: string;
  /** The cover standfirst, reused as the guide page's hero body. */
  subtitle: string;
  description: string;
  /** Card headline. The phrase between asterisks renders in the accent. */
  hook: string;
  /** Left pill on the card, e.g. "Best for: total beginners". */
  bestFor: string;
  /** Right pill on the card, e.g. "Open weights explained". */
  capability: string;
  price: number;
  /** Live Stripe price ID, from the guide's front-matter. */
  stripePriceId: string;
  badge: string | null;
  featured: boolean;
  category: 'foundation' | 'platforms' | 'claude' | 'practical' | 'map' | 'personal'
    | 'work' | 'creative';
  file: string;
  /** Included in the starter bundle. Set per guide in its front-matter. */
  starter: boolean;
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

/** Copy and prices are generated; membership is derived from the catalogue. */
const BUNDLE_MEMBERS: Record<string, () => string[]> = {
  'starter-pack': () => GUIDES.filter(g => g.starter).map(g => g.slug),
  'complete-pack': () => GUIDES.map(g => g.slug),
};

export const BUNDLES: Bundle[] = GENERATED_BUNDLES.map(b => ({
  ...b,
  includes: (BUNDLE_MEMBERS[b.slug] ?? (() => []))(),
}));

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
