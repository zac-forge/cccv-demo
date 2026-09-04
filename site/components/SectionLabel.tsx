/* The numbered running label a long page's sections carry, matching the
   entries in its SectionIndex: "01 Prayer". The numeral is decorative
   for assistive tech; the list order already says it. */
export default function SectionLabel({
  n,
  label,
  tone = "light",
  className = "",
}: {
  n: string;
  label: string;
  /* light: red, for stock and salt. dark: yellow, for blue and ink. */
  tone?: "light" | "dark";
  className?: string;
}) {
  const color =
    tone === "dark" ? "text-[color:var(--color-yellow-onblue)]" : "text-red";
  return (
    <p className={`t-eyebrow flex items-baseline gap-3 ${color} ${className}`}>
      <span
        aria-hidden="true"
        className="f-data text-[0.9375rem] normal-case tracking-normal"
      >
        {n}
      </span>
      {label}
    </p>
  );
}
