/**
 * Design tokens, measured from the reference screenshots and documented in
 * DESIGN.md. The homepage and the guide pages both read from here so the two
 * cannot drift apart — if a value changes it changes in one place.
 */
export const C = {
  accent: '#E4484C',
  accentBright: '#E93E42',
  inkOnAccent: '#1A0507',
  canvas: '#0A0405',
  card: '#0A0506',
  stroke: 'rgba(228,72,76,.72)',
  strokeSoft: 'rgba(228,72,76,.28)',
  hairline: 'rgba(228,72,76,.35)',
  text: '#F7F7F7',
  body: '#B1B1B1',
  muted: '#928F8E',
  dim: '#6B6867',
} as const;

/** One glow per screen, corner only, never behind text — DESIGN.md §1. */
export const GLOW =
  'radial-gradient(60% 45% at 0% 0%, rgba(184,38,27,.55) 0%, rgba(184,38,27,.16) 38%, transparent 72%)';

export const CARD_SHADOW =
  '0 0 22px rgba(228,72,76,.30), inset 0 0 22px rgba(228,72,76,.05)';

export const SITE_URL = 'https://www.wtfagents.com';

/** Splits a title so the last word can be set in the accent — DESIGN.md §4. */
export function splitLastWord(title: string): [string, string] {
  const i = title.trim().lastIndexOf(' ');
  if (i === -1) return ['', title];
  return [title.slice(0, i), title.slice(i + 1)];
}

export const pad2 = (n: number) => String(n).padStart(2, '0');
