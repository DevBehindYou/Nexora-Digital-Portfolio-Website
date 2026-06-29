'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const ICONS = {
  code: <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M15 17l5-5.5L15 6M7 6L2 11.5 7 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M13 4L9 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/></svg>,
  design: <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="11" r="9" stroke="currentColor" strokeWidth="2"/><path d="M11 7v8M7 11h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><circle cx="11" cy="11" r="2.5" fill="currentColor" opacity="0.25"/></svg>,
  ai: <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M11 2L2 6.5l9 4.5 9-4.5L11 2zM2 15.5l9 4.5 9-4.5M2 11l9 4.5 9-4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  strategy: <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M20 11h-4l-3 8L8 3l-3 8H1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  cloud: <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M17 9.5h-1.26A7.5 7.5 0 1 0 8 19h9a5 5 0 0 0 0-9.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  seo: <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="2"/><path d="m20 20-3.8-3.8M10 7v6M7 10h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
};

const COLORS = {
  code:     { icon:'bg-indigo-100 text-indigo-600',  top:'from-indigo-500 to-blue-500',    light:'hover:border-indigo-200' },
  design:   { icon:'bg-pink-100 text-pink-600',      top:'from-pink-500 to-rose-500',       light:'hover:border-pink-200'   },
  ai:       { icon:'bg-violet-100 text-violet-600',  top:'from-violet-500 to-purple-500',   light:'hover:border-violet-200' },
  strategy: { icon:'bg-cyan-100 text-cyan-700',      top:'from-cyan-500 to-blue-500',       light:'hover:border-cyan-200'   },
  cloud:    { icon:'bg-blue-100 text-blue-600',      top:'from-blue-500 to-indigo-500',     light:'hover:border-blue-200'   },
  seo:      { icon:'bg-emerald-100 text-emerald-600',top:'from-emerald-500 to-teal-500',    light:'hover:border-emerald-200'},
};

const FALLBACK = [
  { _id:'1', title:'Web Development',    description:'Full-stack apps with Next.js, React & Node.js — fast, scalable, SEO-optimised.', icon:'code',     features:['Next.js & React','REST & GraphQL','Performance-first','SSR / ISR / SSG'] },
  { _id:'2', title:'UI/UX Design',       description:'Human-centred design from wireframes to polished, accessible design systems.',    icon:'design',   features:['Figma prototyping','Design systems','WCAG accessibility','Motion design'] },
  { _id:'3', title:'AI Integration',     description:'Embed LLM capabilities, vector search and autonomous agents into your product.',   icon:'ai',       features:['LLM / RAG pipelines','Chatbots & agents','Computer vision','Predictive analytics'] },
  { _id:'4', title:'Digital Strategy',   description:'Data-driven roadmaps that align your technology with measurable business goals.',  icon:'strategy', features:['Market research','OKR frameworks','Competitive analysis','Growth hacking'] },
  { _id:'5', title:'Cloud Architecture', description:'Resilient, cost-efficient infra at scale — serverless to Kubernetes clusters.',    icon:'cloud',    features:['AWS / GCP / Azure','Kubernetes & Docker','CI/CD pipelines','Zero-downtime'] },
  { _id:'6', title:'SEO & Growth',       description:'Technical SEO, content strategy and CRO that compound organic growth monthly.',    icon:'seo',      features:['Technical SEO audits','Core Web Vitals','Content strategy','A/B testing'] },
];

function ServiceCard({ s, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:'-80px' });
  const c = COLORS[s.icon] || COLORS.code;
  return (
    <motion.div ref={ref}
      initial={{ opacity:0, y:40 }}
      animate={inView ? { opacity:1, y:0 } : {}}
      transition={{ duration:0.6, delay:index*0.1, ease:[.25,.46,.45,.94] }}
      className={`glass-card p-7 rounded-2xl group relative overflow-hidden border border-slate-100/80 ${c.light} transition-all`}>
      {/* Top accent bar */}
      <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${c.top} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}/>
      {/* Icon */}
      <div className={`w-12 h-12 rounded-xl ${c.icon} flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110`}>
        {ICONS[s.icon]||ICONS.code}
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-indigo-700 transition-colors">{s.title}</h3>
      <p className="text-sm text-slate-500 leading-relaxed mb-5">{s.description}</p>
      {s.features?.length > 0 && (
        <ul className="space-y-1.5">
          {s.features.map((f,i) => (
            <li key={i} className="flex items-center gap-2 text-xs text-slate-400">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-indigo-400 flex-shrink-0">
                <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {f}
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}

export default function ServicesSection({ data }) {
  const services = data?.length > 0 ? data : FALLBACK;
  const ref = useRef(null);
  const inView = useInView(ref, { once:true });
  return (
    <section id="services" className="section-pad relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div ref={ref} initial={{ opacity:0, y:30 }} animate={inView?{opacity:1,y:0}:{}}
          transition={{ duration:0.7 }} className="text-center mb-16">
          <span className="badge mb-5 inline-block">Our Expertise</span>
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-4">
            Everything You Need to <span className="gradient-text">Win Online</span>
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            From strategy to execution — we handle the full digital lifecycle so you can focus on growing.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s,i) => <ServiceCard key={s._id||i} s={s} index={i}/>)}
        </div>
      </div>
    </section>
  );
}
