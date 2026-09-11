"use client";

import type { ReactNode } from "react";
import { Sparkles } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { TypeBadge } from "@/components/type-badge";
import { pokemonTypes, type PokemonType } from "@/lib/pokemon-types";

const typeNames = Object.keys(pokemonTypes) as PokemonType[];

export function TypeDialog({ children }: { children: ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[90dvh] overflow-y-auto rounded-2xl p-5 sm:max-w-xl sm:p-8">
        <DialogHeader className="pr-6 text-left">
          <p className="text-eyebrow font-bold uppercase text-primary">A world of different personalities</p>
          <DialogTitle className="font-display text-3xl tracking-tight">Find your kind of extraordinary.</DialogTitle>
          <DialogDescription className="leading-relaxed">From fiery spirits to down-to-earth companions, every Pokémon has a type. Some have two. Get to know all 18.</DialogDescription>
        </DialogHeader>
        <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3" aria-label="All 18 Pokémon types">
          {typeNames.map((type, index) => (
            <li key={type} className="flex items-center gap-2 rounded-lg border bg-card p-3">
              <span className="text-xs tabular-nums text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>
              <TypeBadge type={type} className="px-2" />
            </li>
          ))}
        </ul>
        <p className="flex items-start gap-2 rounded-lg bg-accent p-4 text-sm leading-relaxed text-accent-foreground"><Sparkles className="mt-0.5 size-4 shrink-0" aria-hidden="true" />A Pokémon’s type shapes its strengths. The best partner? The one you connect with.</p>
      </DialogContent>
    </Dialog>
  );
}
