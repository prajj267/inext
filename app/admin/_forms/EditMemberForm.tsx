'use client';

import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { adminFetch, apiFetch } from '@/lib/api';
import PhotoUploader from '@/components/PhotoUploader';

interface Member {
  id: string; name: string; role: string; category: string;
  focus: string; photo?: string; order: number;
  links: { label: string; href: string }[];
}

export default function EditMemberForm() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [form, setForm] = useState<(Member & { linksText: string }) | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    apiFetch<Member[]>('/api/members').then((members) => {
      const m = members.find((x) => x.id === id);
      if (m) setForm({ ...m, linksText: m.links.map((l) => `${l.label} | ${l.href}`).join('\n') });
    }).catch(console.error);
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form) return;
    setError('');
    const links = form.linksText.split('\n').filter(Boolean).map((l) => {
      const [label, ...rest] = l.split('|');
      return { label: label.trim(), href: rest.join('|').trim() };
    });
    try {
      await adminFetch(`/api/members/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ ...form, links, order: Number(form.order) }),
      });
      router.push('/admin/members');
    } catch { setError('Failed to save. Please try again.'); }
  }

  if (!form) return <div className="admin-content"><p>Loading…</p></div>;

  return (
    <>
      <div className="admin-topbar"><h1>Edit Member</h1></div>
      <div className="admin-content">
        {error && <div className="error-msg">{error}</div>}
        <form onSubmit={handleSubmit} className="admin-form">
          <h2>Edit — {form.name}</h2>
          <div className="form-row">
            <div className="form-group"><label>Name</label>
              <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
            </div>
            <div className="form-group"><label>Role</label>
              <input value={form.role} onChange={e => setForm({...form, role: e.target.value})} required />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group"><label>Category</label>
              <select value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
                <option value="FACULTY">Faculty</option><option value="PHD">PhD</option>
                <option value="MASTERS">Masters</option><option value="UNDERGRAD">Undergrad</option>
                <option value="ALUMNI">Alumni</option><option value="INTERN">Intern</option>
              </select>
            </div>
            <div className="form-group"><label>Order</label>
              <input type="number" value={form.order} onChange={e => setForm({...form, order: Number(e.target.value)})} />
            </div>
          </div>
          <div className="form-group"><label>Research Focus</label>
            <input value={form.focus} onChange={e => setForm({...form, focus: e.target.value})} required />
          </div>
          <div className="form-group"><label>Photo</label>
            <PhotoUploader currentPhoto={form.photo} onUpload={(url) => setForm({...form, photo: url})} />
          </div>
          <div className="form-group">
            <label>Links — one per line: <code>Label | URL</code></label>
            <textarea rows={4} value={form.linksText} onChange={e => setForm({...form, linksText: e.target.value})} />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn-save">Update</button>
            <a href="/admin/members" className="btn-cancel">Cancel</a>
          </div>
        </form>
      </div>
    </>
  );
}
