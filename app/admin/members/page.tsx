'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { adminFetch, apiFetch } from '@/lib/api';

interface Member { id: string; name: string; role: string; category: string; focus: string; }
const catLabel: Record<string, string> = { FACULTY:'Faculty', PHD:'PhD', MASTERS:"Master's", UNDERGRAD:'UG', ALUMNI:'Alumni', INTERN:'Intern' };

export default function AdminMembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const load = () => apiFetch<Member[]>('/api/members').then(setMembers).catch(console.error);
  useEffect(() => { load(); }, []);

  async function del(id: string) {
    if (!confirm('Delete this member?')) return;
    await adminFetch(`/api/members/${id}`, { method: 'DELETE' });
    load();
  }

  return (
    <>
      <div className="admin-topbar">
        <h1>Members</h1>
        <Link href="/admin/members/new" className="btn-new">+ Add Member</Link>
      </div>
      <div className="admin-content">
        <div className="admin-list">
          <div className="admin-list-header"><h2>All Members ({members.length})</h2></div>
          {members.length === 0 && <p className="empty-state">No members yet.</p>}
          {members.map((m) => (
            <div key={m.id} className="admin-item">
              <div className="admin-item-body">
                <strong>{m.name}</strong>
                <span>{catLabel[m.category]} — {m.role} — {m.focus.slice(0, 60)}…</span>
              </div>
              <div className="admin-item-actions">
                <Link href={`/admin/members/${m.id}/edit`} className="btn-edit">Edit</Link>
                <button className="btn-danger" onClick={() => del(m.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
