/* ------------------------------------------------------------------
   Scripture on the site is NKJV, verbatim, with its reference. Every
   verse lives here and nowhere else, so one citation can never drift
   from another. Checked word for word against biblegateway.com (NKJV)
   on 2026-09-03. A fragment keeps its own punctuation — Romans 3:23
   begins lowercase and ends on a comma because the verse does.
   ------------------------------------------------------------------ */
export const NKJV: Record<string, string> = {
  "Genesis 1:1": "In the beginning God created the heavens and the earth.",
  "Romans 3:23": "for all have sinned and fall short of the glory of God,",
  "1 John 1:8":
    "If we say that we have no sin, we deceive ourselves, and the truth is not in us.",
  "Romans 6:23":
    "For the wages of sin is death, but the gift of God is eternal life in Christ Jesus our Lord.",
  "Romans 5:8":
    "But God demonstrates His own love toward us, in that while we were still sinners, Christ died for us.",
  "Romans 10:17":
    "So then faith comes by hearing, and hearing by the word of God.",
  "John 6:37":
    "All that the Father gives Me will come to Me, and the one who comes to Me I will by no means cast out.",
};

/* Fails the build rather than shipping a blank where a verse should be. */
export function verse(reference: string): string {
  const text = NKJV[reference];
  if (!text) throw new Error(`No NKJV text on file for "${reference}"`);
  return text;
}
