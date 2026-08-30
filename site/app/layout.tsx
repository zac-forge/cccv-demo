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

export const metadata: Metadata = {
  title: "Calvary Chapel Conejo Valley — design concept",
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
