'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { adminFetch } from '@/lib/api';

export default function NewPublicationPage() {
  const router = useRouter();
  const [form, setForm] = useState({ title: '', venue: '', year: new Date().getFullYear(), pubType: 'Journal', pdfPath: '', doiUrl: '', authors: '' });
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    const authors = form.authors.split(',').map((s) => s.trim()).filter(Boolean).map((s) => {
      const bold = s.endsWith('*');
      return { text: bold ? s.slice(0, -1).trim() : s, bold };
    });
    try {
      await adminFetch('/api/publications', { method: 'POST', body: JSON.stringify({ ...form, year: Number(form.year), authors }) });
      router.push('/admin/publications');
    } catch { setError('Failed to save. Please try again.'); }
  }

  const f = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm({ ...form, [k]: e.target.value });

  return (
    <>
      <div className="admin-topbar"><h1>Add Publication</h1></div>
      <div className="admin-content">
        {error && <div className="error-msg">{error}</div>}
        <form onSubmit={handleSubmit} className="admin-form">
          <h2>New Publication</h2>
          <div className="form-group"><label>Title</label><input value={form.title} onChange={f('title')} required /></div>
          <div className="form-group">
            <label>Authors — comma-separated. Add <code>*</code> after lab member names to bold.</label>
            <input value={form.authors} onChange={f('authors')} placeholder="Arijit Roy*, Alice Patel" required />
          </div>
          <div className="form-row">
            <div className="form-group"><label>Venue / Journal</label><input value={form.venue} onChange={f('venue')} required /></div>
            <div className="form-group"><label>Year</label><input type="number" value={form.year} onChange={f('year')} required /></div>
          </div>
          <div className="form-row">
            <div className="form-group"><label>Type</label>
              <select value={form.pubType} onChange={f('pubType')}>
                <option value="Journal">Journal</option>
                <option value="Conference">Conference</option>
              </select>
            </div>
            <div className="form-group"><label>DOI URL</label><input value={form.doiUrl} onChange={f('doiUrl')} /></div>
          </div>
          <div className="form-actions">
            <button type="submit" className="btn-save">Save</button>
            <a href="/admin/publications" className="btn-cancel">Cancel</a>
          </div>
        </form>
      </div>
    </>
  );
}
