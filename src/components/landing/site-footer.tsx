import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Pokeball } from "@/components/pokeball";

const projectLinks = [
  { label: "Next.js", href: "https://nextjs.org" },
  { label: "shadcn/ui", href: "https://ui.shadcn.com" },
  { label: "PokeAPI sprites", href: "https://github.com/PokeAPI/sprites" },
];

const pageLinks = [
  { label: "The adventure", href: "#adventure" },
  { label: "The Pokédex", href: "#showcase" },
  { label: "Get started", href: "#start" },
];

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex w-full max-w-site flex-col gap-10 px-page py-12 md:flex-row md:justify-between md:gap-16">
        <div className="max-w-sm">
          <Link href="/" aria-label="PokéPal home" className="flex items-center gap-2 font-display text-2xl font-semibold tracking-tight">
            <Pokeball className="size-7 text-primary" />poképal<span className="-ml-1 text-primary">.</span>
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            A fan-made demo landing page, built to show a shared design system applied to repeated content. No accounts, no tracking, no external API.
          </p>
        </div>
        <div className="flex flex-col gap-8 sm:flex-row sm:gap-16">
          <nav aria-label="Footer navigation">
            <h2 className="text-eyebrow font-bold uppercase text-muted-foreground">This page</h2>
            <ul className="mt-4 flex flex-col gap-1 text-sm">
              {pageLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="inline-flex min-h-11 items-center transition-colors hover:text-primary">{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <h2 className="text-eyebrow font-bold uppercase text-muted-foreground">Built with</h2>
            <ul className="mt-4 flex flex-col gap-1 text-sm">
              {projectLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-1.5 transition-colors hover:text-primary">
                    {link.label}
                    <ArrowUpRight className="size-3.5" aria-hidden="true" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="mx-auto flex w-full max-w-site flex-col gap-2 border-t px-page py-6 text-xs leading-relaxed text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>A fan-made demo, inspired by a world we love. Pokémon belongs to Nintendo, Creatures &amp; GAME FREAK.</p>
        <p>Artwork from the PokeAPI sprites project. Built for demonstration only.</p>
      </div>
    </footer>
  );
}
