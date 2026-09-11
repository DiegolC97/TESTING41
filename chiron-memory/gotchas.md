# gotcha

A non-obvious pitfall or trap, learned the hard way.

## shadcn utility imports

What: The shadcn 4.21 CLI generated imports from an external cn package despite the configured utils alias; shared components use @/lib/utils instead · Why: the local helper applies tailwind-merge so consumer classes reliably override component defaults · Where: components.json, src/lib/utils.ts, src/components/ui/ · Learned: inspect utility imports after adding components with the CLI

## Production commands and inherited NODE_ENV

What: Clear an inherited NODE_ENV=development before production builds; the browser test server explicitly sets NODE_ENV=production · Why: this workspace exports development mode globally, which overrides Next.js command defaults and produces a build warning · Where: README.md, playwright.config.ts · Learned: let Next.js choose the mode for each command instead of exporting NODE_ENV globally

## Route segment config takes literals only

What: `export const dynamic = process.env.X === "slow" ? "force-dynamic" : "auto"` fails the build; the slow mode opts out of prerendering by awaiting `connection()` inside the loader instead · Why: Next statically parses route segment config at compile time and rejects any expression · Where: src/app/page.tsx, src/lib/showcase.ts · Learned: choose rendering mode with a runtime API, not with computed config exports

## Focus rings clipped by overflow-hidden cards

What: The card's full-bleed trigger button sits inside an `overflow-hidden` Card, so its focus outline was invisible; the ring is drawn on the card shell with `has-[:focus-visible]:outline-*` · Why: an outline with a positive offset is painted outside the child's box and clipped by the clipping ancestor · Where: src/components/landing/pokemon-card.tsx · Learned: assert the ring is visible on the element that actually paints it, not just that `outline-width` computes

## Browser tests and lazily streamed content

What: Waiting on `image.decode()` hangs or throws EncodingError for below-the-fold artwork, and `animation.finished` rejects when React swaps out a streamed Suspense fallback; the helpers set `loading = "eager"` first and skip infinite animations while swallowing cancellations · Why: lazy images never load off-screen and removed placeholders cancel their animations · Where: tests/landing.spec.ts · Learned: assertions on counts of streamed content need an auto-waiting expect, since `locator.count()` returns 0 against the loading state
