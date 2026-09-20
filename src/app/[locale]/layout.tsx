import type { Metadata } from "next";
import Script from "next/script";
import { Wix_Madefor_Display } from "next/font/google";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import { locales, getDictionary, type Locale } from "@/lib/i18n";
import { I18nProvider } from "@/lib/i18n-context";
import { GA_MEASUREMENT_ID, GTM_ID } from "@/lib/analytics";
import { SITE_URL } from "@/lib/metadata";

const wixMadefor = Wix_Madefor_Display({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-wix-madefor",
  display: "swap",
});

/**
 * Eurostile Extended — la typographie de la marque, celle de l'enseigne et des
 * cartons d'invitation. Chargée ici, mais exposée sous sa propre variable :
 * elle n'est utilisée que par la maquette de refonte (`font-clp`), le site en
 * production reste sur Wix Madefor tant que la bascule n'est pas faite.
 *
 * ⚠️ Ces fichiers sont les .ttf **desktop** des Plombiers : la licence web
 * n'est pas confirmée (achat en cours auprès du fondeur). Ne pas mettre la
 * refonte en ligne publiquement avant de l'avoir.
 * ⚠️ La fonte n'a **pas de signe €** — écrire les prix « 1 000 € » les rend en
 * fonte de secours sur le glyphe seul. Les prix restent donc en `font-mono`.
 */
const eurostile = localFont({
  src: [
    { path: "../../fonts/eurostile-extended.ttf", weight: "400", style: "normal" },
    { path: "../../fonts/eurostile-extended-bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-eurostile",
  display: "swap",
});

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
    /*
     * ⚠️ Safari sur iPhone souligne tout seul ce qu'il prend pour une adresse
     * ou un numéro, et le transforme en lien bleu-gris. Sur la maquette, le
     * titre « 39 RUE DES BOURDONNAIS, PARIS 1ER » se retrouvait barré de deux
     * soulignements en plein milieu. On désactive la détection : l'adresse est
     * déjà cliquable là où c'est utile, vers la fiche Google.
     */
    formatDetection: { telephone: false, address: false, date: false },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "48x48" },
        { url: "/icon.png", sizes: "192x192", type: "image/png" },
      ],
      apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
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
    <html lang={locale} className={`${wixMadefor.variable} ${eurostile.variable}`}>
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
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "vju7iukwc9");`,
          }}
        />
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

        <Analytics />

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
