"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import SermonPlayer from "./SermonPlayer";
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
   the library: filters, then rows, nine at a time. Choosing a teaching
   swaps what the one media area shows and updates the address
   (?s=<row id>) in place, so every teaching stays shareable without a
   page per sermon (docs/01-build-plan.md §1). A shared link resolves
   once the index has loaded; until then the featured teaching stands in.

   The rows are typographic on purpose: 1,545 of the 2,345 rows have no
   picture, and the poster belongs to the player, not the list. */

const PAGE = 9;
type Format = "watch" | "listen";

const hasVideo = (t: Teaching) => t.hasVideoRow || t.youtubeId !== "";
const hasAudio = (t: Teaching) => t.hasAudioRow || t.audioUrl !== "";

export default function SermonArchive({ featured }: { featured: Teaching }) {
  const [index, setIndex] = useState<Index | null>(null);
  const [failed, setFailed] = useState(false);
  const [selectedId, setSelectedId] = useState(featured.id);
  const [format, setFormat] = useState<Format>("watch");
  const [q, setQ] = useState("");
  const [speaker, setSpeaker] = useState("");
  const [series, setSeries] = useState("");
  const [year, setYear] = useState("");
  const [kind, setKind] = useState("");
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

  const years = useMemo(
    () => Array.from(new Set(teachings.map((t) => t.date.slice(0, 4)))).sort().reverse(),
    [teachings]
  );
  const seriesList = useMemo(
    () => (index ? [...index.series].sort((a, b) => a.localeCompare(b)) : []),
    [index]
  );
  const speakerList = useMemo(
    () => (index ? [...index.speakers].sort((a, b) => a.localeCompare(b)) : []),
    [index]
  );

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return teachings.filter(
      (t) =>
        (!speaker || t.speaker === speaker) &&
        (!series || t.series === series) &&
        (!year || t.date.startsWith(year)) &&
        (!kind || (kind === "video" ? hasVideo(t) : hasAudio(t))) &&
        (!needle ||
          t.title.toLowerCase().includes(needle) ||
          t.series.toLowerCase().includes(needle))
    );
  }, [teachings, q, speaker, series, year, kind]);

  const selected: Teaching =
    teachings.find((t) => t.ids.includes(selectedId)) ??
    teachings.find((t) => t.ids.includes(featured.id)) ??
    featured;

  const watchable = canWatch(selected);
  const listenable = canListen(selected);
  /* Watch plays video, or audio when the video was only ever Clover's;
     Listen plays audio or nothing. Neither pretends: when the format
     asked for is not here yet, the plate says so. */
  const mode: "video" | "audio" | "none" =
    format === "watch"
      ? watchable
        ? "video"
        : listenable
          ? "audio"
          : "none"
      : listenable
        ? "audio"
        : "none";

  const select = (t: Teaching, want: Format = "watch") => {
    setSelectedId(t.id);
    setFormat(want);
    const url = new URL(window.location.href);
    url.searchParams.set("s", t.id);
    window.history.replaceState(null, "", url);
    // Back to the one player. The scroll follows the page's own
    // scroll-behavior, which reduced motion already turns off.
    document.getElementById("player")?.scrollIntoView({ block: "start" });
    titleRef.current?.focus({ preventScroll: true });
  };

  const resetPage = () => {
    setShown(PAGE);
    setReachedEnd(false);
  };
  const total = filtered.length;
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

      {/* ---- Filters ---- */}
      <section aria-labelledby="library-title" className="field-salt band-sm">
        <div className="shell">
          <h2
            id="library-title"
            className="f-display text-[clamp(1.875rem,3vw,2.75rem)] leading-[1] tracking-[-0.025em]"
          >
            Teaching library
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr_1fr]">
            <label className="filter">
              <span className="t-eyebrow text-red">Search</span>
              <input
                type="search"
                value={q}
                onChange={(e) => {
                  setQ(e.target.value);
                  resetPage();
                }}
                placeholder="Title or book"
              />
            </label>
            <label className="filter">
              <span className="t-eyebrow text-red">Series</span>
              <select value={series} onChange={(e) => { setSeries(e.target.value); resetPage(); }}>
                <option value="">All</option>
                {seriesList.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </label>
            <label className="filter">
              <span className="t-eyebrow text-red">Speaker</span>
              <select value={speaker} onChange={(e) => { setSpeaker(e.target.value); resetPage(); }}>
                <option value="">All</option>
                {speakerList.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </label>
            <label className="filter">
              <span className="t-eyebrow text-red">Year</span>
              <select value={year} onChange={(e) => { setYear(e.target.value); resetPage(); }}>
                <option value="">All</option>
                {years.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </label>
            <label className="filter">
              <span className="t-eyebrow text-red">Format</span>
              <select value={kind} onChange={(e) => { setKind(e.target.value); resetPage(); }}>
                <option value="">All</option>
                <option value="video">Video</option>
                <option value="audio">Audio</option>
              </select>
            </label>
          </div>
          <p className="muted mt-5 text-[0.875rem]" role="status">
            {index
              ? `${Math.min(shown, total)} of ${total.toLocaleString()} teachings`
              : failed
                ? "The library could not be loaded."
                : "Loading the library…"}
          </p>
        </div>
      </section>

      {/* ---- The list. Typographic: date, title, speaker and series,
              and the formats the church has as the links; the player
              says when one is not here yet. One row per teaching. ---- */}
      <section aria-label="Messages" className="field-stock pt-[clamp(2.5rem,4vw,3.5rem)] pb-[clamp(3.5rem,6vw,5rem)]">
        <div className="shell">
          <ol>
            {filtered.slice(0, shown).map((t) => {
              const current = t.id === selected.id;
              const video = hasVideo(t);
              const audio = hasAudio(t);
              return (
                <li
                  key={t.id}
                  className="sermon-row rule-t grid grid-cols-[6.5rem_1fr] items-baseline gap-x-6 gap-y-2 py-5 last:border-b last:border-[color:var(--rule)] sm:grid-cols-[9rem_1fr_auto] sm:gap-x-10 md:py-6"
                >
                  <span className="t-meta pt-1 text-red">{fmtDate(t.date)}</span>
                  <button
                    type="button"
                    onClick={() => select(t)}
                    aria-current={current ? "true" : undefined}
                    className="sermon-title pressable text-left"
                  >
                    <span className="f-data block text-[1.125rem] leading-tight md:text-[1.375rem]">
                      {t.title}
                    </span>
                    <span className="muted mt-1.5 block text-[0.875rem]">
                      {t.speaker} · {t.series}
                    </span>
                  </button>
                  <span className="col-start-2 flex items-center gap-5 sm:col-start-3">
                    {video && (
                      <button type="button" onClick={() => select(t, "watch")} className="sermon-format">
                        Video
                      </button>
                    )}
                    {audio && (
                      <button type="button" onClick={() => select(t, "listen")} className="sermon-format">
                        Audio
                      </button>
                    )}
                  </span>
                </li>
              );
            })}
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
            <p ref={endRef} tabIndex={-1} className="t-meta muted mt-10 md:mt-12">
              {total === 0
                ? "No teachings match."
                : `All ${total.toLocaleString()} matching teachings are showing.`}
            </p>
          ) : null}
        </div>
      </section>
    </>
  );
}
