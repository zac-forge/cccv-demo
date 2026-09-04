// Builds public/sermons.json from the archive manifest.
//
//   node scripts/build-sermon-index.mjs [path/to/index.tsv] [--media]
//
// Default source is ~/cccv-sermon-archive/manifest/index.tsv. Without
// --media the index carries no file URLs: audio is moving to archive.org
// and video to YouTube, and until those exist the only URLs on hand are
// Clover's, which are not this site's to publish. The 142 YouTube-only
// items keep their ids and play today. Re-run with --media once the
// archive.org upload is done and the manifest carries those URLs; this
// is the "URL swap" the plan counts on (docs/01-build-plan.md §1).
//
// Shape, compact on purpose (~2,345 rows):
//   { speakers: string[], series: string[],
//     items: [id, date, speakerIndex, seriesIndex, title, kind, youtubeId, audioUrl][] }

import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const args = process.argv.slice(2);
const withMedia = args.includes("--media");
const src =
  args.find((a) => !a.startsWith("--")) ??
  path.join(os.homedir(), "cccv-sermon-archive/manifest/index.tsv");
const out = path.join(import.meta.dirname, "../public/sermons.json");

const rows = fs.readFileSync(src, "utf8").trim().split("\n").map((l) => l.split("\t"));
const header = rows.shift();
const col = (name) => header.indexOf(name);
const [ID, DATE, SPEAKER, SERIES, TITLE, KIND, AUDIO, UPLOAD, THIRD] = [
  "id", "date", "speaker", "series", "title", "kind", "audio_url", "upload_type", "third_party_id",
].map(col);

const speakers = [];
const series = [];
const index = (list, value) => {
  const v = value || "Unknown";
  let i = list.indexOf(v);
  if (i === -1) { list.push(v); i = list.length - 1; }
  return i;
};

const items = rows
  .map((r) => [
    r[ID],
    r[DATE].slice(0, 10),
    index(speakers, r[SPEAKER]),
    index(series, r[SERIES]),
    r[TITLE].replace(/\s+/g, " ").trim(),
    r[KIND],
    r[UPLOAD] === "youtube" ? r[THIRD] : "",
    withMedia ? r[AUDIO] : "",
  ])
  .sort((a, b) => (a[1] < b[1] ? 1 : a[1] > b[1] ? -1 : 0));

fs.writeFileSync(out, JSON.stringify({ speakers, series, items }));
const kb = (fs.statSync(out).size / 1024).toFixed(0);
console.log(`${items.length} sermons, ${speakers.length} speakers, ${series.length} series → public/sermons.json (${kb} KB${withMedia ? ", with media URLs" : ""})`);
