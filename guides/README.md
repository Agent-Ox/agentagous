# Guide pipeline

One renderer, one markdown file per guide. Replaces the twelve near-identical
`generate_guide_N.py` scripts that used to live in the repo root.

```
guides/content/<slug>.md   content + front-matter (source of truth)
guides/render.py           markdown -> public/guides/<file>.pdf
guides/build_catalogue.py  front-matter -> lib/guides.generated.ts
build_bundles.py           singles -> the two bundle PDFs
regenerate_all_guides.py   runs all three, in order
```

## Commands

```bash
python3 regenerate_all_guides.py          # everything
python3 guides/render.py                  # all PDFs
python3 guides/render.py polsia claude    # named slugs only
python3 guides/render.py --out /tmp/x     # render elsewhere, e.g. to diff
python3 guides/build_catalogue.py         # refresh the store catalogue
```

The catalogue is generated, so **`lib/guides.generated.ts` is never edited by
hand** — change the front-matter and re-run `build_catalogue.py`.

## Front-matter

```yaml
---
slug: polsia                       # url + content filename
title: WTF is Polsia               # store title
file: wtf-is-polsia.pdf            # output filename
cover_title: WTF is                # cover, line 1 (white)
cover_subtitle: Polsia?            # cover, line 2 (orange)
cover_title_size: 38               # optional, 32 for long titles
cover_gap: 3                       # optional mm gap under the cover rule
cover_meta: WTF Agents · wtfagents.com · March 2026
subtitle: >-                       # cover standfirst
  A solo founder. Zero employees...

# store catalogue fields
order: 4                           # position in the store listing
description: ...                   # store card copy
price: 7
category: platforms                # foundation | platforms | claude | practical
badge: 🔥 Most popular             # or null
featured: true
relatedTool: polsia                # optional, slug from lib/affiliates.ts

read_next:                         # closing "Liked this? Go deeper." list
  - title: WTF is OpenClaw
    desc: ...
    url: wtfagents.com/store
---
```

## Body dialect

Line-oriented. Blank lines separate paragraphs. Inline reportlab markup
(`<b>`, `<i>`, `<link href="...">`, `<font color="...">`) is passed through
verbatim — it is not markdown, and `**bold**` will not work.

| Syntax | Renders as |
|---|---|
| `## Heading` | Section heading + orange rule |
| `### Heading` | Subheading |
| plain text | Body paragraph (justified) |
| `- item` | Bullet |
| `> text` | Callout (bold white) |
| `@lead text` | Orange bold lead-in (`body_lead`) |
| `@stat 40% \|\| caption` | Big centred figure with caption |
| `@small text` | Small grey note |
| `@link text` | Orange indented link line |
| `@<style> text` | Any style in the registry (`gl`, `cap`, `quote`, `caveat`, `step`, `step_num`, `task`, `role`, `person`, `prod`, `acc`, `cat`, `ev`, …) |
| `@spacer 6` | 6 mm vertical space |
| `@rule` / `@zinc_rule` | Orange 2pt rule / thin zinc rule |
| `@pagebreak` | Page break |

### Tables

```
@table keep 40,60,60          # optional `keep` = don't split across pages;
@tcells hs-row+col            # then column widths in mm
@tstyle BACKGROUND 0,0 -1,0 ZINC_800
@tstyle GRID 0,0 -1,-1 0.5 ZINC_600
| Header | Col 2 | Col 3 |
| Row    | a     | b     |
```

- `@tcells` — `hs-row` (header row), `hs-row+col` (header row *and* first
  column), `raw` (plain strings, styled by `@tstyle`), or an explicit grid such
  as `hs,cs,cs|cs,cs,cs`.
- `@tstyle` — reportlab `TableStyle` commands, one per line. Coordinates are
  `x,y`; colours use the palette names (`ORANGE`, `DARK_BG`, `ZINC_900`,
  `ZINC_800`, `ZINC_600`, `ZINC_400`, `ZINC_300`, `WHITE`, `GREEN`, `RED`).

## What the renderer owns

The cover, the closing block and page furniture are generated, not written in
the content files:

- **Cover** — built from front-matter, then a page break.
- **Closing** — the `read_next` list, the store CTA, the QR block (linking to
  `wtfagents.com/store`) and the two footer lines. Edit `QR_TEXT`, `CTA_HEAD`,
  `CTA_BODY` and `CTA_LINK` in `render.py` to change these for all 12 guides at
  once.
- **Page furniture** — dark background, orange top bar and the centred
  `wtfagents.com · Page N · © 2026 WTF Agents` footer, via `on_page`.

## Adding a guide

1. Write `guides/content/<slug>.md` with the front-matter above.
2. `python3 regenerate_all_guides.py`
3. Add a Stripe price and map the slug in `app/api/store-checkout/route.ts`.
4. Add the slug to the bundles in `lib/guides.ts` if it belongs in one.
