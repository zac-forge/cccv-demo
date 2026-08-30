import Image from "next/image";
import Header from "./Header";
import SermonPlayer from "./SermonPlayer";
import {
  EVENTS,
  FOOTER_LINKS,
  MINISTRIES,
  SERMON,
  SUNDAY_STEPS,
  TIMES,
} from "./content";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70] focus:bg-ink focus:px-4 focus:py-3 focus:text-salt"
      >
        Skip to content
      </a>

      <div id="top" />
      <Header />

      <main id="main">
        {/* =========================================================
            HERO — poster. The artwork puts the sun and its rays in
            the upper right, so mark and headline take the flat navy
            at upper left and run wider than any column would allow.
            ========================================================= */}
        <section className="field-ink relative isolate -mt-[68px] flex min-h-[max(600px,92svh)] items-end overflow-hidden pb-16 pt-[68px] md:-mt-[96px] md:min-h-[max(680px,92vh)] md:items-center md:pb-14 md:pt-[96px]">
          <Image
            src="/site/hero.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="hero-img -z-20 scale-105 object-cover"
          />
          <div className="hero-scrim absolute inset-0 -z-10" aria-hidden="true" />
          <div
            className="hero-topscrim absolute inset-x-0 top-0 -z-10 h-[228px]"
            aria-hidden="true"
          />

          {/* Not a centred container: the block is pinned left and the
              headline is allowed to run past the mark above it. */}
          <div className="w-full max-w-[1320px] px-[clamp(24px,5vw,64px)] md:mx-auto">
            <img
              id="hero-sentinel"
              src="/logotype-white-trim.svg"
              alt="Calvary Chapel Conejo Valley"
              width={1601}
              height={611}
              className="h-auto w-[60vw] max-w-[300px] md:w-[30vw] md:max-w-[420px]"
            />

            {/* Their own words: "Faith Comes By Hearing" is the title of
                their daily radio broadcast (/radio). */}
            <h1 className="f-display t-hero mt-7 max-w-[8ch] md:mt-24 md:max-w-[11ch]">
              Faith comes by hearing.
            </h1>

            <div className="mt-9 flex flex-col gap-9 md:mt-12 md:flex-row md:items-end md:gap-16">
              {/* Romans 10:17, NKJV — the translation their site quotes.
                  Verbatim, not fitted to the layout. */}
              <figure className="max-w-[34ch] border-l-2 border-yellow pl-5">
                <blockquote className="t-lede muted">
                  &ldquo;So then faith comes by hearing, and hearing by the word
                  of God.&rdquo;
                </blockquote>
                <figcaption className="t-eyebrow mt-3 text-yellow">
                  Romans 10:17
                </figcaption>
              </figure>

              <div className="flex flex-col gap-3 sm:flex-row md:pb-1">
                <a href="#new-here" className="btn btn-sun">
                  Plan your visit
                </a>
                <a href="#message" className="btn btn-outline">
                  Watch a message
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            SERVICE TIMES — flat blue information band. Printed on the
            back of the bulletin, not four cards.
            ========================================================= */}
        <section
          aria-label="Service times and location"
          className="field-blue band-sm relative"
        >
          {/* Their own location, set vertically in the band's outer
              margin. Desktop only — narrower widths have no margin to
              put it in. */}
          <span
            aria-hidden="true"
            className="edge-note right-[clamp(10px,1.5vw,24px)] top-1/2 hidden -translate-y-1/2 lg:block"
          >
            Thousand Oaks &middot; California
          </span>

          <div className="shell">
            <dl className="grid grid-cols-1 sm:-mx-8 sm:grid-cols-2 lg:grid-cols-4">
              {TIMES.map((cell) => (
                <div
                  key={cell.label}
                  className="border-t border-[color:var(--rule)] py-8 sm:px-8 sm:[&:nth-child(even)]:border-l lg:[&:not(:first-child)]:border-l"
                >
                  <dt className="t-eyebrow text-yellow">{cell.label}</dt>
                  <dd className="mt-4">
                    <p className="f-data t-times">{cell.value}</p>
                    <p className="muted mt-3 max-w-[26ch] text-[0.9375rem] leading-snug">
                      {cell.detail}
                    </p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* =========================================================
            NEW HERE — editorial. Oversized ghosted numerals, printed
            rules instead of boxes, illustration bleeding off the edge.
            ========================================================= */}
        <section
          id="new-here"
          className="field-stock band relative isolate overflow-hidden"
        >
          {/* Environmental type, not a heading: cropped by the left and
              bottom edges and sitting behind the numbered steps. */}
          <span
            aria-hidden="true"
            className="ghost-word ghost-on-stock f-display bottom-[-2rem] left-[-4vw] hidden text-[clamp(9rem,17vw,18rem)] md:block"
          >
            Sunday
          </span>

          <div className="shell">
            <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
              <div className="lg:col-span-5">
                <p className="t-eyebrow text-red">New here</p>
                <h2 className="f-display t-section mt-5 max-w-[13ch]">
                  What a Sunday looks like
                </h2>
                <a href="#connect" className="link-rule mt-8">
                  Plan your visit
                </a>
              </div>

              {/* Bleeds past the container on the right rather than
                  sitting in it as a thumbnail. */}
              <div className="relative lg:col-span-7 lg:-ml-8 lg:mr-[calc(50%-50vw)]">
                <div className="relative aspect-[16/10] w-full border border-ink lg:aspect-auto lg:h-[26rem]">
                  <Image
                    src="/ministries/01-foundations-alt.png"
                    alt="Screenprinted illustration of an open Bible, a pencil and reading glasses on a wooden table"
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            <ol className="mt-16 grid grid-cols-1 md:mt-20 md:grid-cols-2">
              {SUNDAY_STEPS.map((step, i) => (
                <li
                  key={step.title}
                  className={[
                    "rule-t relative overflow-hidden py-9 md:py-12",
                    i % 2 === 0
                      ? "md:pr-14"
                      : "md:pl-14 md:border-l md:border-[color:var(--rule)]",
                  ].join(" ")}
                >
                  <span
                    aria-hidden="true"
                    className="f-display t-numeral numeral-ghost pointer-events-none absolute -top-3 right-0 md:right-4"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="relative">
                    <h3 className="t-card">{step.title}</h3>
                    <p className="measure muted mt-3">
                      {step.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* =========================================================
            LATEST MESSAGE — the teaching is what this church is for,
            so it gets a feature split, not a content module.
            ========================================================= */}
        <section id="message" className="field-ink relative isolate overflow-hidden">
          <Image
            src="/site/sunwave.png"
            alt=""
            fill
            sizes="100vw"
            className="-z-20 scale-[1.08] object-cover object-[center_34%]"
          />
          <div className="absolute inset-0 -z-10 bg-ink/[0.88]" aria-hidden="true" />

          <div className="band-lg shell grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="relative lg:col-span-7">
              <SermonPlayer videoId={SERMON.videoId} title={SERMON.title} />

              {/* Their own words: the book is SERMON.passage, the line
                  below it is SERMON.tags[1]. Nothing invented. */}
              <span
                aria-hidden="true"
                className="mark-slug -bottom-4 left-5 sm:left-6"
              >
                <span className="block">Luke</span>
                <span className="block">Verse by verse</span>
              </span>
            </div>

            <div className="lg:col-span-5">
              <p className="t-eyebrow text-yellow">Latest message</p>

              {/* Title, passage and series are the church's own, from the
                  video on their YouTube channel. */}
              <h2 className="f-display t-feature mt-5">{SERMON.title}</h2>
              <p className="f-data mt-5 text-[1.375rem] md:text-[1.625rem]">
                {SERMON.passage}
              </p>

              {/* Small print, not interface pills. */}
              <p className="t-meta muted mt-4">{SERMON.tags.join(" · ")}</p>

              {/* Verbatim from /sermons. */}
              <p className="muted measure mt-7">
                We&rsquo;re always adding to our online library from Pastor
                Dave&rsquo;s previous teachings, so if you&rsquo;re looking for a
                particular book, check back in a bit.
              </p>

              <a href="#" className="link-rule mt-8">
                Browse recent teachings
              </a>
            </div>
          </div>
        </section>

        {/* =========================================================
            MINISTRIES — a set of screenprinted handbills. Panels vary
            in width, crop and field; type and spacing do not.
            ========================================================= */}
        <section
          id="ministries"
          className="field-salt band relative isolate overflow-hidden"
        >
          <span
            aria-hidden="true"
            className="ghost-word ghost-on-salt f-display right-[-5vw] top-[42%] hidden text-[clamp(10rem,20vw,22rem)] lg:block"
          >
            Ministries
          </span>

          <div className="shell">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="t-eyebrow text-red">Ministries</p>
                <h2 className="f-display t-section mt-5 max-w-[14ch]">
                  Somewhere to grow, whoever you are
                </h2>
              </div>
              <p className="muted max-w-[30ch] text-[0.9375rem]">
                Eight studies and fellowships, meeting through the week on
                campus.
              </p>
            </div>

            <ul className="mt-14 grid grid-cols-2 gap-5 md:mt-16 lg:grid-cols-12 lg:gap-6">
              {MINISTRIES.map((m) => (
                <li
                  key={m.slug}
                  className={
                    m.wide
                      ? "col-span-2 lg:col-span-6"
                      : "col-span-1 lg:col-span-3"
                  }
                >
                  <article className={`${m.field} h-full border border-ink`}>
                    <div
                      className="relative w-full border-b border-ink"
                      style={{ aspectRatio: m.ratio }}
                    >
                      <Image
                        src={`/ministries/${m.slug}.png`}
                        alt=""
                        fill
                        sizes="(max-width: 1024px) 50vw, 40vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="p-5 lg:p-6">
                      <h3 className="t-card">{m.name}</h3>
                      <p className="muted mt-3 text-[0.9375rem] leading-snug">
                        {m.blurb}
                      </p>
                      <p className="t-meta mt-5">{m.meta}</p>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* =========================================================
            EVENTS — bulletin announcements. The date is the graphic.
            Yellow carries ink type at 8.15, so the field is legible
            and red stays a hairline accent.
            ========================================================= */}
        <section id="events" className="field-yellow band">
          <div className="shell">
            <p className="t-eyebrow">Events</p>
            <h2 className="f-display t-section mt-5">What&rsquo;s coming up</h2>

            <ul className="mt-14 md:mt-16">
              {EVENTS.map((e) => (
                <li
                  key={e.name}
                  className="rule-t last:border-b last:border-[color:var(--rule)]"
                >
                  <a
                    href="#"
                    className="grid grid-cols-[5rem_1fr] items-baseline gap-x-6 py-8 sm:grid-cols-[11rem_1fr] sm:gap-x-10 md:py-10"
                  >
                    <span aria-hidden="true" className="f-data t-date">
                      {e.day ? (
                        <>
                          <span className="t-eyebrow block">
                            {e.month}
                          </span>
                          {e.day}
                        </>
                      ) : (
                        <span className="block text-[2rem] leading-none sm:text-[3.25rem]">
                          {e.month}
                        </span>
                      )}
                    </span>
                    <span>
                      <span className="f-data block text-[1.375rem] leading-tight md:text-[1.75rem]">
                        {e.name}
                      </span>
                      <span className="muted mt-2 block text-[0.9375rem] md:text-base">
                        {e.detail}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* =========================================================
            COME AND SEE — the close. Pastor Dave's own words, and the
            dove leaving the pier cropped hard off the right edge.
            ========================================================= */}
        <section id="connect" className="field-stock relative overflow-hidden">
          <div className="shell band-lg grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <h2 className="f-display t-feature max-w-[10ch]">
                Come and see.
              </h2>
              <p className="t-lede measure-tight mt-9">
                We count it a blessing and a privilege to serve each and every
                one of you. Please feel free to call me with any questions or
                concerns, and text me your prayer requests.
              </p>

              <p className="mt-10">
                <span className="t-eyebrow block text-red">Pastor Dave</span>
                <a
                  href="#"
                  className="f-data mt-2 inline-block text-[1.75rem] leading-none md:text-[2.25rem]"
                >
                  (831) 428-2214
                </a>
              </p>

              <div className="mt-12 flex flex-col gap-3 sm:flex-row">
                <a href="#new-here" className="btn btn-ink">
                  Plan your visit
                </a>
                <a href="#" className="btn btn-outline">
                  Send a prayer request
                </a>
              </div>
            </div>
          </div>

          {/* Cropped past the section on the right and taller than it,
              so it reads as a plate the page runs over. */}
          <div
            aria-hidden="true"
            className="relative mx-6 mb-16 aspect-[4/3] border border-ink lg:absolute lg:inset-y-0 lg:right-0 lg:mx-0 lg:mb-0 lg:aspect-auto lg:w-[42vw] lg:border-y-0 lg:border-r-0"
          >
            <Image
              src="/site/dovedeck.png"
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover object-[60%_center]"
            />
          </div>
        </section>
      </main>

      {/* ===========================================================
          FOOTER — the back of a printed programme. One graphic
          device: the dove, outline only, blue showing through it.
          =========================================================== */}
      <footer id="about" className="field-blue relative overflow-hidden py-20 md:py-24">
        <img
          src="/dove-salt.svg"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute -right-10 top-6 w-[300px] opacity-[0.14] md:-right-8 md:top-10 md:w-[460px]"
        />

        <div className="shell relative">
          <img
            src="/logotype-white-trim.svg"
            alt="Calvary Chapel Conejo Valley"
            width={1601}
            height={611}
            className="h-auto w-[64vw] max-w-[420px]"
          />

          <div className="rule-t mt-16 grid gap-12 pt-12 lg:grid-cols-12 lg:gap-16">
            <address className="not-italic leading-relaxed lg:col-span-4">
              101 N. Skyline Dr.
              <br />
              Thousand Oaks, CA 91362
              <br />
              <span className="mt-3 inline-block">(831) 428-2214</span>
            </address>

            <div className="grid gap-10 sm:grid-cols-3 lg:col-span-8">
              {FOOTER_LINKS.map((col) => (
                <nav key={col.heading} aria-label={col.heading}>
                  <h2 className="t-eyebrow text-yellow">{col.heading}</h2>
                  <ul className="mt-5 space-y-3">
                    {col.links.map((link) => (
                      <li key={link}>
                        <a
                          href="#"
                          className="muted text-[0.9375rem] underline-offset-4 hover:text-salt hover:underline"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              ))}
            </div>
          </div>

          {/* Back-of-the-sleeve publisher line. Identity and location
              only, both already verified elsewhere on the page. */}
          <span
            aria-hidden="true"
            className="sign-off bottom-7 right-0 hidden text-right lg:block"
          >
            Calvary Chapel
            <br />
            Conejo Valley
            <br />
            Thousand Oaks, CA
          </span>

          <p className="rule-t muted mt-14 pt-8 text-[0.8125rem]">
            Design concept for Calvary Chapel Conejo Valley. Not the live site.
            Copy is drawn from ccconejovalley.com.
          </p>
        </div>
      </footer>
    </>
  );
}
