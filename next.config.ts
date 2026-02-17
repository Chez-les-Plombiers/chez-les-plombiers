import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // Redirect vercel.app URLs to custom domain to avoid duplicate content
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "(?:.*\\.)?vercel\\.app",
          },
        ],
        destination: "https://chezlesplombiers.fr/:path*",
        permanent: true,
      },
      // Redirect www to non-www
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.chezlesplombiers.fr",
          },
        ],
        destination: "https://chezlesplombiers.fr/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
