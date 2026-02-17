import type { Metadata } from "next";
import Script from "next/script";
import { DEFAULT_METADATA } from "@/lib/metadata";
import { GA_MEASUREMENT_ID, GTM_ID } from "@/lib/analytics";
import "./globals.css";

export const metadata: Metadata = {
  ...DEFAULT_METADATA,
  metadataBase: new URL("https://chezlesplombiers.fr"),
};

const AXEPTIO_CLIENT_ID = "699344885a2a098410f72b36";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://static.axept.io" />
        {/* Google Tag Manager */}
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
        {/* GA4 */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');`}
        </Script>
      </head>
      <body className="min-h-screen font-sans text-black antialiased">
        {/* Skip to content */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-white focus:text-black focus:px-4 focus:py-2 focus:text-sm focus:shadow-lg"
        >
          Aller au contenu principal
        </a>

        {/* GTM noscript */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        {children}

        {/* Axeptio Cookie Consent */}
        <Script id="axeptio" strategy="lazyOnload">
          {`window.axeptioSettings = {
            clientId: "${AXEPTIO_CLIENT_ID}",
            cookiesVersion: "chezlesplombiers-fr",
          };
          (function(d, s) {
            var t = d.getElementsByTagName(s)[0], e = d.createElement(s);
            e.async = true;
            e.src = "https://static.axept.io/sdk.js";
            t.parentNode.insertBefore(e, t);
          })(document, "script");`}
        </Script>
      </body>
    </html>
  );
}
