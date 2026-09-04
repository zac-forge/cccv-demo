import type { Fact } from "@/lib/content";

/* A printed schedule: their labels, their values, one rule per row. */
export default function Facts({ facts }: { facts: Fact[] }) {
  return (
    <dl data-stagger="">
      {facts.map((f) => (
        <div
          key={f.label}
          data-reveal=""
          className="rule-t grid grid-cols-[6.5rem_1fr] gap-4 py-4 sm:grid-cols-[8rem_1fr]"
        >
          <dt className="t-eyebrow pt-1 text-red">{f.label}</dt>
          <dd className="text-[1.0625rem] leading-snug">{f.value}</dd>
        </div>
      ))}
    </dl>
  );
}
