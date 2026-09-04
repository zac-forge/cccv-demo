export type IndexItem = { id: string; label: string };

/* A contents strip for a long page: plain anchors to the sections below.
   Rows on a phone, one rule-divided strip from lg. The html scroll-padding
   clears the sticky header, and reduced motion turns the smooth scroll off
   (globals.css). */
export default function SectionIndex({
  items,
  label = "On this page",
  className = "",
}: {
  items: ReadonlyArray<IndexItem>;
  label?: string;
  className?: string;
}) {
  return (
    <nav aria-label={label} className={`section-index rule-t rule-b ${className}`}>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <a href={`#${item.id}`} className="section-index-link">
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
