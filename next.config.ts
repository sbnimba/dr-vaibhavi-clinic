import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // `unoptimized: true` was previously set, which disabled Next.js image
  // optimisation entirely. The site now deploys only to Vercel, so leaving it off
  // lets next/image serve resized WebP/AVIF automatically.
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
