"use client";

import { useEffect, useRef, useState } from "react";

/* Ministry Brands Amplify. The loader at forms.ministryforms.net does not
   look for a container element. It finds its own <script> tag by src and
   inserts the form iframe as that tag's next sibling; the iframe is what
   carries id="mb-formbuilder-container". So the script has to be appended
   inside this box, not to document.body, or the form lands after the
   footer and, being outside React's tree, follows the visitor to every
   page. The loader is heavy, so nothing loads until the box is near the
   viewport, and the box reserves its height first so the page never
   shifts when the form arrives. Works under static export. */
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
    const node = box.current;
    if (!node) return;
    const script = document.createElement("script");
    script.src = `https://forms.ministryforms.net/embed.aspx?formId=${formId}`;
    script.async = true;
    node.appendChild(script);
    return () => {
      script.remove();
      node.querySelector("iframe#mb-formbuilder-container")?.remove();
    };
  }, [near, formId]);

  return (
    <div
      ref={box}
      className="giving-box relative min-h-[760px] border border-ink bg-salt"
    >
      {!near && (
        <p className="muted absolute left-6 top-6 text-[0.9375rem]">
          The giving form loads here.
        </p>
      )}
    </div>
  );
}
