"use client";

import { useEffect } from "react";

/**
 * The whole motion runtime: one IntersectionObserver for editorial
 * entrances, and one rAF-coalesced scroll handler for the shallow
 * environmental drift that expresses the background plane.
 *
 * Nothing here decides whether motion is allowed — the inline script in
 * layout.tsx does that before first paint, and this bails unless it set
 * data-motion="on". So reduced-motion and no-JS users never reach any of
 * it, and no element is ever left hidden waiting for React.
 *
 * No React state is touched on scroll; the drift writes straight to
 * style.translate, which is composited.
 */
export default function Motion() {
  useEffect(() => {
    const root = document.documentElement;
    if (root.dataset.motion !== "on") return;

    // ---- Editorial entrances. Once each, then forget the element. ----
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      },
      { threshold: 0.01, rootMargin: "0px 0px -10% 0px" }
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));

    // ---- Background plane drift. Desktop only. ----
    const drifters = Array.from(
      document.querySelectorAll<HTMLElement>("[data-drift]")
    );
    const wide = window.matchMedia("(min-width: 1024px)");
    const AMPLITUDE = 14; // px each way, so ~28px across a full crossing
    let frame = 0;

    const paint = () => {
      frame = 0;
      const vh = window.innerHeight;
      for (const el of drifters) {
        const box = el.getBoundingClientRect();
        if (box.bottom < 0 || box.top > vh) continue;
        // -1 when the element sits below the fold, +1 when it has left
        // above it. Clamped, so the travel can never exceed AMPLITUDE.
        const progress =
          (box.top + box.height / 2 - vh / 2) / (vh / 2 + box.height / 2);
        const clamped = Math.max(-1, Math.min(1, progress));
        el.style.translate = `0 ${(clamped * AMPLITUDE).toFixed(2)}px`;
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };

    const start = () => {
      if (!wide.matches || drifters.length === 0) return;
      paint();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll, { passive: true });
    };
    const stop = () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      for (const el of drifters) el.style.translate = "";
    };
    const restart = () => {
      stop();
      start();
    };

    start();
    wide.addEventListener("change", restart);

    return () => {
      io.disconnect();
      stop();
      wide.removeEventListener("change", restart);
    };
  }, []);

  return null;
}
