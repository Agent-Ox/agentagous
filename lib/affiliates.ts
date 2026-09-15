// Outbound partner/affiliate destinations, surfaced on /tools and linked
// through /go/[slug] so every click is logged.
//
// TODO: every `url` below is an empty placeholder. Fill each one in with the
// real affiliate/referral link before sending traffic. While a url is empty the
// /tools card renders as "Link coming soon" and /go/<slug> sends the visitor to
// /tools rather than off-site, so nothing points at a guessed domain.

export type Affiliate = {
  slug: string;
  name: string;
  url: string;
  blurb: string;
  category: string;
};

export const AFFILIATES: Affiliate[] = [
  {
    slug: 'polsia',
    name: 'Polsia',
    url: '',
    blurb: 'Run an AI company for the price of a Netflix subscription.',
    category: 'Autonomous company platforms',
  },
  {
    slug: 'openclaw',
    name: 'OpenClaw',
    url: '',
    blurb: 'Open-source personal agent you talk to from WhatsApp or Telegram.',
    category: 'Personal agents',
  },
  {
    slug: 'paperclip',
    name: 'Paperclip',
    url: '',
    blurb: 'Org charts for AI agents. Teams of agents, not one.',
    category: 'Agent teams',
  },
];

export function affiliateBySlug(slug: string): Affiliate | undefined {
  return AFFILIATES.find(a => a.slug === slug);
}

/** Affiliates grouped by category, preserving the order declared above. */
export function affiliatesByCategory(): { category: string; items: Affiliate[] }[] {
  const groups: { category: string; items: Affiliate[] }[] = [];
  for (const a of AFFILIATES) {
    const existing = groups.find(g => g.category === a.category);
    if (existing) existing.items.push(a);
    else groups.push({ category: a.category, items: [a] });
  }
  return groups;
}
