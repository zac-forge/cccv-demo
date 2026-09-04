import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static. Cloudflare Workers static assets serves `out/` as it is,
  // so nothing in the app may depend on a server. Anything that would —
  // ISR, route handlers reading a request, redirects in config — fails the
  // build here rather than at prelaunch.
  output: "export",

  // trailingSlash stays at its default. `/about` exports as `about.html`,
  // which is what Cloudflare's default `auto-trailing-slash` html_handling
  // expects; if the two ever disagree every page load pays an extra hop.
  // Confirmed on the throwaway workers.dev subdomain at prelaunch.

  images: {
    // Export has no optimizer. Every <Image> resolves through the loader,
    // which resizes Sanity CDN sources and passes everything else through
    // untouched. See lib/image-loader.ts for the /public rule.
    loader: "custom",
    loaderFile: "./lib/image-loader.ts",
  },
};

export default nextConfig;
