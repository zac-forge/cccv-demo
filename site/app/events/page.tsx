import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import CTABand from "@/components/CTABand";
import EventList from "@/components/EventList";
import EventPosters from "@/components/EventPosters";
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
   a plate (EventPosters), each a link with the date in yellow numerals
   and the name as its caption. The plates are a strip:
   one and the edge of the next on a phone, two and the edge of a third
   from sm, the rest by scrolling. Ink
   because the list below keeps the Events field, yellow, and yellow
   numerals only sit on a dark ground. No sunburst: the plates own that
   corner. */


const FEATURED = EVENTS.filter((e) => e.image ?? e.page?.image);

export default function Events() {
  return (
    <main id="main">
      <header className="field-ink page-header-poster">
        <div className="shell">
          <Breadcrumb trail={[{ label: "Events", href: "/events" }]} />
          <div className="mt-9 grid gap-12 md:mt-12 lg:grid-cols-12 lg:items-center lg:gap-16">
            <div className="lg:col-span-5">
              <h1 data-reveal="clip" className="f-display t-poster max-w-[8ch]">
                <span>What&rsquo;s coming up</span>
              </h1>
            </div>

            {FEATURED.length > 0 && (
              <div
                data-reveal=""
                data-late=""
                className="lg:col-span-7 lg:col-start-6"
              >
                <EventPosters events={FEATURED} />
              </div>
            )}
          </div>
        </div>
      </header>

      <section
        aria-label="Upcoming events"
        className="field-yellow py-[clamp(4rem,7vw,6rem)]"
      >
        <div className="shell">
          <EventList events={EVENTS} reveal />
        </div>
      </section>

      <section aria-labelledby="past" className="field-stock band">
        <div className="shell">
          <h2
            data-reveal="clip"
            id="past"
            className="f-display t-section max-w-[10ch]"
          >
            <span>Recently</span>
          </h2>
          <ul data-stagger="" className="mt-12 md:mt-14">
            {PAST_EVENTS.map((e) => (
              <li
                key={e.name}
                data-reveal=""
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
