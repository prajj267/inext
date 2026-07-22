'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { adminFetch } from '@/lib/api';

export default function NewNewsPage() {
  const router = useRouter();
  const [form, setForm] = useState({ date: '', tag: 'PAPER', body: '' });
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    try {
      await adminFetch('/api/news', { method: 'POST', body: JSON.stringify(form) });
      router.push('/admin/news');
    } catch (err) {
      setError('Failed to save. Please try again.');
    }
  }

  return (
    <>
      <div className="admin-topbar"><h1>Add News Item</h1></div>
      <div className="admin-content">
        {error && <div className="error-msg">{error}</div>}
        <form onSubmit={handleSubmit} className="admin-form">
          <h2>New News Item</h2>
          <div className="form-row">
            <div className="form-group">
              <label>Date</label>
              <input value={form.date} onChange={e => setForm({...form, date: e.target.value})}
                placeholder="e.g. Jun 2025" required />
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
            <textarea rows={4} value={form.body}
              onChange={e => setForm({...form, body: e.target.value})} required />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn-save">Save</button>
            <a href="/admin/news" className="btn-cancel">Cancel</a>
          </div>
        </form>
      </div>
    </>
  );
}
