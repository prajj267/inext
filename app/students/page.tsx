'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';

interface Student { id: string; name: string; focus: string; }

function getBatch(focus: string): string {
  const m = focus.match(/Batch:\s*([\d–\-]+)/);
  return m ? m[1] : 'Other';
}

function getWork(focus: string): string {
  return focus
    .replace(/·?\s*Roll No:\s*\S+\s*/g, '')
    .replace(/·?\s*Batch:\s*[\d–\-]+\s*/g, '')
    .replace(/^·\s*/, '').trim();
}

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    apiFetch<{ category: string; name: string; focus: string; id: string }[]>('/api/members')
      .then((all) => setStudents(all.filter((m) => m.category === 'UNDERGRAD')))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const grouped: Record<string, Student[]> = {};
  for (const s of students) {
    const b = getBatch(s.focus);
    (grouped[b] ??= []).push(s);
  }
  const batches = Object.keys(grouped).sort((a, b) => {
    const ay = parseInt(a.split(/[–\-]/)[1] ?? a);
    const by = parseInt(b.split(/[–\-]/)[1] ?? b);
    return by - ay;
  });

  return (
    <>
      <div className="page-banner">
        <div className="container">
          <h1>B.Tech Students</h1>
        </div>
      </div>
      <main className="main-content" id="main">
        <div className="container">
          <div style={{ marginBottom: '1.5rem' }}>
            <Link href="/members" className="btn-cancel" style={{ fontSize: '0.85rem' }}>
              ← Back to Members
            </Link>
          </div>
          {loading ? <p style={{ color: 'var(--color-accent)' }}>Loading…</p> : batches.map((batch) => (
            <section key={batch} className="students-batch-section" aria-labelledby={`batch-${batch}`}>
              <h2 id={`batch-${batch}`} className="students-batch-heading">Batch {batch}</h2>
              <ul className="students-list">
                {grouped[batch].map((s) => {
                  const work = getWork(s.focus);
                  return (
                    <li key={s.id} className="students-list-item">
                      <span className="student-name">{s.name}</span>
                      {work && <span className="student-work"> — {work}</span>}
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
      </main>
    </>
  );
}
