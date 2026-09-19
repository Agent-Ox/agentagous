import type { MetadataRoute } from 'next';

import { GUIDES, BUNDLES } from '../lib/guides';
import { SITE_URL } from '../lib/design';
import { GUIDE_DATES, ROUTE_DATES } from '../lib/guide-dates.generated';

/**
 * Static routes, the two bundles, and one entry per guide. The guides carry the
 * highest priority after the homepage: they are the pages worth indexing.
 *
 * lastmod is per URL and comes from guides/build_dates.py, which resolves it
 * from git where the full history exists and commits the answer. Reading git
 * here instead looked right locally and quietly failed on Vercel, whose deploy
 * is a shallow clone: `git log` found nothing for twenty-nine of the guides and
 * every one of them fell back to the build time — which is the "all forty pages
 * changed at once" signal this is meant to replace.
 */
const dateFor = (slug: string, fallback: string) =>
  new Date(GUIDE_DATES.find(d => d.slug === slug)?.modified ?? fallback);

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  const pages: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(ROUTE_DATES.home ?? now),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/companies`,
      lastModified: new Date(ROUTE_DATES.companies ?? now),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/tools`,
      lastModified: new Date(ROUTE_DATES.tools ?? now),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
  ];

  for (const b of BUNDLES) {
    pages.push({
      url: `${SITE_URL}/bundles/${b.slug}`,
      lastModified: new Date(ROUTE_DATES.bundles ?? now),
      changeFrequency: 'weekly',
      priority: 0.9,
    });
  }

  for (const g of GUIDES) {
    pages.push({
      url: `${SITE_URL}/guides/${g.slug}`,
      lastModified: dateFor(g.slug, now),
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  }

  return pages;
}
