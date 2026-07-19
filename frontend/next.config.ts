import type { NextConfig } from "next";

const projectMedia = {
  35: "https://v3b.fal.media/files/b/0a826487/zFpLKsrht5G9aFkUQb5TA_dosa-project-35.webp",
  20: "https://v3b.fal.media/files/b/0a826487/j8zO0L1gqIc95QPrRFQ1i_dosa-project-20.webp",
  17: "https://v3b.fal.media/files/b/0aa2ee1c/ioJ8VD7M51F0x-JQ8XHFT_dosa-project-17.webp",
  62: "https://v3b.fal.media/files/b/0a826487/2FqH8nIKV1Ffpqq3ITdq4_dosa-project-62.webp",
  54: "https://v3b.fal.media/files/b/0a826487/B1YCgZdhL8LoMFN8gBqjO_dosa-project-54.webp",
} as const;

const nextConfig: NextConfig = {
  images: { remotePatterns: [] },
  async rewrites() {
    return [
      { source: "/images/projects/dosa-project-35.webp", destination: projectMedia[35] },
      { source: "/images/projects/dosa-project-20.webp", destination: projectMedia[20] },
      { source: "/images/projects/dosa-project-17.webp", destination: projectMedia[17] },
      { source: "/images/projects/dosa-project-62.webp", destination: projectMedia[62] },
      { source: "/images/projects/dosa-project-54.webp", destination: projectMedia[54] },
      // Stage 07 fallback: keep the operation chapter intact until the dedicated
      // #12 derivative is moved into owner-controlled storage in the media phase.
      { source: "/images/projects/dosa-project-12.webp", destination: projectMedia[20] },
    ];
  },
  async headers() {
    return [{
      source: "/(.*)",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-Frame-Options", value: "SAMEORIGIN" },
        { key: "X-XSS-Protection", value: "1; mode=block" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      ],
    }];
  },
};

export default nextConfig;
