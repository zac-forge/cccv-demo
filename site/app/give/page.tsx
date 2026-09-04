import type { Metadata } from "next";
import Link from "next/link";
import GivingForm from "@/components/GivingForm";
import PageHeader from "@/components/PageHeader";
import Verse from "@/components/Verse";
import { GIVE } from "@/lib/content";

/* ------------------------------------------------------------------
   /give. The Amplify form is theirs and loads lazily in a reserved box.
   Copy is verbatim. Their Deuteronomy 16:17 was not NKJV wording, so it
   is set from lib/scripture.ts (NKJV) with the same reference; 2 Cor.
   9:7-8 matched and stands. PayPal and the mailing address carry the
   old Calabasas identity and are an open question for Dave; they are
   carried over as they stand on the live page today.
   ------------------------------------------------------------------ */

export const metadata: Metadata = {
  title: "Give",
  description:
    "Give online to Calvary Chapel Conejo Valley, one time or recurring, or by mail. Thank you for your partnership in ministry with us.",
  alternates: { canonical: "/give" },
};

export default function Give() {
  return (
    <main id="main">
      <PageHeader
        poster
        field="field-ink"
        trail={[{ label: "Give", href: "/give" }]}
        title="Give"
        lede={<p>{GIVE.thanks}</p>}
        aside={<Verse reference="Deuteronomy 16:17" tone="dark" layout="quote" />}
      />

      <section aria-label="Give online" className="field-stock band">
        <div className="shell grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <GivingForm formId={GIVE.amplifyFormId} />
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <h2 className="t-subhead">Other ways to give</h2>

            <div className="rule-t mt-6 pt-5">
              <p className="t-eyebrow text-red">PayPal</p>
              <p className="mt-2 text-[1.0625rem] leading-snug">
                You can also give via PayPal using the email address{" "}
                <a href="https://www.paypal.com/us/home" target="_blank" rel="noopener" className="link-inline">
                  {GIVE.paypal}
                </a>
              </p>
            </div>

            <div className="rule-t mt-6 pt-5">
              <p className="t-eyebrow text-red">By mail</p>
              <p className="mt-2 text-[1.0625rem] leading-snug">
                Make checks payable to <strong className="font-semibold">{GIVE.checks.payee}</strong>
                <br />
                Send to: {GIVE.checks.address}
              </p>
              <p className="muted mt-2 text-[0.9375rem] leading-snug">
                {GIVE.checks.note}
              </p>
            </div>

            <div className="rule-t mt-6 pt-5">
              <p className="t-eyebrow text-red">Questions</p>
              <p className="mt-2 text-[1.0625rem] leading-snug">{GIVE.questions}</p>
              <Link href="/connect" className="link-rule mt-5">
                Reach Pastor Dave
              </Link>
            </div>
          </div>
        </div>

        <div className="shell mt-16 md:mt-20">
          <div className="max-w-[62ch]">
            <Verse reference="2 Corinthians 9:7-8" layout="quote" />
          </div>
        </div>
      </section>
    </main>
  );
}
