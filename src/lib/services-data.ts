// Service slug mappings FR ↔ EN
export const SERVICE_SLUGS = {
  "fashion-shows": "fashion-shows", // same in both
  "petit-dejeuners": "corporate-breakfasts",
  "evenements-professionnels": "professional-events",
  "diners-exception": "exceptional-dinners",
  "evenements-culturels": "cultural-events",
  "seminaires-formations": "seminars-training",
} as const;

export type ServiceSlugFr = keyof typeof SERVICE_SLUGS;
export type ServiceSlugEn = (typeof SERVICE_SLUGS)[ServiceSlugFr];

// Reverse mapping EN → FR
export const SERVICE_SLUGS_REVERSE: Record<string, string> = Object.fromEntries(
  Object.entries(SERVICE_SLUGS).map(([fr, en]) => [en, fr])
);

// All valid FR slugs
export const SERVICE_FR_SLUGS: string[] = Object.keys(SERVICE_SLUGS);
// All valid EN slugs
export const SERVICE_EN_SLUGS: string[] = Object.values(SERVICE_SLUGS);

// Image mapping (slug → image path)
export const SERVICE_IMAGES: Record<string, string> = {
  "fashion-shows": "/images/services/fashion-shows.png",
  "petit-dejeuners": "/images/services/petit-dejeuners.png",
  "evenements-professionnels": "/images/services/evenements-professionnels.png",
  "diners-exception": "/images/services/diners-exception.png",
  "evenements-culturels": "/images/services/evenements-culturels.png",
  "seminaires-formations": "/images/services/seminaires-formations.png",
};

/**
 * Resolve any service slug (FR or EN) to the canonical FR slug.
 * Returns null if slug is not a known service slug.
 */
export function resolveServiceSlug(slug: string): string | null {
  if (slug in SERVICE_SLUGS) return slug;
  if (slug in SERVICE_SLUGS_REVERSE) return SERVICE_SLUGS_REVERSE[slug];
  return null;
}

/**
 * Get the EN slug for a given FR slug.
 */
export function getServiceEnSlug(frSlug: string): string {
  return SERVICE_SLUGS[frSlug as ServiceSlugFr] || frSlug;
}

/**
 * Get the FR slug for a given EN slug.
 */
export function getServiceFrSlug(enSlug: string): string {
  return SERVICE_SLUGS_REVERSE[enSlug] || enSlug;
}
