'use client';

import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { adminFetch, apiFetch } from '@/lib/api';

interface Achievement { id: string; year: string; title: string; description: string; category: string; }

export default function EditAchievementForm() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [form, setForm] = useState<Achievement | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    apiFetch<Achievement[]>('/api/achievements')
      .then((items) => { const a = items.find((x) => x.id === id); if (a) setForm(a); })
      .catch(console.error);
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form) return;
    setError('');
    try {
      await adminFetch(`/api/achievements/${id}`, { method: 'PUT', body: JSON.stringify(form) });
      router.push('/admin/achievements');
    } catch { setError('Failed to save. Please try again.'); }
  }

  if (!form) return <div className="admin-content"><p>Loading…</p></div>;

  const f = (k: keyof Achievement) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm({ ...form, [k]: e.target.value });

  return (
    <>
      <div className="admin-topbar"><h1>Edit Achievement</h1></div>
      <div className="admin-content">
        {error && <div className="error-msg">{error}</div>}
        <form onSubmit={handleSubmit} className="admin-form">
          <h2>Edit</h2>
          <div className="form-row">
            <div className="form-group"><label>Year</label><input value={form.year} onChange={f('year')} required /></div>
            <div className="form-group"><label>Category</label>
              <select value={form.category} onChange={f('category')}>
                <option value="FACULTY">Faculty</option>
                <option value="PHD">PhD</option>
                <option value="UG">Masters / UG</option>
              </select>
            </div>
          </div>
          <div className="form-group"><label>Title</label><input value={form.title} onChange={f('title')} required /></div>
          <div className="form-group"><label>Description</label>
            <textarea rows={3} value={form.description} onChange={f('description')} required />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn-save">Update</button>
            <a href="/admin/achievements" className="btn-cancel">Cancel</a>
          </div>
        </form>
      </div>
    </>
  );
}
