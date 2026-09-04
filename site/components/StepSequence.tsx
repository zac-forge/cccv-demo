/* An ordered process: the ghost numeral takes the margin, the step the
   column, one rule per step. The same shape as the Sunday steps on
   /new, at a size that fits inside a section rather than owning one. */
export default function StepSequence({
  steps,
  className = "",
}: {
  steps: ReadonlyArray<{ title: string; body: React.ReactNode }>;
  className?: string;
}) {
  return (
    <ol data-stagger="" className={className}>
      {steps.map((step, i) => (
        <li
          key={step.title}
          data-reveal=""
          className="rule-t grid gap-4 py-8 md:py-10 lg:grid-cols-12 lg:gap-16"
        >
          <span
            aria-hidden="true"
            className="f-display numeral-ghost text-[3rem] leading-none lg:col-span-2 lg:text-[clamp(4rem,6vw,5.5rem)]"
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <div className="lg:col-span-8 lg:col-start-3">
            <h3 className="t-subhead">{step.title}</h3>
            <div className="prose measure mt-4">{step.body}</div>
          </div>
        </li>
      ))}
    </ol>
  );
}
