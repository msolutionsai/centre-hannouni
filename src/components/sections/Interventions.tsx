"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Portrait } from "@/components/ui/Portrait";
import { Reveal } from "@/components/ui/Reveal";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { Arrow } from "@/components/ui/Icons";
import { interventionDetails } from "@/lib/interventions";

export function Interventions() {
  return (
    <section
      id="interventions"
      className="relative bg-[var(--color-stone-warm)] pt-12 md:pt-16 pb-12 md:pb-16 overflow-hidden"
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-10">
        <Reveal>
          <div className="flex items-center gap-4 text-[var(--color-ink-muted)]">
            <span className="section-no">I · Interventions</span>
            <span className="h-px w-12 bg-[var(--color-line)]" />
          </div>
        </Reveal>

        <div className="mt-8 md:mt-10 grid grid-cols-12 gap-y-6 gap-x-0 md:gap-8 items-end">
          <div className="col-span-12 lg:col-span-8">
            <SplitHeading
              as="h2"
              className="display-lg text-[clamp(1.7rem,4.2vw,3.4rem)] leading-[1.05] text-[var(--color-ink)]"
              text="Chaque intervention,"
            />
            <div className="mt-1">
              <SplitHeading
                as="h2"
                className="display-lg italic text-[clamp(1.7rem,4.2vw,3.4rem)] leading-[1.05] text-[var(--color-cognac-deep)]"
                text="un protocole dédié."
                delay={0.08}
              />
            </div>
          </div>
          <Reveal delay={0.15} className="col-span-12 lg:col-span-4">
            <p className="font-display text-[clamp(0.98rem,1.1vw,1.1rem)] font-light leading-[1.5] tracking-[-0.005em] text-[var(--color-ink-soft)] max-w-[44ch]">
              Survolez une intervention pour en{" "}
              <span className="italic text-[var(--color-cognac-deep)]">découvrir l’univers</span>.
              Chaque dossier fait l’objet d’une analyse individualisée.
            </p>
          </Reveal>
        </div>

        {/* Cards — horizontal scroll mobile / 4×2 grid desktop */}
        <div
          className="
            mt-10 md:mt-14
            -mx-6 md:mx-0 px-6 md:px-0
            flex md:grid md:grid-cols-4
            gap-4 md:gap-5
            overflow-x-auto md:overflow-visible
            snap-x snap-mandatory md:snap-none
            no-scrollbar
          "
        >
          {interventionDetails.map((int, i) => (
            <motion.div
              key={int.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{
                duration: 0.9,
                delay: (i % 4) * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="snap-start shrink-0 w-[78%] sm:w-[60%] md:w-auto"
            >
              <Link
                href={`/interventions/${int.slug}`}
                className="
                  group relative block overflow-hidden
                  aspect-[5/6] md:aspect-[1/1]
                  bg-[var(--color-ink)]
                  rounded-[2px]
                  ring-1 ring-[var(--color-line)]
                  transition-[transform,box-shadow] duration-700 ease-out
                  hover:shadow-[0_30px_70px_-30px_rgba(20,23,26,0.55)]
                "
              >
                {/* Portrait */}
                <div className="absolute inset-0">
                  <div
                    className="absolute inset-0 transition-transform duration-[1300ms] ease-out group-hover:scale-[1.07]"
                  >
                    <Portrait
                      variant={int.hero.portrait}
                      className="h-full w-full"
                    />
                  </div>
                </div>

                {/* Vertical gradient — always visible, intensifies on hover */}
                <div
                  aria-hidden
                  className="
                    pointer-events-none absolute inset-x-0 bottom-0 h-[78%]
                    bg-[linear-gradient(to_top,rgba(20,23,26,0.95)_8%,rgba(20,23,26,0.55)_42%,rgba(20,23,26,0)_100%)]
                    transition-opacity duration-700 ease-out
                    opacity-90 group-hover:opacity-100
                  "
                />

                {/* Eyebrow + index — top */}
                <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4 md:p-5 z-10">
                  <span className="font-display italic text-[12px] text-[var(--color-cognac-soft)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.22em] text-[var(--color-ivory)]/70">
                    {int.category}
                  </span>
                </div>

                {/* Content — bottom; lifts subtly on hover, reveals teaser + CTA */}
                <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 z-10 text-[var(--color-ivory)]">
                  <h3
                    className="
                      font-display tracking-[-0.015em] leading-[1.1]
                      text-[clamp(1.4rem,1.8vw,1.55rem)]
                      transition-transform duration-700 ease-out
                      md:group-hover:-translate-y-1
                    "
                  >
                    {int.name}
                  </h3>

                  {/* Reveal block — visible by default on mobile, hover-reveal on md+ */}
                  <div
                    className="
                      mt-2
                      grid grid-rows-[1fr] md:grid-rows-[0fr] md:group-hover:grid-rows-[1fr]
                      transition-[grid-template-rows] duration-[750ms] ease-out
                    "
                  >
                    <div className="overflow-hidden">
                      <p
                        className="
                          font-display text-[13px] leading-[1.5] text-[var(--color-ivory)]/85
                          max-w-[34ch]
                          transition-opacity duration-500 delay-100 ease-out
                          opacity-100 md:opacity-0 md:group-hover:opacity-100
                        "
                      >
                        {int.teaser}
                      </p>
                      <div
                        className="
                          mt-4 inline-flex items-center gap-2
                          text-[10.5px] uppercase tracking-[0.22em] text-[var(--color-ivory)]
                          transition-all duration-500 delay-200 ease-out
                          opacity-100 md:opacity-0 md:group-hover:opacity-100
                          md:translate-y-1 md:group-hover:translate-y-0
                        "
                      >
                        <span className="h-px w-6 bg-[var(--color-cognac-soft)]" />
                        Découvrir
                        <Arrow size={11} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Cognac edge accent on hover */}
                <span
                  aria-hidden
                  className="
                    pointer-events-none absolute left-0 right-0 bottom-0 h-px
                    origin-left bg-[var(--color-cognac)]
                    scale-x-0 group-hover:scale-x-100
                    transition-transform duration-700 ease-out
                  "
                />
              </Link>
            </motion.div>
          ))}
        </div>

        <Reveal
          delay={0.1}
          className="mt-12 md:mt-14 flex flex-col items-start md:flex-row md:items-center justify-between gap-6 border-t border-[var(--color-line)] pt-8"
        >
          <p className="max-w-[50ch] text-[14px] leading-[1.65] text-[var(--color-ink-soft)]">
            Une intervention non listée ? Nous étudions chaque demande avec la même rigueur —
            parce qu’il n’existe pas deux visages identiques.
          </p>
          <a href="#rendez-vous" className="btn btn-primary">
            Demander une consultation
            <Arrow size={14} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
