import { Guide } from './guides';

/**
 * Category ids and their labels, in the order the site shows them. Lives here
 * rather than beside the card components so the client-side menu can import
 * the list without pulling the server-rendered cards in with it.
 *
 * Adding a category means adding it here and to the union in lib/guides.ts —
 * the two places, and no others.
 */
export const CATEGORIES: { id: Guide['category']; label: string }[] = [
  { id: 'foundation', label: 'Foundation' },
  { id: 'map', label: 'The Map' },
  { id: 'claude', label: 'Claude & Anthropic' },
  { id: 'work', label: 'Work Agents' },
  { id: 'personal', label: 'Personal Agents' },
  { id: 'platforms', label: 'Platforms' },
  { id: 'practical', label: 'Practical' },
  { id: 'creative', label: 'Creative tools' },
];
