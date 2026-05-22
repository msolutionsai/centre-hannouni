import type { MetadataRoute } from "next";
import { interventionDetails } from "@/lib/interventions";

const BASE_URL = "https://centrehannouni.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const home: MetadataRoute.Sitemap[number] = {
    url: BASE_URL,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 1,
  };

  // Page pilier commerciale — priorité élevée juste après la home.
  const pillar: MetadataRoute.Sitemap[number] = {
    url: `${BASE_URL}/chirurgie-esthetique-marrakech`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.9,
  };

  const interventions: MetadataRoute.Sitemap = interventionDetails.map((i) => ({
    url: `${BASE_URL}/interventions/${i.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [home, pillar, ...interventions];
}
