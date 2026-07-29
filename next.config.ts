import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Dynamic rendering enabled for admin features
  // Public pages will still be optimized with ISR
  
  images: {
    unoptimized: true, // Keep unoptimized for Railway deployment
  },
};

export default nextConfig;
