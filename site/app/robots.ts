import type { MetadataRoute } from "next";
import { INDEXABLE, SITE_URL } from "@/lib/site";

// Required under output: 'export'; without it the build fails looking for
// generateStaticParams on a route that has none.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  // Anything but the real host is closed to crawlers. See lib/site.ts.
  if (!INDEXABLE) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
