import { ImageResponse } from 'next/og';

import { GUIDE_COUNT, MIN_GUIDE_PRICE } from '../lib/guides';
import { OgCard, OG_SIZE, ogFonts } from '../lib/og-card';

export const size = OG_SIZE;
export const contentType = 'image/png';
export const alt = 'WTF Agents — All the AI. 0% BS.';

export default async function Image() {
  return new ImageResponse(
    (
      <OgCard
        counter={`${GUIDE_COUNT} GUIDES`}
        title="All the AI."
        titleTail="0% BS."
        standfirst="Plain-English guides to the agentic economy. Read every guide free, or take the PDF."
        note={`$${MIN_GUIDE_PRICE} · PDF`}
      />
    ),
    { ...size, fonts: ogFonts() },
  );
}
