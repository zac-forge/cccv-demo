import { MINISTRIES } from "./content";

/* ------------------------------------------------------------------
   The primary nav and its subnavs: one tree for the header at every
   width, and the source of the Watch strip. Real pages only; no anchors
   in a subnav (Drew, September 4). Ministries are read from the content
   file, so the menu can never drift from the grid. Events holds two
   events that change and Connect is one page of sections, so neither
   has a subnav. `section` is the homepage band each item summarises,
   for the scroll-spy there only. Built on the server (app/layout.tsx)
   and handed to the client Header as a prop, so the content file stays
   out of the browser bundle.
   ------------------------------------------------------------------ */

export type NavChild = { label: string; href: string };
export type NavItem = {
  label: string;
  href: string;
  section: string | null;
  children?: NavChild[];
};

/* The Watch family, in the order the strip prints them. */
export const WATCH_NAV: NavChild[] = [
  { label: "Latest", href: "/watch" },
  { label: "Livestream", href: "/watch/live" },
  { label: "All messages", href: "/watch/sermons" },
  { label: "Radio", href: "/watch/radio" },
];

export const NAV: NavItem[] = [
  {
    label: "Visit",
    href: "/new",
    section: "new-here",
    children: [{ label: "Know Jesus", href: "/new/know-jesus" }],
  },
  { label: "Messages", href: "/watch", section: "message", children: WATCH_NAV },
  {
    label: "Ministries",
    href: "/ministries",
    section: "ministries",
    children: MINISTRIES.map((m) => ({ label: m.name, href: m.href })),
  },
  { label: "Events", href: "/events", section: "events" },
  { label: "Connect", href: "/connect", section: "connect" },
  {
    label: "About",
    href: "/about",
    section: null,
    children: [
      { label: "Who we support", href: "/about/who-we-support" },
      { label: "Memorials", href: "/memorials" },
    ],
  },
];
