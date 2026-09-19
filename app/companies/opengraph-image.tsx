import { ImageResponse } from 'next/og';

import { COMPANIES, LAYERS } from '../../lib/companies';
import { OgCard, OG_SIZE, ogFonts } from '../../lib/og-card';

export const size = OG_SIZE;
export const contentType = 'image/png';
export const alt = 'The players — every company the WTF Agents guides name';

export default async function Image() {
  return new ImageResponse(
    (
      <OgCard
        counter={`${COMPANIES.length} COMPANIES / ${LAYERS.length} LAYERS`}
        title="The"
        titleTail="players"
        standfirst="Every company, product and standard the guides name, sorted into the eight layers of the agentic economy."
        note="WTFAGENTS.COM"
      />
    ),
    { ...size, fonts: ogFonts() },
  );
}
