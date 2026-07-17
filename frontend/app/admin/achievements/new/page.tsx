'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { adminFetch } from '@/lib/api';

export default function NewAchievementPage() {
  const router = useRouter();
  const [form, setForm] = useState({ year: '', title: '', description: '', category: 'FACULTY' });
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    try {
      await adminFetch('/api/achievements', { method: 'POST', body: JSON.stringify(form) });
      router.push('/admin/achievements');
    } catch { setError('Failed to save. Please try again.'); }
  }

  const f = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm({ ...form, [k]: e.target.value });

  return (
    <>
      <div className="admin-topbar"><h1>Add Achievement</h1></div>
      <div className="admin-content">
        {error && <div className="error-msg">{error}</div>}
        <form onSubmit={handleSubmit} className="admin-form">
          <h2>New Achievement</h2>
          <div className="form-row">
            <div className="form-group"><label>Year</label><input value={form.year} onChange={f('year')} placeholder="2025" required /></div>
            <div className="form-group"><label>Category</label>
              <select value={form.category} onChange={f('category')}>
                <option value="FACULTY">Faculty</option>
                <option value="PHD">PhD</option>
                <option value="UG">Masters / UG</option>
              </select>
            </div>
          </div>
          <div className="form-group"><label>Title</label><input value={form.title} onChange={f('title')} required /></div>
          <div className="form-group"><label>Description</label><textarea rows={3} value={form.description} onChange={f('description')} required /></div>
          <div className="form-actions">
            <button type="submit" className="btn-save">Save</button>
            <a href="/admin/achievements" className="btn-cancel">Cancel</a>
          </div>
        </form>
      </div>
    </>
  );
}
