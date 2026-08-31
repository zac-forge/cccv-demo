"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

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
  const [active, setActive] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // The marker IS the hero logotype. The header only asserts the
    // identity once the hero's own mark has left the viewport, so the two
    // never read as competing logos.
    const node = document.getElementById("hero-sentinel");
    if (!node) return;

    // Fires when the mark is fully out of view. No scroll listener.
    const io = new IntersectionObserver(
      ([entry]) => {
        setSolid(!entry.isIntersecting && entry.boundingClientRect.top <= 0);
      },
      { threshold: 0 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  // ---- Scroll-spy ----
  // A thin band across the middle of the viewport. Whichever section is
  // crossing it owns the nav, so the marker tracks what you are actually
  // reading rather than whatever happens to be on screen. Observer, not a
  // scroll handler, to stay consistent with the rest of the motion runtime.
  useEffect(() => {
    const sections = NAV.map((item) =>
      document.querySelector<HTMLElement>(item.href)
    ).filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((section) => io.observe(section));
    return () => io.disconnect();
  }, []);

  const close = useCallback((returnFocus: boolean) => {
    setOpen(false);
    if (returnFocus) burgerRef.current?.focus();
  }, []);

  // ---- Open menu: escape, focus trap, scroll lock ----
  // Only mounted while the panel is open, so nothing is listening the rest
  // of the time.
  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close(true);
        return;
      }
      if (event.key !== "Tab") return;

      // The burger is part of the loop: it is how you get back out.
      const focusable = [
        burgerRef.current,
        ...Array.from(
          panelRef.current?.querySelectorAll<HTMLElement>("a[href]") ?? []
        ),
      ].filter((node): node is HTMLElement => node !== null);
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a[href]")?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, close]);

  // The panel needs an opaque ground, so an open menu forces the solid state.
  const isSolid = solid || open;

  return (
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
            <a
              key={item.label}
              href={item.href}
              className="navlink"
              data-active={active === item.href}
              aria-current={active === item.href ? "location" : undefined}
            >
              {item.label}
            </a>
          ))}
          <a href={GIVE_HREF} className="navlink navlink-give">
            Give
          </a>
        </nav>

        <button
          ref={burgerRef}
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
        ref={panelRef}
        data-open={open}
        className="mobile-panel lg:hidden"
      >
        <div className="mobile-panel-inner bg-stock">
          <nav aria-label="Primary, mobile" className="shell flex flex-col py-2">
            {NAV.map((item, i) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => close(false)}
                style={{ "--i": i } as CSSProperties}
                className="border-b border-ink/15 py-3.5 text-[1.0625rem] font-medium text-ink last:border-b-0"
              >
                {item.label}
              </a>
            ))}
            <a
              href={GIVE_HREF}
              onClick={() => close(false)}
              style={{ "--i": NAV.length } as CSSProperties}
              className="navlink navlink-give my-5 self-start"
            >
              Give
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
