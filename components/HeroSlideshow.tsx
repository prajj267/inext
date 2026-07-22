'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

// Slideshow images — add more by dropping files into public/images/slide/
const slides = [
  { src: '/images/slide/IMG_3688.JPG.jpeg', alt: 'i-NEXT Research Lab Team' },
  { src: '/images/slide/WhatsApp Image 2026-07-22 at 10.35.19.jpeg', alt: 'i-NEXT Lab Activity' },
  { src: '/images/slide/WhatsApp Image 2026-07-22 at 10.35.19 (1).jpeg', alt: 'i-NEXT Research Work' },
  { src: '/images/slide/WhatsApp Image 2026-07-22 at 10.35.19 (2).jpeg', alt: 'i-NEXT Lab Event' },
  { src: '/images/slide/WhatsApp Image 2026-07-22 at 10.35.19 (3).jpeg', alt: 'i-NEXT Team Collaboration' },
  { src: '/images/slide/WhatsApp Image 2026-07-22 at 10.35.19 (4).jpeg', alt: 'i-NEXT Lab Workspace' },
];

const INTERVAL_MS = 3500;

export default function HeroSlideshow() {
  const [current, setCurrent] = useState(0);
  const [fading,  setFading]  = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % slides.length);
        setFading(false);
      }, 400); // matches CSS transition duration
    }, INTERVAL_MS);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="hero-slideshow" aria-label="Lab photo slideshow">
      {slides.map((slide, i) => (
        <div
          key={slide.src}
          className={`slide ${i === current ? 'slide-active' : 'slide-hidden'}${i === current && fading ? ' slide-fading' : ''}`}
          aria-hidden={i !== current}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            sizes="(max-width: 900px) 0px, 420px"
            className="slide-img"
            priority={i === 0}
          />
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
