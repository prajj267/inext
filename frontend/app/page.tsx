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
            <h1 className="lab-full-name">i-NEXT Research Lab</h1>
            <address className="hero-address">
              <span>304-A, Block 2, Department of Computer Science</span>
              <span>Indian Institute of Technology Patna, Bihta – 801106</span>
              <span>
                <a href="mailto:arijitroy@iitp.ac.in">arijitroy@iitp.ac.in</a>
                &nbsp;&nbsp;|&nbsp;&nbsp;
                <a href="mailto:inextiitpatna@gmail.com">inextiitpatna@gmail.com</a>
                &nbsp;&nbsp;|&nbsp;&nbsp;
                <a href="tel:+919475364212">+91-9475364212</a>
              </span>
              <span>
                <a href="https://arijit-iitkgp.github.io/" target="_blank" rel="noopener">
                  arijit-iitkgp.github.io
                </a>
              </span>
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
                  <strong>i-NEXT</strong> at IIT Patna was established with a mission to advance
                  the science and engineering of intelligent systems. Our work bridges theoretical
                  machine learning and practical deployment — from designing novel neural
                  architectures to evaluating real-world robustness.
                </p>
                <p className="mt-2">
                  We work on the Internet of Things (IoT), Sensor-Cloud systems, UAV Networks,
                  and AI for healthcare and agriculture. We collaborate extensively with other IIT
                  departments, national research institutes, and international universities.
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
                  <a href="tel:+919475364212">+91-9475364212</a>
                </div>
              </div>
            </div>
          </section>

        </div>
      </main>
    </>
  );
}
