import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.chezlesplombiers.fr";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: { fr: baseUrl, en: `${baseUrl}/en` },
      },
    },
    {
      url: `${baseUrl}/en`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/appartement`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          fr: `${baseUrl}/appartement`,
          en: `${baseUrl}/en/apartment`,
        },
      },
    },
    {
      url: `${baseUrl}/en/apartment`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/studio`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          fr: `${baseUrl}/studio`,
          en: `${baseUrl}/en/studio`,
        },
      },
    },
    {
      url: `${baseUrl}/en/studio`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/notre-chef`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          fr: `${baseUrl}/notre-chef`,
          en: `${baseUrl}/en/our-chef`,
        },
      },
    },
    {
      url: `${baseUrl}/en/our-chef`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    // Service pages
    {
      url: `${baseUrl}/services/fashion-shows`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          fr: `${baseUrl}/services/fashion-shows`,
          en: `${baseUrl}/en/services/fashion-shows`,
        },
      },
    },
    {
      url: `${baseUrl}/en/services/fashion-shows`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/services/petit-dejeuners`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          fr: `${baseUrl}/services/petit-dejeuners`,
          en: `${baseUrl}/en/services/corporate-breakfasts`,
        },
      },
    },
    {
      url: `${baseUrl}/en/services/corporate-breakfasts`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/services/evenements-professionnels`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          fr: `${baseUrl}/services/evenements-professionnels`,
          en: `${baseUrl}/en/services/professional-events`,
        },
      },
    },
    {
      url: `${baseUrl}/en/services/professional-events`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/services/diners-exception`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          fr: `${baseUrl}/services/diners-exception`,
          en: `${baseUrl}/en/services/exceptional-dinners`,
        },
      },
    },
    {
      url: `${baseUrl}/en/services/exceptional-dinners`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/services/evenements-culturels`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          fr: `${baseUrl}/services/evenements-culturels`,
          en: `${baseUrl}/en/services/cultural-events`,
        },
      },
    },
    {
      url: `${baseUrl}/en/services/cultural-events`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/services/seminaires-formations`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          fr: `${baseUrl}/services/seminaires-formations`,
          en: `${baseUrl}/en/services/seminars-training`,
        },
      },
    },
    {
      url: `${baseUrl}/en/services/seminars-training`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/services/evenements-auto-moto`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          fr: `${baseUrl}/services/evenements-auto-moto`,
          en: `${baseUrl}/en/services/automotive-events`,
        },
      },
    },
    {
      url: `${baseUrl}/en/services/automotive-events`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    // Guide
    {
      url: `${baseUrl}/guide`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
      alternates: {
        languages: {
          fr: `${baseUrl}/guide`,
          en: `${baseUrl}/en/guide`,
        },
      },
    },
    {
      url: `${baseUrl}/en/guide`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    // Legal pages
    {
      url: `${baseUrl}/mentions-legales`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
      alternates: {
        languages: {
          fr: `${baseUrl}/mentions-legales`,
          en: `${baseUrl}/en/legal-notice`,
        },
      },
    },
    {
      url: `${baseUrl}/en/legal-notice`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/politique-confidentialite`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
      alternates: {
        languages: {
          fr: `${baseUrl}/politique-confidentialite`,
          en: `${baseUrl}/en/privacy-policy`,
        },
      },
    },
    {
      url: `${baseUrl}/en/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    // SEO landing pages
    {
      url: `${baseUrl}/lieu-evenementiel-paris`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: {
        languages: {
          fr: `${baseUrl}/lieu-evenementiel-paris`,
          en: `${baseUrl}/en/event-venue-paris`,
        },
      },
    },
    {
      url: `${baseUrl}/en/event-venue-paris`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/espace-atypique-paris`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          fr: `${baseUrl}/espace-atypique-paris`,
          en: `${baseUrl}/en/unique-venue-paris`,
        },
      },
    },
    {
      url: `${baseUrl}/en/unique-venue-paris`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/seminaire-entreprise-paris`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          fr: `${baseUrl}/seminaire-entreprise-paris`,
          en: `${baseUrl}/en/corporate-seminar-paris`,
        },
      },
    },
    {
      url: `${baseUrl}/en/corporate-seminar-paris`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/shooting-voiture-paris`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          fr: `${baseUrl}/shooting-voiture-paris`,
          en: `${baseUrl}/en/car-photoshoot-paris`,
        },
      },
    },
    {
      url: `${baseUrl}/en/car-photoshoot-paris`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
