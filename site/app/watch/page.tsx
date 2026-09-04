import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import CTABand from "@/components/CTABand";
import LatestMessage from "@/components/LatestMessage";
import SermonPreview from "@/components/SermonPreview";
import WatchNav from "@/components/WatchNav";
import { SERMON } from "@/lib/content";
import { recentSermons } from "@/lib/sermons";

/* ------------------------------------------------------------------
   The front door to the media ministry, not the archive: the latest
   message, three recent teachings, the way to the livestream, and the
   radio broadcast. The archive itself is /watch/sermons.

   Cadence, top to bottom: a restrained opening on ink, the Watch strip,
   the message as the anchor; then a beat of stock for the recent three
   beside the livestream; a blue interruption for the radio; the close.

   Copy: the headline is Drew's; the lede is theirs (their teaching
   statement, /about); the radio paragraph is theirs (/radio); the live
   times are /home's. Labels are mine. CONTENT-SOURCES.md §13.
   ------------------------------------------------------------------ */

export const metadata: Metadata = {
  title: "Messages",
  description:
    "The latest message, recent messages, the livestream and the Faith Comes By Hearing radio broadcast from Calvary Chapel Conejo Valley. Verse by verse.",
  alternates: { canonical: "/watch" },
};

/* Three, and not the one already featured above them. The index is
   read at build time; nothing here runs in the browser. */
const RECENT = recentSermons(3, SERMON.title);

export default function Watch() {
  return (
    <main id="main">
      {/* =========================================================
          OPENING + LATEST — one ink field. The opening is short on
          purpose; the message beneath it is the page.
          ========================================================= */}
      <div className="field-ink">
        <header className="shell pt-[clamp(2.5rem,5vw,4rem)]">
          <Breadcrumb trail={[{ label: "Messages", href: "/watch" }]} />
          <p className="t-eyebrow mt-7 text-yellow md:mt-9">Messages</p>
          <h1 className="f-display t-feature mt-4 max-w-[14ch]">
            Teaching the Word, verse by verse.
          </h1>
          <p className="t-lede muted measure-tight mt-7">
            We don&rsquo;t just teach from the Bible as much as we teach
            through the Bible.
          </p>
          <WatchNav current="/watch" className="mt-10 md:mt-14" />
        </header>

        <section
          id="latest"
          aria-labelledby="latest-title"
          className="shell pt-[clamp(3rem,5vw,4.5rem)] pb-[clamp(4rem,7vw,6rem)]"
        >
          <LatestMessage
            videoId={SERMON.videoId}
            title={SERMON.title}
            titleLines={SERMON.titleLines}
            passage={SERMON.passage}
            tags={SERMON.tags}
          />
        </section>
      </div>

      {/* =========================================================
          RECENT + LIVE — the primary pair on stock. Three teachings
          and one strong way into the archive; beside them, the
          livestream times and the way to it.
          ========================================================= */}
      <section
        aria-labelledby="recent-title"
        className="field-stock pt-[clamp(4.5rem,8vw,7rem)] pb-[clamp(4rem,7vw,6rem)]"
      >
        <div className="shell grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-8">
            <div className="rule-b flex flex-col gap-3 pb-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
              <h2
                id="recent-title"
                className="f-display text-[clamp(1.875rem,3vw,2.75rem)] leading-[1] tracking-[-0.025em]"
              >
                Recent messages
              </h2>
              <Link href="/watch/sermons" className="link-folio group shrink-0">
                All messages
                <span
                  aria-hidden="true"
                  className="transition-transform duration-150 group-hover:translate-x-1"
                >
                  &rarr;
                </span>
              </Link>
            </div>
            <ul className="md:mt-8 md:grid md:grid-cols-3 md:gap-8">
              {RECENT.map((s) => (
                <li
                  key={s.id}
                  className="border-b border-[color:var(--rule)] py-5 md:border-0 md:py-0"
                >
                  <SermonPreview sermon={s} href={`/watch/sermons?s=${s.id}`} />
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-[color:var(--rule)] pt-8 lg:col-span-4 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            <p className="t-eyebrow text-red">Watch live</p>
            {/* Their times, /home. The livestream page computes the next one. */}
            <p className="f-data mt-4 text-[clamp(1.5rem,2.4vw,2rem)] leading-tight">
              Sundays 11 am &amp;
              <br />
              Wednesdays 7 pm
            </p>
            <p className="muted mt-4 max-w-[30ch] text-[0.9375rem] leading-snug">
              Watch here, or on YouTube, Facebook and Rumble.
            </p>
            <Link href="/watch/live" className="link-folio group mt-7">
              Livestream
              <span
                aria-hidden="true"
                className="transition-transform duration-150 group-hover:translate-x-1"
              >
                &rarr;
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================
          RADIO — the interruption. The radio as itself on blue, the
          broadcast's name and their own description of it beside it.
          Copy is theirs, /radio.
          ========================================================= */}
      <section
        aria-labelledby="radio-title"
        className="field-blue py-[clamp(4rem,7vw,6.5rem)]"
      >
        <div className="shell grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="relative order-first aspect-[12/5] overflow-hidden border border-[color:var(--rule)] lg:order-none lg:col-span-5 lg:aspect-[4/5]">
            <Image
              src="/site/message-bg.webp"
              alt="Screenprinted illustration of a tabletop radio"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover object-[70%_center]"
            />
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="t-eyebrow text-[color:var(--color-yellow-onblue)]">On the radio</p>
            <h2 id="radio-title" className="f-display t-section mt-5 max-w-[12ch]">
              Faith Comes By Hearing
            </h2>
            <p className="t-lede muted measure-tight mt-7">
              Taken from live recordings of both Sunday morning and Wednesday
              night services, &ldquo;Faith Comes By Hearing&rdquo; is our daily
              radio broadcast featuring Pastor Dave&rsquo;s dynamic
              verse-by-verse teaching.
            </p>
            <Link href="/watch/radio" className="btn btn-sun mt-8">
              Where to listen
            </Link>
          </div>
        </div>
      </section>

      <CTABand />
    </main>
  );
}
