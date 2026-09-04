/* An editorial split: the ask on the left (label, headline, copy, the
   primary action), and a detail rail on the right for the practical
   facts that would otherwise sit in paragraphs. Stacks on a phone with
   the ask first and the rail directly under it. */
export default function ActionDetailSection({
  id,
  label,
  title,
  children,
  detail,
  detailTitle,
  className = "",
}: {
  id: string;
  label: string;
  title: string;
  children: React.ReactNode;
  detail: React.ReactNode;
  detailTitle?: string;
  className?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`grid gap-12 lg:grid-cols-12 lg:gap-16 ${className}`}
    >
      <div className="lg:col-span-7">
        <p data-reveal="" className="t-eyebrow text-red">
          {label}
        </p>
        <h2
          id={`${id}-title`}
          data-reveal="clip"
          className="f-display t-section mt-5 max-w-[14ch]"
        >
          <span>{title}</span>
        </h2>
        <div data-reveal="">{children}</div>
      </div>
      <div data-reveal="" data-late="" className="lg:col-span-4 lg:col-start-9">
        {detailTitle && <h3 className="t-card">{detailTitle}</h3>}
        <div className={detailTitle ? "mt-5" : ""}>{detail}</div>
      </div>
    </section>
  );
}
