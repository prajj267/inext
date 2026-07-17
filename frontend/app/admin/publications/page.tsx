'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { adminFetch, apiFetch } from '@/lib/api';

interface Pub { id: string; title: string; year: number; venue: string; pubType: string; }

export default function AdminPublicationsPage() {
  const [pubs, setPubs] = useState<Pub[]>([]);
  const load = () => apiFetch<Pub[]>('/api/publications').then(setPubs).catch(console.error);
  useEffect(() => { load(); }, []);

  async function del(id: string) {
    if (!confirm('Delete this publication?')) return;
    await adminFetch(`/api/publications/${id}`, { method: 'DELETE' });
    load();
  }

  return (
    <>
      <div className="admin-topbar">
        <h1>Publications</h1>
        <Link href="/admin/publications/new" className="btn-new">+ Add Publication</Link>
      </div>
      <div className="admin-content">
        <div className="admin-list">
          <div className="admin-list-header"><h2>All Publications ({pubs.length})</h2></div>
          {pubs.length === 0 && <p className="empty-state">No publications yet.</p>}
          {pubs.map((p) => (
            <div key={p.id} className="admin-item">
              <div className="admin-item-body">
                <strong>{p.title}</strong>
                <span>{p.year} · {p.pubType} · {p.venue.slice(0, 50)}…</span>
              </div>
              <div className="admin-item-actions">
                <Link href={`/admin/publications/${p.id}/edit`} className="btn-edit">Edit</Link>
                <button className="btn-danger" onClick={() => del(p.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
