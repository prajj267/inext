'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { adminFetch, apiFetch } from '@/lib/api';

interface NewsItem { id: string; date: string; tag: string; body: string; }
const tagLabel: Record<string, string> = { PAPER:'Paper', AWARD:'Award', TALK:'Talk', EVENT:'Event', MISC:'Misc' };

export default function AdminNewsPage() {
  const [items, setItems] = useState<NewsItem[]>([]);

  const load = () => apiFetch<NewsItem[]>('/api/news').then(setItems).catch(console.error);
  useEffect(() => { load(); }, []);

  async function del(id: string) {
    if (!confirm('Delete this news item?')) return;
    await adminFetch(`/api/news/${id}`, { method: 'DELETE' });
    load();
  }

  return (
    <>
      <div className="admin-topbar">
        <h1>News</h1>
        <Link href="/admin/news/new" className="btn-new">+ Add News</Link>
      </div>
      <div className="admin-content">
        <div className="admin-list">
          <div className="admin-list-header"><h2>All News Items ({items.length})</h2></div>
          {items.length === 0 && <p className="empty-state">No news items yet.</p>}
          {items.map((item) => (
            <div key={item.id} className="admin-item">
              <div className="admin-item-body">
                <strong>[{tagLabel[item.tag] ?? item.tag}] {item.date}</strong>
                <span>{item.body.replace(/\*\*/g, '').slice(0, 100)}…</span>
              </div>
              <div className="admin-item-actions">
                <Link href={`/admin/news/${item.id}/edit`} className="btn-edit">Edit</Link>
                <button className="btn-danger" onClick={() => del(item.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
