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
  },
  async redirects() {
    return [
      {
        source: "/specialisticna-ordinacija-storje/:path*",
        destination: "/ordinacija-storje/:path*",
        permanent: true,
      },
      {
        source: "/specialisticna-ordinacija-portoroz/:path*",
        destination: "/ordinacija-portoroz/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
