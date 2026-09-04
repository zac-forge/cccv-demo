"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { EventItem } from "@/lib/content";

/* Event artwork as a strip of poster plates: one plate and the edge of
   the next on a phone, two and the edge of a third from sm, so the
   strip shows that it scrolls. No buttons. It moves by swipe, by
   dragging with the mouse, by the wheel, by arrow keys when the strip
   has focus, or by tabbing to a plate. Beneath it a hairline carries a
   short marker for where you are; a click on the line jumps there.
   Native scroll-snap does the settling. Only events with art belong
   here; an event without a page of its own carries its art on `image`. */
export default function EventPosters({ events }: { events: EventItem[] }) {
  const strip = useRef<HTMLUListElement>(null);
  const [track, setTrack] = useState({ overflow: false, start: 0, size: 1 });
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null);

  useEffect(() => {
    const el = strip.current;
    if (!el) return;
    const update = () =>
      setTrack({
        overflow: el.scrollWidth > el.clientWidth + 1,
        start: el.scrollLeft / el.scrollWidth,
        size: el.clientWidth / el.scrollWidth,
      });
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const reduce = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const turn = (dir: -1 | 1) => {
    const el = strip.current;
    const plate = el?.firstElementChild as HTMLElement | null;
    if (!el || !plate) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    el.scrollBy({
      left: dir * (plate.offsetWidth + gap),
      behavior: reduce() ? "auto" : "smooth",
    });
  };

  /* Mouse drag. Touch keeps its native swipe. Snap is switched off for
     the duration so the strip follows the hand, then settles on release. */
  const onPointerDown = (e: React.PointerEvent<HTMLUListElement>) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    const el = strip.current!;
    drag.current = { x: e.clientX, left: el.scrollLeft, moved: false };
    el.setPointerCapture(e.pointerId);
    el.dataset.dragging = "";
  };
  const onPointerMove = (e: React.PointerEvent<HTMLUListElement>) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.x;
    if (Math.abs(dx) > 4) d.moved = true;
    strip.current!.scrollLeft = d.left - dx;
  };
  const onPointerUp = (e: React.PointerEvent<HTMLUListElement>) => {
    const el = strip.current;
    if (!el || !drag.current) return;
    el.releasePointerCapture(e.pointerId);
    delete el.dataset.dragging;
    const moved = drag.current.moved;
    drag.current = null;
    // Let the strip settle on a plate, then clear the flag that stops a
    // drag from counting as a click on the plate under the pointer.
    if (moved) {
      el.dataset.dragged = "";
      setTimeout(() => delete el.dataset.dragged, 0);
    }
  };
  const onClickCapture = (e: React.MouseEvent) => {
    if (strip.current?.dataset.dragged !== undefined) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const jump = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = strip.current;
    if (!el) return;
    const r = e.currentTarget.getBoundingClientRect();
    const at = (e.clientX - r.left) / r.width;
    el.scrollTo({
      left: at * el.scrollWidth - el.clientWidth / 2,
      behavior: reduce() ? "auto" : "smooth",
    });
  };

  return (
    <div>
      <ul
        ref={strip}
        className="poster-strip"
        aria-label="Upcoming events with artwork"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            e.preventDefault();
            turn(1);
          } else if (e.key === "ArrowLeft") {
            e.preventDefault();
            turn(-1);
          }
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onClickCapture={onClickCapture}
      >
        {events.map((e, i) => (
          <li key={e.name}>
            <Link href={e.href} className="pressable block" draggable={false}>
              <span className="relative block aspect-[3/2] overflow-hidden border border-[color:var(--rule)]">
                <Image
                  src={(e.image ?? e.page?.image)!}
                  alt=""
                  fill
                  priority={i === 0}
                  draggable={false}
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

      {/* Where you are in the strip. Only when there is more than fits. */}
      {track.overflow && (
        <div
          className="strip-track mt-8"
          role="presentation"
          onClick={jump}
        >
          <span
            className="strip-thumb"
            style={{
              left: `${track.start * 100}%`,
              width: `${track.size * 100}%`,
            }}
          />
        </div>
      )}
    </div>
  );
}
