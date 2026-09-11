import { pokedex, type PokedexEntry } from "@/lib/pokedex";

const starterIds = ["bulbasaur", "charmander", "squirtle"];

/** The three starters featured in the hero's partner dialog, from the shared dataset. */
export const partners: readonly PokedexEntry[] = starterIds.map((id) => {
  const entry = pokedex.find((candidate) => candidate.id === id);
  if (!entry) throw new Error(`Missing starter "${id}" in the Pokédex dataset.`);
  return entry;
});
