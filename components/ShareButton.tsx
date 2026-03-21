'use client';

import { useState, useRef, useEffect } from 'react';

type ShareButtonProps = {
  title: string;
  text: string;
  url?: string;
  label?: string;
  className?: string;
};

export default function ShareButton({ title, text, url = 'https://wtfagents.com', label = '📤 Share', className = '' }: ShareButtonProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const encodedText = encodeURIComponent(text);
  const encodedUrl = encodeURIComponent(url);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const actions = [
    {
      label: 'Share on X',
      icon: '𝕏',
      bg: 'hover:bg-zinc-800',
      onClick: () => window.open(`https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`, '_blank'),
    },
    {
      label: 'WhatsApp',
      icon: '💬',
      bg: 'hover:bg-zinc-800',
      onClick: () => window.open(`https://wa.me/?text=${encodedText}%20${encodedUrl}`, '_blank'),
    },
    {
      label: 'Facebook',
      icon: '👥',
      bg: 'hover:bg-zinc-800',
      onClick: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`, '_blank'),
    },
    {
      label: 'LinkedIn',
      icon: '💼',
      bg: 'hover:bg-zinc-800',
      onClick: () => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&summary=${encodedText}`, '_blank'),
    },
    {
      label: 'Native share',
      icon: '📤',
      bg: 'hover:bg-zinc-800',
      onClick: () => {
        if (navigator.share) {
          navigator.share({ title, text, url });
        } else {
          navigator.clipboard.writeText(`${text}\n\n${url}`);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }
      },
    },
    {
      label: copied ? '✓ Copied!' : 'Copy text',
      icon: '📋',
      bg: 'hover:bg-zinc-800',
      onClick: () => {
        navigator.clipboard.writeText(`${text}\n\n${url}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      },
    },
  ];

  return (
    <div className={"relative " + className} ref={ref}>
      <button
        onClick={() => setOpen(o => !o)}
        className="text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 border border-zinc-700 hover:border-zinc-600"
      >
        {label}
      </button>

      {open && (
        <div className="absolute bottom-9 left-0 z-50 bg-zinc-900 border border-zinc-700 rounded-xl p-2 shadow-2xl w-48">
          <div className="text-xs text-zinc-600 px-2 py-1 mb-1">Share via</div>
          {actions.map(a => (
            <button
              key={a.label}
              onClick={() => { a.onClick(); if (a.label !== 'Copy text' && a.label !== '✓ Copied!') setOpen(false); }}
              className={"flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-sm text-zinc-300 hover:text-white transition-all " + a.bg}
            >
              <span className="w-5 text-center">{a.icon}</span>
              <span>{a.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
