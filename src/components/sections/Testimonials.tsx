"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { Arrow, Star } from "@/components/ui/Icons";
import { testimonials, clinic } from "@/lib/content";

const AUTOPLAY_MS = 8000;
const RESUME_MS = 10000;

export function Testimonials() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const pauseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const t = testimonials[i];

  const pauseBriefly = useCallback(() => {
    setPaused(true);
    if (pauseTimer.current) clearTimeout(pauseTimer.current);
    pauseTimer.current = setTimeout(() => setPaused(false), RESUME_MS);
  }, []);

  useEffect(() => {
    if (paused || reduce) return;
    const id = window.setInterval(() => {
      setI((prev) => (prev + 1) % testimonials.length);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [paused, reduce]);

  return (
    <section id="temoignages" className="relative bg-[var(--color-stone-warm)] pt-12 md:pt-16 pb-12 md:pb-16">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <Reveal>
          <div className="flex items-center gap-4 text-[var(--color-ink-muted)]">
            <span className="section-no">V · Témoignages</span>
            <span className="h-px w-12 bg-[var(--color-line)]" />
          </div>
        </Reveal>

        <div className="mt-8 md:mt-10 grid grid-cols-12 gap-y-6 gap-x-0 md:gap-8 items-end">
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

        <div
          className="mt-10 md:mt-12 relative min-h-[180px]"
          onMouseEnter={pauseBriefly}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={pauseBriefly}
        >
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-[clamp(1.2rem,2.4vw,1.8rem)] leading-[1.32] tracking-[-0.01em] text-[var(--color-ink)] max-w-[68ch]"
            >
              <span className="text-[var(--color-cognac-deep)] italic mr-[0.18em]">“</span>
              {t.body}
              <span className="text-[var(--color-cognac-deep)] italic ml-[0.18em]">”</span>
              <footer className="mt-5 flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-[var(--color-ink-muted)]">
                <span className="h-px w-10 bg-[var(--color-cognac)]" />
                <cite className="not-italic">
                  {t.author} — {t.source}
                </cite>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <div className="mt-8 md:mt-10 flex items-center justify-between border-t border-[var(--color-line)] pt-6">
          <div className="flex items-center gap-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                type="button"
                aria-label={`Témoignage ${idx + 1}`}
                onClick={() => { setI(idx); pauseBriefly(); }}
                className={`h-[3px] transition-all ${
                  idx === i ? "w-12 bg-[var(--color-ink)]" : "w-6 bg-[var(--color-line)]"
                }`}
              />
            ))}
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => { setI((i - 1 + testimonials.length) % testimonials.length); pauseBriefly(); }}
              className="grid h-11 w-11 place-items-center rounded-full border border-[var(--color-line)] hover:border-[var(--color-ink)] transition-colors"
              aria-label="Précédent"
            >
              <Arrow size={14} className="rotate-180" />
            </button>
            <button
              type="button"
              onClick={() => { setI((i + 1) % testimonials.length); pauseBriefly(); }}
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
