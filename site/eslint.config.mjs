import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

// eslint-config-next 16 ships flat configs directly. Going through
// FlatCompat.extends() on these throws a circular-structure error before
// a single file is linted.
const eslintConfig = [
  ...nextVitals,
  ...nextTs,
  {
    // The logotype is vector artwork served as-is; the image optimizer has
    // nothing to do with an SVG, so a plain <img> is correct here.
    rules: { "@next/next/no-img-element": "off" },
  },
  { ignores: ["out/**", ".next/**", ".vercel/**"] },
];

export default eslintConfig;
