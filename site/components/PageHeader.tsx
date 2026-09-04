import Image from "next/image";
import Breadcrumb from "./Breadcrumb";
import type { Crumb } from "./Breadcrumb";

type Field = "field-stock" | "field-salt" | "field-blue" | "field-ink";

/* The interior page opening. `t-hero` exists once, on `/`; this is the
   other thing. Two sizes:

   standard — a running head and the title on the field the page's
   section owns (docs/01-build-plan.md §4). Most pages.

   poster — for a page that has to open like a poster rather than a
   chapter: the title near hero size, a deck, and an aside (a verse, a
   time, a date) hung on the right. The sunburst from the hero comes back
   as a printed corner mark, mirrored into the top-right and cropped by
   the edges, from lg up only — the same rule as the ghost words. The
   scrim keeps the type zone clean field. */
export default function PageHeader({
  trail,
  title,
  lede,
  aside,
  field = "field-stock",
  poster = false,
}: {
  trail?: Crumb[];
  title: string;
  lede?: React.ReactNode;
  aside?: React.ReactNode;
  field?: Field;
  poster?: boolean;
}) {
  if (!poster) {
    return (
      <header className={`${field} page-header`}>
        <div className="shell">
          {trail && <Breadcrumb trail={trail} />}
          <h1 className="f-display t-feature mt-7 max-w-[14ch] md:mt-9">
            {title}
          </h1>
          {lede && (
            <div className="t-lede measure-tight mt-7 md:mt-9">{lede}</div>
          )}
        </div>
      </header>
    );
  }

  return (
    <header
      className={`${field} page-header-poster relative isolate overflow-hidden`}
    >
      <Image
        src="/site/sun-rays.webp"
        alt=""
        width={1400}
        height={525}
        aria-hidden="true"
        className="poster-rays hidden lg:block"
      />
      <div className="poster-scrim hidden lg:block" aria-hidden="true" />

      <div className="shell relative">
        {trail && <Breadcrumb trail={trail} />}
        <div className="mt-9 grid gap-10 md:mt-12 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="lg:col-span-7">
            <h1 className="f-display t-poster max-w-[11ch]">{title}</h1>
            {lede && (
              <div className="t-lede muted measure-tight mt-8 md:mt-10">
                {lede}
              </div>
            )}
          </div>
          {aside && (
            <div className="lg:col-span-4 lg:col-start-9 lg:pb-1">{aside}</div>
          )}
        </div>
      </div>
    </header>
  );
}
