'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const router = useRouter();
  const [form, setForm]       = useState({ username:'', password:'' });
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const res  = await fetch('/api/auth/login', {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) { router.push('/admin'); router.refresh(); }
      else setError(data.error || 'Invalid credentials');
    } catch { setError('Network error. Please try again.'); }
    finally { setLoading(false); }
  };

  return (
    /* admin-dark wrapper keeps dark theme independent of site theme */
    <div className="admin-dark min-h-screen flex items-center justify-center relative overflow-hidden" style={{ background:'#03040a' }}>
      {/* Orbs */}
      <div className="orb w-96 h-96 bg-indigo-600 opacity-[0.18] animate-float-slow absolute top-0 left-0"/>
      <div className="orb w-80 h-80 bg-violet-600 opacity-[0.12] animate-float-medium absolute bottom-0 right-0"/>

      <div className="relative z-10 w-full max-w-md px-6">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2.5 mb-4">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <rect width="36" height="36" rx="10" fill="url(#loginLogo)"/>
              <path d="M8 18L13 13L18 18L23 13" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 23L13 18L18 23L23 18" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" opacity="0.55"/>
              <defs><linearGradient id="loginLogo" x1="0" y1="0" x2="36" y2="36">
                <stop stopColor="#6366f1"/><stop offset="1" stopColor="#8b5cf6"/>
              </linearGradient></defs>
            </svg>
            <span className="text-xl font-bold text-white">Nexora</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
          <p className="text-sm text-white/40 mt-1">Sign in to manage your content</p>
        </div>

        {/* Card */}
        <div className="glass-card p-8 rounded-2xl">
          {error && (
            <div className="mb-5 p-3 rounded-xl bg-red-500/10 border border-red-500/25 text-red-400 text-sm text-center">{error}</div>
          )}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="admin-label">Username</label>
              <input type="text" className="admin-input" placeholder="admin"
                value={form.username} onChange={e=>setForm({...form,username:e.target.value})}
                required autoComplete="username"/>
            </div>
            <div>
              <label className="admin-label">Password</label>
              <div className="relative">
                <input type={showPass?'text':'password'} className="admin-input pr-10"
                  placeholder="••••••••" value={form.password}
                  onChange={e=>setForm({...form,password:e.target.value})}
                  required autoComplete="current-password"/>
                <button type="button" onClick={()=>setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    {showPass
                      ? <path d="M2 8s2.667-5 6-5 6 5 6 5-2.667 5-6 5-6-5-6-5zM8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z M1 1l14 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                      : <><path d="M2 8s2.667-5 6-5 6 5 6 5-2.667 5-6 5-6-5-6-5z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><circle cx="8" cy="8" r="1.5" stroke="currentColor" strokeWidth="1.4"/></>
                    }
                  </svg>
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading}
              className="btn-primary w-full justify-center mt-2 disabled:opacity-50 disabled:cursor-not-allowed py-3">
              {loading ? (
                <><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="32" strokeDashoffset="12"/></svg>Signing in…</>
              ) : 'Sign In'}
            </button>
          </form>
          <p className="text-center text-xs text-white/20 mt-5">Nexora Digital CMS v1.0 · JWT Auth</p>
        </div>

        <p className="text-center mt-4">
          <a href="/" className="text-sm text-white/25 hover:text-white/50 transition-colors">← Back to website</a>
        </p>
      </div>
    </div>
  );
}
