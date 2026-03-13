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
    ? `${SITE_URL}/en/privacy-policy`
    : `${SITE_URL}/politique-confidentialite`;

  return {
    title: meta.privacyTitle,
    description: meta.privacyDescription,
    robots: { index: false, follow: true },
    openGraph: { url: pageUrl },
    alternates: {
      canonical: pageUrl,
      languages: {
        fr: `${SITE_URL}/politique-confidentialite`,
        en: `${SITE_URL}/en/privacy-policy`,
      },
    },
  };
}

interface SectionData {
  title: string;
  content?: string;
  intro?: string;
  items?: string[];
  contact?: string;
}

export default async function PolitiqueConfidentialite({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const pc = dict.politiqueConfidentialite as Record<string, SectionData | string>;
  const title = pc.title as string;

  const sections = [
    "responsable",
    "donnees",
    "finalites",
    "baseLegale",
    "conservation",
    "droits",
    "cookies",
    "sousTraitants",
    "miseAJour",
  ] as const;

  return (
    <>
      <Header />
      <main className="pt-32 pb-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <h1 className="text-4xl lg:text-5xl mb-12">{title}</h1>
          <div className="space-y-8">
            {sections.map((key) => {
              const section = pc[key] as SectionData;
              return (
                <section key={key}>
                  <h2 className="text-2xl mb-4">{section.title}</h2>
                  {section.content && (
                    <p
                      className="text-gray-700 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: section.content }}
                    />
                  )}
                  {section.intro && (
                    <p className="text-gray-700 leading-relaxed">
                      {section.intro}
                    </p>
                  )}
                  {section.items && (
                    <ul className="list-disc pl-6 text-gray-700 space-y-2 mt-4">
                      {section.items.map((item, i) => (
                        <li
                          key={i}
                          dangerouslySetInnerHTML={{ __html: item }}
                        />
                      ))}
                    </ul>
                  )}
                  {section.contact && (
                    <p className="text-gray-700 leading-relaxed mt-4">
                      {section.contact}
                    </p>
                  )}
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
