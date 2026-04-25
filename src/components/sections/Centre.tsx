"use client";

import { ExpandingGallery } from "@/components/ui/ExpandingGallery";
import { Reveal, RevealStagger, StaggerItem } from "@/components/ui/Reveal";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { centreFeatures } from "@/lib/content";

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1200&auto=format&fit=crop",
    alt: "Plateau technique · Bloc opératoire",
  },
  {
    src: "https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?q=80&w=1200&auto=format&fit=crop",
    alt: "Espace consultation",
  },
  {
    src: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1200&auto=format&fit=crop",
    alt: "Équipements médicaux",
  },
  {
    src: "https://images.unsplash.com/photo-1638202993928-7267aad84c31?q=80&w=1200&auto=format&fit=crop",
    alt: "Salon d’accueil",
  },
  {
    src: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?q=80&w=1200&auto=format&fit=crop",
    alt: "Suite post-opératoire",
  },
  {
    src: "https://images.unsplash.com/photo-1629904853716-f0bc54eea481?q=80&w=1200&auto=format&fit=crop",
    alt: "Détail · Lumière sur instruments",
  },
];

export function Centre() {
  return (
    <section
      id="centre"
      className="relative bg-[var(--color-ink)] text-[var(--color-ivory)] pt-16 md:pt-24 pb-16 md:pb-24 overflow-hidden"
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-10">
        <Reveal>
          <div className="flex items-center gap-4 text-[var(--color-ivory)]/60">
            <span className="font-display italic text-[14.5px] tracking-[0.14em] text-[var(--color-cognac-soft)]">
              III · Le centre
            </span>
            <span className="h-px w-12 bg-[var(--color-ivory)]/20" />
          </div>
        </Reveal>

        <div className="mt-10 md:mt-14 grid grid-cols-12 gap-y-8 gap-x-0 md:gap-8 lg:gap-14 items-end">
          <div className="col-span-12 lg:col-span-7">
            <SplitHeading
              as="h2"
              className="display-lg text-[clamp(1.75rem,5.2vw,4.4rem)]"
              text="Un écrin feutré"
            />
            <div className="mt-2 flex items-end gap-4">
              <span className="hidden md:block h-[2px] w-[120px] bg-[var(--color-cognac-soft)] translate-y-[-18px]" />
              <SplitHeading
                as="h2"
                className="display-lg italic text-[clamp(1.75rem,5.2vw,4.4rem)] text-[var(--color-cognac-soft)]"
                text="au cœur de Guéliz."
                delay={0.08}
              />
            </div>
          </div>

          <Reveal delay={0.2} className="col-span-12 lg:col-span-5">
            <p className="font-display text-[clamp(1.05rem,1.3vw,1.2rem)] font-light leading-[1.55] tracking-[-0.005em] text-[var(--color-ivory)]/80 max-w-[44ch]">
              Un centre pensé pour conjuguer{" "}
              <span className="italic text-[var(--color-cognac-soft)]">pratique médicale</span>,{" "}
              <span className="italic text-[var(--color-cognac-soft)]">maîtrise chirurgicale</span>{" "}
              et{" "}
              <span className="italic text-[var(--color-cognac-soft)]">sens esthétique</span> —
              équipé des technologies modernes, conforme aux normes internationales.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 md:mt-16">
          <ExpandingGallery images={galleryImages} />
        </div>

        <RevealStagger className="mt-16 md:mt-24 grid grid-cols-12 gap-x-8 gap-y-12" stagger={0.1}>
          {centreFeatures.map((f, i) => (
            <StaggerItem key={i} className="col-span-12 sm:col-span-6 lg:col-span-3">
              <span className="block h-px w-8 bg-[var(--color-cognac-soft)]" />
              <h3 className="mt-4 font-display text-[22px] leading-[1.2] tracking-[-0.01em] text-[var(--color-ivory)]">
                {f.title}
              </h3>
              <p className="mt-4 font-display text-[clamp(0.98rem,1.1vw,1.1rem)] font-light leading-[1.5] tracking-[-0.005em] text-[var(--color-ivory)]/70">
                {f.body}
              </p>
            </StaggerItem>
          ))}
        </RevealStagger>
      </div>

      {/* background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -right-40 h-[420px] w-[420px] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(201,164,122,0.18), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-40 h-[520px] w-[520px] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(74,94,84,0.22), transparent 70%)",
        }}
      />
    </section>
  );
}
