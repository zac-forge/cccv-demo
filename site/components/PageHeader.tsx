import Breadcrumb from "./Breadcrumb";
import type { Crumb } from "./Breadcrumb";
import PosterArt from "./PosterArt";

type Field = "field-stock" | "field-salt" | "field-blue" | "field-ink" | "field-yellow";

/* The interior page opening. `t-hero` exists once, on `/`; this is the
   other thing. Two sizes:

   standard — a running head and the title on the field the page's
   section owns (docs/01-build-plan.md §4). Most pages.

   poster — for a page that has to open like a poster rather than a
   chapter: the title near hero size, a deck, and an aside (a verse, a
   time, a date) hung on the right, with the sunburst in the corner
   (PosterArt). `statement` is the deck's other form: one sentence set
   between lede and section size, spanning the full shell beneath the
   title row, for a page whose opening is a statement rather than a
   paragraph (/about). `asideNear` hangs the aside right after a short
   title, in the columns the scrim keeps clean, rather than out under
   the rays where it competes with the sun (/about). */
export default function PageHeader({
  trail,
  title,
  lede,
  statement,
  aside,
  asideNear = false,
  field = "field-stock",
  poster = false,
}: {
  trail?: Crumb[];
  title: string;
  lede?: React.ReactNode;
  statement?: React.ReactNode;
  aside?: React.ReactNode;
  asideNear?: boolean;
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
      <PosterArt />

      <div className="shell relative">
        {trail && <Breadcrumb trail={trail} />}
        <div className="mt-9 grid gap-10 md:mt-12 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className={asideNear ? "lg:col-span-4" : "lg:col-span-7"}>
            <h1 className="f-display t-poster max-w-[11ch]">{title}</h1>
            {lede && (
              <div className="t-lede muted measure-tight mt-8 md:mt-10">
                {lede}
              </div>
            )}
          </div>
          {aside && (
            <div
              className={
                asideNear
                  ? "lg:col-span-4 lg:col-start-6 lg:pb-1"
                  : "lg:col-span-4 lg:col-start-9 lg:pb-1"
              }
            >
              {aside}
            </div>
          )}
        </div>
        {statement && (
          <div className="f-text t-pull rule-t mt-10 pt-8 md:mt-14 md:pt-10">
            {statement}
          </div>
        )}
      </div>
    </header>
  );
}
