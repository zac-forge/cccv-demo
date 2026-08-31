import type { Metadata } from "next";
import { Fraunces, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import Motion from "./Motion";

// Runs before first paint, so nothing ever flashes hidden. Motion is
// opt-in: without this attribute every reveal state in globals.css is
// inert and the static page renders exactly as approved. That covers
// reduced motion, JS disabled, and any script failure.
const ARM_MOTION = `try{if(window.matchMedia&&!matchMedia('(prefers-reduced-motion: reduce)').matches&&'IntersectionObserver'in window){document.documentElement.dataset.motion='on'}}catch(e){}`;

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  axes: ["SOFT", "WONK", "opsz"],
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-hanken",
});

const DESCRIPTION =
  "A design concept for Calvary Chapel Conejo Valley in Thousand Oaks, California. A demonstration, not the church's live site.";

export const metadata: Metadata = {
  metadataBase: new URL("https://cccv-one.vercel.app"),
  title: "Calvary Chapel Conejo Valley — design concept",
  description: DESCRIPTION,
  // This demo must never be indexed. It carries the church's name and
  // real copy, so a search result pointing here instead of
  // ccconejovalley.com would send people to the wrong place.
  robots: { index: false, follow: false },
  openGraph: {
    title: "Calvary Chapel Conejo Valley — design concept",
    description: DESCRIPTION,
    type: "website",
    images: [
      {
        url: "/site/hero.png",
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
        {children}
        <Motion />
      </body>
    </html>
  );
}
