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
            HERO — dark. The artwork puts the sun and its rays in the
            upper right, so the type takes the flat navy at upper left.
            ========================================================= */}
        <section className="band-dark relative isolate -mt-[68px] flex min-h-[clamp(600px,84svh,700px)] items-center overflow-hidden bg-ink pt-[68px] md:-mt-[92px] md:min-h-[clamp(700px,92vh,900px)] md:pt-[92px]">
          <Image
            src="/site/hero.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="hero-img -z-20 object-cover"
          />
          <div className="hero-scrim absolute inset-0 -z-10" aria-hidden="true" />
          <div className="hero-topscrim absolute inset-x-0 top-0 -z-10 h-[224px]" aria-hidden="true" />

          <div className="shell w-full">
            <div className="w-full md:max-w-[40rem]">
              <img
                src="/logotype-white-trim.svg"
                alt="Calvary Chapel Conejo Valley"
                width={1601}
                height={611}
                className="mb-6 h-auto w-[70vw] max-w-[340px] md:mb-8 md:w-[42vw] md:max-w-[620px]"
              />

              {/* Their own words: "Faith Comes By Hearing" is the title of
                  their daily radio broadcast (/radio). */}
              <h1 className="f-display t-hero max-w-[11ch] text-salt">
                Faith comes by hearing.
              </h1>

              {/* Romans 10:17, NKJV — the translation quoted elsewhere on
                  their site (/serve). Verbatim, not fitted to the layout. */}
              <figure className="mt-6 max-w-[34ch] md:mt-9">
                <blockquote className="t-lede text-salt/90">
                  &ldquo;So then faith comes by hearing, and hearing by the word
                  of God.&rdquo;
                </blockquote>
                <figcaption className="t-eyebrow mt-3 text-yellow">
                  Romans 10:17
                </figcaption>
              </figure>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap md:mt-11">
                <a href="#new-here" className="btn btn-sun">
                  Plan your visit
                </a>
                <a href="#message" className="btn btn-outline">
                  Watch a message
                </a>
              </div>
            </div>
          </div>

          <div
            id="hero-sentinel"
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 left-0 h-px w-full"
          />
        </section>

        {/* =========================================================
            SERVICE TIMES — dark. The most-visited fact on a church
            site, so it sits directly under the hero.
            ========================================================= */}
        <section
          aria-label="Service times and location"
          className="band-dark bg-ink py-14 text-salt md:py-16"
        >
          <div className="shell">
            <dl className="grid grid-cols-1 border-y border-salt/20 sm:grid-cols-2 lg:grid-cols-4">
              {TIMES.map((cell) => (
                <div
                  key={cell.label}
                  className="border-b border-salt/20 py-7 last:border-b-0 sm:border-b-0 sm:border-r sm:border-salt/20 sm:px-7 sm:first:pl-0 sm:[&:nth-child(2)]:border-r-0 lg:[&:nth-child(2)]:border-r lg:last:border-r-0"
                >
                  <dt className="t-eyebrow text-yellow">{cell.label}</dt>
                  <dd className="mt-3">
                    <p className="t-value">{cell.value}</p>
                    <p className="mt-2 text-[0.9375rem] leading-snug text-salt/75">
                      {cell.detail}
                    </p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* =========================================================
            NEW HERE — light. Their "What to Expect" copy, ordered as
            a Sunday morning actually runs.
            ========================================================= */}
        <section id="new-here" className="band bg-stock">
          <div className="shell grid items-stretch gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <p className="t-eyebrow text-red">New here</p>
              <h2 className="f-display t-section mt-4 max-w-[16ch]">
                What a Sunday looks like
              </h2>

              <ol className="mt-10 border-t border-ink/20">
                {SUNDAY_STEPS.map((step, i) => (
                  <li
                    key={step.title}
                    className="grid grid-cols-[2.5rem_1fr] gap-x-4 border-b border-ink/20 py-6 sm:grid-cols-[3rem_1fr] sm:gap-x-6"
                  >
                    <span
                      aria-hidden="true"
                      className="t-value text-red"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="t-card">{step.title}</h3>
                      <p className="mt-2 max-w-[46ch] text-ink/80">
                        {step.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="lg:col-span-6">
              <div className="relative aspect-[3/2] w-full border border-ink lg:aspect-auto lg:h-full lg:min-h-[30rem]">
                <Image
                  src="/ministries/01-foundations-alt.png"
                  alt="Screenprinted illustration of an open Bible, a pencil and reading glasses on a wooden table"
                  fill
                  sizes="(max-width: 1024px) 100vw, 46vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            LATEST MESSAGE — dark. sermon-bg under an ink scrim.
            ========================================================= */}
        <section
          id="message"
          className="band-dark relative isolate overflow-hidden bg-ink text-salt"
        >
          <Image
            src="/site/sermon-bg.png"
            alt=""
            fill
            sizes="100vw"
            className="-z-20 scale-[1.08] object-cover object-[center_32%]"
          />
          <div className="absolute inset-0 -z-10 bg-ink/[0.89]" aria-hidden="true" />

          <div className="band shell grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <SermonPlayer videoId={SERMON.videoId} title={SERMON.title} />
            </div>

            <div className="lg:col-span-5">
              <p className="t-eyebrow text-yellow">Latest message</p>

              {/* Title, passage and series are the church's own, from the
                  video on their YouTube channel. */}
              <h2 className="f-display t-section mt-4">{SERMON.title}</h2>
              <p className="t-value mt-3 text-[1.125rem] text-salt/85 md:text-[1.25rem]">
                {SERMON.passage}
              </p>

              <ul className="mt-5 flex flex-wrap gap-2">
                {SERMON.tags.map((tag) => (
                  <li
                    key={tag}
                    className="border border-salt/35 px-3 py-1.5 text-[0.8125rem] font-medium text-salt/85"
                  >
                    {tag}
                  </li>
                ))}
              </ul>

              {/* Verbatim from /sermons. */}
              <p className="mt-6 max-w-[46ch] text-salt/80">
                We&rsquo;re always adding to our online library from Pastor
                Dave&rsquo;s previous teachings, so if you&rsquo;re looking for a
                particular book, check back in a bit.
              </p>

              <a href="#" className="btn btn-sun mt-8">
                Browse recent teachings
              </a>
            </div>
          </div>
        </section>

        {/* =========================================================
            MINISTRIES — light. Images bleed to the card edges.
            ========================================================= */}
        <section id="ministries" className="band bg-stock">
          <div className="shell">
            <p className="t-eyebrow text-red">Ministries</p>
            <h2 className="f-display t-section mt-4 max-w-[18ch]">
              Somewhere to grow, whoever you are
            </h2>

            <ul className="mt-12 grid grid-cols-2 gap-5 lg:grid-cols-4 lg:gap-6">
              {MINISTRIES.map((m, i) => (
                <li key={m.slug}>
                  <article className="group h-full border border-ink transition-colors duration-100 hover:bg-salt">
                    <div className="relative aspect-[3/2] w-full border-b border-ink">
                      <Image
                        src={`/ministries/${m.slug}.png`}
                        alt=""
                        fill
                        sizes="(max-width: 1024px) 50vw, 23vw"
                        loading={i < 4 ? "eager" : "lazy"}
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4 lg:p-5">
                      <h3 className="t-card">{m.name}</h3>
                      <p className="mt-2 text-[0.9375rem] leading-snug text-ink/80">
                        {m.blurb}
                      </p>
                      <p className="mt-4 text-[0.8125rem] font-semibold leading-snug text-red">
                        {m.meta}
                      </p>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* =========================================================
            EVENTS — light, on salt so it separates from ministries.
            ========================================================= */}
        <section id="events" className="band bg-salt">
          <div className="shell">
            <p className="t-eyebrow text-red">Events</p>
            <h2 className="f-display t-section mt-4">What&rsquo;s coming up</h2>

            <ul className="mt-10 border-t border-ink/25">
              {EVENTS.map((e) => (
                <li key={e.name} className="border-b border-ink/25">
                  <a
                    href="#"
                    className="flex items-center gap-5 py-6 transition-colors duration-100 hover:bg-stock sm:gap-8"
                  >
                    <span
                      aria-hidden="true"
                      className="flex h-16 w-16 shrink-0 flex-col items-center justify-center border border-red bg-red text-salt"
                    >
                      {e.day ? (
                        <>
                          <span className="t-eyebrow text-[0.625rem]">
                            {e.month}
                          </span>
                          <span className="t-value mt-0.5 text-[1.25rem] leading-none">
                            {e.day}
                          </span>
                        </>
                      ) : (
                        <span className="t-eyebrow text-[0.625rem]">
                          {e.month}
                        </span>
                      )}
                    </span>
                    <span>
                      <span className="t-card block">{e.name}</span>
                      <span className="mt-1.5 block text-[0.9375rem] text-ink/75">
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
            CONNECT — dark blue, sunrays behind it. Pastor Dave's own
            welcome from the homepage.
            ========================================================= */}
        <section
          id="connect"
          className="band-dark relative isolate overflow-hidden bg-blue text-salt"
        >
          <Image
            src="/site/sunrays.png"
            alt=""
            fill
            sizes="100vw"
            className="-z-20 object-cover object-bottom opacity-40 grayscale mix-blend-multiply"
          />

          <div className="band shell">
            <div className="max-w-[46rem]">
              <h2 className="f-display t-section max-w-[14ch]">
                Come and see.
              </h2>
              <p className="t-lede mt-6 max-w-[44ch] text-salt/90">
                We count it a blessing and a privilege to serve each and every
                one of you. Please feel free to call me with any questions or
                concerns, and text me your prayer requests.
              </p>
              <p className="t-eyebrow mt-5 text-yellow">
                Pastor Dave · (831) 428-2214
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a href="#new-here" className="btn btn-sun">
                  Plan your visit
                </a>
                <a href="#" className="btn btn-outline">
                  Send a prayer request
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ===========================================================
          FOOTER — dark.
          =========================================================== */}
      <footer id="about" className="band-dark bg-ink py-16 text-salt md:py-20">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <img
                src="/logotype-white-trim.svg"
                alt="Calvary Chapel Conejo Valley"
                width={1601}
                height={611}
                className="h-auto w-[196px]"
              />
              <address className="mt-7 not-italic leading-relaxed text-salt/80">
                101 N. Skyline Dr.
                <br />
                Thousand Oaks, CA 91362
                <br />
                <span className="mt-2 inline-block">(831) 428-2214</span>
              </address>
            </div>

            <div className="grid gap-10 sm:grid-cols-3 lg:col-span-8">
              {FOOTER_LINKS.map((col) => (
                <nav key={col.heading} aria-label={col.heading}>
                  <h2 className="t-eyebrow text-yellow">{col.heading}</h2>
                  <ul className="mt-5 space-y-3">
                    {col.links.map((link) => (
                      <li key={link}>
                        <a
                          href="#"
                          className="text-[0.9375rem] text-salt/80 underline-offset-4 hover:text-salt hover:underline"
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

          <p className="mt-14 border-t border-salt/20 pt-7 text-[0.8125rem] text-salt/60">
            Design concept for Calvary Chapel Conejo Valley. Not the live site.
            Copy is drawn from ccconejovalley.com.
          </p>
        </div>
      </footer>
    </>
  );
}
