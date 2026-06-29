'use client';
import { useState, useEffect } from 'react';

const navLinks = [
  { label: 'Services',   href: '#services'     },
  { label: 'Work',       href: '#case-studies'  },
  { label: 'Blog',       href: '#blog'          },
  { label: 'Contact',    href: '#contact'       },
];

function Logo() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect width="32" height="32" rx="9" fill="url(#navGrad)" />
      <path d="M7 16L12 11L17 16L22 11" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7 21L12 16L17 21L22 16" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.55"/>
      <defs><linearGradient id="navGrad" x1="0" y1="0" x2="32" y2="32">
        <stop stopColor="#6366f1"/><stop offset="1" stopColor="#8b5cf6"/>
      </linearGradient></defs>
    </svg>
  );
}

export default function Navigation() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  const go = (href) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled
        ? 'py-3 shadow-[0_4px_24px_rgba(99,102,241,0.12)] border-b border-white/70'
        : 'py-5'
    }`}
    style={scrolled ? { background:'rgba(255,255,255,0.88)', backdropFilter:'blur(28px)', WebkitBackdropFilter:'blur(28px)' } : {}}>

      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5 group">
          <Logo />
          <span className="text-lg font-bold text-slate-900 tracking-tight group-hover:text-indigo-600 transition-colors">
            Nexora<span className="text-indigo-500">.</span>
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map(l => (
            <li key={l.href}>
              <button onClick={() => go(l.href)}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-indigo-600 rounded-lg hover:bg-indigo-50 transition-all duration-200">
                {l.label}
              </button>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a href="/admin" className="text-sm text-slate-400 hover:text-slate-600 transition-colors">Admin</a>
          <button onClick={() => go('#contact')} className="btn-primary py-2.5 px-5 text-sm">
            <span>Get Started</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden p-2 group" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          <span className={`block h-0.5 w-6 bg-slate-700 rounded transition-all duration-300 ${menuOpen?'rotate-45 translate-y-2':''}`}/>
          <span className={`block h-0.5 w-6 bg-slate-700 rounded mt-1.5 transition-all duration-300 ${menuOpen?'opacity-0':''}`}/>
          <span className={`block h-0.5 w-6 bg-slate-700 rounded mt-1.5 transition-all duration-300 ${menuOpen?'-rotate-45 -translate-y-2':''}`}/>
        </button>
      </nav>

      {/* Mobile menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen?'max-h-80 opacity-100':'max-h-0 opacity-0'}`}>
        <div className="mx-4 mt-2 mb-4 glass rounded-2xl p-4 space-y-1">
          {navLinks.map(l => (
            <button key={l.href} onClick={() => go(l.href)}
              className="block w-full text-left px-4 py-3 text-sm font-medium text-slate-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
              {l.label}
            </button>
          ))}
          <div className="pt-2">
            <button onClick={() => go('#contact')} className="btn-primary w-full justify-center py-2.5 text-sm">Get Started</button>
          </div>
        </div>
      </div>
    </header>
  );
}
