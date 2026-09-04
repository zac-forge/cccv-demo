"use client";

import { useRef, useState } from "react";
import SermonPlayer from "./SermonPlayer";

/* The page's anchor: the message at 60, its title at 40, hung on one
   grid. Play state is shared so the action on the right starts the
   same player as the poster on the left; on a phone, where the poster
   sits above, the press also brings it back into view. */
export default function LatestMessage({
  videoId,
  title,
  titleLines,
  passage,
  tags,
}: {
  videoId: string;
  title: string;
  titleLines: string[];
  passage: string;
  tags: string[];
}) {
  const [playing, setPlaying] = useState(false);
  const plate = useRef<HTMLDivElement>(null);

  const watch = () => {
    setPlaying(true);
    plate.current?.scrollIntoView({ block: "nearest" });
  };

  return (
    <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-16">
      <div ref={plate} className="lg:col-span-7">
        <SermonPlayer
          videoId={videoId}
          title={title}
          playing={playing}
          onPlay={() => setPlaying(true)}
        />
      </div>

      <div className="lg:col-span-5">
        <p className="t-eyebrow tracking-[0.34em]">Latest message</p>
        <p className="t-eyebrow muted mt-2 tracking-[0.26em]">{tags.join(" · ")}</p>
        <h2
          id="latest-title"
          className="f-display mt-6 text-[clamp(2.25rem,3.8vw,3.25rem)] leading-[1.02] tracking-[-0.03em] md:mt-8"
        >
          {titleLines.map((line, i) => (
            <span key={line} className="block">
              {line}
              {i < titleLines.length - 1 ? " " : ""}
            </span>
          ))}
        </h2>
        <p className="f-data mt-6 text-[clamp(1.375rem,2.2vw,1.875rem)] leading-none md:mt-8">
          {passage}
        </p>
        <button type="button" onClick={watch} className="btn btn-sun mt-8 md:mt-10">
          Watch the message
        </button>
      </div>
    </div>
  );
}
