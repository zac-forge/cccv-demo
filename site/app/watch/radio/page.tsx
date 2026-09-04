import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import CTABand from "@/components/CTABand";
import PosterArt from "@/components/PosterArt";
import Verse from "@/components/Verse";
import WatchNav from "@/components/WatchNav";

/* ------------------------------------------------------------------
   /radio, verbatim. "Faith Comes By Hearing" is taken from the same
   recordings the archive holds, so this page is informational: where
   and when it airs. Station list is theirs; the plan asks that all six
   be confirmed still on air before launch (docs/01-build-plan.md §4).

   The opening is /watch/sermons' (Drew, September 4: "needs a verse or
   something in the right side of the hero like all messages"): a
   running head, the title and their paragraph in the left seven
   columns, a verse at pull size in the five beside them, the Watch
   strip beneath. The verse is Romans 10:17, the one the broadcast is
   named for; it also opens /watch, and that repetition is the point.
   ------------------------------------------------------------------ */

const STATIONS: {
  station: string;
  freq: string;
  where: string;
  when: string;
  listen?: string;
}[] = [
  { station: "KDAR", freq: "98.3 FM The Word", where: "Southern California", when: "Mon–Fri 3:30 pm · Sat 3 pm · Sun noon", listen: "https://983fmtheword.com/listenlive" },
  { station: "KPTG", freq: "107.1 FM", where: "Southern California", when: "Mon–Fri 10 am" },
  { station: "KEPT", freq: "96.9 FM", where: "Northern California Bay Area", when: "Mon–Fri 5:30 pm", listen: "https://streamdb7web.securenetsystems.net/ce/index.cfm?stationCallSign=KEPT" },
  { station: "KLHT", freq: "91.5 FM", where: "Hawaii", when: "Mon–Fri 5:30 am", listen: "https://fm.klight.org/" },
  { station: "KBOOK", freq: "93.3 FM", where: "Nevada, Reno–Sparks", when: "Mon–Fri 11 am", listen: "https://www.kbook933.com/listen-to-kbook" },
  { station: "Light Radio", freq: "", where: "Iredell and Beyond", when: "Mon–Fri 11 am & 6:30 pm" },
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
      {/* The tower fills the right half, so Romans 10:17 stacks under the
          paragraph the way a poster header stacks its aside when a painted
          piece owns the right (PageHeader); it sat in the five columns
          beside the title until the art came (Drew, September 4). */}
      <div className="field-ink relative isolate overflow-hidden" data-art="tower">
        <PosterArt art="tower" />
        <header className="shell relative pt-[clamp(2.5rem,5vw,4rem)]">
          <Breadcrumb
            trail={[
              { label: "Messages", href: "/watch" },
              { label: "Radio", href: "/watch/radio" },
            ]}
          />
          <div className="mt-7 grid gap-10 md:mt-9 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <p data-reveal="" className="t-eyebrow text-yellow">
                On the radio
              </p>
              <h1 data-reveal="clip" className="f-display t-feature mt-4 max-w-[14ch]">
                <span>Faith Comes By Hearing</span>
              </h1>
              <p data-reveal="" className="t-lede muted measure-tight mt-7">
                Taken from live recordings of both Sunday morning and Wednesday
                night services, &ldquo;Faith Comes By Hearing&rdquo; is our daily
                radio broadcast featuring Pastor Dave&rsquo;s dynamic
                verse-by-verse teaching.
              </p>
              <Verse
                reference="Romans 10:17"
                tone="dark"
                layout="quote"
                className="mt-8 md:mt-10"
              />
            </div>
          </div>
          <WatchNav current="/watch/radio" className="mt-10 md:mt-14" />
        </header>
      </div>

      <section aria-label="Stations and times" className="field-stock band">
        <div className="shell grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <table data-reveal="" className="w-full border-collapse text-left">
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
            <Link href="/watch/sermons" className="link-rule mt-5">
              Browse all messages
            </Link>
          </div>

          {/* The radio, as itself this time: the homepage buries this
              plate under an ink overlay to make it a tone. */}
          <div
            data-reveal=""
            data-late=""
            className="relative aspect-[12/5] overflow-hidden border border-ink lg:col-span-5 lg:aspect-[4/5]"
          >
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
