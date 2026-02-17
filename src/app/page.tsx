import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { ServicesSection } from "@/components/ServicesSection";
import { AboutSection } from "@/components/AboutSection";
import { PortfolioSection } from "@/components/PortfolioSection";
import { EquipmentsSection } from "@/components/EquipmentsSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { SITE_URL } from "@/lib/metadata";

const jsonLdEventVenue = {
  "@context": "https://schema.org",
  "@type": "EventVenue",
  name: "Chez Les Plombiers",
  description:
    "Espace événementiel de 200m² au cœur de Paris. Fashion shows, séminaires, dîners d'exception dans un cadre industriel unique.",
  url: SITE_URL,
  address: {
    "@type": "PostalAddress",
    streetAddress: "39 rue des Bourdonnais",
    addressLocality: "Paris",
    postalCode: "75001",
    addressCountry: "FR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 48.8588,
    longitude: 2.3444,
  },
  maximumAttendeeCapacity: 200,
  image: `${SITE_URL}/images/hero.png`,
  telephone: "+33688679981",
  email: "contact@chezlesplombiers.fr",
};

const jsonLdOrganization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Chez les Plombiers SAS",
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo/logo-black.png`,
  description:
    "Lieu événementiel d'exception à Paris, alliant charme industriel et élégance contemporaine.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "39 rue des Bourdonnais",
    addressLocality: "Paris",
    postalCode: "75001",
    addressCountry: "FR",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+33688679981",
    contactType: "reservations",
    email: "contact@chezlesplombiers.fr",
    availableLanguage: ["French", "English"],
  },
  sameAs: ["https://instagram.com/chezlesplombiers"],
  taxID: "FR04 928 788 157",
  legalName: "Chez les Plombiers SAS",
  foundingDate: "2024-05-02",
};

const jsonLdFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Quelle est la capacité de Chez Les Plombiers ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "L'espace peut accueillir jusqu'à 200 personnes en cocktail et 60 à 80 personnes en dîner assis. La surface totale est de 200m² avec 100m² de stockage en sous-sol.",
      },
    },
    {
      "@type": "Question",
      name: "Où se situe Chez Les Plombiers ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Chez Les Plombiers est situé au 39 rue des Bourdonnais, 75001 Paris, en plein cœur du 1er arrondissement.",
      },
    },
    {
      "@type": "Question",
      name: "Quels types d'événements peut-on organiser ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nous accueillons des fashion shows, événements professionnels (séminaires, lancements de produits, conférences), dîners d'exception, événements culturels (vernissages, expositions) et proposons des prestations premium (traiteur, décoration, sonorisation).",
      },
    },
    {
      "@type": "Question",
      name: "Quels équipements sont disponibles ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "L'espace dispose d'un vidéoprojecteur 4K, système Sonos et XLR, lumières DMX, fibre dédiée 1 Gb/s, Wi-Fi invité, cuisine traiteur équipée, climatisation réversible et accès PMR.",
      },
    },
    {
      "@type": "Question",
      name: "Comment réserver une visite ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Vous pouvez réserver une visite directement via notre page Calendly ou nous contacter par email à contact@chezlesplombiers.fr ou par WhatsApp au +336 88 67 99 81. Les visites sont possibles du lundi au vendredi de 10h à 18h et le samedi sur rendez-vous.",
      },
    },
  ],
};

export default function Home() {
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
          __html: JSON.stringify(jsonLdOrganization),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdFaq),
        }}
      />
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <PortfolioSection />
        <EquipmentsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
