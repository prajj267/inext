'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { adminFetch, API_URL, getToken } from '@/lib/api';
import PhotoUploader from '@/components/PhotoUploader';

export default function NewMemberPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '', role: '', category: 'PHD', focus: '', photo: '', order: 0,
    links: '',
  });
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    const links = form.links.split('\n').filter(Boolean).map((l) => {
      const [label, ...rest] = l.split('|');
      return { label: label.trim(), href: rest.join('|').trim() };
    });
    try {
      await adminFetch('/api/members', {
        method: 'POST',
        body: JSON.stringify({ ...form, links, order: Number(form.order) }),
      });
      router.push('/admin/members');
    } catch { setError('Failed to save. Please try again.'); }
  }

  return (
    <>
      <div className="admin-topbar"><h1>Add Member</h1></div>
      <div className="admin-content">
        {error && <div className="error-msg">{error}</div>}
        <form onSubmit={handleSubmit} className="admin-form">
          <h2>New Member</h2>
          <div className="form-row">
            <div className="form-group">
              <label>Name</label>
              <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
            </div>
            <div className="form-group">
              <label>Role</label>
              <input value={form.role} onChange={e => setForm({...form, role: e.target.value})}
                placeholder="e.g. PhD / M.Tech / Lead" required />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Category</label>
              <select value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
                <option value="FACULTY">Faculty</option>
                <option value="PHD">PhD</option>
                <option value="MASTERS">Masters</option>
                <option value="UNDERGRAD">Undergrad</option>
                <option value="ALUMNI">Alumni</option>
                <option value="INTERN">Intern</option>
              </select>
            </div>
            <div className="form-group">
              <label>Order (within category)</label>
              <input type="number" value={form.order} onChange={e => setForm({...form, order: Number(e.target.value)})} />
            </div>
          </div>
          <div className="form-group">
            <label>Research Focus</label>
            <input value={form.focus} onChange={e => setForm({...form, focus: e.target.value})} required />
          </div>
          <div className="form-group">
            <label>Photo</label>
            <PhotoUploader
              currentPhoto={form.photo}
              onUpload={(url) => setForm({...form, photo: url})}
            />
          </div>
          <div className="form-group">
            <label>Links — one per line: <code>Label | URL</code></label>
            <textarea rows={4} value={form.links} onChange={e => setForm({...form, links: e.target.value})}
              placeholder={'Email | mailto:name@iitp.ac.in\nScholar | https://scholar.google.com/...'} />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn-save">Save</button>
            <a href="/admin/members" className="btn-cancel">Cancel</a>
          </div>
        </form>
      </div>
    </>
  );
}
