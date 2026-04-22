"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { Arrow, Star } from "@/components/ui/Icons";
import { testimonials, clinic } from "@/lib/content";

export function Testimonials() {
  const [i, setI] = useState(0);
  const t = testimonials[i];

  return (
    <section className="relative bg-[var(--color-stone-warm)] py-24 md:py-36">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <Reveal>
          <div className="flex items-center gap-4 text-[var(--color-ink-muted)]">
            <span className="section-no">VIII · Témoignages</span>
            <span className="h-px w-12 bg-[var(--color-line)]" />
          </div>
        </Reveal>

        <div className="mt-10 md:mt-14 grid grid-cols-12 gap-8 items-end">
          <div className="col-span-12 md:col-span-8">
            <SplitHeading
              as="h2"
              className="display-lg text-[clamp(1.8rem,4.8vw,3.8rem)] text-[var(--color-ink)]"
              text="La parole"
            />
            <div className="mt-2">
              <SplitHeading
                as="h2"
                className="display-lg italic text-[clamp(1.8rem,4.8vw,3.8rem)] text-[var(--color-cognac-deep)]"
                text="de nos patients."
                delay={0.08}
              />
            </div>
          </div>
          <Reveal delay={0.2} className="col-span-12 md:col-span-4 flex items-center gap-3 text-[13px] text-[var(--color-ink-soft)]">
            <span className="flex text-[var(--color-cognac)]">
              {[0, 1, 2, 3, 4].map((n) => (
                <Star key={n} size={14} className="mr-0.5" />
              ))}
            </span>
            <span className="tracking-[0.04em]">4,9 / 5 · Google · {clinic.address.city}</span>
          </Reveal>
        </div>

        <div className="mt-16 md:mt-20 relative min-h-[240px]">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.35] tracking-[-0.01em] text-[var(--color-ink)] max-w-[68ch]"
            >
              <span className="text-[var(--color-cognac-deep)] italic">“</span>
              {t.body}
              <span className="text-[var(--color-cognac-deep)] italic">”</span>
              <footer className="mt-8 flex items-center gap-3 text-[12px] uppercase tracking-[0.22em] text-[var(--color-ink-muted)]">
                <span className="h-px w-10 bg-[var(--color-cognac)]" />
                <cite className="not-italic">
                  {t.author} — {t.source}
                </cite>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <div className="mt-12 md:mt-16 flex items-center justify-between border-t border-[var(--color-line)] pt-8">
          <div className="flex items-center gap-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                type="button"
                aria-label={`Témoignage ${idx + 1}`}
                onClick={() => setI(idx)}
                className={`h-[3px] transition-all ${
                  idx === i ? "w-12 bg-[var(--color-ink)]" : "w-6 bg-[var(--color-line)]"
                }`}
              />
            ))}
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setI((i - 1 + testimonials.length) % testimonials.length)}
              className="grid h-11 w-11 place-items-center rounded-full border border-[var(--color-line)] hover:border-[var(--color-ink)] transition-colors"
              aria-label="Précédent"
            >
              <Arrow size={14} className="rotate-180" />
            </button>
            <button
              type="button"
              onClick={() => setI((i + 1) % testimonials.length)}
              className="grid h-11 w-11 place-items-center rounded-full border border-[var(--color-line)] hover:border-[var(--color-ink)] transition-colors"
              aria-label="Suivant"
            >
              <Arrow size={14} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
