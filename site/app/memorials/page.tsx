import type { Metadata } from "next";
import Link from "next/link";
import BleedHeader from "@/components/BleedHeader";
import Facts from "@/components/Facts";
import Verse from "@/components/Verse";
import { MEMORIALS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Memorials",
  description: "Remembering those we have loved at Calvary Chapel Conejo Valley.",
  alternates: { canonical: "/memorials" },
};

/* /memorials, migrated as it stands: thin by the numbers and kept
   deliberately (docs/01-build-plan.md §3). Verbatim. */
export default function Memorials() {
  return (
    <main id="main">
      {/* The oak and the bench at dusk, the /about full bleed. The page
          has no introduction of its own, so the verse it already carries
          takes the deck's place. On a phone the crop keeps the bench. */}
      <BleedHeader
        src="/site/memorials-hero.webp"
        phoneCrop="object-[62%_50%]"
        trail={[{ label: "Memorials", href: "/memorials" }]}
        title="Memorials"
        aside={<Verse reference="2 Corinthians 5:8" tone="dark" layout="quote" />}
      />
      <div className="field-stock">
        <div className="shell pb-[clamp(5rem,8vw,7rem)]">
          {MEMORIALS.map((m) => (
            <article key={m.title} className="rule-t pt-10 lg:grid lg:grid-cols-12 lg:gap-x-16">
              <div className="lg:col-span-7">
                <h2
                  data-reveal="clip"
                  className="f-display text-[clamp(1.875rem,3vw,2.75rem)] leading-[1] tracking-[-0.025em]"
                >
                  <span>{m.title}</span>
                </h2>
                <div data-reveal="" className="prose measure mt-6">
                  <p>{m.text}</p>
                </div>
                <div className="mt-8 max-w-[52ch]">
                  <Verse reference={m.verse} layout="quote" />
                </div>
                <div data-reveal="" className="prose measure mt-10">
                  <p>{m.giving}</p>
                </div>
                {/* PLACEHOLDER: the button's original target was a form on
                    their site that no longer renders. It goes to /give until
                    Dave says otherwise. */}
                <Link href="/give" className="btn btn-ink mt-6">
                  Give
                </Link>
              </div>
              <div className="mt-10 lg:col-span-4 lg:col-start-9 lg:mt-0">
                <Facts facts={m.facts} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
