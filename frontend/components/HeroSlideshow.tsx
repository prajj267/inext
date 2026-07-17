'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

// Slideshow images — add more by dropping files into public/images/slide/
const slides = [
  { src: '/images/slide/IMG_3688.JPG.jpeg', alt: 'i-NEXT Lab photo 1' },
  { src: '/images/slide/IMG_3689.JPG.jpeg', alt: 'i-NEXT Lab photo 2' },
  { src: '/images/slide/IMG_3690.JPG.jpeg', alt: 'i-NEXT Lab photo 3' },
  { src: '/images/slide/IMG_3692.JPG.jpeg', alt: 'i-NEXT Lab photo 4' },
  { src: '/images/slide/IMG_3693.JPG.jpeg', alt: 'i-NEXT Lab photo 5' },
  { src: '/images/slide/IMG_3695.JPG.jpeg', alt: 'i-NEXT Lab photo 6' },
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
