'use client';

import { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';
import NewsItemRow from '@/components/NewsItemRow';

interface NewsItem {
  id: string;
  date: string;
  tag: string;
  body: string;
}

export default function NewsPage() {
  const [items, setItems]   = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch<NewsItem[]>('/api/news')
      .then(setItems)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="page-banner">
        <div className="container">
          <h1>News &amp; Events</h1>
          <p>Paper acceptances, invited talks, workshops, and other lab announcements — newest first.</p>
        </div>
      </div>

      <main className="main-content" id="main">
        <div className="container">
          {loading ? (
            <p style={{ color: 'var(--color-accent)', padding: '2rem 0' }}>Loading…</p>
          ) : (
            <ul className="news-list" aria-label="Lab news and events">
              {items.map((item) => (
                <NewsItemRow key={item.id} item={item} />
              ))}
            </ul>
          )}
        </div>
      </main>
    </>
  );
}
