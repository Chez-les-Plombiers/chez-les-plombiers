import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AppartementContent } from "@/components/AppartementContent";
import ClientLogosSection from "@/components/ClientLogosSection";
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
  const slug = isEn ? "apartment" : "appartement";
  const pageUrl = isEn ? `${SITE_URL}/en/${slug}` : `${SITE_URL}/${slug}`;

  return {
    title: meta.appartementTitle,
    description: meta.appartementDescription,
    openGraph: {
      title: meta.appartementTitle,
      description: meta.appartementOgDescription,
      url: pageUrl,
      locale: isEn ? "en_US" : "fr_FR",
      type: "website",
      images: [
        {
          url: `${SITE_URL}/images/appartement-hero.png`,
          width: 1200,
          height: 630,
          alt: isEn
            ? "The Pink Apartment - Chez Les Plombiers"
            : "L'Appartement Rose - Chez Les Plombiers",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.appartementTitle,
      description: meta.appartementDescription,
      images: [`${SITE_URL}/images/appartement-hero.png`],
    },
    alternates: {
      canonical: pageUrl,
      languages: {
        fr: `${SITE_URL}/appartement`,
        en: `${SITE_URL}/en/apartment`,
      },
    },
  };
}

export default async function AppartementPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const isEn = locale === "en";
  const slug = isEn ? "apartment" : "appartement";
  const pageUrl = isEn ? `${SITE_URL}/en/${slug}` : `${SITE_URL}/${slug}`;
  const appart = dict.appartement as Record<string, string>;
  const inLanguage = isEn ? "en" : "fr";

  const jsonLdAppartement = {
    "@context": "https://schema.org",
    "@type": "EventVenue",
    name: isEn
      ? "The Pink Apartment — Chez Les Plombiers"
      : "L'Appartement Rose — Chez Les Plombiers",
    description: isEn
      ? "Intimate 100m² space for photo shoots, interviews and confidential meetings. Fitted kitchen, designer furniture, high-speed Wi-Fi."
      : "Espace intime de 100m² pour shootings photo, interviews et réunions confidentielles. Cuisine équipée, mobilier design, Wi-Fi haut débit.",
    url: pageUrl,
    inLanguage,
    address: {
      "@type": "PostalAddress",
      streetAddress: "39 rue des Bourdonnais",
      addressLocality: "Paris",
      postalCode: "75001",
      addressCountry: "FR",
    },
    maximumAttendeeCapacity: 50,
    image: `${SITE_URL}/images/appartement-hero.png`,
    containedInPlace: {
      "@type": "EventVenue",
      name: "Chez Les Plombiers",
      url: SITE_URL,
    },
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
        name: appart.title,
        item: pageUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdAppartement),
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
        <AppartementContent />
        <ClientLogosSection compact />
      </main>
      <Footer />
    </>
  );
}
