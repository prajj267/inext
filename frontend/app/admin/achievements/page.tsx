'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { adminFetch, apiFetch } from '@/lib/api';

interface Achievement { id: string; year: string; title: string; category: string; }
const catLabel: Record<string, string> = { FACULTY: 'Faculty', PHD: 'PhD', UG: 'Masters/UG' };

export default function AdminAchievementsPage() {
  const [items, setItems] = useState<Achievement[]>([]);
  const load = () => apiFetch<Achievement[]>('/api/achievements').then(setItems).catch(console.error);
  useEffect(() => { load(); }, []);

  async function del(id: string) {
    if (!confirm('Delete this achievement?')) return;
    await adminFetch(`/api/achievements/${id}`, { method: 'DELETE' });
    load();
  }

  return (
    <>
      <div className="admin-topbar">
        <h1>Achievements</h1>
        <Link href="/admin/achievements/new" className="btn-new">+ Add Achievement</Link>
      </div>
      <div className="admin-content">
        <div className="admin-list">
          <div className="admin-list-header"><h2>All Achievements ({items.length})</h2></div>
          {items.length === 0 && <p className="empty-state">No achievements yet.</p>}
          {items.map((a) => (
            <div key={a.id} className="admin-item">
              <div className="admin-item-body">
                <strong>{a.title}</strong>
                <span>{a.year} · {catLabel[a.category]}</span>
              </div>
              <div className="admin-item-actions">
                <Link href={`/admin/achievements/${a.id}/edit`} className="btn-edit">Edit</Link>
                <button className="btn-danger" onClick={() => del(a.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
