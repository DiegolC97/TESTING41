import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PartnerDialog } from "@/components/landing/partner-dialog";
import { partners } from "@/lib/partners";

export function CtaBand() {
  return (
    <section id="start" aria-labelledby="cta-title" className="mx-auto w-full max-w-site scroll-mt-8 px-page pb-section">
      <div className="relative isolate flex flex-col gap-10 overflow-hidden rounded-3xl bg-foreground px-6 py-14 text-background md:flex-row md:items-center md:justify-between sm:px-12 sm:py-16">
        <div className="max-w-xl">
          <p className="flex items-center gap-2.5 text-eyebrow font-bold uppercase text-background/70">
            <span className="size-1.5 rounded-full bg-primary" />Ready when you are
          </p>
          <h2 id="cta-title" className="mt-4 font-display text-4xl leading-tight font-semibold tracking-tight sm:text-5xl">
            Your partner is out there<span className="text-primary">.</span>
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-background/80 sm:text-base">
            Three starters, one first hello, and a world that opens up from there. Take a look and see who feels like yours.
          </p>
          <PartnerDialog>
            <Button size="lg" className="mt-8 h-14 gap-3 rounded-full px-6 text-sm font-semibold transition-transform hover:-translate-y-0.5">
              Meet the starters <ArrowUpRight className="size-4" aria-hidden="true" />
            </Button>
          </PartnerDialog>
        </div>
        <div className="flex shrink-0 items-center gap-4 md:flex-col md:items-end">
          <div className="flex -space-x-4">
            {partners.map((partner) => (
              <span key={partner.id} className="flex size-16 items-center justify-center rounded-full border-2 border-foreground bg-background/10 sm:size-20">
                <Image src={`/pokemon/${partner.id}.png`} width={80} height={80} sizes="80px" alt={partner.alt} className="size-12 object-contain sm:size-16" />
              </span>
            ))}
          </div>
          <p className="max-w-40 text-xs leading-relaxed text-background/70 md:text-right">Bulbasaur, Charmander and Squirtle are waiting.</p>
        </div>
      </div>
    </section>
  );
}
