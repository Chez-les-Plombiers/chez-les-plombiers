import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
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
  const pageUrl = isEn
    ? `${SITE_URL}/en/legal-notice`
    : `${SITE_URL}/mentions-legales`;

  return {
    title: meta.mentionsTitle,
    description: meta.mentionsDescription,
    robots: { index: false, follow: true },
    openGraph: { url: pageUrl },
    alternates: {
      canonical: pageUrl,
      languages: {
        fr: `${SITE_URL}/mentions-legales`,
        en: `${SITE_URL}/en/legal-notice`,
      },
    },
  };
}

export default async function MentionsLegales({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const ml = dict.mentionsLegales as Record<
    string,
    { title: string; content: string } | string
  >;
  const title = ml.title as string;
  const isEn = locale === "en";
  const pageUrl = isEn
    ? `${SITE_URL}/en/legal-notice`
    : `${SITE_URL}/mentions-legales`;
  const inLanguage = isEn ? "en" : "fr";

  const sections = [
    "editeur",
    "contact",
    "hebergement",
    "propriete",
    "responsabilite",
    "credits",
  ] as const;

  const jsonLdWebPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    url: pageUrl,
    inLanguage,
    isPartOf: {
      "@type": "WebSite",
      name: "Chez Les Plombiers",
      url: SITE_URL,
    },
    about: {
      "@type": "Organization",
      name: "Chez les Plombiers SAS",
      legalName: "Chez les Plombiers SAS",
      url: SITE_URL,
      taxID: "FR04 928 788 157",
      vatID: "FR04 928 788 157",
      identifier: "928 788 157",
      foundingDate: "2024-05-02",
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
        email: "contact@chezlesplombiers.fr",
        contactType: "customer service",
      },
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
        name: title,
        item: pageUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdWebPage),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdBreadcrumb),
        }}
      />
      <Header />
      <main className="pt-32 pb-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <h1 className="text-4xl lg:text-5xl mb-12">{title}</h1>
          <div className="space-y-8">
            {sections.map((key) => {
              const section = ml[key] as { title: string; content: string };
              return (
                <section key={key}>
                  <h2 className="text-2xl mb-4">{section.title}</h2>
                  <p
                    className="text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: section.content }}
                  />
                </section>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
