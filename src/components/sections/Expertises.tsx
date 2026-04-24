"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { Plus, Minus, Check } from "@/components/ui/Icons";
import { expertiseAreas } from "@/lib/content";

export function Expertises() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section
      id="expertises"
      className="relative bg-[var(--color-ivory)] pt-16 md:pt-24 pb-16 md:pb-24"
    >
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <Reveal>
          <div className="flex items-center gap-4 text-[var(--color-ink-muted)]">
            <span className="section-no">IV · Domaines d’expertise</span>
            <span className="h-px w-12 bg-[var(--color-line)]" />
          </div>
        </Reveal>

        <div className="mt-10 md:mt-14 grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-7">
            <SplitHeading
              as="h2"
              className="display-lg text-[clamp(2rem,5.2vw,4.4rem)] text-[var(--color-ink)]"
              text="Cinq territoires,"
            />
            <div className="mt-2">
              <SplitHeading
                as="h2"
                className="display-lg italic text-[clamp(2rem,5.2vw,4.4rem)] text-[var(--color-cognac-deep)]"
                text="une seule exigence."
                delay={0.08}
              />
            </div>
          </div>
          <Reveal delay={0.15} className="col-span-12 lg:col-span-5 lg:pl-10 self-end">
            <p className="font-display text-[clamp(1.05rem,1.3vw,1.2rem)] font-light leading-[1.55] tracking-[-0.005em] text-[var(--color-ink-soft)] max-w-[46ch]">
              Chaque domaine d’intervention est traité avec une{" "}
              <span className="italic text-[var(--color-cognac-deep)]">rigueur identique</span>{" "}
              : un diagnostic méticuleux, un protocole personnalisé, une exécution
              millimétrée et un suivi intégré. C’est cette discipline qui fait
              la crédibilité du résultat.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 md:mt-20 border-t border-[var(--color-line)]">
          {expertiseAreas.map((area, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className="border-b border-[var(--color-line)]"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="group grid w-full grid-cols-12 items-center gap-6 py-7 md:py-10 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="col-span-2 md:col-span-1 font-display italic text-[14px] text-[var(--color-cognac-deep)]">
                    {area.num}
                  </span>
                  <span className="col-span-7 md:col-span-7 font-display text-[clamp(1.4rem,3.2vw,2.4rem)] tracking-[-0.02em] text-[var(--color-ink)] group-hover:text-[var(--color-cognac-deep)] transition-colors">
                    {area.name}
                  </span>
                  <span className="col-span-2 md:col-span-3 hidden md:block font-display italic text-[14px] text-[var(--color-ink-muted)]">
                    {area.lead}
                  </span>
                  <span className="col-span-3 md:col-span-1 flex justify-end">
                    <span
                      className={`grid h-11 w-11 place-items-center rounded-full border transition-colors ${
                        isOpen
                          ? "border-[var(--color-ink)] bg-[var(--color-ink)] text-[var(--color-ivory)]"
                          : "border-[var(--color-line)] text-[var(--color-ink)] group-hover:border-[var(--color-ink)]"
                      }`}
                    >
                      {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                    </span>
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-12 gap-6 pb-10 md:pb-14">
                        <div className="col-span-12 md:col-span-4 md:col-start-2">
                          <p className="text-[15px] leading-[1.8] text-[var(--color-ink-soft)]">
                            {area.body}
                          </p>
                        </div>
                        <ul className="col-span-12 md:col-span-6 md:col-start-7 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                          {area.items.map((it, j) => (
                            <li
                              key={j}
                              className="flex items-start gap-3 text-[14px] leading-[1.6] text-[var(--color-ink-soft)]"
                            >
                              <span className="mt-1 inline-flex h-4 w-4 items-center justify-center rounded-full border border-[var(--color-cognac)] text-[var(--color-cognac-deep)] shrink-0">
                                <Check size={10} />
                              </span>
                              {it}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
