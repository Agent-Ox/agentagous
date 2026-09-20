#!/usr/bin/env python3
"""Render the social carousel for every guide.

Six 1080x1350 slides per guide, plus a 1080x1920 cover for Reels and TikTok,
plus a caption. Everything is pulled from the guide's own markdown — the hook,
the numbers box, the @body_lead paragraphs, the who-it-is-for section — so a
carousel cannot say something the guide does not.

Style is DESIGN.md: one corner glow per slide, never behind text; cards are a
lit red edge rather than a hairline; the payoff word of a title and the starred
phrase of a hook are set in the accent.

Output: public/carousels/<slug>/{1..6}.png, cover-story.png, caption.txt
"""
import os
import re
import sys
import textwrap

import numpy as np
import yaml
from PIL import Image, ImageDraw, ImageFilter, ImageFont

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CONTENT = os.path.join(BASE, 'guides', 'content')
FONTS = os.path.join(BASE, 'guides', 'fonts')
OUT_ROOT = os.path.join(BASE, 'public', 'carousels')

W, H = 1080, 1350
STORY = (1080, 1920)
PAD = 88

# DESIGN.md §1
CANVAS = (10, 4, 5)
ACCENT = (228, 72, 76)
ACCENT_BRIGHT = (233, 62, 66)
INK_ON_ACCENT = (26, 5, 7)
TEXT = (247, 247, 247)
BODY = (177, 177, 177)
MUTED = (146, 143, 142)
DIM = (107, 104, 103)
CARD_BG = (10, 5, 6)

SITE = 'wtfagents.com'
HANDLE = '@WTF_AGENTS'

_font_cache = {}


def font(weight, size):
    key = (weight, size)
    if key not in _font_cache:
        _font_cache[key] = ImageFont.truetype(os.path.join(FONTS, f'Montserrat-{weight}.ttf'), size)
    return _font_cache[key]


BOLD = 'Bold'
REG = 'Regular'


# ── markdown extraction ────────────────────────────────────────────────

FRONT = re.compile(r'^---\n(.*?)\n---\n', re.S)


def front_matter(text):
    """Parsed with PyYAML, like build_catalogue.py.

    A hand-rolled reader here silently dropped every field on the guides that
    quote the hook with double quotes rather than single, which is about a
    third of them — the kind of thing that only shows up on the full run.
    """
    m = FRONT.match(text)
    return yaml.safe_load(m.group(1)) if m else {}


def strip_tags(s):
    return re.sub(r'<[^>]+>', '', s).strip()


def body_of(text):
    return FRONT.sub('', text)


def stats(body):
    """`@stat VALUE || caption` -> (value, caption)."""
    out = []
    for line in body.split('\n'):
        m = re.match(r'^@stat\s+(.*?)\s*\|\|\s*(.*)$', line.strip())
        if m:
            out.append((strip_tags(m.group(1)), strip_tags(m.group(2))))
    return out


STOP = set('a an the and or but of to in on for with is are was were it its this that '
            'you your they their them from at as by no not one two'.split())


def _tokens(s):
    return {t for t in re.findall(r"[a-z0-9$%.,']+", s.lower()) if t not in STOP and len(t) > 1}


def pick_stats(all_stats, hook, chosen=None):
    """Which three numbers go on slide 2.

    `carousel_stats: [3, 4, 6]` in the front matter names them by their
    position in the numbers box, one-based, and wins outright.

    Otherwise the three with the most words in common with the hook, which is
    usually right: the hook is already the guide's own summary of what matters,
    so the numbers it echoes are the numbers to lead with. Document order
    breaks ties and fills any gap, so a guide whose hook shares nothing with
    its numbers still gets the first three.
    """
    if chosen:
        picked = [i - 1 for i in chosen if 1 <= i <= len(all_stats)]
        if picked:
            return [all_stats[i] for i in picked[:3]]

    ht = _tokens(hook.replace('*', ''))
    scored = sorted(
        range(len(all_stats)),
        key=lambda i: (-len(ht & _tokens(all_stats[i][0] + ' ' + all_stats[i][1])), i),
    )
    return [all_stats[i] for i in sorted(scored[:3])]


def takeaways(body):
    """The @body_lead paragraphs, shortest-usable first in document order.

    The opening one is usually a definition that runs long; the later ones are
    the "so what". Anything over the budget would have to be shrunk to fit,
    which reads as a wall on a phone, so it is skipped while a shorter one is
    available.
    """
    leads = [strip_tags(l[len('@body_lead '):]) for l in body.split('\n')
             if l.startswith('@body_lead ')]
    good = [t for t in leads if 70 <= len(t) <= 300]
    picked = good[:2]
    if len(picked) < 2:
        rest = [t for t in leads if t not in picked]
        picked += rest[:2 - len(picked)]
    return [t[:300] for t in picked]


def audience(body):
    """Who it is for, from whichever shape the guide uses.

    Fifteen guides use `@fit <b>Yes</b> — ...`. Others write it as
    "### It fits if you:" / "### Skip it if you:" with arrow bullets. Both
    reduce to a verdict and a line.
    """
    fits = []
    for line in body.split('\n'):
        m = re.match(r'^@fit\s+<b>(.*?)</b>\s*—\s*(.*)$', line.strip())
        if m:
            fits.append((m.group(1).strip(), strip_tags(m.group(2))))
    if fits:
        return fits[:3]

    out = []
    for heading, verdict in (('It fits if you', 'Yes'), ('Skip it if you', 'No')):
        m = re.search(r'^###\s*' + heading + r'.*?$\n(.*?)(?=^###|\Z)', body, re.S | re.M)
        if not m:
            continue
        bullets = [strip_tags(b[len('- → '):]) for b in m.group(1).split('\n')
                   if b.strip().startswith('- →')]
        if bullets:
            out.append((verdict, bullets[0]))
    return out


# ── drawing ────────────────────────────────────────────────────────────

def glow(img, corner='tl'):
    """One soft radial in a corner. Built in numpy — PIL has no radial fill."""
    w, h = img.size
    r = int(w * 0.95)
    y, x = np.ogrid[:r * 2, :r * 2]
    d = np.sqrt((x - r) ** 2 + (y - r) ** 2) / r
    a = np.clip(1 - d, 0, 1) ** 1.9 * 0.62
    layer = np.zeros((r * 2, r * 2, 4), dtype=np.uint8)
    layer[..., 0], layer[..., 1], layer[..., 2] = 184, 38, 27
    layer[..., 3] = (a * 255).astype(np.uint8)
    g = Image.fromarray(layer, 'RGBA')
    pos = {'tl': (-r + int(w * 0.16), -r + int(h * 0.10)),
           'tr': (w - r - int(w * 0.16), -r + int(h * 0.10))}[corner]
    img.alpha_composite(g, pos)


def card(img, box, radius=34, bloom=True):
    """Lit red edge with an outer halo and a faint inner one — DESIGN.md §2."""
    x0, y0, x1, y1 = box
    if bloom:
        halo = Image.new('RGBA', img.size, (0, 0, 0, 0))
        ImageDraw.Draw(halo).rounded_rectangle(box, radius, outline=ACCENT + (150,), width=4)
        img.alpha_composite(halo.filter(ImageFilter.GaussianBlur(14)))
    d = ImageDraw.Draw(img)
    d.rounded_rectangle(box, radius, fill=CARD_BG + (255,), outline=ACCENT + (190,), width=3)
    return x0, y0, x1, y1


def counter(d, x, y, label, rule=64):
    """Red rule + spaced caps — DESIGN.md §3."""
    d.rectangle([x, y + 11, x + rule, y + 14], fill=ACCENT)
    f = font(BOLD, 25)
    d.text((x + rule + 24, y), spaced(label), font=f, fill=MUTED)
    return y + 34


def spaced(s, gap=' '):
    return gap.join(s)


def wrap(draw, text, f, max_w):
    words, lines, cur = text.split(), [], ''
    for word in words:
        trial = (cur + ' ' + word).strip()
        if draw.textlength(trial, font=f) <= max_w or not cur:
            cur = trial
        else:
            lines.append(cur)
            cur = word
    if cur:
        lines.append(cur)
    return lines


def rich(draw, xy, parts, f, line_h, max_w):
    """Draw [(text, colour), ...] as wrapped flowing text."""
    x0, y = xy
    x = x0
    for chunk, colour in parts:
        for i, word in enumerate(chunk.split(' ')):
            if not word:
                continue
            piece = word + ' '
            wpx = draw.textlength(piece, font=f)
            if x + wpx > x0 + max_w and x > x0:
                x = x0
                y += line_h
            draw.text((x, y), piece, font=f, fill=colour)
            x += wpx
    return y + line_h


def fit_font(draw, text, weight, max_w, max_lines, start, floor=28):
    """Largest size at which the text still fits the box."""
    size = start
    while size > floor:
        f = font(weight, size)
        if len(wrap(draw, text, f, max_w)) <= max_lines:
            return f
        size -= 2
    return font(weight, floor)


def base(size=(W, H), corner='tl'):
    img = Image.new('RGBA', size, CANVAS + (255,))
    glow(img, corner)
    return img


def footer(d, size, left=None, right=None):
    w, h = size
    y = h - PAD - 34
    d.line([(PAD, y - 34), (w - PAD, y - 34)], fill=(255, 255, 255, 22), width=2)
    f = font(BOLD, 24)
    d.text((PAD, y), spaced(left or 'WTF AGENTS'), font=f, fill=MUTED)
    if right:
        tw = d.textlength(spaced(right), font=f)
        d.text((w - PAD - tw, y), spaced(right), font=f, fill=ACCENT)


# ── slides ─────────────────────────────────────────────────────────────

def split_last_word(title):
    i = title.strip().rfind(' ')
    return (title[:i], title[i + 1:]) if i != -1 else ('', title)


def slide_cover(meta, idx, total, size=(W, H)):
    img = base(size)
    d = ImageDraw.Draw(img)
    w, h = size
    maxw = w - PAD * 2

    counter(d, PAD, PAD, f'GUIDE {idx:02d} / {total}')

    head, last = split_last_word(meta['title'])
    tf = fit_font(d, meta['title'], BOLD, maxw, 3, 104 if h == H else 116)
    hook_plain = meta['hook'].replace('*', '')
    hf = fit_font(d, hook_plain, BOLD, maxw, 4, 50)

    # Measure first, then centre the pair in the band between the counter and
    # the footer — a short title otherwise leaves the bottom half empty.
    tl = len(wrap(d, meta['title'], tf, maxw))
    hl = len(wrap(d, hook_plain, hf, maxw))
    tlh, hlh = int(tf.size * 1.14), int(hf.size * 1.34)
    block = tl * tlh + 34 + hl * hlh
    band_top, band_bottom = PAD + 150, h - PAD - 120
    ty = band_top + max(0, (band_bottom - band_top - block) // 2)

    ty = rich(d, (PAD, ty), [(head + ' ', TEXT), (last, ACCENT_BRIGHT)], tf, tlh, maxw)
    before, red, after = (meta['hook'].split('*') + ['', ''])[:3]
    rich(d, (PAD, ty + 34), [(before, BODY), (red, ACCENT_BRIGHT), (after, BODY)],
         hf, hlh, maxw)

    footer(d, size, right=f"${meta.get('price', '7')} · PDF")
    return img


def slide_premise(meta):
    """Stand-in for slide 2 when a guide has no numbers box.

    Four of the foundation guides explain an idea rather than report on a
    company, so they have no @stat lines. They get their standfirst instead,
    which is the same promise the cover makes, at length.
    """
    img = base((W, H), 'tr')
    d = ImageDraw.Draw(img)
    maxw = W - PAD * 2

    counter(d, PAD, PAD, 'THE SHORT VERSION')
    text = ' '.join((meta.get('subtitle') or meta.get('description', '')).split())
    f = fit_font(d, text, BOLD, maxw, 9, 58, 32)
    lines = wrap(d, text, f, maxw)
    lh = int(f.size * 1.32)
    y = (H - len(lines) * lh) // 2 - 40
    for line in lines:
        d.text((PAD, y), line, font=f, fill=TEXT)
        y += lh

    footer(d, (W, H), right=SITE.upper())
    return img


def slide_numbers(meta, rows, clipped=None):
    img = base((W, H), 'tr')
    d = ImageDraw.Draw(img)
    maxw = W - PAD * 2

    y = counter(d, PAD, PAD, 'BY THE NUMBERS')
    d.text((PAD, y + 26), 'The figures that', font=font(BOLD, 56), fill=TEXT)
    d.text((PAD, y + 92), 'matter', font=font(BOLD, 56), fill=ACCENT_BRIGHT)

    band_top, band_bottom = y + 200, H - PAD - 120
    gap = 26
    cf = font(REG, 29)

    # Each card is as tall as its own content. Stretching three cards to fill
    # the slide leaves a void under the short caption, which reads as a mistake.
    plan = []
    for value, caption in rows[:3]:
        vf = fit_font(d, value, BOLD, maxw - 76, 1, 76, 40)
        full = wrap(d, caption, cf, maxw - 76)
        if len(full) > 3 and clipped is not None:
            clipped.append((meta['slug'], value, ' '.join(full[3:])))
        lines = full[:3]
        plan.append((value, vf, lines, 34 + vf.size + 20 + len(lines) * 40 + 30))

    stack = sum(p[3] for p in plan) + gap * (len(plan) - 1)
    y0 = band_top + max(0, (band_bottom - band_top - stack) // 2)
    for value, vf, lines, card_h in plan:
        card(img, (PAD, y0, W - PAD, y0 + card_h))
        d = ImageDraw.Draw(img)
        d.text((PAD + 38, y0 + 30), value, font=vf, fill=ACCENT_BRIGHT)
        for j, line in enumerate(lines):
            d.text((PAD + 38, y0 + 34 + vf.size + 20 + j * 40), line, font=cf, fill=BODY)
        y0 += card_h + gap

    footer(d, (W, H), right=SITE.upper())
    return img


def slide_takeaway(meta, text, n):
    img = base((W, H), 'tl' if n == 1 else 'tr')
    d = ImageDraw.Draw(img)
    maxw = W - PAD * 2

    counter(d, PAD, PAD, f'TAKEAWAY {n:02d}')
    f = fit_font(d, text, BOLD, maxw, 9, 62, 34)
    lines = wrap(d, text, f, maxw)
    lh = int(f.size * 1.32)
    y = (H - len(lines) * lh) // 2 - 40
    for line in lines:
        d.text((PAD, y), line, font=f, fill=TEXT)
        y += lh

    footer(d, (W, H), right=meta['slug'].upper())
    return img


VERDICT_COLOUR = {'Yes': ACCENT_BRIGHT, 'Not yet': MUTED, 'No': DIM}


def slide_inside(meta):
    """Stand-in for slide 5 when a guide has no who-it-is-for section.

    Over half of them do not: a guide that explains Nvidia or maps the field
    has no yes-or-no verdict to give. Inventing one would be the carousel
    saying something the guide does not, so they get the two card pills and
    the catalogue description — what the guide covers, rather than a made-up
    recommendation.
    """
    img = base((W, H))
    d = ImageDraw.Draw(img)
    maxw = W - PAD * 2

    y = counter(d, PAD, PAD, "WHAT'S INSIDE")
    d.text((PAD, y + 26), 'In this guide', font=font(BOLD, 56), fill=TEXT)

    band_top, band_bottom = y + 170, H - PAD - 120
    pills = [p for p in (meta.get('best_for'), meta.get('capability')) if p]
    bf = font(REG, 32)

    plan = []
    for pill in pills:
        label, _, rest = pill.partition(': ')
        head = (rest or label).strip()
        lines = wrap(d, head, font(BOLD, 42), maxw - 76)[:2]
        plan.append((label if rest else 'Covers', lines))

    desc = ' '.join(meta.get('description', '').split())
    desc_lines = wrap(d, desc, bf, maxw - 76)[:4]

    heights = [30 + len(l) * 52 + 26 for _, l in plan] + [30 + len(desc_lines) * 44 + 30]
    gap = 24
    stack = sum(heights) + gap * (len(heights) - 1)
    y0 = band_top + max(0, (band_bottom - band_top - stack) // 2)

    for (label, lines), h in zip(plan, heights):
        card(img, (PAD, y0, W - PAD, y0 + h))
        d = ImageDraw.Draw(img)
        d.text((PAD + 38, y0 + 26), spaced(label.upper()), font=font(BOLD, 22), fill=ACCENT)
        for j, line in enumerate(lines):
            d.text((PAD + 38, y0 + 62 + j * 52), line, font=font(BOLD, 42), fill=TEXT)
        y0 += h + gap

    card(img, (PAD, y0, W - PAD, y0 + heights[-1]))
    d = ImageDraw.Draw(img)
    for j, line in enumerate(desc_lines):
        d.text((PAD + 38, y0 + 30 + j * 44), line, font=bf, fill=BODY)

    footer(d, (W, H), right=SITE.upper())
    return img


def slide_audience(meta, rows):
    img = base((W, H))
    d = ImageDraw.Draw(img)
    maxw = W - PAD * 2

    y = counter(d, PAD, PAD, "WHO IT'S FOR")
    d.text((PAD, y + 26), 'Is this you?', font=font(BOLD, 56), fill=TEXT)

    band_top, band_bottom = y + 170, H - PAD - 120
    gap = 24
    bf = font(REG, 32)
    pf = font(BOLD, 30)

    plan = []
    for verdict, line in rows:
        lines = wrap(d, line, bf, maxw - 76)[:5]
        plan.append((verdict, lines, 30 + 50 + 26 + len(lines) * 44 + 30))

    stack = sum(p[2] for p in plan) + gap * (len(plan) - 1)
    y0 = band_top + max(0, (band_bottom - band_top - stack) // 2)
    for verdict, lines, card_h in plan:
        card(img, (PAD, y0, W - PAD, y0 + card_h))
        d = ImageDraw.Draw(img)
        pw = d.textlength(verdict.upper(), font=pf) + 46
        d.rounded_rectangle((PAD + 38, y0 + 30, PAD + 38 + pw, y0 + 80), 25,
                            fill=VERDICT_COLOUR.get(verdict, MUTED))
        d.text((PAD + 61, y0 + 40), verdict.upper(), font=pf, fill=INK_ON_ACCENT)
        for j, line_text in enumerate(lines):
            d.text((PAD + 38, y0 + 106 + j * 44), line_text, font=bf, fill=BODY)
        y0 += card_h + gap

    footer(d, (W, H), right=SITE.upper())
    return img


def slide_cta(meta, bundle_line):
    img = base((W, H), 'tr')
    d = ImageDraw.Draw(img)
    maxw = W - PAD * 2

    counter(d, PAD, PAD, 'READ IT FREE')

    y = int(H * 0.30)
    d.text((PAD, y), 'The whole guide,', font=font(BOLD, 62), fill=TEXT)
    d.text((PAD, y + 78), 'free on the site.', font=font(BOLD, 62), fill=ACCENT_BRIGHT)

    url = f"{SITE}/guides/{meta['slug']}"
    uf = fit_font(d, url, BOLD, maxw, 1, 44, 26)
    y += 210
    card(img, (PAD, y, W - PAD, y + 108))
    d = ImageDraw.Draw(img)
    d.text((PAD + 38, y + 108 // 2 - uf.size // 2 - 4), url, font=uf, fill=TEXT)

    bf = font(REG, 30)
    y += 160
    for line in wrap(d, bundle_line, bf, maxw)[:3]:
        d.text((PAD, y), line, font=bf, fill=BODY)
        y += 42

    hf = font(BOLD, 40)
    d.text((PAD, H - PAD - 150), HANDLE, font=hf, fill=ACCENT)

    footer(d, (W, H), right=SITE.upper())
    return img


# ── caption ────────────────────────────────────────────────────────────

CATEGORY_TAG = {
    'foundation': '#AIexplained', 'map': '#AIindustry', 'claude': '#Claude',
    'work': '#FutureOfWork', 'personal': '#AIassistant', 'platforms': '#AIstartups',
    'practical': '#SoloFounder', 'creative': '#AIvideo',
}


def caption(meta, first_takeaway):
    hook = meta['hook'].replace('*', '')
    tags = ' '.join(['#AIagents', '#AgenticEconomy', CATEGORY_TAG.get(meta.get('category', ''), '#AI')])
    url = f"https://{SITE}/guides/{meta['slug']}"
    return (
        f"{hook}\n\n"
        f"{first_takeaway}\n\n"
        f"{tags}\n"
        f"{url}\n\n"
        f"--- first comment ---\n"
        f"Full guide, free, no email wall: {url}\n"
        f"All 37 guides in one PDF: https://{SITE}/bundles/complete-pack\n"
    )


# ── main ───────────────────────────────────────────────────────────────

def guides():
    """Every guide, in catalogue order, with its position."""
    rows = []
    for name in sorted(os.listdir(CONTENT)):
        if not name.endswith('.md'):
            continue
        text = open(os.path.join(CONTENT, name), encoding='utf-8').read()
        meta = front_matter(text)
        if not meta.get('slug'):
            continue
        order = re.search(r'^order:\s*([\d.]+)', text, re.M)
        meta['_order'] = float(order.group(1)) if order else 999
        meta['_name'] = name
        meta['_body'] = body_of(text)
        rows.append(meta)
    rows.sort(key=lambda m: (m['_order'], m['_name']))
    return rows


def build(meta, idx, total, bundle_line, clipped):
    body = meta['_body']
    out = os.path.join(OUT_ROOT, meta['slug'])
    os.makedirs(out, exist_ok=True)

    tk = takeaways(body)
    while len(tk) < 2:
        tk.append(meta.get('description', meta['hook'].replace('*', '')))
    aud = audience(body)

    chosen = pick_stats(stats(body), meta.get('hook', ''), meta.get('carousel_stats'))
    slides = [
        slide_cover(meta, idx, total),
        slide_numbers(meta, chosen, clipped) if chosen else slide_premise(meta),
        slide_takeaway(meta, tk[0], 1),
        slide_takeaway(meta, tk[1], 2),
        slide_audience(meta, aud) if len(aud) >= 2 else slide_inside(meta),
        slide_cta(meta, bundle_line),
    ]
    for i, img in enumerate(slides, 1):
        img.convert('RGB').save(os.path.join(out, f'{i}.png'), optimize=True)

    slide_cover(meta, idx, total, STORY).convert('RGB').save(
        os.path.join(out, 'cover-story.png'), optimize=True)

    with open(os.path.join(out, 'caption.txt'), 'w', encoding='utf-8') as fh:
        fh.write(caption(meta, tk[0]))

    return len(chosen), len(aud)


def main():
    only = sys.argv[1] if len(sys.argv) > 1 else None
    rows = guides()
    total = len(rows)
    bundle_line = (f'All {total} guides in one PDF for $49, '
                   f'or the nine-guide starter pack for $29.')

    made = 0
    clipped = []
    for i, meta in enumerate(rows, 1):
        if only and meta['slug'] != only:
            continue
        nstats, naud = build(meta, i, total, bundle_line, clipped)
        made += 1
        flag = '' if nstats >= 3 else (
            '  (no numbers box — slide 2 is the standfirst)' if nstats == 0
            else f'  (only {nstats} stats)')
        flag += '' if naud >= 2 else "  (no who-it-is-for — slide 5 is what's inside)"
        print(f"✓ {meta['slug']:22} guide {i:2}/{total}{flag}")

    if only and not made:
        sys.exit(f"ERROR: no guide with slug '{only}'")
    print(f'\n{made} carousel(s) — 6 slides, a story cover and a caption each.')
    if clipped:
        print(f'\n{len(clipped)} stat caption(s) clipped at three lines:')
        for slug, value, tail in clipped:
            print(f'  {slug:22} {value:14} lost: "{tail}"')
    else:
        print('No stat captions clipped.')


if __name__ == '__main__':
    main()
