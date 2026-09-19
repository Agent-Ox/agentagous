import type { Metadata } from 'next';

import DirectoryPage, { Tile } from '../../components/DirectoryPage';
import { COMPANIES, LAYERS, companiesByLayer } from '../../lib/companies';
import { SITE_URL } from '../../lib/design';
import { graph, collectionPage, directoryList, breadcrumbs } from '../../lib/jsonld';

export const metadata: Metadata = {
  title: 'The players — WTF Agents',
  description:
    'Every company, product and standard named across the WTF Agents guides, sorted into the eight layers of the agentic economy.',
  alternates: { canonical: `${SITE_URL}/companies` },
  openGraph: {
    title: 'The players — WTF Agents',
    description:
      'Every company, product and standard named across the WTF Agents guides, sorted into the eight layers of the agentic economy.',
    url: `${SITE_URL}/companies`,
    siteName: 'WTF Agents',
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: 'The players — WTF Agents' },
};

/**
 * The one figure on the page, and it is static and dated rather than live.
 *
 * It was a fetch against Polsia's public dashboard, but that endpoint is down
 * — polsia.com/api/public/live/dashboard answers "Cannot GET" and the mirror
 * reports a 404 upstream. Rather than leave a number that is silently absent,
 * the page states the figure the Polsia guide states, with the date attached
 * so a reader can see how old it is. Update it when the guide's numbers box
 * is updated; both come from Polsia's own dashboard.
 */
const POLSIA_NOTE = '29,132 active of 484,592 created \u00b7 Sept 2026';

export default function CompaniesPage() {
  const note = POLSIA_NOTE;

  const groups = companiesByLayer().map(g => ({
    label: g.layer,
    items: g.items.map<Tile>(c => {
      const internal = Boolean(c.guide_slug);
      return {
        slug: c.slug,
        name: c.name,
        one_line: c.one_line,
        href: internal ? `/guides/${c.guide_slug}` : `/go/company/${c.slug}`,
        pill: internal ? 'Guide' : 'Visit',
        external: !internal,
        note: c.slug === 'polsia' && note ? note : undefined,
      };
    }),
  }));

  const url = `${SITE_URL}/companies`;
  const description =
    'Every company, product and standard named across the WTF Agents guides, sorted into the eight layers of the agentic economy.';
  const ld = graph([
    collectionPage(url, 'The players', description),
    directoryList('The players', description, COMPANIES, url),
    breadcrumbs([
      { name: 'WTF Agents', url: `${SITE_URL}/` },
      { name: 'The players', url },
    ]),
  ]);

  return (
    <DirectoryPage
      jsonLd={ld}
      counter={
        <div className="d-counter">
          <span className="d-rule" />
          <span>
            {COMPANIES.length} Companies <span className="d-slash">/</span> {LAYERS.length} Layers
          </span>
        </div>
      }
      title="The"
      titleTail="players"
      standfirst="Every company, product and standard the guides name, sorted into the eight layers of the agentic economy. Models at the bottom, picks and shovels underneath everything."
      groups={groups}
    />
  );
}
