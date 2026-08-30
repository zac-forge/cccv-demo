"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  videoId: string;
  title: string;
};

/**
 * Click-to-play facade. The poster frame is all that loads until someone
 * actually presses play, so no YouTube script runs on first paint.
 */
export default function SermonPlayer({ videoId, title }: Props) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <div className="relative aspect-video w-full border border-salt/35 bg-ink">
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`Play the message: ${title}`}
      className="group relative block aspect-video w-full overflow-hidden border border-salt/35 bg-ink"
    >
      <Image
        src={`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`}
        alt=""
        fill
        sizes="(max-width: 1024px) 100vw, 56vw"
        className="object-cover"
      />
      <span
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center bg-ink/50 transition-colors duration-100 group-hover:bg-ink/30"
      >
        <svg width="88" height="88" viewBox="0 0 88 88" fill="none">
          <circle cx="44" cy="44" r="43" fill="#26212B" />
          <circle cx="44" cy="44" r="43" stroke="#D8B84C" strokeWidth="2" />
          <path d="M36 28 63 44 36 60V28Z" fill="#D8B84C" />
        </svg>
      </span>
    </button>
  );
}
