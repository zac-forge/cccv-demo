import Link from "next/link";
import { fmtDate, type Teaching } from "@/lib/teachings";

/* One teaching at browsing scale, on the /watch front door: a plate,
   the passage, the title, the date. Nothing else; the library carries
   the rest. The whole item is the link. The plate is typographic
   because most of the archive has no picture: the book sets on ink
   inside a printed frame, like a sleeve. A row on a phone, a column
   from md. */
export default function SermonPreview({
  sermon,
  href,
}: {
  sermon: Teaching;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="sermon-preview pressable grid grid-cols-[5.5rem_1fr] items-start gap-4 md:block"
    >
      <span
        aria-hidden="true"
        className="sermon-plate aspect-square w-[5.5rem] text-[0.9375rem] md:aspect-[4/3] md:w-full md:text-[clamp(1.375rem,2vw,1.875rem)]"
      >
        {sermon.series}
      </span>
      <span className="block md:mt-4">
        <span className="t-eyebrow block text-red">{sermon.passage || sermon.series}</span>
        <span className="sermon-preview-title f-data mt-1.5 block text-[1.125rem] leading-tight transition-colors duration-150 md:text-[1.375rem]">
          {sermon.name}
        </span>
        <span className="t-meta muted mt-2 block">{fmtDate(sermon.date)}</span>
      </span>
    </Link>
  );
}
