import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Required under output: 'export'. See robots.ts.
export const dynamic = "force-static";

/* Only routes that exist. Add each page as it ships. The ministry and
   event slugs come from lib/content.ts until Sanity supplies them, and
   /watch?s=<id> deliberately stays out: those are shareable, not
   indexable. */
const ROUTES = ["/", "/new/know-jesus"];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: "weekly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
