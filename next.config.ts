import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ['webapi.amap.com', 'restapi.amap.com'],
  },
};

export default nextConfig;
