import Link from "next/link";
import { fmtDate, splitTitle, type SermonRow } from "@/lib/sermons";

/* One teaching at browsing scale: a plate, the passage, the title, the
   date. Nothing else; the archive carries the rest. The whole item is
   the link. The plate is typographic because most of the archive has no
   picture: the book sets on ink inside a printed frame, like a sleeve.
   A row on a phone, a column from md. */
export default function SermonPreview({
  sermon,
  href,
}: {
  sermon: SermonRow;
  href: string;
}) {
  const { passage, title } = splitTitle(sermon.title);
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
        <span className="t-eyebrow block text-red">{passage || sermon.series}</span>
        <span className="sermon-preview-title f-data mt-1.5 block text-[1.125rem] leading-tight transition-colors duration-150 md:text-[1.375rem]">
          {title}
        </span>
        <span className="t-meta muted mt-2 block">{fmtDate(sermon.date)}</span>
      </span>
    </Link>
  );
}
