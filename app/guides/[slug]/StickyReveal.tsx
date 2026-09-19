'use client';

import { useEffect } from 'react';

/**
 * Reveals the mobile buy bar once the hero — which already carries a buy
 * button — has scrolled out of view, so the two are never on screen together.
 * The desktop rail is plain `position: sticky` and needs no script.
 */
export default function StickyReveal() {
  useEffect(() => {
    const hero = document.getElementById('hero');
    const bar = document.getElementById('mobilebar');
    if (!hero || !bar) return;

    if (typeof IntersectionObserver === 'undefined') {
      bar.classList.add('show');          // no observer: show it rather than hide the buy path
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => bar.classList.toggle('show', !entry.isIntersecting),
      { rootMargin: '0px 0px -80% 0px' },
    );
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  return null;
}
