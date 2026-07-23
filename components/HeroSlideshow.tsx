'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';

interface Slide {
  id: string;
  image: string;
  alt: string;
  order: number;
}

const INTERVAL_MS = 3500;

// Fallback slides if API fails or returns empty
const fallbackSlides = [
  { src: '/images/slide/IMG_3688.JPG.jpeg', alt: 'iNEXT Research Lab Team' },
  { src: '/images/slide/WhatsApp Image 2026-07-22 at 10.35.19.jpeg', alt: 'iNEXT Lab Activity' },
  { src: '/images/slide/WhatsApp Image 2026-07-22 at 10.35.19 (1).jpeg', alt: 'iNEXT Research Work' },
  { src: '/images/slide/WhatsApp Image 2026-07-22 at 10.35.19 (2).jpeg', alt: 'iNEXT Lab Event' },
  { src: '/images/slide/WhatsApp Image 2026-07-22 at 10.35.19 (3).jpeg', alt: 'iNEXT Team Collaboration' },
  { src: '/images/slide/WhatsApp Image 2026-07-22 at 10.35.19 (4).jpeg', alt: 'iNEXT Lab Workspace' },
];

export default function HeroSlideshow() {
  const [slides, setSlides] = useState<{ src: string; alt: string }[]>(fallbackSlides);
  const [current, setCurrent] = useState(0);
  const [fading,  setFading]  = useState(false);

  useEffect(() => {
    // Fetch slides from API
    apiFetch<Slide[]>('/api/slides')
      .then((apiSlides) => {
        if (apiSlides && apiSlides.length > 0) {
          setSlides(apiSlides.map(s => ({ src: s.image, alt: s.alt })));
        }
      })
      .catch((error) => {
        console.error('Failed to fetch slides, using fallback:', error);
      });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % slides.length);
        setFading(false);
      }, 400); // matches CSS transition duration
    }, INTERVAL_MS);

    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="hero-slideshow" aria-label="Lab photo slideshow">
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`slide ${i === current ? 'slide-active' : 'slide-hidden'}${i === current && fading ? ' slide-fading' : ''}`}
          aria-hidden={i !== current}
        >
          {slide.src.startsWith('data:') ? (
            // Base64 image - use regular img tag
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={slide.src}
              alt={slide.alt}
              className="slide-img"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            // Regular URL - use Next.js Image
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              sizes="(max-width: 900px) 0px, 420px"
              className="slide-img"
              priority={i === 0}
            />
          )}
        </div>
      ))}

      {/* Dot indicators */}
      <div className="slide-dots" aria-hidden="true">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`slide-dot${i === current ? ' slide-dot-active' : ''}`}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
