import { verse } from "@/lib/scripture";

/* Scripture set apart from the copy that cites it: the verse, NKJV
   verbatim, with its reference beneath. Beside a reading column it is a
   marginal gloss on desktop — the way a study Bible carries its
   cross-references — and an indented block under its paragraph on a
   phone. The copy keeps its own inline citation either way. */
export default function Verse({
  reference,
  className = "",
}: {
  reference: string;
  className?: string;
}) {
  return (
    <figure
      className={`border-l-2 border-red pl-5 lg:border-l-0 lg:border-t lg:border-[color:var(--rule)] lg:pl-0 lg:pt-3 ${className}`}
    >
      <blockquote className="f-text text-[0.9375rem] leading-[1.5] lg:text-[1rem]">
        &ldquo;{verse(reference)}&rdquo;
      </blockquote>
      <figcaption className="t-meta mt-2 text-red">{reference}</figcaption>
    </figure>
  );
}
