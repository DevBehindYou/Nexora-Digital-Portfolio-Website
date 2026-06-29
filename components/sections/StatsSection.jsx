'use client';
import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

const FALLBACK = [
  { _id:'1', label:'Projects Delivered', value:'500', suffix:'+',  prefix:''  },
  { _id:'2', label:'Client Satisfaction', value:'98',  suffix:'%',  prefix:''  },
  { _id:'3', label:'Years of Expertise',  value:'12',  suffix:'+',  prefix:''  },
  { _id:'4', label:'Revenue Generated',   value:'150', suffix:'M+', prefix:'$' },
];

function useCountUp(target, duration=2000, started=false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let start = null;
    const end = parseInt(target, 10);
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setCount(Math.floor(e * end));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);
  return count;
}

function StatItem({ stat, index, started }) {
  const count = useCountUp(stat.value, 2000, started);
  return (
    <motion.div initial={{ opacity:0, y:30 }} animate={started?{opacity:1,y:0}:{}}
      transition={{ duration:0.6, delay:index*0.12 }}
      className="text-center px-6 py-8 relative group">
      {index<3 && <div className="absolute right-0 top-1/4 bottom-1/4 w-px bg-indigo-100 hidden lg:block"/>}
      <div className="text-5xl sm:text-6xl font-black mb-2 leading-none">
        <span className="gradient-text">{stat.prefix}{count}{stat.suffix}</span>
      </div>
      <p className="text-sm font-medium text-slate-500 tracking-wide">{stat.label}</p>
    </motion.div>
  );
}

export default function StatsSection({ data }) {
  const stats = data?.length > 0 ? data : FALLBACK;
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:'-100px' });
  return (
    <section className="relative z-10 py-8">
      <div className="max-w-6xl mx-auto px-6">
        <div ref={ref} className="glass-md rounded-3xl overflow-hidden border border-indigo-100/60"
             style={{ background:'linear-gradient(135deg,rgba(99,102,241,0.06),rgba(139,92,246,0.04),rgba(6,182,212,0.05))' }}>
          <div className="h-px w-full bg-gradient-to-r from-transparent via-indigo-400/40 to-transparent"/>
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {stats.map((s,i) => <StatItem key={s._id||i} stat={s} index={i} started={inView}/>)}
          </div>
          <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"/>
        </div>
      </div>
    </section>
  );
}
