'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import HeroSlideshow from '@/components/HeroSlideshow';
import NewsRotator from '@/components/NewsRotator';
import { apiFetch } from '@/lib/api';

interface NewsItem { id: string; date: string; body: string; }

export default function HomePage() {
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    apiFetch<NewsItem[]>('/api/news')
      .then(setNews)
      .catch(console.error);
  }, []);

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="home-hero" aria-label="Lab introduction">
        <div className="container">
          <div className="hero-text">
            <h1 className="lab-full-name">iNEXT Research Lab</h1>
            <address className="hero-address">
              <span>304-A, Block 2, Department of Computer Science</span>
              <span>Indian Institute of Technology Patna, Bihta – 801106</span>
              <div className="hero-social-icons">
                <a href="mailto:inextiitpatna@gmail.com" aria-label="Email" title="Email">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </a>
                <a href="https://www.linkedin.com/in/inext-lab-716157422/" target="_blank" rel="noopener" aria-label="LinkedIn" title="LinkedIn">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="https://www.instagram.com/inextiitpatna/" target="_blank" rel="noopener" aria-label="Instagram" title="Instagram">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                <a href="https://www.facebook.com/profile.php?id=61592004415909" target="_blank" rel="noopener" aria-label="Facebook" title="Facebook">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              </div>
            </address>
          </div>
          <HeroSlideshow />
        </div>
      </section>

      <main className="main-content" id="main">
        <div className="container">

          {/* 70/30 split */}
          <div className="home-split">
            <div className="home-split-main">
              <section className="about-section" aria-labelledby="mission-heading">
                <h2 id="mission-heading">About the Lab</h2>
                <p>
                  <strong>iNEXT</strong> at IIT Patna was established to advance research in the
                  Internet of Things (IoT) and intelligent systems. Our work focuses on smart sensing,
                  connected devices, edge-cloud computing, AI, and machine learning to develop scalable,
                  real-world solutions that bridge fundamental research with practical deployment.
                </p>
                <p className="mt-2">
                  We focus on the Internet of Things (IoT), Sensor-Cloud systems, Virtualization, UAV Networks, and AI
                  applications for healthcare and agriculture.
                </p>
              </section>
            </div>

            <aside className="home-split-sidebar">
              <section aria-labelledby="recent-news-heading">
                <h2 id="recent-news-heading" className="sidebar-section-heading">Recent News</h2>
                <NewsRotator items={news.map((n) => ({ id: n.id, date: n.date, body: n.body }))} />
              </section>
            </aside>
          </div>

          {/* Lead section */}
          <section className="about-section" aria-labelledby="about-heading">
            <h2 id="about-heading">Lead</h2>
            <div className="pi-card">
              <Image
                src="/images/members/arijit_roy.jpeg"
                alt="Dr. Arijit Roy"
                width={260}
                height={370}
                className="pi-photo"
                priority
              />
              <div className="pi-info">
                <h3>Dr. Arijit Roy</h3>
                <p className="pi-title">
                  Assistant Professor, Computer Science and Engineering Group, IIT Patna
                </p>
                <p>
                  Dr. Arijit Roy is an Assistant Professor at IIT Patna. He was previously an
                  Assistant Professor at IIIT Sri City and a Post-Doctoral Research Fellow in the
                  Parallel Computing and Optimisation Group at the University of Luxembourg (2021–2022).
                  He received his PhD and MS (by Research) from IIT Kharagpur, and his B.Tech in
                  Information Technology from WBUT.
                </p>
                <p>
                  His research focuses on Internet of Things (IoT) and Sensor-Cloud systems,
                  with applications in healthcare, agriculture, smart traffic, and UAV networks.
                  He is a Senior Member of IEEE, a Member of ACM, and co-founder of
                  SensorDrops Networks Pvt. Ltd.
                </p>
                <div className="pi-links">
                  <a href="mailto:arijitroy@iitp.ac.in">Email</a>
                  <a href="https://scholar.google.com/citations?user=9Ww29AcAAAAJ" target="_blank" rel="noopener">Google Scholar</a>
                  <a href="https://www.linkedin.com/in/arijit-roy-75518833/" target="_blank" rel="noopener">LinkedIn</a>
                  <a href="https://arijit-iitkgp.github.io/" target="_blank" rel="noopener">Website</a>
                </div>
              </div>
            </div>
          </section>

        </div>
      </main>
    </>
  );
}
