import { Suspense } from "react";
import { Sparkles } from "lucide-react";
import { PokemonCard } from "@/components/landing/pokemon-card";
import { ShowcaseEmpty, ShowcaseError, ShowcaseLoading, showcaseGridClassName } from "@/components/landing/showcase-states";
import type { PokedexEntry } from "@/lib/pokedex";
import { loadShowcase } from "@/lib/showcase";

async function ShowcaseGrid() {
  let pokemon: readonly PokedexEntry[];

  try {
    pokemon = await loadShowcase();
  } catch (error) {
    console.error("Showcase data source failed:", error);
    return <ShowcaseError />;
  }

  if (pokemon.length === 0) return <ShowcaseEmpty />;

  return (
    <ul className={showcaseGridClassName} aria-label="Pokémon in the Pokédex">
      {pokemon.map((entry) => (
        <li key={entry.id} className="min-w-0">
          <PokemonCard pokemon={entry} />
        </li>
      ))}
    </ul>
  );
}

export function Showcase() {
  return (
    <section id="showcase" aria-labelledby="showcase-title" className="mx-auto w-full max-w-site scroll-mt-8 px-page py-section">
      <div className="flex flex-col gap-5 pb-10 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="flex items-center gap-2.5 text-eyebrow font-bold uppercase text-muted-foreground">
            <span className="size-1.5 rounded-full bg-primary" />The Pokédex
          </p>
          <h2 id="showcase-title" className="mt-4 max-w-xl font-display text-4xl leading-tight font-semibold tracking-tight sm:text-5xl">
            Every partner,<br />a whole story<span className="text-primary">.</span>
          </h2>
        </div>
        <p className="flex max-w-sm items-start gap-2.5 text-sm leading-relaxed text-muted-foreground">
          <Sparkles className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
          Pick any card to meet them properly — type, size, abilities, and where you might run into one.
        </p>
      </div>
      <Suspense fallback={<ShowcaseLoading />}>
        <ShowcaseGrid />
      </Suspense>
    </section>
  );
}
