import Link from "next/link";
import { TIMES } from "@/lib/content";

type Field = "field-salt" | "field-stock";

/* The close of every interior page. It carries the service times and
   the address, so they are one tap away on any page — a non-negotiable
   in the spec — and the two things a visitor does next. Times and
   address are the church's (/services, /home).

   Light on purpose. The footer beneath it is Baptism Blue, and a blue
   band stacked on a blue footer read as one tall block with a seam.
   Salt by default; a page whose own field is salt passes stock. */
export default function CTABand({ field = "field-salt" }: { field?: Field }) {
  // Sunday, Wednesday, Where. "Watch live" belongs to /watch.
  const cells = TIMES.slice(0, 3);

  return (
    <section
      aria-label="Service times and next steps"
      className={`${field} band-lg`}
    >
      <div className="shell">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between md:gap-12">
          <h2 data-reveal="clip" className="f-display t-section max-w-[12ch]">
            <span>Come and see.</span>
          </h2>
          <div data-reveal="" className="flex flex-col gap-3 sm:flex-row md:shrink-0">
            <Link href="/new" className="btn btn-ink">
              Plan your visit
            </Link>
            <Link href="/watch" className="btn btn-outline">
              Watch a message
            </Link>
          </div>
        </div>

        {/* Full width, so a time or an address never has to break. */}
        <dl
          data-stagger=""
          className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6 md:mt-14"
        >
          {cells.map((cell) => (
            <div key={cell.label} data-reveal="" className="rule-t pt-5">
              <dt className="t-eyebrow text-red">{cell.label}</dt>
              <dd className="mt-3">
                <p className="f-data text-[1.5rem] leading-none md:text-[1.75rem]">
                  {cell.value}
                </p>
                <p className="muted mt-2 max-w-[26ch] text-[0.9375rem] leading-snug">
                  {cell.detail}
                </p>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
