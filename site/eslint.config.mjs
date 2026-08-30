import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    // The logotype is vector artwork served as-is; the image optimizer has
    // nothing to do with an SVG, so a plain <img> is correct here.
    rules: { "@next/next/no-img-element": "off" },
  },
];

export default eslintConfig;
