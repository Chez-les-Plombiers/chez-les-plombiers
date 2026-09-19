import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // `/tarifs` (zone de tarification) est explicitement ouvert : c'est le
      // contenu le plus différenciant du site, personne d'autre n'affiche ses
      // prix. Seule son administration est fermée — elle porte déjà un
      // `noindex` page par page, ceci est la ceinture en plus des bretelles.
      { userAgent: "*", allow: "/", disallow: ["/tarifs/admin"] },
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "anthropic-ai", allow: "/" },
    ],
    sitemap: "https://www.chezlesplombiers.fr/sitemap.xml",
  };
}
