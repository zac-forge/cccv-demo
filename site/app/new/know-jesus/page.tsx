import type { Metadata } from "next";
import Link from "next/link";
import CTABand from "@/components/CTABand";
import PageHeader from "@/components/PageHeader";

/* ------------------------------------------------------------------
   Copy supplied by Drew on 2026-09-03, replacing the live /know-jesus
   page. Every paragraph below is that text, verbatim, in its order,
   with its inline citations. The only things that are mine: headings
   set in sentence case (the source has them in Title Case), the John
   6:37 line set apart with its reference as a caption rather than in
   parentheses, the bolded sentence pair set in the display face, and
   the link on "contact us". Scripture fragments checked against NKJV.
   ------------------------------------------------------------------ */

export const metadata: Metadata = {
  title: "How can I know Jesus?",
  // Their opening sentence.
  description:
    "Our greatest desire is for people to know God personally through Jesus Christ.",
  alternates: { canonical: "/new/know-jesus" },
};

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
        <div className="shell">
          <div className="prose measure pb-[clamp(4rem,7vw,6rem)]">
            <p>
              Our greatest desire is for people to know God personally through
              Jesus Christ. The Bible tells us that God created us, loves us,
              and calls us to know Him and live in relationship with Him.
              (Genesis 1:1)
            </p>

            <h2>We have all sinned</h2>
            <p>
              God is holy, perfectly good, and completely righteous. He created
              us to love and obey Him, but we have all chosen our own way and
              fallen short of His standard. The Bible says, &ldquo;all have
              sinned and fall short of the glory of God.&rdquo; (Romans 3:23)
            </p>
            <p>
              Sin separates us from God, and we cannot make ourselves right with
              Him through our own efforts or good works. The Bible tells us that
              &ldquo;the wages of sin is death,&rdquo; but that &ldquo;the gift
              of God is eternal life in Christ Jesus our Lord.&rdquo; (Romans
              6:23)
            </p>

            <h2>Jesus came to save us</h2>
            <p>
              God did not leave us without hope. Jesus Christ, the Son of God,
              came into the world and lived a perfect, sinless life. Although He
              was completely innocent, He willingly went to the cross and died
              for our sins.
            </p>
            <p>
              Jesus took upon Himself the judgment that our sin deserved. He
              gave His life in our place so that we could be reconciled to God.
              &ldquo;God demonstrates His own love toward us, in that while we
              were still sinners, Christ died for us.&rdquo; (Romans 5:8)
            </p>
            <p>
              But Jesus did not remain in the grave. On the third day, He rose
              from the dead, defeating sin and death. He is alive today, and He
              promises eternal life to all who put their trust in Him.
            </p>

            <h2>Respond to Jesus</h2>
            <p>
              Salvation is not something we earn by being good enough, and it
              isn&rsquo;t something we can accomplish through religious
              activity. It is God&rsquo;s gift of grace, received through faith
              in Jesus Christ.
            </p>
            <p>
              To come to Christ means recognizing our sin and our need for a
              Savior, turning to God in repentance, and placing our trust in
              Jesus Christ and what He has done for us.
            </p>
            <p>
              No matter what you have done or how far you may feel from God, you
              can come to Him through Jesus. He will not reject those who come
              to Him in faith.
            </p>
            <p>
              Repentance means turning from our sin and turning toward God. It
              doesn&rsquo;t mean that we will never struggle with sin again. It
              means that we acknowledge our sin, turn to Christ, and desire to
              follow Him.
            </p>
            {/* The one scripture that stands as its own paragraph, set apart
                the way the hero sets Romans 10:17: a rule, the display face,
                the reference beneath. */}
            <figure className="border-l-2 border-red pl-5 md:pl-6">
              <p className="f-text text-[clamp(1.25rem,1.9vw,1.5rem)] leading-[1.45]">
                Jesus said, &ldquo;the one who comes to Me I will by no means
                cast out.&rdquo;
              </p>
              <figcaption className="t-meta mt-3 text-red">John 6:37</figcaption>
            </figure>

            <h2>You can come to Jesus today</h2>
            <p>
              There is no special formula or set of words that saves us. What
              matters is placing your faith in Jesus Christ.
            </p>
            <p>
              If you are ready to turn to God and put your trust in Jesus, you
              can talk to Him honestly in prayer. You might pray something like
              this:
            </p>
          </div>
        </div>
      </article>

      {/* The prayer. The one dark moment on the page, and the hinge of it:
          everything above leads here, everything below follows from it.
          Set the way the hero sets Romans 10:17 — a yellow rule, the
          display face — so the quotations on the site are one idea. */}
      <section aria-label="A prayer" className="field-ink band">
        <div className="shell lg:grid lg:grid-cols-12 lg:gap-x-16">
          <blockquote className="f-text t-prayer border-l-2 border-yellow pl-6 md:pl-8 lg:col-span-9">
            &ldquo;Jesus, I know that I am a sinner and that I need You. I
            believe that You died for my sins and rose again. I turn from my sin
            and place my trust in You. Please forgive me and help me to follow
            You. I give my life to You. Thank You for Your grace and for the
            gift of salvation. Amen.&rdquo;
          </blockquote>
        </div>
      </section>

      <article className="field-stock">
        <div className="shell">
          <div className="prose measure pb-[clamp(5rem,8vw,7rem)] pt-[clamp(4rem,7vw,6rem)]">
            {/* Their bold, set as display type: the one line on the page
                that carries its own weight, and the one use of display red. */}
            <p className="f-display t-section display-red max-w-[12ch]">
              It isn&rsquo;t the prayer that saves you. Jesus saves.
            </p>
            <p className="mt-8">
              If you have genuinely placed your trust in Christ, your hope is
              not in the words you prayed but in the Savior you are trusting.
            </p>
            <p>
              Jesus calls us not simply to make a decision, but to follow Him. A
              life of faith is a lifelong journey of growing in our relationship
              with Him.
            </p>

            <h2>Begin your walk with Jesus</h2>
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
              with a pastor or another mature Christian who can help answer your
              questions and encourage you as you follow Jesus.
            </p>
            <p>
              If you have questions about faith, Jesus, or what it means to
              follow Him, please don&rsquo;t hesitate to{" "}
              <Link href="/connect" className="link-inline">
                contact us
              </Link>
              . We&rsquo;d be blessed to help you take your next step in your
              walk with Jesus.
            </p>
          </div>
        </div>
      </article>

      <CTABand />
    </main>
  );
}
