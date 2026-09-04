/* The teaching model, shared by the build (lib/sermons.ts) and the
   browser (components/SermonArchive.tsx). Pure: no data is imported
   here, so the client bundle carries the rules and not the index.

   Clover kept every message as separate rows per format: a video row
   dated the service day and an audio row a day earlier with "(Audio)"
   on the title. They are one teaching. Two rows merge only when the
   normalised title is identical, the formats differ, the dates are at
   most three days apart, and the speaker matches or is Unknown on one
   side. Series is a label, not an identity, so it may differ (the
   audio twin was mis-tagged on five occasions); the video row's wins
   unless it is Unknown or Uncategorized. Anything else stays apart. */

export type Row = [string, string, number, number, string, string, string, string];
export type Index = { speakers: string[]; series: string[]; items: Row[] };

export type Teaching = {
  /* The video row's id when there is one, else the audio row's. */
  id: string;
  /* Every row id that resolves to this teaching, for ?s= links. */
  ids: string[];
  date: string;
  speaker: string;
  series: string;
  /* The title as written, minus a trailing "(Audio)". */
  title: string;
  /* The same split at their quotation marks, where it fits the pattern. */
  passage: string;
  name: string;
  youtubeId: string;
  audioUrl: string;
  hasVideoRow: boolean;
  hasAudioRow: boolean;
};

const UNSET = new Set(["", "Unknown", "Uncategorized"]);
const WINDOW_DAYS = 3;

const stripFormat = (t: string) => t.replace(/\s*[([]?\s*(audio|video)\s*(only)?\s*[)\]]?\s*$/i, "").trim();

const norm = (t: string) =>
  stripFormat(t)
    .toLowerCase()
    .replace(/[“”"’'‘]/g, "")
    .replace(/[\s\-–—:,.]+/g, " ")
    .trim();

const days = (a: string, b: string) =>
  Math.abs(Date.parse(`${a}T00:00:00Z`) - Date.parse(`${b}T00:00:00Z`)) / 86400000;

/* "Luke 8:22-39 “Jesus, Our All Powerful Savior” Part 2" → passage and
   name. 1,482 of 2,345 rows fit; the rest keep the whole title as the
   name. */
export function splitTitle(raw: string): { passage: string; name: string } {
  const clean = stripFormat(raw);
  // Their opening mark is sometimes a closing one (”Vengeance Is Mine”).
  const m = clean.match(/^(.+?)\s*[“”"](.+?)[”"]\s*(.*)$/);
  if (!m) return { passage: "", name: clean };
  const rest = m[3].trim();
  return { passage: m[1].trim(), name: rest ? `${m[2]} ${rest}` : m[2] };
}

export const fmtDate = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });

export function buildTeachings(index: Index): Teaching[] {
  const out: Teaching[] = [];
  const byTitle = new Map<string, Teaching[]>();

  for (const [id, date, sp, se, rawTitle, kind, youtubeId, audioUrl] of index.items) {
    const speaker = index.speakers[sp] ?? "Unknown";
    const series = index.series[se] ?? "Unknown";
    const key = norm(rawTitle);
    const isVideo = kind === "video";
    const list = byTitle.get(key) ?? [];

    const twin = list.find(
      (t) =>
        (isVideo ? !t.hasVideoRow : !t.hasAudioRow) &&
        days(t.date, date) <= WINDOW_DAYS &&
        (t.speaker === speaker || UNSET.has(t.speaker) || UNSET.has(speaker))
    );

    if (twin) {
      twin.ids.push(id);
      if (isVideo) {
        twin.hasVideoRow = true;
        twin.id = id;
        if (!UNSET.has(series)) twin.series = series;
      } else {
        twin.hasAudioRow = true;
        if (UNSET.has(twin.series) && !UNSET.has(series)) twin.series = series;
      }
      if (date > twin.date) twin.date = date;
      if (UNSET.has(twin.speaker) && !UNSET.has(speaker)) twin.speaker = speaker;
      if (!twin.youtubeId && youtubeId) twin.youtubeId = youtubeId;
      if (!twin.audioUrl && audioUrl) twin.audioUrl = audioUrl;
      if (isVideo) twin.title = stripFormat(rawTitle);
      continue;
    }

    const title = stripFormat(rawTitle);
    const t: Teaching = {
      id,
      ids: [id],
      date,
      speaker,
      series,
      title,
      ...splitTitle(title),
      youtubeId,
      audioUrl,
      hasVideoRow: isVideo,
      hasAudioRow: !isVideo,
    };
    list.push(t);
    byTitle.set(key, list);
    out.push(t);
  }

  return out.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

/* What can actually play. Video rows without a YouTube id are Clover
   files that are not this site's to serve; only the audio twin will,
   once archive.org carries it. */
export const canWatch = (t: Teaching) => t.youtubeId !== "";
export const canListen = (t: Teaching) => t.audioUrl !== "";

export const teachingMatches = (t: Teaching, title: string) =>
  norm(t.title).includes(norm(title));
