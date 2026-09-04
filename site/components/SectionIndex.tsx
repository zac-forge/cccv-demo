export type IndexItem = { id: string; label: string };

/* A printed contents line for a long page: numbered entries that jump
   to the sections below. Rows on a phone, one rule-divided strip from
   lg. Plain anchors: the html scroll-padding clears the sticky header,
   and reduced motion turns the smooth scroll off (globals.css). */
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
      <ol>
        {items.map((item, i) => (
          <li key={item.id}>
            <a href={`#${item.id}`} className="section-index-link">
              <span aria-hidden="true" className="section-index-n f-data">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{item.label}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
