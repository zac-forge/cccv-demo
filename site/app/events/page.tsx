import type { Metadata } from "next";
import CTABand from "@/components/CTABand";
import EventList from "@/components/EventList";
import PageHeader from "@/components/PageHeader";
import { EVENTS, PAST_EVENTS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Events",
  description:
    "What's coming up at Calvary Chapel Conejo Valley: the 2026 Women's Retreat, Family Movie Night and the Evangelism & Discipleship class.",
  alternates: { canonical: "/events" },
};

/* Upcoming, then past. Their /eventscalendar index is empty (47 chars),
   so the page is the rows themselves. Three real upcoming events; none
   invented. */
export default function Events() {
  return (
    <main id="main">
      <PageHeader
        field="field-yellow"
        trail={[{ label: "Events", href: "/events" }]}
        title="What’s coming up"
      />

      <section aria-label="Upcoming events" className="field-yellow pb-[clamp(5rem,8vw,7rem)]">
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
