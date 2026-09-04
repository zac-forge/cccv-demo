import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CTABand from "@/components/CTABand";
import PageHeader from "@/components/PageHeader";

/* ------------------------------------------------------------------
   /radio, verbatim. "Faith Comes By Hearing" is taken from the same
   recordings the archive holds, so this page is informational: where
   and when it airs. Station list is theirs; the plan asks that all six
   be confirmed still on air before launch (docs/01-build-plan.md §4).
   ------------------------------------------------------------------ */

const STATIONS: {
  station: string;
  freq: string;
  where: string;
  when: string;
  listen?: string;
}[] = [
  { station: "KDAR", freq: "98.3 FM The Word", where: "Southern California", when: "Mon–Fri 3:30 PM · Sat 3 PM · Sun 12 PM", listen: "https://983fmtheword.com/listenlive" },
  { station: "KPTG", freq: "107.1 FM", where: "Southern California", when: "Mon–Fri 10 AM" },
  { station: "KEPT", freq: "96.9 FM", where: "Northern California Bay Area", when: "Mon–Fri 5:30 PM", listen: "https://streamdb7web.securenetsystems.net/ce/index.cfm?stationCallSign=KEPT" },
  { station: "KLHT", freq: "91.5 FM", where: "Hawaii", when: "Mon–Fri 5:30 AM", listen: "https://fm.klight.org/" },
  { station: "KBOOK", freq: "93.3 FM", where: "Nevada, Reno–Sparks", when: "Mon–Fri 11 AM", listen: "https://www.kbook933.com/listen-to-kbook" },
  { station: "Light Radio", freq: "", where: "Iredell and Beyond", when: "Mon–Fri 11:00 AM and 6:30 PM" },
];

export const metadata: Metadata = {
  title: "Faith Comes By Hearing, on the radio",
  description:
    "Taken from live recordings of both Sunday morning and Wednesday night services, Faith Comes By Hearing is our daily radio broadcast featuring Pastor Dave's verse-by-verse teaching.",
  alternates: { canonical: "/watch/radio" },
};

export default function Radio() {
  return (
    <main id="main">
      <PageHeader
        field="field-ink"
        trail={[
          { label: "Watch", href: "/watch" },
          { label: "Radio", href: "/watch/radio" },
        ]}
        title="Faith Comes By Hearing"
        lede={
          <p>
            Taken from live recordings of both Sunday morning and Wednesday night
            services, &ldquo;Faith Comes By Hearing&rdquo; is our daily radio
            broadcast featuring Pastor Dave&rsquo;s dynamic verse-by-verse
            teaching.
          </p>
        }
      />

      <section aria-label="Stations and times" className="field-stock band">
        <div className="shell grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="t-eyebrow text-red">
                  <th scope="col" className="rule-b pb-3 pr-4 font-bold">Station</th>
                  <th scope="col" className="rule-b pb-3 pr-4 font-bold">Where</th>
                  <th scope="col" className="rule-b pb-3 font-bold">When</th>
                </tr>
              </thead>
              <tbody>
                {STATIONS.map((s) => (
                  <tr key={s.station} className="align-top">
                    <td className="rule-b py-4 pr-4">
                      <span className="t-card block">{s.station}</span>
                      {s.freq && <span className="muted mt-1 block text-[0.875rem]">{s.freq}</span>}
                      {s.listen && (
                        <a href={s.listen} target="_blank" rel="noopener" className="link-inline mt-2 inline-block text-[0.875rem]">
                          Listen online
                        </a>
                      )}
                    </td>
                    <td className="rule-b py-4 pr-4 text-[0.9375rem]">{s.where}</td>
                    <td className="rule-b py-4 text-[0.9375rem]">{s.when}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="muted mt-8 max-w-[52ch] text-[0.9375rem] leading-snug">
              The same teaching is in the archive, in full and on demand.
            </p>
            <Link href="/watch" className="link-rule mt-5">
              Browse recent teachings
            </Link>
          </div>

          {/* The radio, as itself this time: the homepage buries this
              plate under an ink overlay to make it a tone. */}
          <div className="relative aspect-[12/5] overflow-hidden border border-ink lg:col-span-5 lg:aspect-[4/5]">
            <Image
              src="/site/message-bg.webp"
              alt="Screenprinted illustration of a tabletop radio"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover object-[70%_center]"
            />
          </div>
        </div>
      </section>

      <CTABand />
    </main>
  );
}
