import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import CTABand from "@/components/CTABand";
import PageHeader from "@/components/PageHeader";
import Verse from "@/components/Verse";
import { MINISTRIES } from "@/lib/content";
import type { Fact } from "@/lib/content";

/* One template, eight pages. Everything on the page is the ministry's
   own copy from /ministries/<slug>, via lib/content.ts; the heading
   labels for the fact table are theirs too ("When", "Where", "Who").
   Meeting times are dated and specific and belong in Sanity eventually;
   for now they are committed copy, re-read 2026-09-03. */

const slugOf = (href: string) => href.split("/").pop() as string;

export function generateStaticParams() {
  return MINISTRIES.map((m) => ({ slug: slugOf(m.href) }));
}
export const dynamicParams = false;

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const m = MINISTRIES.find((x) => slugOf(x.href) === slug);
  if (!m) return {};
  return {
    title: m.detail.title ?? m.name,
    description: `${m.blurb} ${m.meta}.`,
    alternates: { canonical: m.href },
  };
}

/* A printed schedule: their labels, their values, one rule per row. */
function Facts({ facts }: { facts: Fact[] }) {
  return (
    <dl>
      {facts.map((f) => (
        <div key={f.label} className="rule-t grid grid-cols-[6.5rem_1fr] gap-4 py-4 sm:grid-cols-[8rem_1fr]">
          <dt className="t-eyebrow pt-1 text-red">{f.label}</dt>
          <dd className="text-[1.0625rem] leading-snug">{f.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export default async function MinistryPage({ params }: { params: Params }) {
  const { slug } = await params;
  const m = MINISTRIES.find((x) => slugOf(x.href) === slug);
  if (!m) notFound();
  const d = m.detail;
  const [lede, ...rest] = d.intro;

  return (
    <main id="main">
      <PageHeader
        field={m.field}
        trail={[
          { label: "Ministries", href: "/ministries" },
          { label: m.name, href: m.href },
        ]}
        title={d.title ?? m.name}
        lede={<p>{lede}</p>}
      />

      {/* The handbill at full size beside its schedule. */}
      <section className="field-stock band">
        <div className="shell grid items-start gap-10 lg:grid-cols-12 lg:gap-16">
          <div
            className="relative overflow-hidden border border-ink lg:col-span-6"
            style={{ aspectRatio: m.ratio }}
          >
            <Image
              src={`/ministries/${m.slug}.webp`}
              alt=""
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            {d.note && <p className="mb-6 text-[0.9375rem] leading-snug text-red">{d.note}</p>}
            <Facts facts={d.facts} />
            {d.leaders && (
              <p className="rule-t mt-0 pt-5">
                <span className="t-eyebrow block text-red">Led by</span>
                <span className="t-card mt-2 block">{d.leaders}</span>
              </p>
            )}
          </div>
        </div>

        {(rest.length > 0 || d.verse || d.sections) && (
          <div className="shell mt-16 md:mt-20">
            <div className="prose measure">
              {rest.map((para) => (
                <p key={para.slice(0, 40)}>{para}</p>
              ))}
              {d.verse && <Verse reference={d.verse} layout="quote" />}
              {d.sections?.map((section) => (
                <section key={section.title} aria-label={section.title}>
                  <h2>{section.title}</h2>
                  {section.paragraphs?.map((para) => (
                    <p key={para.slice(0, 40)}>{para}</p>
                  ))}
                  {section.list && (
                    <ul className="list-disc space-y-2 pl-5 marker:text-red">
                      {section.list.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}
                  {section.facts && <Facts facts={section.facts} />}
                </section>
              ))}
            </div>
          </div>
        )}
      </section>

      <CTABand />
    </main>
  );
}
