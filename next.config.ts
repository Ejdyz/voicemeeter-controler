import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  allowedDevOrigins: ['test.local.ejdy.cz','test.ejdy.cz', "localhost:3000", "192.168.1.27:3000"],
};

export default nextConfig;
