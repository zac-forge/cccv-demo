import Image from "next/image";
import Link from "next/link";
import type { Ministry } from "@/lib/content";

/* A screenprinted handbill. Panels vary in width, crop and field; type
   and spacing do not. The title is the link and stretches over the whole
   card, so the card is one target without wrapping block content in an
   anchor. */
export default function MinistryCard({ ministry: m }: { ministry: Ministry }) {
  return (
    <article
      className={`ministry-card ${m.field} relative flex h-full flex-col border border-ink`}
    >
      <div
        className="relative w-full overflow-hidden border-b border-ink"
        style={{ aspectRatio: m.ratio }}
      >
        <Image
          src={`/ministries/${m.slug}.webp`}
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col p-5 lg:p-6">
        <h3 className="t-card">
          <Link href={m.href} className="after:absolute after:inset-0">
            {m.name}
          </Link>
        </h3>
        <p className="muted mt-3 text-[0.9375rem] leading-snug">{m.blurb}</p>
        {/* mt-auto, so the meeting time sits on the card floor rather than
            wherever the blurb happens to end. Titles and blurbs run to
            different lengths; this is the line that has to agree across
            a row. */}
        <p className="t-meta mt-auto pt-5">{m.meta}</p>
      </div>
    </article>
  );
}
