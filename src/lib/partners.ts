import type { PokemonType } from "@/lib/pokemon-types";

export const partners = [
  {
    id: "bulbasaur",
    name: "Bulbasaur",
    number: "001",
    category: "The Seed Pokémon",
    types: ["grass", "poison"],
    description: "A little sunshine goes a long way. With a seed on its back and a gentle spirit, Bulbasaur is ready to grow alongside you.",
    height: "0.7 m",
    weight: "6.9 kg",
  },
  {
    id: "charmander",
    name: "Charmander",
    number: "004",
    category: "The Lizard Pokémon",
    types: ["fire"],
    description: "A bright spark with a brave heart. The flame on Charmander’s tail reflects its energy, and there’s plenty of adventure in this little one.",
    height: "0.6 m",
    weight: "8.5 kg",
  },
  {
    id: "squirtle",
    name: "Squirtle",
    number: "007",
    category: "The Tiny Turtle Pokémon",
    types: ["water"],
    description: "Curious, cool, and always up for a splash. Squirtle feels at home by the water, with a sturdy shell for wherever the journey leads.",
    height: "0.5 m",
    weight: "9.0 kg",
  },
] as const satisfies ReadonlyArray<{
  id: string;
  name: string;
  number: string;
  category: string;
  types: readonly PokemonType[];
  description: string;
  height: string;
  weight: string;
}>;
