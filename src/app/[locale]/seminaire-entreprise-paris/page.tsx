import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SeminaireEntrepriseContent } from "@/components/SeminaireEntrepriseContent";
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
  const slug = isEn ? "corporate-seminar-paris" : "seminaire-entreprise-paris";
  const pageUrl = isEn ? `${SITE_URL}/en/${slug}` : `${SITE_URL}/${slug}`;

  return {
    title: meta.seminaireTitle,
    description: meta.seminaireDescription,
    openGraph: {
      title: meta.seminaireTitle,
      description: meta.seminaireOgDescription,
      url: pageUrl,
      locale: isEn ? "en_US" : "fr_FR",
      type: "website",
      images: [
        {
          url: `${SITE_URL}/photos/espace-travail.jpg`,
          width: 1200,
          height: 630,
          alt: isEn
            ? "Corporate seminar venue — Chez Les Plombiers Paris 1st"
            : "Lieu de séminaire d'entreprise — Chez Les Plombiers Paris 1er",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.seminaireTitle,
      description: meta.seminaireDescription,
      images: [`${SITE_URL}/photos/espace-travail.jpg`],
    },
    alternates: {
      canonical: pageUrl,
      languages: {
        fr: `${SITE_URL}/seminaire-entreprise-paris`,
        en: `${SITE_URL}/en/corporate-seminar-paris`,
      },
    },
  };
}

export default async function SeminaireEntreprisePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const isEn = locale === "en";
  const slug = isEn ? "corporate-seminar-paris" : "seminaire-entreprise-paris";
  const pageUrl = isEn ? `${SITE_URL}/en/${slug}` : `${SITE_URL}/${slug}`;
  const inLanguage = isEn ? "en" : "fr";

  const faqItems = (
    dict.seminaireEntreprise as {
      faq: { items: { question: string; answer: string }[] };
    }
  ).faq.items;

  // JSON-LD: EventVenue
  const jsonLdEventVenue = {
    "@context": "https://schema.org",
    "@type": "EventVenue",
    name: isEn
      ? "Chez Les Plombiers — Corporate Seminar Venue Paris"
      : "Chez Les Plombiers — Salle Séminaire Paris",
    description: isEn
      ? "Corporate seminar venue of 200 sqm in Paris 1st. 80 seated, 8,800-lumen projector, professional kitchen, Kiosc lighting."
      : "Lieu de séminaire d'entreprise de 200m² à Paris 1er. 80 places assises, vidéoprojecteur 8 800 lumens, cuisine pro, éclairage Kiosc.",
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
    maximumAttendeeCapacity: 80,
    image: `${SITE_URL}/photos/espace-travail.jpg`,
    telephone: "+33688679981",
    email: "contact@chezlesplombiers.fr",
  };

  // JSON-LD: FAQPage
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

  // JSON-LD: BreadcrumbList
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
        name: isEn ? "Corporate Seminar Paris" : "Séminaire Entreprise Paris",
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
        <SeminaireEntrepriseContent />
      </main>
      <Footer />
    </>
  );
}
