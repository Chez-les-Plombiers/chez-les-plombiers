import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { ServicesSection } from "@/components/ServicesSection";
import { VirtualTour } from "@/components/VirtualTour";
import { AboutSection } from "@/components/AboutSection";
import { PortfolioSection } from "@/components/PortfolioSection";
import { EquipmentsSection } from "@/components/EquipmentsSection";
import { FaqSection } from "@/components/FaqSection";
import { ReviewsSection } from "@/components/ReviewsSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { SeoLandingPagesSection } from "@/components/SeoLandingPagesSection";
import ClientLogosSection from "@/components/ClientLogosSection";
import { InstagramFeed } from "@/components/InstagramFeed";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { SITE_URL } from "@/lib/metadata";
import { getDictionary, type Locale } from "@/lib/i18n";

interface FaqItem {
  question: string;
  answer: string;
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const faqItems = (dict.faq as Record<string, unknown>).items as FaqItem[];
  const isEn = locale === "en";
  const pageUrl = isEn ? `${SITE_URL}/en` : SITE_URL;
  const inLanguage = isEn ? "en" : "fr";

  const jsonLdEventVenue = {
    "@context": "https://schema.org",
    "@type": "EventVenue",
    name: "Chez Les Plombiers",
    description: isEn
      ? "200m² event space in the heart of Paris. Fashion shows, seminars, exceptional dinners in a unique industrial setting."
      : "Espace évènementiel de 200m² au cœur de Paris. Fashion shows, séminaires, dîners d'exception dans un cadre industriel unique.",
    url: pageUrl,
    inLanguage,
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
    telephone: "+33761471073",
    email: "contact@chezlesplombiers.fr",
  };

  const jsonLdOrganization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Chez les Plombiers SAS",
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo/logo-black.png`,
    description: isEn
      ? "Exceptional event venue in Paris, combining industrial charm and contemporary elegance."
      : "Lieu évènementiel d'exception à Paris, alliant charme industriel et élégance contemporaine.",
    inLanguage,
    address: {
      "@type": "PostalAddress",
      streetAddress: "39 rue des Bourdonnais",
      addressLocality: "Paris",
      postalCode: "75001",
      addressCountry: "FR",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+33761471073",
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
    description: isEn
      ? "200m² event venue in the heart of Paris 1st. Fashion shows, seminars, exceptional dinners in a unique industrial setting."
      : "Lieu évènementiel de 200m² au cœur de Paris 1er. Fashion shows, séminaires, dîners d'exception dans un cadre industriel unique.",
    url: pageUrl,
    inLanguage,
    telephone: "+33761471073",
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
        <SeoLandingPagesSection />
        <ClientLogosSection static />
        <VirtualTour />
        <AboutSection />
        <PortfolioSection />
        <EquipmentsSection />
        <FaqSection />
        <ReviewsSection />
        <InstagramFeed />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
