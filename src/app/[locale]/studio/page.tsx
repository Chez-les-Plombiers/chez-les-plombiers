import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StudioContent } from "@/components/StudioContent";
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
  const pageUrl = isEn ? `${SITE_URL}/en/studio` : `${SITE_URL}/studio`;

  return {
    title: meta.studioTitle,
    description: meta.studioDescription,
    openGraph: {
      title: meta.studioTitle,
      description: meta.studioDescription,
      url: pageUrl,
      locale: isEn ? "en_US" : "fr_FR",
      type: "website",
      images: [
        {
          url: `${SITE_URL}/photos/studio/cyclorama-wide.jpg`,
          width: 1200,
          height: 630,
          alt: isEn
            ? "Photo & Video Studio - Chez Les Plombiers"
            : "Studio Photo & Vidéo - Chez Les Plombiers",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.studioTitle,
      description: meta.studioDescription,
      images: [`${SITE_URL}/photos/studio/cyclorama-wide.jpg`],
    },
    alternates: {
      canonical: pageUrl,
      languages: {
        fr: `${SITE_URL}/studio`,
        en: `${SITE_URL}/en/studio`,
      },
    },
  };
}

export default async function StudioPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const isEn = locale === "en";
  const pageUrl = isEn ? `${SITE_URL}/en/studio` : `${SITE_URL}/studio`;
  const studio = dict.studio as Record<string, string>;
  const inLanguage = isEn ? "en" : "fr";

  const studioFaq = (dict.studio as Record<string, unknown>).faqItems as { question: string; answer: string }[];

  const jsonLdStudio = {
    "@context": "https://schema.org",
    "@type": "EventVenue",
    name: isEn
      ? "Photo & Video Studio — Chez Les Plombiers"
      : "Studio Photo & Vidéo — Chez Les Plombiers",
    description: isEn
      ? "130m² photo and video studio in Paris 1st: cyclorama wall, technical ceiling grid, 36 kVA, epoxy floor. Car access possible. Bare studio rental for professionals."
      : "Studio photo et vidéo de 130m² à Paris 1er : mur cyclorama, grille technique plafond, 36 kVA, sol résine époxy. Accès véhicule possible. Location plateau nu pour professionnels.",
    url: pageUrl,
    inLanguage,
    address: {
      "@type": "PostalAddress",
      streetAddress: "39 rue des Bourdonnais",
      addressLocality: "Paris",
      postalCode: "75001",
      addressCountry: "FR",
    },
    image: `${SITE_URL}/photos/studio/cyclorama-wide.jpg`,
    containedInPlace: {
      "@type": "EventVenue",
      name: "Chez Les Plombiers",
      url: SITE_URL,
    },
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Cyclorama wall 4.63m × 3.40m", value: true },
      { "@type": "LocationFeatureSpecification", name: "Technical ceiling grid", value: true },
      { "@type": "LocationFeatureSpecification", name: "36 kVA power supply", value: true },
      { "@type": "LocationFeatureSpecification", name: "Epoxy floor", value: true },
      { "@type": "LocationFeatureSpecification", name: "Ground floor access", value: true },
      { "@type": "LocationFeatureSpecification", name: "Vehicle / car access", value: true },
    ],
  };

  const jsonLdFaq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage,
    mainEntity: studioFaq.map((item) => ({
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
        name: studio.title,
        item: pageUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdStudio),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdBreadcrumb),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdFaq),
        }}
      />
      <Header />
      <main id="main-content">
        <StudioContent />
      </main>
      <Footer />
    </>
  );
}
