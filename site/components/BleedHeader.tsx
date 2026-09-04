import Image from "next/image";
import Breadcrumb from "./Breadcrumb";

/* A page that opens on a painted full bleed, the /about treatment: the
   picture at two-thirds height under an ink wash, the title and deck on
   a flat ink label spanning the shell, so the type never sits on the
   hills. `phoneCrop` is the object-position below md, where the frame
   is tall and narrow and the picture has to choose a side; from md it
   centres. `deck` is a paragraph in the homepage hero's deck style;
   `aside` is anything else under the title, a Verse on /memorials. */
export default function BleedHeader({
  src,
  phoneCrop = "object-[30%_50%]",
  trail,
  title,
  deck,
  aside,
}: {
  src: string;
  phoneCrop?: string;
  trail: { label: string; href: string }[];
  title: string;
  deck?: string;
  aside?: React.ReactNode;
}) {
  return (
    <header className="field-blue relative isolate flex min-h-[max(550px,60vh)] items-start overflow-hidden">
      <Image
        src={src}
        alt=""
        fill
        priority
        sizes="100vw"
        className={`-z-20 object-cover ${phoneCrop} md:object-center`}
      />
      <div className="poster-sky absolute inset-0 -z-10" aria-hidden="true" />
      <div className="shell relative pb-[clamp(3rem,10vw,9rem)] pt-[clamp(2.75rem,5vw,4.5rem)]">
        <Breadcrumb trail={trail} />
        {/* Title and deck on a printed label: flat ink at two-thirds,
            square, no border, spanning the shell with its padding pulled
            back on both sides so the type keeps the shell's edges (Drew,
            September 4: both columns, not one). */}
        <div
          data-reveal=""
          className="-mx-6 mt-9 bg-[rgba(22,19,26,0.66)] px-6 py-7 md:-mx-10 md:mt-12 md:px-10 md:py-9"
        >
          <h1 className="f-display t-poster max-w-[11ch]">{title}</h1>
          {deck && (
            <p className="muted mt-7 border-l-2 border-yellow pl-5 text-[clamp(1.0625rem,1.5vw,1.375rem)] leading-[1.55] md:mt-8 md:pl-6">
              {deck}
            </p>
          )}
          {aside && <div className="mt-7 md:mt-8">{aside}</div>}
        </div>
      </div>
    </header>
  );
}
