'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';

import { C } from '../lib/design';
import { GUIDES, BUNDLES, GUIDE_COUNT } from '../lib/guides';
import { CATEGORIES } from '../lib/categories';

/**
 * The menu: a button top-right on every page, and a panel with everything the
 * site has — the entry point, both bundles, the two directories, then every
 * guide by category.
 *
 * Full-screen on a phone, a right-hand panel on a desktop. Escape closes it,
 * clicking the backdrop closes it, any link closes it. Focus is trapped while
 * it is open and returned to the button when it closes, and the scroll lock
 * compensates for the scrollbar so the page underneath does not shift.
 */
export default function MenuButton() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setOpen(false), []);

  // Scroll lock. Replacing the scrollbar's width with padding keeps the layout
  // still — without it every page jumps sideways as the menu opens.
  useEffect(() => {
    if (!open) return;
    const { body } = document;
    const gap = window.innerWidth - document.documentElement.clientWidth;
    const prevOverflow = body.style.overflow;
    const prevPad = body.style.paddingRight;
    body.style.overflow = 'hidden';
    if (gap > 0) body.style.paddingRight = `${gap}px`;
    return () => {
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPad;
    };
  }, [open]);

  // Escape to close, Tab cycles inside the panel.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.preventDefault(); close(); return; }
      if (e.key !== 'Tab' || !panelRef.current) return;
      const items = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, close]);

  // Focus into the panel on open, back to the button on close — but not on
  // first paint, where `open` is already false and there is nothing to return
  // from. Without the guard every page load focuses the menu button and draws
  // a focus ring on it.
  const everOpened = useRef(false);
  useEffect(() => {
    if (open) {
      everOpened.current = true;
      panelRef.current?.querySelector<HTMLElement>('a[href], button')?.focus();
    } else if (everOpened.current) {
      buttonRef.current?.focus({ preventScroll: true });
    }
  }, [open]);

  const indexOf = new Map(GUIDES.map((g, i) => [g.slug, i + 1]));
  const starter = BUNDLES.find(b => b.slug === 'starter-pack');
  const complete = BUNDLES.find(b => b.slug === 'complete-pack');

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        className={'wtf-menu-btn' + (open ? ' is-hidden' : '')}
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="wtf-menu"
        onClick={() => setOpen(true)}
      >
        <span />
        <span />
        <span />
      </button>

      <div
        className={'wtf-menu-root' + (open ? ' is-open' : '')}
        aria-hidden={!open}
        {...(open ? {} : { inert: '' as unknown as boolean })}
      >
        <div className="wtf-menu-backdrop" onClick={close} />
        <div
          id="wtf-menu"
          ref={panelRef}
          className="wtf-menu-panel"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
        >
          <div className="wtf-menu-top">
            <span className="wtf-menu-word">WTF AGENTS</span>
            <button type="button" className="wtf-menu-close" onClick={close} aria-label="Close menu">
              ✕
            </button>
          </div>

          <div className="wtf-menu-scroll">
            <Link href="/guides/agentic-economy" className="wtf-menu-primary" onClick={close}>
              Start here
              <span>WTF is the Agentic Economy</span>
            </Link>

            <div className="wtf-menu-counter"><span /> BUNDLES</div>
            <div className="wtf-menu-bundles">
              {[starter, complete].map(b => b && (
                <Link key={b.slug} href={`/bundles/${b.slug}`} className="wtf-menu-bundle" onClick={close}>
                  <strong>{b.title.replace(/^The /, '')}</strong>
                  <span>${b.price}</span>
                </Link>
              ))}
            </div>

            <div className="wtf-menu-counter"><span /> DIRECTORIES</div>
            <Link href="/companies" className="wtf-menu-row" onClick={close}>Companies</Link>
            <Link href="/tools" className="wtf-menu-row" onClick={close}>Tools</Link>

            {CATEGORIES.map(cat => {
              const list = GUIDES.filter(g => g.category === cat.id);
              if (!list.length) return null;
              return (
                <div key={cat.id}>
                  <div className="wtf-menu-counter">
                    <span /> {cat.label.toUpperCase()}
                    <em>{list.length}</em>
                  </div>
                  {list.map(g => (
                    <Link key={g.slug} href={`/guides/${g.slug}`} className="wtf-menu-row" onClick={close}>
                      <i>{String(indexOf.get(g.slug)).padStart(2, '0')}</i>
                      {g.title}
                    </Link>
                  ))}
                </div>
              );
            })}

            <div className="wtf-menu-foot">{GUIDE_COUNT} guides · $7 each</div>
          </div>
        </div>
      </div>

      <style>{`
        .wtf-menu-btn {
          display: flex; flex-direction: column; justify-content: center; align-items: center;
          gap: 5px; width: 40px; height: 40px; flex: none;
          background: transparent; border: 1px solid ${C.strokeSoft}; border-radius: 999px;
          cursor: pointer; padding: 0; position: relative; z-index: 120;
        }
        .wtf-menu-btn span { display: block; width: 16px; height: 1.5px; background: ${C.text}; }
        .wtf-menu-btn:hover { border-color: ${C.accent}; }
        .wtf-menu-btn.is-hidden { opacity: 0; pointer-events: none; }

        /* Accent focus rings — the browser default blue is the one colour
           that is not in the palette. */
        .wtf-menu-btn:focus-visible,
        .wtf-menu-close:focus-visible,
        .wtf-menu-root a:focus-visible {
          outline: 2px solid ${C.accentBright}; outline-offset: 3px; border-radius: 6px;
        }

        .wtf-menu-root { position: fixed; inset: 0; z-index: 110; pointer-events: none; }
        .wtf-menu-root.is-open { pointer-events: auto; }
        .wtf-menu-backdrop {
          position: absolute; inset: 0; background: rgba(4,2,2,.72);
          opacity: 0; transition: opacity .22s ease;
        }
        .wtf-menu-root.is-open .wtf-menu-backdrop { opacity: 1; }

        .wtf-menu-panel {
          position: absolute; top: 0; right: 0; bottom: 0; width: 100%;
          background: ${C.canvas}; border-left: 1px solid ${C.strokeSoft};
          display: flex; flex-direction: column;
          transform: translateX(100%); transition: transform .26s cubic-bezier(.4,0,.2,1);
          box-shadow: -24px 0 60px rgba(0,0,0,.6);
        }
        .wtf-menu-root.is-open .wtf-menu-panel { transform: translateX(0); }
        @media (min-width: 721px) { .wtf-menu-panel { width: 420px; } }

        .wtf-menu-top {
          display: flex; justify-content: space-between; align-items: center;
          padding: 26px 28px 18px; border-bottom: 1px solid rgba(255,255,255,.07); flex: none;
        }
        .wtf-menu-word { font-size: 13px; font-weight: 700; letter-spacing: .24em; color: ${C.text}; }
        .wtf-menu-close {
          background: transparent; border: none; color: ${C.muted}; font-size: 18px;
          cursor: pointer; width: 32px; height: 32px; border-radius: 999px;
        }
        .wtf-menu-close:hover { color: ${C.text}; background: rgba(255,255,255,.05); }

        .wtf-menu-scroll { overflow-y: auto; padding: 22px 28px 40px; flex: 1; -webkit-overflow-scrolling: touch; }

        .wtf-menu-primary {
          display: block; border: 1px solid ${C.accent}; border-radius: 16px;
          padding: 16px 20px; text-decoration: none; color: ${C.text};
          font-size: 17px; font-weight: 700; letter-spacing: -.01em;
          box-shadow: 0 0 18px rgba(228,72,76,.22);
        }
        .wtf-menu-primary span { display: block; font-size: 14px; font-weight: 400; color: ${C.body}; margin-top: 4px; }

        .wtf-menu-counter {
          display: flex; align-items: center; gap: 12px;
          font-size: 11px; font-weight: 700; letter-spacing: .24em; color: ${C.muted};
          margin: 30px 0 12px;
        }
        .wtf-menu-counter span { display: block; width: 24px; height: 2px; background: ${C.accent}; flex: none; }
        .wtf-menu-counter em { margin-left: auto; font-style: normal; color: ${C.dim}; letter-spacing: .1em; }

        .wtf-menu-bundles { display: flex; gap: 10px; }
        .wtf-menu-bundle {
          flex: 1; border: 1px solid ${C.strokeSoft}; border-radius: 14px; padding: 14px 16px;
          text-decoration: none; color: ${C.text}; font-size: 14px;
        }
        .wtf-menu-bundle strong { display: block; font-weight: 700; line-height: 1.3; }
        .wtf-menu-bundle span { display: block; color: ${C.accentBright}; font-weight: 700; margin-top: 6px; }
        .wtf-menu-bundle:hover { border-color: ${C.accent}; }

        .wtf-menu-row {
          display: flex; align-items: baseline; gap: 12px;
          padding: 11px 0; text-decoration: none; color: ${C.body}; font-size: 15px;
          border-bottom: 1px solid rgba(255,255,255,.05);
        }
        .wtf-menu-row i { font-style: normal; color: ${C.dim}; font-size: 12px; letter-spacing: .1em; flex: none; }
        .wtf-menu-row:hover { color: ${C.text}; }

        .wtf-menu-foot { margin-top: 34px; font-size: 13px; letter-spacing: .1em; color: ${C.dim}; }

        @media (prefers-reduced-motion: reduce) {
          .wtf-menu-panel, .wtf-menu-backdrop, .wtf-menu-btn span { transition: none; }
        }
      `}</style>
    </>
  );
}
