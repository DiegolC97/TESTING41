import { Badge } from "@/components/ui/badge";
import { pokemonTypes, type PokemonType } from "@/lib/pokemon-types";
import { cn } from "@/lib/utils";

export function TypeBadge({ type, className }: { type: PokemonType; className?: string }) {
  return (
    <Badge className={cn("gap-1.5 border-0 px-3 py-1 font-semibold capitalize", pokemonTypes[type], className)}>
      {type}
    </Badge>
  );
}
