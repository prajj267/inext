'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

interface NewsItem {
  id: string;
  date: string;
  body: string;
}

interface Props {
  items: NewsItem[];
}

const PAGE_SIZE = 3;

function stripBold(text: string) {
  return text.replace(/\*\*/g, '');
}

export default function NewsRotator({ items }: Props) {
  const [page,    setPage]    = useState(0);
  const [visible, setVisible] = useState(true); // controls fade

  const totalPages = Math.ceil(items.length / PAGE_SIZE);

  useEffect(() => {
    if (totalPages <= 1) return;

    const timer = setInterval(() => {
      // fade out
      setVisible(false);
      setTimeout(() => {
        setPage((prev) => (prev + 1) % totalPages);
        // fade back in
        setVisible(true);
      }, 350); // matches CSS transition
    }, 5000);

    return () => clearInterval(timer);
  }, [totalPages]);

  const current = items.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  return (
    <div className="news-rotator">
      <ul
        className={`news-snippet-list news-rotator-list${visible ? ' nr-visible' : ' nr-hidden'}`}
      >
        {current.map((item) => (
          <li key={item.id}>
            <span className="news-date">{item.date}</span>
            <span className="news-text">{stripBold(item.body)}</span>
          </li>
        ))}
      </ul>

      {/* Page dots */}
      {totalPages > 1 && (
        <div className="nr-dots" aria-hidden="true">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              className={`nr-dot${i === page ? ' nr-dot-active' : ''}`}
              onClick={() => { setVisible(false); setTimeout(() => { setPage(i); setVisible(true); }, 350); }}
              aria-label={`Go to news page ${i + 1}`}
            />
          ))}
        </div>
      )}

      <Link href="/news" className="section-link">View all news →</Link>
    </div>
  );
}
