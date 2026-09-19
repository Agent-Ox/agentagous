import { execFileSync } from 'child_process';
import type { MetadataRoute } from 'next';

import { GUIDES, BUNDLES } from '../lib/guides';
import { SITE_URL } from '../lib/design';
import { guideDates } from '../lib/guide-source';

/**
 * Static routes plus one entry per guide. The guides carry the highest priority
 * after the homepage: they are the pages worth indexing.
 *
 * lastmod comes from git, per URL, so it says something. Stamping every entry
 * with the build time — which is what this did — tells a crawler that all forty
 * pages changed on every deploy, which is both false and useless: the signal
 * only works if it distinguishes the page that changed from the thirty-nine
 * that did not.
 */

/** Last commit touching any of these paths, as a Date. */
function lastCommit(paths: string[], fallback: Date): Date {
  try {
    const out = execFileSync('git', ['log', '-1', '--format=%cI', '--', ...paths], {
      cwd: process.cwd(),
      encoding: 'utf8',
    }).trim();
    return out ? new Date(out) : fallback;
  } catch {
    // Shallow clones and source-less deploys have no history to read.
    return fallback;
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // The homepage changes whenever the catalogue or the page itself does.
  const home = lastCommit(['app/page.tsx', 'lib/guides.generated.ts'], now);

  const pages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: home, changeFrequency: 'weekly', priority: 1 },
    {
      url: `${SITE_URL}/companies`,
      lastModified: lastCommit(['lib/companies.ts', 'app/companies/page.tsx'], now),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/tools`,
      lastModified: lastCommit(['lib/tools.ts', 'app/tools/page.tsx'], now),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
  ];

  for (const b of BUNDLES) {
    pages.push({
      url: `${SITE_URL}/bundles/${b.slug}`,
      lastModified: lastCommit(['guides/bundles.py', 'lib/guides.generated.ts'], now),
      changeFrequency: 'weekly',
      priority: 0.9,
    });
  }

  for (const g of GUIDES) {
    pages.push({
      url: `${SITE_URL}/guides/${g.slug}`,
      lastModified: new Date(guideDates(g.slug).modified),
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  }

  return pages;
}
