import { verse } from "@/lib/scripture";

type Props = {
  reference: string;
  /* light: red rule and reference, for stock and salt. dark: yellow, for
     blue and ink, where red fails. */
  tone?: "light" | "dark";
  /* margin: a gloss beside a reading column — a left rule on a phone, a
     top rule from lg up, where it hangs in the outer columns. quote: the
     hero's treatment, a left rule at every width and lede-sized type.
     pull: a pull quote that opens a section, a short rule above and
     display type between the lede and the section head. */
  layout?: "margin" | "quote" | "pull";
  /* The type step, when the layout's own is not the one wanted. A quote
     at pull size is the poster aside: the hero's rule down the left, the
     pull quote's type, so it holds its own beside a title (/watch). */
  size?: "lede" | "pull";
  className?: string;
};

/* Scripture set apart from the copy that cites it: the verse, NKJV
   verbatim, with its reference beneath. The copy keeps its own inline
   citation either way; the repetition is the point. */
export default function Verse({
  reference,
  tone = "light",
  layout = "margin",
  size,
  className = "",
}: Props) {
  const rule = tone === "dark" ? "border-yellow" : "border-red";
  const caption =
    tone === "dark" ? "text-[color:var(--color-yellow-onblue)]" : "text-red";
  const step =
    size === "pull"
      ? "t-pull"
      : size === "lede"
        ? "t-lede"
        : layout === "margin"
          ? "text-[0.9375rem] leading-[1.5] lg:text-[1rem]"
          : layout === "quote"
            ? "t-lede"
            : "t-pull";
  const large = step === "t-pull";
  const frame =
    layout === "margin"
      ? `border-l-2 ${rule} pl-5 lg:border-l-0 lg:border-t lg:border-[color:var(--rule)] lg:pl-0 lg:pt-3`
      : layout === "quote"
        ? `border-l-2 ${rule} ${large ? "pl-6 md:pl-8" : "pl-5 md:pl-6"}`
        : `border-t-2 ${rule} pt-6 md:pt-8`;

  return (
    <figure className={`${frame} ${className}`}>
      <blockquote className={`f-text ${step}`}>
        &ldquo;{verse(reference)}&rdquo;
      </blockquote>
      <figcaption className={`t-meta ${large ? "mt-4" : "mt-2"} ${caption}`}>
        {reference}
      </figcaption>
    </figure>
  );
}
