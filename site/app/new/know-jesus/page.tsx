import type { Metadata } from "next";
import Link from "next/link";
import CTABand from "@/components/CTABand";
import PageHeader from "@/components/PageHeader";
import Verse from "@/components/Verse";

/* ------------------------------------------------------------------
   Copy supplied by Drew on 2026-09-03, replacing the live /know-jesus
   page, then edited for rhythm on 2026-09-04 per docs/06-copy-pass.md
   §3: three headings, one paragraph cut, five reworded. Doctrine and
   the inline citations are untouched. The only things that are mine: headings
   set in sentence case (the source has them in Title Case), the
   bolded sentence pair set in the display face, the link on "contact
   us", and the verses set apart beside the paragraphs that cite them,
   which are NKJV verbatim from lib/scripture.ts. Scripture fragments
   inside the copy checked against NKJV.
   ------------------------------------------------------------------ */

export const metadata: Metadata = {
  title: "How can I know Jesus?",
  // Their opening sentence.
  description:
    "Our greatest desire is for people to know God personally through Jesus Christ.",
  alternates: { canonical: "/new/know-jesus" },
};

/* One paragraph and the scripture it cites, side by side from lg up.
   At lg the column is seven of twelve, capped at the site measure, and
   the verse hangs in the outer four, starting on the paragraph's first
   line. From xl, where the runs set in two columns, the page keeps one
   gutter: six and six, so the verse's rule spans the same half the run's
   second column fills and nothing steps in or out down the page. */
function Passage({
  verses = [],
  children,
}: {
  verses?: string[];
  children: React.ReactNode;
}) {
  return (
    <div className="passage lg:grid lg:grid-cols-12 lg:gap-x-16">
      <div className="measure lg:col-span-7 xl:col-span-6">{children}</div>
      {verses.length > 0 && (
        <div className="mt-6 space-y-4 lg:col-span-4 lg:col-start-9 lg:mt-0 xl:col-span-6 xl:col-start-7">
          {verses.map((reference) => (
            <Verse key={reference} reference={reference} />
          ))}
        </div>
      )}
    </div>
  );
}

/* A run of paragraphs that cite nothing. From xl up it sets in two
   columns across the shell, where the verse column would otherwise sit
   empty, so a chapter is half as tall and no paragraph reads beside a
   blank margin. Paragraphs stay whole and the columns balance. A lone
   paragraph between cited ones stays a Passage: there is nothing to
   fill the second column with. */
function Run({ children }: { children: React.ReactNode }) {
  return <div className="passage measure run">{children}</div>;
}

export default function KnowJesus() {
  return (
    <main id="main">
      <PageHeader
        poster
        art="cross"
        field="field-blue"
        trail={[
          { label: "Visit", href: "/new" },
          { label: "How can I know Jesus?", href: "/new/know-jesus" },
        ]}
        title="How can I know Jesus?"
        lede={
          <p>
            Our greatest desire is for people to know God personally through
            Jesus Christ. The Bible tells us that God created us, loves us, and
            calls us to know Him and live in relationship with Him. (Genesis
            1:1)
          </p>
        }
        aside={<Verse reference="Genesis 1:1" tone="dark" layout="quote" />}
      />

      <article className="field-stock">
        <div className="shell prose pb-[clamp(4rem,7vw,6rem)] pt-[clamp(3rem,5vw,4rem)]">
          <h2 data-reveal="clip"><span>We have all sinned</span></h2>
          <Passage verses={["Romans 3:23"]}>
            <p>
              God is holy, perfectly good, and completely righteous. He created
              us to love and obey Him, but we have all chosen our own way and
              fallen short of His standard. The Bible says, &ldquo;all have
              sinned and fall short of the glory of God.&rdquo; (Romans 3:23)
            </p>
          </Passage>
          <Passage verses={["Romans 6:23"]}>
            <p>
              Sin separates us from God, and we cannot make ourselves right with
              Him through our own efforts or good works. The Bible tells us that
              &ldquo;the wages of sin is death,&rdquo; but that &ldquo;the gift
              of God is eternal life in Christ Jesus our Lord.&rdquo; (Romans
              6:23)
            </p>
          </Passage>

          <h2 data-reveal="clip"><span>Jesus came to save us</span></h2>
          <Passage>
            <p>
              God did not leave us without hope. Jesus Christ, the Son of God,
              came into the world and lived a perfect, sinless life. Although He
              was completely innocent, He willingly went to the cross and died
              for our sins.
            </p>
          </Passage>
          <Passage verses={["Romans 5:8"]}>
            <p>
              Jesus took upon Himself the judgment that our sin deserved. He
              gave His life in our place so that we could be reconciled to God.
              &ldquo;God demonstrates His own love toward us, in that while we
              were still sinners, Christ died for us.&rdquo; (Romans 5:8)
            </p>
          </Passage>
          <Passage>
            <p>
              But Jesus did not remain in the grave. On the third day, He rose
              from the dead, defeating sin and death. He is alive today, and He
              promises eternal life to all who put their trust in Him.
            </p>
          </Passage>

          <h2 data-reveal="clip"><span>What it means to respond</span></h2>
          <Run>
            <p>
              Salvation is not something we earn by being good enough, and it
              isn&rsquo;t something we can accomplish through religious
              activity. It is God&rsquo;s gift of grace, received through faith
              in Jesus Christ.
            </p>
            <p>
              Coming to Christ means recognizing our sin and our need for a
              Savior, turning to God in repentance, and placing our trust in
              what He has done for us.
            </p>
            <p>
              No matter what you have done or how far from God you feel, the
              way to Him is open. He turns no one away who trusts Him.
            </p>
            <p>
              Repentance means turning from our sin and turning toward God. It
              doesn&rsquo;t mean that we will never struggle with sin again. It
              means that we acknowledge our sin, turn to Christ, and desire to
              follow Him.
            </p>
          </Run>
          <Passage verses={["John 6:37"]}>
            <p>
              Jesus said, &ldquo;the one who comes to Me I will by no means cast
              out.&rdquo; (John 6:37)
            </p>
          </Passage>

          <h2 data-reveal="clip"><span>You can come today</span></h2>
          <Passage>
            <p>
              If you are ready to turn to God and put your trust in Jesus, talk
              to Him honestly. You might pray something like this:
            </p>
          </Passage>
        </div>
      </article>

      {/* The prayer. The one dark moment on the page, and the hinge of it:
          everything above leads here, everything below follows from it.
          Set the way the hero sets Romans 10:17 — a yellow rule, the
          display face — so the quotations on the site are one idea.
          Romans 10:9 sits in the five columns the prayer leaves, the
          Messages hero's aside (the rule, the pull quote's type): the
          promise the prayer answers, confess and believe and be saved,
          set a step larger than the prayer because the page's next line
          is that the prayer is not what saves. The grid stretches both,
          so the two rules run the same height. Below lg it stacks; from
          xl it splits six and six on the article's gutter. */}
      <section aria-label="A prayer" className="field-ink band">
        <div className="shell grid gap-10 lg:grid-cols-12 lg:gap-x-16">
          <blockquote
            data-reveal=""
            className="f-text t-prayer border-l-2 border-yellow pl-6 md:pl-8 lg:col-span-7 xl:col-span-6"
          >
            &ldquo;Jesus, I know that I am a sinner and that I need You. I
            believe that You died for my sins and rose again. I turn from my sin
            and place my trust in You. Please forgive me and help me to follow
            You. I give my life to You. Thank You for Your grace and for the
            gift of salvation. Amen.&rdquo;
          </blockquote>
          <Verse
            reference="Romans 10:9"
            tone="dark"
            layout="quote"
            size="pull"
            className="lg:col-span-5 lg:col-start-8 xl:col-span-6 xl:col-start-7"
          />
        </div>
      </section>

      <article className="field-stock">
        <div className="shell prose pb-[clamp(5rem,8vw,7rem)] pt-[clamp(4rem,7vw,6rem)]">
          {/* Their bold, set as display type: the one line on the page
              that carries its own weight, and the one use of display red. */}
          {/* Two lines, one sentence each: the first never breaks where it
              fits, and "Jesus saves." always takes the second (Drew,
              September 4). */}
          <p data-reveal="clip" className="f-display t-section display-red">
            <span>
              It isn&rsquo;t the prayer that saves you.
              <br />
              <em>Jesus saves.</em>
            </span>
          </p>
          <Run>
            <p>
              If you have genuinely placed your trust in Christ, your hope is
              not in the words you prayed but in the Savior you are trusting.
            </p>
            <p>
              Jesus calls us not simply to make a decision, but to follow Him.
              Faith is not a moment; it is a life.
            </p>
          </Run>

          <h2 data-reveal="clip"><span>Where to begin</span></h2>
          <Run>
            <p>
              If you have put your faith in Jesus, we&rsquo;d love to help you
              grow in your relationship with Him.
            </p>
            <p>
              One of the most important ways we come to know God is through His
              Word. Begin reading the Bible regularly, and consider starting
              with the Gospel of John. Prayer, worship, fellowship with other
              believers, and being part of a Bible-teaching church are also
              important parts of growing as a Christian.
            </p>
            <p>
              You don&rsquo;t have to figure everything out on your own. Talk
              with a pastor or another mature Christian who can answer your
              questions and walk alongside you.
            </p>
            <p>
              If anything here raises a question, please don&rsquo;t hesitate
              to{" "}
              <Link href="/connect" className="link-inline">
                contact us
              </Link>
              . We would be blessed to help you take the next step.
            </p>
          </Run>
        </div>
      </article>

      <CTABand />
    </main>
  );
}
