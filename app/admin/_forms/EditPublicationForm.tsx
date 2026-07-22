'use client';

import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { adminFetch, apiFetch } from '@/lib/api';

interface Author { text: string; bold: boolean; order: number; }
interface Pub { id: string; title: string; venue: string; year: number; pubType: string; pdfPath?: string; doiUrl?: string; authors: Author[]; }

export default function EditPublicationForm() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [pub, setPub] = useState<Pub | null>(null);
  const [authorsText, setAuthorsText] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    apiFetch<Pub[]>('/api/publications').then((ps) => {
      const p = ps.find((x) => x.id === id);
      if (p) { setPub(p); setAuthorsText(p.authors.map((a) => a.bold ? `${a.text}*` : a.text).join(', ')); }
    }).catch(console.error);
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!pub) return;
    setError('');
    const authors = authorsText.split(',').map((s) => s.trim()).filter(Boolean)
      .map((s) => { const bold = s.endsWith('*'); return { text: bold ? s.slice(0, -1).trim() : s, bold }; });
    try {
      await adminFetch(`/api/publications/${id}`, { method: 'PUT', body: JSON.stringify({ ...pub, authors }) });
      router.push('/admin/publications');
    } catch { setError('Failed to save. Please try again.'); }
  }

  if (!pub) return <div className="admin-content"><p>Loading…</p></div>;

  const f = (k: keyof Pub) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setPub({ ...pub, [k]: e.target.value });

  return (
    <>
      <div className="admin-topbar"><h1>Edit Publication</h1></div>
      <div className="admin-content">
        {error && <div className="error-msg">{error}</div>}
        <form onSubmit={handleSubmit} className="admin-form">
          <h2>Edit</h2>
          <div className="form-group"><label>Title</label><input value={pub.title} onChange={f('title')} required /></div>
          <div className="form-group">
            <label>Authors — add <code>*</code> after lab member names</label>
            <input value={authorsText} onChange={e => setAuthorsText(e.target.value)} required />
          </div>
          <div className="form-row">
            <div className="form-group"><label>Venue</label><input value={pub.venue} onChange={f('venue')} required /></div>
            <div className="form-group"><label>Year</label><input type="number" value={pub.year} onChange={f('year')} required /></div>
          </div>
          <div className="form-row">
            <div className="form-group"><label>Type</label>
              <select value={pub.pubType} onChange={f('pubType')}>
                <option value="Journal">Journal</option><option value="Conference">Conference</option>
              </select>
            </div>
            <div className="form-group"><label>DOI URL</label><input value={pub.doiUrl ?? ''} onChange={f('doiUrl')} /></div>
          </div>
          <div className="form-actions">
            <button type="submit" className="btn-save">Update</button>
            <a href="/admin/publications" className="btn-cancel">Cancel</a>
          </div>
        </form>
      </div>
    </>
  );
}
