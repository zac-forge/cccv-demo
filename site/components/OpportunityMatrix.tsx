/* A numbered list of openings, two across from md, each row ruled.
   Typography and hairlines do the separating; there are no boxes. */
export default function OpportunityMatrix({
  items,
  className = "",
}: {
  items: ReadonlyArray<{ title: string; detail: string }>;
  className?: string;
}) {
  return (
    <ol className={`grid md:grid-cols-2 md:gap-x-16 ${className}`}>
      {items.map((item, i) => (
        <li
          key={item.title}
          className="rule-t grid grid-cols-[2.75rem_1fr] gap-3 py-6 md:py-8"
        >
          <span aria-hidden="true" className="f-data pt-1.5 text-[1rem] text-red">
            {String(i + 1).padStart(2, "0")}
          </span>
          <div>
            <p className="t-subhead">{item.title}</p>
            <p className="muted mt-2 text-[1rem] leading-snug">{item.detail}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
