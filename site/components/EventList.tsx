import Link from "next/link";
import type { EventItem } from "@/lib/content";

/* Bulletin announcements. The date is the graphic. Shared by the
   homepage and /events. */
export default function EventList({
  events,
  reveal = false,
}: {
  events: EventItem[];
  reveal?: boolean;
}) {
  return (
    <ul>
      {events.map((e) => (
        <li
          key={e.name}
          data-reveal={reveal ? "" : undefined}
          className="rule-t last:border-b last:border-[color:var(--rule)]"
        >
          <Link
            href={e.href}
            className="pressable grid grid-cols-[5rem_1fr_auto] items-baseline gap-x-6 py-8 sm:grid-cols-[11rem_1fr_auto] sm:gap-x-10 md:py-10"
          >
            <span
              aria-hidden="true"
              className={`f-data ${e.day.includes("–") ? "t-date-range" : "t-date"}`}
            >
              <span className="t-eyebrow block">{e.month}</span>
              {e.day}
            </span>
            <span>
              <span className="f-data block text-[1.375rem] leading-tight md:text-[1.75rem]">
                {e.name}
              </span>
              <span className="muted mt-2 block text-[0.9375rem] md:text-base">
                {e.detail}
              </span>
            </span>
            {/* Closes the row against the rule, and is the only thing
                telling you the row is a link at all. */}
            <span aria-hidden="true" className="event-go">
              &#8594;
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
