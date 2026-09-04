# CCCV

Rebuilding Calvary Chapel Conejo Valley's website. Read `docs/00-START-HERE.md` first.

@docs/00-START-HERE.md

## Doc order

| File | What it is |
|---|---|
| `docs/00-START-HERE.md` | Current state, decisions that reversed, next actions. Read first. |
| `docs/01-build-plan.md` | **The build plan. Authoritative.** IA, page specs, SEO, performance, prerequisites. |
| `docs/02-runbook.md` | Order of operations: accounts, capture, scaffold, Sanity, pipeline, cutover. |
| `docs/03-reference-spec.md` | Design tokens, contrast table, Sanity schemas, typography, components, content rules. |
| `docs/04-sermon-archive.md` | The 2,345-sermon media rescue. |
| `docs/05-why-each-service.md` | Historical rationale. Its hosting recommendation is superseded. |
| `BRAND.md` | Palette derivation, type identification, asset prompt library. |
| `CONTENT-SOURCES.md` | Theirs-versus-ours content provenance. Gitignored, local only. |

Where docs disagree, `01-build-plan.md` wins, then `02-runbook.md`.
`docs/_superseded/` is dead weight kept for reference. Do not follow it.

## Deployment: not yet

**Nothing deploys to Cloudflare until prelaunch.** Work locally and commit to git. The existing
Vercel demo stays the review surface. Run `npm run build` after each change to confirm the static
export still succeeds; that is the check that replaces deploying early.

No Cloudflare or Sanity account exists yet, and none is needed to build the page set.

## The things most likely to trip you up

- **Do not run `create-next-app`.** `site/` is already the real app: Next.js 16, Tailwind v4, with
  the design system in `app/globals.css`.
- **Hosting is Cloudflare Workers static assets, not Vercel.** Anything in `docs/_superseded/` or
  the README that says Vercel is out of date.
- **There are no individual sermon pages.** `/watch` is one page filtering client-side over a JSON
  index. See `docs/01-build-plan.md` §1.
- **Palette is locked** in `app/globals.css` under `@theme`. Three rules are not negotiable: the
  logotype never sits dark on Baptism Blue, yellow only ever appears on a dark ground, and red is
  an accent and never a field. `#C44932` is display-only at 24px+ and needs its own token.
- **Custom CSS lives inside `@layer base` / `@layer components`.** Outside a layer it outranks
  Tailwind utilities and things like `lg:hidden` silently stop working.
- **Tailwind variants do not apply to custom `@layer components` classes.** Use border utilities
  pointed at `var(--rule)`.
- **Scripture is NKJV, verbatim, with its reference.** Doctrinal copy is the church's wording,
  tightened by deleting at most. Invent nothing about the church. Anything without a source is a
  short placeholder marked `PLACEHOLDER` in a comment, never plausible filler.
- **The logotype is artwork.** Never set "Calvary Chapel" in a font.
- **Every page carries the motion grammar, the homepage's included.** The runtime in
  `components/Motion.tsx` is global; a page opts in with attributes: `data-reveal=""` on an eyebrow,
  a lede, a body block or a card; `data-reveal="clip"` on a display heading, its text wrapped in a
  `<span>`; `data-late=""` beside `data-reveal` on a plate that follows its heading; `data-stagger=""`
  on a list that is a real sequence, `data-reveal=""` on its items; `data-drift=""` only on
  background art with slack. One attribute per block, never per paragraph; nothing on navs, section
  wrappers or images themselves. The shared components (`PageHeader`, `CTABand`, `PosterBand`,
  `Facts`, `Verse`, `StepSequence`, `ActionDetailSection`; `MinistryGrid` and `EventList` via
  `reveal`) carry their own. A new page without the attributes is unfinished (Drew, September 4).
- **Nothing in `site/public` is optimized.** `output: 'export'` has no image optimizer; the custom
  loader in `lib/image-loader.ts` only resizes Sanity CDN URLs. Anything committed to `public/` ships
  byte-for-byte, so it must be hand-sized WebP at the largest size it is displayed, never a PNG
  straight from a phone or a generator. The 3 MB PNGs were converted with `sharp` at q 70–82.

## Working style

Don't over-test. Build passes, one screenshot of what changed, push. Skip multi-breakpoint sweeps
and re-screenshotting after small fixes unless there is a specific question whose answer changes
what you do. Measurement is warranted for new or changed design.
