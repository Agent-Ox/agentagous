'use client';

import { useState, useRef, useEffect } from 'react';

type ShareButtonProps = {
  title: string;
  text: string;
  url?: string;
  label?: string;
  className?: string;
};

function buildTweet(text: string, url: string): string {
  const suffix = ` ${url} #WTFAgents`;
  const maxLength = 280 - suffix.length;
  const body = text.replace(/\n+/g, ' ').trim();
  const truncated = body.length <= maxLength ? body : body.substring(0, maxLength - 3) + '...';
  return truncated + suffix;
}

export default function ShareButton({ title, text, url = 'https://wtfagents.com', label = '📤 Share', className = '' }: ShareButtonProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [popoverLeft, setPopoverLeft] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  const fullText = `${text}\n\n👉 ${url}`;
  const tweetText = buildTweet(text, url);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOpen = () => {
    if (btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      // If button is in the left half of the screen, open popover to the right
      setPopoverLeft(rect.left < window.innerWidth / 2);
    }
    setOpen(o => !o);
  };

  const actions = [
    {
      label: 'Share on X',
      icon: '𝕏',
      onClick: () => {
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`, '_blank');
        setOpen(false);
      },
    },
    {
      label: 'WhatsApp',
      icon: '💬',
      onClick: () => {
        window.open(`https://wa.me/?text=${encodeURIComponent(fullText)}`, '_blank');
        setOpen(false);
      },
    },
    {
      label: 'All apps',
      icon: '📱',
      onClick: () => {
        if (navigator.share) {
          navigator.share({ title, text: fullText, url });
        } else {
          navigator.clipboard.writeText(fullText);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }
        setOpen(false);
      },
    },
    {
      label: copied ? '✓ Copied!' : 'Copy text',
      icon: '📋',
      onClick: () => {
        navigator.clipboard.writeText(fullText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      },
    },
  ];

  return (
    <div className={"relative " + className} ref={ref}>
      <button
        ref={btnRef}
        onClick={handleOpen}
        className="text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 border border-zinc-700 hover:border-zinc-600"
      >
        {label}
      </button>

      {open && (
        <div className={`absolute bottom-9 z-50 bg-zinc-900 border border-zinc-700 rounded-xl p-2 shadow-2xl w-44 ${popoverLeft ? 'left-0' : 'right-0'}`}>
          <div className="text-xs text-zinc-600 px-2 py-1 mb-1">Share via</div>
          {actions.map(a => (
            <button
              key={a.label}
              onClick={a.onClick}
              className="flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-sm text-zinc-300 hover:text-white hover:bg-zinc-800 transition-all"
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
