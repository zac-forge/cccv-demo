import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import CTABand from "@/components/CTABand";
import EventList from "@/components/EventList";
import { EVENTS, PAST_EVENTS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Events",
  description:
    "What's coming up at Calvary Chapel Conejo Valley: the 2026 Women's Retreat, Family Movie Night and the Evangelism & Discipleship class.",
  alternates: { canonical: "/events" },
};

/* Upcoming, then past. Their /eventscalendar index is empty (47 chars),
   so the page is the rows themselves. Three real upcoming events; none
   invented.

   The opening is a poster on ink (Drew, September 4): the title at
   poster size and, beside it, every upcoming event that has artwork as
   a plate, each a link to its page with the date in yellow numerals and
   the name as its caption. Ink because the list below keeps the Events
   field, yellow, and yellow numerals only sit on a dark ground. No
   sunburst: the plates own that corner. */

const FEATURED = EVENTS.filter((e) => e.page?.image);

export default function Events() {
  return (
    <main id="main">
      <header className="field-ink page-header-poster">
        <div className="shell">
          <Breadcrumb trail={[{ label: "Events", href: "/events" }]} />
          <div className="mt-9 grid gap-12 md:mt-12 lg:grid-cols-12 lg:items-end lg:gap-16">
            <div className="lg:col-span-5">
              <h1 className="f-display t-poster max-w-[8ch]">
                What&rsquo;s coming up
              </h1>
            </div>

            {FEATURED.length > 0 && (
              <ul
                className={`grid gap-8 lg:col-span-7 lg:col-start-6 ${
                  FEATURED.length > 1 ? "sm:grid-cols-2" : ""
                }`}
              >
                {FEATURED.map((e, i) => (
                  <li key={e.name}>
                    <Link href={e.href} className="pressable block">
                      <span className="relative block aspect-[3/2] overflow-hidden border border-[color:var(--rule)]">
                        <Image
                          src={e.page!.image!}
                          alt=""
                          fill
                          priority={i === 0}
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 30vw"
                          className="object-cover"
                        />
                      </span>
                      <span className="mt-4 grid grid-cols-[4rem_1fr] items-baseline gap-x-4">
                        <span
                          aria-hidden="true"
                          className="f-data text-[1.75rem] leading-none text-yellow"
                        >
                          <span className="t-eyebrow block">{e.month}</span>
                          {e.day}
                        </span>
                        <span>
                          <span className="f-data block text-[1.25rem] leading-tight">
                            {e.name}
                          </span>
                          <span className="muted mt-1 block text-[0.9375rem]">
                            {e.detail}
                          </span>
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </header>

      <section
        aria-label="Upcoming events"
        className="field-yellow py-[clamp(4rem,7vw,6rem)]"
      >
        <div className="shell">
          <EventList events={EVENTS} />
        </div>
      </section>

      <section aria-labelledby="past" className="field-stock band">
        <div className="shell">
          <h2 id="past" className="f-display t-section max-w-[10ch]">
            Recently
          </h2>
          <ul className="mt-12 md:mt-14">
            {PAST_EVENTS.map((e) => (
              <li
                key={e.name}
                className="rule-t grid gap-2 py-6 last:border-b last:border-[color:var(--rule)] sm:grid-cols-[11rem_1fr] sm:gap-x-10 md:py-7"
              >
                <span className="t-eyebrow pt-1.5 text-red">{e.date}</span>
                <span>
                  <span className="f-data block text-[1.25rem] leading-tight md:text-[1.5rem]">
                    {e.name}
                  </span>
                  <span className="muted mt-1.5 block text-[0.9375rem]">{e.detail}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTABand />
    </main>
  );
}
