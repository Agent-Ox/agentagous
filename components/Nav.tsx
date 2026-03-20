'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/companies', label: 'Companies' },
  { href: '/jobs', label: 'Jobs' },
  { href: '/ideas', label: 'Ideas' },
  { href: '/submit', label: 'Submit' },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <header className="border-b border-zinc-800 px-6 py-4 flex items-center justify-between sticky top-0 bg-zinc-950/95 backdrop-blur-sm z-50">
      <Link href="/" className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-sm font-bold">W</div>
        <span className="font-bold text-lg tracking-tight text-white">WTF Agents</span>
        <span className="text-xs text-zinc-500 border border-zinc-700 rounded-full px-2 py-0.5">beta</span>
      </Link>

      <nav className="hidden md:flex items-center gap-1">
        {navLinks.map(link => (
          <Link
            key={link.href}
            href={link.href}
            className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
              pathname === link.href
                ? 'bg-white text-black font-medium'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
        <span className="text-xs text-zinc-400">Live</span>
      </div>
    </header>
  );
}
