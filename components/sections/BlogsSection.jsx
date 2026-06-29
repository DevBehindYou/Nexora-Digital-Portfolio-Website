'use client';
import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';

const COVERS = {
  blue:   'from-indigo-100 via-blue-50 to-cyan-50',
  purple: 'from-purple-100 via-violet-50 to-pink-50',
  cyan:   'from-cyan-100 via-teal-50 to-blue-50',
  pink:   'from-pink-100 via-rose-50 to-orange-50',
  green:  'from-emerald-100 via-green-50 to-teal-50',
};
const COVER_ACCENT = {
  blue:   'from-indigo-500 to-cyan-500',
  purple: 'from-purple-500 to-pink-500',
  cyan:   'from-cyan-500 to-teal-500',
  pink:   'from-pink-500 to-rose-500',
  green:  'from-emerald-500 to-teal-500',
};
const TAG_COLORS = {
  blue:   'bg-indigo-50 text-indigo-700 border-indigo-200',
  purple: 'bg-purple-50 text-purple-700 border-purple-200',
  cyan:   'bg-cyan-50 text-cyan-700 border-cyan-200',
  pink:   'bg-pink-50 text-pink-700 border-pink-200',
  green:  'bg-emerald-50 text-emerald-700 border-emerald-200',
};

const FALLBACK = [
  { _id:'1', title:'Glassmorphism in 2025: The Design Language Redefining Digital Interfaces',    excerpt:'How Apple-inspired frosted glass aesthetics evolved into a mature design paradigm powering next-gen SaaS products.', author:'Aisha Patel',        readTime:'6 min read',  tags:['Design','UI/UX','Trends'],        publishedAt:'2025-01-15', coverColor:'blue'   },
  { _id:'2', title:'Building AI-Native Products: A Technical Blueprint for Founders',             excerpt:'A practical guide to embedding LLMs, vector search and autonomous agents into your product architecture from day one.', author:'Marcus Chen',        readTime:'9 min read',  tags:['AI','Engineering','Startups'],    publishedAt:'2025-01-08', coverColor:'purple' },
  { _id:'3', title:'Next.js 14 App Router: Lessons from 50 Production Deployments',              excerpt:'Hard-won insights on server components, streaming, caching strategies and performance patterns from real production apps.',  author:'Nexora Engineering', readTime:'11 min read', tags:['Next.js','Performance'],          publishedAt:'2024-12-22', coverColor:'cyan'   },
  { _id:'4', title:'The Psychology of Conversion: Why Users Click and What Makes Them Stay',     excerpt:'A deep-dive into cognitive biases, micro-interactions and page structure decisions that double conversion rates.',          author:'Sara Malik',         readTime:'7 min read',  tags:['CRO','UX','Psychology'],         publishedAt:'2024-12-10', coverColor:'pink'   },
  { _id:'5', title:'From Monolith to Microservices: A Migration Playbook for Engineering Teams', excerpt:'Step-by-step guidance on strangler-fig decomposition, service contracts and avoiding the distributed-monolith trap.',       author:'Dev Patel',          readTime:'14 min read', tags:['Architecture','Engineering'],     publishedAt:'2024-11-28', coverColor:'green'  },
];

const fmt = (d) =>
  d ? new Date(d).toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' }) : '';

/* ─── Single blog card ──────────────────────────────────── */
function BlogCard({ b, index, trackInView }) {
  const ref      = useRef(null);
  const inView   = useInView(ref, { once: true, margin: '-40px' });
  const cover    = COVERS[b.coverColor]       || COVERS.blue;
  const accent   = COVER_ACCENT[b.coverColor] || COVER_ACCENT.blue;
  const tagColor = TAG_COLORS[b.coverColor]   || TAG_COLORS.blue;

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: Math.min(index * 0.08, 0.32), ease: [.25,.46,.45,.94] }}
      className="flex-shrink-0 w-[300px] sm:w-[340px] glass-card rounded-2xl overflow-hidden group
                 cursor-pointer flex flex-col border border-slate-100/80 select-none"
      style={{ scrollSnapAlign: 'start' }}
    >
      {/* Cover */}
      <div className={`h-44 bg-gradient-to-br ${cover} relative overflow-hidden flex-shrink-0 flex items-center justify-center`}>
        {/* Decorative blobs */}
        <div className={`absolute w-24 h-24 rounded-full bg-gradient-to-br ${accent} opacity-20 -top-6 -left-4 blur-xl`} />
        <div className={`absolute w-32 h-32 rounded-full bg-gradient-to-br ${accent} opacity-10 bottom-0 right-0 blur-2xl`} />
        {/* Centre icon */}
        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${accent} opacity-25 rotate-12 group-hover:rotate-6 transition-transform duration-500`} />
        {/* Tags */}
        <div className="absolute bottom-3 left-4 flex flex-wrap gap-1.5">
          {b.tags?.slice(0, 2).map(t => (
            <span key={t}
              className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${tagColor} bg-white/80 backdrop-blur-sm`}>
              {t}
            </span>
          ))}
        </div>
        {/* Read time pill */}
        <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-white/75 backdrop-blur-sm border border-white/80 text-[11px] text-slate-600 font-medium">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <circle cx="5" cy="5" r="4.5" stroke="currentColor" strokeWidth="1"/>
            <path d="M5 2.5v2.5l1.5 1" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
          </svg>
          {b.readTime}
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-sm font-bold text-slate-900 leading-snug mb-2 group-hover:text-indigo-700
                       transition-colors line-clamp-2">
          {b.title}
        </h3>
        <p className="text-xs text-slate-500 leading-relaxed mb-4 line-clamp-3 flex-1">
          {b.excerpt}
        </p>
        {/* Author row */}
        <div className="flex items-center justify-between pt-3.5 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${accent} flex-shrink-0`} />
            <div>
              <p className="text-[11px] font-semibold text-slate-700 leading-none">{b.author}</p>
              <p className="text-[10px] text-slate-400 mt-0.5">{fmt(b.publishedAt)}</p>
            </div>
          </div>
          <span className="text-[11px] font-medium text-indigo-500 group-hover:text-indigo-700
                           transition-colors flex items-center gap-1">
            Read
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M2 5h6M5.5 2.5l3 2.5-3 2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </div>
      </div>
    </motion.article>
  );
}

/* ─── Arrow button ──────────────────────────────────────── */
function ArrowBtn({ direction, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === 'left' ? 'Scroll left' : 'Scroll right'}
      className={`
        group flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center
        border transition-all duration-200
        ${disabled
          ? 'bg-white/50 border-slate-200 text-slate-300 cursor-not-allowed'
          : 'bg-white border-slate-200 text-slate-600 hover:bg-indigo-600 hover:border-indigo-600 hover:text-white shadow-sm hover:shadow-[0_4px_16px_rgba(99,102,241,0.35)] cursor-pointer'
        }
      `}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        {direction === 'left'
          ? <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          : <path d="M6 3l5 5-5 5"  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        }
      </svg>
    </button>
  );
}

/* ─── Progress dots ─────────────────────────────────────── */
function ProgressDots({ total, active }) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={`rounded-full transition-all duration-300 ${
            i === active
              ? 'w-5 h-2 bg-indigo-500'
              : 'w-2 h-2 bg-slate-300'
          }`}
        />
      ))}
    </div>
  );
}

/* ─── Main section ──────────────────────────────────────── */
export default function BlogsSection({ data }) {
  const blogs       = data?.length > 0 ? data : FALLBACK;
  const scrollRef   = useRef(null);
  const titleRef    = useRef(null);
  const titleInView = useInView(titleRef, { once: true });

  const [canLeft,  setCanLeft]  = useState(false);
  const [canRight, setCanRight] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);

  /* Card width + gap — matches CSS values */
  const CARD_W = typeof window !== 'undefined' && window.innerWidth < 640 ? 300 + 16 : 340 + 20;

  const updateArrows = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 8);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
    // active dot
    const idx = Math.round(el.scrollLeft / CARD_W);
    setActiveIdx(Math.min(idx, blogs.length - 1));
  }, [CARD_W, blogs.length]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateArrows();
    el.addEventListener('scroll', updateArrows, { passive: true });
    window.addEventListener('resize', updateArrows, { passive: true });
    return () => {
      el.removeEventListener('scroll', updateArrows);
      window.removeEventListener('resize', updateArrows);
    };
  }, [updateArrows]);

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * CARD_W * 2, behavior: 'smooth' });
  };

  return (
    <section id="blog" className="section-pad relative z-10">
      <div className="max-w-7xl mx-auto px-6">

        {/* ── Header row ── */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10"
        >
          <div>
            <span className="badge mb-4 inline-block">Insights & Articles</span>
            <h2 className="text-4xl sm:text-5xl font-black text-slate-900 leading-tight">
              Ideas Worth{' '}
              <span className="gradient-text">Reading</span>
            </h2>
            <p className="text-slate-500 mt-3 text-base max-w-md leading-relaxed">
              Deep dives on design, engineering and digital growth from the Nexora team.
            </p>
          </div>

          {/* Arrow controls — top right on desktop */}
          <div className="flex items-center gap-3 sm:mb-1">
            <ProgressDots total={blogs.length} active={activeIdx} />
            <div className="flex items-center gap-2 ml-2">
              <ArrowBtn direction="left"  onClick={() => scroll(-1)} disabled={!canLeft}  />
              <ArrowBtn direction="right" onClick={() => scroll(1)}  disabled={!canRight} />
            </div>
          </div>
        </motion.div>

        {/* ── Scrollable track ── */}
        <div className="relative">
          {/* Left fade */}
          <div className={`absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none
                           bg-gradient-to-r from-white/60 to-transparent
                           transition-opacity duration-300 ${canLeft ? 'opacity-100' : 'opacity-0'}`} />
          {/* Right fade */}
          <div className={`absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none
                           bg-gradient-to-l from-white/60 to-transparent
                           transition-opacity duration-300 ${canRight ? 'opacity-100' : 'opacity-0'}`} />

          <div
            ref={scrollRef}
            id="blog-scroll"
            className="flex gap-5 overflow-x-auto pb-4 -mb-4 cursor-grab active:cursor-grabbing"
            style={{
              scrollSnapType:      'x mandatory',
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth:      'none',   /* Firefox */
              msOverflowStyle:     'none',   /* IE/Edge */
            }}
            /* hide webkit scrollbar via inline — CSS class approach conflicts */
            onMouseDown={(e) => {
              const el = e.currentTarget;
              el.dataset.dragging = '0';
              el.dataset.startX   = e.pageX - el.offsetLeft;
              el.dataset.scrollL  = el.scrollLeft;
              const move = (ev) => {
                const x    = ev.pageX - el.offsetLeft;
                const walk = (x - Number(el.dataset.startX)) * 1.2;
                el.scrollLeft = Number(el.dataset.scrollL) - walk;
              };
              const up = () => {
                el.removeEventListener('mousemove', move);
                el.removeEventListener('mouseup', up);
              };
              el.addEventListener('mousemove', move);
              el.addEventListener('mouseup', up);
            }}
          >
            {/* Inline style to hide webkit scrollbar */}
            <style>{`
              #blog-scroll::-webkit-scrollbar { display: none; }
            `}</style>

            {blogs.map((b, i) => (
              <BlogCard key={b._id || i} b={b} index={i} />
            ))}

            {/* Trailing spacer so last card doesn't hug edge */}
            <div className="flex-shrink-0 w-2" aria-hidden="true" />
          </div>
        </div>

        {/* ── Mobile arrow strip ── */}
        <div className="flex items-center justify-between mt-6 sm:hidden">
          <span className="text-sm text-slate-400">
            {activeIdx + 1} / {blogs.length}
          </span>
          <div className="flex gap-2">
            <ArrowBtn direction="left"  onClick={() => scroll(-1)} disabled={!canLeft}  />
            <ArrowBtn direction="right" onClick={() => scroll(1)}  disabled={!canRight} />
          </div>
        </div>

      </div>
    </section>
  );
}
