'use client';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';

const AdminDashboard = dynamic(() => import('@/components/admin/AdminDashboard'), {
  ssr: false,
  loading: () => (
    <div className="admin-dark min-h-screen flex items-center justify-center" style={{ background:'#03040a' }}>
      <div className="flex flex-col items-center gap-4">
        <svg className="animate-spin w-8 h-8 text-indigo-400" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="32" strokeDashoffset="12"/>
        </svg>
        <p className="text-white/40 text-sm">Loading dashboard…</p>
      </div>
    </div>
  ),
});

export default function AdminPage() {
  return (
    <Suspense fallback={null}>
      <AdminDashboard />
    </Suspense>
  );
}
