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
