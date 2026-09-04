"use client";

import { useEffect, useRef, useState } from "react";

/* Ministry Brands Amplify, confirmed live in their DOM: one loader
   script that injects an iframe into #mb-formbuilder-container. It is
   heavy, so nothing loads until the box is near the viewport, and the
   box reserves its height first so the page never shifts when the form
   arrives. Works under static export; nothing here needs a server. */
export default function GivingForm({ formId }: { formId: string }) {
  const box = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const node = box.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "480px 0px" }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!near) return;
    const script = document.createElement("script");
    script.src = `https://forms.ministryforms.net/embed.aspx?formId=${formId}`;
    script.async = true;
    document.body.appendChild(script);
    return () => {
      script.remove();
    };
  }, [near, formId]);

  return (
    <div
      ref={box}
      className="giving-box relative min-h-[760px] border border-ink bg-salt"
    >
      <div id="mb-formbuilder-container" />
      {!near && (
        <p className="muted absolute left-6 top-6 text-[0.9375rem]">
          The giving form loads here.
        </p>
      )}
    </div>
  );
}
