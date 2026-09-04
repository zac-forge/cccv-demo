"use client";

import { useState } from "react";

/* The YouTube live embed for the channel, behind a click. Nothing from
   YouTube loads until someone asks for it; the box reserves the space. */
export default function LivePlayer({ channelId }: { channelId: string }) {
  const [open, setOpen] = useState(false);

  if (open) {
    return (
      <div className="relative aspect-video w-full border border-[color:var(--rule)] bg-ink">
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/live_stream?channel=${channelId}&autoplay=1`}
          title="Calvary Chapel Conejo Valley live stream"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    );
  }
  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      className="group relative flex aspect-video w-full items-center justify-center border border-[color:var(--rule)] bg-ink/40"
      aria-label="Open the live stream"
    >
      <span className="btn btn-sun">Open the live stream</span>
    </button>
  );
}
