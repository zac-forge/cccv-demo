import Image from "next/image";

/* The art behind a poster header or band. Three pieces and none, so the
   sunburst is one choice among several rather than every page's
   wallpaper (Drew, September 4). From md up: below that the header is
   one narrow column and the type would sit on the art; the phone case
   is for the mobile pass. The parent needs `relative isolate
   overflow-hidden`.

   rays    the hero's sunburst as a printed corner mark, mirrored so the
           sun sits top-right, with a scrim that returns the left of the
           band to clean field so type never sits on yellow. `sun` hangs
           it flush to the corner and larger, so the whole disc shows in
           a short header instead of slipping under the site header.
   cross   a plain cross on a hill before sunrise, painted on Baptism
           Blue. Fills the right half, masked in from the left.
   sower   a sower at dusk, painted on Maranatha Ink. Same placement.
   tower   a transmitter on a ridge over the valley at night, on ink
           (/watch/radio).
   lectern an open Bible under one stage light, on ink (/watch/live).
   doors   open doors on a Sunday morning, on Baptism Blue (/new).
   shepherd the shepherd walking home with the lamb across his
           shoulders, seen from behind, on ink (the 404; it replaced an
           empty pier once Luke 15:4 went on the page).
   none    type only.
   The full bleeds (the valley on /about, the coast on
   /about/who-we-support, the oak on /memorials) are BleedHeader. */
export type PosterArtName =
  | "rays"
  | "cross"
  | "sower"
  | "tower"
  | "lectern"
  | "doors"
  | "shepherd"
  | "none";

/* The painted pieces own the right side, so the header stacks its aside
   under the deck rather than hanging it in the art. */
export const ART_OWNS_RIGHT: ReadonlySet<PosterArtName> = new Set([
  "cross",
  "sower",
  "tower",
  "lectern",
  "doors",
  "shepherd",
]);

const PAINTED = {
  cross: { src: "/site/cross-dawn.webp", width: 1400, height: 933 },
  sower: { src: "/site/sower.webp", width: 1400, height: 933 },
  tower: { src: "/site/radio-tower.webp", width: 1400, height: 933 },
  lectern: { src: "/site/live-lectern.webp", width: 1400, height: 933 },
  doors: { src: "/site/visit-doors.webp", width: 1400, height: 933 },
  shepherd: { src: "/site/shepherd.webp", width: 1400, height: 933 },
} as const;

export default function PosterArt({
  art = "rays",
  sun = false,
}: {
  art?: PosterArtName;
  sun?: boolean;
}) {
  if (art === "none") return null;

  if (art === "rays") {
    return (
      <>
        <Image
          src="/site/sun-rays.webp"
          alt=""
          width={1400}
          height={525}
          aria-hidden="true"
          className={`poster-rays hidden md:block ${sun ? "poster-rays-sun" : ""}`}
        />
        <div
          className={`poster-scrim hidden md:block ${sun ? "poster-scrim-wide" : ""}`}
          aria-hidden="true"
        />
      </>
    );
  }

  /* The plate drifts with the scroll (data-drift, Motion.tsx); the CSS
     gives it slack below the header's clip so the travel never shows an
     edge. The sunburst does not drift: the whole disc has to stay put. */
  const piece = PAINTED[art];
  return (
    <Image
      src={piece.src}
      alt=""
      width={piece.width}
      height={piece.height}
      aria-hidden="true"
      data-drift=""
      className="poster-plate hidden md:block"
    />
  );
}
