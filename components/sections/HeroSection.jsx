'use client';
import { useEffect, useState } from 'react';

const FALLBACK = {
  badge: '✦ Award-Winning Digital Agency',
  headline: 'Engineering\nDigital Excellence',
  subheadline: 'We craft world-class digital products',
  description: 'Nexora Digital transforms ambitious ideas into powerful digital experiences — from sleek web apps and AI-powered platforms to growth-focused brand strategies.',
  ctaPrimary: 'Start a Project',
  ctaPrimaryLink: '#contact',
  ctaSecondary: 'View Our Work',
  ctaSecondaryLink: '#case-studies',
};

export default function HeroSection({ data }) {
  const hero = data || FALLBACK;
  const [vis, setVis] = useState(false);
  useEffect(() => { setTimeout(() => setVis(true), 80); }, []);

  const go = (href) => {
    if (!href || href.startsWith('mailto')) { window.location.href = href||'#'; return; }
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  const lines = (hero.headline||'').split('\n');

  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-28 pb-20 overflow-hidden">
      <div className={`relative z-10 text-center max-w-5xl mx-auto transition-all duration-1000 ${vis?'opacity-100 translate-y-0':'opacity-0 translate-y-10'}`}>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 mb-8">
          <span className="badge">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor"><path d="M5 0l1.2 3.6H10l-3 2.2 1.2 3.6L5 7.2l-3.2 2.2L3 5.8 0 3.6h3.8z"/></svg>
            {hero.badge}
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[84px] font-black tracking-tight leading-[1.05] mb-6">
          {lines.map((line, i) => (
            <span key={i} className={`block transition-all duration-700 ${vis?'opacity-100 translate-y-0':'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay:`${180+i*150}ms` }}>
              {i===1 ? <span className="gradient-text">{line}</span> : <span className="text-slate-900">{line}</span>}
            </span>
          ))}
        </h1>

        {/* Sub + desc */}
        <p className={`text-lg sm:text-xl text-slate-500 font-medium mb-3 transition-all duration-700 ${vis?'opacity-100 translate-y-0':'opacity-0 translate-y-6'}`}
           style={{ transitionDelay:'480ms' }}>{hero.subheadline}</p>
        <p className={`text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed mb-12 transition-all duration-700 ${vis?'opacity-100 translate-y-0':'opacity-0 translate-y-6'}`}
           style={{ transitionDelay:'580ms' }}>{hero.description}</p>

        {/* CTA */}
        <div className={`flex flex-col sm:flex-row gap-4 justify-center mb-16 transition-all duration-700 ${vis?'opacity-100 translate-y-0':'opacity-0 translate-y-6'}`}
             style={{ transitionDelay:'720ms' }}>
          <button onClick={() => go(hero.ctaPrimaryLink)} className="btn-primary px-8 py-4 text-base">
            <span>{hero.ctaPrimary}</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <button onClick={() => go(hero.ctaSecondaryLink)} className="btn-glass px-8 py-4 text-base">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.6"/><path d="M8 4.5v3.5l2.5 1.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
            <span>{hero.ctaSecondary}</span>
          </button>
        </div>

        {/* Social proof */}
        <div className={`flex flex-wrap justify-center gap-6 text-sm text-slate-400 transition-all duration-700 ${vis?'opacity-100':'opacity-0'}`}
             style={{ transitionDelay:'880ms' }}>
          {['500+ Projects','98% Satisfaction','12+ Years','Global Clients'].map(t=>(
            <span key={t} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"/>
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Floating glass cards */}
      <div className={`absolute left-[4%] top-[38%] hidden xl:block transition-all duration-1000 ${vis?'opacity-100 translate-x-0':'opacity-0 -translate-x-12'}`}
           style={{ transitionDelay:'1000ms' }}>
        <div className="glass-card p-4 rounded-2xl w-52" style={{ animation:'floatFast 10s ease-in-out infinite' }}>
          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1l1.2 3.6H12l-3 2.2 1.2 3.6L7 8.6l-3.4 2.2L5 7.2 2 5h3.8z" fill="#6366f1"/></svg>
            </div>
            <span className="text-xs font-semibold text-slate-700">New Launch</span>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">E-commerce rebuild shipped 2 weeks ahead 🚀</p>
          <div className="mt-3 flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500"/>
            <span className="text-xs text-slate-400">Sarah M. · just now</span>
          </div>
        </div>
      </div>

      <div className={`absolute right-[4%] top-[35%] hidden xl:block transition-all duration-1000 ${vis?'opacity-100 translate-x-0':'opacity-0 translate-x-12'}`}
           style={{ transitionDelay:'1100ms' }}>
        <div className="glass-card p-4 rounded-2xl w-48" style={{ animation:'floatMedium 14s ease-in-out infinite', animationDelay:'-4s' }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-700">Lighthouse</span>
            <span className="text-xs text-emerald-600 font-bold">↑ 98</span>
          </div>
          {[['Speed',98],['SEO',100],['A11y',95]].map(([l,v])=>(
            <div key={l} className="flex items-center gap-2 mt-1.5">
              <span className="text-[11px] text-slate-400 w-8">{l}</span>
              <div className="flex-1 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500" style={{width:`${v}%`}}/>
              </div>
              <span className="text-[11px] text-slate-500">{v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs text-slate-300 tracking-widest uppercase">Scroll</span>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="animate-bounce text-slate-300">
          <path d="M5 7.5l5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </section>
  );
}
