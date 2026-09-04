import Link from "next/link";
import { FOOTER_LINKS } from "@/lib/content";
import { CHURCH, INDEXABLE } from "@/lib/site";

/* The back of a printed programme. One graphic device: the ghosted
   place name, cropped by the top and right edges. Shared by every page,
   so it is rendered once from the root layout. */
export default function Footer() {
  return (
    <footer className="field-blue relative isolate overflow-hidden py-20 md:py-24">
      {/* Environmental type in the space the dove used to occupy: mass and
          balance, not a second heading. */}
      <span
        aria-hidden="true"
        data-drift=""
        className="ghost-word ghost-on-blue f-display right-[-3vw] top-[-2rem] hidden text-right text-[clamp(7rem,13vw,15rem)] lg:block"
      >
        Conejo
        <br />
        Valley
      </span>

      <div className="shell relative">
        <img
          src="/logotype-white-trim.svg"
          alt="Calvary Chapel Conejo Valley"
          width={1601}
          height={611}
          className="h-auto w-[64vw] max-w-[420px]"
        />

        <div className="rule-t mt-16 grid gap-12 pt-12 lg:grid-cols-12 lg:gap-16">
          <address className="not-italic leading-relaxed lg:col-span-4">
            {CHURCH.address.street}
            <br />
            {CHURCH.address.city}, {CHURCH.address.state} {CHURCH.address.zip}
            <br />
            <a
              href={CHURCH.phoneHref}
              className="mt-3 inline-block hover:underline"
            >
              {CHURCH.phone}
            </a>
          </address>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-8">
            {FOOTER_LINKS.map((col) => (
              <nav key={col.heading} aria-label={col.heading}>
                <h2 className="t-eyebrow t-eyebrow-onblue">{col.heading}</h2>
                <ul className="mt-5 space-y-1 lg:space-y-3">
                  {col.links.map((link) => {
                    /* Give is the one action in a list of destinations.
                       A yellow rule echoes the nav chip without dropping a
                       filled block into a link column and breaking its
                       rhythm. */
                    const className = `inline-block py-2 text-[0.9375rem] underline-offset-4 lg:inline lg:py-0 ${
                      link.label === "Give"
                        ? "footer-give"
                        : "muted hover:text-salt hover:underline"
                    }`;
                    return (
                      <li key={link.label}>
                        {link.external ? (
                          <a
                            href={link.href}
                            className={className}
                            target="_blank"
                            rel="noopener"
                          >
                            {link.label}
                          </a>
                        ) : (
                          <Link href={link.href} className={className}>
                            {link.label}
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        {/* Back-of-the-sleeve publisher line. Identity and location only,
            both already verified elsewhere on the page. */}
        <span
          aria-hidden="true"
          className="sign-off bottom-0 right-0 hidden text-right lg:block"
        >
          Calvary Chapel
          <br />
          Conejo Valley
          <br />
          {CHURCH.address.city}, {CHURCH.address.state}
        </span>

        {/* The demo host only. On ccconejovalley.com this is the live site
            and the line would be a lie. */}
        {!INDEXABLE && (
          <p className="rule-t muted mt-14 pt-14 text-[0.8125rem]">
            Design concept for Calvary Chapel Conejo Valley. Not the live site.
            Copy is drawn from ccconejovalley.com.
          </p>
        )}
      </div>
    </footer>
  );
}
