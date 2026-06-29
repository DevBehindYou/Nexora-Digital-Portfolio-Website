'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const ACCENT = {
  blue:   { bg:'from-blue-50 to-indigo-50',    border:'border-blue-200',   btn:'bg-indigo-600 hover:bg-indigo-700 text-white shadow-[0_4px_16px_rgba(99,102,241,0.35)]', orb:'bg-indigo-400',   icon:'text-indigo-500' },
  purple: { bg:'from-purple-50 to-pink-50',     border:'border-purple-200', btn:'bg-purple-600 hover:bg-purple-700 text-white shadow-[0_4px_16px_rgba(139,92,246,0.35)]', orb:'bg-purple-400',   icon:'text-purple-500' },
  cyan:   { bg:'from-cyan-50 to-teal-50',       border:'border-cyan-200',   btn:'bg-cyan-600 hover:bg-cyan-700 text-white shadow-[0_4px_16px_rgba(6,182,212,0.35)]',     orb:'bg-cyan-400',     icon:'text-cyan-600'   },
  pink:   { bg:'from-pink-50 to-rose-50',       border:'border-pink-200',   btn:'bg-pink-600 hover:bg-pink-700 text-white shadow-[0_4px_16px_rgba(236,72,153,0.35)]',    orb:'bg-pink-400',     icon:'text-pink-500'   },
  green:  { bg:'from-emerald-50 to-teal-50',    border:'border-emerald-200',btn:'bg-emerald-600 hover:bg-emerald-700 text-white shadow-[0_4px_16px_rgba(16,185,129,0.35)]',orb:'bg-emerald-400',  icon:'text-emerald-600'},
};

const FALLBACK = [
  { _id:'1', title:'Launch Your MVP in 6 Weeks', description:'Our rapid-build programme takes your idea from concept to live product — at a price designed for founders.', ctaText:'See MVP Packages', ctaLink:'#', badge:'🚀 Founder Special', accentColor:'purple' },
  { _id:'2', title:'Free Digital Audit Worth £2,000', description:'Comprehensive review of your website performance, SEO health and conversion funnel — completely free, no strings attached.', ctaText:'Claim Free Audit', ctaLink:'#contact', badge:'🎁 Limited Offer', accentColor:'cyan' },
];

function AdCard({ ad, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:'-60px' });
  const a = ACCENT[ad.accentColor] || ACCENT.blue;

  return (
    <motion.div ref={ref}
      initial={{ opacity:0, scale:0.96, y:30 }}
      animate={inView?{opacity:1,scale:1,y:0}:{}}
      transition={{ duration:0.6, delay:index*0.15 }}
      className={`glass-card rounded-3xl p-8 border ${a.border} relative overflow-hidden group bg-gradient-to-br ${a.bg}`}>
      {/* Background orb */}
      <div className={`orb w-40 h-40 ${a.orb} opacity-[0.15] absolute -right-8 -top-8`} style={{ filter:'blur(50px)' }}/>
      {/* Dots pattern */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
           style={{ backgroundImage:'radial-gradient(rgba(0,0,0,0.6) 1px, transparent 1px)', backgroundSize:'20px 20px' }}/>

      <div className="relative z-10">
        {ad.badge && (
          <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-white/80 border border-white/90 text-slate-700 mb-4 shadow-sm">
            {ad.badge}
          </span>
        )}
        <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3 leading-tight">{ad.title}</h3>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-7 max-w-md">{ad.description}</p>
        <a href={ad.ctaLink||'#'}
           className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${a.btn}`}>
          {ad.ctaText}
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>
      {/* Corner rings decoration */}
      <div className="absolute bottom-0 right-0 w-28 h-28 opacity-[0.06] pointer-events-none">
        <svg viewBox="0 0 112 112" fill="none">
          <circle cx="112" cy="112" r="80" stroke="black" strokeWidth="1.5"/>
          <circle cx="112" cy="112" r="50" stroke="black" strokeWidth="1.5"/>
          <circle cx="112" cy="112" r="24" stroke="black" strokeWidth="1.5"/>
        </svg>
      </div>
    </motion.div>
  );
}

export default function AdsSection({ data }) {
  const ads = data?.length > 0 ? data : FALLBACK;
  const ref = useRef(null);
  const inView = useInView(ref, { once:true });
  return (
    <section className="relative z-10 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div ref={ref} initial={{ opacity:0, y:20 }} animate={inView?{opacity:1,y:0}:{}}
          transition={{ duration:0.6 }} className="text-center mb-10">
          <span className="badge mb-3 inline-block">Special Offers</span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900">Limited-Time <span className="gradient-text-warm">Opportunities</span></h2>
        </motion.div>
        <div className={`grid gap-6 ${ads.length>=2?'md:grid-cols-2':'max-w-xl mx-auto'}`}>
          {ads.map((a,i) => <AdCard key={a._id||i} ad={a} index={i}/>)}
        </div>
      </div>
    </section>
  );
}
