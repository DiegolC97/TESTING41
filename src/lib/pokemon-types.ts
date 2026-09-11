export const pokemonTypes = {
  normal: "bg-type-normal text-type-normal-foreground",
  fire: "bg-type-fire text-type-fire-foreground",
  water: "bg-type-water text-type-water-foreground",
  electric: "bg-type-electric text-type-electric-foreground",
  grass: "bg-type-grass text-type-grass-foreground",
  ice: "bg-type-ice text-type-ice-foreground",
  fighting: "bg-type-fighting text-type-fighting-foreground",
  poison: "bg-type-poison text-type-poison-foreground",
  ground: "bg-type-ground text-type-ground-foreground",
  flying: "bg-type-flying text-type-flying-foreground",
  psychic: "bg-type-psychic text-type-psychic-foreground",
  bug: "bg-type-bug text-type-bug-foreground",
  rock: "bg-type-rock text-type-rock-foreground",
  ghost: "bg-type-ghost text-type-ghost-foreground",
  dragon: "bg-type-dragon text-type-dragon-foreground",
  dark: "bg-type-dark text-type-dark-foreground",
  steel: "bg-type-steel text-type-steel-foreground",
  fairy: "bg-type-fairy text-type-fairy-foreground",
} as const;

export type PokemonType = keyof typeof pokemonTypes;
