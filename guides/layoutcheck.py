#!/usr/bin/env python3
"""Layout QA for the rendered guide PDFs.

Catches the failure modes that a content or style change can introduce without
anyone noticing: text or table rules escaping the content box, blank pages, and
section headings stranded at the foot of a page.

Overflow and blank pages are errors and fail the build. Orphaned headings are
reported as warnings: they are a typographic nicety, there is a pre-existing
backlog of them, and the fix (keepWithNext on section_heading) reflows every
guide, so it should be a deliberate change rather than a side effect.

    python3 guides/layoutcheck.py                     # every PDF in public/guides
    python3 guides/layoutcheck.py public/guides/x.pdf # specific files

Exits non-zero on errors only, so it can gate a build.
"""
import os
import sys

import fitz
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(HERE)
GUIDES_DIR = os.path.join(REPO, 'public', 'guides')

MM = 72 / 25.4
LEFT = RIGHT = 20 * MM
TOP = BOT = 22 * MM
TOL = 1.5                 # pt of slack before an overhang counts as overflow
FOOTER_BAND = 45          # pt at the page foot reserved for the page-number line
FOOTER_PREFIX = 'wtfagents.com'

# section_heading is 20pt. stat_num (26), step_num (32) and the cover styles
# (32/38) are also large and bold, so match the size precisely rather than
# treating everything big as a heading.
HEADING_SIZE_RANGE = (19.5, 20.5)

# Ink coverage. Counting text spans cannot tell a full page from one carrying a
# QR code and two grey sign-off lines: both have spans. Measuring what is
# actually painted inside the content box can.
BG_RGB = (9, 9, 11)        # DARK_BG #09090b
INK_TOL = 18               # per-channel distance before a pixel counts as ink
INK_DPI = 100
MIN_FINAL_INK_PCT = 5.0    # the Go-deeper page measures 6-7%; a QR-only page 3.3%
MIN_FINAL_EXTENT_PCT = 35.0  # Go-deeper reaches ~75% down the box; QR-only ~24%


def ink_and_extent(page):
    """(ink % of content box, how far down the box content reaches, in %)."""
    pix = page.get_pixmap(dpi=INK_DPI)
    img = Image.frombytes('RGB', (pix.width, pix.height), pix.samples)
    sx, sy = pix.width / page.rect.width, pix.height / page.rect.height
    box = img.crop((int(LEFT * sx), int(TOP * sy),
                    int((page.rect.width - RIGHT) * sx),
                    int((page.rect.height - BOT) * sy)))
    w, h = box.size
    data = box.tobytes()          # RGB triples, row-major
    inked = 0
    lowest = 0
    br, bg, bb = BG_RGB
    for i in range(0, len(data), 3):
        if (abs(data[i] - br) > INK_TOL or abs(data[i + 1] - bg) > INK_TOL
                or abs(data[i + 2] - bb) > INK_TOL):
            inked += 1
            row = (i // 3) // w
            if row > lowest:
                lowest = row
    return 100.0 * inked / (w * h), 100.0 * lowest / h


def body_spans(page, H):
    """Text spans excluding the page-number footer drawn by on_page()."""
    out = []
    for block in page.get_text('dict')['blocks']:
        for line in block.get('lines', []):
            for sp in line['spans']:
                text = sp['text'].strip()
                if not text:
                    continue
                if sp['bbox'][1] > H - FOOTER_BAND and text.startswith(FOOTER_PREFIX):
                    continue
                out.append(sp)
    return out


WARN_KINDS = {'ORPHANED HEADING'}


# The closing sign-off lines. A page carrying these and nothing else is blank in
# practice: two 8.5pt grey lines at the top of an otherwise empty sheet.
CLOSING_FOOTER = ('WTF Agents \u00b7 wtfagents.com \u00b7', '\u00a9 2026 WTF Agents')


def effectively_blank(spans):
    """True when a page has no body text, or only the closing sign-off."""
    if not spans:
        return True
    return all(sp['text'].strip().startswith(CLOSING_FOOTER) for sp in spans)


def check(path):
    doc = fitz.open(path)
    W, H = doc[0].rect.width, doc[0].rect.height
    x0_lim, x1_lim, y1_lim = LEFT, W - RIGHT, H - BOT
    problems = []

    for pno, page in enumerate(doc, 1):
        spans = body_spans(page, H)

        if effectively_blank(spans):
            detail = ('no body text on this page' if not spans
                      else 'only the closing sign-off on this page')
            problems.append((pno, 'BLANK PAGE', detail))
            continue

        for sp in spans:
            bx0, by0, bx1, by1 = sp['bbox']
            snippet = sp['text'].strip()[:45]
            if bx1 > x1_lim + TOL:
                problems.append((pno, 'RIGHT OVERFLOW', f'x1={bx1:.1f} > {x1_lim:.1f}  "{snippet}"'))
            if bx0 < x0_lim - TOL:
                problems.append((pno, 'LEFT OVERFLOW', f'x0={bx0:.1f} < {x0_lim:.1f}  "{snippet}"'))
            if by1 > y1_lim + TOL:
                problems.append((pno, 'BOTTOM OVERFLOW', f'y1={by1:.1f} > {y1_lim:.1f}  "{snippet}"'))

        # Table rules and boxes. on_page() paints a full-bleed background and a
        # full-width orange bar; both are meant to reach the page edge.
        for drawing in page.get_drawings():
            r = drawing['rect']
            if r.width < 1 and r.height < 1:
                continue
            if r.x0 <= 1 and r.x1 >= W - 1:
                continue
            if r.x1 > x1_lim + TOL or r.x0 < x0_lim - TOL:
                problems.append((pno, 'TABLE RULE OVERFLOW',
                                 f'rect x0={r.x0:.1f} x1={r.x1:.1f} '
                                 f'(limits {x0_lim:.1f}..{x1_lim:.1f})'))

        # Orphaned heading: a section heading with no body text after it on the
        # page. Compare vertical centres — a large heading's box can overlap the
        # line beneath it, so a strict "top below bottom" test gives false hits.
        def centre(sp):
            return (sp['bbox'][1] + sp['bbox'][3]) / 2

        headings = [sp for sp in spans
                    if HEADING_SIZE_RANGE[0] <= sp['size'] <= HEADING_SIZE_RANGE[1]]
        for h in headings:
            following = [sp for sp in spans
                         if sp['size'] < HEADING_SIZE_RANGE[0]
                         and centre(sp) > centre(h) + 1]
            if not following:
                problems.append((pno, 'ORPHANED HEADING',
                                 f'"{h["text"].strip()[:50]}" — nothing follows it on this page'))

    # Final page must carry a real closing page, not a stranded fragment.
    final = doc[len(doc) - 1]
    ink, extent = ink_and_extent(final)
    if ink < MIN_FINAL_INK_PCT or extent < MIN_FINAL_EXTENT_PCT:
        problems.append((len(doc), 'SPARSE FINAL PAGE',
                         f'ink {ink:.1f}% (min {MIN_FINAL_INK_PCT}%), '
                         f'reaches {extent:.0f}% down the box '
                         f'(min {MIN_FINAL_EXTENT_PCT:.0f}%)'))

    doc.close()
    return problems


def main():
    targets = sys.argv[1:]
    if not targets:
        targets = [os.path.join(GUIDES_DIR, f)
                   for f in sorted(os.listdir(GUIDES_DIR)) if f.endswith('.pdf')]

    errors = warnings = 0
    for path in targets:
        problems = check(path)
        errs = [p for p in problems if p[1] not in WARN_KINDS]
        warns = [p for p in problems if p[1] in WARN_KINDS]
        errors += len(errs)
        warnings += len(warns)
        name = os.path.basename(path)
        mark = '✗' if errs else ('!' if warns else '✓')
        print(f'{mark} {name}')
        for pno, kind, detail in errs:
            print(f'    p{pno:<3} ERROR   {kind:22} {detail}')
        for pno, kind, detail in warns:
            print(f'    p{pno:<3} warn    {kind:22} {detail}')

    print()
    print(f'{len(targets)} file(s): {errors} error(s), {warnings} warning(s).')
    if errors:
        return 1
    if warnings:
        print('Warnings do not fail the build. Fix orphaned headings by setting '
              'keepWithNext=True on section_heading in render.py — note that '
              'reflows every guide and will change page counts.')
    return 0


if __name__ == '__main__':
    sys.exit(main())
