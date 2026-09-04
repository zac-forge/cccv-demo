import type { Metadata } from "next";
import { Fraunces, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { NAV } from "@/lib/nav";
import Motion from "@/components/Motion";
import {
  CF_BEACON_TOKEN,
  CHURCH,
  GOOGLE_SITE_VERIFICATION,
  INDEXABLE,
  SITE_URL,
} from "@/lib/site";

// Runs before first paint, so nothing ever flashes hidden. Motion is
// opt-in: without this attribute every reveal state in globals.css is
// inert and the static page renders exactly as approved. That covers
// reduced motion, JS disabled, and any script failure.
const ARM_MOTION = `try{if(window.matchMedia&&!matchMedia('(prefers-reduced-motion: reduce)').matches&&'IntersectionObserver'in window){document.documentElement.dataset.motion='on'}}catch(e){}`;

/* The italic is Fraunces' own, not a synthesised slant; first used for
   "Jesus saves." on /new/know-jesus (Drew, September 4). */
const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-fraunces",
  axes: ["SOFT", "WONK", "opsz"],
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-hanken",
});

// The demo host keeps saying so in its title; the real host does not.
const TITLE = INDEXABLE ? CHURCH.name : `${CHURCH.name} — design concept`;

// Service times and address are theirs (/services, /home); "verse by
// verse" is their own description of the teaching (/services).
const DESCRIPTION =
  "Verse-by-verse Bible teaching in Thousand Oaks, California. Sundays at 9 and 11 am, Wednesdays at 7 pm, at 101 N. Skyline Dr.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: `%s · ${CHURCH.name}`,
  },
  description: DESCRIPTION,
  // Only the real host is ever indexable. See lib/site.ts.
  robots: INDEXABLE
    ? { index: true, follow: true }
    : { index: false, follow: false },
  verification: GOOGLE_SITE_VERIFICATION
    ? { google: GOOGLE_SITE_VERIFICATION }
    : undefined,
  openGraph: {
    siteName: CHURCH.name,
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/site/hero.webp",
        width: 1915,
        height: 821,
        alt: "Screenprinted sunrise over the Conejo Valley hills",
      },
    ],
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${hanken.variable}`}
      // The inline script below stamps data-motion before React hydrates,
      // which is the whole point — it has to beat first paint.
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: ARM_MOTION }} />
      </head>
      <body className="grain">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70] focus:bg-ink focus:px-4 focus:py-3 focus:text-salt"
        >
          Skip to content
        </a>

        <Header nav={NAV} />
        {children}
        <Footer />
        <Motion />

        {/* Cloudflare Web Analytics: cookieless, one small deferred script.
            Emitted only when a token exists, so every build until
            prelaunch ships nothing here at all. */}
        {CF_BEACON_TOKEN && (
          <script
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={JSON.stringify({ token: CF_BEACON_TOKEN })}
          />
        )}
      </body>
    </html>
  );
}
