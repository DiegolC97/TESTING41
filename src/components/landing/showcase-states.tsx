import { CircleAlert, Compass } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Pokeball } from "@/components/pokeball";

export const showcaseGridClassName = "grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-4";

/** Shown while the dataset is still resolving. */
export function ShowcaseLoading() {
  return (
    <div>
      <p role="status" className="flex items-center gap-2.5 pb-5 text-sm text-muted-foreground">
        <Pokeball className="size-5 animate-spin text-primary" />
        Loading Pokémon…
      </p>
      <div className={showcaseGridClassName} aria-hidden="true">
        {Array.from({ length: 8 }, (_, index) => (
          <Card key={index} className="animate-pulse gap-0 overflow-hidden rounded-2xl p-0">
            <div className="aspect-square bg-muted" />
            <div className="flex flex-col gap-3 p-5">
              <div className="h-5 w-2/3 rounded-sm bg-muted" />
              <div className="h-4 w-full rounded-sm bg-muted" />
              <div className="h-6 w-20 rounded-full bg-muted" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

/** Shown when the dataset resolves with no entries. */
export function ShowcaseEmpty() {
  return (
    <Card className="items-center gap-3 rounded-2xl border-dashed bg-card/60 px-6 py-14 text-center">
      <Compass className="size-9 text-muted-foreground" strokeWidth={1.25} aria-hidden="true" />
      <h3 className="font-display text-2xl font-semibold tracking-tight">No Pokémon in the Pokédex yet</h3>
      <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
        This showcase reads a local dataset, and right now it has no entries. Add a Pokémon to it and the grid fills in again.
      </p>
    </Card>
  );
}

/** Shown when the data source fails. The rest of the page keeps working. */
export function ShowcaseError() {
  return (
    <Card className="items-center gap-3 rounded-2xl border-destructive/30 bg-card/60 px-6 py-14 text-center">
      <CircleAlert className="size-9 text-destructive" strokeWidth={1.25} aria-hidden="true" />
      <h3 className="font-display text-2xl font-semibold tracking-tight">We couldn’t load the Pokédex</h3>
      <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
        Something went wrong reading the Pokémon data. Nothing else on the page is affected — reload to try again.
      </p>
    </Card>
  );
}
