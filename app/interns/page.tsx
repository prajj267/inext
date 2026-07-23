'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';

interface Intern { id: string; name: string; focus: string; }

function getYear(focus: string) {
  const m = focus.match(/Year:\s*(\d{4})/);
  return m ? m[1] : 'Other';
}

function getResearch(focus: string) {
  const parts = focus.split('·').map((s) => s.trim()).filter(Boolean);
  return parts
    .filter((p) =>
      !p.match(/^Year:/) &&
      !p.match(/(University|Institute|Technology|College|Indraprastha|Manipal|Chandigarh|Brainware|Ramgarh|Vinayaka|Harcourt|Gobind|Bhubaneswar|SriCity|Warangal|Arunachal|UEM|IEM|NIT|IIIT)/i)
    )
    .join(' — ').trim();
}

export default function InternsPage() {
  const [interns, setInterns] = useState<Intern[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch<{ category: string; name: string; focus: string; id: string }[]>('/api/members')
      .then((all) => setInterns(all.filter((m) => m.category === 'INTERN')))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const grouped: Record<string, Intern[]> = {};
  for (const s of interns) {
    const y = getYear(s.focus);
    (grouped[y] ??= []).push(s);
  }
  const years = Object.keys(grouped).sort((a, b) => Number(b) - Number(a));

  return (
    <>
      <div className="page-banner">
        <div className="container">
          <h1>Research Interns</h1>
        </div>
      </div>
      <main className="main-content" id="main">
        <div className="container">
          <div style={{ marginBottom: '1.5rem' }}>
            <Link href="/members" className="btn-cancel" style={{ fontSize: '0.85rem' }}>
              ← Back to Members
            </Link>
          </div>
          {loading ? <p style={{ color: 'var(--color-accent)' }}>Loading…</p> : years.map((year) => (
            <section key={year} className="students-batch-section" aria-labelledby={`year-${year}`}>
              <h2 id={`year-${year}`} className="students-batch-heading">{year}</h2>
              <ul className="students-list">
                {grouped[year].map((intern) => {
                  const research = getResearch(intern.focus);
                  return (
                    <li key={intern.id} className="students-list-item">
                      <span className="student-name">{intern.name}</span>
                      {research && <span className="student-work"> — {research}</span>}
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
