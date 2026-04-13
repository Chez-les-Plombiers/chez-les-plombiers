import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "(.+)\\.vercel\\.app" }],
        headers: [{ key: "X-Robots-Tag", value: "noindex" }],
      },
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
      {
        source: "/documents/:path*.pdf",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
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
        destination: "https://www.chezlesplombiers.fr/:path*",
        permanent: true,
      },
      // Redirect non-www to www
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "chezlesplombiers.fr",
          },
        ],
        destination: "https://www.chezlesplombiers.fr/:path*",
        permanent: true,
      },
      // Fix Google sitelinks pointing to non-existent pages
      { source: "/l-histoire", destination: "/#about", permanent: true },
      { source: "/histoire", destination: "/#about", permanent: true },
      { source: "/photos", destination: "/#portfolio", permanent: true },
      { source: "/galerie", destination: "/#portfolio", permanent: true },
      { source: "/equipements", destination: "/#equipments", permanent: true },
      { source: "/equipements-infos", destination: "/#equipments", permanent: true },
      { source: "/visiter", destination: "/#contact", permanent: true },
      { source: "/visite", destination: "/#contact", permanent: true },
      { source: "/contact", destination: "/#contact", permanent: true },
      // Fix GSC 404 errors
      { source: "/lieu", destination: "/", permanent: true },
      { source: "/en/fr", destination: "/en", permanent: true },
      // Old service slug redirect
      { source: "/services/diners-prives", destination: "/services/diners-exception", permanent: true },
      { source: "/en/services/diners-prives", destination: "/en/services/exceptional-dinners", permanent: true },
      // Case normalization
      { source: "/GUIDE", destination: "/guide", permanent: true },
      // Legacy Squarespace pages
      { source: "/blank", destination: "/", permanent: true },
      { source: "/blank-1", destination: "/", permanent: true },
      { source: "/blank-2", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
