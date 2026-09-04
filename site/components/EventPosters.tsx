"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { EventItem } from "@/lib/content";

/* Event artwork as a strip of poster plates: one plate and the edge of
   the next on a phone, two and the edge of a third from sm, so the
   strip shows that it scrolls. It moves only when someone moves it: a
   swipe, the keyboard, or the two arrows.
   Native scroll-snap does the scrolling; the arrows are the only
   script. With as many plates as fit, the arrows do not render. */
export default function EventPosters({ events }: { events: EventItem[] }) {
  const strip = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const el = strip.current;
    if (!el) return;
    const update = () => {
      setAtStart(el.scrollLeft <= 1);
      setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 1);
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const turn = (dir: -1 | 1) => {
    const el = strip.current;
    const plate = el?.firstElementChild as HTMLElement | null;
    if (!el || !plate) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({
      left: dir * (plate.offsetWidth + gap),
      behavior: reduce ? "auto" : "smooth",
    });
  };

  // One plate fits a phone, two fit from sm. Arrows only where there is
  // more than fits.
  const arrows =
    events.length <= 1 ? "hidden" : events.length === 2 ? "sm:hidden" : "";

  return (
    <div>
      <div className={`mb-4 flex justify-end gap-2 ${arrows}`}>
        <button
          type="button"
          className="strip-arrow"
          aria-label="Previous events"
          aria-disabled={atStart}
          onClick={() => turn(-1)}
        >
          &#8592;
        </button>
        <button
          type="button"
          className="strip-arrow"
          aria-label="Next events"
          aria-disabled={atEnd}
          onClick={() => turn(1)}
        >
          &#8594;
        </button>
      </div>

      <ul ref={strip} className="poster-strip" aria-label="Upcoming events with artwork">
        {events.map((e, i) => (
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
              <span className="mt-4 grid grid-cols-[5.5rem_1fr] items-baseline gap-x-4">
                <span
                  aria-hidden="true"
                  className={`f-data leading-none text-yellow ${
                    e.day.includes("–") ? "text-[1.375rem]" : "text-[1.75rem]"
                  }`}
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
    </div>
  );
}
