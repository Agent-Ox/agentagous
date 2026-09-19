@AGENTS.md

# Guide workflow

## Incoming guides — `~/Desktop/wtf-inbox/`

Guide files from Thomas land in `~/Desktop/wtf-inbox/`. When he says a guide is
**"in the inbox"**, take the newest matching `.md` there (tolerating duplicate
suffixes like `polsia (1).md`), validate it, and copy it over
`guides/content/<slug>.md`.

**Delete the inbox file once the render succeeds**, so the folder stays empty —
anything left in it has not been processed yet. Never delete it before a
successful render.

## Review gate — `~/Desktop/wtf-review/`

After **every** guide render, mirror **all** of `public/guides/*.pdf` into
`~/Desktop/wtf-review/` — the whole set, not only the ones that changed, so the
folder is always a complete and current copy of what is for sale:

```
rsync -a --delete --include='*/' --include='*.pdf' --exclude='*' \
  public/guides/ ~/Desktop/wtf-review/
```

**Do not push guide changes until Thomas has confirmed he has reviewed them.**
Committing is fine; pushing is gated on his say-so.

The PDFs are the paid product — the structural diff and `guides/layoutcheck.py`
do not substitute for looking at the pages. This gate covers anything that
regenerates a PDF: content edits, `render.py` or style changes, bundle rebuilds,
`regenerate_all_guides.py`. It does not gate non-guide work.

## Order of operations

1. Take the newest matching `.md` from `~/Desktop/wtf-inbox/`.
2. Validate: front-matter parses, catalogue fields present, every `@` directive
   resolves against the renderer's style registry.
3. Copy over `guides/content/<slug>.md`.
4. `python3 regenerate_all_guides.py` — render, catalogue, bundles, layout check.
5. On success (0 layout errors): mirror the full PDF set to
   `~/Desktop/wtf-review/` and delete the inbox file.
6. Commit, then stop and wait for review confirmation before pushing.
