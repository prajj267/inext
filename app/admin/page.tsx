'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { adminFetch, API_URL, getToken } from '@/lib/api';

interface Stats {
  members: number; publications: number; projects: number;
  news: number; achievements: number; slides: number;
}

export default function AdminDashboard() {
  const [stats, setStats]   = useState<Stats | null>(null);

  useEffect(() => {
    Promise.all([
      fetch(`${API_URL}/api/members`).then(r => r.json()),
      fetch(`${API_URL}/api/publications`).then(r => r.json()),
      fetch(`${API_URL}/api/projects`).then(r => r.json()),
      fetch(`${API_URL}/api/news`).then(r => r.json()),
      fetch(`${API_URL}/api/achievements`).then(r => r.json()),
      fetch(`${API_URL}/api/slides`).then(r => r.json()),
    ]).then(([members, publications, projects, news, achievements, slides]) => {
      setStats({
        members:      Array.isArray(members)      ? members.length      : 0,
        publications: Array.isArray(publications) ? publications.length : 0,
        projects:     Array.isArray(projects)     ? projects.length     : 0,
        news:         Array.isArray(news)         ? news.length         : 0,
        achievements: Array.isArray(achievements) ? achievements.length : 0,
        slides:       Array.isArray(slides)       ? slides.length       : 0,
      });
    }).catch(console.error);
  }, []);

  const statCards = [
    { label: 'Members',      count: stats?.members,      href: '/admin/members' },
    { label: 'Publications', count: stats?.publications, href: '/admin/publications' },
    { label: 'Projects',     count: stats?.projects,     href: '/admin/projects' },
    { label: 'News Items',   count: stats?.news,         href: '/admin/news' },
    { label: 'Achievements', count: stats?.achievements, href: '/admin/achievements' },
    { label: 'Hero Slides',  count: stats?.slides,       href: '/admin/slides' },
  ];

  return (
    <>
      <div className="admin-topbar">
        <h1>Dashboard</h1>
        <Link href="/" target="_blank" style={{ fontSize: '0.85rem', color: 'var(--color-accent)' }}>
          View public site →
        </Link>
      </div>
      <div className="admin-content">
        <p style={{ marginBottom: '1.5rem', color: 'var(--color-accent)', fontSize: '0.9rem' }}>
          Welcome back. Use the sidebar to manage lab content. Changes appear on the public site immediately.
        </p>
        <div className="admin-stats">
          {statCards.map(({ label, count, href }) => (
            <Link key={label} href={href} style={{ textDecoration: 'none' }}>
              <div className="stat-card">
                <div className="stat-num">{count ?? '…'}</div>
                <div className="stat-label">{label}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
