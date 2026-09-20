# Brand assets

Served from `/brand/…`. Generated from `guides/fonts/Montserrat-*.ttf` and the
DESIGN.md palette — canvas `#0A0405`, accent `#E4484C`.

| File | Size | Use |
| --- | --- | --- |
| `avatar-1024.png` | 1024×1024 | Profile picture everywhere. The single `W`, sized so the glyph spans 60% of the circle platforms crop to. |
| `youtube-banner-2560x1440.png` | 2560×1440 | YouTube channel art. All text sits inside the 1546×423 centre box, which is the only part a TV shows. |
| `x-header-1500x500.png` | 1500×500 | X profile header. |

The `WTF` avatar variants were reviewed and not adopted: at three letters the
glyphs are less than half the height of the single `W`, which does not survive
a 48px timeline. They are in the review folder, not here.

Regenerate by re-running the script recorded in the commit that added these —
they are not built by `npm run build`, because they change about once a year
and a native canvas dependency for that is not worth carrying.
