'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { adminFetch, apiFetch } from '@/lib/api';

interface Project { id: string; title: string; status: string; category: string; period?: string; }

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const load = () => apiFetch<Project[]>('/api/projects').then(setProjects).catch(console.error);
  useEffect(() => { load(); }, []);

  async function del(id: string) {
    if (!confirm('Delete this project?')) return;
    await adminFetch(`/api/projects/${id}`, { method: 'DELETE' });
    load();
  }

  return (
    <>
      <div className="admin-topbar">
        <h1>Projects</h1>
        <Link href="/admin/projects/new" className="btn-new">+ Add Project</Link>
      </div>
      <div className="admin-content">
        <div className="admin-list">
          <div className="admin-list-header"><h2>All Projects ({projects.length})</h2></div>
          {projects.length === 0 && <p className="empty-state">No projects yet.</p>}
          {projects.map((p) => (
            <div key={p.id} className="admin-item">
              <div className="admin-item-body">
                <strong>{p.title}</strong>
                <span>{p.status === 'ONGOING' ? '🟢 Ongoing' : '⚫ Completed'} · {p.category} · {p.period ?? '—'}</span>
              </div>
              <div className="admin-item-actions">
                <Link href={`/admin/projects/${p.id}/edit`} className="btn-edit">Edit</Link>
                <button className="btn-danger" onClick={() => del(p.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
