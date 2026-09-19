import { GUIDES, bundleBySlug, guideBySlug } from './guides';

/**
 * What to offer someone who has just bought.
 *
 * The credit is what they actually paid, read off the verified purchase —
 * never the catalogue price. Those are usually the same, but they diverge the
 * moment anything is discounted, and crediting a list price against a
 * discounted payment gives away the difference.
 */
export type Upsell = {
  /** Cents of credit against the Complete Pack. */
  creditCents: number;
  /** Price they pay, in dollars. */
  price: number;
  headline: string;
  body: string;
};

export const COMPLETE_SLUG = 'complete-pack';

const money = (cents: number) =>
  cents % 100 === 0 ? `$${cents / 100}` : `$${(cents / 100).toFixed(2)}`;

export function upsellFor(slug: string, paidCents?: number): Upsell | null {
  const complete = bundleBySlug(COMPLETE_SLUG);
  if (!complete || slug === COMPLETE_SLUG) return null;

  const starter = bundleBySlug('starter-pack');
  const isStarter = slug === 'starter-pack';
  const guide = isStarter ? undefined : guideBySlug(slug);
  if (!isStarter && !guide) return null;
  if (isStarter && !starter) return null;

  // Fall back to the catalogue price only when the paid amount is unknown.
  const listCents = (isStarter ? starter!.price : guide!.price) * 100;
  const credit = Number.isFinite(paidCents) && (paidCents as number) > 0
    ? (paidCents as number)
    : listCents;

  const completeCents = complete.price * 100;
  // Nothing left to sell if they have already paid the full price.
  if (credit >= completeCents) return null;

  const payCents = completeCents - credit;
  const price = Math.round(payCents / 100);

  if (isStarter) {
    const remaining = GUIDES.length - GUIDES.filter(g => g.starter).length;
    return {
      creditCents: credit,
      price,
      headline: 'Complete your set',
      body: `You have the ${starter!.title.replace(/^The /, '')}. The other ${remaining} guides `
        + `for ${money(payCents)} — the ${money(credit)} you just paid comes straight off.`,
    };
  }

  return {
    creditCents: credit,
    price,
    headline: `Get all ${GUIDES.length} for ${money(payCents)}`,
    body: `You have ${guide!.title}. The Complete Pack is ${money(completeCents)}, and the `
      + `${money(credit)} you just paid comes straight off it.`,
  };
}
