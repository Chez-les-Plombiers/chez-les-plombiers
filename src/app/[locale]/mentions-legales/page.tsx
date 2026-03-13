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

  const sections = [
    "editeur",
    "contact",
    "hebergement",
    "propriete",
    "responsabilite",
    "credits",
  ] as const;

  return (
    <>
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
