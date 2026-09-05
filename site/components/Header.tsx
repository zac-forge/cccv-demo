"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import type {
  CSSProperties,
  FocusEvent,
  KeyboardEvent as ReactKeyboardEvent,
  MouseEvent,
} from "react";
import type { NavItem } from "@/lib/nav";

const GIVE_HREF = "/give";

// Hover intent for the subnav bands: a pointer crossing the nav does not
// open one, and a short drop between the label and the band does not
// close one. The CSS carries the same two numbers.
const BAND_OPEN_MS = 140;
const BAND_CLOSE_MS = 160;

/* The nav tree comes from lib/nav.ts by way of the layout, so the
   content file it reads stays on the server. Items with children carry
   a subnav: an ink band hung from the header's rule from lg up, an index
   line under the item in the phone menu. */
export default function Header({ nav }: { nav: NavItem[] }) {
  const pathname = usePathname();
  // Only the homepage has a hero to sit over. Every other page starts
  // solid — in the prerendered HTML, not after hydration — so the nav can
  // never paint salt on salt while waiting for an observer that has
  // nothing to watch.
  const isHome = pathname === "/";
  const [open, setOpen] = useState(false);
  // A subnav band is open: hover or focus within an item that has one.
  // Tracked so the transparent homepage header goes solid under it, on
  // the same short delays the band itself opens and closes with, so a
  // pointer crossing the nav does not flash the header.
  const [bandOpen, setBandOpen] = useState(false);
  const bandTimer = useRef<number | null>(null);
  const setBand = useCallback((next: boolean, delay: number) => {
    if (bandTimer.current !== null) window.clearTimeout(bandTimer.current);
    bandTimer.current = window.setTimeout(() => setBandOpen(next), delay);
  }, []);
  useEffect(
    () => () => {
      if (bandTimer.current !== null) window.clearTimeout(bandTimer.current);
    },
    []
  );
  // A click in a band closes it until the pointer leaves the item, so it
  // does not hang open over the page it just navigated to.
  const [closed, setClosed] = useState<string | null>(null);
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
    const sections = nav
      .map((item) => (item.section ? document.getElementById(item.section) : null))
      .filter((el): el is HTMLElement => el !== null);
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
  }, [isHome, nav]);

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

  // A subnav panel opens on hover or on keyboard focus within its item
  // (CSS). Escape drops focus, which is what closes it.
  const onNavKey = (event: ReactKeyboardEvent<HTMLElement>) => {
    if (event.key === "Escape") (event.target as HTMLElement).blur();
  };

  // The phone panel and a subnav band both need the header solid beneath
  // them, so either forces the solid state.
  const isSolid = !isHome || heroGone || open || bandOpen;
  // Section ids only mean something on the homepage; a stale marker must
  // not follow a client-side navigation onto another page.
  const current = isHome ? active : null;
  const onChild = (href: string) => (!isHome && pathname === href ? "page" : undefined);

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

        <nav
          aria-label="Primary"
          className="hidden h-full items-center gap-8 lg:flex"
          onKeyDown={onNavKey}
        >
          <ul className="flex h-full items-center gap-8">
            {nav.map((item) => {
              // On the homepage the marker follows the scroll; elsewhere it
              // marks the section the current page belongs to.
              const onPage = !isHome && pathname === item.href;
              const isCurrent = isHome
                ? item.section !== null && current === item.section
                : pathname.startsWith(item.href);
              // The band itself opens in CSS; these only tell the header.
              // Blur within the item (link to link) is not a close.
              const band = item.children
                ? {
                    onMouseEnter: () => setBand(true, BAND_OPEN_MS),
                    onMouseLeave: () => {
                      setBand(false, BAND_CLOSE_MS);
                      setClosed(null);
                    },
                    onFocus: () => setBand(true, 0),
                    onBlur: (event: FocusEvent<HTMLLIElement>) => {
                      if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                        setBand(false, 0);
                      }
                    },
                    onClick: (event: MouseEvent<HTMLLIElement>) => {
                      if ((event.target as HTMLElement).closest("a")) {
                        setClosed(item.href);
                        (event.target as HTMLElement).blur();
                      }
                    },
                  }
                : {};
              return (
                <li
                  key={item.label}
                  className="nav-item"
                  data-closed={closed === item.href}
                  {...band}
                >
                  <Link
                    href={item.href}
                    className="navlink"
                    data-active={isCurrent}
                    aria-current={onPage ? "page" : isCurrent ? "location" : undefined}
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    // The subnav as a band, not a box: the header's full width
                    // on ink, the section as a yellow running head, the pages
                    // as a running line in the display face, each at its own
                    // width. The page openings' language, so the menu is the
                    // site's.
                    <div className="nav-band field-ink">
                      <div className="shell grid grid-cols-12 items-baseline gap-16">
                        <p className="t-eyebrow col-span-2 text-yellow">{item.label}</p>
                        {/* Up to five pages run as one line. More than that
                            (Ministries, nine) sets as an index in columns
                            read top to bottom, each column at its own width,
                            so the list aligns and no name ever breaks: a
                            running line of nine bold labels had no structure
                            and read as a jumble (Drew, September 4). */}
                        <ul
                          className={`nav-band-list col-span-10 ${
                            item.children.length > 5 ? "nav-band-index" : ""
                          }`}
                          style={
                            item.children.length > 5
                              ? ({ "--rows": Math.ceil(item.children.length / 3) } as CSSProperties)
                              : undefined
                          }
                          aria-label={`${item.label} pages`}
                        >
                          {item.children.map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                className="nav-band-link"
                                aria-current={onChild(child.href)}
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
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

      {/* The phone menu: a full-screen ink panel fixed under the bar, the
          desktop band's language at phone scale. Sections in the display
          face, each section's pages as a two-column index beneath so
          Ministries reads as a list instead of a wrapping jumble (the
          stock dropdown with grey sublinks was "terrible", Drew,
          September 4). Give and the service times at the foot, which is
          what a phone visitor came for. Scrolls inside itself on a short
          phone; the body is locked while it is open. */}
      <div
        id="mobile-nav"
        ref={panelRef}
        data-open={open}
        className="mobile-panel lg:hidden"
      >
        <nav aria-label="Primary, mobile" className="shell flex min-h-full flex-col pt-4 pb-10">
          <ul className="flex flex-col">
            {nav.map((item, i) => (
              // `--i` on the section staggers every link in it, parent and
              // children alike, as one beat.
              <li
                key={item.label}
                style={{ "--i": i } as CSSProperties}
                className="mobile-section"
              >
                <Link
                  href={item.href}
                  onClick={() => close(false)}
                  className="mobile-link"
                  aria-current={onChild(item.href)}
                >
                  {item.label}
                </Link>
                {item.children && (
                  // The section's own page is the row above, so it is skipped.
                  <ul className="mobile-index">
                    {item.children.filter((child) => child.href !== item.href).map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          onClick={() => close(false)}
                          className="mobile-sublink"
                          aria-current={onChild(child.href)}
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <div style={{ "--i": nav.length } as CSSProperties} className="mobile-foot">
            <Link href={GIVE_HREF} onClick={() => close(false)} className="navlink navlink-give">
              Give
            </Link>
            {/* Their times, /home; the same line /watch prints. */}
            <p className="f-data mobile-times">Sundays 11 am &middot; Wednesdays 7 pm</p>
          </div>
        </nav>
      </div>
    </header>
  );
}
