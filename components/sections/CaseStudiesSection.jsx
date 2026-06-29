'use client';
import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const ACCENT = {
  blue:   { top:'from-blue-500 to-cyan-500',      badge:'bg-blue-50 text-blue-700 border-blue-200',     stat:'bg-blue-50 border-blue-100 text-blue-800',  dot:'bg-blue-500'   },
  purple: { top:'from-purple-500 to-pink-500',     badge:'bg-purple-50 text-purple-700 border-purple-200', stat:'bg-purple-50 border-purple-100 text-purple-800', dot:'bg-purple-500' },
  cyan:   { top:'from-cyan-500 to-teal-500',       badge:'bg-cyan-50 text-cyan-700 border-cyan-200',     stat:'bg-cyan-50 border-cyan-100 text-cyan-800',   dot:'bg-cyan-500'   },
};

const FALLBACK = [
  { _id:'1', title:'E-commerce Platform Redesign', client:'LuxeMarket', industry:'E-commerce', description:'Complete redesign of a high-traffic fashion platform serving 2M+ monthly visitors.', results:'Checkout conversion tripled. Page speed up 68%. Revenue up $2.4M in Q1.', stats:[{label:'Conversion',value:'+340%'},{label:'Speed Score',value:'98/100'},{label:'Revenue',value:'$2.4M'},{label:'Delivery',value:'10 wks'}], tags:['E-commerce','Next.js','UX'], accentColor:'blue' },
  { _id:'2', title:'SaaS Analytics Dashboard', client:'DataPulse', industry:'B2B SaaS', description:'End-to-end design and development of a real-time analytics platform for 2,100+ enterprise teams.', results:'Churn from 14% to 3.2%. NPS jumped to 71. Secured Series A.', stats:[{label:'Churn Drop',value:'-77%'},{label:'NPS Score',value:'71'},{label:'Active Teams',value:'2,100+'},{label:'Time to Value',value:'<5 min'}], tags:['SaaS','Data Viz','React'], accentColor:'purple' },
  { _id:'3', title:'AI Recruitment Platform', client:'TalentFlow', industry:'HR Tech', description:'AI-native hiring platform automating CV screening, scheduling and candidate ranking at scale.', results:'Time-to-hire from 43 to 11 days. $180K/yr savings. 95% satisfaction.', stats:[{label:'Hiring Speed',value:'-74%'},{label:'Cost Savings',value:'$180K/yr'},{label:'Satisfaction',value:'95%'},{label:'Processed',value:'500K+'}], tags:['AI','LLM','Automation'], accentColor:'cyan' },
];

function CaseStudyCard({ cs, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:'-80px' });
  const [expanded, setExpanded] = useState(false);
  const a = ACCENT[cs.accentColor] || ACCENT.blue;

  return (
    <motion.article ref={ref}
      initial={{ opacity:0, y:50 }}
      animate={inView ? { opacity:1, y:0 } : {}}
      transition={{ duration:0.7, delay:index*0.15, ease:[.25,.46,.45,.94] }}
      className="glass-card rounded-3xl overflow-hidden relative flex flex-col">

      {/* Gradient top bar */}
      <div className={`h-1 w-full bg-gradient-to-r ${a.top} flex-shrink-0`}/>

      <div className="p-6 flex flex-col flex-1">
        {/* Header */}
        <div className="mb-4">
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border ${a.badge} mb-3`}>
            <span className={`w-1.5 h-1.5 rounded-full ${a.dot}`}/>
            {cs.industry}
          </span>
          <h3 className="text-lg font-bold text-slate-900 leading-tight">{cs.title}</h3>
          <p className="text-sm text-slate-400 mt-0.5">{cs.client}</p>
        </div>

        <p className="text-sm text-slate-600 leading-relaxed mb-5">{cs.description}</p>

        {/* Stats — FIXED: 2×2 grid prevents overflow */}
        {cs.stats?.length > 0 && (
          <div className="grid grid-cols-2 gap-2 mb-5">
            {cs.stats.map((s, i) => (
              <div key={i} className={`rounded-xl p-3 border ${a.stat} text-center min-w-0`}>
                {/* Value: clamp to 1 line, reduce size if needed */}
                <div className="text-base font-black leading-tight truncate" title={s.value}>
                  {s.value}
                </div>
                <div className="text-[11px] mt-0.5 opacity-70 truncate leading-snug" title={s.label}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Expandable results */}
        <AnimatePresence>
          {expanded && (
            <motion.div initial={{ opacity:0, height:0 }} animate={{ opacity:1, height:'auto' }}
              exit={{ opacity:0, height:0 }} transition={{ duration:0.3 }} className="overflow-hidden">
              <div className={`rounded-xl p-4 border ${a.stat} mb-4`}>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Key Results</p>
                <p className="text-sm text-slate-700 leading-relaxed">{cs.results}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
          <div className="flex flex-wrap gap-1.5 min-w-0">
            {cs.tags?.map(t => (
              <span key={t} className="px-2 py-0.5 rounded-lg bg-slate-100 text-xs text-slate-500 border border-slate-200">{t}</span>
            ))}
          </div>
          <button onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 text-xs font-semibold text-indigo-500 hover:text-indigo-700 transition-colors flex-shrink-0 ml-2">
            {expanded ? 'Less' : 'Results'}
            <motion.svg animate={{ rotate:expanded?180:0 }} width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M3 4.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </motion.svg>
          </button>
        </div>
      </div>
    </motion.article>
  );
}

export default function CaseStudiesSection({ data }) {
  const studies = data?.length > 0 ? data : FALLBACK;
  const ref = useRef(null);
  const inView = useInView(ref, { once:true });
  return (
    <section id="case-studies" className="section-pad relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div ref={ref} initial={{ opacity:0, y:30 }} animate={inView?{opacity:1,y:0}:{}}
          transition={{ duration:0.7 }} className="text-center mb-16">
          <span className="badge mb-5 inline-block">Case Studies</span>
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-4">
            Results That <span className="gradient-text">Speak Louder</span>
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Real projects. Measurable outcomes. Here's what we've achieved for our clients.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {studies.map((cs,i) => <CaseStudyCard key={cs._id||i} cs={cs} index={i}/>)}
        </div>
      </div>
    </section>
  );
}
