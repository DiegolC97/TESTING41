# convention

A rule the codebase follows — naming, patterns, and where things live.

## Shared Pokémon theme contract

What: All application colors, the 18 Pokémon type pairs, font families, spacing, radii, and shadows are defined in src/styles/theme.css and exposed as Tailwind v4 utilities; type class names are enumerated in src/lib/pokemon-types.ts · Why: later sections must share one visual language and Tailwind needs complete class names to discover utilities · Where: src/styles/theme.css, src/lib/pokemon-types.ts, components.json · Learned: use semantic utilities and the type map instead of hard-coded colors or dynamically assembled Tailwind classes

## Validate accents as small text

What: The primary red and type foreground pairs are checked with axe in the landing and both dialogs · Why: an accent that passes as a large heading or a button on white may fail as small text on the cream background · Where: src/styles/theme.css, tests/landing.spec.ts · Learned: validate final rendered colors after entrance animations finish
