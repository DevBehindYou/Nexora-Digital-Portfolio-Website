'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const FALLBACK = {
  badge:'⚡ Limited availability — Q2 2025',
  headline:"Ready to Build Something\nRemarkable?",
  description:"Partner with Nexora Digital to create digital experiences that captivate users, outperform competitors, and drive measurable growth.",
  primaryCta:'Start Your Project', primaryCtaLink:'#contact',
  secondaryCta:'Book a Free Audit', secondaryCtaLink:'#contact',
};

export default function CTASection({ data }) {
  const cta = data || FALLBACK;
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:'-80px' });
  const lines = (cta.headline||'').split('\n');

  return (
    <section className="relative z-10 section-pad">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div ref={ref} initial={{ opacity:0, y:50 }} animate={inView?{opacity:1,y:0}:{}}
          transition={{ duration:0.8 }} className="gradient-border rounded-3xl">
          <div className="relative rounded-3xl p-10 sm:p-16 text-center overflow-hidden"
               style={{ background:'linear-gradient(135deg,rgba(99,102,241,0.07),rgba(139,92,246,0.05),rgba(6,182,212,0.06))', backdropFilter:'blur(32px)', WebkitBackdropFilter:'blur(32px)', border:'1px solid rgba(255,255,255,0.85)' }}>
            {/* Orbs */}
            <div className="orb w-80 h-80 bg-indigo-400 opacity-[0.10] absolute -top-20 -left-20" style={{ filter:'blur(70px)' }}/>
            <div className="orb w-64 h-64 bg-cyan-400  opacity-[0.08] absolute -bottom-16 -right-16" style={{ filter:'blur(70px)' }}/>
            {/* Dots */}
            <div className="absolute inset-0 opacity-[0.035]"
                 style={{ backgroundImage:'radial-gradient(rgba(99,102,241,0.7) 1px, transparent 1px)', backgroundSize:'28px 28px' }}/>

            <div className="relative z-10">
              {cta.badge && (
                <motion.div initial={{ opacity:0, scale:0.8 }} animate={inView?{opacity:1,scale:1}:{}}
                  transition={{ delay:0.2 }} className="inline-block mb-6">
                  <span className="px-4 py-2 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-sm font-semibold shadow-sm">
                    {cta.badge}
                  </span>
                </motion.div>
              )}

              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 leading-tight">
                {lines.map((line, i) => (
                  <motion.span key={i} initial={{ opacity:0, y:20 }} animate={inView?{opacity:1,y:0}:{}}
                    transition={{ delay:0.3+i*0.1 }} className="block">
                    {i===0 ? <span className="text-slate-900">{line}</span> : <span className="gradient-text">{line}</span>}
                  </motion.span>
                ))}
              </h2>

              <motion.p initial={{ opacity:0 }} animate={inView?{opacity:1}:{}} transition={{ delay:0.5 }}
                className="text-lg text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
                {cta.description}
              </motion.p>

              <motion.div initial={{ opacity:0, y:20 }} animate={inView?{opacity:1,y:0}:{}}
                transition={{ delay:0.6 }} className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href={cta.primaryCtaLink||'#contact'} onClick={(e)=>{ if(cta.primaryCtaLink?.startsWith('#')){ e.preventDefault(); document.querySelector(cta.primaryCtaLink)?.scrollIntoView({behavior:'smooth'}); }}}
                   className="btn-primary px-9 py-4 text-base">
                  <span>{cta.primaryCta}</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </a>
                <a href={cta.secondaryCtaLink||'#'} className="btn-glass px-9 py-4 text-base">{cta.secondaryCta}</a>
              </motion.div>

              {/* Trust badges */}
              <motion.div initial={{ opacity:0 }} animate={inView?{opacity:1}:{}} transition={{ delay:0.8 }}
                className="flex flex-wrap justify-center gap-6 mt-10 pt-8 border-t border-slate-200/60">
                {[{icon:'🔒',text:'NDA on request'},{icon:'⚡',text:'24h response'},{icon:'✦',text:'Fixed-price quotes'},{icon:'🌍',text:'Global team'}].map(({icon,text})=>(
                  <span key={text} className="flex items-center gap-2 text-sm text-slate-400">
                    <span>{icon}</span>{text}
                  </span>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
