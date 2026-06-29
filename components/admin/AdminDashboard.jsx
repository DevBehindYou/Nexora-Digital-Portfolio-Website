'use client';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Toaster, toast } from 'react-hot-toast';

/* ─── Icon helpers ──────────────────────────────────────── */
const Icon = ({ d, size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d={d} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ICONS = {
  dashboard: 'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z',
  hero:      'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10',
  services:  'M12 2l3 6.3 6.9.7-5 4.9 1.2 6.9L12 17.3l-6.1 3.5 1.2-6.9-5-4.9 6.9-.7z',
  blog:      'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8',
  cases:     'M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z',
  cta:       'M22 11.08V12a10 10 0 1 1-5.93-9.14 M22 4L12 14.01l-3-3',
  ads:       'M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z M12 8v4l3 3',
  logout:    'M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4 M16 17l5-5-5-5 M21 12H9',
  plus:      'M12 5v14M5 12h14',
  edit:      'M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7 M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z',
  trash:     'M3 6h18 M8 6V4h8v2 M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6',
  close:     'M18 6L6 18M6 6l12 12',
  check:     'M20 6L9 17l-5-5',
  eye:       'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z',
  eyeoff:    'M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24 M1 1l22 22',
  seed:      'M12 22V12M12 12C12 12 7 9 4 6c-1.5-1.5-2-4-1-5.5C4.5.5 6.5 1 8 2.5c2 2 4 4 4 9.5z M12 12c0 0 5-3 8-6 1.5-1.5 2-4 1-5.5C19.5.5 17.5 1 16 2.5c-2 2-4 4-4 9.5z',
};

const NAV_ITEMS = [
  { key: 'dashboard', label: 'Dashboard',    icon: ICONS.dashboard },
  { key: 'hero',      label: 'Hero',          icon: ICONS.hero },
  { key: 'services',  label: 'Services',      icon: ICONS.services },
  { key: 'cases',     label: 'Case Studies',  icon: ICONS.cases },
  { key: 'blogs',     label: 'Blog Posts',    icon: ICONS.blog },
  { key: 'ads',       label: 'Ads & Banners', icon: ICONS.ads },
  { key: 'cta',       label: 'CTA Section',   icon: ICONS.cta },
  { key: 'contacts',  label: 'Enquiries',     icon: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6' },
];

/* ─── Generic CRUD hooks ────────────────────────────────── */
function useResource(endpoint) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(endpoint);
      const data = await res.json();
      const key = Object.keys(data).find(k => k !== 'error');
      setItems(Array.isArray(data[key]) ? data[key] : data[key] ? [data[key]] : []);
    } finally { setLoading(false); }
  }, [endpoint]);

  const create = async (body) => {
    const res = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    if (!res.ok) { const d = await res.json(); throw new Error(d.error || 'Create failed'); }
    await load();
  };

  const update = async (id, body) => {
    const url = id ? `${endpoint}/${id}` : endpoint;
    const res = await fetch(url, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    if (!res.ok) { const d = await res.json(); throw new Error(d.error || 'Update failed'); }
    await load();
  };

  const remove = async (id) => {
    const res = await fetch(`${endpoint}/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Delete failed');
    await load();
  };

  return { items, loading, load, create, update, remove };
}

/* ─── Modal ─────────────────────────────────────────────── */
function Modal({ title, onClose, children }) {
  return (
    <div className="modal-backdrop" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="glass-card rounded-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto" style={{ background: 'rgba(10,12,20,0.97)' }}>
        <div className="flex items-center justify-between p-6 border-b border-white/[0.06]">
          <h3 className="font-bold text-white">{title}</h3>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/[0.06] text-white/40 hover:text-white transition-all">
            <Icon d={ICONS.close} size={16} />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

/* ─── Shared input/textarea ─────────────────────────────── */
function Field({ label, children }) {
  return (
    <div>
      <label className="admin-label">{label}</label>
      {children}
    </div>
  );
}

/* ─── Badge toggle ──────────────────────────────────────── */
function Toggle({ value, onChange, label }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-white/60">{label}</span>
      <button
        type="button"
        onClick={() => onChange(!value)}
        className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${value ? 'bg-indigo-600' : 'bg-white/10'}`}
      >
        <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${value ? 'translate-x-6' : 'translate-x-1'}`} />
      </button>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   SECTION MANAGERS
══════════════════════════════════════════════════════════ */

/* ─── Hero Manager ──────────────────────────────────────── */
function HeroManager() {
  const { items, loading, load, update } = useResource('/api/hero');
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);
  const hero = items[0] || {};

  useEffect(() => { load(); }, [load]);
  useEffect(() => { if (hero._id && !form) setForm({ ...hero }); }, [hero._id]); // eslint-disable-line

  if (loading && !form) return <Loader />;

  const handleSave = async () => {
    setSaving(true);
    try { await update(null, form); toast.success('Hero updated!'); }
    catch (e) { toast.error(e.message); }
    finally { setSaving(false); }
  };

  const initialForm = {
    badge:'', headline:'', subheadline:'', description:'',
    ctaPrimary:'', ctaPrimaryLink:'', ctaSecondary:'', ctaSecondaryLink:''
  };
  const f = form || initialForm;
  const set = (k) => (e) => setForm({ ...f, [k]: e.target.value });

  return (
    <div className="glass-card rounded-2xl p-6 space-y-5 max-w-2xl">
      <h3 className="font-bold text-white mb-2">Edit Hero Section</h3>
      <Field label="Badge text"><input className="admin-input" value={f.badge||''} onChange={set('badge')} placeholder="✦ Award-Winning Agency" /></Field>
      <Field label="Headline (use \\n for line break)"><textarea className="admin-input" rows={2} value={f.headline||''} onChange={set('headline')} /></Field>
      <Field label="Subheadline"><input className="admin-input" value={f.subheadline||''} onChange={set('subheadline')} /></Field>
      <Field label="Description"><textarea className="admin-input" rows={3} value={f.description||''} onChange={set('description')} /></Field>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Primary CTA text"><input className="admin-input" value={f.ctaPrimary||''} onChange={set('ctaPrimary')} /></Field>
        <Field label="Primary CTA link"><input className="admin-input" value={f.ctaPrimaryLink||''} onChange={set('ctaPrimaryLink')} placeholder="#contact" /></Field>
        <Field label="Secondary CTA text"><input className="admin-input" value={f.ctaSecondary||''} onChange={set('ctaSecondary')} /></Field>
        <Field label="Secondary CTA link"><input className="admin-input" value={f.ctaSecondaryLink||''} onChange={set('ctaSecondaryLink')} /></Field>
      </div>
      <button onClick={handleSave} disabled={saving} className="btn-primary">
        {saving ? 'Saving…' : 'Save Changes'}
      </button>
    </div>
  );
}

/* ─── Generic list + CRUD ───────────────────────────────── */
function ResourceManager({ endpoint, title, columns, emptyForm, renderForm, rowLabel }) {
  const { items, loading, load, create, update, remove } = useResource(endpoint);
  const [modal, setModal] = useState(null); // null | { mode: 'create'|'edit', data }
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => { load(); }, [load]);

  const openCreate = () => { setForm({ ...emptyForm }); setModal({ mode: 'create' }); };
  const openEdit   = (item) => { setForm({ ...item }); setModal({ mode: 'edit', data: item }); };
  const closeModal = () => setModal(null);

  const handleSave = async () => {
    setSaving(true);
    try {
      if (modal.mode === 'create') { await create(form); toast.success(`${title} created!`); }
      else                         { await update(form._id, form); toast.success(`${title} updated!`); }
      closeModal();
    } catch (e) { toast.error(e.message); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id, label) => {
    if (!confirm(`Delete "${label}"? This cannot be undone.`)) return;
    try { await remove(id); toast.success('Deleted successfully'); }
    catch (e) { toast.error(e.message); }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-bold text-white">{title}</h3>
        <button onClick={openCreate} className="btn-primary py-2 px-4 text-sm">
          <Icon d={ICONS.plus} size={14} />
          <span>Add {title}</span>
        </button>
      </div>

      {/* Table */}
      <div className="glass-card rounded-2xl overflow-hidden">
        {loading ? <div className="p-10 text-center"><Loader /></div> : (
          items.length === 0 ? (
            <div className="p-12 text-center text-white/30 text-sm">
              No {title.toLowerCase()} yet. Click "Add" to create your first one.
            </div>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>{columns.map(c => <th key={c.key}>{c.label}</th>)}<th>Actions</th></tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item._id}>
                    {columns.map(c => (
                      <td key={c.key}>
                        {c.render ? c.render(item[c.key], item) : (
                          <span className="line-clamp-1 max-w-xs">{String(item[c.key] ?? '—')}</span>
                        )}
                      </td>
                    ))}
                    <td>
                      <div className="flex items-center gap-2">
                        <button onClick={() => openEdit(item)} className="p-1.5 rounded-lg hover:bg-white/[0.07] text-white/40 hover:text-indigo-400 transition-all">
                          <Icon d={ICONS.edit} size={14} />
                        </button>
                        <button onClick={() => handleDelete(item._id, rowLabel(item))} className="p-1.5 rounded-lg hover:bg-red-500/10 text-white/40 hover:text-red-400 transition-all">
                          <Icon d={ICONS.trash} size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
        )}
      </div>

      {/* Modal */}
      {modal && (
        <Modal title={modal.mode === 'create' ? `New ${title}` : `Edit ${title}`} onClose={closeModal}>
          {renderForm(form, setForm)}
          <div className="flex gap-3 mt-6">
            <button onClick={closeModal} className="btn-glass flex-1 justify-center">Cancel</button>
            <button onClick={handleSave} disabled={saving} className="btn-primary flex-1 justify-center">
              {saving ? 'Saving…' : modal.mode === 'create' ? 'Create' : 'Save Changes'}
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

/* ─── Services ──────────────────────────────────────────── */
function ServicesManager() {
  return (
    <ResourceManager
      endpoint="/api/services"
      title="Service"
      rowLabel={(s) => s.title}
      columns={[
        { key: 'title', label: 'Title' },
        { key: 'icon',  label: 'Icon', render: (v) => <span className="badge">{v}</span> },
        { key: 'active',label: 'Status', render: (v) => <StatusBadge active={v} /> },
      ]}
      emptyForm={{ title:'', description:'', icon:'code', features:'', order:0, active:true }}
      renderForm={(f, setF) => {
        const s = (k) => (e) => setF({ ...f, [k]: e.target.value });
        return (
          <div className="space-y-4">
            <Field label="Title"><input className="admin-input" value={f.title||''} onChange={s('title')} /></Field>
            <Field label="Description"><textarea className="admin-input" rows={3} value={f.description||''} onChange={s('description')} /></Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Icon key">
                <select className="admin-input" value={f.icon||'code'} onChange={s('icon')}>
                  {['code','design','ai','strategy','cloud','seo'].map(v=><option key={v}>{v}</option>)}
                </select>
              </Field>
              <Field label="Order"><input type="number" className="admin-input" value={f.order||0} onChange={s('order')} /></Field>
            </div>
            <Field label="Features (comma-separated)"><input className="admin-input" value={Array.isArray(f.features)?f.features.join(', '):(f.features||'')} onChange={(e)=>setF({...f, features: e.target.value.split(',').map(x=>x.trim())})} /></Field>
            <Toggle value={f.active} onChange={(v) => setF({ ...f, active: v })} label="Active" />
          </div>
        );
      }}
    />
  );
}

/* ─── Blogs ─────────────────────────────────────────────── */
function BlogsManager() {
  return (
    <ResourceManager
      endpoint="/api/blogs"
      title="Blog Post"
      rowLabel={(b) => b.title}
      columns={[
        { key: 'title',     label: 'Title' },
        { key: 'author',    label: 'Author' },
        { key: 'readTime',  label: 'Read Time' },
        { key: 'published', label: 'Status', render: (v) => <StatusBadge active={v} trueLabel="Published" falseLabel="Draft" /> },
      ]}
      emptyForm={{ title:'', slug:'', excerpt:'', content:'', author:'Nexora Team', tags:'', readTime:'5 min read', published:false, coverColor:'blue' }}
      renderForm={(f, setF) => {
        const s = (k) => (e) => setF({ ...f, [k]: e.target.value });
        return (
          <div className="space-y-4">
            <Field label="Title"><input className="admin-input" value={f.title||''} onChange={(e)=>{setF({...f, title:e.target.value, slug:e.target.value.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'')}); }} /></Field>
            <Field label="Slug"><input className="admin-input" value={f.slug||''} onChange={s('slug')} /></Field>
            <Field label="Author"><input className="admin-input" value={f.author||''} onChange={s('author')} /></Field>
            <Field label="Excerpt"><textarea className="admin-input" rows={2} value={f.excerpt||''} onChange={s('excerpt')} /></Field>
            <Field label="Content (Markdown)"><textarea className="admin-input" rows={5} value={f.content||''} onChange={s('content')} /></Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Read time"><input className="admin-input" value={f.readTime||''} onChange={s('readTime')} /></Field>
              <Field label="Cover color">
                <select className="admin-input" value={f.coverColor||'blue'} onChange={s('coverColor')}>
                  {['blue','purple','cyan'].map(v=><option key={v}>{v}</option>)}
                </select>
              </Field>
            </div>
            <Field label="Tags (comma-separated)"><input className="admin-input" value={Array.isArray(f.tags)?f.tags.join(', '):(f.tags||'')} onChange={(e)=>setF({...f, tags:e.target.value.split(',').map(x=>x.trim())})} /></Field>
            <Toggle value={f.published} onChange={(v) => setF({ ...f, published: v })} label="Published" />
          </div>
        );
      }}
    />
  );
}

/* ─── Case Studies ──────────────────────────────────────── */
function CasesManager() {
  return (
    <ResourceManager
      endpoint="/api/case-studies"
      title="Case Study"
      rowLabel={(c) => c.title}
      columns={[
        { key: 'title',       label: 'Title' },
        { key: 'client',      label: 'Client' },
        { key: 'industry',    label: 'Industry' },
        { key: 'accentColor', label: 'Color', render: (v) => <span className="badge">{v}</span> },
        { key: 'active',      label: 'Status', render: (v) => <StatusBadge active={v} /> },
      ]}
      emptyForm={{ title:'', client:'', industry:'', description:'', challenge:'', solution:'', results:'', stats:'', tags:'', accentColor:'blue', featured:false, active:true }}
      renderForm={(f, setF) => {
        const s = (k) => (e) => setF({ ...f, [k]: e.target.value });
        const parseStats = (v) => {
          try { return JSON.parse(v); } catch { return v; }
        };
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Field label="Title"><input className="admin-input" value={f.title||''} onChange={s('title')} /></Field>
              <Field label="Client"><input className="admin-input" value={f.client||''} onChange={s('client')} /></Field>
              <Field label="Industry"><input className="admin-input" value={f.industry||''} onChange={s('industry')} /></Field>
              <Field label="Accent color">
                <select className="admin-input" value={f.accentColor||'blue'} onChange={s('accentColor')}>
                  {['blue','purple','cyan','pink','green'].map(v=><option key={v}>{v}</option>)}
                </select>
              </Field>
            </div>
            <Field label="Description"><textarea className="admin-input" rows={2} value={f.description||''} onChange={s('description')} /></Field>
            <Field label="Challenge"><textarea className="admin-input" rows={2} value={f.challenge||''} onChange={s('challenge')} /></Field>
            <Field label="Solution"><textarea className="admin-input" rows={2} value={f.solution||''} onChange={s('solution')} /></Field>
            <Field label="Results"><textarea className="admin-input" rows={2} value={f.results||''} onChange={s('results')} /></Field>
            <Field label='Stats (JSON: [{"label":"X","value":"Y"}])'>
              <textarea className="admin-input font-mono text-xs" rows={3} value={typeof f.stats==='string' ? f.stats : JSON.stringify(f.stats)} onChange={(e)=>setF({...f,stats:parseStats(e.target.value)})} />
            </Field>
            <Field label="Tags (comma-separated)"><input className="admin-input" value={Array.isArray(f.tags)?f.tags.join(', '):(f.tags||'')} onChange={(e)=>setF({...f,tags:e.target.value.split(',').map(x=>x.trim())})} /></Field>
            <Toggle value={f.active} onChange={(v) => setF({ ...f, active: v })} label="Active" />
          </div>
        );
      }}
    />
  );
}

/* ─── Ads ───────────────────────────────────────────────── */
function AdsManager() {
  return (
    <ResourceManager
      endpoint="/api/ads"
      title="Ad"
      rowLabel={(a) => a.title}
      columns={[
        { key: 'title',       label: 'Title' },
        { key: 'ctaText',     label: 'CTA' },
        { key: 'accentColor', label: 'Color', render: (v) => <span className="badge">{v}</span> },
        { key: 'active',      label: 'Status', render: (v) => <StatusBadge active={v} /> },
      ]}
      emptyForm={{ title:'', description:'', ctaText:'Learn More', ctaLink:'#', badge:'', accentColor:'blue', active:true, order:0 }}
      renderForm={(f, setF) => {
        const s = (k) => (e) => setF({ ...f, [k]: e.target.value });
        return (
          <div className="space-y-4">
            <Field label="Title"><input className="admin-input" value={f.title||''} onChange={s('title')} /></Field>
            <Field label="Description"><textarea className="admin-input" rows={3} value={f.description||''} onChange={s('description')} /></Field>
            <Field label="Badge"><input className="admin-input" value={f.badge||''} onChange={s('badge')} placeholder="🚀 Special Offer" /></Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="CTA button text"><input className="admin-input" value={f.ctaText||''} onChange={s('ctaText')} /></Field>
              <Field label="CTA link"><input className="admin-input" value={f.ctaLink||''} onChange={s('ctaLink')} /></Field>
              <Field label="Accent color">
                <select className="admin-input" value={f.accentColor||'blue'} onChange={s('accentColor')}>
                  {['blue','purple','cyan','pink','green'].map(v=><option key={v}>{v}</option>)}
                </select>
              </Field>
              <Field label="Order"><input type="number" className="admin-input" value={f.order||0} onChange={s('order')} /></Field>
            </div>
            <Toggle value={f.active} onChange={(v) => setF({ ...f, active: v })} label="Active" />
          </div>
        );
      }}
    />
  );
}

/* ─── CTA Manager ───────────────────────────────────────── */
function CTAManager() {
  const { items, loading, load, update } = useResource('/api/cta');
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);
  const cta = items[0] || {};

  useEffect(() => { load(); }, [load]);
  useEffect(() => { if (cta._id && !form) setForm({ ...cta }); }, [cta._id]); // eslint-disable-line

  if (loading && !form) return <Loader />;
  const f = form || {};
  const s = (k) => (e) => setForm({ ...f, [k]: e.target.value });

  const handleSave = async () => {
    setSaving(true);
    try { await update(null, form); toast.success('CTA updated!'); }
    catch (e) { toast.error(e.message); }
    finally { setSaving(false); }
  };

  return (
    <div className="glass-card rounded-2xl p-6 space-y-5 max-w-2xl">
      <h3 className="font-bold text-white mb-2">Edit CTA Section</h3>
      <Field label="Badge"><input className="admin-input" value={f.badge||''} onChange={s('badge')} /></Field>
      <Field label="Headline (use \\n for line break)"><textarea className="admin-input" rows={2} value={f.headline||''} onChange={s('headline')} /></Field>
      <Field label="Description"><textarea className="admin-input" rows={3} value={f.description||''} onChange={s('description')} /></Field>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Primary CTA text"><input className="admin-input" value={f.primaryCta||''} onChange={s('primaryCta')} /></Field>
        <Field label="Primary CTA link"><input className="admin-input" value={f.primaryCtaLink||''} onChange={s('primaryCtaLink')} /></Field>
        <Field label="Secondary CTA text"><input className="admin-input" value={f.secondaryCta||''} onChange={s('secondaryCta')} /></Field>
        <Field label="Secondary CTA link"><input className="admin-input" value={f.secondaryCtaLink||''} onChange={s('secondaryCtaLink')} /></Field>
      </div>
      <button onClick={handleSave} disabled={saving} className="btn-primary">{saving ? 'Saving…' : 'Save Changes'}</button>
    </div>
  );
}

/* ─── Dashboard Overview ────────────────────────────────── */
function DashboardOverview({ onTab }) {
  const [counts, setCounts] = useState({});
  const [seeding, setSeeding] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch('/api/services').then(r=>r.json()),
      fetch('/api/blogs').then(r=>r.json()),
      fetch('/api/case-studies').then(r=>r.json()),
      fetch('/api/ads').then(r=>r.json()),
      fetch('/api/contact').then(r=>r.json()),
    ]).then(([sv,bl,cs,ad,ct]) => {
      setCounts({
        services:     sv.services?.length     || 0,
        blogs:        bl.blogs?.length         || 0,
        caseStudies:  cs.caseStudies?.length   || 0,
        ads:          ad.ads?.length           || 0,
        contacts:     ct.contacts?.length      || 0,
      });
    });
  }, []);

  const handleSeed = async () => {
    if (!confirm('This will replace ALL existing data with sample data. Continue?')) return;
    setSeeding(true);
    try {
      const res = await fetch('/api/seed');
      const data = await res.json();
      if (data.success) { toast.success('Database seeded! Reload the website to see results.'); }
      else toast.error(data.error || 'Seed failed');
    } catch { toast.error('Seed request failed'); }
    finally { setSeeding(false); }
  };

  const stats = [
    { label: 'Services',     value: counts.services     || 0, color: 'text-indigo-400', tab: 'services' },
    { label: 'Blog Posts',   value: counts.blogs        || 0, color: 'text-violet-400', tab: 'blogs'    },
    { label: 'Case Studies', value: counts.caseStudies  || 0, color: 'text-cyan-400',   tab: 'cases'    },
    { label: 'Active Ads',   value: counts.ads          || 0, color: 'text-pink-400',   tab: 'ads'      },
    { label: 'Enquiries',     value: counts.contacts     || 0, color: 'text-amber-400',  tab: 'contacts' },
  ];

  return (
    <div>
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {stats.map(({ label, value, color, tab }) => (
          <button key={label} onClick={() => onTab(tab)} className="glass-card rounded-2xl p-5 text-left hover:scale-[1.02] transition-transform">
            <p className={`text-3xl font-black ${color}`}>{value}</p>
            <p className="text-sm text-white/40 mt-1">{label}</p>
          </button>
        ))}
      </div>

      {/* Quick actions */}
      <div className="glass-card rounded-2xl p-6 mb-6">
        <h3 className="font-bold text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {NAV_ITEMS.filter(n => n.key !== 'dashboard').map(n => (
            <button key={n.key} onClick={() => onTab(n.key)} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/[0.05] border border-white/[0.06] text-left transition-all group">
              <span className="text-indigo-400 group-hover:text-indigo-300"><Icon d={n.icon} size={16}/></span>
              <span className="text-sm text-white/60 group-hover:text-white">{n.label}</span>
              <span className="ml-auto text-white/20 text-xs">→</span>
            </button>
          ))}
        </div>
      </div>

      {/* Seed section */}
      <div className="glass-card rounded-2xl p-6 border border-amber-500/15">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-bold text-white mb-1">Seed Sample Data</h3>
            <p className="text-sm text-white/40">Populate the database with professional demo content to see the website in action immediately.</p>
          </div>
          <button onClick={handleSeed} disabled={seeding} className="btn-glass py-2.5 px-5 text-sm whitespace-nowrap flex-shrink-0 border-amber-500/20 text-amber-300 hover:bg-amber-500/10">
            {seeding ? 'Seeding…' : '⚡ Seed DB'}
          </button>
        </div>
        <div className="mt-4 p-3 rounded-xl bg-amber-500/8 border border-amber-500/15">
          <p className="text-xs text-amber-400/70">⚠ Warning: this will overwrite all existing content.</p>
        </div>
      </div>
    </div>
  );
}

/* ─── Helpers ───────────────────────────────────────────── */
function Loader() {
  return (
    <div className="flex justify-center py-10">
      <svg className="animate-spin w-6 h-6 text-indigo-400" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="32" strokeDashoffset="12"/>
      </svg>
    </div>
  );
}

function StatusBadge({ active, trueLabel = 'Active', falseLabel = 'Inactive' }) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${active ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25' : 'bg-white/5 text-white/35 border border-white/10'}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${active ? 'bg-emerald-400' : 'bg-white/30'}`} />
      {active ? trueLabel : falseLabel}
    </span>
  );
}


/* ─── Contacts / Enquiries viewer ──────────────────────── */
function ContactsManager() {
  const { items, loading, load } = useResource('/api/contact');
  useEffect(() => { load(); }, [load]);
  const fmt = (d) => d ? new Date(d).toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' }) : '';
  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-bold text-white">Contact Enquiries</h3>
        <span className="badge">{items.length} total</span>
      </div>
      <div className="glass-card rounded-2xl overflow-hidden">
        {loading ? <div className="p-10 text-center"><Loader/></div> : items.length === 0 ? (
          <div className="p-12 text-center text-white/30 text-sm">No enquiries yet. They will appear here when visitors submit the contact form.</div>
        ) : (
          <table className="admin-table">
            <thead><tr><th>Name</th><th>Email</th><th>Company</th><th>Service</th><th>Budget</th><th>Message</th><th>Date</th></tr></thead>
            <tbody>
              {items.map(c => (
                <tr key={c._id}>
                  <td><span className="font-medium text-white">{c.name}</span></td>
                  <td><a href={"mailto:"+c.email} className="text-indigo-400 hover:underline">{c.email}</a></td>
                  <td>{c.company || <span className="text-white/25">—</span>}</td>
                  <td>{c.service ? <span className="badge text-xs">{c.service}</span> : <span className="text-white/25">—</span>}</td>
                  <td><span className="text-white/60 text-xs">{c.budget || '—'}</span></td>
                  <td><span className="line-clamp-1 max-w-[180px] text-white/60 text-xs">{c.message}</span></td>
                  <td><span className="text-white/40 text-xs">{fmt(c.createdAt)}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

const PANEL_MAP = {
  dashboard: DashboardOverview,
  hero:      HeroManager,
  services:  ServicesManager,
  cases:     CasesManager,
  blogs:     BlogsManager,
  ads:       AdsManager,
  cta:       CTAManager,
  contacts:  ContactsManager,
};

/* ══════════════════════════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════════════════════════ */
export default function AdminDashboard() {
  const router = useRouter();
  const [active, setActive] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  const Panel = PANEL_MAP[active] || DashboardOverview;

  return (
    <div className="admin-dark min-h-screen flex" style={{ background:'#03040a', color:'#f8fafc' }}>
      <Toaster position="top-right" toastOptions={{
        className: 'toast-glass',
        style: { background: 'rgba(10,12,20,0.97)', color: '#f8fafc', border: '1px solid rgba(255,255,255,0.12)' },
      }} />

      {/* Mobile overlay */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/60 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-64 z-40 flex flex-col transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
             style={{ background: 'rgba(6,7,14,0.97)', backdropFilter: 'blur(30px)', WebkitBackdropFilter: 'blur(30px)', borderRight: '1px solid rgba(255,255,255,0.07)' }}>
        {/* Logo */}
        <div className="p-5 border-b border-white/[0.06]">
          <div className="flex items-center gap-2.5">
            <svg width="30" height="30" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="9" fill="url(#sidebarLogo)"/>
              <path d="M7 16L12 11L17 16L22 11" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M7 21L12 16L17 21L22 16" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
              <defs><linearGradient id="sidebarLogo" x1="0" y1="0" x2="32" y2="32"><stop stopColor="#6366f1"/><stop offset="1" stopColor="#8b5cf6"/></linearGradient></defs>
            </svg>
            <div>
              <p className="font-bold text-white text-sm leading-none">Nexora</p>
              <p className="text-[10px] text-white/30 mt-0.5">Admin Panel</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map(({ key, label, icon }) => (
            <button
              key={key}
              onClick={() => { setActive(key); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                active === key
                  ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/25'
                  : 'text-white/45 hover:text-white hover:bg-white/[0.05]'
              }`}
            >
              <span className={active === key ? 'text-indigo-400' : ''}><Icon d={icon} size={15}/></span>
              {label}
            </button>
          ))}
        </nav>

        {/* Bottom actions */}
        <div className="p-3 border-t border-white/[0.06] space-y-1">
          <a href="/" target="_blank" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/40 hover:text-white hover:bg-white/[0.05] transition-all">
            <Icon d={ICONS.eye} size={15}/>
            View Website
          </a>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/40 hover:text-red-400 hover:bg-red-500/[0.08] transition-all">
            <Icon d={ICONS.logout} size={15}/>
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-20 px-6 py-4 border-b border-white/[0.06]"
                style={{ background: 'rgba(3,4,10,0.9)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button className="lg:hidden p-2 rounded-lg hover:bg-white/[0.06] text-white/50" onClick={() => setSidebarOpen(true)}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M3 5h12M3 9h12M3 13h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
              </button>
              <div>
                <h1 className="font-bold text-white text-lg leading-none">
                  {NAV_ITEMS.find(n => n.key === active)?.label || 'Dashboard'}
                </h1>
                <p className="text-xs text-white/30 mt-0.5">Nexora Digital CMS</p>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.07]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs text-white/40">Connected</span>
            </div>
          </div>
        </header>

        {/* Page body */}
        <main className="flex-1 p-6">
          <Panel onTab={setActive} />
        </main>
      </div>
    </div>
  );
}
