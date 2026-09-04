import type { Metadata } from "next";
import BleedHeader from "@/components/BleedHeader";
import CTABand from "@/components/CTABand";
import { SUPPORT } from "@/lib/content";

export const metadata: Metadata = {
  title: "Who we support",
  description: SUPPORT.intro,
  alternates: { canonical: "/about/who-we-support" },
};

/* /about/who-we-support plus the "feed a family" appeal from
   /give/buyumba, verbatim. Headings and links are theirs. */
export default function WhoWeSupport() {
  return (
    <main id="main">
      {/* The coast from the Conejo hills at first light, a plane heading
          out: the /about full bleed, looking past the valley. */}
      <BleedHeader
        src="/site/support-hero.webp"
        trail={[
          { label: "About", href: "/about" },
          { label: "Who we support", href: "/about/who-we-support" },
        ]}
        title="Ministries we support"
        deck={SUPPORT.intro}
      />

      <div className="field-stock">
        <div className="shell pb-[clamp(3rem,5vw,4rem)] pt-[clamp(1rem,2vw,2rem)]">
          {SUPPORT.orgs.map((org) => (
            <section
              key={org.name}
              aria-labelledby={org.name}
              className="rule-t grid gap-6 py-12 md:py-16 lg:grid-cols-12 lg:gap-16"
            >
              <h2
                data-reveal="clip"
                id={org.name}
                className="f-display text-[clamp(1.875rem,3vw,2.75rem)] leading-[1] tracking-[-0.025em] lg:col-span-4"
              >
                <span>{org.name}</span>
              </h2>
              <div className="lg:col-span-8 lg:col-start-5">
                <div data-reveal="" className="prose measure">
                  {org.paragraphs.map((para) => (
                    <p key={para.slice(0, 40)}>{para}</p>
                  ))}
                </div>
                <div
                  data-reveal=""
                  className="mt-8 flex flex-col items-start gap-5 sm:flex-row sm:gap-10"
                >
                  {org.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener"
                      className="link-rule"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>

      <CTABand />
    </main>
  );
}
