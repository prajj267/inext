'use client';

import { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';
import AchievementItem from '@/components/AchievementItem';
import type { Achievement } from '@/lib/types';

export default function AchievementsPage() {
  const [all, setAll]       = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch<Achievement[]>('/api/achievements')
      .then(setAll)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const byCat = (cat: string) =>
    all.filter((a) => a.category === cat);

  function Section({ id, heading, items, className }: {
    id: string; heading: string; items: Achievement[]; className?: string;
  }) {
    if (items.length === 0) return null;
    return (
      <section aria-labelledby={id} className={className}>
        <h2 className="section-heading" id={id}>{heading}</h2>
        <ul className="achievements-list">
          {items.map((a) => (
            <AchievementItem key={a.id ?? a.title} achievement={a} />
          ))}
        </ul>
      </section>
    );
  }

  return (
    <>
      <div className="page-banner">
        <div className="container">
          <h1>Achievements</h1>
        </div>
      </div>

      <main className="main-content" id="main">
        <div className="container">
          {loading ? (
            <p style={{ color: 'var(--color-accent)', padding: '2rem 0' }}>Loading…</p>
          ) : (
            <>
              <Section id="faculty-ach-heading" heading="Faculty"                              items={byCat('FACULTY')} />
              <Section id="phd-ach-heading"     heading="PhD Students"                         items={byCat('PHD')}     className="mt-3" />
              <Section id="ug-ach-heading"       heading="Master's &amp; Undergraduate Students" items={byCat('UG')}      className="mt-3" />
            </>
          )}
        </div>
      </main>
    </>
  );
}
