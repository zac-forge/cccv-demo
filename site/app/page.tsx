import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/Hero";
import SermonPlayer from "@/components/SermonPlayer";
import { EVENTS, MINISTRIES, SERMON, SUNDAY_STEPS, TIMES } from "@/lib/content";
import { CHURCH, churchJsonLd } from "@/lib/site";

export default function Home() {
  return (
    <>
      {/* The one place the church is marked up as an organisation and a
          place. docs/01-build-plan.md §6. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(churchJsonLd()) }}
      />

      <main id="main">
        {/* Hero: components/Hero.tsx. Slide 1 is the approved poster;
            the rest share its shape. */}
        <Hero />

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
            <dl className="-mx-4 grid grid-cols-2 sm:-mx-8 lg:grid-cols-4">
              {TIMES.map((cell) => (
                <div
                  key={cell.label}
                  className="border-t border-[color:var(--rule)] px-4 py-8 [&:nth-child(even)]:border-l sm:px-8 lg:[&:not(:first-child)]:border-l"
                >
                  <dt className="t-eyebrow t-eyebrow-onblue">{cell.label}</dt>
                  <dd className="mt-4">
                    <p className="f-data t-times max-sm:text-[1.375rem]">{cell.value}</p>
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
            data-drift=""
            className="ghost-word ghost-on-stock f-display bottom-[-2.5rem] left-[-4vw] hidden text-[clamp(10.5rem,19.5vw,20.5rem)] md:block"
          >
            Sunday
          </span>

          <div className="shell">
            <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
              <div className="lg:col-span-5">
                <p data-reveal="" className="t-eyebrow text-red">
                  New here
                </p>
                <h2
                  data-reveal="clip"
                  className="f-display t-section mt-5 max-w-[10ch] md:max-w-[13ch]"
                >
                  <span>What a Sunday looks like</span>
                </h2>
                <Link href="/new" className="link-rule mt-8">
                  Plan your visit
                </Link>
              </div>

              {/* Bleeds past the container on the right rather than
                  sitting in it as a thumbnail. */}
              <div className="relative lg:col-span-7 lg:-ml-20 lg:mr-[calc(50%-50vw)]">
                <div className="relative aspect-[16/10] w-full border border-ink lg:aspect-auto lg:h-[26rem]">
                  <Image
                    src="/ministries/01-foundations-alt.webp"
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
                  data-reveal=""
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
            LATEST TEACHING — set as a spread, not a feature card. A
            folio bar runs the full width of the shell: the imprint at
            one end, the series at the other, one Baptism Blue rule
            beneath both, and a single yellow tick registering that rule
            to the point where the type column starts. Image and type
            then hang from the same line.

            Everything here is locally contained: no negative margins
            leaving the section, nothing absolutely positioned outside a
            local wrapper. The section's own overflow-hidden is still
            load-bearing for the scaled background image.
            ========================================================= */}
        <section id="message" className="field-ink relative isolate overflow-hidden">
          <Image
            src="/site/message-bg.webp"
            alt=""
            fill
            sizes="100vw"
            className="message-art -z-20 object-cover object-[center_38%]"
          />
          {/* 0.88 buried the artwork so completely that only its tone
              registered, which is how the old sun read as a generic
              repeat of the hero. 0.78 lets the radio be recognisable
              while the salt type stays well clear of AA. */}
          <div className="absolute inset-0 -z-10 bg-ink/[0.82]" aria-hidden="true" />

          <div className="band-lg shell">
            {/* Folio: imprint one end, series the other. Print notation,
                not an eyebrow above a row of tags. */}
            <div
              data-reveal=""
              className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
            >
              <p className="t-eyebrow tracking-[0.34em]">Latest message</p>
              <p className="t-eyebrow muted tracking-[0.26em]">
                {SERMON.tags.join(" · ")}
              </p>
            </div>

            {/* The one rule, and the one production mark on it. The tick
                falls exactly where the type column begins below, so it
                registers the rule to the grid. Desktop only. */}
            <div
              data-reveal="rule"
              className="mt-4 border-t-2 border-blue lg:grid lg:grid-cols-12 lg:gap-16"
            >
              <span
                aria-hidden="true"
                className="-mt-[7px] hidden h-3 w-0.5 bg-yellow lg:col-start-7 lg:block"
              />
            </div>

            <div className="mt-12 grid items-start gap-12 md:mt-16 lg:grid-cols-12 lg:gap-16">
              <div data-reveal="" data-late="" className="lg:col-span-6">
                <SermonPlayer videoId={SERMON.videoId} title={SERMON.title} />
              </div>

              <div className="lg:col-span-6">
                {/* Title, passage and series are the church's own, from
                    the video on their YouTube channel. */}
                <h2 data-reveal="clip" className="f-display t-message">
                  {SERMON.titleLines.map((line, i) => (
                    <span key={line} className="block">
                      {line}
                      {i < SERMON.titleLines.length - 1 ? " " : ""}
                    </span>
                  ))}
                </h2>

                <p className="f-data mt-8 text-[clamp(1.5rem,2.4vw,2.125rem)] leading-none md:mt-10">
                  {SERMON.passage}
                </p>

                {/* Verbatim from /sermons. */}
                <p className="muted measure mt-8 md:mt-10">
                  We&rsquo;re always adding to our online library from Pastor
                  Dave&rsquo;s previous teachings, so if you&rsquo;re looking for
                  a particular book, check back in a bit.
                </p>

                <Link href="/watch" className="link-folio group mt-10 md:mt-12">
                  Browse recent teachings
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-150 group-hover:translate-x-1"
                  >
                    &rarr;
                  </span>
                </Link>
              </div>
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
            data-drift=""
            className="ghost-word ghost-on-salt f-display bottom-[-2.5rem] right-[-3vw] hidden text-[clamp(10rem,20vw,22rem)] lg:block"
          >
            Ministries
          </span>

          <div className="shell">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p data-reveal="" className="t-eyebrow text-red">
                  Ministries
                </p>
                <h2
                  data-reveal="clip"
                  className="f-display t-section mt-5 max-w-[14ch]"
                >
                  <span>Somewhere to grow, whoever you are</span>
                </h2>
              </div>
              <p className="muted max-w-[30ch] text-[0.9375rem]">
                Eight studies and fellowships, meeting through the week on
                campus.
              </p>
            </div>

            <ul className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 md:mt-16 lg:grid-cols-12 lg:gap-6">
              {MINISTRIES.map((m) => (
                <li
                  key={m.slug}
                  data-reveal=""
                  className={
                    m.wide
                      ? "sm:col-span-2 lg:col-span-6"
                      : "sm:col-span-1 lg:col-span-3"
                  }
                >
                  <article
                    className={`ministry-card ${m.field} relative flex h-full flex-col border border-ink`}
                  >
                    <div
                      className="relative w-full overflow-hidden border-b border-ink"
                      style={{ aspectRatio: m.ratio }}
                    >
                      <Image
                        src={`/ministries/${m.slug}.webp`}
                        alt=""
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-5 lg:p-6">
                      <h3 className="t-card">
                        {/* Stretched over the card: one target, one tab
                            stop, and the article stays plain block
                            content rather than the inside of an anchor. */}
                        <Link href={m.href} className="after:absolute after:inset-0">
                          {m.name}
                        </Link>
                      </h3>
                      <p className="muted mt-3 text-[0.9375rem] leading-snug">
                        {m.blurb}
                      </p>
                      {/* mt-auto, so the meeting time sits on the card
                          floor rather than wherever the blurb happens to
                          end. Titles and blurbs run to different lengths;
                          this is the line that has to agree across a row. */}
                      <p className="t-meta mt-auto pt-5">{m.meta}</p>
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
            <p data-reveal="" className="t-eyebrow">
              Events
            </p>
            <h2 data-reveal="clip" className="f-display t-section mt-5">
              <span>What&rsquo;s coming up</span>
            </h2>

            <ul className="mt-14 md:mt-16">
              {EVENTS.map((e) => (
                <li
                  key={e.name}
                  data-reveal=""
                  className="rule-t last:border-b last:border-[color:var(--rule)]"
                >
                  <Link
                    href={e.href}
                    className="pressable grid grid-cols-[5rem_1fr_auto] items-baseline gap-x-6 py-8 sm:grid-cols-[11rem_1fr_auto] sm:gap-x-10 md:py-10"
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
                        // Without an eyebrow this column loses the
                        // [label][value] structure the dated rows have,
                        // and the third row reads as a different object.
                        <>
                          <span className="t-eyebrow block">Date</span>
                          <span className="block text-[2rem] leading-none sm:text-[3.25rem]">
                            {e.month}
                          </span>
                        </>
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
                    {/* Closes the row against the rule, and is the only
                        thing telling you the row is a link at all. */}
                    <span aria-hidden="true" className="event-go">
                      &#8594;
                    </span>
                  </Link>
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
              <h2
                data-reveal="clip"
                className="f-display t-feature max-w-[10ch]"
              >
                <span>Come and see.</span>
              </h2>
              <p data-reveal="" className="t-lede measure-tight mt-9">
                We count it a blessing and a privilege to serve each and every
                one of you. Please feel free to call me with any questions or
                concerns, and text me your prayer requests.
              </p>

              <p className="mt-10">
                <span className="t-eyebrow block text-red">Pastor Dave</span>
                <a
                  href={CHURCH.phoneHref}
                  className="f-data mt-2 inline-block text-[1.75rem] leading-none md:text-[2.25rem]"
                >
                  {CHURCH.phone}
                </a>
              </p>

              <div className="mt-12 flex flex-col gap-3 sm:flex-row">
                <Link href="/new" className="btn btn-ink">
                  Plan your visit
                </Link>
                <Link href="/connect#prayer" className="btn btn-outline">
                  Send a prayer request
                </Link>
              </div>
            </div>
          </div>

          {/* Cropped past the section on the right and taller than it,
              so it reads as a plate the page runs over. */}
          <div
            aria-hidden="true"
            data-reveal=""
            data-late=""
            className="relative mx-6 mb-16 aspect-[4/3] border border-ink lg:absolute lg:inset-y-0 lg:right-0 lg:mx-0 lg:mb-0 lg:aspect-auto lg:w-[42vw] lg:border-y-0 lg:border-r-0"
          >
            <Image
              src="/site/dovedeck.webp"
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover object-[60%_center]"
            />
          </div>
        </section>
      </main>
    </>
  );
}
