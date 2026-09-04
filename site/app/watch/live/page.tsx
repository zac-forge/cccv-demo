import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import CTABand from "@/components/CTABand";
import LivePlayer from "@/components/LivePlayer";
import NextService from "@/components/NextService";
import PosterArt from "@/components/PosterArt";
import WatchNav from "@/components/WatchNav";
import { CHURCH } from "@/lib/site";

/* ------------------------------------------------------------------
   The offline state is the primary state: there is no service about
   165 hours a week. So the page leads with the next service time,
   computed in the browser, and the stream itself waits behind a click.
   Times are /home's ("Sundays 11 AM & Wednesday 7 PM"); their
   /livestream page says 10 AM and Thursdays and is the outlier
   (CONTENT-SOURCES §6). Links are their own channels, from /home.
   ------------------------------------------------------------------ */

const YT_CHANNEL_ID = "UC3Uw5Cc9fEd5v724Xr6E1KQ";

export const metadata: Metadata = {
  title: "Watch live",
  description:
    "We stream live on Sundays at 11 am and Wednesdays at 7 pm, here and on YouTube, Facebook and Rumble.",
  alternates: { canonical: "/watch/live" },
};

export default function Live() {
  return (
    <main id="main">
      {/* The Messages opening, as /watch/radio has it: running head, title
          and lede in the left seven columns, the lectern owning the right,
          the Watch strip beneath. It was the one Messages page without the
          strip (Drew, September 4). No verse: none of their livestream
          copy cites one. */}
      <div className="field-ink relative isolate overflow-hidden" data-art="lectern">
        <PosterArt art="lectern" />
        <header className="shell relative pt-[clamp(2.5rem,5vw,4rem)]">
          <Breadcrumb
            trail={[
              { label: "Messages", href: "/watch" },
              { label: "Live", href: "/watch/live" },
            ]}
          />
          <div className="mt-7 grid gap-10 md:mt-9 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <p data-reveal="" className="t-eyebrow text-yellow">
                Livestream
              </p>
              <h1 data-reveal="clip" className="f-display t-feature mt-4 max-w-[14ch]">
                <span>Watch live</span>
              </h1>
              <p data-reveal="" className="t-lede muted measure-tight mt-7">
                We stream live on Sundays at 11 am and Wednesdays at 7 pm.
              </p>
            </div>
          </div>
          <WatchNav current="/watch/live" className="mt-10 md:mt-14" />
        </header>
      </div>

      <section className="field-ink pt-[clamp(3rem,5vw,4.5rem)] pb-[clamp(5rem,8vw,7rem)]">
        <div className="shell grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <NextService />
            <p className="muted mt-6 max-w-[38ch] text-[0.9375rem] leading-snug">
              Watch here, or on YouTube, Facebook and Rumble.
            </p>
            <ul data-reveal="" className="mt-8 flex flex-col gap-3">
              {[
                { label: "YouTube", href: `${CHURCH.social.youtube}/live` },
                { label: "Facebook", href: CHURCH.social.facebook },
                { label: "Rumble", href: CHURCH.social.rumble },
              ].map((l) => (
                <li key={l.label}>
                  <a href={l.href} target="_blank" rel="noopener" className="link-folio">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <Link href="/watch/sermons" className="btn btn-outline mt-10">
              Browse all messages
            </Link>
          </div>
          <div data-reveal="" data-late="" className="lg:col-span-7">
            <LivePlayer channelId={YT_CHANNEL_ID} />
          </div>
        </div>
      </section>

      <CTABand />
    </main>
  );
}
