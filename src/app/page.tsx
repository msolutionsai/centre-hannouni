import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { ScrollReset } from "@/components/ui/ScrollReset";
import { Credibility } from "@/components/sections/Credibility";
import { Manifest } from "@/components/sections/Manifest";
import { Doctor } from "@/components/sections/Doctor";
import { Centre } from "@/components/sections/Centre";
import { Interventions } from "@/components/sections/Interventions";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

// Regenerate the static HTML daily. Without this the page was edge-cached
// for weeks, so any date-derived markup baked in at build time (closure
// banner, date-picker bounds) stayed frozen long past its validity.
export const revalidate = 86400;

export default function Home() {
  return (
    <main className="relative">
      <ScrollReset />
      <Nav />
      <Hero />
      <Credibility />
      <Interventions />
      <Manifest />
      <Centre />
      <Doctor />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}
