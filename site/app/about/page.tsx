import type { Metadata } from "next";
import Image from "next/image";
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
   us"). The 805 number and Newbury Park mailing address on their /about
   are not carried: the footer number is the one in use (CONTENT-SOURCES
   §6) and the mailing address is an open question.

   Design pass, September 4, on the /connect pass-02 rules: each section
   gets the composition its job asks for, typography and rules before
   components, and numerals only where there is a real sequence.

   - The page opens as a poster on ink (Drew, Sept 4): the title at
     poster size with Acts 20:27 hung beside it, the verse "What we do"
     cites, then their "Who we are" statement across the full shell,
     and the Conejo Valley band along the foot, since the page is about
     where the church is. Ink, not blue: the band is blue hills, and on
     the blue field it vanished.
   - "What we do" and "Why we're here" stay side by side, matched.
   - The creed is four adjectives, so the adjectives are the display
     type: their sentences split typographically, never rewritten.
   - The pastor's bio is an editorial split with a dated rail for the
     three plants in his own account. Dates are the page's one sequence.
   - The team is a ruled roster, not cards: a portrait plate, the names
     and the blurb in one row. Photos are being replaced, so the plate
     holds the screenprinted placeholder until they arrive (Drew, Sept 4).
   - "Connect with us" is one ruled row that closes the roster and
     points at /connect and at Ministries we support.
   ------------------------------------------------------------------ */

export const metadata: Metadata = {
  title: "About",
  // /home, "Who We Are".
  description:
    "Calvary Chapel Conejo Valley has been formed as a fellowship of believers in the Lordship of Jesus Christ. Our supreme desire is to know Christ and be conformed to His image.",
  alternates: { canonical: "/about" },
};

/* Each conviction ends on its one adjective. The adjective becomes the
   display line and the stem stays above it at reading size, so the
   sentence still reads whole and in order. */
function splitConviction(sentence: string) {
  const m = sentence.match(/^(.*\S)\s+(\S+)\.$/);
  return m ? { stem: m[1], word: m[2] } : { stem: "", word: sentence };
}

/* The three church plants as Pastor Dave dates them in his bio. The
   rows are Drew's condensation of his sentences; CONTENT-SOURCES §12. */
const MILESTONES = [
  {
    year: "2000",
    text: "Planted Calvary Chapel Santa Cruz with his wife, and served there as Senior Pastor for 10 years.",
  },
  { year: "2013", text: "Planted Calvary Chapel Calabasas." },
  {
    year: "2021",
    text: "Calvary Chapel Calabasas became Calvary Chapel Conejo Valley.",
  },
];

const [WHO, WHAT, WHY] = WHO_WE_ARE;

export default function About() {
  return (
    <main id="main">
      <PageHeader
        poster
        art="valley"
        field="field-ink"
        trail={[{ label: "About", href: "/about" }]}
        title="About"
        aside={<Verse reference="Acts 20:27" tone="dark" layout="quote" />}
        asideNear
        statement={<p>{WHO.text}</p>}
      />

      {/* =========================================================
          WHAT WE DO, WHY WE'RE HERE — two of the three /home blocks,
          side by side. The first is the statement above.
          ========================================================= */}
      <section
        aria-label="What we do"
        className="field-salt pb-[clamp(4rem,7vw,6rem)]"
      >
        <div className="shell grid gap-10 md:grid-cols-2 md:gap-16">
          <div className="rule-t pt-6">
            <h2 className="t-subhead">{WHAT.title}</h2>
            <p className="prose mt-4 max-w-[46ch]">{WHAT.text}</p>
          </div>
          <div className="rule-t pt-6">
            <h2 className="t-subhead">{WHY.title}</h2>
            <p className="prose mt-4 max-w-[46ch]">{WHY.text}</p>
          </div>
        </div>
      </section>

      {/* =========================================================
          WHAT WE BELIEVE — the statement of faith, in their words. The
          two paragraphs in one column across the full shell (Drew, Sept
          4), then the four convictions as a litany: one ruled row each,
          the adjective in display type beside its "Therefore".
          ========================================================= */}
      <section
        id="beliefs"
        aria-labelledby="beliefs-title"
        className="field-stock band"
      >
        <div className="shell">
          <h2
            id="beliefs-title"
            className="f-display t-section max-w-[12ch]"
          >
            What we believe
          </h2>
          <div className="prose mt-10 md:mt-12">
            {BELIEFS.intro.map((para) => (
              <p key={para.slice(0, 40)}>{para}</p>
            ))}
          </div>
          <ul className="mt-14 md:mt-20">
            {BELIEFS.worship.map((w) => {
              const { stem, word } = splitConviction(w.we);
              return (
                <li
                  key={w.we}
                  className="rule-t grid gap-5 py-8 md:py-10 lg:grid-cols-12 lg:gap-16"
                >
                  <p className="lg:col-span-5">
                    {stem && (
                      <span className="muted block text-[1.0625rem] leading-snug">
                        {stem}
                      </span>
                    )}
                    <span className="f-display t-section mt-3 block">
                      {word}
                      {stem && "."}
                    </span>
                  </p>
                  <p className="prose lg:col-span-6 lg:col-start-7 lg:pt-2">
                    <span className="t-eyebrow mr-3 text-red">Therefore</span>
                    {w.therefore}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* =========================================================
          MEET OUR PASTOR — his bio as they wrote it in the reading
          column. The rail carries the three plants he dates himself,
          then a portrait of Dave and Lynette at column width, and
          Phil. 1:21 at the foot beside the paragraph that quotes it.
          ========================================================= */}
      <section
        id="pastor"
        aria-labelledby="pastor-title"
        className="field-salt band"
      >
        <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <p className="t-eyebrow text-red">Meet our pastor</p>
            <h2
              id="pastor-title"
              className="f-display t-section mt-5 max-w-[12ch]"
            >
              {PASTOR.name}
            </h2>
            <div className="prose measure mt-10 md:mt-12">
              {PASTOR.paragraphs.map((para) => (
                <p key={para.slice(0, 40)}>{para}</p>
              ))}
            </div>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 lg:flex lg:flex-col">
            <h3 className="t-card">Where he has served</h3>
            <dl className="mt-5">
              {MILESTONES.map((m) => (
                <div
                  key={m.year}
                  className="rule-t grid grid-cols-[5rem_1fr] gap-4 py-4"
                >
                  <dt className="f-data text-[1.375rem] leading-none">
                    {m.year}
                  </dt>
                  <dd className="text-[1rem] leading-snug">{m.text}</dd>
                </div>
              ))}
            </dl>
            {/* PLACEHOLDER: the screenprinted couple until the staff photos
                arrive; then this is Dave and Lynette, with a real alt. */}
            <div className="relative mt-10 aspect-[2/3] overflow-hidden border border-ink">
              <Image
                src="/staff/couple.webp"
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 30vw"
                className="object-cover object-top"
              />
            </div>
            <Verse reference="Philippians 1:21" className="mt-10 lg:mt-auto lg:pt-10" />
          </div>
        </div>
      </section>

      {/* =========================================================
          MEET OUR TEAM — a ruled roster: a portrait plate, the couple's
          names in the display face, their blurb beside. Photos are being
          replaced, so the plate carries the placeholder for now.
          "Connect with us" closes the roster as one more ruled row.
          ========================================================= */}
      <section
        id="team"
        aria-labelledby="team-title"
        className="field-stock band"
      >
        <div className="shell">
          <h2 id="team-title" className="f-display t-section max-w-[12ch]">
            Meet our team
          </h2>
          <ul className="mt-12 md:mt-14">
            {TEAM.map((person) => (
              <li
                key={person.names}
                className="rule-t grid grid-cols-[7.5rem_1fr] gap-x-5 gap-y-3 py-7 md:grid-cols-[10rem_1fr] md:gap-x-8 md:py-8 lg:grid-cols-[14rem_1fr_2fr] lg:gap-16"
              >
                <div className="relative row-span-2 aspect-[2/3] overflow-hidden border border-ink lg:row-span-1">
                  <Image
                    src={`/staff/${person.portrait}.webp`}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 7.5rem, (max-width: 1024px) 10rem, 14rem"
                    className="object-cover object-top"
                  />
                </div>
                <h3 className="f-display text-[clamp(1.5rem,2.2vw,1.875rem)] leading-[1.05] tracking-[-0.02em]">
                  {person.names}
                </h3>
                <p className="max-w-[58ch] text-[1.0625rem] leading-[1.6]">
                  {person.text}
                </p>
              </li>
            ))}
          </ul>

          <section
            aria-labelledby="reach-title"
            className="rule-t mt-4 grid gap-8 pt-8 md:pt-10 lg:grid-cols-12 lg:gap-16"
          >
            <div className="lg:col-span-4">
              <h2 id="reach-title" className="t-subhead">
                Connect with us
              </h2>
              <p className="muted mt-3 text-[1.0625rem]">
                We&rsquo;d love to hear from you
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:col-span-7 lg:col-start-6">
              <p>
                <a
                  href={`mailto:${CHURCH.email}`}
                  className="link-inline text-[1.0625rem]"
                >
                  {CHURCH.email}
                </a>
                <br />
                <a
                  href={CHURCH.phoneHref}
                  className="f-data mt-3 inline-block text-[1.5rem] leading-none"
                >
                  {CHURCH.phone}
                </a>
              </p>
              <div className="flex flex-col items-start gap-4">
                <Link href="/connect" className="link-rule">
                  Prayer, serving and the directory
                </Link>
                <Link href="/about/who-we-support" className="link-rule">
                  Ministries we support
                </Link>
              </div>
            </div>
          </section>
        </div>
      </section>

      {/* The roster above is stock, so the close is salt: the band never
          shares a field with the section above it. */}
      <CTABand />
    </main>
  );
}
