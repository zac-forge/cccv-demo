import Link from "next/link";
import { TIMES } from "@/lib/content";

/* The flat blue information band: printed on the back of the bulletin,
   not four cards. Shared by the homepage and /new. A cell with an href
   makes its value the link — the address to their Google Maps pin, the
   livestream to /watch/live — so the two things a visitor acts on from
   here are one tap. */
export default function ServiceTimes() {
  return (
    <section
      aria-label="Service times and location"
      className="field-blue band-sm relative"
    >
      {/* Their own location, set vertically in the band's outer margin.
          Desktop only — narrower widths have no margin to put it in. */}
      <span
        aria-hidden="true"
        className="edge-note right-[clamp(10px,1.5vw,24px)] top-1/2 hidden -translate-y-1/2 lg:block"
      >
        Thousand Oaks &middot; California
      </span>

      <div className="shell">
        <dl className="-mx-4 grid grid-cols-2 sm:-mx-8 lg:grid-cols-4">
          {TIMES.map((cell) => {
            const value = (
              <p className="f-data t-times max-sm:text-[1.375rem]">{cell.value}</p>
            );
            return (
              <div
                key={cell.label}
                className="border-t border-[color:var(--rule)] px-4 py-8 [&:nth-child(even)]:border-l sm:px-8 lg:[&:not(:first-child)]:border-l"
              >
                <dt className="t-eyebrow t-eyebrow-onblue">{cell.label}</dt>
                <dd className="mt-4">
                  {cell.href ? (
                    cell.external ? (
                      <a
                        href={cell.href}
                        target="_blank"
                        rel="noopener"
                        className="times-link"
                      >
                        {value}
                      </a>
                    ) : (
                      <Link href={cell.href} className="times-link">
                        {value}
                      </Link>
                    )
                  ) : (
                    value
                  )}
                  <p className="muted mt-3 max-w-[26ch] text-[0.9375rem] leading-snug">
                    {cell.detail}
                  </p>
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
