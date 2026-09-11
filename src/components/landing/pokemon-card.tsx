"use client";

import { useState } from "react";
import Image from "next/image";
import { Ruler, Sparkles, Weight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Pokeball } from "@/components/pokeball";
import { TypeBadge } from "@/components/type-badge";
import type { PokedexEntry } from "@/lib/pokedex";

const cardSizes = "(min-width: 1280px) 18rem, (min-width: 768px) 30vw, (min-width: 480px) 44vw, calc(100vw - 2.5rem)";

/** Shown in place of the artwork when an image fails to load, so one broken file never empties a card. */
function ArtworkFallback({ label }: { label: string }) {
  return (
    <span role="img" aria-label={label} className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-muted-foreground">
      <Pokeball className="size-12 opacity-60" />
      <span className="px-4 text-center text-xs leading-relaxed">Artwork unavailable</span>
    </span>
  );
}

export function PokemonCard({ pokemon }: { pokemon: PokedexEntry }) {
  const [artworkFailed, setArtworkFailed] = useState(false);
  const [dialogArtworkFailed, setDialogArtworkFailed] = useState(false);
  const typeLabel = pokemon.types.join(" and ");

  return (
    <Dialog>
      {/* The card clips its artwork, so the focus ring is drawn on the card itself. */}
      <Card className="group relative isolate h-full gap-0 overflow-hidden rounded-2xl p-0 transition-transform duration-200 hover:-translate-y-1 hover:shadow-md has-[:focus-visible]:-translate-y-1 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-4 has-[:focus-visible]:outline-ring">
        <div className="relative isolate flex aspect-square items-center justify-center bg-muted">
          <span aria-hidden="true" className="absolute inset-x-0 top-1 text-center font-display text-6xl leading-none font-bold tracking-tighter text-foreground/8">
            {pokemon.number}
          </span>
          {artworkFailed ? (
            <ArtworkFallback label={`${pokemon.name} artwork could not be loaded`} />
          ) : (
            <Image
              src={`/pokemon/${pokemon.id}.png`}
              width={475}
              height={475}
              sizes={cardSizes}
              alt={pokemon.alt}
              onError={() => setArtworkFailed(true)}
              className="relative h-full w-full object-contain p-5 transition-transform duration-200 group-hover:scale-105"
            />
          )}
        </div>
        <div className="flex flex-1 flex-col gap-3 p-5">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="font-display text-2xl leading-none font-semibold tracking-tight">{pokemon.name}</h3>
            <span className="text-xs font-semibold tabular-nums text-muted-foreground">#{pokemon.number}</span>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">{pokemon.tagline}</p>
          <div className="mt-auto flex flex-wrap gap-2 pt-1">
            {pokemon.types.map((type) => (
              <TypeBadge key={type} type={type} className="px-2.5 text-xs" />
            ))}
          </div>
        </div>
        <DialogTrigger asChild>
          <button type="button" className="absolute inset-0 z-10 rounded-2xl">
            <span className="sr-only">{`${pokemon.name}, number ${pokemon.number}, ${typeLabel} type. Open details.`}</span>
          </button>
        </DialogTrigger>
      </Card>

      <DialogContent className="max-h-[90dvh] overflow-y-auto rounded-2xl p-5 sm:max-w-xl sm:p-8">
        <DialogHeader className="pr-6 text-left">
          <p className="text-eyebrow font-bold uppercase text-primary">{pokemon.category}</p>
          <DialogTitle className="font-display text-3xl tracking-tight">
            {pokemon.name} <span className="text-muted-foreground">#{pokemon.number}</span>
          </DialogTitle>
          <DialogDescription>{pokemon.tagline}</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-5 rounded-xl bg-muted p-5 sm:flex-row sm:items-center">
          <div className="relative isolate mx-auto flex aspect-square w-40 shrink-0 items-center justify-center sm:w-48">
            {dialogArtworkFailed ? (
              <ArtworkFallback label={`${pokemon.name} artwork could not be loaded`} />
            ) : (
              <Image
                src={`/pokemon/${pokemon.id}.png`}
                width={475}
                height={475}
                sizes="12rem"
                alt={pokemon.alt}
                onError={() => setDialogArtworkFailed(true)}
                className="h-full w-full object-contain"
              />
            )}
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap gap-2">
              {pokemon.types.map((type) => (
                <TypeBadge key={type} type={type} />
              ))}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{pokemon.description}</p>
          </div>
        </div>
        <dl className="grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
          <div>
            <dt className="flex items-center gap-1.5 text-muted-foreground"><Ruler className="size-4" aria-hidden="true" />Height</dt>
            <dd className="mt-1 font-semibold">{pokemon.height}</dd>
          </div>
          <div>
            <dt className="flex items-center gap-1.5 text-muted-foreground"><Weight className="size-4" aria-hidden="true" />Weight</dt>
            <dd className="mt-1 font-semibold">{pokemon.weight}</dd>
          </div>
          <div>
            <dt className="flex items-center gap-1.5 text-muted-foreground"><Sparkles className="size-4" aria-hidden="true" />Abilities</dt>
            <dd className="mt-1 font-semibold">{pokemon.abilities.join(", ")}</dd>
          </div>
          <div>
            <dt className="flex items-center gap-1.5 text-muted-foreground"><Pokeball className="size-4" />Found in</dt>
            <dd className="mt-1 font-semibold">{pokemon.habitat}</dd>
          </div>
        </dl>
      </DialogContent>
    </Dialog>
  );
}
