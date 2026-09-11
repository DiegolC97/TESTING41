# architecture

How the system is put together — layers, boundaries, and how data flows.

## Next.js owns the full application

What: PokéPal uses the Next.js App Router with TypeScript; any future server endpoints belong in src/app/**/route.ts and there is no separate backend service · Why: the landing demo needs one local process and one shared application boundary · Where: src/app/, package.json
