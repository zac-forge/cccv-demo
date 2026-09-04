# Calvary Chapel Conejo Valley

Website and brand rebuild. Read `docs/00-START-HERE.md` first, then `docs/01-build-plan.md`.

- `site/` — the Next.js app. This is what deploys.
- `assets/` — source artwork. `site/public/` holds the copies the app serves.
- `docs/` — build plan, runbook, reference spec. Gitignored, local only.
- `shots/` — review screenshots.
- `cccv-archive.sh` — sermon archive capture. See `docs/04-sermon-archive.md`.

The brand documentation, build docs and content provenance record are held locally and
deliberately not published while this repo is public.

## Running it

```bash
cd site
npm install
npm run dev
```

## Deploying

**Cloudflare Workers static assets**, free plan, with `output: 'export'`. Not Vercel: their fair
use policy treats donation-accepting sites as commercial, so the free tier was never available,
and the paid plan buys nothing here. Full reasoning in `docs/05-why-each-service.md`.

`cccv-one.vercel.app` is the old homepage demo built to pitch Dave. It stays until the real
deployment is live, then gets torn down per the cleanup checklist in `BRAND.md`.

## Things worth knowing before editing

- **Do not run `create-next-app`.** `site/` is already the real app.
- **There are no individual sermon pages.** `/watch` is one page filtering client-side over a JSON
  index emitted at build. See `docs/01-build-plan.md` §1.
- The palette is locked in `site/app/globals.css` under `@theme`. Three rules are not negotiable:
  the logotype never sits dark on Baptism Blue, yellow only ever appears on a dark ground, and red
  is an accent and never a field. `#C44932` is display-only at 24px and up, and needs its own token
  rather than replacing `--color-red`.
- `logotype-trim.svg` and `logotype-white-trim.svg` are the stock SVGs with the canvas cropped to
  the artwork. The paths are untouched. The originals carry 8% dead space on the left, which breaks
  left alignment at hero size.
- Custom CSS lives inside `@layer base` / `@layer components`. Outside a layer it outranks Tailwind
  utilities and things like `lg:hidden` stop working. Tailwind variants also do not apply to custom
  `@layer components` classes.
- Scripture is NKJV, verbatim, with its reference. Doctrinal copy is the church's wording,
  tightened at most. See `CONTENT-SOURCES.md`.
