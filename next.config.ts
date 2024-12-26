import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.tina.io",
        port: ""
      }
    ]
  },
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
