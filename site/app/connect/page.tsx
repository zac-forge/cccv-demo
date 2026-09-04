import type { Metadata } from "next";
import Image from "next/image";
import ActionDetailSection from "@/components/ActionDetailSection";
import Breadcrumb from "@/components/Breadcrumb";
import CTABand from "@/components/CTABand";
import PosterArt from "@/components/PosterArt";
import SectionIndex from "@/components/SectionIndex";
import StepSequence from "@/components/StepSequence";
import Verse from "@/components/Verse";
import { CHURCH } from "@/lib/site";

/* ------------------------------------------------------------------
   Contact, prayer, stay in touch, serve, directory: five of their pages
   folded into one hub. Copy is theirs — /home (Pastor Dave's welcome
   and number), /prayer, /stay-in-touch, /serve,
   /stay-in-touch/cccv-directory — tightened by deletion only. Their
   "Tuedays" is corrected. Section labels, the prayer headline, step
   titles and link labels are mine; CONTENT-SOURCES.md §10.

   Five jobs, five compositions, so it never reads as one column and
   never as one component repeated: a contents strip, an editorial split
   (pastoral), an action band (functional), a pull quote over a plain
   list (inspirational), a numbered process (procedural), a map beside
   the address (spatial). Numerals appear only on the directory steps,
   which are the one real sequence.

   The page opens on Pastor Dave's sentence (Drew, September 4): "We
   count it a blessing and a privilege to serve each and every one of
   you" at feature size is the hero, with Connect as a running head
   above it and the two actions beneath. The sunburst hangs behind with
   the whole disc showing; an earlier poster header clipped it under
   the site header and floated the number mid-page.

   Their sign-up forms (serve, directory) currently fail to load on the
   live site ("He must enable SSL"). Whether they come back through
   Amplify or a Worker is open (docs/01-build-plan.md §5); until then
   each section points at a person, which is what the forms did anyway.
   ------------------------------------------------------------------ */

export const metadata: Metadata = {
  title: "Connect",
  // Pastor Dave, /home.
  description:
    "Prayer, serving, the church directory, and how to reach Pastor Dave at Calvary Chapel Conejo Valley.",
  alternates: { canonical: "/connect" },
};

/* The ids are what the rest of the site links to. Order is the page. */
const SECTIONS = [
  { id: "prayer", label: "Prayer" },
  { id: "stay-in-touch", label: "Stay in touch" },
  { id: "serve", label: "Serve" },
  { id: "directory", label: "Directory" },
  { id: "contact", label: "Find us" },
] as const;

const KEYWORD = "amenpastor";
const SHORTCODE = "84576";

/* One row of a detail rail: the printed-schedule shape Facts uses,
   with room for a link or a second line in the value. */
function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rule-t grid grid-cols-[6rem_1fr] gap-4 py-4 sm:grid-cols-[7rem_1fr]">
      <dt className="t-eyebrow pt-1 text-red">{label}</dt>
      <dd className="text-[1.0625rem] leading-snug">{children}</dd>
    </div>
  );
}

export default function Connect() {
  return (
    <main id="main">
      <header className="field-blue page-header-poster relative isolate overflow-hidden">
        <PosterArt art="rays" sun />
        <div className="shell relative">
          <Breadcrumb trail={[{ label: "Connect", href: "/connect" }]} />
          <p className="t-eyebrow mt-9 text-[color:var(--color-yellow-onblue)] md:mt-12">
            Connect
          </p>
          <h1 className="f-display t-feature mt-5 max-w-[24ch]">
            We count it a blessing and a privilege to serve each and every one
            of you.
          </h1>
          <div className="mt-9 flex flex-col items-start gap-3 sm:flex-row md:mt-10">
            <a href={CHURCH.smsHref} className="btn btn-sun">
              Text a prayer request
            </a>
            <a href={CHURCH.phoneHref} className="btn btn-outline">
              Call {CHURCH.phone}
            </a>
          </div>
        </div>
      </header>

      {/* =========================================================
          PRAYER — the ask and the number on the left, the prayer
          schedule as a rail on the right.
          ========================================================= */}
      <div className="field-stock">
        <div className="shell">
          <SectionIndex items={SECTIONS} />

          <ActionDetailSection
            id="prayer"
            label="Prayer"
            title="How can we pray for you?"
            detailTitle="Join us for prayer"
            className="py-14 md:py-20"
            detail={
              // Their /prayer: "Sundays 9 AM & Tuesdays at 6 pm. We are
              // praying via phone and in person on Sundays, and on the
              // phone on Tuesdays." Set as a schedule.
              <dl>
                <Row label="Sundays">
                  <span className="f-data text-[1.375rem] leading-none">9 AM</span>
                  <span className="muted mt-1.5 block text-[0.9375rem]">
                    By phone and in person
                  </span>
                </Row>
                <Row label="Tuesdays">
                  <span className="f-data text-[1.375rem] leading-none">6 PM</span>
                  <span className="muted mt-1.5 block text-[0.9375rem]">By phone</span>
                </Row>
                <Row label="Zoom">
                  <a
                    href={CHURCH.prayerZoom}
                    target="_blank"
                    rel="noopener"
                    className="link-inline"
                  >
                    Join the prayer call
                  </a>
                </Row>
              </dl>
            }
          >
            <div className="prose measure mt-7">
              <p>
                Please feel free to call me with any questions or concerns, and
                text me your prayer requests as I want to continue to intercede
                for you all.
              </p>
            </div>
            <p className="mt-8">
              <span className="t-eyebrow block text-red">Pastor Dave</span>
              <a
                href={CHURCH.phoneHref}
                className="f-data mt-2 inline-block text-[1.75rem] leading-none md:text-[2.25rem]"
              >
                {CHURCH.phone}
              </a>
            </p>
            <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row">
              <a href={CHURCH.smsHref} className="btn btn-ink">
                Text a prayer request
              </a>
              <a href={CHURCH.phoneHref} className="btn btn-outline">
                Call
              </a>
            </div>
          </ActionDetailSection>
        </div>
      </div>

      {/* =========================================================
          STAY IN THE LOOP — the keyword is the object. Their Flocknote
          keyword and number, /stay-in-touch. The four sign-up steps
          stay in view as secondary copy, condensed (CONTENT-SOURCES §10).
          ========================================================= */}
      <section
        id="stay-in-touch"
        aria-labelledby="stay-in-touch-title"
        className="field-blue py-[clamp(4rem,7vw,6.5rem)]"
      >
        <div className="shell grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="lg:col-span-7">
            <p className="t-eyebrow text-[color:var(--color-yellow-onblue)]">
              Stay in touch
            </p>
            <h2 id="stay-in-touch-title" className="mt-6">
              <span className="t-eyebrow muted block">Text</span>{" "}
              <a
                href={`sms:${SHORTCODE}&body=${encodeURIComponent(KEYWORD)}`}
                className="mt-2 block"
              >
                <span className="f-data block text-[clamp(2.75rem,7.5vw,5.5rem)] leading-[0.95]">
                  {KEYWORD}
                </span>{" "}
                <span className="f-data mt-3 block text-[clamp(1.5rem,3vw,2.25rem)] leading-none">
                  to {SHORTCODE}
                </span>
              </a>
            </h2>
            <p className="t-lede muted measure-tight mt-8">
              Receive upcoming events and church updates by text and email.
            </p>
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <h3 className="t-eyebrow text-[color:var(--color-yellow-onblue)]">
              First time? Here&rsquo;s what happens
            </h3>
            <ol className="rule-t mt-3 max-w-[36ch] list-decimal space-y-2.5 pl-5 pt-4 text-[0.9375rem] leading-snug marker:text-[color:var(--color-yellow-onblue)]">
              <li>
                Type &ldquo;{KEYWORD}&rdquo; in the message box, with no
                spaces.
              </li>
              <li>
                You&rsquo;ll receive a text from &ldquo;Calvary Chapel Conejo
                Valley.&rdquo; Click the blue sign-up link.
              </li>
              <li>
                Enter your name, email and phone if asked, then click Save.
                Pick a ministry, or click Next to join the general church
                alerts.
              </li>
              <li>
                Check the email you signed up with for a verification message.
                It can take up to 5 minutes.
              </li>
            </ol>
          </div>
        </div>
      </section>

      <div className="field-stock">
        <div className="shell">
          {/* =========================================================
              SERVE — Mark 9:35 opens it as a pull quote and is the
              moment; the needs are a plain ruled list under a small
              head; the wider ask is a second route. Names and roles are
              theirs, /serve; the head is Drew's.
              ========================================================= */}
          <section
            id="serve"
            aria-labelledby="serve-title"
            className="py-14 md:py-20"
          >
            <p className="t-eyebrow text-red">Serve</p>
            <Verse
              reference="Mark 9:35"
              layout="pull"
              className="mt-7 max-w-[42rem]"
            />

            <h2 id="serve-title" className="t-subhead mt-14 md:mt-20">
              Current serving needs
            </h2>
            <dl className="mt-6 grid md:grid-cols-2 md:gap-x-16">
              {CHURCH.serve.map((row) => (
                <div key={row.area} className="rule-t py-5 md:py-6">
                  <dt className="t-card">{row.area}</dt>
                  <dd className="muted mt-1.5 text-[1rem] leading-snug">
                    {row.contact}
                  </dd>
                </div>
              ))}
            </dl>

            {/* PLACEHOLDER: their sign-up form is down on the live site and
                its replacement (Amplify or a Worker) is undecided. Until
                then, a person. */}
            <div className="rule-t grid gap-6 pt-8 md:pt-10 lg:grid-cols-12 lg:gap-16">
              <div className="prose measure lg:col-span-7">
                <p>
                  Please sign up as well for other opportunities not listed
                  above. Thank you and God Bless!
                </p>
              </div>
              <div className="lg:col-span-4 lg:col-start-9 lg:pt-2">
                <a href={CHURCH.phoneHref} className="link-rule">
                  Call Pastor Dave about serving
                </a>
              </div>
            </div>
          </section>

          {/* =========================================================
              DIRECTORY — their three instructions as three steps, the
              page's one numbered treatment, because these are the one
              real sequence. The two photo routes beneath.
              /stay-in-touch/cccv-directory.
              ========================================================= */}
          <section
            id="directory"
            aria-labelledby="directory-title"
            className="rule-t py-14 md:py-20"
          >
            <div className="grid gap-8 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-7">
                <p className="t-eyebrow text-red">Directory</p>
                <h2
                  id="directory-title"
                  className="f-display t-section mt-5 max-w-[12ch]"
                >
                  Church directory
                </h2>
                <div className="prose measure mt-7">
                  <p>
                    At CCCV, we value the importance of connection and
                    fellowship within our church community. One way we foster
                    this is through our church directory.
                  </p>
                </div>
              </div>
            </div>

            {/* PLACEHOLDER: step one names their request-to-be-added form,
                which is down; same open question as Serve. The two photo
                routes are theirs and work today. */}
            <StepSequence
              className="mt-12 md:mt-16"
              steps={[
                {
                  title: "Submit your information",
                  body: (
                    <p>
                      If you would like to be included, please complete and
                      submit the form.
                    </p>
                  ),
                },
                {
                  title: "Send a personal or family photo",
                  body: (
                    <p>
                      After submitting your information, please don&rsquo;t
                      forget to also provide a photo. If you are part of a
                      family unit, we kindly ask that you submit a family
                      photo.
                    </p>
                  ),
                },
                {
                  title: "Label the photo with your family name",
                  body: (
                    <p>
                      You can submit the photos either by email or via Google
                      Drive.
                    </p>
                  ),
                },
              ]}
            />
            <div className="rule-t grid gap-4 pt-8 md:pt-10 lg:grid-cols-12 lg:gap-16">
              <div className="flex flex-col items-start gap-3 sm:flex-row lg:col-span-8 lg:col-start-3">
                <a href={`mailto:${CHURCH.directoryEmail}`} className="btn btn-ink">
                  Email your photo
                </a>
                <a
                  href={CHURCH.directoryDrive}
                  target="_blank"
                  rel="noopener"
                  className="btn btn-outline"
                >
                  Upload to the CCCV Drive
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* =========================================================
          FIND US — the address beside the campus map, the same
          plate /new uses. The map is a drawing; the directions button
          is what gets someone there.
          ========================================================= */}
      <section
        id="contact"
        aria-labelledby="contact-title"
        className="field-salt band"
      >
        <div className="shell grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="t-eyebrow text-red">Find us</p>
            <h2
              id="contact-title"
              className="f-data mt-6 text-[clamp(1.75rem,2.8vw,2.5rem)] leading-tight"
            >
              {CHURCH.address.street}
              <br />
              {CHURCH.address.city}, {CHURCH.address.state} {CHURCH.address.zip}
            </h2>
            <p className="mt-7">
              <a
                href={CHURCH.phoneHref}
                className="f-data inline-block text-[1.5rem] leading-none md:text-[1.75rem]"
              >
                {CHURCH.phone}
              </a>
              <br />
              <a
                href={`mailto:${CHURCH.email}`}
                className="link-inline mt-3 inline-block text-[1.0625rem]"
              >
                {CHURCH.email}
              </a>
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

          <div className="relative order-first aspect-[3/2] overflow-hidden border border-ink lg:order-none lg:col-span-7">
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

      {/* Find Us above is salt, so the close goes stock: the band must
          never share a field with the section above it. */}
      <CTABand field="field-stock" />
    </main>
  );
}
