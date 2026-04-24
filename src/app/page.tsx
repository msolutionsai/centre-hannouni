import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { ScrollReset } from "@/components/ui/ScrollReset";
import { Credibility } from "@/components/sections/Credibility";
import { Manifest } from "@/components/sections/Manifest";
import { Doctor } from "@/components/sections/Doctor";
import { Centre } from "@/components/sections/Centre";
import { Interventions } from "@/components/sections/Interventions";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { WhyUs } from "@/components/sections/WhyUs";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="relative">
      <ScrollReset />
      <Nav />
      <Hero />
      <Credibility />
      <Manifest />
      <Doctor />
      <Centre />
      <Interventions />
      <BeforeAfter />
      <WhyUs />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}
