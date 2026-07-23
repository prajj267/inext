'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { adminFetch, API_URL, getToken } from '@/lib/api';
import PhotoUploader from '@/components/PhotoUploader';

export default function NewMemberPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '', role: '', category: 'PHD', focus: '', photo: '', order: 0,
    organization: '', thesisTitle: '', batch: '',
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
      // Clean up empty string values to null
      const cleanedForm = {
        ...form,
        role: form.role?.trim() || null,
        organization: form.organization?.trim() || null,
        thesisTitle: form.thesisTitle?.trim() || null,
        batch: form.batch?.trim() || null,
      };
      
      await adminFetch('/api/members', {
        method: 'POST',
        body: JSON.stringify({ ...cleanedForm, links, order: Number(form.order) }),
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
              <label>Role (optional)</label>
              <input value={form.role} onChange={e => setForm({...form, role: e.target.value})} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Category</label>
              <select value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
                <option value="FACULTY">Lead</option>
                <option value="PHD">Ph.D.</option>
                <option value="MASTERS">Masters</option>
                <option value="UNDERGRAD">Undergrad</option>
                <option value="ALUMNI">Alumni</option>
                <option value="INTERN">Intern</option>
              </select>
            </div>
            <div className="form-group">
              <label>Order</label>
              <input type="number" value={form.order} onChange={e => setForm({...form, order: Number(e.target.value)})} />
            </div>
          </div>
          
          <div className="form-group">
            <label>Research Focus</label>
            <input value={form.focus} onChange={e => setForm({...form, focus: e.target.value})} required />
          </div>
          
          {/* Optional fields for all members */}
          <div className="form-group">
            <label>Organization (optional)</label>
            <input value={form.organization} onChange={e => setForm({...form, organization: e.target.value})} 
                   placeholder="e.g., Google, Microsoft, IIT Delhi" />
          </div>
          <div className="form-group">
            <label>Thesis Title (optional)</label>
            <input value={form.thesisTitle} onChange={e => setForm({...form, thesisTitle: e.target.value})} 
                   placeholder="Title of thesis work" />
          </div>
          <div className="form-group">
            <label>Batch (optional)</label>
            <input value={form.batch} onChange={e => setForm({...form, batch: e.target.value})} 
                   placeholder="e.g., 2015-2019" />
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
