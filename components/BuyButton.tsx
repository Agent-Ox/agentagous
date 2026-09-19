/**
 * A buy button is a link to /buy/<slug>, which creates the Checkout Session
 * server-side and redirects to Stripe.
 *
 * It used to be a client component that POSTed to an API route and then set
 * window.location. A link does the same job with no JavaScript on the page,
 * works on a middle-click or "open in new tab", and cannot end up disabled by
 * a hydration failure. Every page that only had a buy button is now fully
 * static with no client bundle of its own.
 */
export default function BuyButton({
  slug,
  className,
  children,
}: {
  slug: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a href={`/buy/${slug}`} className={className} rel="nofollow">
      {children}
    </a>
  );
}
