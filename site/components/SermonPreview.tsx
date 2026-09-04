import Image from "next/image";
import Link from "next/link";
import { fmtDate, type Teaching } from "@/lib/teachings";

/* Drew's sermon placeholder (assets/sermon-placeholder.png) cut 4:3, the
   rays meeting the horizon two thirds down and the ink field beneath
   left for the book. Hand sized: the plate is never wider than 240px. */
const PLATE = "/site/sermon-plate.webp";

/* One teaching at browsing scale, on the /watch front door: a plate,
   the passage, the title, the date. Nothing else; the library carries
   the rest. The whole item is the link. The plate is the sermon art
   inside the printed frame, the book set in display type on the ink
   below the horizon, like a sleeve: the archive has no picture of its
   own for most teachings, so every plate carries the same art and the
   book tells them apart. On hover the art comes up a shade and eases
   in; it never swaps to another picture (Drew, September 4). A row on
   a phone, a column from md. */
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
      className="sermon-preview pressable group grid grid-cols-[5.5rem_1fr] items-start gap-4 md:block"
    >
      <span
        aria-hidden="true"
        className="sermon-plate relative aspect-square w-[5.5rem] text-[0.9375rem] md:aspect-[4/3] md:w-full md:text-[clamp(1.375rem,2vw,1.875rem)]"
      >
        <Image
          src={PLATE}
          alt=""
          fill
          sizes="(max-width: 767px) 88px, 240px"
          className="object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.03]"
        />
        <span className="absolute inset-0 bg-ink/20 transition-colors duration-300 group-hover:bg-ink/0" />
        <span className="relative">{sermon.series}</span>
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
