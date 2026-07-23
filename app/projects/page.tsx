'use client';

import { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';
import ProjectCard from '@/components/ProjectCard';
import type { Project } from '@/lib/types';

function ProjectSection({ id, heading, projects }: { id: string; heading: string; projects: Project[] }) {
  if (projects.length === 0) return null;
  return (
    <section className="projects-section" aria-labelledby={id}>
      <h2 id={id}>{heading}</h2>
      <div className="project-list">
        {projects.map((p) => (
          <ProjectCard key={p.id ?? p.title} project={p} />
        ))}
      </div>
    </section>
  );
}

export default function ProjectsPage() {
  const [all, setAll]       = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch<Project[]>('/api/projects')
      .then((data) =>
        setAll(data.map((p) => ({ ...p, status: p.status as Project['status'] })))
      )
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const funded      = all.filter((p) => p.category === 'Funded');
  const consultancy = all.filter((p) => p.category === 'Consultancy');

  return (
    <>
      <div className="page-banner">
        <div className="container">
          <h1>Projects</h1>
        </div>
      </div>

      <main className="main-content" id="main">
        <div className="container">
          {loading ? (
            <p style={{ color: 'var(--color-accent)', padding: '2rem 0' }}>Loading…</p>
          ) : (
            <>
              <ProjectSection id="funded-heading"      heading="Funded Projects"      projects={funded} />
              <ProjectSection id="consultancy-heading" heading="Consultancy Projects" projects={consultancy} />
            </>
          )}
        </div>
      </main>
    </>
  );
}
