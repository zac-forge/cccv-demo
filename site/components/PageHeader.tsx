import Breadcrumb from "./Breadcrumb";
import type { Crumb } from "./Breadcrumb";

type Field = "field-stock" | "field-salt" | "field-blue" | "field-ink";

/* The interior page opening. Not a hero: `t-hero` exists once, on `/`.
   A running head, the title, and optionally a deck, on the field the
   page's section owns (docs/01-build-plan.md §4). The site header is
   already solid above it, so this starts flush beneath the rule. */
export default function PageHeader({
  trail,
  title,
  lede,
  field = "field-stock",
}: {
  trail?: Crumb[];
  title: string;
  lede?: React.ReactNode;
  field?: Field;
}) {
  return (
    <header className={`${field} page-header`}>
      <div className="shell">
        {trail && <Breadcrumb trail={trail} />}
        <h1 className="f-display t-feature mt-7 max-w-[14ch] md:mt-9">
          {title}
        </h1>
        {lede && <div className="t-lede measure-tight mt-7 md:mt-9">{lede}</div>}
      </div>
    </header>
  );
}
