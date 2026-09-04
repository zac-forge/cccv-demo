import Link from "next/link";
import { SITE_URL } from "@/lib/site";

export type Crumb = { label: string; href: string };

/* Where the page sits, as a printed running head rather than a widget.
   Home is implicit. The last crumb is the current page and is not a
   link. Also the one place BreadcrumbList is emitted, so every interior
   page carries it without the layout needing to know the route. */
export default function Breadcrumb({ trail }: { trail: Crumb[] }) {
  const items: Crumb[] = [{ label: "Home", href: "/" }, ...trail];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.label,
      item: `${SITE_URL}${crumb.href}`,
    })),
  };

  return (
    <nav aria-label="Breadcrumb">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ol className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[0.8125rem] leading-snug">
        {items.map((crumb, i) => {
          const last = i === items.length - 1;
          return (
            <li key={crumb.href} className="flex items-center gap-x-2.5">
              {i > 0 && (
                <span aria-hidden="true" className="muted">
                  /
                </span>
              )}
              {last ? (
                <span aria-current="page">{crumb.label}</span>
              ) : (
                <Link
                  href={crumb.href}
                  className="muted underline-offset-4 hover:underline"
                >
                  {crumb.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
