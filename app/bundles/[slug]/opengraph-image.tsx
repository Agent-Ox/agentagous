import { ImageResponse } from 'next/og';

import { BUNDLES, bundleBySlug } from '../../../lib/guides';
import { BUNDLE_STATS } from '../../../lib/bundle-stats.generated';
import { OgCard, OG_SIZE, ogFonts } from '../../../lib/og-card';
import { splitLastWord } from '../../../lib/design';

export const size = OG_SIZE;
export const contentType = 'image/png';
export const alt = 'A WTF Agents bundle';
export const dynamicParams = false;

export function generateStaticParams() {
  return BUNDLES.map(b => ({ slug: b.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const bundle = bundleBySlug(slug);
  if (!bundle) return new Response('Not found', { status: 404 });

  const pages = BUNDLE_STATS.find(s => s.slug === slug)?.pages;
  const [head, last] = splitLastWord(bundle.title);

  return new ImageResponse(
    (
      <OgCard
        counter={`${bundle.includes.length} GUIDES${pages ? ` / ${pages} PAGES` : ''}`}
        title={head}
        titleTail={last}
        standfirst={bundle.description}
        note={`$${bundle.price} · PDF`}
      />
    ),
    { ...size, fonts: ogFonts() },
  );
}
