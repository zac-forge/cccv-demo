import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import CTABand from "@/components/CTABand";
import Facts from "@/components/Facts";
import PageHeader from "@/components/PageHeader";
import Verse from "@/components/Verse";
import { MINISTRIES } from "@/lib/content";

/* One template, eight pages. Everything on the page is the ministry's
   own copy from /ministries/<slug>, via lib/content.ts; the heading
   labels for the fact table are theirs too ("When", "Where", "Who").
   Meeting times are dated and specific and belong in Sanity eventually;
   for now they are committed copy, re-read 2026-09-03. */

const slugOf = (href: string) => href.split("/").pop() as string;

/* A run of paragraphs with nothing to sit beside it splits across the
   page's two columns, the first half left and the rest right, so the
   copy at the foot fills the width the plate and the schedule set
   instead of running down one measure (Drew, September 4). */
const halves = <T,>(items: T[]): [T[], T[]] => {
  const n = Math.ceil(items.length / 2);
  return [items.slice(0, n), items.slice(n)];
};

const paras = (list: string[]) =>
  list.map((para) => <p key={para.slice(0, 40)}>{para}</p>);

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

      {/* The handbill at full size beside its schedule. The header's own
          foot is the gap above it; a band's worth on top of that was too
          much (Drew, September 4). */}
      <section className="field-stock pb-[clamp(6rem,9vw,9rem)]">
        <div className="shell grid items-start gap-10 lg:grid-cols-12 lg:gap-16">
          <div
            data-reveal=""
            data-late=""
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
            {d.note && (
              <p data-reveal="" className="mb-6 text-[0.9375rem] leading-snug text-red">
                {d.note}
              </p>
            )}
            <Facts facts={d.facts} />
            {d.leaders && (
              <p data-reveal="" className="rule-t mt-0 pt-5">
                <span className="t-eyebrow block text-red">Led by</span>
                <span className="t-card mt-2 block">{d.leaders}</span>
              </p>
            )}
          </div>
        </div>

        {/* The foot, on the grid above: the plate's six columns and the
            schedule's five, one gutter down the page. Their remaining
            introduction sits beside the verse; a section's paragraphs
            beside its list or facts; copy with nothing beside it halves. */}
        {(rest.length > 0 || d.verse || d.sections) && (
          <div className="shell prose mt-16 md:mt-20">
            {(rest.length > 0 || d.verse) && (
              <div data-reveal="" className="lg:grid lg:grid-cols-12 lg:gap-x-16">
                {d.verse ? (
                  <>
                    {rest.length > 0 && <div className="prose lg:col-span-6">{paras(rest)}</div>}
                    <div
                      className={
                        rest.length > 0
                          ? "mt-8 lg:col-span-5 lg:col-start-8 lg:mt-0"
                          : "lg:col-span-6"
                      }
                    >
                      <Verse reference={d.verse} layout="quote" />
                    </div>
                  </>
                ) : (
                  (([left, right]) => (
                    <>
                      <div className="prose lg:col-span-6">{paras(left)}</div>
                      {right.length > 0 && (
                        <div className="prose mt-6 lg:col-span-5 lg:col-start-8 lg:mt-0">
                          {paras(right)}
                        </div>
                      )}
                    </>
                  ))(halves(rest))
                )}
              </div>
            )}
            {d.sections?.map((section) => {
              const beside = Boolean(section.list || section.facts);
              const [left, right] = beside
                ? [section.paragraphs ?? [], []]
                : halves(section.paragraphs ?? []);
              return (
                <section
                  key={section.title}
                  aria-label={section.title}
                  data-reveal=""
                  className="mt-[clamp(2.75rem,4.5vw,3.75rem)] first:mt-0 lg:grid lg:grid-cols-12 lg:gap-x-16"
                >
                  <h2 className="lg:col-span-12">{section.title}</h2>
                  {left.length > 0 && <div className="prose lg:col-span-6">{paras(left)}</div>}
                  {/* With no paragraphs to sit beside, a list or facts
                      takes the left column (Youth's Middle school). */}
                  {(right.length > 0 || beside) && (
                    <div
                      className={
                        left.length > 0
                          ? "prose mt-6 lg:col-span-5 lg:col-start-8 lg:mt-0"
                          : "prose lg:col-span-6"
                      }
                    >
                      {paras(right)}
                      {section.list && (
                        <ul className="list-disc space-y-2 pl-5 marker:text-red">
                          {section.list.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      )}
                      {section.facts && <Facts facts={section.facts} />}
                    </div>
                  )}
                </section>
              );
            })}
          </div>
        )}
      </section>

      <CTABand />
    </main>
  );
}
