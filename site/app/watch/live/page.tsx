import type { Metadata } from "next";
import Link from "next/link";
import CTABand from "@/components/CTABand";
import LivePlayer from "@/components/LivePlayer";
import NextService from "@/components/NextService";
import PageHeader from "@/components/PageHeader";
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
    "Church live streaming is available Sundays 11 AM & Wednesday 7 PM on this website, Facebook, YouTube and Rumble.",
  alternates: { canonical: "/watch/live" },
};

export default function Live() {
  return (
    <main id="main">
      <PageHeader
        field="field-ink"
        trail={[
          { label: "Watch", href: "/watch" },
          { label: "Live", href: "/watch/live" },
        ]}
        title="Watch live"
        lede={<p>Church Live streaming is available Sundays 11 AM &amp; Wednesday 7 PM.</p>}
      />

      <section className="field-ink pb-[clamp(5rem,8vw,7rem)]">
        <div className="shell grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <NextService />
            <p className="muted mt-6 max-w-[38ch] text-[0.9375rem] leading-snug">
              Stream live from this website, or on Facebook, YouTube and Rumble.
            </p>
            <ul className="mt-8 flex flex-col gap-3">
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
            <Link href="/watch" className="btn btn-outline mt-10">
              Browse recent teachings
            </Link>
          </div>
          <div className="lg:col-span-7">
            <LivePlayer channelId={YT_CHANNEL_ID} />
          </div>
        </div>
      </section>

      <CTABand />
    </main>
  );
}
