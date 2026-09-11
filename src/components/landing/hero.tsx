import Image from "next/image";
import { ArrowDown, ArrowRight, ArrowUpRight, Compass, Heart, Sparkles, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Pokeball } from "@/components/pokeball";
import { TypeBadge } from "@/components/type-badge";
import { PartnerDialog } from "@/components/landing/partner-dialog";
import { TypeDialog } from "@/components/landing/type-dialog";

export function Hero() {
  return (
    <div className="mx-auto w-full max-w-site px-page">
      <section aria-labelledby="hero-title" className="grid items-center gap-10 pt-8 pb-12 sm:pt-12 md:grid-cols-[1.1fr_1fr] md:gap-6 lg:gap-8 lg:pt-14 lg:pb-16">
        <div className="relative z-10 min-w-0">
          <Badge variant="outline" className="gap-2.5 rounded-full border-border bg-card/60 px-3.5 py-2 text-eyebrow font-bold uppercase text-muted-foreground">
            <span className="size-1.5 rounded-full bg-primary" />A new adventure is calling
          </Badge>
          <h1 id="hero-title" className="mt-6 font-display text-hero font-semibold">
            Small<br />beginnings.<br /><span className="text-primary">Big adventures.</span>
          </h1>
          <p className="mt-6 max-w-sm text-base leading-relaxed text-muted-foreground sm:text-lg">
            A whole world to discover. A partner by your side. Find your Pokémon and let a little curiosity take you somewhere extraordinary.
          </p>
          <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <PartnerDialog><Button size="lg" className="h-14 gap-3 rounded-full px-6 text-sm font-semibold shadow-sm transition-transform hover:-translate-y-0.5">Find your partner <ArrowUpRight className="size-4" aria-hidden="true" /></Button></PartnerDialog>
            <TypeDialog><Button size="lg" variant="ghost" className="h-14 gap-2.5 rounded-full px-5 text-sm">Explore the types <ArrowRight className="size-4" aria-hidden="true" /></Button></TypeDialog>
          </div>
          <div className="mt-8 flex items-center gap-3 sm:mt-10">
            <div className="flex -space-x-3">
              {(["bulbasaur", "charmander", "squirtle"] as const).map((name) => (
                <div key={name} className="flex size-11 items-center justify-center rounded-full border-2 border-background bg-accent">
                  <Image src={`/pokemon/${name}.png`} width={36} height={36} alt={`${name[0].toUpperCase() + name.slice(1)} starter Pokémon`} className="size-9 object-contain" />
                </div>
              ))}
            </div>
            <p className="text-xs leading-relaxed text-muted-foreground"><span className="font-semibold text-foreground">A first partner. A forever friend.</span><br />Your story starts with a hello.</p>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-lg px-5 pt-8 pb-24 sm:px-8 md:px-3 md:pt-0 lg:px-8" aria-label="Featured Pokémon">
          <div aria-hidden="true" className="absolute top-14 right-8 bottom-26 left-8 rotate-[-8deg] rounded-3xl border border-foreground/10 bg-hero-card-back sm:right-10 sm:left-10 md:top-6" />
          <div aria-hidden="true" className="absolute top-12 right-8 bottom-26 left-8 rotate-[6deg] rounded-3xl border border-foreground/10 bg-hero-card-accent sm:right-10 sm:left-10 md:top-4" />
          <Card className="relative rotate-[-3deg] gap-0 overflow-hidden rounded-3xl border border-ink/15 bg-hero-card p-0 text-ink shadow-card">
            <div className="flex items-center justify-between px-6 pt-6 sm:px-7 sm:pt-7 md:px-4 md:pt-5 lg:px-7 lg:pt-7">
              <span className="flex items-center gap-2 text-eyebrow font-bold uppercase"><span className="size-1.5 rounded-full bg-ink" />The original spark</span>
              <Pokeball className="size-7 text-ink/60" />
            </div>
            <div className="relative isolate aspect-square">
              <span aria-hidden="true" className="absolute inset-x-0 top-0 text-center font-display text-[clamp(7rem,15vw,12rem)] leading-none font-bold tracking-tighter text-ink/10">025</span>
              <div aria-hidden="true" className="absolute inset-10 -z-10 rounded-full border border-ink/10" />
              <div aria-hidden="true" className="absolute inset-14 -z-10 rounded-full border border-ink/10" />
              <Sparkles aria-hidden="true" className="absolute top-1/4 right-5 size-6 text-ink/60" strokeWidth={1.25} />
              <Zap aria-hidden="true" className="absolute bottom-1/4 left-5 size-7 text-ink/50" strokeWidth={1.25} />
              <Image src="/pokemon/pikachu.png" width={475} height={475} sizes="(min-width: 1024px) 440px, (min-width: 640px) 448px, calc(100vw - 80px)" preload alt="Pikachu smiling with rosy cheeks and a lightning-bolt-shaped tail" className="relative h-full w-full rotate-[3deg] object-contain p-3" />
            </div>
            <div className="px-6 pb-6 sm:px-7 sm:pb-7 md:px-4 md:pb-5 lg:px-7 lg:pb-7">
              <div className="flex items-end justify-between gap-3">
                <div><p className="mb-1 text-eyebrow font-semibold uppercase text-ink/70">Your daily dose of electric</p><h2 className="font-display text-4xl leading-none font-semibold tracking-tight sm:text-5xl md:text-3xl lg:text-5xl">Pikachu<span className="text-primary">.</span></h2></div>
                <TypeBadge type="electric" className="mb-1 border border-ink/20 bg-ink text-type-electric" />
              </div>
              <div className="mt-5 flex items-center justify-between border-t border-ink/20 pt-4 text-xs text-ink/75"><span>NO. 025 / KANTO</span><span className="flex items-center gap-1.5"><Zap className="size-3.5" aria-hidden="true" />100% personality</span></div>
            </div>
          </Card>
          <div className="absolute -right-1 bottom-2 flex rotate-[5deg] items-center gap-3 rounded-xl border bg-card px-4 py-3 shadow-float sm:right-0 sm:px-5 sm:py-4">
            <span className="flex size-10 items-center justify-center rounded-full bg-accent text-accent-foreground"><Heart className="size-5" aria-hidden="true" strokeWidth={1.5} /></span>
            <p className="text-xs leading-relaxed"><span className="font-semibold">More than a Pokémon.</span><br /><span className="text-muted-foreground">A friend for the journey.</span></p>
          </div>
          <span aria-hidden="true" className="absolute top-0 right-2 rotate-12 text-primary sm:right-0 md:-top-8"><Sparkles className="size-10" strokeWidth={1.25} /></span>
        </div>
      </section>

      <div className="flex flex-col justify-between gap-6 border-t py-7 sm:flex-row sm:items-center">
        <a href="#showcase" className="group flex items-center gap-3 text-eyebrow font-semibold uppercase text-muted-foreground transition-colors hover:text-foreground">
          <span className="flex size-9 items-center justify-center rounded-full border transition-transform group-hover:translate-y-0.5"><ArrowDown className="size-4 text-foreground" aria-hidden="true" /></span>
          Meet the Pokémon below
        </a>
        <div className="flex flex-wrap items-center gap-5 text-xs font-medium sm:gap-7">
          <span className="flex items-center gap-2"><Compass className="size-4 text-muted-foreground" aria-hidden="true" />18 unique types</span>
          <span className="flex items-center gap-2"><Heart className="size-4 text-muted-foreground" aria-hidden="true" />One special connection</span>
        </div>
      </div>
    </div>
  );
}
