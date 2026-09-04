import Link from "next/link";
import CTABand from "@/components/CTABand";
import PageHeader from "@/components/PageHeader";
import Verse from "@/components/Verse";

/* Branded: a poster on ink with the empty pier, the body on stock.
   Seventy old URLs are moving, so any redirect that was missed lands
   here; the band below puts service times one tap away even from a
   dead link. The copy is mine, warm rather than blunt, and the lost
   sheep is the verse for a lost page (Drew, September 4). */
export default function NotFound() {
  return (
    <main id="main">
      <PageHeader
        poster
        art="pier"
        field="field-ink"
        title="Sorry, that page has wandered off."
        lede={<p>It may have moved, or the address has a typo in it.</p>}
        aside={<Verse reference="Luke 15:4" tone="dark" layout="quote" />}
      />
      <div className="field-stock">
        <div className="shell prose pt-[clamp(3rem,5vw,4.5rem)] pb-[clamp(5rem,8vw,7rem)]">
          <p data-reveal="" className="measure-tight">
            The links below go to the places most people are looking for.
          </p>
          <ul
            data-reveal=""
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
          >
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
