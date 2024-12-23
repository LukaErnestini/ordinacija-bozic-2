import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/home"
      },
      {
        source: "/admin",
        destination: "/admin/index.html"
      }
    ];
  }
};

export default nextConfig;
