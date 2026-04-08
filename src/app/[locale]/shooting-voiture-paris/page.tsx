import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ShootingVoitureContent } from "@/components/ShootingVoitureContent";
import { SITE_URL } from "@/lib/metadata";
import { getDictionary, type Locale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const meta = dict.metadata as Record<string, string>;
  const isEn = locale === "en";
  const slug = isEn ? "car-photoshoot-paris" : "shooting-voiture-paris";
  const pageUrl = isEn ? `${SITE_URL}/en/${slug}` : `${SITE_URL}/${slug}`;

  return {
    title: meta.shootingVoitureTitle,
    description: meta.shootingVoitureDescription,
    openGraph: {
      title: meta.shootingVoitureTitle,
      description: meta.shootingVoitureOgDescription,
      url: pageUrl,
      locale: isEn ? "en_US" : "fr_FR",
      type: "website",
      images: [
        {
          url: `${SITE_URL}/images/services/evenements-auto-moto.jpg`,
          width: 1200,
          height: 630,
          alt: isEn
            ? "Automotive photo studio — Chez Les Plombiers Paris"
            : "Studio shooting automobile — Chez Les Plombiers Paris",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.shootingVoitureTitle,
      description: meta.shootingVoitureDescription,
      images: [`${SITE_URL}/images/services/evenements-auto-moto.jpg`],
    },
    alternates: {
      canonical: pageUrl,
      languages: {
        fr: `${SITE_URL}/shooting-voiture-paris`,
        en: `${SITE_URL}/en/car-photoshoot-paris`,
      },
    },
  };
}

export default async function ShootingVoitureParisPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const isEn = locale === "en";
  const slug = isEn ? "car-photoshoot-paris" : "shooting-voiture-paris";
  const pageUrl = isEn ? `${SITE_URL}/en/${slug}` : `${SITE_URL}/${slug}`;
  const inLanguage = isEn ? "en" : "fr";

  const shootingVoiture = dict.shootingVoiture as {
    hero: { title: string };
    faq: { items: Array<{ question: string; answer: string }> };
  };

  /* JSON-LD: EventVenue */
  const jsonLdVenue = {
    "@context": "https://schema.org",
    "@type": "EventVenue",
    name: isEn
      ? "Chez Les Plombiers — Automotive Photo Studio Paris"
      : "Chez Les Plombiers — Studio Shooting Auto Paris",
    description: isEn
      ? "200 sqm automotive photography space in Paris 1st. Direct street vehicle access, cyclorama, Kiosc DMX lighting, Optoma ZU820T projector."
      : "Espace de shooting automobile de 200 m² à Paris 1er. Accès direct véhicules, cyclorama, éclairage Kiosc, vidéoprojecteur Optoma ZU820T.",
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
    image: `${SITE_URL}/images/services/evenements-auto-moto.jpg`,
    telephone: "+33761471073",
    email: "contact@chezlesplombiers.fr",
  };

  /* JSON-LD: FAQPage */
  const jsonLdFaq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage,
    mainEntity: shootingVoiture.faq.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  /* JSON-LD: BreadcrumbList */
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
        name: isEn ? "Car Photoshoot Paris" : "Shooting Voiture Paris",
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
        <ShootingVoitureContent />
      </main>
      <Footer />
    </>
  );
}
