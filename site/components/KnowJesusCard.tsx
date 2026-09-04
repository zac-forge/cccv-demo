import Link from "next/link";

/* A gospel tract. The object a Calvary Chapel has handed out since the
   seventies, set as a card left on a seat: ink field, a yellow rule, the
   question in the display face, and tilted a degree from lg up — the one
   thing on the site not squared to the grid, which is what makes it read
   as a thing rather than a section. Copy is theirs: the question is the
   /know-jesus title, the line beneath it its first sentence. */
export default function KnowJesusCard({ className = "" }: { className?: string }) {
  return (
    <aside aria-labelledby="know-jesus-card" className={`tract field-ink ${className}`}>
      <h2
        id="know-jesus-card"
        className="f-display max-w-[10ch] text-[clamp(1.75rem,2.6vw,2.375rem)] leading-[0.98] tracking-[-0.025em]"
      >
        How can I know Jesus?
      </h2>
      <p className="muted mt-4 max-w-[30ch] text-[0.9375rem] leading-snug">
        Our greatest desire is for people to know God personally through Jesus
        Christ.
      </p>
      <Link href="/new/know-jesus" className="btn btn-sun mt-7 self-start">
        Start here
      </Link>
    </aside>
  );
}
