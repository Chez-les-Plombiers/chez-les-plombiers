import type { Metadata } from "next";
import Script from "next/script";
import { locales, getDictionary, type Locale } from "@/lib/i18n";
import { I18nProvider } from "@/lib/i18n-context";
import { GA_MEASUREMENT_ID, GTM_ID } from "@/lib/analytics";
import { SITE_URL } from "@/lib/metadata";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const meta = dict.metadata as Record<string, string>;

  const isEn = locale === "en";
  const baseUrl = isEn ? `${SITE_URL}/en` : SITE_URL;

  return {
    title: meta.homeTitle,
    description: meta.homeDescription,
    openGraph: {
      title: meta.homeTitle,
      description: meta.homeOgDescription,
      url: baseUrl,
      siteName: "Chez Les Plombiers",
      images: [
        {
          url: `${SITE_URL}/images/hero.png`,
          width: 1200,
          height: 630,
          alt: "Chez Les Plombiers - Event venue Paris",
        },
      ],
      locale: isEn ? "en_US" : "fr_FR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: meta.homeTitle,
      description: meta.homeOgDescription,
      images: [`${SITE_URL}/images/hero.png`],
    },
    alternates: {
      canonical: baseUrl,
      languages: {
        fr: SITE_URL,
        en: `${SITE_URL}/en`,
      },
    },
  };
}

const AXEPTIO_CLIENT_ID = "699344885a2a098410f72b36";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const skipText = dict.skipToContent as string;

  return (
    <html lang={locale}>
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://static.axept.io" />
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
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
        <Script id="clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "vju7iukwc9");`}
        </Script>
      </head>
      <body className="min-h-screen font-sans text-black antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-white focus:text-black focus:px-4 focus:py-2 focus:text-sm focus:shadow-lg"
        >
          {skipText}
        </a>

        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        <I18nProvider locale={locale as Locale} dict={dict}>
          {children}
        </I18nProvider>

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
