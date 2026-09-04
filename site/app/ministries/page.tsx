import type { Metadata } from "next";
import CTABand from "@/components/CTABand";
import MinistryGrid from "@/components/MinistryGrid";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Ministries",
  description:
    "Foundations of Faith, Evangelism & Discipleship, Men, Women, Children, Youth, Young Adults and Marriage: eight studies and fellowships at Calvary Chapel Conejo Valley.",
  alternates: { canonical: "/ministries" },
};

/* The eight handbills at full size. Their /ministries page is five
   images and no copy, so the lede here is the homepage's own line. */
export default function Ministries() {
  return (
    <main id="main">
      <PageHeader
        field="field-salt"
        trail={[{ label: "Ministries", href: "/ministries" }]}
        title="Somewhere to grow, whoever you are"
        lede={
          <p>Eight studies and fellowships, meeting through the week on campus.</p>
        }
      />
      <section aria-label="All ministries" className="field-salt pb-[clamp(5rem,8vw,7rem)]">
        <div className="shell">
          <MinistryGrid />
        </div>
      </section>
      <CTABand field="field-stock" />
    </main>
  );
}
