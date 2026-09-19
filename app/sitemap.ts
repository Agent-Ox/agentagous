import type { MetadataRoute } from 'next';

import { GUIDES } from '../lib/guides';
import { SITE_URL } from '../lib/design';

/**
 * Static routes plus one entry per guide. The guides carry the highest priority
 * after the homepage: they are the pages worth indexing.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: 'daily', priority: 1 },
    { url: `${SITE_URL}/companies`, lastModified: now, changeFrequency: 'daily', priority: 0.7 },
    { url: `${SITE_URL}/tools`, lastModified: now, changeFrequency: 'weekly', priority: 0.6 },
  ];

  for (const g of GUIDES) {
    pages.push({
      url: `${SITE_URL}/guides/${g.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  }

  return pages;
}
