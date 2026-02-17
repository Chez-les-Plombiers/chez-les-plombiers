import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
