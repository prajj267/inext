import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Static export — produces an `out/` directory for Apache public_html
  output: 'export',

  // Required for static export: disable image optimization
  // (images are served as-is from Apache)
  images: {
    unoptimized: true,
  },

  // Trailing slashes so links work on Apache without a rewrite rule
  trailingSlash: true,

  // Skip admin routes during static export — they're client-only and work at runtime
  // (Admin routes fetch from the API, so they don't need pre-rendering)
  experimental: {
    // @ts-ignore — this may not be fully typed in Next.js 16
    outputFileTracingExcludes: {
      '*': ['./app/admin/**/*'],
    },
  },
};

export default nextConfig;
