'use client';

import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { adminFetch, apiFetch } from '@/lib/api';

interface NewsItem { id: string; date: string; tag: string; body: string; }

export default function EditNewsForm() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [form, setForm] = useState<NewsItem | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    apiFetch<NewsItem[]>('/api/news')
      .then((items) => { const item = items.find((n) => n.id === id); if (item) setForm(item); })
      .catch(console.error);
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form) return;
    setError('');
    try {
      await adminFetch(`/api/news/${id}`, { method: 'PUT', body: JSON.stringify(form) });
      router.push('/admin/news');
    } catch { setError('Failed to save. Please try again.'); }
  }

  if (!form) return <div className="admin-content"><p>Loading…</p></div>;

  return (
    <>
      <div className="admin-topbar"><h1>Edit News Item</h1></div>
      <div className="admin-content">
        {error && <div className="error-msg">{error}</div>}
        <form onSubmit={handleSubmit} className="admin-form">
          <h2>Edit</h2>
          <div className="form-row">
            <div className="form-group">
              <label>Date</label>
              <input value={form.date} onChange={e => setForm({...form, date: e.target.value})} required />
            </div>
            <div className="form-group">
              <label>Tag</label>
              <select value={form.tag} onChange={e => setForm({...form, tag: e.target.value})}>
                <option value="PAPER">Paper</option>
                <option value="AWARD">Award</option>
                <option value="TALK">Talk</option>
                <option value="EVENT">Event</option>
                <option value="MISC">Misc</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label>Body (use **text** for bold)</label>
            <textarea rows={4} value={form.body} onChange={e => setForm({...form, body: e.target.value})} required />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn-save">Update</button>
            <a href="/admin/news" className="btn-cancel">Cancel</a>
          </div>
        </form>
      </div>
    </>
  );
}
