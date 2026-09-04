import index from "@/public/sermons.json";
import { SERMON } from "@/lib/content";
import { buildTeachings, teachingMatches, type Index, type Teaching } from "@/lib/teachings";

/* The teaching list, built once at build time for pages that need a few
   without the archive's client-side machinery. The archive fetches the
   same index in the browser and runs the same buildTeachings. */

export const TEACHINGS: Teaching[] = buildTeachings(index as Index);

/* The newest teachings, leaving out a title that is already featured. */
export function recentSermons(n: number, exclude?: string): Teaching[] {
  return TEACHINGS.filter((t) => !(exclude && teachingMatches(t, exclude))).slice(0, n);
}

/* The current message on their YouTube channel (lib/content.ts) as a
   teaching: its index row, carrying the YouTube id the index does not
   have. Falls back to the newest teaching if the index has moved on. */
export function featuredTeaching(): Teaching {
  const match = TEACHINGS.find((t) => teachingMatches(t, SERMON.title));
  if (!match) return TEACHINGS[0];
  return { ...match, youtubeId: SERMON.videoId };
}

export type { Teaching } from "@/lib/teachings";
