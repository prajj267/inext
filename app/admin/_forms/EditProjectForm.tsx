'use client';

import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { adminFetch, apiFetch } from '@/lib/api';

interface Project {
  id: string; title: string; description: string; status: string;
  category: string; role?: string; funding?: string; amount?: string;
  period?: string; collaborators?: string;
}

export default function EditProjectForm() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [form, setForm] = useState<Project | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    apiFetch<Project[]>('/api/projects')
      .then((ps) => { const p = ps.find((x) => x.id === id); if (p) setForm(p); })
      .catch(console.error);
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form) return;
    setError('');
    try {
      await adminFetch(`/api/projects/${id}`, { method: 'PUT', body: JSON.stringify(form) });
      router.push('/admin/projects');
    } catch { setError('Failed to save. Please try again.'); }
  }

  if (!form) return <div className="admin-content"><p>Loading…</p></div>;

  const f = (k: keyof Project) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm({ ...form, [k]: e.target.value });

  return (
    <>
      <div className="admin-topbar"><h1>Edit Project</h1></div>
      <div className="admin-content">
        {error && <div className="error-msg">{error}</div>}
        <form onSubmit={handleSubmit} className="admin-form">
          <h2>Edit — {form.title}</h2>
          <div className="form-group"><label>Title</label><input value={form.title} onChange={f('title')} required /></div>
          <div className="form-group"><label>Description</label><textarea rows={5} value={form.description} onChange={f('description')} required /></div>
          <div className="form-row">
            <div className="form-group"><label>Category</label>
              <select value={form.category} onChange={f('category')}>
                <option value="Funded">Funded</option><option value="Consultancy">Consultancy</option>
              </select>
            </div>
            <div className="form-group"><label>Status</label>
              <select value={form.status} onChange={f('status')}>
                <option value="ONGOING">Ongoing</option><option value="COMPLETED">Completed</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group"><label>Role</label><input value={form.role ?? ''} onChange={f('role')} /></div>
            <div className="form-group"><label>Duration</label><input value={form.period ?? ''} onChange={f('period')} /></div>
          </div>
          <div className="form-group"><label>Funded by</label><input value={form.funding ?? ''} onChange={f('funding')} /></div>
          <div className="form-row">
            <div className="form-group"><label>Amount</label><input value={form.amount ?? ''} onChange={f('amount')} /></div>
            <div className="form-group"><label>Collaborators</label><input value={form.collaborators ?? ''} onChange={f('collaborators')} /></div>
          </div>
          <div className="form-actions">
            <button type="submit" className="btn-save">Update</button>
            <a href="/admin/projects" className="btn-cancel">Cancel</a>
          </div>
        </form>
      </div>
    </>
  );
}
