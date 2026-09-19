import { GUIDES, bundleBySlug, guideBySlug } from './guides';

/**
 * What to offer someone who has just bought.
 *
 * The credit is always what they actually paid, so the upsell never costs them
 * twice for the same guides. It is computed from the verified purchase on the
 * server, never from anything in the URL.
 */
export type Upsell = {
  /** Cents of credit against the Complete Pack. */
  creditCents: number;
  /** Price they pay, in whole dollars. */
  price: number;
  headline: string;
  body: string;
};

export const COMPLETE_SLUG = 'complete-pack';

export function upsellFor(slug: string): Upsell | null {
  const complete = bundleBySlug(COMPLETE_SLUG);
  if (!complete || slug === COMPLETE_SLUG) return null;

  const starter = bundleBySlug('starter-pack');

  if (slug === 'starter-pack' && starter) {
    const remaining = GUIDES.length - GUIDES.filter(g => g.starter).length;
    return {
      creditCents: starter.price * 100,
      price: complete.price - starter.price,
      headline: 'Complete your set',
      body: `You have the ${starter.title.replace(/^The /, '')}. The other ${remaining} guides `
        + `for $${complete.price - starter.price} — your $${starter.price} comes straight off.`,
    };
  }

  const guide = guideBySlug(slug);
  if (!guide) return null;
  return {
    creditCents: guide.price * 100,
    price: complete.price - guide.price,
    headline: `Get all ${GUIDES.length} for $${complete.price - guide.price}`,
    body: `You have ${guide.title}. The Complete Pack is $${complete.price}, and the `
      + `$${guide.price} you just paid comes straight off it.`,
  };
}
