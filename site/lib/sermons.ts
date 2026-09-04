import index from "@/public/sermons.json";

/* The sermon index, read at build time for pages that need a few rows
   without the archive's client-side machinery. The archive itself
   fetches the same file in the browser (components/SermonArchive.tsx);
   the row shape is documented in scripts/build-sermon-index.mjs. */

export type SermonRow = {
  id: string;
  date: string;
  speaker: string;
  series: string;
  title: string;
  kind: string;
  youtubeId: string;
  audioUrl: string;
};

type Index = {
  speakers: string[];
  series: string[];
  items: [string, string, number, number, string, string, string, string][];
};

const data = index as Index;

/* Newest first, as the index is written. */
export const SERMONS: SermonRow[] = data.items.map(
  ([id, date, sp, se, title, kind, youtubeId, audioUrl]) => ({
    id,
    date,
    speaker: data.speakers[sp],
    series: data.series[se],
    title,
    kind,
    youtubeId,
    audioUrl,
  })
);

const norm = (s: string) =>
  s.toLowerCase().replace(/[“”"’']/g, "").replace(/\s+/g, " ").trim();

/* The newest video messages, one row per teaching (the audio twin each
   one has is skipped), leaving out a title that is already featured. */
export function recentSermons(n: number, exclude?: string): SermonRow[] {
  const skip = exclude ? norm(exclude) : "";
  return SERMONS.filter(
    (s) =>
      (s.kind === "video" || s.youtubeId !== "") &&
      !(skip && norm(s.title).includes(skip))
  ).slice(0, n);
}

/* Their titles carry the passage first and the title in quotes, on
   1,482 of 2,345 rows: “Luke 8:22-39 “Jesus, Our All Powerful Savior”
   Part 2”. Split so the two can set differently; a row that does not
   fit the pattern is left whole. A trailing “(Audio)” is dropped. */
export function splitTitle(raw: string): { passage: string; title: string } {
  const clean = raw.replace(/\s*\((audio|video)\)\s*$/i, "").trim();
  const m = clean.match(/^(.+?)\s*[“"](.+?)[”"]\s*(.*)$/);
  if (!m) return { passage: "", title: clean };
  const rest = m[3].trim();
  return { passage: m[1].trim(), title: rest ? `${m[2]} ${rest}` : m[2] };
}

export const fmtDate = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
