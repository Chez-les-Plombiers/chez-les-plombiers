import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { ServicesSection } from "@/components/ServicesSection";
import { AboutSection } from "@/components/AboutSection";
import { PortfolioSection } from "@/components/PortfolioSection";
import { EquipmentsSection } from "@/components/EquipmentsSection";
import { FaqSection } from "@/components/FaqSection";
import { faqData } from "@/lib/faq-data";
import { ReviewsSection } from "@/components/ReviewsSection";
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

const jsonLdLocalBusiness = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/#localbusiness`,
  name: "Chez Les Plombiers",
  description:
    "Lieu événementiel de 200m² au cœur de Paris 1er. Fashion shows, séminaires, dîners d'exception dans un cadre industriel unique.",
  url: SITE_URL,
  telephone: "+33688679981",
  email: "contact@chezlesplombiers.fr",
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
  image: `${SITE_URL}/images/hero.png`,
  priceRange: "€€€",
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

// Generate FAQPage schema from the same data rendered in FaqSection
const jsonLdFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqData.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdLocalBusiness),
        }}
      />
      <Header />
      <main id="main-content">
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <PortfolioSection />
        <ReviewsSection />
        <EquipmentsSection />
        <FaqSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
