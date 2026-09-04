/* Native details/summary, so it is keyboard and screen-reader ready
   without a line of script. No animation: the mark flips from + to −
   and the content appears. For instructions a visitor may want, never
   for anything they need before they can act. */
export default function Disclosure({
  summary,
  children,
  className = "",
}: {
  summary: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <details className={`disclosure ${className}`}>
      <summary className="disclosure-summary">
        <span>{summary}</span>
        <span aria-hidden="true" className="disclosure-mark f-data" />
      </summary>
      <div className="disclosure-body">{children}</div>
    </details>
  );
}
