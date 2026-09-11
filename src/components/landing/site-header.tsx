import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Pokeball } from "@/components/pokeball";
import { PartnerDialog } from "@/components/landing/partner-dialog";
import { TypeDialog } from "@/components/landing/type-dialog";

export function SiteHeader() {
  return (
    <>
      <a href="#adventure" className="sr-only fixed top-4 left-4 z-50 rounded-md bg-foreground px-5 py-3 text-background focus:not-sr-only">Skip to adventure</a>
      <header className="mx-auto flex w-full max-w-site items-center justify-between gap-4 px-page py-6 sm:py-8">
        <Link href="/" aria-label="PokéPal home" className="flex items-center gap-2 font-display text-3xl font-semibold tracking-tight">
          <Pokeball className="size-9 text-primary" />poképal<span className="-ml-1 text-primary">.</span>
        </Link>
        <nav aria-label="Main navigation" className="hidden items-center gap-7 text-sm font-medium md:flex">
          <a href="#adventure" className="inline-flex min-h-11 items-center gap-2 transition-colors hover:text-primary"><span className="size-1.5 rounded-full bg-primary" />The adventure</a>
          <a href="#showcase" className="inline-flex min-h-11 items-center transition-colors hover:text-primary">The Pokédex</a>
          <TypeDialog><Button variant="ghost" className="min-h-11 px-0 hover:bg-transparent hover:text-primary">Pokémon types</Button></TypeDialog>
        </nav>
        <PartnerDialog><Button variant="outline" className="h-11 gap-3 rounded-full border-foreground/25 bg-transparent px-5 text-xs sm:text-sm">Let’s go <ArrowUpRight aria-hidden="true" /></Button></PartnerDialog>
      </header>
    </>
  );
}
