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
  ];
}
