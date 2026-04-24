"use client";

import { Reveal } from "@/components/ui/Reveal";
import { SplitHeading } from "@/components/ui/SplitHeading";

export function Manifest() {
  return (
    <section className="relative bg-[var(--color-ivory)] pt-16 md:pt-24 pb-16 md:pb-24">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <Reveal>
          <div className="flex items-center gap-4 text-[var(--color-ink-muted)]">
            <span className="section-no">I · Manifeste</span>
            <span className="h-px w-12 bg-[var(--color-line)]" />
          </div>
        </Reveal>

        <div className="mt-10 md:mt-14 grid grid-cols-12 gap-8 items-center">
          <div className="col-span-12 md:col-span-7">
            <SplitHeading
              as="h2"
              className="display-lg text-[clamp(1.9rem,5.05vw,4.3rem)] text-[var(--color-ink)]"
              text="La beauté n’appartient pas à l’outil."
            />
            <div className="mt-4">
              <SplitHeading
                as="h2"
                className="display-lg italic text-[clamp(1.9rem,5.05vw,4.3rem)] text-[var(--color-cognac-deep)]"
                text="Elle appartient au regard qui guide la main."
                delay={0.08}
              />
            </div>
          </div>

          <Reveal delay={0.15} className="col-span-12 md:col-span-5">
            <p className="max-w-[52ch] font-display text-[clamp(1.1rem,1.45vw,1.32rem)] font-light leading-[1.55] tracking-[-0.005em] text-[var(--color-ink-soft)]">
              Au Centre du Docteur Hannouni, chaque intervention est pensée comme un{" "}
              <span className="italic text-[var(--color-cognac-deep)]">acte d’architecture</span>{" "}
              : une{" "}
              <span className="italic text-[var(--color-cognac-deep)]">lecture anatomique</span>{" "}
              méthodique, une{" "}
              <span className="italic text-[var(--color-cognac-deep)]">intention esthétique</span>{" "}
              claire, une exécution d’une précision chirurgicale. Nous refusons les résultats
              démonstratifs. Nous cherchons l’harmonie, la justesse et la durabilité, trois
              exigences que nous mettons au service de chaque visage.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <span className="h-px w-10 bg-[var(--color-cognac)]" />
              <span className="font-display italic text-[15px] text-[var(--color-ink)]">
                Dr Hannouni Youssef
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
