import type { Metadata } from "next";
import Link from "next/link";
import CTABand from "@/components/CTABand";
import PageHeader from "@/components/PageHeader";
import Verse from "@/components/Verse";
import { BELIEFS, PASTOR, TEAM, WHO_WE_ARE } from "@/lib/content";
import { CHURCH } from "@/lib/site";

/* ------------------------------------------------------------------
   /about and /about/about-us folded into one, plus the three blocks on
   /home ("Who We Are", "What We Do", "Why We're Here"). Every paragraph
   is theirs, verbatim. Section headings are theirs where they had one
   ("What we believe", "Meet our pastor", "Meet our team", "Connect with
   us"). Staff photos are being replaced, so the team is set as names.
   The 805 number and Newbury Park mailing address on their /about are
   not carried: the footer number is the one in use (CONTENT-SOURCES §6)
   and the mailing address is an open question.
   ------------------------------------------------------------------ */

export const metadata: Metadata = {
  title: "About",
  // /home, "Who We Are".
  description:
    "Calvary Chapel Conejo Valley has been formed as a fellowship of believers in the Lordship of Jesus Christ. Our supreme desire is to know Christ and be conformed to His image.",
  alternates: { canonical: "/about" },
};

export default function About() {
  return (
    <main id="main">
      <PageHeader
        field="field-salt"
        trail={[{ label: "About", href: "/about" }]}
        title="About"
        lede={<p>{WHO_WE_ARE[0].text}</p>}
      />

      {/* What we do, why we're here: two of the three /home blocks, side
          by side. The first is the lede above. */}
      <section aria-label="What we do" className="field-salt pb-[clamp(4rem,7vw,6rem)]">
        <div className="shell grid gap-10 md:grid-cols-2 md:gap-16">
          {WHO_WE_ARE.slice(1).map((block) => (
            <div key={block.title} className="rule-t pt-6">
              <h2 className="t-subhead">{block.title}</h2>
              <p className="prose mt-4 max-w-[46ch]">{block.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================
          WHAT WE BELIEVE — the statement of faith, in their words. The
          four worship convictions are set as a list of pairs: the
          conviction in the display face, the "Therefore" beneath it.
          ========================================================= */}
      <section id="beliefs" aria-labelledby="beliefs-title" className="field-stock band">
        <div className="shell">
          <h2 id="beliefs-title" className="f-display t-section max-w-[12ch]">
            What we believe
          </h2>
          <div className="prose measure mt-10 md:mt-12">
            {BELIEFS.intro.map((para) => (
              <p key={para.slice(0, 40)}>{para}</p>
            ))}
          </div>
          <ul className="mt-12 grid gap-x-16 gap-y-10 md:mt-16 md:grid-cols-2">
            {BELIEFS.worship.map((w) => (
              <li key={w.we} className="rule-t pt-6">
                <p className="t-subhead max-w-[18ch]">{w.we}</p>
                <p className="prose mt-4 max-w-[46ch]">
                  <span className="t-eyebrow mr-3 text-red">Therefore</span>
                  {w.therefore}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* =========================================================
          MEET OUR PASTOR — his bio as they wrote it, Phil. 1:21 set
          apart beside the paragraph that quotes it.
          ========================================================= */}
      <section id="pastor" aria-labelledby="pastor-title" className="field-salt band">
        <div className="shell">
          <p className="t-eyebrow text-red">Meet our pastor</p>
          <h2 id="pastor-title" className="f-display t-section mt-5 max-w-[12ch]">
            {PASTOR.name}
          </h2>
          <div className="mt-10 lg:grid lg:grid-cols-12 lg:gap-x-16 md:mt-12">
            <div className="prose measure lg:col-span-7">
              {PASTOR.paragraphs.map((para) => (
                <p key={para.slice(0, 40)}>{para}</p>
              ))}
            </div>
            <div className="mt-8 lg:col-span-4 lg:col-start-9 lg:mt-0 lg:self-end">
              <Verse reference="Philippians 1:21" />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          MEET OUR TEAM — no photos yet, on purpose. The names are the
          artwork: a blue plate, the couple set large, the blurb below.
          ========================================================= */}
      <section id="team" aria-labelledby="team-title" className="field-stock band">
        <div className="shell">
          <h2 id="team-title" className="f-display t-section max-w-[12ch]">
            Meet our team
          </h2>
          <ul className="mt-12 grid gap-6 md:mt-14 md:grid-cols-2 lg:grid-cols-3">
            {TEAM.map((person) => (
              <li key={person.names} className="flex flex-col border border-ink">
                <div className="field-blue px-6 pb-7 pt-10">
                  <h3 className="f-display text-[clamp(1.5rem,2vw,1.875rem)] leading-[1.02] tracking-[-0.02em]">
                    {person.names}
                  </h3>
                </div>
                <p className="muted flex-1 bg-salt px-6 py-6 text-[0.9375rem] leading-relaxed">
                  {person.text}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="reach-title" className="field-salt band">
        <div className="shell grid gap-8 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <h2 id="reach-title" className="f-display t-section max-w-[10ch]">
              Connect with us
            </h2>
            <p className="prose mt-6">We&rsquo;d love to hear from you:</p>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <p>
              <span className="t-eyebrow block text-red">By email</span>
              <a href={`mailto:${CHURCH.email}`} className="link-inline mt-2 inline-block text-[1.125rem]">
                {CHURCH.email}
              </a>
            </p>
            <p className="mt-6">
              <span className="t-eyebrow block text-red">By phone</span>
              <a href={CHURCH.phoneHref} className="f-data mt-2 inline-block text-[1.75rem] leading-none">
                {CHURCH.phone}
              </a>
            </p>
            <Link href="/connect" className="link-rule mt-8">
              Prayer, serving and the directory
            </Link>
          </div>
        </div>
      </section>

      <CTABand field="field-stock" />
    </main>
  );
}
