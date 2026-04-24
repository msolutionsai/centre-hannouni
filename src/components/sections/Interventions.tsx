"use client";

import { motion } from "framer-motion";
import { Portrait } from "@/components/ui/Portrait";
import { Reveal } from "@/components/ui/Reveal";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { Arrow } from "@/components/ui/Icons";
import { interventionsHighlight } from "@/lib/content";

const variants: Array<"hero" | "portrait" | "result-a" | "result-b" | "surgery" | "hands" | "centre"> = [
  "portrait",
  "result-a",
  "hero",
  "result-b",
  "hands",
  "centre",
  "surgery",
  "result-a",
];

export function Interventions() {
  return (
    <section
      id="interventions"
      className="relative bg-[var(--color-stone-warm)] pt-16 md:pt-24 pb-16 md:pb-24"
    >
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <Reveal>
          <div className="flex items-center gap-4 text-[var(--color-ink-muted)]">
            <span className="section-no">V · Interventions</span>
            <span className="h-px w-12 bg-[var(--color-line)]" />
          </div>
        </Reveal>

        <div className="mt-10 md:mt-14 grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-8">
            <SplitHeading
              as="h2"
              className="display-lg text-[clamp(2rem,5.2vw,4.4rem)] text-[var(--color-ink)]"
              text="Chaque intervention,"
            />
            <div className="mt-2">
              <SplitHeading
                as="h2"
                className="display-lg italic text-[clamp(2rem,5.2vw,4.4rem)] text-[var(--color-cognac-deep)]"
                text="un protocole dédié."
                delay={0.08}
              />
            </div>
          </div>
          <Reveal delay={0.15} className="col-span-12 lg:col-span-4 self-end">
            <p className="font-display text-[clamp(1.05rem,1.3vw,1.2rem)] font-light leading-[1.55] tracking-[-0.005em] text-[var(--color-ink-soft)]">
              Les interventions ci-dessous ne constituent qu’un{" "}
              <span className="italic text-[var(--color-cognac-deep)]">aperçu</span>. Chaque
              dossier fait l’objet d’une analyse individualisée en consultation.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 md:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {interventionsHighlight.map((int, i) => (
            <motion.a
              key={i}
              href="#rendez-vous"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.9,
                delay: (i % 4) * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative overflow-hidden bg-[var(--color-ivory)] border border-[var(--color-line)] hover:border-[var(--color-ink)] transition-colors"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <motion.div
                  className="h-full w-full"
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Portrait variant={variants[i % variants.length]} className="h-full w-full" />
                </motion.div>
              </div>
              <div className="p-5 md:p-6">
                <div className="eyebrow mb-3">{int.sub}</div>
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-[22px] leading-[1.15] tracking-[-0.015em] text-[var(--color-ink)]">
                    {int.name}
                  </h3>
                  <span className="mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[var(--color-line)] text-[var(--color-ink)] group-hover:bg-[var(--color-ink)] group-hover:text-[var(--color-ivory)] group-hover:border-[var(--color-ink)] transition-all">
                    <Arrow size={12} />
                  </span>
                </div>
                <p className="mt-3 text-[13.5px] leading-[1.65] text-[var(--color-ink-soft)]">
                  {int.teaser}
                </p>
              </div>
            </motion.a>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-14 md:mt-20 flex flex-col items-start md:flex-row md:items-center justify-between gap-6 border-t border-[var(--color-line)] pt-10">
          <p className="max-w-[50ch] text-[14.5px] leading-[1.7] text-[var(--color-ink-soft)]">
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
