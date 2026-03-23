import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { EspaceAtypiqueContent } from "@/components/EspaceAtypiqueContent";
import { SITE_URL } from "@/lib/metadata";
import { getDictionary, type Locale } from "@/lib/i18n";

interface EspaceAtypiqueDict {
  meta: {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const ea = (dict.espaceAtypique as EspaceAtypiqueDict) || { meta: {} };
  const meta = ea.meta;
  const isEn = locale === "en";
  const slug = isEn ? "unique-venue-paris" : "espace-atypique-paris";
  const pageUrl = isEn ? `${SITE_URL}/en/${slug}` : `${SITE_URL}/${slug}`;

  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.ogTitle,
      description: meta.ogDescription,
      url: pageUrl,
      locale: isEn ? "en_US" : "fr_FR",
      type: "website",
      images: [
        {
          url: `${SITE_URL}/photos/canape-portes-atelier.jpg`,
          width: 1200,
          height: 630,
          alt: isEn
            ? "Unique Venue Paris — Chez Les Plombiers"
            : "Espace Atypique Paris — Chez Les Plombiers",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: [`${SITE_URL}/photos/canape-portes-atelier.jpg`],
    },
    alternates: {
      canonical: pageUrl,
      languages: {
        fr: `${SITE_URL}/espace-atypique-paris`,
        en: `${SITE_URL}/en/unique-venue-paris`,
      },
    },
  };
}

export default async function EspaceAtypiquePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const isEn = locale === "en";
  const slug = isEn ? "unique-venue-paris" : "espace-atypique-paris";
  const pageUrl = isEn ? `${SITE_URL}/en/${slug}` : `${SITE_URL}/${slug}`;
  const inLanguage = isEn ? "en" : "fr";

  const ea = dict.espaceAtypique as EspaceAtypiqueDict;
  const faq = (dict.espaceAtypique as Record<string, unknown>).faq as {
    items: { question: string; answer: string }[];
  };

  const jsonLdVenue = {
    "@context": "https://schema.org",
    "@type": "EventVenue",
    name: isEn
      ? "Chez Les Plombiers — Unique Venue Paris"
      : "Chez Les Plombiers — Espace Atypique Paris",
    description: ea.meta.description,
    url: pageUrl,
    inLanguage,
    address: {
      "@type": "PostalAddress",
      streetAddress: "39 rue des Bourdonnais",
      addressLocality: "Paris",
      postalCode: "75001",
      addressRegion: "Ile-de-France",
      addressCountry: "FR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 48.8588,
      longitude: 2.3444,
    },
    maximumAttendeeCapacity: 150,
    image: `${SITE_URL}/photos/canape-portes-atelier.jpg`,
    telephone: "+33688679981",
    email: "contact@chezlesplombiers.fr",
  };

  const jsonLdFaq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage,
    mainEntity: faq.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const jsonLdBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: isEn ? "Home" : "Accueil",
        item: isEn ? `${SITE_URL}/en` : SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: isEn ? "Unique Venue Paris" : "Espace Atypique Paris",
        item: pageUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdVenue),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdFaq),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdBreadcrumb),
        }}
      />
      <Header />
      <main id="main-content">
        <EspaceAtypiqueContent />
      </main>
      <Footer />
    </>
  );
}
