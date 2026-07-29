'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';
import MemberCard from '@/components/MemberCard';
import LeadCard from '@/components/LeadCard';
import type { Member } from '@/lib/types';

function MemberSection({ id, heading, members }: { id: string; heading: string; members: Member[] }) {
  if (members.length === 0) return null;
  
  // Check if this is the Lead section
  const isLeadSection = members.length === 1 && members[0].category === 'FACULTY';
  
  return (
    <section className="members-section" aria-labelledby={id}>
      <h2 id={id}>{heading}</h2>
      {isLeadSection ? (
        // Single horizontal card for lead
        <LeadCard member={members[0]} />
      ) : (
        // Grid for other members
        <div className="members-grid">
          {members.map((m) => (
            <MemberCard key={m.id ?? m.name} member={m} />
          ))}
        </div>
      )}
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

  const byCat = (cat: string) => {
    const members = raw.filter((m) => m.category === cat);
    
    // Sort by order field (lower numbers first)
    return members.sort((a, b) => a.order - b.order);
  };
  
  const byCatAndStatus = (cat: string, status: string) => {
    const members = raw.filter((m) => m.category === cat && m.status === status);
    
    // Sort by order field (lower numbers first)
    return members.sort((a, b) => a.order - b.order);
  };

  const phdCurrent = byCatAndStatus('PHD', 'CURRENT');
  const mastersCurrent = byCatAndStatus('MASTERS', 'CURRENT');
  const phdAlumni = byCatAndStatus('PHD', 'ALUMNI');
  const mastersAlumni = byCatAndStatus('MASTERS', 'ALUMNI');
  
  // Legacy alumni (those with category ALUMNI)
  const legacyAlumni = byCat('ALUMNI');

  return (
    <>
      <div className="page-banner">
        <div className="container">
          <h1>Lab Members</h1>
        </div>
      </div>

      <main className="main-content" id="main">
        <div className="container">
          {loading ? (
            <p style={{ color: 'var(--color-accent)', padding: '2rem 0' }}>Loading…</p>
          ) : (
            <>
              <MemberSection id="faculty-heading"  heading="Lead" members={byCat('FACULTY')} />
              
              {/* Current Scholars Section */}
              {(phdCurrent.length > 0 || mastersCurrent.length > 0) && (
                <section className="members-section" aria-labelledby="scholars-heading">
                  <h2 id="scholars-heading">Current Scholars</h2>
                  
                  {/* Ph.D. Students - Grouped by Supervisor/Co-Supervisor/Regular */}
                  {phdCurrent.length > 0 && (
                    <>
                      <h3 style={{ 
                        fontSize: '1.25rem', 
                        fontWeight: 500, 
                        marginBottom: '1.5rem',
                        color: 'var(--color-accent)'
                      }}>Ph.D.</h3>
                      
                      {/* Supervisor Subsection */}
                      {(() => {
                        const supervisors = phdCurrent.filter(m => m.isSupervisor);
                        return supervisors.length > 0 ? (
                          <div style={{ marginBottom: '2.5rem' }}>
                            <h4 style={{
                              fontSize: '0.95rem',
                              fontWeight: 600,
                              marginBottom: '1rem',
                              color: 'var(--color-text)',
                              textTransform: 'uppercase',
                              letterSpacing: '0.05em'
                            }}>
                              Supervisor
                            </h4>
                            <div className="members-grid">
                              {supervisors.map((m) => (
                                <MemberCard key={m.id ?? m.name} member={m} />
                              ))}
                            </div>
                          </div>
                        ) : null;
                      })()}
                      
                      {/* Co-Supervisor Subsection */}
                      {(() => {
                        const coSupervisors = phdCurrent.filter(m => m.isCoSupervisor);
                        return coSupervisors.length > 0 ? (
                          <div style={{ marginBottom: '2.5rem' }}>
                            <h4 style={{
                              fontSize: '0.95rem',
                              fontWeight: 600,
                              marginBottom: '1rem',
                              color: 'var(--color-text)',
                              textTransform: 'uppercase',
                              letterSpacing: '0.05em'
                            }}>
                              Co-Supervisor
                            </h4>
                            <div className="members-grid">
                              {coSupervisors.map((m) => (
                                <MemberCard key={m.id ?? m.name} member={m} />
                              ))}
                            </div>
                          </div>
                        ) : null;
                      })()}
                      
                      {/* Regular PhD Students (not supervisor or co-supervisor) */}
                      {(() => {
                        const regularPhd = phdCurrent.filter(m => !m.isSupervisor && !m.isCoSupervisor);
                        return regularPhd.length > 0 ? (
                          <div className="members-grid" style={{ marginBottom: '2rem' }}>
                            {regularPhd.map((m) => (
                              <MemberCard key={m.id ?? m.name} member={m} />
                            ))}
                          </div>
                        ) : null;
                      })()}
                    </>
                  )}
                  
                  {/* Master's Students */}
                  {mastersCurrent.length > 0 && (
                    <>
                      <h3 style={{ 
                        fontSize: '1.25rem', 
                        fontWeight: 500, 
                        marginBottom: '1rem',
                        color: 'var(--color-accent)'
                      }}>Master&apos;s</h3>
                      <div className="members-grid">
                        {mastersCurrent.map((m) => (
                          <MemberCard key={m.id ?? m.name} member={m} />
                        ))}
                      </div>
                    </>
                  )}
                </section>
              )}
              
              {/* Alumni Section - Divided by Ph.D. and Master's */}
              {(phdAlumni.length > 0 || mastersAlumni.length > 0 || legacyAlumni.length > 0) && (
                <section className="members-section" aria-labelledby="alumni-heading">
                  <h2 id="alumni-heading">Alumni</h2>
                  
                  {/* Ph.D. Alumni */}
                  {phdAlumni.length > 0 && (
                    <>
                      <h3 style={{ 
                        fontSize: '1.25rem', 
                        fontWeight: 500, 
                        marginBottom: '1rem',
                        color: 'var(--color-accent)'
                      }}>Ph.D.</h3>
                      <div className="members-grid" style={{ marginBottom: '2rem' }}>
                        {phdAlumni.map((m) => (
                          <MemberCard key={m.id ?? m.name} member={m} />
                        ))}
                      </div>
                    </>
                  )}
                  
                  {/* Master's Alumni */}
                  {mastersAlumni.length > 0 && (
                    <>
                      <h3 style={{ 
                        fontSize: '1.25rem', 
                        fontWeight: 500, 
                        marginBottom: '1rem',
                        color: 'var(--color-accent)'
                      }}>Master&apos;s</h3>
                      <div className="members-grid" style={{ marginBottom: '2rem' }}>
                        {mastersAlumni.map((m) => (
                          <MemberCard key={m.id ?? m.name} member={m} />
                        ))}
                      </div>
                    </>
                  )}
                  
                  {/* Legacy Alumni (for backwards compatibility) */}
                  {legacyAlumni.length > 0 && (
                    <div className="members-grid">
                      {legacyAlumni.map((m) => (
                        <MemberCard key={m.id ?? m.name} member={m} />
                      ))}
                    </div>
                  )}
                </section>
              )}
            </>
          )}

          <section className="members-section" aria-labelledby="ug-heading">
            <h2 id="ug-heading">Undergraduate Researchers</h2>
            <p style={{ fontSize: '0.93rem', color: 'var(--color-accent)', marginBottom: '1rem' }}>
              B.Tech students working with iNEXT, listed by batch year.
            </p>
            <Link href="/students" className="btn-new">View B.Tech Students →</Link>
          </section>

          <section className="members-section" aria-labelledby="interns-heading">
            <h2 id="interns-heading">Research Interns</h2>
            <p style={{ fontSize: '0.93rem', color: 'var(--color-accent)', marginBottom: '1rem' }}>
              Research interns who have worked with iNEXT, listed by year.
            </p>
            <Link href="/interns" className="btn-new">View Research Interns →</Link>
          </section>
        </div>
      </main>
    </>
  );
}
