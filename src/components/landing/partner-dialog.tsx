"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { TypeBadge } from "@/components/type-badge";
import { partners } from "@/lib/partners";
import { cn } from "@/lib/utils";

export function PartnerDialog({ children }: { children: ReactNode }) {
  const [selected, setSelected] = useState(0);
  const partner = partners[selected];

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[90dvh] overflow-y-auto rounded-2xl p-5 sm:max-w-xl sm:p-8">
        <DialogHeader className="pr-6 text-left">
          <p className="text-eyebrow font-bold uppercase text-primary">Good friends. Great beginnings.</p>
          <DialogTitle className="font-display text-3xl tracking-tight">Meet your first partner.</DialogTitle>
          <DialogDescription>Three familiar faces. A whole world of possibilities.</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-3 gap-2" role="group" aria-label="Choose a Pokémon to preview">
          {partners.map((item, index) => (
            <Button key={item.id} variant="outline" aria-pressed={selected === index} onClick={() => setSelected(index)} className={cn("h-auto min-h-11 flex-col gap-1 rounded-lg px-1 py-3 text-xs sm:text-sm", selected === index && "border-primary bg-primary/5 text-primary")}>
              <Image src={`/pokemon/${item.id}.png`} width={56} height={56} alt={`${item.name} portrait`} className="size-14 object-contain" />
              {item.name}
            </Button>
          ))}
        </div>
        <div className="rounded-xl bg-muted p-5" aria-live="polite" aria-atomic="true">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-eyebrow font-semibold uppercase text-muted-foreground">{partner.category}</p>
              <h3 className="mt-1 font-display text-3xl font-semibold">{partner.name}</h3>
            </div>
            <span className="font-display text-2xl text-muted-foreground">#{partner.number}</span>
          </div>
          <Image src={`/pokemon/${partner.id}.png`} width={475} height={475} sizes="224px" alt={`${partner.name}, ${partner.category.toLowerCase()}`} className="mx-auto size-44 object-contain sm:size-56" />
          <div className="mb-3 flex gap-2">{partner.types.map((type) => <TypeBadge key={type} type={type} />)}</div>
          <p className="text-sm leading-relaxed text-muted-foreground">{partner.description}</p>
          <dl className="mt-4 flex gap-8 border-t pt-4 text-sm">
            <div><dt className="text-muted-foreground">Height</dt><dd className="mt-1 font-semibold">{partner.height}</dd></div>
            <div><dt className="text-muted-foreground">Weight</dt><dd className="mt-1 font-semibold">{partner.weight}</dd></div>
          </dl>
        </div>
        <p className="flex items-center gap-2 text-xs text-muted-foreground"><ArrowUpRight className="size-4" aria-hidden="true" />Every adventure starts with a little curiosity.</p>
      </DialogContent>
    </Dialog>
  );
}
