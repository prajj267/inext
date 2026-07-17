'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';
import MemberCard from '@/components/MemberCard';
import type { Member } from '@/lib/types';

function MemberSection({ id, heading, members }: { id: string; heading: string; members: Member[] }) {
  if (members.length === 0) return null;
  return (
    <section className="members-section" aria-labelledby={id}>
      <h2 id={id}>{heading}</h2>
      <div className="members-grid">
        {members.map((m) => (
          <MemberCard key={m.id ?? m.name} member={m} />
        ))}
      </div>
    </section>
  );
}

export default function MembersPage() {
  const [raw, setRaw]       = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch<Member[]>('/api/members')
      .then((data) =>
        setRaw(data.map((m) => ({
          ...m,
          category: m.category as Member['category'],
          photo: m.photo ?? undefined,
        })))
      )
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const byCat = (cat: string) => raw.filter((m) => m.category === cat);

  return (
    <>
      <div className="page-banner">
        <div className="container">
          <h1>Lab Members</h1>
          <p>Faculty, doctoral researchers, master&apos;s students, and undergraduates shaping the future of AI.</p>
        </div>
      </div>

      <main className="main-content" id="main">
        <div className="container">
          {loading ? (
            <p style={{ color: 'var(--color-accent)', padding: '2rem 0' }}>Loading…</p>
          ) : (
            <>
              <MemberSection id="faculty-heading"  heading="Faculty"            members={byCat('FACULTY')} />
              <MemberSection id="phd-heading"      heading="PhD"                members={byCat('PHD')} />
              <MemberSection id="masters-heading"  heading="Master's Students"  members={byCat('MASTERS')} />
              <MemberSection id="alumni-heading"   heading="Alumni"             members={byCat('ALUMNI')} />
            </>
          )}

          <section className="members-section" aria-labelledby="ug-heading">
            <h2 id="ug-heading">Undergraduate Researchers</h2>
            <p style={{ fontSize: '0.93rem', color: 'var(--color-accent)', marginBottom: '1rem' }}>
              B.Tech students working with i-NEXT, listed by batch year.
            </p>
            <Link href="/students" className="btn-new">View B.Tech Students →</Link>
          </section>

          <section className="members-section" aria-labelledby="interns-heading">
            <h2 id="interns-heading">Research Interns</h2>
            <p style={{ fontSize: '0.93rem', color: 'var(--color-accent)', marginBottom: '1rem' }}>
              Research interns who have worked with i-NEXT, listed by year.
            </p>
            <Link href="/interns" className="btn-new">View Research Interns →</Link>
          </section>
        </div>
      </main>
    </>
  );
}
