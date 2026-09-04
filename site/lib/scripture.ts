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
  /* Inner quotation set in single marks so it nests inside the outer
     pair the Verse component adds; the words are the verse's own. */
  "Mark 9:35":
    "And He sat down, called the twelve, and said to them, ‘If anyone desires to be first, he shall be last of all and servant of all.’",
  "Matthew 19:14":
    "But Jesus said, ‘Let the little children come to Me, and do not forbid them; for of such is the kingdom of heaven.’",
  "Deuteronomy 16:17":
    "Every man shall give as he is able, according to the blessing of the LORD your God which He has given you.",
  "2 Corinthians 9:7-8":
    "So let each one give as he purposes in his heart, not grudgingly or of necessity; for God loves a cheerful giver. And God is able to make all grace abound toward you, that you, always having all sufficiency in all things, may have an abundance for every good work.",
  "2 Corinthians 5:8":
    "We are confident, yes, well pleased rather to be absent from the body and to be present with the Lord.",
  "Philippians 1:21": "For to me, to live is Christ, and to die is gain.",
  "John 6:37":
    "All that the Father gives Me will come to Me, and the one who comes to Me I will by no means cast out.",
};

/* Fails the build rather than shipping a blank where a verse should be. */
export function verse(reference: string): string {
  const text = NKJV[reference];
  if (!text) throw new Error(`No NKJV text on file for "${reference}"`);
  return text;
}
