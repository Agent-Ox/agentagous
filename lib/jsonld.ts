/**
 * JSON-LD builders.
 *
 * Every page type gets the schema that describes what it actually is, and
 * nothing it is not: guides are Articles that are also Products (the PDF is
 * the thing for sale), the directories are ItemLists, and FAQPage is emitted
 * only for the guides that genuinely ask and answer a question. Inventing a
 * Q&A shape for the other guides would be marking up content that is not
 * there, which is a manual-action risk and not worth the rich result.
 *
 * Shape is kept close to schema.org's own examples rather than clever: these
 * blobs are read by crawlers and by language models, and both do better with
 * the boring spelling.
 */
import { Guide, BUNDLES, GUIDE_COUNT, MIN_GUIDE_PRICE } from './guides';
import { SITE_URL } from './design';

type Json = Record<string, unknown>;

const ORG_ID = `${SITE_URL}/#organization`;
const SITE_ID = `${SITE_URL}/#website`;

export const organization = (): Json => ({
  '@type': 'Organization',
  '@id': ORG_ID,
  name: 'WTF Agents',
  url: `${SITE_URL}/`,
  logo: { '@type': 'ImageObject', url: `${SITE_URL}/icon-512.png`, width: 512, height: 512 },
  description:
    'Plain-English guides to the agentic economy: what AI agents are, who is building them, and how to put them to work.',
});

export const website = (): Json => ({
  '@type': 'WebSite',
  '@id': SITE_ID,
  url: `${SITE_URL}/`,
  name: 'WTF Agents',
  description: 'Plain-English guides to the agentic economy.',
  publisher: { '@id': ORG_ID },
  inLanguage: 'en',
});

export const breadcrumbs = (trail: { name: string; url: string }[]): Json => ({
  '@type': 'BreadcrumbList',
  itemListElement: trail.map((t, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: t.name,
    item: t.url,
  })),
});

/**
 * A guide page is one URL that is both a readable article and a buyable PDF,
 * so it carries both, joined by `mainEntityOfPage` pointing at the same URL.
 */
export function guideArticle(guide: Guide, index: number, published: string, modified: string): Json {
  const url = `${SITE_URL}/guides/${guide.slug}`;
  return {
    '@type': 'Article',
    '@id': `${url}#article`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    headline: guide.title,
    description: guide.description,
    abstract: guide.subtitle,
    image: `${url}/opengraph-image`,
    url,
    datePublished: published,
    dateModified: modified,
    author: { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
    isPartOf: { '@id': SITE_ID },
    inLanguage: 'en',
    articleSection: guide.category,
    position: index,
  };
}

export function guideProduct(guide: Guide): Json {
  const url = `${SITE_URL}/guides/${guide.slug}`;
  return {
    '@type': 'Product',
    '@id': `${url}#product`,
    name: `${guide.title} (PDF)`,
    description: guide.description,
    image: `${url}/opengraph-image`,
    brand: { '@id': ORG_ID },
    category: guide.category,
    offers: {
      '@type': 'Offer',
      url,
      price: String(guide.price),
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: { '@id': ORG_ID },
    },
  };
}

export const faqPage = (qa: { question: string; answer: string }[]): Json => ({
  '@type': 'FAQPage',
  mainEntity: qa.map(x => ({
    '@type': 'Question',
    name: x.question,
    acceptedAnswer: { '@type': 'Answer', text: x.answer },
  })),
});

/** The two bundles, as offers on the homepage. */
export const bundleProducts = (): Json[] =>
  BUNDLES.map(b => ({
    '@type': 'Product',
    '@id': `${SITE_URL}/#${b.slug}`,
    name: b.title,
    description: b.description,
    brand: { '@id': ORG_ID },
    offers: {
      '@type': 'Offer',
      url: `${SITE_URL}/`,
      price: String(b.price),
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      seller: { '@id': ORG_ID },
    },
  }));

/** The guide index, as an ordered list of the pages it links to. */
export const guideList = (guides: Guide[]): Json => ({
  '@type': 'ItemList',
  name: `The ${GUIDE_COUNT} WTF Agents guides`,
  numberOfItems: guides.length,
  itemListOrder: 'https://schema.org/ItemListOrderAscending',
  itemListElement: guides.map((g, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: g.title,
    url: `${SITE_URL}/guides/${g.slug}`,
  })),
});

/** /companies and /tools: a named list of things, each with a description. */
export const directoryList = (
  name: string,
  description: string,
  items: { name: string; one_line: string; slug: string }[],
  base: string,
): Json => ({
  '@type': 'ItemList',
  name,
  description,
  numberOfItems: items.length,
  itemListElement: items.map((it, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: { '@type': 'Thing', name: it.name, description: it.one_line, url: `${base}#${it.slug}` },
  })),
});

export const collectionPage = (url: string, name: string, description: string): Json => ({
  '@type': 'CollectionPage',
  '@id': `${url}#page`,
  url,
  name,
  description,
  isPartOf: { '@id': SITE_ID },
  inLanguage: 'en',
});

export const offerSummary = (): Json => ({
  '@type': 'AggregateOffer',
  offerCount: GUIDE_COUNT,
  lowPrice: String(MIN_GUIDE_PRICE),
  highPrice: String(Math.max(...BUNDLES.map(b => b.price))),
  priceCurrency: 'USD',
});

/**
 * Renders a `@graph` in one script tag. One block per page keeps the nodes
 * cross-referencable by @id, which is what lets Article point at the same
 * Organization the site-wide block defines.
 */
export function graph(nodes: Json[]): string {
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': nodes });
}
