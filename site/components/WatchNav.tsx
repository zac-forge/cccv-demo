import Link from "next/link";

/* The Watch family, as a printed running strip under a page opening:
   uppercase micro type, one rule above and below, the current page
   carrying the field's accent as its rule. Real routes only. Used on
   /watch for now; the other three pages take it when they are reviewed. */
const ITEMS = [
  { label: "Latest", href: "/watch" },
  { label: "Livestream", href: "/watch/live" },
  { label: "Sermons", href: "/watch/sermons" },
  { label: "Radio", href: "/watch/radio" },
];

export default function WatchNav({
  current,
  className = "",
}: {
  current: string;
  className?: string;
}) {
  return (
    <nav aria-label="Watch and listen" className={`watch-nav ${className}`}>
      <ul>
        {ITEMS.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={item.href === current ? "page" : undefined}
              className="watch-nav-link"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
