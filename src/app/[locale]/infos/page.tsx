import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { InfosContent } from "@/components/InfosContent";
import { SITE_URL } from "@/lib/metadata";
import { getDictionary, type Locale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";
  const slug = isEn ? "info" : "infos";
  const pageUrl = isEn ? `${SITE_URL}/en/${slug}` : `${SITE_URL}/${slug}`;

  const title = isEn
    ? "Visit Us — 39 rue des Bourdonnais, Paris 1st | Chez Les Plombiers"
    : "Venir Chez Les Plombiers — 39 rue des Bourdonnais, Paris 1er";
  const description = isEn
    ? "How to find Chez Les Plombiers: 39 rue des Bourdonnais, 75001 Paris. 3 min from Châtelet metro. Wheelchair accessible. Free visits Mon-Sat 10am-6pm."
    : "Comment venir Chez Les Plombiers : 39 rue des Bourdonnais, 75001 Paris. À 3 min du métro Châtelet. Accès PMR. Visites gratuites du lundi au samedi de 10h à 18h.";
  const ogDescription = isEn
    ? "All practical info to visit our 200 sqm event venue in Paris 1st: address, metro, parking, opening hours, contact details."
    : "Toutes les infos pratiques pour visiter notre lieu événementiel de 200 m² à Paris 1er : adresse, métro, parking, horaires, contact.";

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
            ? "Chez Les Plombiers — Practical info & access"
            : "Chez Les Plombiers — Infos pratiques & accès",
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
        fr: `${SITE_URL}/infos`,
        en: `${SITE_URL}/en/info`,
      },
    },
  };
}

export default async function InfosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const isEn = locale === "en";
  const slug = isEn ? "info" : "infos";
  const pageUrl = isEn ? `${SITE_URL}/en/${slug}` : `${SITE_URL}/${slug}`;
  const inLanguage = isEn ? "en" : "fr";

  const infosDict = dict.infos as Record<string, unknown>;
  const heroDict = infosDict?.hero as Record<string, string> | undefined;
  const faqDict = infosDict?.faq as
    | { items?: { question: string; answer: string }[] }
    | undefined;
  const faqItems = faqDict?.items || [];

  const jsonLdLocalBusiness = {
    "@context": "https://schema.org",
    "@type": "EventVenue",
    "@id": `${SITE_URL}/#localbusiness`,
    name: "Chez Les Plombiers",
    description: isEn
      ? "200 sqm event venue in the heart of Paris 1st. 3 min from Châtelet metro, wheelchair accessible, free visits by appointment."
      : "Lieu événementiel de 200 m² au cœur de Paris 1er. À 3 min du métro Châtelet, accessible PMR, visites gratuites sur rendez-vous.",
    url: pageUrl,
    inLanguage,
    telephone: "+33761471073",
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
    maximumAttendeeCapacity: 150,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
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
    publicAccess: true,
    isAccessibleForFree: true,
    smokingAllowed: false,
    sameAs: ["https://instagram.com/chezlesplombiers"],
    hasMap: "https://maps.google.com/?q=39+rue+des+Bourdonnais+75001+Paris",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "17",
      bestRating: "5",
      worstRating: "1",
    },
  };

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
        name:
          heroDict?.title ||
          (isEn ? "Practical info" : "Infos pratiques"),
        item: pageUrl,
      },
    ],
  };

  return (
    <>
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
        <InfosContent />
      </main>
      <Footer />
    </>
  );
}
