'use client';
import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const SERVICES = [
  'Web Development','UI/UX Design','AI Integration',
  'Digital Strategy','Cloud Architecture','SEO & Growth','Other',
];
const BUDGETS = ['< £5K','£5K – £15K','£15K – £50K','£50K – £100K','£100K+','Let\'s discuss'];

const INIT = { name:'', email:'', company:'', service:'', budget:'', message:'' };

export default function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:'-80px' });
  const [form, setForm]       = useState(INIT);
  const [errors, setErrors]   = useState({});
  const [loading, setLoading] = useState(false);
  const [sent, setSent]       = useState(false);
  const [serverErr, setServerErr] = useState('');

  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name    = 'Name is required';
    if (!form.email.trim())   e.email   = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email address';
    if (!form.message.trim()) e.message = 'Message is required';
    return e;
  };

  const set = (k) => (e) => {
    setForm(f => ({ ...f, [k]: e.target.value }));
    if (errors[k]) setErrors(er => ({ ...er, [k]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    setServerErr('');
    try {
      const res  = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) { setSent(true); setForm(INIT); }
      else setServerErr(data.error || 'Something went wrong. Please try again.');
    } catch {
      setServerErr('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const INFO = [
    { icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3 4h14l-7 9-7-9zM10 13v4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/><path d="M2 4l8 9 8-9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>, label:'Email', value:'hello@nexora.digital', href:'mailto:hello@nexora.digital' },
    { icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M14.5 12.5c-.8-.8-1.7-1.5-2.5-.7l-.8.8c-.3.3-1.4-.3-2.5-1.3S7 9.6 7.3 9.3l.8-.8c.8-.8.1-1.7-.7-2.5L6 4.6C5.2 3.8 4.2 3.8 3.5 4.5L2.8 5.2C1.2 6.8 2.8 11.2 6.4 14.8s8 5.2 9.6 3.6l.7-.7c.7-.7.7-1.7-.1-2.5l-2.1-2.7z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>, label:'Phone', value:'+44 20 1234 5678', href:'tel:+442012345678' },
    { icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2a6 6 0 0 1 6 6c0 5-6 10-6 10S4 13 4 8a6 6 0 0 1 6-6z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/><circle cx="10" cy="8" r="2" stroke="currentColor" strokeWidth="1.7"/></svg>, label:'Office', value:'London, United Kingdom', href:'#' },
  ];

  return (
    <section id="contact" className="section-pad relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div ref={ref} initial={{ opacity:0, y:30 }} animate={inView?{opacity:1,y:0}:{}}
          transition={{ duration:0.7 }} className="text-center mb-16">
          <span className="badge mb-5 inline-block">Get in Touch</span>
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-4">
            Let's Start a <span className="gradient-text">Conversation</span>
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Tell us about your project. We'll get back to you within 24 hours with a plan of action.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">

          {/* ── Left panel ── */}
          <motion.div initial={{ opacity:0, x:-30 }} animate={inView?{opacity:1,x:0}:{}}
            transition={{ duration:0.7, delay:0.1 }} className="lg:col-span-2 space-y-6">

            {/* Contact info */}
            <div className="glass-card rounded-2xl p-7 border border-slate-100/80">
              <h3 className="text-lg font-bold text-slate-900 mb-6">Contact Information</h3>
              <div className="space-y-5">
                {INFO.map(({ icon, label, value, href }) => (
                  <a key={label} href={href}
                     className="flex items-start gap-4 group text-slate-600 hover:text-indigo-600 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-500 flex-shrink-0 group-hover:bg-indigo-100 transition-colors">
                      {icon}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">{label}</p>
                      <p className="text-sm font-medium">{value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Response promise */}
            <div className="glass-card rounded-2xl p-6 border border-indigo-100 bg-gradient-to-br from-indigo-50/50 to-purple-50/30">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <circle cx="9" cy="9" r="8" stroke="#6366f1" strokeWidth="1.7"/>
                    <path d="M9 5v4l2.5 2.5" stroke="#6366f1" strokeWidth="1.7" strokeLinecap="round"/>
                  </svg>
                </div>
                <h4 className="font-bold text-slate-900 text-sm">We respond within 24 hours</h4>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Our team reviews every enquiry and will send a tailored proposal or discovery call invite within one business day.
              </p>
            </div>

            {/* Social proof */}
            <div className="glass-card rounded-2xl p-6 border border-slate-100/80">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Trusted by teams at</p>
              <div className="grid grid-cols-3 gap-3">
                {['Stripe','Notion','Linear','Figma','Vercel','GitHub'].map(name => (
                  <div key={name} className="h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                    <span className="text-xs font-bold text-slate-400">{name}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── Right panel — form ── */}
          <motion.div initial={{ opacity:0, x:30 }} animate={inView?{opacity:1,x:0}:{}}
            transition={{ duration:0.7, delay:0.2 }} className="lg:col-span-3">

            <div className="glass-card rounded-2xl p-8 border border-slate-100/80">
              {sent ? (
                /* Success state */
                <motion.div initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }}
                  className="text-center py-12">
                  <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
                    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                      <path d="M8 18l8 8L28 10" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-3">Message Sent! 🎉</h3>
                  <p className="text-slate-500 mb-8 max-w-sm mx-auto">Thanks for reaching out. We'll review your enquiry and get back to you within 24 hours.</p>
                  <button onClick={() => setSent(false)} className="btn-glass px-6 py-3 text-sm">Send Another Message</button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <h3 className="text-xl font-bold text-slate-900 mb-6">Tell us about your project</h3>

                  {serverErr && (
                    <div className="mb-5 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm text-center">{serverErr}</div>
                  )}

                  {/* Row 1 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="contact-label">Full Name *</label>
                      <input className={`contact-input ${errors.name?'border-red-300 focus:border-red-400':''}`}
                        placeholder="Alex Johnson" value={form.name} onChange={set('name')} />
                      {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="contact-label">Email Address *</label>
                      <input type="email" className={`contact-input ${errors.email?'border-red-300 focus:border-red-400':''}`}
                        placeholder="alex@company.com" value={form.email} onChange={set('email')} />
                      {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="contact-label">Company</label>
                      <input className="contact-input" placeholder="Acme Corp" value={form.company} onChange={set('company')} />
                    </div>
                    <div>
                      <label className="contact-label">Service Needed</label>
                      <select className="contact-input" value={form.service} onChange={set('service')}>
                        <option value="">Select a service…</option>
                        {SERVICES.map(s => <option key={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>

                  {/* Budget */}
                  <div className="mb-4">
                    <label className="contact-label">Budget Range</label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {BUDGETS.map(b => (
                        <button type="button" key={b}
                          onClick={() => setForm(f => ({ ...f, budget: b }))}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 ${
                            form.budget===b
                              ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm'
                              : 'bg-white border-slate-200 text-slate-600 hover:border-indigo-300 hover:text-indigo-600'
                          }`}>{b}</button>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="mb-6">
                    <label className="contact-label">Project Details *</label>
                    <textarea rows={5}
                      className={`contact-input resize-none ${errors.message?'border-red-300 focus:border-red-400':''}`}
                      placeholder="Describe your project goals, timeline and any specific requirements…"
                      value={form.message} onChange={set('message')} />
                    {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
                  </div>

                  {/* Submit */}
                  <button type="submit" disabled={loading}
                    className="btn-primary w-full justify-center py-4 text-base disabled:opacity-60 disabled:cursor-not-allowed">
                    {loading ? (
                      <>
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="32" strokeDashoffset="12"/>
                        </svg>
                        Sending…
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M2 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </>
                    )}
                  </button>
                  <p className="text-xs text-slate-400 text-center mt-4">
                    By submitting, you agree to our Privacy Policy. We never share your data.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
