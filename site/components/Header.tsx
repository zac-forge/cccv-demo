"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

// `section` is the homepage band each item summarises, and exists only
// for the scroll-spy there. Everywhere else the href is the whole story.
const NAV = [
  { label: "Visit", href: "/new", section: "new-here" },
  { label: "Messages", href: "/watch", section: "message" },
  { label: "Ministries", href: "/ministries", section: "ministries" },
  { label: "Events", href: "/events", section: "events" },
  { label: "Connect", href: "/connect", section: "connect" },
  { label: "About", href: "/about", section: null },
];

const GIVE_HREF = "/give";

export default function Header() {
  const pathname = usePathname();
  // Only the homepage has a hero to sit over. Every other page starts
  // solid — in the prerendered HTML, not after hydration — so the nav can
  // never paint salt on salt while waiting for an observer that has
  // nothing to watch.
  const isHome = pathname === "/";
  const [open, setOpen] = useState(false);
  const [heroGone, setHeroGone] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isHome) return;
    // The marker IS the hero logotype. The header only asserts the
    // identity once the hero's own mark has left the viewport, so the two
    // never read as competing logos.
    const node = document.getElementById("hero-sentinel");
    if (!node) return;

    // Fires when the mark is fully out of view. No scroll listener.
    const io = new IntersectionObserver(
      ([entry]) => {
        setHeroGone(!entry.isIntersecting && entry.boundingClientRect.top <= 0);
      },
      { threshold: 0 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [isHome]);

  // ---- Scroll-spy, homepage only ----
  // A thin band across the middle of the viewport. Whichever section is
  // crossing it owns the nav, so the marker tracks what you are actually
  // reading rather than whatever happens to be on screen. Observer, not a
  // scroll handler, to stay consistent with the rest of the motion runtime.
  useEffect(() => {
    if (!isHome) return;
    const sections = NAV.map((item) =>
      item.section ? document.getElementById(item.section) : null
    ).filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((section) => io.observe(section));
    return () => io.disconnect();
  }, [isHome]);

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
  const isSolid = !isHome || heroGone || open;
  // Section ids only mean something on the homepage; a stale marker must
  // not follow a client-side navigation onto another page.
  const current = isHome ? active : null;

  return (
    <header className="site-header sticky top-0 z-50" data-solid={isSolid}>
      <div className="shell flex h-[68px] items-center justify-between gap-6 md:h-[96px]">
        {/* Held in the DOM at constant size so nav never shifts when it
            fades in. Hidden from tab order while it is invisible. */}
        <Link
          href="/"
          className="site-logo shrink-0"
          aria-label="Calvary Chapel Conejo Valley, home"
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
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {NAV.map((item) => {
            // On the homepage the marker follows the scroll; elsewhere it
            // marks the section the current page belongs to.
            const onPage = !isHome && pathname === item.href;
            const isCurrent = isHome
              ? item.section !== null && current === item.section
              : pathname.startsWith(item.href);
            return (
              <Link
                key={item.label}
                href={item.href}
                className="navlink"
                data-active={isCurrent}
                aria-current={onPage ? "page" : isCurrent ? "location" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
          <Link href={GIVE_HREF} className="navlink navlink-give">
            Give
          </Link>
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
              <Link
                key={item.label}
                href={item.href}
                onClick={() => close(false)}
                style={{ "--i": i } as CSSProperties}
                className="border-b border-ink/15 py-3.5 text-[1.0625rem] font-medium text-ink last:border-b-0"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={GIVE_HREF}
              onClick={() => close(false)}
              style={{ "--i": NAV.length } as CSSProperties}
              className="navlink navlink-give my-5 self-start"
            >
              Give
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
