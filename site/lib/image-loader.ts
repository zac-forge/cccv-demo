"use client";

import type { ImageLoaderProps } from "next/image";

/* next/image under `output: 'export'` has no optimizer, so every <Image>
   on the site resolves through this instead.

   Sanity CDN sources get real resizing — width, quality and auto=format,
   so the CDN hands back AVIF or WebP wherever the browser takes it, with
   Cloudflare caching the result. That is the only optimisation path on
   the site, which is why staff photos and event art belong in Sanity.

   Everything else — files in /public, the YouTube poster frame — is
   served exactly as it sits on disk. Hence the rule for /public: hand
   sized, WebP, committed at the largest size it is ever displayed. A
   phone-sized PNG dropped in there ships as a phone-sized PNG.

   next/image still writes a srcset for pass-through sources, every
   candidate the same URL. Harmless: the browser fetches it once. */
const SANITY_CDN = "https://cdn.sanity.io/";

export default function imageLoader({
  src,
  width,
  quality,
}: ImageLoaderProps): string {
  if (!src.startsWith(SANITY_CDN)) return src;
  const url = new URL(src);
  url.searchParams.set("w", String(width));
  url.searchParams.set("q", String(quality ?? 75));
  url.searchParams.set("auto", "format");
  url.searchParams.set("fit", "max");
  return url.toString();
}
