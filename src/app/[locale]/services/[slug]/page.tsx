import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ServicePageContent } from "@/components/ServicePageContent";
import { SITE_URL } from "@/lib/metadata";
import { getDictionary, locales, type Locale } from "@/lib/i18n";
import {
  SERVICE_SLUGS,
  SERVICE_FR_SLUGS,
  SERVICE_EN_SLUGS,
  getServiceEnSlug,
  getServiceFrSlug,
  resolveServiceSlug,
  SERVICE_IMAGES,
} from "@/lib/services-data";

// Helper: get the locale-appropriate slug
function getLocalizedSlug(frSlug: string, locale: string): string {
  return locale === "en" ? getServiceEnSlug(frSlug) : frSlug;
}

// Helper: build full URL for a service page
function getServiceUrl(frSlug: string, locale: string): string {
  const slug = getLocalizedSlug(frSlug, locale);
  return locale === "en"
    ? `${SITE_URL}/en/services/${slug}`
    : `${SITE_URL}/services/${slug}`;
}

// Helper: get service data from dictionary
function getServiceData(dict: Record<string, unknown>, frSlug: string, locale: string) {
  const servicePages = dict.servicePages as {
    backToHome: string;
    backToServices: string;
    specsTitle: string;
    featuresTitle: string;
    faqTitle: string;
    ctaTitle: string;
    ctaDescription: string;
    ctaCalendly: string;
    ctaWhatsApp: string;
    ctaEmail: string;
    services: Record<string, {
      title: string;
      tagline: string;
      description: string;
      specs: { value: string; unit: string; label: string }[];
      features: string[];
      faq: { question: string; answer: string }[];
      meta: { title: string; description: string; ogDescription: string };
    }>;
  };

  // In EN dict, the key is the EN slug; in FR dict, the key is the FR slug
  const dictKey = locale === "en" ? getServiceEnSlug(frSlug) : frSlug;
  const service = servicePages.services[dictKey];

  return { servicePages, service };
}

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];

  for (const locale of locales) {
    const slugs = locale === "en" ? SERVICE_EN_SLUGS : SERVICE_FR_SLUGS;
    for (const slug of slugs) {
      params.push({ locale, slug });
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const dict = await getDictionary(locale as Locale);

  // Resolve slug to canonical FR slug
  const frSlug = resolveServiceSlug(slug);
  if (!frSlug) return {};

  const { service } = getServiceData(dict, frSlug, locale);
  if (!service) return {};

  const pageUrl = getServiceUrl(frSlug, locale);
  const isEn = locale === "en";
  const image = SERVICE_IMAGES[frSlug] || "/images/hero.png";

  return {
    title: service.meta.title,
    description: service.meta.description,
    openGraph: {
      title: service.meta.title,
      description: service.meta.ogDescription,
      url: pageUrl,
      locale: isEn ? "en_US" : "fr_FR",
      type: "website",
      images: [
        {
          url: `${SITE_URL}${image}`,
          width: 1200,
          height: 630,
          alt: service.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: service.meta.title,
      description: service.meta.description,
      images: [`${SITE_URL}${image}`],
    },
    alternates: {
      canonical: pageUrl,
      languages: {
        fr: getServiceUrl(frSlug, "fr"),
        en: getServiceUrl(frSlug, "en"),
      },
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const dict = await getDictionary(locale as Locale);

  // Resolve slug to canonical FR slug
  const frSlug = resolveServiceSlug(slug);
  if (!frSlug) notFound();

  const { servicePages, service } = getServiceData(dict, frSlug, locale);
  if (!service) notFound();

  const isEn = locale === "en";
  const pageUrl = getServiceUrl(frSlug, locale);
  const image = SERVICE_IMAGES[frSlug] || "/images/hero.png";
  const inLanguage = isEn ? "en" : "fr";

  // JSON-LD: Service
  const jsonLdService = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    url: pageUrl,
    inLanguage,
    image: `${SITE_URL}${image}`,
    provider: {
      "@type": "LocalBusiness",
      name: "Chez Les Plombiers",
      url: SITE_URL,
      address: {
        "@type": "PostalAddress",
        streetAddress: "39 rue des Bourdonnais",
        addressLocality: "Paris",
        postalCode: "75001",
        addressCountry: "FR",
      },
      telephone: "+33761471073",
      email: "contact@chezlesplombiers.fr",
    },
    areaServed: {
      "@type": "City",
      name: "Paris",
    },
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
        name: isEn ? "Services" : "Services",
        item: isEn ? `${SITE_URL}/en/#services` : `${SITE_URL}/#services`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: service.title,
        item: pageUrl,
      },
    ],
  };

  // JSON-LD: FAQPage
  const jsonLdFaq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
    inLanguage,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdService) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />
      <Header />
      <main id="main-content">
        <ServicePageContent slug={frSlug} />
      </main>
      <Footer />
    </>
  );
}
