import type { NextConfig } from "next";

// CSP : self + GA4/Clarity (analytics), Matterport + Google Maps (iframes visite).
// 'unsafe-inline' scripts : requis par les snippets GA/Clarity et Next sans infra nonce.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.clarity.ms https://static.elfsight.com https://static.axept.io",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://fonts.axept.io",
  // img-src large : widgets tiers (Elfsight/Instagram, Axeptio, avatars Google) servent depuis des CDN variables
  "img-src 'self' data: blob: https:",
  "font-src 'self' data: https://*.elfsightcdn.com https://fonts.gstatic.com https://fonts.axept.io",
  "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com https://*.clarity.ms https://c.bing.com https://*.elfsight.com https://*.elfsightcdn.com https://*.axept.io https://axeptio.imgix.net",
  "frame-src https://my.matterport.com https://www.google.com https://www.instagram.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "object-src 'none'",
  "form-action 'self'",
].join("; ");

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
          { key: "Content-Security-Policy", value: csp },
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
      // Legacy Squarespace pages
      { source: "/blank", destination: "/", permanent: true },
      { source: "/blank-1", destination: "/", permanent: true },
      { source: "/blank-2", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
