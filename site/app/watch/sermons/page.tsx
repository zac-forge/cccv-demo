import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import CTABand from "@/components/CTABand";
import SermonArchive from "@/components/SermonArchive";
import Verse from "@/components/Verse";
import WatchNav from "@/components/WatchNav";
import { featuredTeaching, TEACHINGS } from "@/lib/sermons";

/* ------------------------------------------------------------------
   The library: 2,345 rows, July 2001 to August 2026, as 1,655
   teachings on one page with one player. Lede and podcast link are
   theirs (/sermons; "from here at CC Conejo Valley" and their typo
   "Pastor's Dave's" cut). The featured teaching is the one on the
   homepage and /watch, from their YouTube channel. The list is
   client-side over /sermons.json, built by scripts/build-sermon-index.mjs
   and folded into teachings by lib/teachings.ts.

   The opening is /watch's (Drew, September 4): a running head, the
   title and their line in the left seven columns, a verse at pull size
   in the five beside them, the Watch strip beneath. The running head
   here is the library's span, read from the index at build time so it
   never goes stale; the verse is Acts 20:27, the one their teaching
   statement cites for going through the whole Bible.
   ------------------------------------------------------------------ */

const PODCAST = "https://podcasts.apple.com/us/podcast/calvary-chapel-calabasas/id1491958200";

export const metadata: Metadata = {
  title: "All messages",
  description:
    "Twenty-five years of verse-by-verse teaching from Calvary Chapel Conejo Valley: every message, in one library, with one player.",
  alternates: { canonical: "/watch/sermons" },
};

const FEATURED = featuredTeaching();

/* Newest first, so the span runs from the last row's year to the first's. */
const YEARS = `${TEACHINGS[TEACHINGS.length - 1].date.slice(0, 4)}–${TEACHINGS[0].date.slice(0, 4)}`;

export default function Sermons() {
  return (
    <main id="main">
      <div className="field-ink">
        <header className="shell pt-[clamp(2.5rem,5vw,4rem)]">
          <Breadcrumb
            trail={[
              { label: "Messages", href: "/watch" },
              { label: "All messages", href: "/watch/sermons" },
            ]}
          />
          <div className="mt-7 grid gap-10 md:mt-9 lg:grid-cols-12 lg:items-end lg:gap-16">
            <div className="lg:col-span-7">
              <p className="t-eyebrow text-yellow">{YEARS}</p>
              <h1 className="f-display t-feature mt-4 max-w-[14ch]">All messages</h1>
              <p className="t-lede muted measure-tight mt-7">
                We&rsquo;re always adding to our online library from Pastor
                Dave&rsquo;s previous teachings, so if you&rsquo;re looking for a
                particular book, check back in a bit.
              </p>
              <p className="mt-4">
                <a
                  href={PODCAST}
                  target="_blank"
                  rel="noopener"
                  className="muted text-[0.9375rem] underline decoration-1 underline-offset-4 hover:decoration-2"
                >
                  Subscribe to the podcast
                </a>
              </p>
            </div>
            <Verse
              reference="Acts 20:27"
              tone="dark"
              layout="quote"
              size="pull"
              className="lg:col-span-5 lg:col-start-8 lg:pb-1"
            />
          </div>
          <WatchNav current="/watch/sermons" className="mt-10 md:mt-14" />
        </header>
      </div>

      <SermonArchive featured={FEATURED} />

      <CTABand />
    </main>
  );
}
