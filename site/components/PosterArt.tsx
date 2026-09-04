import Image from "next/image";

/* The art behind a poster header or band. Four pieces and none, so the
   sunburst is one choice among several rather than every page's
   wallpaper (Drew, September 4). All from lg up, the same rule as the
   ghost words. The parent needs `relative isolate overflow-hidden`.

   rays    the hero's sunburst as a printed corner mark, mirrored so the
           sun sits top-right, with a scrim that returns the left of the
           band to clean field so type never sits on yellow.
   cross   a plain cross on a hill before sunrise, painted on Baptism
           Blue. Fills the right half, masked in from the left.
   sower   a sower at dusk, painted on Maranatha Ink. Same placement.
   valley  the Conejo Valley band along the foot of the header, under
           the type; the header grows to make room (globals.css).
   none    type only. */
export type PosterArtName = "rays" | "cross" | "sower" | "valley" | "none";

/* The painted pieces own the right side, so the header stacks its aside
   under the deck rather than hanging it in the art. */
export const ART_OWNS_RIGHT: ReadonlySet<PosterArtName> = new Set(["cross", "sower"]);

const PAINTED = {
  cross: { src: "/site/cross-dawn.webp", width: 1400, height: 933 },
  sower: { src: "/site/sower.webp", width: 1400, height: 933 },
} as const;

export default function PosterArt({ art = "rays" }: { art?: PosterArtName }) {
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
          className="poster-rays hidden lg:block"
        />
        <div className="poster-scrim hidden lg:block" aria-hidden="true" />
      </>
    );
  }

  if (art === "valley") {
    return (
      <Image
        src="/site/valley.webp"
        alt=""
        width={1600}
        height={533}
        aria-hidden="true"
        className="poster-foot hidden lg:block"
      />
    );
  }

  const piece = PAINTED[art];
  return (
    <Image
      src={piece.src}
      alt=""
      width={piece.width}
      height={piece.height}
      aria-hidden="true"
      className="poster-plate hidden lg:block"
    />
  );
}
