import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  images: { 
    remotePatterns: [
      {
        protocol: "https",
        hostname: "heroik-s3.s3.eu-central-1.amazonaws.com",
        pathname: "/**", // allow all paths
      },
    ],
    unoptimized: true,
  }
};

export default nextConfig;
