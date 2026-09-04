import Image from "next/image";

/* The hero's sunburst as a printed corner mark: mirrored so the sun sits
   in the top-right and the rays fan back across the band, then a scrim
   that returns the left of the band to clean field so type never sits on
   yellow. From lg up only, the same rule as the ghost words. The parent
   needs `relative isolate overflow-hidden`. */
export default function PosterArt() {
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
