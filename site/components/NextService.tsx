"use client";

import { useSyncExternalStore } from "react";

/* Sunday 9 and 11 am, Wednesday 7 pm, Pacific — the livestream runs at
   11 am and 7 pm (/home). Computed in the browser against real Pacific
   time, so the offline state can say exactly when to come back. During
   a service window it says so instead. Nothing is rendered on the
   server but the fallback, so the HTML never carries a stale time. */

const TZ = "America/Los_Angeles";
// [weekday (0 = Sunday), hour, minute]
const STREAMS: [number, number, number][] = [
  [0, 11, 0],
  [3, 19, 0],
];
const LIVE_FOR_MIN = 100;

function partsIn(date: Date) {
  const f = new Intl.DateTimeFormat("en-US", {
    timeZone: TZ,
    weekday: "short",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  }).formatToParts(date);
  const get = (t: string) => f.find((p) => p.type === t)?.value ?? "";
  const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  return {
    weekday,
    minutes: Number(get("hour")) * 60 + Number(get("minute")),
  };
}

type Snapshot =
  | { live: true }
  | { live: false; label: string; inDays: number };

function snapshot(now = new Date()): Snapshot {
  const { weekday, minutes } = partsIn(now);
  // Is a stream running right now?
  for (const [d, h, m] of STREAMS) {
    const start = h * 60 + m;
    if (weekday === d && minutes >= start - 10 && minutes < start + LIVE_FOR_MIN) {
      return { live: true };
    }
  }
  // Otherwise the soonest upcoming one, scanning a week ahead.
  let best: { inDays: number; when: Date } | null = null;
  for (let ahead = 0; ahead < 8; ahead++) {
    const day = new Date(now.getTime() + ahead * 86400000);
    const p = partsIn(day);
    for (const [d, h, m] of STREAMS) {
      if (p.weekday !== d) continue;
      const start = h * 60 + m;
      if (ahead === 0 && minutes >= start) continue;
      const when = new Date(day.getTime() + (start - p.minutes) * 60000);
      if (!best || when < best.when) best = { inDays: ahead, when };
    }
  }
  if (!best) return { live: false, label: "", inDays: 0 };
  const label = new Intl.DateTimeFormat("en-US", {
    timeZone: TZ,
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(best.when);
  return { live: false, label, inDays: best.inDays };
}

let cached = "";
let cachedSnap: Snapshot | null = null;
function getSnapshot(): Snapshot {
  // Recompute at most once a minute, so the store value is stable.
  const key = String(Math.floor(Date.now() / 60000));
  if (key !== cached || !cachedSnap) {
    cached = key;
    cachedSnap = snapshot();
  }
  return cachedSnap;
}
function subscribe(onChange: () => void) {
  const id = window.setInterval(onChange, 30000);
  return () => window.clearInterval(id);
}
const getServerSnapshot = (): Snapshot | null => null;

export default function NextService() {
  const snap = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (snap === null) {
    // Before hydration: the plain facts.
    return (
      <p className="f-data text-[clamp(1.5rem,2.6vw,2.25rem)] leading-tight">
        Sundays 11 am &amp; Wednesdays 7 pm
      </p>
    );
  }
  if (snap.live) {
    return (
      <p className="f-data text-[clamp(1.5rem,2.6vw,2.25rem)] leading-tight">
        <span className="t-eyebrow mb-3 block text-yellow">Live now</span>
        We&rsquo;re streaming
      </p>
    );
  }
  return (
    <p className="f-data text-[clamp(1.5rem,2.6vw,2.25rem)] leading-tight">
      <span className="t-eyebrow mb-3 block text-yellow">
        {snap.inDays === 0 ? "Later today" : snap.inDays === 1 ? "Tomorrow" : "Next live service"}
      </span>
      {snap.label}
    </p>
  );
}
