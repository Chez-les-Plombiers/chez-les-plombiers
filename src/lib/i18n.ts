export const locales = ["fr", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "fr";

// Slug mapping: FR slug <-> EN slug
const slugMap: Record<string, string> = {
  appartement: "apartment",
  "mentions-legales": "legal-notice",
  "politique-confidentialite": "privacy-policy",
  "notre-chef": "our-chef",
  // Service slugs (under /services/)
  "petit-dejeuners": "corporate-breakfasts",
  "evenements-professionnels": "professional-events",
  "diners-exception": "exceptional-dinners",
  "evenements-culturels": "cultural-events",
  "seminaires-formations": "seminars-training",
  "evenements-auto-moto": "automotive-events",
  // fashion-shows is the same in both languages
  // SEO landing pages
  "lieu-evenementiel-paris": "event-venue-paris",
  "espace-atypique-paris": "unique-venue-paris",
  "seminaire-entreprise-paris": "corporate-seminar-paris",
  "shooting-voiture-paris": "car-photoshoot-paris",
};

const reverseSlugMap: Record<string, string> = Object.fromEntries(
  Object.entries(slugMap).map(([fr, en]) => [en, fr])
);

export function getFrSlug(enSlug: string): string {
  return reverseSlugMap[enSlug] || enSlug;
}

export function getEnSlug(frSlug: string): string {
  return slugMap[frSlug] || frSlug;
}

/** All FR slugs that have translated EN equivalents */
export const frSlugs = Object.keys(slugMap);
/** All EN slugs */
export const enSlugs = Object.values(slugMap);

export type Dictionary = Record<string, unknown>;

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  fr: () => import("@/dictionaries/fr.json").then((m) => m.default),
  en: () => import("@/dictionaries/en.json").then((m) => m.default),
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}

/**
 * Build a locale-aware path.
 * FR paths have no prefix: /appartement
 * EN paths: /en/apartment
 */
export function localePath(locale: Locale, path: string = "/"): string {
  if (locale === "fr") {
    return path;
  }
  // Translate FR slugs to EN slugs in the path
  let enPath = path;
  for (const [fr, en] of Object.entries(slugMap)) {
    enPath = enPath.replace(`/${fr}`, `/${en}`);
  }
  if (enPath === "/") return "/en";
  return `/en${enPath}`;
}

/**
 * Given a pathname, return the equivalent path in the other locale.
 */
export function getAlternatePath(
  pathname: string,
  targetLocale: Locale
): string {
  const isEn = pathname.startsWith("/en");
  // Strip /en prefix to get the "base" path
  const basePath = isEn ? pathname.replace(/^\/en/, "") || "/" : pathname;

  if (targetLocale === "fr") {
    // Convert EN slugs back to FR slugs
    let frPath = basePath;
    for (const [en, fr] of Object.entries(reverseSlugMap)) {
      frPath = frPath.replace(`/${en}`, `/${fr}`);
    }
    return frPath || "/";
  } else {
    // Convert FR slugs to EN slugs
    let enPath = basePath;
    for (const [fr, en] of Object.entries(slugMap)) {
      enPath = enPath.replace(`/${fr}`, `/${en}`);
    }
    if (enPath === "/") return "/en";
    return `/en${enPath}`;
  }
}
