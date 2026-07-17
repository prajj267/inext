'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { adminFetch } from '@/lib/api';

export default function NewProjectPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: '', description: '', status: 'ONGOING', category: 'Funded',
    role: 'Principal Investigator', funding: '', amount: '', period: '', collaborators: '',
  });
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    try {
      await adminFetch('/api/projects', { method: 'POST', body: JSON.stringify(form) });
      router.push('/admin/projects');
    } catch { setError('Failed to save. Please try again.'); }
  }

  const f = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm({ ...form, [k]: e.target.value });

  return (
    <>
      <div className="admin-topbar"><h1>Add Project</h1></div>
      <div className="admin-content">
        {error && <div className="error-msg">{error}</div>}
        <form onSubmit={handleSubmit} className="admin-form">
          <h2>New Project</h2>
          <div className="form-group"><label>Title</label><input value={form.title} onChange={f('title')} required /></div>
          <div className="form-group"><label>Description</label><textarea rows={5} value={form.description} onChange={f('description')} required /></div>
          <div className="form-row">
            <div className="form-group"><label>Category</label>
              <select value={form.category} onChange={f('category')}>
                <option value="Funded">Funded</option>
                <option value="Consultancy">Consultancy</option>
              </select>
            </div>
            <div className="form-group"><label>Status</label>
              <select value={form.status} onChange={f('status')}>
                <option value="ONGOING">Ongoing</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group"><label>Role</label><input value={form.role} onChange={f('role')} /></div>
            <div className="form-group"><label>Duration</label><input value={form.period} onChange={f('period')} placeholder="e.g. October 2023 – Ongoing" /></div>
          </div>
          <div className="form-group"><label>Funded by</label><input value={form.funding} onChange={f('funding')} /></div>
          <div className="form-row">
            <div className="form-group"><label>Amount</label><input value={form.amount} onChange={f('amount')} placeholder="e.g. INR 2,69,31,450" /></div>
            <div className="form-group"><label>Collaborators</label><input value={form.collaborators} onChange={f('collaborators')} /></div>
          </div>
          <div className="form-actions">
            <button type="submit" className="btn-save">Save</button>
            <a href="/admin/projects" className="btn-cancel">Cancel</a>
          </div>
        </form>
      </div>
    </>
  );
}
