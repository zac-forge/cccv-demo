# Calvary Chapel Conejo Valley — homepage design concept

A one-page visual demo for Pastor Dave. **This is a pitch, not a product.**
It may be thrown away; the church may stay on their current platform.

- `site/` — the Next.js app. This is what deploys.
- `assets/` — source artwork. `site/public/` holds the copies the app serves.
- `shots/` — review screenshots.

The brief, the brand documentation, the production spec and the content
provenance record are held privately and are not in this repository.

## Running it

```bash
cd site
npm install
npm run dev
```

## Deploying

Vercel, with **Root Directory set to `site`**. Everything is statically
prerendered; there are no environment variables and no backend.

## Things worth knowing before editing

- The palette is locked in `site/app/globals.css` under `@theme`. Three rules
  are not negotiable: the logotype never sits dark on Baptism Blue, yellow only
  ever appears on a dark ground, and red is an accent and never a field.
- `logotype-trim.svg` and `logotype-white-trim.svg` are the stock SVGs with the
  canvas cropped to the artwork. The paths are untouched. The originals carry
  8% dead space on the left, which breaks left alignment at hero size.
- Custom CSS lives inside `@layer base` / `@layer components`. Outside a layer
  it outranks Tailwind utilities and things like `lg:hidden` stop working.
- Scripture is NKJV, verbatim, with its reference. Doctrinal copy is the
  church's wording, tightened at most. See `CONTENT-SOURCES.md`.
