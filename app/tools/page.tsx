import type { Metadata } from 'next';

import DirectoryPage, { Tile } from '../../components/DirectoryPage';
import { TOOLS, TOOL_CATEGORIES, toolsByCategory } from '../../lib/tools';
import { SITE_URL } from '../../lib/design';

export const metadata: Metadata = {
  title: 'The stack — WTF Agents',
  description:
    'The tools the WTF Agents guides tell you to actually buy: the AI plan first, then voice, video, design, decks, research and automation.',
  alternates: { canonical: `${SITE_URL}/tools` },
};

export default function ToolsPage() {
  const groups = toolsByCategory().map(g => ({
    label: g.category,
    items: g.items.map<Tile>(t => ({
      slug: t.slug,
      name: t.name,
      one_line: t.one_line,
      // Everything outbound goes through /go/<slug> so the click is logged;
      // that route prefers affiliate_url when there is one.
      href: `/go/${t.slug}`,
      pill: 'Visit',
      external: true,
    })),
  }));

  return (
    <DirectoryPage
      counter={
        <div className="d-counter">
          <span className="d-rule" />
          <span>
            {TOOLS.length} Tools <span className="d-slash">/</span> {TOOL_CATEGORIES.length} Seats
          </span>
        </div>
      }
      title="The"
      titleTail="stack"
      standfirst="What a one-person business actually runs on. Buy the $20 AI plan first — it fills three seats on its own — and add the rest only when you can name the output."
      groups={groups}
    />
  );
}
