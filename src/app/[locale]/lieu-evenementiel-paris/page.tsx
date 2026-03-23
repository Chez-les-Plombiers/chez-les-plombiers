import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LieuEvenementielContent } from "@/components/LieuEvenementielContent";
import { SITE_URL } from "@/lib/metadata";
import { getDictionary, type Locale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";
  const slug = isEn ? "event-venue-paris" : "lieu-evenementiel-paris";
  const pageUrl = isEn ? `${SITE_URL}/en/${slug}` : `${SITE_URL}/${slug}`;

  const title = isEn
    ? "Event Venue Paris 1st — 200 sqm Central | Chez Les Plombiers"
    : "Lieu Évènementiel Paris 1er — 200m² Centre | Chez Les Plombiers";
  const description = isEn
    ? "200 sqm event venue in the heart of Paris 1st, Chatelet metro. Professional kitchen, cyclorama, stage lighting. From 1,000 EUR + VAT/day. Free visit."
    : "Lieu évènementiel de 200m² au cœur de Paris 1er, métro Châtelet. Cuisine pro, cyclorama, éclairage scénographique. Dès 1 000€ HT/jour. Visite gratuite.";
  const ogDescription = isEn
    ? "200 sqm adaptable event space in Paris 1st. Professional kitchen, cyclorama, Kiosc lighting, Sonos sound. From 1,000 EUR + VAT/day."
    : "Espace évènementiel modulable de 200m² à Paris 1er. Cuisine pro équipée, cyclorama, éclairage Kiosc, sono Sonos. Dès 1 000€ HT/jour.";

  return {
    title,
    description,
    openGraph: {
      title,
      description: ogDescription,
      url: pageUrl,
      locale: isEn ? "en_US" : "fr_FR",
      type: "website",
      images: [
        {
          url: `${SITE_URL}/images/hero.png`,
          width: 1200,
          height: 630,
          alt: isEn
            ? "Chez Les Plombiers — Event Venue Paris 1st"
            : "Chez Les Plombiers — Lieu évènementiel Paris 1er",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE_URL}/images/hero.png`],
    },
    alternates: {
      canonical: pageUrl,
      languages: {
        fr: `${SITE_URL}/lieu-evenementiel-paris`,
        en: `${SITE_URL}/en/event-venue-paris`,
      },
    },
  };
}

export default async function LieuEvenementielPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const isEn = locale === "en";
  const slug = isEn ? "event-venue-paris" : "lieu-evenementiel-paris";
  const pageUrl = isEn ? `${SITE_URL}/en/${slug}` : `${SITE_URL}/${slug}`;
  const inLanguage = isEn ? "en" : "fr";

  const lieuDict = dict.lieuEvenementiel as Record<string, unknown>;
  const heroDict = lieuDict?.hero as Record<string, string> | undefined;

  const jsonLdEventVenue = {
    "@context": "https://schema.org",
    "@type": "EventVenue",
    name: "Chez Les Plombiers",
    description: isEn
      ? "200 sqm event venue in the heart of Paris 1st. Fashion shows, seminars, fine dining, shoots in a distinctive industrial setting."
      : "Lieu évènementiel de 200m² au cœur de Paris 1er. Fashion shows, séminaires, dîners d'exception, shootings dans un cadre industriel atypique.",
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
    image: `${SITE_URL}/images/hero.png`,
    telephone: "+33688679981",
    email: "contact@chezlesplombiers.fr",
  };

  const jsonLdLocalBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#localbusiness`,
    name: "Chez Les Plombiers",
    description: isEn
      ? "Premium 200 sqm event venue in Paris 1st. Hire for fashion shows, seminars, fine dining, shoots."
      : "Lieu évènementiel premium de 200m² à Paris 1er. Location d'espace pour fashion shows, séminaires, dîners, shootings.",
    url: pageUrl,
    inLanguage,
    telephone: "+33688679981",
    email: "contact@chezlesplombiers.fr",
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
    image: `${SITE_URL}/images/hero.png`,
    priceRange: "\u20AC\u20AC\u20AC",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ],
        opens: "10:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "10:00",
        closes: "18:00",
      },
    ],
    sameAs: ["https://instagram.com/chezlesplombiers"],
    hasMap:
      "https://maps.google.com/?q=39+rue+des+Bourdonnais+75001+Paris",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "17",
      bestRating: "5",
      worstRating: "1",
    },
  };

  const faqDict = lieuDict?.faq as {
    items?: { question: string; answer: string }[];
  } | undefined;
  const faqItems = faqDict?.items || [];

  const jsonLdFaq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage,
    mainEntity: faqItems.map((item) => ({
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
        name: heroDict?.title || (isEn ? "Event Venue Paris" : "Lieu Évènementiel Paris"),
        item: pageUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdEventVenue),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdLocalBusiness),
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
        <LieuEvenementielContent />
      </main>
      <Footer />
    </>
  );
}
