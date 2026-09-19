import type { Metadata } from 'next';

import DirectoryPage, { Tile } from '../../components/DirectoryPage';
import { COMPANIES, LAYERS, companiesByLayer } from '../../lib/companies';
import { SITE_URL } from '../../lib/design';

export const metadata: Metadata = {
  title: 'The players — WTF Agents',
  description:
    'Every company, product and standard named across the WTF Agents guides, sorted into the eight layers of the agentic economy.',
  alternates: { canonical: `${SITE_URL}/companies` },
};

/** Rebuilt hourly, which is what makes the one live number on this page live. */
export const revalidate = 3600;

/**
 * Polsia's active-company count, from the dashboard the guides cite.
 *
 * This is the only live figure on the page. Everything else is the guides'
 * own copy, and a number that silently went stale would be worse than no
 * number at all — so a failed or unparseable fetch renders nothing.
 */
async function polsiaActive(): Promise<string | null> {
  try {
    const res = await fetch('https://polsia.imrat.com/api/data', { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    const data = await res.json();
    const raw = data?.stats?.companies ?? data?.companies;
    const n = parseInt(String(raw), 10);
    if (!Number.isFinite(n) || n <= 0) return null;
    return `${n.toLocaleString()} companies created, live now`;
  } catch {
    return null;
  }
}

export default async function CompaniesPage() {
  const note = await polsiaActive();

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
        note: c.slug === 'polsia' && note ? note : undefined,
      };
    }),
  }));

  return (
    <DirectoryPage
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
