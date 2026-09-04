import Link from "next/link";
import PosterArt from "./PosterArt";

type Cta = { label: string; href: string; variant: "sun" | "outline" };

/* A full-width poster inside a page: Baptism Blue, the sunburst in the
   corner, a heading and a line, one or two actions. The same composition
   as the hero's second slide and the /new/know-jesus header, so a click
   lands somewhere that looks like where it came from. */
export default function PosterBand({
  id,
  title,
  lede,
  ctas,
}: {
  id: string;
  title: string;
  lede: string;
  ctas: Cta[];
}) {
  return (
    <section
      aria-labelledby={id}
      className="field-blue band relative isolate overflow-hidden"
    >
      <PosterArt />
      <div className="shell relative">
        <div className="lg:max-w-[58%]">
          <h2 id={id} className="f-display t-feature max-w-[11ch]">
            {title}
          </h2>
          <p className="t-lede muted measure-tight mt-7 md:mt-8">{lede}</p>
          <div className="mt-9 flex flex-col items-start gap-3 sm:flex-row md:mt-10">
            {ctas.map((cta) => (
              <Link key={cta.label} href={cta.href} className={`btn btn-${cta.variant}`}>
                {cta.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
