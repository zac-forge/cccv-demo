import Link from "next/link";
import CTABand from "@/components/CTABand";
import PageHeader from "@/components/PageHeader";

/* Branded, on stock. Seventy old URLs are moving, so any redirect that
   was missed lands here; the band below puts service times one tap away
   even from a dead link. */
export default function NotFound() {
  return (
    <main id="main">
      <PageHeader title="There is no page at this address." />
      <div className="field-stock">
        <div className="shell prose pb-[clamp(5rem,8vw,7rem)]">
          <p className="measure-tight">
            It may have moved. The links below go to the places most people are
            looking for.
          </p>
          <ul className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <li>
              <Link href="/" className="btn btn-ink">
                Home
              </Link>
            </li>
            <li>
              <Link href="/new" className="btn btn-outline">
                Service times
              </Link>
            </li>
            <li>
              <Link href="/watch" className="btn btn-outline">
                Watch a message
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <CTABand />
    </main>
  );
}
