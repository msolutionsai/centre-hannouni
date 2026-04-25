"use client";

import { Reveal, RevealStagger, StaggerItem } from "@/components/ui/Reveal";
import { SplitHeading } from "@/components/ui/SplitHeading";

const milestones = [
  { year: "1999", label: "Lauréat, Faculté de médecine de Casablanca" },
  { year: "—", label: "Doctorat en médecine — thèse en chirurgie de la main" },
  { year: "—", label: "Diplôme de l’Université Victor Segalen Bordeaux 2" },
  { year: "—", label: "Diplôme universitaire de chirurgie des lambeaux" },
  {
    year: "—",
    label:
      "Travaux de recherche en microchirurgie et chirurgie réparatrice · laboratoire d’anatomie, Université de Bordeaux",
  },
];

export function Doctor() {
  return (
    <section
      id="praticien"
      className="relative bg-[var(--color-ivory-50)] pt-16 md:pt-24 pb-16 md:pb-24 overflow-hidden"
    >
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <Reveal>
          <div className="flex items-center gap-4 text-[var(--color-ink-muted)]">
            <span className="section-no">IV · Le praticien</span>
            <span className="h-px w-12 bg-[var(--color-line)]" />
          </div>
        </Reveal>

        <div className="mt-10 md:mt-14 grid grid-cols-12 gap-y-8 gap-x-0 md:gap-8 lg:gap-14">
          {/* Portrait column */}
          <div className="col-span-12 md:col-span-5 lg:col-span-5">
            <Reveal>
              <div className="relative mx-auto aspect-[4/5] max-w-[320px] md:max-w-none rounded-[2px] overflow-hidden ring-1 ring-[var(--color-line)] bg-[var(--color-stone-warm)]">
                <div className="aura hidden md:block" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://pub-d3c23de249e5498eab4f6104d29b82ab.r2.dev/Centre%20Hannouni/DR%20HANNOUNI%20PROFIL.webp"
                  alt="Dr Hannouni Youssef — chirurgien esthétique & maxillo-facial"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover object-center"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-[35%] bg-[linear-gradient(to_top,rgba(20,23,26,0.45)_0%,rgba(20,23,26,0)_100%)]"
                />
                <div className="absolute bottom-5 left-5 right-5 flex items-center gap-3 text-[10px] uppercase tracking-[0.22em] text-[var(--color-ivory)]/85">
                  <span className="h-px w-8 bg-[var(--color-ivory)]/55" />
                  Portrait · 2024
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15} className="mt-6 flex items-center justify-between text-[11px] uppercase tracking-[0.22em] text-[var(--color-ink-muted)]">
              <span>Dr Hannouni Y.</span>
              <span>Marrakech · 20 ans</span>
            </Reveal>
          </div>

          {/* Biography column */}
          <div className="col-span-12 md:col-span-7 lg:col-span-7 lg:pl-10">
            <SplitHeading
              as="h2"
              className="display-lg text-[clamp(1.75rem,5vw,4rem)] text-[var(--color-ink)]"
              text="Vingt années au service"
            />
            <div className="mt-2">
              <SplitHeading
                as="h2"
                className="display-lg italic text-[clamp(1.75rem,5vw,4rem)] text-[var(--color-cognac-deep)]"
                text="de la face."
                delay={0.06}
              />
            </div>

            <Reveal delay={0.2} className="mt-8 max-w-[58ch]">
              <p className="font-display text-[clamp(1.05rem,1.3vw,1.2rem)] font-light leading-[1.55] tracking-[-0.005em] text-[var(--color-ink-soft)]">
                Le Docteur Hannouni Youssef exerce à Marrakech, dans son centre de
                chirurgie esthétique et maxillo-faciale situé au cœur de Guéliz. Fort
                d’une expérience de vingt ans au service de cet{" "}
                <span className="italic text-[var(--color-cognac-deep)]">art scientifique</span>{" "}
                qu’est la chirurgie plastique, esthétique et réparatrice de la face, il
                développe une approche où la précision médicale et le sens esthétique ne
                font qu’un.
              </p>
            </Reveal>

            <RevealStagger className="mt-12 md:mt-16" stagger={0.09}>
              <div className="eyebrow mb-6">Parcours · Diplômes</div>
              <ul className="divide-y divide-[var(--color-line)]">
                {milestones.map((m, i) => (
                  <StaggerItem key={i}>
                    <li className="grid grid-cols-12 gap-4 py-5 md:py-6">
                      <span className="col-span-3 md:col-span-2 font-display italic text-[15px] text-[var(--color-cognac-deep)]">
                        {m.year}
                      </span>
                      <span className="col-span-9 md:col-span-10 text-[14.5px] leading-[1.6] text-[var(--color-ink-soft)]">
                        {m.label}
                      </span>
                    </li>
                  </StaggerItem>
                ))}
              </ul>
            </RevealStagger>
          </div>
        </div>
      </div>
    </section>
  );
}
