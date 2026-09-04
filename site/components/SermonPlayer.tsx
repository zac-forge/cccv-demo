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
  const [ready, setReady] = useState(false);

  if (playing) {
    return (
      <div className="relative aspect-video w-full border border-[color:var(--rule)] bg-ink">
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          onLoad={() => setReady(true)}
        />
        {/* YouTube's iframe takes a beat to paint. Without this the press
            lands on a black rectangle and reads as a dead click. */}
        {!ready && (
          <span className="absolute inset-0 grid place-items-center bg-ink">
            <span className="sr-only" role="status">
              Loading the message
            </span>
            <span className="sermon-spinner" aria-hidden="true" />
          </span>
        )}
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`Play the message: ${title}`}
      className="group relative block aspect-video w-full overflow-hidden border border-[color:var(--rule)] bg-ink"
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
        <svg width="96" height="64" viewBox="0 0 96 64" fill="none">
          <rect width="96" height="64" fill="#D8B84C" />
          <path d="M40 21 60 32 40 43V21Z" fill="#26212B" />
        </svg>
      </span>
    </button>
  );
}
