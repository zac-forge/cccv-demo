"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import SermonPlayer from "./SermonPlayer";
import SermonPreview from "./SermonPreview";
import {
  buildTeachings,
  canListen,
  canWatch,
  fmtDate,
  type Index,
  type Teaching,
} from "@/lib/teachings";

/* The library as one page with one player. The featured teaching is in
   the HTML from the build; the index arrives in the browser and becomes
   the library, nine at a time. Choosing a teaching swaps what the one
   media area shows and updates the address (?s=<row id>) in place, so
   every teaching stays shareable without a page per sermon
   (docs/01-build-plan.md §1). A shared link resolves once the index has
   loaded; until then the featured teaching stands in. */

const PAGE = 9;

export default function SermonArchive({ featured }: { featured: Teaching }) {
  const [index, setIndex] = useState<Index | null>(null);
  const [failed, setFailed] = useState(false);
  const [selectedId, setSelectedId] = useState(featured.id);
  const [format, setFormat] = useState<"watch" | "listen">("watch");
  const [shown, setShown] = useState(PAGE);
  const [reachedEnd, setReachedEnd] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const endRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    let alive = true;
    fetch("/sermons.json")
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((data: Index) => {
        if (!alive) return;
        setIndex(data);
        const wanted = new URLSearchParams(window.location.search).get("s");
        if (wanted) setSelectedId(wanted);
      })
      .catch(() => {
        if (alive) setFailed(true);
      });
    return () => {
      alive = false;
    };
  }, []);

  /* The index knows nothing of the featured message's YouTube id; the
     build does. Carry it across so the same teaching plays either way. */
  const teachings = useMemo<Teaching[]>(
    () =>
      index
        ? buildTeachings(index).map((t) =>
            t.ids.includes(featured.id) && !t.youtubeId
              ? { ...t, youtubeId: featured.youtubeId }
              : t
          )
        : [],
    [index, featured]
  );

  const selected: Teaching =
    teachings.find((t) => t.ids.includes(selectedId)) ??
    teachings.find((t) => t.ids.includes(featured.id)) ??
    featured;

  const watchable = canWatch(selected);
  const listenable = canListen(selected);
  const mode: "video" | "audio" | "none" =
    watchable && (format === "watch" || !listenable)
      ? "video"
      : listenable
        ? "audio"
        : "none";

  const select = (t: Teaching) => {
    setSelectedId(t.id);
    setFormat("watch");
    const url = new URL(window.location.href);
    url.searchParams.set("s", t.id);
    window.history.replaceState(null, "", url);
    // Back to the one player. The scroll follows the page's own
    // scroll-behavior, which reduced motion already turns off.
    document.getElementById("player")?.scrollIntoView({ block: "start" });
    titleRef.current?.focus({ preventScroll: true });
  };

  const total = teachings.length;
  const more = () => {
    const next = shown + PAGE;
    setShown(next);
    if (next >= total) setReachedEnd(true);
  };
  useEffect(() => {
    if (reachedEnd) endRef.current?.focus({ preventScroll: true });
  }, [reachedEnd]);

  return (
    <>
      {/* ---- The one media area. Poster, sleeve with audio, or sleeve
              with a note; always the same 16:9 plate so nothing jumps. ---- */}
      <section
        id="player"
        aria-labelledby="now-title"
        className="field-ink pt-[clamp(2.5rem,4vw,3.5rem)] pb-[clamp(3.5rem,6vw,5rem)]"
      >
        <div className="shell grid items-start gap-6 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            {mode === "video" ? (
              <SermonPlayer
                key={selected.id}
                videoId={selected.youtubeId}
                title={selected.title}
              />
            ) : (
              <div className="sermon-plate media-plate aspect-video w-full text-[clamp(1.75rem,3.5vw,3rem)]">
                <span aria-hidden="true">{selected.series}</span>
                {mode === "audio" ? (
                  <audio
                    key={selected.id}
                    controls
                    preload="none"
                    src={selected.audioUrl}
                    aria-label={`Listen: ${selected.title}`}
                    className="w-full"
                  />
                ) : (
                  /* PLACEHOLDER: audio is moving to archive.org; until the
                     index carries those URLs there is nothing to play. */
                  <p className="muted max-w-[32ch] font-[family-name:var(--font-body)] text-[0.9375rem] font-normal leading-snug tracking-normal [font-variation-settings:normal]">
                    This message is being moved to the new archive and will
                    play here soon.
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="lg:col-span-5">
            <p className="t-eyebrow muted">
              {fmtDate(selected.date)}
              {selected.speaker !== "Unknown" ? ` · ${selected.speaker}` : ""}
            </p>
            <h2
              id="now-title"
              ref={titleRef}
              tabIndex={-1}
              className="f-display mt-4 text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.04] tracking-[-0.025em]"
            >
              {selected.name}
            </h2>
            <p className="f-data mt-5 text-[clamp(1.25rem,2vw,1.625rem)] leading-none">
              {selected.passage || selected.series}
            </p>
            {selected.passage && (
              <p className="t-meta muted mt-4">{selected.series}</p>
            )}
            {watchable && listenable && (
              <div role="group" aria-label="Format" className="mt-6 flex gap-7">
                <button
                  type="button"
                  aria-pressed={mode === "video"}
                  onClick={() => setFormat("watch")}
                  className="fmt-choice"
                >
                  Watch
                </button>
                <button
                  type="button"
                  aria-pressed={mode === "audio"}
                  onClick={() => setFormat("listen")}
                  className="fmt-choice"
                >
                  Listen
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ---- The library: nine, then nine more each time. Denser than
              the marketing pages; rows on a phone, three across from md. ---- */}
      <section
        aria-labelledby="library-title"
        className="field-stock pt-[clamp(3rem,5vw,4rem)] pb-[clamp(3.5rem,6vw,5rem)]"
      >
        <div className="shell">
          <div className="rule-b flex flex-col gap-2 pb-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
            <h2
              id="library-title"
              className="f-display text-[clamp(1.875rem,3vw,2.75rem)] leading-[1] tracking-[-0.025em]"
            >
              Teaching library
            </h2>
            <p className="t-meta muted" role="status">
              {index
                ? `${Math.min(shown, total)} of ${total.toLocaleString()} teachings`
                : failed
                  ? "The library could not be loaded."
                  : "Loading the library…"}
            </p>
          </div>

          <ol className="md:mt-8 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
            {teachings.slice(0, shown).map((t) => (
              <li
                key={t.id}
                className="border-b border-[color:var(--rule)] py-4 md:border-0 md:py-0"
              >
                <SermonPreview
                  sermon={t}
                  onSelect={() => select(t)}
                  selected={t.id === selected.id}
                  showFormats
                />
              </li>
            ))}
          </ol>

          {index && shown < total ? (
            <button
              type="button"
              onClick={more}
              className="link-folio group mt-10 min-h-11 md:mt-12"
            >
              Load more teachings
              <span
                aria-hidden="true"
                className="transition-transform duration-150 group-hover:translate-x-1"
              >
                &rarr;
              </span>
            </button>
          ) : index ? (
            <p
              ref={endRef}
              tabIndex={-1}
              className="t-meta muted mt-10 md:mt-12"
            >
              All {total.toLocaleString()} teachings are showing.
            </p>
          ) : null}
        </div>
      </section>
    </>
  );
}
