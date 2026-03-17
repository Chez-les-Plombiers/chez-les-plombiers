import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { GuideContent } from "@/components/GuideContent";
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
  const pageUrl = isEn ? `${SITE_URL}/en/guide` : `${SITE_URL}/guide`;

  return {
    title: meta.guideTitle,
    description: meta.guideDescription,
    robots: { index: false, follow: false },
    openGraph: {
      title: meta.guideTitle,
      description: meta.guideDescription,
      url: pageUrl,
      locale: isEn ? "en_US" : "fr_FR",
      type: "website",
    },
    alternates: {
      canonical: pageUrl,
      languages: {
        fr: `${SITE_URL}/guide`,
        en: `${SITE_URL}/en/guide`,
      },
    },
  };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  return (
    <>
      <Header />
      <main id="main-content">
        <GuideContent />
      </main>
    </>
  );
}
