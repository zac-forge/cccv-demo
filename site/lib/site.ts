/* ------------------------------------------------------------------
   Site facts and host configuration, in one place so the footer, the
   structured data and the metadata can never disagree. This module is
   what becomes the Sanity `siteSettings` fetch later; nothing else
   should hard-code an address or a phone number.

   Facts are the church's own, from ccconejovalley.com. See
   CONTENT-SOURCES.md for provenance, including the two phone numbers
   on their live site and why this one was chosen.
   ------------------------------------------------------------------ */

/* Build-time environment. All NEXT_PUBLIC_*, inlined by the static export.

   NEXT_PUBLIC_SITE_URL                 Canonical origin. Unset until
                                        prelaunch, so every local build and
                                        the Vercel demo resolve to the demo
                                        host and stay unindexed.
   NEXT_PUBLIC_CF_BEACON_TOKEN          Cloudflare Web Analytics. Unset means
                                        no script is emitted at all.
   NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION Search Console ownership tag. Same. */
export const PRODUCTION_URL = "https://ccconejovalley.com";
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://cccv-one.vercel.app"
).replace(/\/$/, "");

/* The demo carries the church's name and real copy. A search result
   pointing at it instead of ccconejovalley.com sends people to the wrong
   place, so only the real host is ever indexable. */
export const INDEXABLE = SITE_URL === PRODUCTION_URL;

export const CF_BEACON_TOKEN = process.env.NEXT_PUBLIC_CF_BEACON_TOKEN;
export const GOOGLE_SITE_VERIFICATION =
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

export const CHURCH = {
  name: "Calvary Chapel Conejo Valley",
  /* /home and the footer of every page. Verbatim, including the (831). */
  phone: "(831) 428-2214",
  phoneHref: "tel:+18314282214",
  /* The campus. The Newbury Park mailing address is on /give only and is
     still an open question (docs/00-START-HERE.md). */
  address: {
    street: "101 N. Skyline Dr.",
    city: "Thousand Oaks",
    state: "CA",
    zip: "91362",
  },
  /* Their own links, from /home. */
  social: {
    youtube: "https://www.youtube.com/channel/UC3Uw5Cc9fEd5v724Xr6E1KQ",
    facebook: "https://www.facebook.com/CCConejoValley",
    rumble: "https://rumble.com/c/c-2366012",
  },
};

/* Homepage only, once. A single node typed as both, because schema.org's
   Church descends from PlaceOfWorship rather than LocalBusiness, and
   Google's local rich result wants a LocalBusiness subtype. LocalBusiness
   is already an Organization, so logo and sameAs sit here rather than on
   a second node. Weekly services are deliberately not Events: Google
   wants a unique URL per occurrence. */
export function churchJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["Church", "LocalBusiness"],
    "@id": `${SITE_URL}/#church`,
    name: CHURCH.name,
    url: SITE_URL,
    telephone: "+1-831-428-2214",
    address: {
      "@type": "PostalAddress",
      streetAddress: CHURCH.address.street,
      addressLocality: CHURCH.address.city,
      addressRegion: CHURCH.address.state,
      postalCode: CHURCH.address.zip,
      addressCountry: "US",
    },
    image: `${SITE_URL}/site/hero.webp`,
    logo: `${SITE_URL}/logotype.svg`,
    sameAs: [
      CHURCH.social.youtube,
      CHURCH.social.facebook,
      CHURCH.social.rumble,
    ],
  };
}
