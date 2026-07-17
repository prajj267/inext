'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';

const navLinks = [
  { href: '/',             label: 'Home' },
  { href: '/members',      label: 'Members' },
  { href: '/publications', label: 'Publications' },
  { href: '/projects',     label: 'Projects' },
  { href: '/news',         label: 'News' },
  { href: '/achievements', label: 'Achievements' },
  { href: '/contact',      label: 'Contact' },
];

export default function Nav() {
  const pathname  = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const navRef    = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        navRef.current    && !navRef.current.contains(e.target as Node) &&
        toggleRef.current && !toggleRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  // Close on route change
  useEffect(() => { setIsOpen(false); }, [pathname]);

  return (
    <>
      <button
        ref={toggleRef}
        className="nav-toggle"
        aria-expanded={isOpen}
        aria-controls="primary-nav"
        aria-label="Toggle navigation"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span />
        <span />
        <span />
      </button>

      <nav
        ref={navRef}
        id="primary-nav"
        className={`primary-nav${isOpen ? ' is-open' : ''}`}
        aria-label="Primary navigation"
      >
        <ul>
          {navLinks.map(({ href, label }) => {
            const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={isActive ? 'active' : undefined}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
