import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import PosterBand from "@/components/PosterBand";
import ServiceTimes from "@/components/ServiceTimes";
import { SUNDAY_STEPS } from "@/lib/content";
import { CHURCH } from "@/lib/site";

/* ------------------------------------------------------------------
   The first-time visitor's page. Their /first-time is untouched Clover
   filler, so this is built from /services ("When we Meet", "Where We
   Meet", "What to Expect") and /ministries/children, verbatim. The
   heading "What a Sunday looks like", the step titles and the button
   labels are mine; the lede is their /first-time heading.
   ------------------------------------------------------------------ */

export const metadata: Metadata = {
  title: "Plan your visit",
  // Their times and address, /services.
  description:
    "Sunday services at 9:00 am and 11:00 am, Wednesdays at 7 pm, at 101 N. Skyline Dr., Thousand Oaks. What to expect when you visit Calvary Chapel Conejo Valley.",
  alternates: { canonical: "/new" },
};

export default function NewHere() {
  return (
    <main id="main">
      <PageHeader
        trail={[{ label: "New here", href: "/new" }]}
        title="Plan your visit"
        lede={<p>New to church? Here&rsquo;s what to expect!</p>}
      />

      <ServiceTimes />

      {/* =========================================================
          THE MORNING — the four steps at full length. Numbered because
          it is the actual order of a Sunday: the numeral takes the
          margin, the text the column.
          ========================================================= */}
      <section aria-labelledby="sunday" className="field-stock band">
        <div className="shell">
          <h2 id="sunday" className="f-display t-section max-w-[13ch]">
            What a Sunday looks like
          </h2>

          <ol className="mt-12 md:mt-16">
            {SUNDAY_STEPS.map((step, i) => (
              <li
                key={step.title}
                className="rule-t grid gap-5 py-10 md:py-14 lg:grid-cols-12 lg:gap-16"
              >
                <span
                  aria-hidden="true"
                  className="f-display numeral-ghost text-[3.5rem] leading-none lg:col-span-2 lg:text-[clamp(5rem,7.5vw,7.5rem)]"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="lg:col-span-8 lg:col-start-3">
                  <h3 className="t-subhead">{step.title}</h3>
                  <div className="prose measure mt-5">
                    <p>{step.full}</p>
                  </div>
                  {step.when && (
                    <p className="mt-6 max-w-[40ch] text-[0.9375rem] leading-snug text-red">
                      {step.when}
                    </p>
                  )}
                  {step.link && (
                    <Link href={step.link.href} className="link-rule mt-8">
                      {step.link.label}
                    </Link>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <PosterBand
        id="know-jesus"
        title="How can I know Jesus?"
        lede="Our greatest desire is for people to know God personally through Jesus Christ."
        ctas={[
          { label: "Start here", href: "/new/know-jesus", variant: "sun" },
          { label: "Watch a message", href: "/watch", variant: "outline" },
        ]}
      />

      {/* =========================================================
          GETTING HERE — the address, set large, and their own
          directions link. The plate is the valley strip for now.
          ========================================================= */}
      <section aria-labelledby="getting-here" className="field-salt band">
        <div className="shell grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <h2 id="getting-here" className="f-display t-section max-w-[10ch]">
              Getting here
            </h2>
            <p className="f-data mt-8 text-[clamp(1.5rem,2.6vw,2.25rem)] leading-tight">
              {CHURCH.address.street}
              <br />
              {CHURCH.address.city}, {CHURCH.address.state} {CHURCH.address.zip}
            </p>
            <a
              href={CHURCH.directions}
              target="_blank"
              rel="noopener"
              className="btn btn-ink mt-8"
            >
              Get directions
            </a>
          </div>

          {/* A stylised map, not a real one: the 101, Hillcrest, Skyline
              and the campus, drawn in the two inks. The directions button
              is what actually gets someone there. */}
          <div className="relative aspect-[3/2] overflow-hidden border border-ink lg:col-span-7">
            <Image
              src="/site/church-map.webp"
              alt="Illustrated map: Calvary Chapel Conejo Valley at 101 N. Skyline Dr., off W. Hillcrest Dr. and US 101, with the Conejo Valley hills behind"
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
