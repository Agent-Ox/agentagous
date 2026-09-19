import { ImageResponse } from 'next/og';

import { TOOLS, TOOL_CATEGORIES } from '../../lib/tools';
import { OgCard, OG_SIZE, ogFonts } from '../../lib/og-card';

export const size = OG_SIZE;
export const contentType = 'image/png';
export const alt = 'The stack — what a one-person business actually runs on';

export default async function Image() {
  return new ImageResponse(
    (
      <OgCard
        counter={`${TOOLS.length} TOOLS / ${TOOL_CATEGORIES.length} SEATS`}
        title="The"
        titleTail="stack"
        standfirst="What a one-person business actually runs on. Buy the $20 AI plan first; add the rest when you can name the output."
        note="WTFAGENTS.COM"
      />
    ),
    { ...size, fonts: ogFonts() },
  );
}
