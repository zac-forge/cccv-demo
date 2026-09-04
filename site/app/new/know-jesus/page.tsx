import type { Metadata } from "next";
import Link from "next/link";
import CTABand from "@/components/CTABand";
import PageHeader from "@/components/PageHeader";
import Verse from "@/components/Verse";

/* ------------------------------------------------------------------
   /know-jesus on ccconejovalley.com, migrated intact. Every paragraph
   below is theirs, verbatim, in their order, read from the live page on
   2026-09-03 — including the inline citations, the capitals in the
   closing line and the prayer. Nothing was cut or reworded. The only
   things that are mine are the title's sentence case (theirs is set in
   lowercase by their site builder), the link on "contact us", and the
   verses set apart beside the paragraphs that cite them, which are NKJV
   verbatim from lib/scripture.ts.
   ------------------------------------------------------------------ */

export const metadata: Metadata = {
  title: "How can I know Jesus?",
  // Their opening sentence.
  description:
    "Our greatest desire is for people to come to know God personally. The simple truth is that there is a God who created you and loves you very much.",
  alternates: { canonical: "/new/know-jesus" },
};

/* One paragraph and the scripture it cites, side by side from lg up.
   The column is seven of twelve, capped at the site measure (seven
   columns alone run to about 70 characters at this size). The verse
   hangs in the outer four and starts on the paragraph's first line. */
function Passage({
  verses = [],
  children,
}: {
  verses?: string[];
  children: React.ReactNode;
}) {
  return (
    <div className="passage lg:grid lg:grid-cols-12 lg:gap-x-16">
      <div className="measure lg:col-span-7">{children}</div>
      {verses.length > 0 && (
        <div className="mt-6 space-y-4 lg:col-span-4 lg:col-start-9 lg:mt-0">
          {verses.map((reference) => (
            <Verse key={reference} reference={reference} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function KnowJesus() {
  return (
    <main id="main">
      <PageHeader
        trail={[
          { label: "New here", href: "/new" },
          { label: "How can I know Jesus?", href: "/new/know-jesus" },
        ]}
        title="How can I know Jesus?"
      />

      <article className="field-stock">
        <div className="shell prose pb-[clamp(4rem,7vw,6rem)]">
          <Passage verses={["Genesis 1:1"]}>
            <p>
              Our greatest desire is for people to come to know God
              personally. The simple truth is that there is a God who created
              you and loves you very much. (Genesis 1:1) He gave us life and
              deserves our gratitude and love.
            </p>
          </Passage>

          <Passage verses={["Romans 3:23", "1 John 1:8"]}>
            <p>
              We, however, have chosen to disobey Him and sin against Him; all
              of us have done wrong and failed to do what is right. (Romans
              3:23) We may not be more sinful than our neighbor, or we may be
              far worse than anyone we know, it does not matter. Either way,
              we are guilty before God. (1 John 1:8)
            </p>
          </Passage>

          <Passage verses={["Romans 6:23"]}>
            <p>
              God is perfect, completely good, always right and fair. He cannot
              tolerate sin. He cannot simply overlook the fact that we have
              chosen to disobey Him. The Bible says &ldquo;the wages of sin is
              death.&rdquo; (Romans 6:23) This means that the fair payment for
              our rebellion against God is death. It is the punishment that we
              deserve.
            </p>
          </Passage>

          <Passage verses={["Romans 5:8"]}>
            <p>
              Jesus, the one and only Son of God, came to earth and lived a
              perfect sinless life. He was crucified even though He was
              completely innocent. He received the punishment that we deserved.
              He was the perfect sacrifice, He was put into our place and took
              on Himself the sentence of death that should have been ours.
              (Romans 5:8)
            </p>
          </Passage>

          <Passage>
            <p>
              Jesus did not, however, remain dead. After three days, He rose
              from the grave and later ascended into heaven. He will return for
              all those who are trusting in Him as their Savior.
            </p>
          </Passage>

          <Passage>
            <p>
              Jesus died for you. You can be saved by asking Him for
              forgiveness from your sins. If you are willing to repent of your
              sin, He is waiting to forgive you. It doesn&rsquo;t matter what
              you have done in the past, if you cry out to Jesus for
              forgiveness, He will not reject you. The word &ldquo;repent&rdquo;
              literally means &ldquo;to turn away from.&rdquo; You need to look
              at your life, admit that you are a sinner, genuinely desire to
              turn your back on that sin, and ask Him to forgive you. If you do
              this, He promises to forgive you.
            </p>
          </Passage>

          <Passage>
            <p>
              True Christianity is not about attending a particular church, or
              how your parents raised you, or what country you were born in.
            </p>
          </Passage>

          <Passage>
            <p>
              Being a Christian means that you have a personal relationship
              with Jesus Christ, that He is your Savior. It&rsquo;s not good
              enough that your priest, pastor, mother, or aunt knows Jesus, you
              must know Him for yourself. They cannot believe in Him for you,
              you must believe for yourself. They cannot repent for you, you
              must repent for yourself.
            </p>
          </Passage>

          <Passage>
            <p>
              Jesus is everywhere all the time. He can hear you now if you ask
              Him for forgiveness. Please turn your life over to Him NOW. Time
              slips by so quickly, don&rsquo;t miss this opportunity. If you
              want to pray and ask Jesus to be your Savior, you can say a prayer
              something like this:
            </p>
          </Passage>
        </div>
      </article>

      {/* The prayer. The one dark moment on the page, and the hinge of it:
          everything above leads here, everything below follows from it.
          Set the way the hero sets Romans 10:17 — a yellow rule, the
          display face — so the two quotations on the site are one idea. */}
      <section aria-label="A prayer" className="field-ink band">
        <div className="shell lg:grid lg:grid-cols-12 lg:gap-x-16">
          <blockquote className="f-text t-prayer border-l-2 border-yellow pl-6 lg:col-span-9 md:pl-8">
            &ldquo;Jesus, I know that I have sinned against You. I know the
            truth is that I have sinned by my own choice, and I am the one
            responsible for it. I know that I have earned punishment from You,
            and that the fair punishment would be death. Jesus, I believe that
            You died in my place. Forgive me for my sin. I cannot cover or
            take my sin away, I am relying totally and only on You. You are
            the only one who can save me. I reject my sin, I turn away from
            it, I repent. Come into my life, take away my sin, and show me how
            to live my life in a way that is right and pleasing to You.&rdquo;
          </blockquote>
        </div>
      </section>

      <article className="field-stock">
        <div className="shell prose pb-[clamp(5rem,8vw,7rem)] pt-[clamp(4rem,7vw,6rem)]">
          <Passage>
            {/* Their emphasis, their capitals. The size is the only thing
                added: this is the one line on the page that shouts, and the
                one place the display red is used. */}
            <p className="f-display t-section display-red max-w-[12ch]">
              If you have prayed this, YOU ARE SAVED!
            </p>
            <p className="mt-8">
              You are now completely forgiven, a new creation, innocent in the
              eyes of God. Welcome to the family of God!
            </p>
          </Passage>

          <Passage>
            <p>
              It is important for you to start to grow in your relationship
              with Jesus. Just like any relationship, you need to spend time
              with someone if you want to know them well. The way to know God
              is through the Bible. We have a few different Bible studies here
              that will help you get going. It&rsquo;s also important to find
              a church you can attend where they teach the Bible. This will
              allow you to talk with a pastor who will help explain questions
              you might have, and it will give you a chance to spend time with
              other Christians who can encourage you.
            </p>
          </Passage>

          <Passage>
            <p>
              You can start to study the Bible by going through a New Believers
              Booklet. After that, we recommend that you start a Bible study
              through the Gospel of John. You can look for a church in your
              area by checking our List of Calvary Chapel Fellowships.
            </p>
          </Passage>

          <Passage>
            <p>
              If you have any questions, please don&rsquo;t hesitate to{" "}
              <Link href="/connect" className="link-inline">
                contact us
              </Link>
              . We would be blessed to help you get started in your walk with
              Jesus.
            </p>
          </Passage>
        </div>
      </article>

      <CTABand />
    </main>
  );
}
