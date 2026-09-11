# gotcha

A non-obvious pitfall or trap, learned the hard way.

## shadcn utility imports

What: The shadcn 4.21 CLI generated imports from an external cn package despite the configured utils alias; shared components use @/lib/utils instead · Why: the local helper applies tailwind-merge so consumer classes reliably override component defaults · Where: components.json, src/lib/utils.ts, src/components/ui/ · Learned: inspect utility imports after adding components with the CLI

## Production commands and inherited NODE_ENV

What: Clear an inherited NODE_ENV=development before production builds; the browser test server explicitly sets NODE_ENV=production · Why: this workspace exports development mode globally, which overrides Next.js command defaults and produces a build warning · Where: README.md, playwright.config.ts · Learned: let Next.js choose the mode for each command instead of exporting NODE_ENV globally
