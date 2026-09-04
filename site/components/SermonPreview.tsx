import Link from "next/link";
import { canListen, canWatch, fmtDate, type Teaching } from "@/lib/teachings";

/* One teaching at browsing scale: a plate, the passage, the title, the
   date. Nothing else; the player carries the rest. The whole item is
   the target, a link where it navigates (the /watch front door) and a
   button where it selects (the library). The plate is typographic
   because most of the archive has no picture: the book sets on ink
   inside a printed frame, like a sleeve. A row on a phone, a column
   from md. */
export default function SermonPreview({
  sermon,
  href,
  onSelect,
  selected = false,
  showFormats = false,
}: {
  sermon: Teaching;
  href?: string;
  onSelect?: () => void;
  selected?: boolean;
  showFormats?: boolean;
}) {
  const formats = showFormats
    ? [canWatch(sermon) && "Video", canListen(sermon) && "Audio"].filter(Boolean)
    : [];
  const meta = [fmtDate(sermon.date), ...formats].join(" · ");
  const className =
    "sermon-preview pressable grid w-full grid-cols-[5.5rem_1fr] items-start gap-4 text-left md:block";

  const body = (
    <>
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
        <span className="t-meta muted mt-2 block">{meta}</span>
      </span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={className}>
        {body}
      </Link>
    );
  }
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-current={selected ? "true" : undefined}
      className={className}
    >
      {body}
    </button>
  );
}
