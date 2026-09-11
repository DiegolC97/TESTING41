# architecture

How the system is put together — layers, boundaries, and how data flows.

## Next.js owns the full application

What: PokéPal uses the Next.js App Router with TypeScript; any future server endpoints belong in src/app/**/route.ts and there is no separate backend service · Why: the landing demo needs one local process and one shared application boundary · Where: src/app/, package.json

## Showcase reads one local data seam

What: The showcase section gets its Pokémon only through `loadShowcase()` in src/lib/showcase.ts, an async function over the committed dataset, and renders loading, empty, and error branches around it · Why: the demo has no backend, but the section still needs the states an async source produces, and one seam keeps them triggerable from a single place · Where: src/lib/showcase.ts, src/components/landing/showcase.tsx
