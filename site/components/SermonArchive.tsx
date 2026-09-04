"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import SermonPlayer from "./SermonPlayer";

/* The whole archive as one page: a JSON index fetched once, filters that
   run in the browser, a window of rows, and one player at the top. A
   sermon has a shareable address at /watch?s=<id>, resolved here from
   the same index, so no page is ever built per sermon
   (docs/01-build-plan.md §1). */

type Index = {
  speakers: string[];
  series: string[];
  // id, date, speakerIdx, seriesIdx, title, kind, youtubeId, audioUrl
  items: [string, string, number, number, string, string, string, string][];
};
type Sermon = {
  id: string;
  date: string;
  speaker: string;
  series: string;
  title: string;
  kind: string;
  youtubeId: string;
  audioUrl: string;
};

const PAGE = 40;

const fmtDate = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });

export default function SermonArchive() {
  const params = useSearchParams();
  const wanted = params.get("s");

  const [index, setIndex] = useState<Index | null>(null);
  const [failed, setFailed] = useState(false);
  const [q, setQ] = useState("");
  const [speaker, setSpeaker] = useState("");
  const [series, setSeries] = useState("");
  const [year, setYear] = useState("");
  const [kind, setKind] = useState("");
  const [shown, setShown] = useState(PAGE);
  const [selectedId, setSelectedId] = useState<string | null>(wanted);

  useEffect(() => {
    let alive = true;
    fetch("/sermons.json")
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((data: Index) => {
        if (alive) setIndex(data);
      })
      .catch(() => {
        if (alive) setFailed(true);
      });
    return () => {
      alive = false;
    };
  }, []);

  const all = useMemo<Sermon[]>(
    () =>
      index
        ? index.items.map(([id, date, sp, se, title, k, yt, au]) => ({
            id,
            date,
            speaker: index.speakers[sp],
            series: index.series[se],
            title,
            kind: k,
            youtubeId: yt,
            audioUrl: au,
          }))
        : [],
    [index]
  );

  const years = useMemo(
    () => Array.from(new Set(all.map((s) => s.date.slice(0, 4)))).sort().reverse(),
    [all]
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
    return all.filter(
      (s) =>
        (!speaker || s.speaker === speaker) &&
        (!series || s.series === series) &&
        (!year || s.date.startsWith(year)) &&
        (!kind || (kind === "video" ? s.youtubeId !== "" || s.kind === "video" : s.kind === kind)) &&
        (!needle || s.title.toLowerCase().includes(needle) || s.series.toLowerCase().includes(needle))
    );
  }, [all, q, speaker, series, year, kind]);

  const selected = all.find((s) => s.id === selectedId) ?? null;

  const select = (s: Sermon) => {
    setSelectedId(s.id);
    // Shareable without a navigation: the address updates in place.
    const url = new URL(window.location.href);
    url.searchParams.set("s", s.id);
    window.history.replaceState(null, "", url);
    document.getElementById("player")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const resetPage = () => setShown(PAGE);

  return (
    <>
      {/* ---- The player. Empty until something is chosen. ---- */}
      {selected && (
        <section id="player" aria-label="Now playing" className="field-ink band-sm">
          <div className="shell grid items-start gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              {selected.youtubeId ? (
                <SermonPlayer videoId={selected.youtubeId} title={selected.title} />
              ) : selected.audioUrl ? (
                <audio controls preload="none" src={selected.audioUrl} className="w-full" />
              ) : (
                /* PLACEHOLDER: audio is moving to archive.org; until the
                   index carries those URLs there is nothing to play here. */
                <div className="flex aspect-video items-center justify-center border border-[color:var(--rule)] p-8">
                  <p className="muted max-w-[30ch] text-center text-[0.9375rem]">
                    This message is being moved to the new archive and will
                    play here soon.
                  </p>
                </div>
              )}
            </div>
            <div className="lg:col-span-6">
              <p className="t-eyebrow muted">
                {fmtDate(selected.date)} · {selected.speaker}
              </p>
              <h2 className="f-display t-section mt-4">{selected.title}</h2>
              <p className="f-data mt-6 text-[clamp(1.25rem,2vw,1.75rem)] leading-none">
                {selected.series}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ---- Filters ---- */}
      <section aria-label="Find a message" className="field-salt band-sm">
        <div className="shell">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr_1fr]">
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
              ? `${filtered.length.toLocaleString()} of ${all.length.toLocaleString()} messages`
              : failed
                ? "The archive could not be loaded."
                : "Loading the archive…"}
          </p>
        </div>
      </section>

      {/* ---- The list. Typographic: 1,545 of these have no picture. ---- */}
      <section aria-label="Messages" className="field-stock band">
        <div className="shell">
          <ol>
            {filtered.slice(0, shown).map((s) => (
              <li key={s.id} className="rule-t last:border-b last:border-[color:var(--rule)]">
                <button
                  type="button"
                  onClick={() => select(s)}
                  aria-current={s.id === selectedId ? "true" : undefined}
                  className="sermon-row pressable grid w-full grid-cols-[6.5rem_1fr_auto] items-baseline gap-x-6 py-5 text-left sm:grid-cols-[9rem_1fr_auto] sm:gap-x-10 md:py-6"
                >
                  <span className="t-meta pt-1 text-red">{fmtDate(s.date)}</span>
                  <span>
                    <span className="f-data block text-[1.125rem] leading-tight md:text-[1.375rem]">
                      {s.title}
                    </span>
                    <span className="muted mt-1.5 block text-[0.875rem]">
                      {s.speaker} · {s.series}
                    </span>
                  </span>
                  <span className="t-meta muted">{s.youtubeId || s.kind === "video" ? "Video" : "Audio"}</span>
                </button>
              </li>
            ))}
          </ol>
          {filtered.length > shown && (
            <button
              type="button"
              onClick={() => setShown((n) => n + PAGE)}
              className="btn btn-ink mt-10"
            >
              Show more
            </button>
          )}
        </div>
      </section>
    </>
  );
}
