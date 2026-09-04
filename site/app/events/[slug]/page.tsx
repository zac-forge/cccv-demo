import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import CTABand from "@/components/CTABand";
import Facts from "@/components/Facts";
import PageHeader from "@/components/PageHeader";
import { EVENTS } from "@/lib/content";

/* One template for the events that have a page. Copy is theirs, from
   /eventscalendar/<slug>. Registration links out; nothing is built. */

const withPage = EVENTS.filter((e) => e.page);

export function generateStaticParams() {
  return withPage.map((e) => ({ slug: e.page!.slug }));
}
export const dynamicParams = false;

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const e = withPage.find((x) => x.page!.slug === slug);
  if (!e) return {};
  return {
    title: e.name,
    description: `${e.name}: ${e.detail}.`,
    alternates: { canonical: e.href },
  };
}

export default async function EventPage({ params }: { params: Params }) {
  const { slug } = await params;
  const e = withPage.find((x) => x.page!.slug === slug);
  if (!e) notFound();
  const page = e.page!;

  return (
    <main id="main">
      <PageHeader
        field="field-yellow"
        trail={[
          { label: "Events", href: "/events" },
          { label: e.name, href: e.href },
        ]}
        title={e.name}
        lede={<p>{e.detail}</p>}
      />

      <section className="field-stock band">
        <div className="shell grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            {page.image && (
              <div className="relative mb-10 aspect-[3/2] overflow-hidden border border-ink">
                <Image
                  src={page.image}
                  alt=""
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover"
                />
              </div>
            )}
            <div className="prose measure">
              {page.paragraphs.map((para) => (
                <p key={para.slice(0, 40)}>{para}</p>
              ))}
            </div>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <Facts facts={page.facts} />
            {page.register && (
              <a
                href={page.register.href}
                target="_blank"
                rel="noopener"
                className="btn btn-ink mt-8"
              >
                {page.register.label}
              </a>
            )}
          </div>
        </div>
      </section>

      <CTABand />
    </main>
  );
}
