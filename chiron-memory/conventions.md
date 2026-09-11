# convention

A rule the codebase follows — naming, patterns, and where things live.

## Shared Pokémon theme contract

What: All application colors, the 18 Pokémon type pairs, font families, spacing, radii, and shadows are defined in src/styles/theme.css and exposed as Tailwind v4 utilities; type class names are enumerated in src/lib/pokemon-types.ts · Why: later sections must share one visual language and Tailwind needs complete class names to discover utilities · Where: src/styles/theme.css, src/lib/pokemon-types.ts, components.json · Learned: use semantic utilities and the type map instead of hard-coded colors or dynamically assembled Tailwind classes

## Validate accents as small text

What: The primary red and type foreground pairs are checked with axe in the landing and both dialogs · Why: an accent that passes as a large heading or a button on white may fail as small text on the cream background · Where: src/styles/theme.css, tests/landing.spec.ts · Learned: validate final rendered colors after entrance animations finish

## One Pokémon dataset feeds every section

What: src/lib/pokedex.ts is the single mock dataset; src/lib/partners.ts derives the hero's three starters from it instead of holding its own copies · Why: duplicated entries drift apart, and the hero and showcase must describe the same Pokémon the same way · Where: src/lib/pokedex.ts, src/lib/partners.ts

## Landing page composed in page.tsx

What: src/app/page.tsx composes SiteHeader, a `main#adventure` holding hero, showcase, and CTA band, then SiteFooter; each section applies its own `mx-auto max-w-site px-page` container · Why: sections need full-bleed backgrounds (the dark CTA band) that a single constrained wrapper would prevent · Where: src/app/page.tsx, src/components/landing/

## Showcase states switched with SHOWCASE_MODE

What: `SHOWCASE_MODE=empty|error|slow` forces the showcase's empty, error, and loading states; unset (the default `ready`) keeps the route static · Why: a local dataset can never produce those states on its own, so they would otherwise be unverifiable · Where: src/lib/showcase.ts, README.md · Learned: keep such a switch inside the data seam so no component needs a test-only branch
