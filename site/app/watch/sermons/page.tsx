import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import CTABand from "@/components/CTABand";
import SermonArchive from "@/components/SermonArchive";
import WatchNav from "@/components/WatchNav";
import { featuredTeaching } from "@/lib/sermons";

/* ------------------------------------------------------------------
   The library: 2,345 rows, July 2001 to August 2026, as 1,655
   teachings on one page with one player. Lede and podcast link are
   theirs (/sermons; "from here at CC Conejo Valley" and their typo
   "Pastor's Dave's" cut). The featured teaching is the one on the
   homepage and /watch, from their YouTube channel. The list is
   client-side over /sermons.json, built by scripts/build-sermon-index.mjs
   and folded into teachings by lib/teachings.ts.
   ------------------------------------------------------------------ */

const PODCAST = "https://podcasts.apple.com/us/podcast/calvary-chapel-calabasas/id1491958200";

export const metadata: Metadata = {
  title: "All messages",
  description:
    "Twenty-five years of verse-by-verse teaching from Calvary Chapel Conejo Valley: every message, in one library, with one player.",
  alternates: { canonical: "/watch/sermons" },
};

const FEATURED = featuredTeaching();

export default function Sermons() {
  return (
    <main id="main">
      {/* Compact opening: the running head, the title, their line, the
          Watch strip. The player is the next thing. */}
      <div className="field-ink">
        <header className="shell pt-[clamp(2.5rem,5vw,4rem)]">
          <Breadcrumb
            trail={[
              { label: "Messages", href: "/watch" },
              { label: "All messages", href: "/watch/sermons" },
            ]}
          />
          <h1 className="f-display t-feature mt-7 max-w-[14ch] md:mt-9">
            All messages
          </h1>
          <p className="t-lede muted measure-tight mt-6">
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
          <WatchNav current="/watch/sermons" className="mt-8 md:mt-10" />
        </header>
      </div>

      <SermonArchive featured={FEATURED} />

      <CTABand />
    </main>
  );
}
