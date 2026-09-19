# WTF Agents — design system

Measured from the six carousel reference screenshots kept alongside this file
in `design/reference/` (`Screenshot 2026-09-19 at 11.40.43` … `11.41.50`,
960×1200 each). Every value below was sampled from the pixels rather than
estimated by eye; the measurement is quoted next to each so it can be
re-checked against the originals.

Status: **shipping**. Applied to the homepage, all 23 guide PDFs and both
bundle PDFs. `render.py --style classic` still renders the previous orange
system, for comparison.

---

## 1. Colour

| Token | Value | Measured from |
|---|---|---|
| `--accent` | `#E4484C` | Modal colour of the "FREE" badge fill. Across the six references the badge samples `#B9332F`, `#D53831`, `#E94A4C`, `#D33836`, `#E4484C` — the spread is the badge's own glow, so the modal of the cleanest frame is taken as true. |
| `--accent-bright` | `#E93E42` | Peak saturation of the red headline phrase ("full cartoon explainer."). Used only for type set in red. |
| `--ink-on-accent` | `#1A0507` | Glyph core of "FREE" sitting on the badge. Reads as near-black with a red cast — never pure black, never white. |
| `--canvas` | `#0A0405` | Modal of the bottom-right quadrant, furthest from the glow: `#0D0100`, `#0F0100`, `#110101`. A red-tinted black, not neutral. |
| `--card` | `#0A0506` | Card interior, sampled inside the stroke at `#080303`. Within a hair of the canvas — **cards are defined by their stroke and glow, not by fill contrast.** |
| `--stroke` | `rgba(228,72,76,0.72)` | Stroke peak `#9E3B3E` over `--card`. The flat sample reads ≈45% accent, but the reference edge is *lit* — its apparent brightness comes from the bloom around it, so the stroke is set at 72% and carries `0 0 22px rgba(228,72,76,.30)` outside plus `inset 0 0 22px rgba(228,72,76,.05)`. Matching the sampled value alone renders a dead hairline. |
| `--text` | `#F7F7F7` | Modal glyph core of the white headline. |
| `--body` | `#B1B1B1` | Modal glyph core of a body paragraph, taking only near-neutral pixels above 120 luminance. **An earlier pass recorded `#E9E8E9` by sampling the single brightest pixel — that is an antialiasing outlier, not the type colour.** Body copy is a clear step below headings and a clear step above `--muted`. |
| `--muted` | `#928F8E` | Counter label peak. Zinc-500 equivalent. |
| `--dim` | `#6B6867` | Footer and de-emphasised counters; interpolated one step below `--muted`. |

### The glow

One per screen, anchored in a corner, **never behind text**.

Sampled down the diagonal from the top-left corner:

```
d=30  #82180F   d=90  #300402   d=150 #110101
d=60  #510B07   d=120 #190201   d=180 #0B0000  ← background reached
```

So: core `#B8261B` (noticeably more orange than `--accent`), falling to canvas by
**~19% of canvas width**. As CSS:

```css
background:
  radial-gradient(60% 45% at 0% 0%, rgba(184,38,27,.55) 0%, rgba(184,38,27,.16) 38%, transparent 72%),
  var(--canvas);
```

The falloff is steep — at 40% of the radius it is already at 18% luminance. A
soft, wide glow is the wrong look.

---

## 2. Geometry

Measured on the `11.41.37` frame (canvas 960×1200):

| Property | Measured | Token |
|---|---|---|
| Card bounding box | 812 × 217 px, x 76→888 | — |
| Card width | **84.6%** of canvas, 7.9% side margins | `--pad-x: 8%` |
| Card corner radius | **26 px** — stroke reaches the edge 24px below the top, offset 26px in | `--r-card: 24px` |
| Card stroke width | **2 px** (peak at x=77–78, background by x=80) | `--stroke-w: 1.5px` |
| Badge tab | 196 × 66 px, right edge flush with card right, top edge flush with card top | `--r-badge: 22px` |
| Badge as % of card | 24% wide, 30% tall | — |
| Counter rule | 40 px long × 3 px thick | `--rule: 40px × 2px` |

**Badge tab shape.** Anchored to the card's top-right corner and offset outwards
by the stroke width so it sits on the card's outer edge rather than inside it.
Its top-right corner **follows the card's radius**; the two free corners are
rounded; the top-left is square where it meets the card's top edge:
`border-radius: 0 24px 22px 22px`. It is a tab hanging off the top edge, not a
floating pill. Rendering it as `0 0 22px 22px` leaves a visible notch where the
card corner curves away behind it.

**Pill shape** (the two outline buttons): fully rounded, `border-radius: 999px`,
1px accent stroke at ~55% opacity, transparent fill, no glow.

---

## 3. Counter

The signature element. Red rule, gap, spaced caps — and **the slash is red while
the rest is muted**:

```
▬▬▬  T O O L   0 5  /  0 5
```

- Rule: 40×2px, `--accent`, vertically centred on the cap height
- Gap: 16px
- Label: 13px / 700 / `letter-spacing: 0.24em` / `--muted` / uppercase
- Separator `/`: same size and weight, `--accent`

---

## 4. Type

**Montserrat** — the closest Google Fonts match to the reference. Confirmed
against the letterforms in the cropped headline and body: double-storey `a`,
straight diagonal tail on `y` ("storyboards"), circular `o`/`c`/`e`, tall
x-height, wide apertures. It is not Poppins or Futura, both of which set a
single-storey `a`.

**Two weights only: 400 and 700.** The reference uses nothing between.

| Role | Size / line-height | Weight | Tracking |
|---|---|---|---|
| Wordmark, nav, category label | 13 / 1 | 700 | `0.24em` |
| Counter | 13 / 1 | 700 | `0.24em` |
| Hero headline | 64 / 1.08 | 700 | `-0.02em` |
| Card title | 30 / 1.15 | 700 | `-0.01em` |
| Bundle / guide title | 22 / 1.2 | 700 | `-0.01em` |
| Body | 17 / 1.6 | 400 | `0` |
| Badge | 15 / 1 | 700 | `0.08em` |
| Button | 15 / 1 | 700 | `0.02em` |
| Footer | 13 / 1 | 400 | `0.12em` |

Ratios preserved from the reference: headline ≈ 2.5× body, counter ≈ 0.75× body,
body line-height 1.56–1.6 (measured 39/25).

**The red phrase.** Headlines carry exactly one phrase in `--accent-bright`,
always the payoff at the end — "All the AI. / **0% BS.**", "…becomes a **full
cartoon explainer.**" Guide card titles put only the **last word** in red.

---

## 5. Spacing

4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128

Card padding 32px; 40px on the hero. Gap between cards 24px. Section rhythm 96px
at desktop, 64px at mobile.

---

## 6. Rules

1. **One glow per screen.** Corner only. Never behind text. A second glow makes
   it look like a template.
2. **No other decoration.** No gradients on cards, no shadows, no icons, no
   image fills, no dividers beyond the counter rule and the heading rule.
3. **Cards are stroke + glow**, not fill. Do not lighten card interiors to
   separate them.
4. **Red is for one phrase, the counter slash, rules, badges and strokes.**
   Nothing else. Body copy is never red.
5. **Text on red is `--ink-on-accent`**, never white — the reference badge is
   dark-on-red and that contrast inversion is load-bearing.

---

## 7. The closing page

Every guide ends with the same block, and it has to fit on one page — a
stranded QR or a single orphaned card trips `layoutcheck.py`'s sparse-final-page
rule. Order and budget:

1. `Go deeper` counter
2. CTA card — heading, body, the two bundle pills, the store link
3. QR card — 21mm code plus its caption, which carries the `/companies` link
4. Five Go-deeper cards, each a linked title, a description and a linked URL

The QR sits **above** the Go-deeper list rather than at the end. Trailing it
left it alone on a final page at 2.6% ink. The budget is tight: a guide's own
closing intro wraps to one or two lines, and the two-line ones start ~17pt
lower, so the block is sized against that worst case with ~30pt to spare.

Spacers go **between** cards, never after the last one — a trailing spacer at
the foot of a full page spills a blank page of its own.
