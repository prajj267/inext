'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { clearToken } from '@/lib/api';

const links = [
  { href: '/admin',              label: '🏠  Dashboard' },
  { href: '/admin/news',         label: '📢  News' },
  { href: '/admin/members',      label: '👥  Members' },
  { href: '/admin/publications',  label: '📄  Publications' },
  { href: '/admin/projects',     label: '🔬  Projects' },
  { href: '/admin/achievements',  label: '🏆  Achievements' },
  { href: '/admin/slides',       label: '🖼️  Hero Slides' },
];

export default function AdminNav() {
  const pathname = usePathname();
  const router   = useRouter();

  function handleSignOut() {
    clearToken();
    router.push('/login');
  }

  return (
    <aside className="admin-sidebar">
      <Link href="/admin" className="sidebar-logo">
        iNEXT Admin
        <span>IIT Patna</span>
      </Link>

      <nav className="admin-nav">
        {links.map(({ href, label }) => {
          const isActive = href === '/admin' ? pathname === '/admin' : pathname.startsWith(href);
          return (
            <Link key={href} href={href} className={isActive ? 'active' : undefined}>
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <button className="btn-signout" onClick={handleSignOut}>Sign out</button>
      </div>
    </aside>
  );
}
