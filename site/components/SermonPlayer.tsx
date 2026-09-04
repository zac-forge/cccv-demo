"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  videoId: string;
  title: string;
  /* The poster frame. Defaults to the site's message art rather than
     YouTube's thumbnail, which is whatever the livestream happened to be
     showing; a real poster can be passed once Sanity carries one. */
  poster?: string;
  /* Optional outside control, so another button can start the same
     player. Left undefined, the facade keeps its own state. */
  playing?: boolean;
  onPlay?: () => void;
};

/* Drew's sermon placeholder (assets/sermon-placeholder.png), cropped to
   16:9 so the rays meet the horizon seven tenths of the way down. */
const POSTER = "/site/message-poster.webp";

/**
 * Click-to-play facade. The poster frame is all that loads until someone
 * actually presses play, so no YouTube script runs on first paint.
 */
export default function SermonPlayer({
  videoId,
  title,
  poster = POSTER,
  playing: controlled,
  onPlay,
}: Props) {
  const [own, setOwn] = useState(false);
  const [ready, setReady] = useState(false);
  const playing = controlled ?? own;
  const start = () => {
    setOwn(true);
    onPlay?.();
  };

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
      onClick={start}
      aria-label={`Play the message: ${title}`}
      className="group relative block aspect-video w-full overflow-hidden border border-[color:var(--rule)] bg-ink"
    >
      {/* On hover the art comes up a shade and eases in a touch, the sun
          rising; it never swaps to the YouTube frame (Drew, September 4).
          The scale waits on motion-safe. */}
      <Image
        src={poster}
        alt=""
        fill
        sizes="(max-width: 1024px) 100vw, 56vw"
        className="object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.03]"
      />
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-ink/20 transition-colors duration-300 group-hover:bg-ink/0"
      />
      {/* The badge sits where the rays converge, on the horizon, so it
          reads as the sun and is never yellow on yellow. */}
      <span
        aria-hidden="true"
        className="absolute left-1/2 top-[70%] -translate-x-1/2 -translate-y-1/2"
      >
        <svg width="96" height="64" viewBox="0 0 96 64" fill="none">
          <rect width="96" height="64" fill="#D8B84C" />
          <path d="M40 21 60 32 40 43V21Z" fill="#26212B" />
        </svg>
      </span>
    </button>
  );
}
