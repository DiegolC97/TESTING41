import { connection } from "next/server";
import { pokedex, type PokedexEntry } from "@/lib/pokedex";

/**
 * The showcase reads a local dataset, so it can never really be slow, empty, or
 * broken. This switch exists so those states stay demonstrable: set
 * `SHOWCASE_MODE` before `npm run build` (or `npm run dev`) to force one.
 */
export type ShowcaseMode = "ready" | "empty" | "error" | "slow";

const showcaseModes: readonly string[] = ["ready", "empty", "error", "slow"];

export function showcaseMode(): ShowcaseMode {
  const requested = process.env.SHOWCASE_MODE ?? "ready";
  return showcaseModes.includes(requested) ? (requested as ShowcaseMode) : "ready";
}

/**
 * The single seam between the showcase section and its data. Everything the
 * grid renders comes through here, so the section's loading, empty, and error
 * branches are the only ones the UI needs to handle.
 */
export async function loadShowcase(): Promise<readonly PokedexEntry[]> {
  const mode = showcaseMode();

  if (mode === "slow") {
    // Opt out of static rendering so the delay — and the loading state it
    // exposes — happens per request instead of once at build time.
    await connection();
    await new Promise((resolve) => setTimeout(resolve, 2_500));
  }
  if (mode === "error") {
    throw new Error("The Pokédex data source is unavailable.");
  }

  return mode === "empty" ? [] : pokedex;
}
