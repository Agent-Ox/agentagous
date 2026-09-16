@AGENTS.md

# Guide PDF review gate

After **every** guide render, copy the rendered PDF(s) to `~/Desktop/wtf-review/`
(create the folder if missing, overwrite files of the same name).

**Do not push guide changes until Thomas has confirmed he has reviewed them.**
Committing is fine; pushing is gated on his say-so.

The PDFs are the paid product — the structural diff and `guides/layoutcheck.py`
do not substitute for looking at the pages. This gate covers anything that
regenerates a PDF: content edits, `render.py` or style changes, bundle rebuilds,
`regenerate_all_guides.py`. It does not gate non-guide work.
