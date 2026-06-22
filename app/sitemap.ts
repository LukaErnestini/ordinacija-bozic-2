import client from "@/tina/__generated__/client";
import type { MetadataRoute } from "next";

const BASE_URL = "https://www.ordinacijabozic.si";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // Static, hand-curated routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/predstavitev`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/ordinacija-storje`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/ordinacija-portoroz`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/kontaktiraj-nas`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/obvestila`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];

  // Dynamic: every service category from Tina (e.g. /splosno-zobozdravstvo)
  let categoryRoutes: MetadataRoute.Sitemap = [];
  try {
    const categories = await client.queries.serviceCategoryConnection();
    categoryRoutes =
      categories.data?.serviceCategoryConnection.edges
        ?.map((edge) => {
          const filename = edge?.node?._sys.filename;
          if (!filename) return null;
          return {
            url: `${BASE_URL}/${filename}`,
            lastModified: now,
            changeFrequency: "monthly" as const,
            priority: 0.9,
          };
        })
        .filter((r): r is NonNullable<typeof r> => r !== null) ?? [];
  } catch {
    // If Tina is unreachable at build time, fall back to no category routes
    // rather than failing the whole sitemap generation.
  }

  // Dynamic: every dentist's intro page (e.g. /predstavitev/1-josko-bozic)
  let staffRoutes: MetadataRoute.Sitemap = [];
  try {
    const staff = await client.queries.staffConnection();
    staffRoutes =
      staff.data?.staffConnection.edges
        ?.map((edge) => {
          const breadcrumbs = edge?.node?._sys.breadcrumbs;
          if (!breadcrumbs || breadcrumbs.length === 0) return null;
          return {
            url: `${BASE_URL}/predstavitev/${breadcrumbs.join("/")}`,
            lastModified: now,
            changeFrequency: "yearly" as const,
            priority: 0.6,
          };
        })
        .filter((r): r is NonNullable<typeof r> => r !== null) ?? [];
  } catch {
    // Fall back to no staff routes on failure.
  }

  return [...staticRoutes, ...categoryRoutes, ...staffRoutes];
}
