# PokéPal

A Pokémon-inspired landing demo built with Next.js App Router, TypeScript,
Tailwind CSS, and shadcn/ui.

## Run locally

Use Node.js 20.9 or newer and npm. From a fresh clone:

```sh
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000). After installation, `npm run dev`
is the single command needed to run the application. No environment variables,
API keys, or separate backend service are required.

## Check and preview

```sh
npm run lint
npm run typecheck
npm run build
npm start
```

The last command serves the production build at [localhost:3000](http://localhost:3000).
Stop the development server first if it is using that port.
If your shell exports `NODE_ENV=development`, unset it before building or starting
the production preview so Next.js can select production mode.

## Shared theme and components

- **`src/styles/theme.css`** is the design token source. It defines semantic
  colors, all 18 Pokémon types with readable foreground pairs, locally hosted
  Outfit (display) and DM Sans (body) typography, a 4px spacing base, responsive
  page/section spacing, radii, and shadows. The appearance is intentionally light,
  including on devices that prefer dark mode.
- **`src/app/globals.css`** imports Tailwind v4 and the theme, applies base
  styles, and respects reduced-motion preferences. Tailwind v4 uses CSS-based
  configuration; there is no `tailwind.config.ts`.
- **`src/components/ui/`** contains shadcn Button, Badge, Card, and Dialog.
  Their aliases and configuration live in `components.json`. Add components with
  `npx shadcn@4.21.0 add <component>` and keep `cn` imports pointed at
  `@/lib/utils`.
- **`src/components/type-badge.tsx`** and **`src/lib/pokemon-types.ts`** expose
  the type palette to future sections without duplicating color values.

For example, use `bg-primary text-primary-foreground`, `font-display`,
`px-page py-section`, `rounded-xl shadow-card`, or `<TypeBadge type="grass" />`.
Changing `--primary` in the theme updates both the hero accent and primary buttons.
Keep colors out of page markup. The standalone favicon has its own SVG fills.

## Hero behavior

The **Find your partner** CTA opens a starter preview; its three buttons switch
between Bulbasaur, Charmander, and Squirtle. **Explore the types** opens the
18-type guide. Both dialogs support keyboard navigation, Escape to close, and
return focus to their trigger. No account, persistence, or API is needed.

The page stays a Server Component; the interactive dialogs are small client
components. If server behavior is added later, use App Router route handlers
(`src/app/api/<name>/route.ts`) within this app. The showcase grid, CTA band,
and site footer are reserved for the next work order.

## Browser acceptance checks

After `npm run build`:

```sh
npx playwright install chromium
npm run test:e2e
```

Playwright starts and stops a production preview on port **4173**. Keep that port
free. Tests cover 375px, 768px, and 1440px layouts, overflow, image dimensions and
reserved space, CTA behavior, keyboard focus, metadata/favicon, token changes,
browser errors, and axe accessibility checks. Screenshots are written to the
ignored `test-results/` directory. No deployment configuration is included.

## Artwork

The four 475×475 Pokémon illustrations are bundled in `public/pokemon/`, sourced
from the [PokeAPI sprites repository](https://github.com/PokeAPI/sprites/tree/master/sprites/pokemon/other/official-artwork)
(Pokédex numbers 1, 4, 7, and 25). They have explicit dimensions and descriptive
alt text and are served through Next.js Image. Fonts are bundled from Fontsource;
neither fonts nor artwork require runtime requests to a third party.

This is an unofficial fan-made demo. Pokémon and its characters belong to
Nintendo, Creatures Inc., and GAME FREAK inc.
