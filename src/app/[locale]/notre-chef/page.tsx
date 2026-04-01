import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ChefContent } from "@/components/ChefContent";
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
  const slug = isEn ? "our-chef" : "notre-chef";
  const pageUrl = isEn ? `${SITE_URL}/en/${slug}` : `${SITE_URL}/${slug}`;

  return {
    title: meta.chefTitle,
    description: meta.chefDescription,
    openGraph: {
      title: meta.chefTitle,
      description: meta.chefDescription,
      url: pageUrl,
      locale: isEn ? "en_US" : "fr_FR",
      type: "website",
      images: [
        {
          url: `${SITE_URL}/images/hero.png`,
          width: 1200,
          height: 630,
          alt: isEn
            ? "Chef Mathias Rouveure — Chez Les Plombiers"
            : "Chef Mathias Rouveure — Chez Les Plombiers",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.chefTitle,
      description: meta.chefDescription,
      images: [`${SITE_URL}/images/hero.png`],
    },
    alternates: {
      canonical: pageUrl,
      languages: {
        fr: `${SITE_URL}/notre-chef`,
        en: `${SITE_URL}/en/our-chef`,
      },
    },
  };
}

export default async function ChefPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const isEn = locale === "en";
  const slug = isEn ? "our-chef" : "notre-chef";
  const pageUrl = isEn ? `${SITE_URL}/en/${slug}` : `${SITE_URL}/${slug}`;
  const chef = dict.chef as Record<string, string>;
  const inLanguage = isEn ? "en" : "fr";

  const jsonLdPerson = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Mathias Rouveure",
    jobTitle: isEn ? "Partner Chef" : "Chef Partenaire",
    description: isEn
      ? "EHL graduate, founder of Homemade. Partner chef at Chez Les Plombiers, blending food, art and music into bespoke culinary experiences."
      : "Diplômé de l'EHL, fondateur de Homemade. Chef partenaire de Chez Les Plombiers, il fusionne food, art et musique pour des expériences culinaires sur mesure.",
    url: pageUrl,
    worksFor: {
      "@type": "Organization",
      name: "Homemade",
      url: "https://www.homemadelab.fr/",
    },
    memberOf: {
      "@type": "EventVenue",
      name: "Chez Les Plombiers",
      url: SITE_URL,
      address: {
        "@type": "PostalAddress",
        streetAddress: "39 rue des Bourdonnais",
        addressLocality: "Paris",
        postalCode: "75001",
        addressCountry: "FR",
      },
    },
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "École hôtelière de Lausanne (EHL)",
    },
    knowsAbout: [
      "Gastronomy",
      "Event catering",
      "Culinary art",
      "Food design",
    ],
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
        name: chef.heroTitle || "Mathias Rouveure",
        item: pageUrl,
      },
    ],
  };

  const jsonLdFoodService = {
    "@context": "https://schema.org",
    "@type": "FoodService",
    name: isEn
      ? "Homemade — Event Catering at Chez Les Plombiers"
      : "Homemade — Traiteur Événementiel chez Les Plombiers",
    description: isEn
      ? "Bespoke culinary experiences: exceptional dinners, cocktail receptions, creative brunches and immersive food experiences."
      : "Expériences culinaires sur mesure : dîners d'exception, cocktails dînatoires, brunchs créatifs et expériences immersives.",
    url: "https://www.homemadelab.fr/",
    inLanguage,
    provider: {
      "@type": "Person",
      name: "Mathias Rouveure",
    },
    areaServed: {
      "@type": "City",
      name: "Paris",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdPerson),
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
          __html: JSON.stringify(jsonLdFoodService),
        }}
      />
      <Header />
      <main id="main-content">
        <ChefContent />
        <ClientLogosSection compact />
      </main>
      <Footer />
    </>
  );
}
