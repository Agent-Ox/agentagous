'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const navLinks = [
  { href: '/', label: 'Home', icon: '🏠' },
  { href: '/companies', label: 'Companies', icon: '🏢' },
  { href: '/jobs', label: 'Jobs', icon: '💼' },
  { href: '/ideas', label: 'Ideas', icon: '💡' },
  { href: '/submit', label: 'Submit', icon: '🚀' },
];

export default function Nav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  // Prevent body scroll when menu open
  useEffect(() => {
    if (menuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <header className="border-b border-zinc-800 px-4 md:px-6 py-4 flex items-center justify-between sticky top-0 bg-zinc-950/95 backdrop-blur-sm z-50">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-sm font-bold text-white shadow-lg shadow-orange-500/20">W</div>
          <span className="font-bold text-lg tracking-tight text-white">WTF Agents</span>
          <span className="text-xs text-zinc-500 border border-zinc-700 rounded-full px-2 py-0.5 hidden sm:block">beta</span>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href}
              className={"px-3 py-1.5 rounded-lg text-sm transition-all " + (
                pathname === link.href
                  ? 'bg-white text-black font-medium'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
              )}>
              {link.label}
            </Link>
          ))}
        </nav>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
            <span className="text-xs text-zinc-400">Live</span>
          </div>

          {/* HAMBURGER */}
          <button
            onClick={() => setMenuOpen(o => !o)}
            className="md:hidden flex flex-col items-center justify-center w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 gap-1.5 transition-all hover:border-zinc-600"
            aria-label="Toggle menu"
          >
            <span className={"block w-4 h-0.5 bg-white transition-all duration-300 " + (menuOpen ? 'rotate-45 translate-y-2' : '')}></span>
            <span className={"block w-4 h-0.5 bg-white transition-all duration-300 " + (menuOpen ? 'opacity-0' : '')}></span>
            <span className={"block w-4 h-0.5 bg-white transition-all duration-300 " + (menuOpen ? '-rotate-45 -translate-y-2' : '')}></span>
          </button>
        </div>
      </header>

      {/* MOBILE MENU OVERLAY */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 md:hidden" onClick={() => setMenuOpen(false)}>
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

          {/* Slide-in panel */}
          <div
            className="absolute top-0 right-0 h-full w-72 bg-zinc-950 border-l border-zinc-800 flex flex-col shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            {/* Panel header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-800">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-xs font-bold text-white">W</div>
                <span className="font-bold text-white">WTF Agents</span>
              </div>
              <button onClick={() => setMenuOpen(false)}
                className="text-zinc-500 hover:text-white text-xl w-8 h-8 flex items-center justify-center rounded-lg hover:bg-zinc-800 transition-all">
                ✕
              </button>
            </div>

            {/* Live indicator */}
            <div className="flex items-center gap-2 px-6 py-3 bg-emerald-500/5 border-b border-zinc-800">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
              <span className="text-xs text-emerald-400">Agentic economy is live</span>
            </div>

            {/* Nav links */}
            <nav className="flex flex-col p-4 gap-1 flex-1">
              {navLinks.map(link => (
                <Link key={link.href} href={link.href}
                  className={"flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm transition-all " + (
                    pathname === link.href
                      ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20 font-medium'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                  )}>
                  <span className="text-base">{link.icon}</span>
                  <span>{link.label}</span>
                  {pathname === link.href && <span className="ml-auto text-orange-400">→</span>}
                </Link>
              ))}
            </nav>

            {/* Bottom CTA */}
            <div className="p-4 border-t border-zinc-800">
              <Link href="/submit"
                className="block w-full bg-orange-500 hover:bg-orange-400 text-white font-medium px-4 py-3 rounded-xl text-sm transition-all text-center">
                + Submit your AI company
              </Link>
              <p className="text-xs text-zinc-600 text-center mt-3">Free to list. Always.</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
