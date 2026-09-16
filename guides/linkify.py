#!/usr/bin/env python3
"""Turn bare wtfagents.com URLs into clickable reportlab links.

Shared by guides/render.py and build_bundles.py so the guide PDFs and the bundle
PDFs link identically.

Links inside orange text already read as links, so they are left as-is. Links
sitting in grey body or footer text would be indistinguishable from the prose
around them, so those get a subtle underline and keep their colour.
"""
import re

# wtfagents.com, optionally with a single path segment (/store, /companies)
URL_RE = re.compile(r'\bwtfagents\.com(?:/[a-z][a-z0-9-]*)?\b')


def href(url_text):
    """Absolute href for a bare URL, so viewers open it reliably."""
    return url_text if url_text.startswith('http') else f'https://{url_text}'


def linkify(text, underline=True):
    """Wrap every bare wtfagents.com URL in <link>, leaving other text alone.

    Already-linked text is returned untouched, so this is safe to apply to
    strings that contain a hand-written <link> tag.
    """
    if '<link' in text:
        return text

    def repl(match):
        url = match.group(0)
        inner = f'<u>{url}</u>' if underline else url
        return f'<link href="{href(url)}">{inner}</link>'

    return URL_RE.sub(repl, text)


def first_url(text):
    """The first bare wtfagents.com URL in a string, or None."""
    match = URL_RE.search(text)
    return match.group(0) if match else None


def link_footer(canvas, text, centre_x, y, font='Helvetica', size=8, underline=True):
    """Draw a centred footer string with its wtfagents.com URL clickable.

    Canvas text cannot carry markup, so the URL's position is measured inside
    the drawn string and a link rectangle (plus optional rule) placed over it.
    """
    canvas.setFont(font, size)
    canvas.drawCentredString(centre_x, y, text)

    url = first_url(text)
    if not url:
        return

    total_w = canvas.stringWidth(text, font, size)
    prefix_w = canvas.stringWidth(text[:text.index(url)], font, size)
    url_w = canvas.stringWidth(url, font, size)

    x0 = centre_x - total_w / 2 + prefix_w
    x1 = x0 + url_w

    if underline:
        canvas.setLineWidth(0.4)
        canvas.line(x0, y - 1.6, x1, y - 1.6)

    canvas.linkURL(href(url), (x0, y - 2.5, x1, y + size * 0.8), relative=0)
