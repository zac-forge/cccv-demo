"use client";

import { useEffect, useState } from "react";

const NAV = [
  { label: "New Here", href: "#new-here" },
  { label: "Watch", href: "#message" },
  { label: "Ministries", href: "#ministries" },
  { label: "Events", href: "#events" },
  { label: "Connect", href: "#connect" },
  { label: "About", href: "#about" },
];

// Real giving page is https://ccconejovalley.com/give — kept inert for the
// demo so a click never leaves the pitch.
const GIVE_HREF = "#";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    // Marker sits at the foot of the hero, rendered by the page.
    const node = document.getElementById("hero-sentinel");
    if (!node) return;

    // Watch a 1px marker at the foot of the hero. No scroll listener.
    const io = new IntersectionObserver(
      ([entry]) => {
        setSolid(!entry.isIntersecting && entry.boundingClientRect.top <= 0);
      },
      { threshold: 0 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  // The panel needs an opaque ground, so an open menu forces the solid state.
  const isSolid = solid || open;

  return (
    <>
      <div className="band-dark bg-ink text-salt/85">
        <p className="shell py-2.5 text-center text-[0.6875rem] leading-snug tracking-[0.06em] sm:text-xs">
          Design concept for Calvary Chapel Conejo Valley. Not the live site.
        </p>
      </div>

      <header className="site-header sticky top-0 z-50" data-solid={isSolid}>
        <div className="shell flex h-[68px] items-center justify-between gap-6 md:h-[96px]">
          {/* Held in the DOM at constant size so nav never shifts when it
              fades in. Hidden from tab order while it is invisible. */}
          <a
            href="#top"
            className="site-logo shrink-0"
            aria-label="Calvary Chapel Conejo Valley, back to top"
            tabIndex={isSolid ? 0 : -1}
            aria-hidden={!isSolid}
          >
            <img
              src="/logotype-trim.svg"
              alt="Calvary Chapel Conejo Valley"
              width={1601}
              height={611}
              className="h-11 w-auto md:h-[68px]"
            />
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
            {NAV.map((item) => (
              <a key={item.label} href={item.href} className="navlink">
                {item.label}
              </a>
            ))}
            <a href={GIVE_HREF} className="navlink navlink-give">
              Give
            </a>
          </nav>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="burger lg:hidden"
            data-open={open}
          >
            <span className="burger-box" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </button>
        </div>

        <div
          id="mobile-nav"
          hidden={!open}
          className="border-t border-ink/85 bg-stock lg:hidden"
        >
          <nav aria-label="Primary, mobile" className="shell flex flex-col py-2">
            {NAV.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-ink/15 py-3.5 text-[1.0625rem] font-medium text-ink last:border-b-0"
              >
                {item.label}
              </a>
            ))}
            <a
              href={GIVE_HREF}
              onClick={() => setOpen(false)}
              className="navlink navlink-give my-5 self-start"
            >
              Give
            </a>
          </nav>
        </div>
      </header>
    </>
  );
}
