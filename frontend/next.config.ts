import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { remotePatterns: [] },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Cache-Control", value: "public, max-age=0, s-maxage=0, must-revalidate" },
          { key: "CDN-Cache-Control", value: "no-store" },
          { key: "Surrogate-Control", value: "no-store" },
        ],
      },
      {
        source: "/_next/static/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/images/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/_next/static/css/63ca38dffe7dd760.css",
        destination: "/_next/static/css/ebcbcf7eb267f5cd.css",
      },
      {
        source: "/_next/static/css/890bf1f5d1ff7ce3.css",
        destination: "/_next/static/css/4b64c490b5e03688.css",
      },
      {
        source: "/_next/static/chunks/app/page-e48fb6c8285a8d3b.js",
        destination: "/_next/static/chunks/app/page-0aea3f714fd204e6.js",
      },
      {
        source: "/_next/static/chunks/app/servicios/page-e189d1a417a72ddf.js",
        destination: "/_next/static/chunks/app/servicios/page-c5c22ec99d78e0c1.js",
      },
    ];
  },
};

export default nextConfig;
