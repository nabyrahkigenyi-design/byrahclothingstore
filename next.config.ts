import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  eslint: {
    // ✅ Do not fail the production build on lint errors (temporary solution)
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
