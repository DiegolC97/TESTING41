import { SiteHeader } from "@/components/landing/site-header";
import { Hero } from "@/components/landing/hero";
import { Showcase } from "@/components/landing/showcase";
import { CtaBand } from "@/components/landing/cta-band";
import { SiteFooter } from "@/components/landing/site-footer";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="adventure" tabIndex={-1} className="outline-none">
        <Hero />
        <Showcase />
        <CtaBand />
      </main>
      <SiteFooter />
    </>
  );
}
