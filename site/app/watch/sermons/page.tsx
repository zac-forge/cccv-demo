import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import CTABand from "@/components/CTABand";
import PageHeader from "@/components/PageHeader";
import SermonArchive from "@/components/SermonArchive";
import SermonPlayer from "@/components/SermonPlayer";
import { SERMON } from "@/lib/content";

/* ------------------------------------------------------------------
   The archive: 2,345 sermons, July 2001 to August 2026, as one page.
   Moved here from /watch on 2026-09-04 when /watch became the front
   door to the media ministry (Drew's Watch + Listen pass); nothing
   else about it changed, and it is next to be reviewed.
   Lede and podcast link are theirs (/sermons; their typo "Pastor's
   Dave's" corrected). The featured message is the one on the homepage,
   from their YouTube channel. The list is client-side over
   /sermons.json, built by scripts/build-sermon-index.mjs.
   ------------------------------------------------------------------ */

const PODCAST = "https://podcasts.apple.com/us/podcast/calvary-chapel-calabasas/id1491958200";

export const metadata: Metadata = {
  title: "Recent teachings",
  description:
    "Twenty-five years of verse-by-verse teaching from Calvary Chapel Conejo Valley: every message, by book, series, speaker and year.",
  alternates: { canonical: "/watch/sermons" },
};

export default function Watch() {
  return (
    <main id="main">
      <PageHeader
        field="field-ink"
        trail={[
          { label: "Watch", href: "/watch" },
          { label: "Recent teachings", href: "/watch/sermons" },
        ]}
        title="Recent teachings"
        lede={
          <p>
            Here are some of our most recent teachings from here at CC Conejo
            Valley. We&rsquo;re always adding to our online library from Pastor
            Dave&rsquo;s previous teachings, so if you&rsquo;re looking for a
            particular book, check back in a bit!
          </p>
        }
      />

      {/* The latest message, the same one the homepage carries. */}
      <section aria-labelledby="latest" className="field-ink pb-[clamp(4rem,7vw,6rem)]">
        <div className="shell grid items-start gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <SermonPlayer videoId={SERMON.videoId} title={SERMON.title} />
          </div>
          <div className="lg:col-span-6">
            <p className="t-eyebrow muted">Latest message · {SERMON.tags.join(" · ")}</p>
            <h2 id="latest" className="f-display t-section mt-4">
              {SERMON.title}
            </h2>
            <p className="f-data mt-6 text-[clamp(1.25rem,2vw,1.75rem)] leading-none">
              {SERMON.passage}
            </p>
            <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row">
              <Link href="/watch/live" className="btn btn-sun">
                Watch live
              </Link>
              <a href={PODCAST} target="_blank" rel="noopener" className="btn btn-outline">
                Subscribe to the podcast
              </a>
            </div>
          </div>
        </div>
      </section>

      <Suspense fallback={null}>
        <SermonArchive />
      </Suspense>

      <CTABand />
    </main>
  );
}
