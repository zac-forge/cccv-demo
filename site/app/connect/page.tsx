import type { Metadata } from "next";
import CTABand from "@/components/CTABand";
import PageHeader from "@/components/PageHeader";
import Verse from "@/components/Verse";
import { CHURCH } from "@/lib/site";

/* ------------------------------------------------------------------
   Contact, prayer, stay in touch, serve, directory: five of their pages
   folded into one. Copy is theirs — /home (Pastor Dave's welcome and
   number), /prayer, /stay-in-touch, /serve, /stay-in-touch/cccv-directory
   — tightened by deletion only. Their "Tuedays" is corrected. Section
   headings and link labels are mine.

   Their sign-up forms (serve, directory) currently fail to load on the
   live site ("He must enable SSL"). Whether they come back through
   Amplify or a Worker is open (docs/01-build-plan.md §5); until then
   each section points at a person, which is what the forms did anyway.
   ------------------------------------------------------------------ */

export const metadata: Metadata = {
  title: "Connect",
  // Pastor Dave, /home.
  description:
    "Prayer, serving, the church directory and how to reach Pastor Dave at Calvary Chapel Conejo Valley. We count it a blessing and a privilege to serve each and every one of you.",
  alternates: { canonical: "/connect" },
};

/* One entry in the directory: heading on the left, content on the right,
   a rule between entries. The id is what the rest of the site links to. */
function Entry({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="rule-t grid gap-6 py-12 md:py-16 lg:grid-cols-12 lg:gap-16"
    >
      <h2
        id={`${id}-title`}
        className="f-display text-[clamp(1.875rem,3vw,2.75rem)] leading-[1] tracking-[-0.025em] lg:col-span-4"
      >
        {title}
      </h2>
      <div className="lg:col-span-8 lg:col-start-5">{children}</div>
    </section>
  );
}

export default function Connect() {
  return (
    <main id="main">
      <PageHeader
        trail={[{ label: "Connect", href: "/connect" }]}
        title="Connect"
        lede={
          <p>
            We count it a blessing and a privilege to serve each and every one
            of you.
          </p>
        }
      />

      <div className="field-stock">
        <div className="shell pb-[clamp(3rem,5vw,4rem)]">
          <Entry id="prayer" title="Prayer">
            <div className="prose measure">
              <p>
                Please feel free to call me with any questions or concerns, and
                text me your prayer requests as I want to continue to intercede
                for you all.
              </p>
            </div>
            <p className="mt-6">
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

            <div className="prose measure mt-12">
              <h3 className="t-subhead">Join us for prayer</h3>
              <p className="mt-4">
                Sundays 9 AM &amp; Tuesdays at 6 pm. We are praying via phone and
                in person on Sundays, and on the phone on Tuesdays.
              </p>
            </div>
            <a
              href={CHURCH.prayerZoom}
              target="_blank"
              rel="noopener"
              className="link-rule mt-6"
            >
              Join the prayer call on Zoom
            </a>
          </Entry>

          <Entry id="stay-in-touch" title="Stay in the loop">
            <div className="prose measure">
              <p>
                Start receiving info about all our upcoming events by text and
                email.
              </p>
            </div>
            {/* Their Flocknote keyword and number, /stay-in-touch. */}
            <p className="mt-8">
              <span className="t-eyebrow block text-red">Text</span>
              <span className="f-data mt-2 block text-[clamp(1.75rem,3vw,2.5rem)] leading-none">
                amenpastor
              </span>
              <span className="t-eyebrow mt-5 block text-red">To</span>
              <a
                href={`sms:84576&body=${encodeURIComponent("amenpastor")}`}
                className="f-data mt-2 inline-block text-[clamp(1.75rem,3vw,2.5rem)] leading-none"
              >
                84576
              </a>
            </p>
            <ol className="prose measure mt-8 list-decimal space-y-3 pl-5 text-[1rem] leading-relaxed marker:text-red">
              <li>
                In the message box type &ldquo;amenpastor&rdquo; — make sure
                there are NO SPACES.
              </li>
              <li>
                You&rsquo;ll receive a text from &ldquo;Calvary Chapel Conejo
                Valley.&rdquo; Click the blue sign-up link.
              </li>
              <li>
                Enter your &ldquo;First Name&rdquo; &ldquo;Last Name&rdquo;
                &ldquo;Email&rdquo; &amp; &ldquo;Phone&rdquo; if asked, then
                Click &ldquo;Save&rdquo;. You can select a ministry and click
                &ldquo;Next&rdquo; or to just join the general church alerts
                just click &ldquo;Next&rdquo;.
              </li>
              <li>
                Please check the email you used to sign-up, as sometimes you
                will get a verification email (it can take up to 5 minutes to
                receive). Just follow the simple verification process in your
                email.
              </li>
            </ol>
          </Entry>

          <Entry id="serve" title="Serve">
            <Verse reference="Mark 9:35" layout="quote" />
            <div className="prose measure mt-10">
              <h3 className="t-subhead">Current serving opportunities</h3>
            </div>
            {/* Names and roles are theirs, /serve. */}
            <dl className="mt-6 grid gap-x-10 gap-y-5 sm:grid-cols-2">
              {CHURCH.serve.map((row) => (
                <div key={row.area} className="rule-t pt-4">
                  <dt className="t-card">{row.area}</dt>
                  <dd className="muted mt-1.5 text-[0.9375rem]">
                    Contact {row.contact}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="prose measure mt-8">
              <p>
                Please sign up below as well for other opportunities not listed
                above. Thank you and God Bless!
              </p>
            </div>
            {/* PLACEHOLDER: their sign-up form is down on the live site and
                its replacement (Amplify or a Worker) is undecided. Until
                then, a person. */}
            <a href={CHURCH.phoneHref} className="link-rule mt-6">
              Call Pastor Dave about serving
            </a>
          </Entry>

          <Entry id="directory" title="Church directory">
            <div className="prose measure">
              <p>
                At CCCV, we value the importance of connection and fellowship
                within our church community. One way we foster this is through
                our church directory. If you would like to be included, please
                complete and submit the form below.
              </p>
              <p>
                After submitting your information, please don&rsquo;t forget to
                also provide a photo. If you are part of a family unit, we
                kindly ask that you submit a family photo.
              </p>
              <p>
                You can submit the photos either by email or via google drive,
                please label your photo with your family name.
              </p>
            </div>
            {/* PLACEHOLDER: the request-to-be-added form, same open question
                as Serve. The two photo routes are theirs and work today. */}
            <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row">
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
          </Entry>

          <Entry id="contact" title="Find us">
            <p className="f-data text-[clamp(1.5rem,2.6vw,2.25rem)] leading-tight">
              {CHURCH.address.street}
              <br />
              {CHURCH.address.city}, {CHURCH.address.state} {CHURCH.address.zip}
            </p>
            <p className="mt-6">
              <a href={CHURCH.phoneHref} className="f-data inline-block text-[1.5rem] leading-none md:text-[1.75rem]">
                {CHURCH.phone}
              </a>
              <br />
              <a href={`mailto:${CHURCH.email}`} className="link-inline mt-3 inline-block text-[1.0625rem]">
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
          </Entry>
        </div>
      </div>

      <CTABand />
    </main>
  );
}
