import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SITE_URL } from "@/lib/metadata";
import { AppartementContent } from "./AppartementContent";

export const metadata: Metadata = {
  title: "L'Appartement Rose | Chez Les Plombiers Paris",
  description:
    "Un espace intime de 100m² pour 50 personnes. Shootings photo, interviews, réunions confidentielles. Cuisine équipée, mobilier design, Wi-Fi haut débit.",
  openGraph: {
    title: "L'Appartement Rose | Chez Les Plombiers Paris",
    description:
      "Un espace intime et lumineux, conçu pour des moments d'exception.",
    url: `${SITE_URL}/appartement`,
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/images/appartement-hero.png`,
        width: 1200,
        height: 630,
        alt: "L'Appartement Rose - Chez Les Plombiers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "L'Appartement Rose | Chez Les Plombiers Paris",
    description:
      "Un espace intime de 100m² pour 50 personnes. Shootings photo, interviews, réunions confidentielles.",
    images: [`${SITE_URL}/images/appartement-hero.png`],
  },
  alternates: {
    canonical: `${SITE_URL}/appartement`,
  },
};

const jsonLdAppartement = {
  "@context": "https://schema.org",
  "@type": "EventVenue",
  name: "L'Appartement Rose — Chez Les Plombiers",
  description:
    "Espace intime de 100m² pour shootings photo, interviews et réunions confidentielles. Cuisine équipée, mobilier design, Wi-Fi haut débit.",
  url: `${SITE_URL}/appartement`,
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
      name: "Accueil",
      item: SITE_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "L'Appartement Rose",
      item: `${SITE_URL}/appartement`,
    },
  ],
};

export default function AppartementPage() {
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
      </main>
      <Footer />
    </>
  );
}
