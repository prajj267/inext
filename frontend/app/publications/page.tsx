'use client';

import { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';
import PublicationEntry from '@/components/PublicationEntry';
import type { Publication } from '@/lib/types';

function groupByYear(pubs: Publication[]) {
  const map: Record<number, Publication[]> = {};
  for (const p of pubs) { (map[p.year] ??= []).push(p); }
  return Object.keys(map).map(Number).sort((a, b) => b - a)
    .map((year) => ({ year, entries: map[year] }));
}

export default function PublicationsPage() {
  const [all, setAll]       = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch<Publication[]>('/api/publications')
      .then(setAll)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const journals    = all.filter((p) => p.pubType === 'Journal');
  const conferences = all.filter((p) => p.pubType === 'Conference');

  return (
    <>
      <div className="page-banner">
        <div className="container">
          <h1>Publications</h1>
          <p>{journals.length} journal papers &nbsp;·&nbsp; {conferences.length} conference papers</p>
        </div>
      </div>

      <main className="main-content" id="main">
        <div className="container">
          {loading ? (
            <p style={{ color: 'var(--color-accent)', padding: '2rem 0' }}>Loading…</p>
          ) : (
            <>
              {/* Journals */}
              <section aria-labelledby="journals-heading" style={{ marginBottom: '3rem' }}>
                <h2 className="pub-type-heading" id="journals-heading">
                  Journal Papers
                  <span className="pub-type-count">{journals.length}</span>
                </h2>
                {groupByYear(journals).map(({ year, entries }) => (
                  <div key={year} className="pub-year-group">
                    <h3 className="pub-year-heading">{year}</h3>
                    <div className="pub-list">
                      {entries.map((pub) => (
                        <PublicationEntry key={pub.id} pub={pub} />
                      ))}
                    </div>
                  </div>
                ))}
              </section>

              {/* Conferences */}
              <section aria-labelledby="conferences-heading">
                <h2 className="pub-type-heading" id="conferences-heading">
                  Conference Papers
                  <span className="pub-type-count">{conferences.length}</span>
                </h2>
                {groupByYear(conferences).map(({ year, entries }) => (
                  <div key={year} className="pub-year-group">
                    <h3 className="pub-year-heading">{year}</h3>
                    <div className="pub-list">
                      {entries.map((pub) => (
                        <PublicationEntry key={pub.id} pub={pub} />
                      ))}
                    </div>
                  </div>
                ))}
              </section>
            </>
          )}
        </div>
      </main>
    </>
  );
}
