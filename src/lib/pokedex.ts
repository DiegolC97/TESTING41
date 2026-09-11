import type { PokemonType } from "@/lib/pokemon-types";

export type PokedexEntry = {
  /** Matches the artwork file name in public/pokemon/<id>.png. */
  id: string;
  name: string;
  /** Pokédex number, already padded for display. */
  number: string;
  category: string;
  types: readonly PokemonType[];
  /** One line shown on the card. */
  tagline: string;
  /** Fuller copy shown in the detail dialog. */
  description: string;
  height: string;
  weight: string;
  abilities: readonly string[];
  habitat: string;
  /** Meaningful alt text for the bundled artwork. */
  alt: string;
};

/**
 * The mock dataset behind the showcase. Static, committed, and read locally —
 * nothing here talks to a network service. Add or remove entries freely; the
 * showcase adapts, including to an empty list.
 */
export const pokedex = [
  {
    id: "bulbasaur",
    name: "Bulbasaur",
    number: "001",
    category: "The Seed Pokémon",
    types: ["grass", "poison"],
    tagline: "Patient, steady, always growing.",
    description:
      "A little sunshine goes a long way. With a seed on its back and a gentle spirit, Bulbasaur is ready to grow alongside you.",
    height: "0.7 m",
    weight: "6.9 kg",
    abilities: ["Overgrow", "Chlorophyll"],
    habitat: "Kanto grasslands",
    alt: "Bulbasaur, a small blue-green Pokémon with a plant bulb on its back",
  },
  {
    id: "charmander",
    name: "Charmander",
    number: "004",
    category: "The Lizard Pokémon",
    types: ["fire"],
    tagline: "A bright spark with a brave heart.",
    description:
      "A bright spark with a brave heart. The flame on Charmander’s tail reflects its energy, and there’s plenty of adventure in this little one.",
    height: "0.6 m",
    weight: "8.5 kg",
    abilities: ["Blaze", "Solar Power"],
    habitat: "Kanto mountains",
    alt: "Charmander, an orange lizard Pokémon with a flame burning on its tail",
  },
  {
    id: "squirtle",
    name: "Squirtle",
    number: "007",
    category: "The Tiny Turtle Pokémon",
    types: ["water"],
    tagline: "Cool head, sturdy shell, big smile.",
    description:
      "Curious, cool, and always up for a splash. Squirtle feels at home by the water, with a sturdy shell for wherever the journey leads.",
    height: "0.5 m",
    weight: "9.0 kg",
    abilities: ["Torrent", "Rain Dish"],
    habitat: "Kanto shorelines",
    alt: "Squirtle, a blue turtle Pokémon with a brown shell and a curled tail",
  },
  {
    id: "pikachu",
    name: "Pikachu",
    number: "025",
    category: "The Mouse Pokémon",
    types: ["electric"],
    tagline: "Your daily dose of electric.",
    description:
      "Cheerful, quick, and full of sparks. Pikachu stores electricity in its cheeks and shares its good mood with everyone nearby.",
    height: "0.4 m",
    weight: "6.0 kg",
    abilities: ["Static", "Lightning Rod"],
    habitat: "Kanto forests",
    alt: "Pikachu, a yellow mouse Pokémon with rosy cheeks and a lightning-bolt tail",
  },
  {
    id: "jigglypuff",
    name: "Jigglypuff",
    number: "039",
    category: "The Balloon Pokémon",
    types: ["normal", "fairy"],
    tagline: "Sings first, asks questions later.",
    description:
      "A soft voice with a soft heart. Jigglypuff hums a lullaby that soothes anyone listening — sometimes a little too well.",
    height: "0.5 m",
    weight: "5.5 kg",
    abilities: ["Cute Charm", "Competitive"],
    habitat: "Kanto meadows",
    alt: "Jigglypuff, a round pink Pokémon with large blue eyes and a curl of hair",
  },
  {
    id: "gengar",
    name: "Gengar",
    number: "094",
    category: "The Shadow Pokémon",
    types: ["ghost", "poison"],
    tagline: "A grin in the corner of your eye.",
    description:
      "Mischief with a smile. Gengar slips into shadows for a laugh, but it stays close to the friends it chooses.",
    height: "1.5 m",
    weight: "40.5 kg",
    abilities: ["Cursed Body"],
    habitat: "Kanto caves",
    alt: "Gengar, a round purple ghost Pokémon with a wide toothy grin",
  },
  {
    id: "onix",
    name: "Onix",
    number: "095",
    category: "The Rock Snake Pokémon",
    types: ["rock", "ground"],
    tagline: "Gentle giant, carved from stone.",
    description:
      "Enormous and surprisingly gentle. Onix tunnels through mountains at speed, leaving winding paths behind it.",
    height: "8.8 m",
    weight: "210.0 kg",
    abilities: ["Rock Head", "Sturdy"],
    habitat: "Kanto caves",
    alt: "Onix, a towering snake Pokémon built from grey boulders",
  },
  {
    id: "scyther",
    name: "Scyther",
    number: "123",
    category: "The Mantis Pokémon",
    types: ["bug", "flying"],
    tagline: "Precision at impossible speed.",
    description:
      "Fast enough to look like it vanished. Scyther moves with quiet focus, and every motion is exactly as sharp as it needs to be.",
    height: "1.5 m",
    weight: "56.0 kg",
    abilities: ["Swarm", "Technician"],
    habitat: "Kanto grasslands",
    alt: "Scyther, a green mantis Pokémon with scythe-shaped forearms",
  },
  {
    id: "lapras",
    name: "Lapras",
    number: "131",
    category: "The Transport Pokémon",
    types: ["water", "ice"],
    tagline: "A ride across a quiet sea.",
    description:
      "Kind, patient, and happy to carry you. Lapras crosses open water with a calm song and never rushes the journey.",
    height: "2.5 m",
    weight: "220.0 kg",
    abilities: ["Water Absorb", "Shell Armor"],
    habitat: "Kanto seas",
    alt: "Lapras, a blue sea Pokémon with a long neck and a ridged grey shell",
  },
  {
    id: "eevee",
    name: "Eevee",
    number: "133",
    category: "The Evolution Pokémon",
    types: ["normal"],
    tagline: "Endless possibility, in one small friend.",
    description:
      "A bundle of potential. Eevee adapts to wherever life takes it, which makes every Eevee’s story a little different.",
    height: "0.3 m",
    weight: "6.5 kg",
    abilities: ["Run Away", "Adaptability"],
    habitat: "Kanto towns",
    alt: "Eevee, a small brown fox Pokémon with a fluffy cream-coloured collar",
  },
  {
    id: "snorlax",
    name: "Snorlax",
    number: "143",
    category: "The Sleeping Pokémon",
    types: ["normal"],
    tagline: "Naps first. Everything else later.",
    description:
      "Easygoing to its core. Snorlax eats, sleeps, and makes room for one more friend on the pile.",
    height: "2.1 m",
    weight: "460.0 kg",
    abilities: ["Immunity", "Thick Fat"],
    habitat: "Kanto mountains",
    alt: "Snorlax, a large round Pokémon with a cream belly, sound asleep",
  },
  {
    id: "dragonite",
    name: "Dragonite",
    number: "149",
    category: "The Dragon Pokémon",
    types: ["dragon", "flying"],
    tagline: "Kindness with a wingspan.",
    description:
      "Powerful, but famously warm-hearted. Dragonite circles the globe helping travellers it finds lost at sea.",
    height: "2.2 m",
    weight: "210.0 kg",
    abilities: ["Inner Focus", "Multiscale"],
    habitat: "Kanto seas",
    alt: "Dragonite, a friendly orange dragon Pokémon with small green wings",
  },
] as const satisfies readonly PokedexEntry[];

export function findPokemon(id: string): PokedexEntry | undefined {
  return pokedex.find((entry) => entry.id === id);
}
