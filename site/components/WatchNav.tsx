import Link from "next/link";
import { WATCH_NAV } from "@/lib/nav";

/* The Watch family, as a printed running strip under a page opening:
   uppercase micro type, one rule above and below, the current page
   carrying the field's accent as its rule. Real routes only, from the
   same list the header's Messages subnav prints. Used on /watch and
   /watch/sermons; the other two pages take it when they are reviewed. */
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
        {WATCH_NAV.map((item) => (
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
