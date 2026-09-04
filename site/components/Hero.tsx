"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { HERO_SLIDES } from "@/lib/content";
import { verse } from "@/lib/scripture";

/* The hero, as a poster that turns — only when someone turns it. There is
   no autoplay: the slide changes on a bar, an arrow button or an arrow
   key, and otherwise slide 1 stands exactly as approved.

   The logotype sits above the slide stack and never moves, which is what
   lets the header keep watching it as the sentinel. Art layers crossfade
   behind, text stacks crossfade in front, and the stack is sized by its
   tallest slide so the block never jumps. Every slide is in the DOM;
   inactive ones are visibility:hidden, so they are out of the tab order
   and the accessibility tree without a second mechanism. */
export default function Hero() {
  const count = HERO_SLIDES.length;
  const [index, setIndex] = useState(0);
  const go = (step: number) => setIndex((i) => (i + step + count) % count);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Welcome"
      className="field-ink relative isolate -mt-[69px] flex min-h-[max(600px,92svh)] items-end overflow-hidden pb-14 pt-[69px] md:-mt-[97px] md:min-h-[max(680px,92vh)] md:items-center md:pb-14 md:pt-[97px]"
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") {
          e.preventDefault();
          go(1);
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          go(-1);
        }
      }}
    >
      {/* ---- Art, one layer per slide ---- */}
      {HERO_SLIDES.map((slide, i) =>
        slide.art === "sunrise" ? (
          <div
            key={slide.id}
            className="hero-art"
            data-active={i === index}
            aria-hidden="true"
          >
            {/* One plane at every width. Mobile zooms and lifts the crop so
                the sun clears the type block instead of sitting behind it;
                desktop keeps its approved 105% / centred crop. */}
            <Image
              src="/site/hero.webp"
              alt=""
              fill
              priority={i === 0}
              sizes="100vw"
              className="hero-img -translate-y-[8%] scale-[1.25] object-cover md:translate-y-0 md:scale-105"
            />
            <div className="hero-scrim absolute inset-0" />
          </div>
        ) : (
          <div
            key={slide.id}
            className="hero-art bg-blue"
            data-active={i === index}
            aria-hidden="true"
          >
            {/* The sunburst, mirrored into the top-right; the scrim keeps
                the type zone clean blue at every width. */}
            <Image
              src="/site/sun-rays.webp"
              alt=""
              width={1400}
              height={525}
              className="hero-rays"
            />
            <div className="hero-rays-scrim absolute inset-0" />
          </div>
        )
      )}
      {/* Protects the nav row, which sits over the art at every width. */}
      <div
        className="hero-topscrim absolute inset-x-0 top-0 -z-10 h-[228px]"
        aria-hidden="true"
      />

      {/* Not a centred container: the block is pinned left and the
          headline is allowed to run past the mark above it. */}
      <div className="relative w-full max-w-[1320px] px-[clamp(24px,5vw,64px)] md:mx-auto">
        <img
          id="hero-sentinel"
          src="/logotype-white-trim.svg"
          alt="Calvary Chapel Conejo Valley"
          width={1601}
          height={611}
          className="h-auto w-[52vw] max-w-[208px] md:w-[30vw] md:max-w-[420px]"
        />

        <div className="hero-stack mt-6 md:mt-24">
          {HERO_SLIDES.map((slide, i) => {
            const Heading = i === 0 ? "h1" : "h2";
            return (
              <div
                key={slide.id}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${count}`}
                className="hero-slide"
                data-active={i === index}
              >
                <Heading className="f-display t-hero max-w-[8ch] md:max-w-[11ch]">
                  {slide.title}
                </Heading>

                <div className="mt-7 flex flex-col gap-7 md:mt-12 md:flex-row md:items-end md:gap-16">
                  {slide.quote ? (
                    // NKJV, verbatim, not fitted to the layout.
                    <figure className="max-w-[34ch] border-l-2 border-yellow pl-5">
                      <blockquote className="t-lede muted">
                        &ldquo;{verse(slide.quote)}&rdquo;
                      </blockquote>
                      <figcaption className="t-eyebrow mt-3 text-yellow">
                        {slide.quote}
                      </figcaption>
                    </figure>
                  ) : (
                    <p className="t-lede muted max-w-[34ch] border-l-2 border-yellow pl-5">
                      {slide.lede}
                    </p>
                  )}

                  <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-stretch md:pb-1">
                    {slide.ctas.map((cta) =>
                      cta.href.startsWith("#") ? (
                        <a
                          key={cta.label}
                          href={cta.href}
                          className={`btn btn-${cta.variant}`}
                        >
                          {cta.label}
                        </a>
                      ) : (
                        <Link
                          key={cta.label}
                          href={cta.href}
                          className={`btn btn-${cta.variant}`}
                        >
                          {cta.label}
                        </Link>
                      )
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ---- Controls. Printed marks, not dots: one bar per slide, the
            current one yellow, and two square buttons. ---- */}
        {count > 1 && (
          <div className="hero-controls mt-10 md:mt-14">
            <div
              className="flex items-center"
              role="group"
              aria-label="Choose a slide"
            >
              {HERO_SLIDES.map((slide, i) => (
                <button
                  key={slide.id}
                  type="button"
                  className="hero-dot"
                  aria-label={`Slide ${i + 1}: ${slide.title}`}
                  aria-current={i === index}
                  onClick={() => setIndex(i)}
                >
                  <span aria-hidden="true" />
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="hero-btn"
                aria-label="Previous slide"
                onClick={() => go(-1)}
              >
                <span aria-hidden="true">&larr;</span>
              </button>
              <button
                type="button"
                className="hero-btn"
                aria-label="Next slide"
                onClick={() => go(1)}
              >
                <span aria-hidden="true">&rarr;</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
