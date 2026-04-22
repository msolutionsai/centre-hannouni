"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Portrait } from "@/components/ui/Portrait";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { Arrow, ArrowDiag } from "@/components/ui/Icons";
import { clinic } from "@/lib/content";

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-[var(--color-ivory)] pt-[112px] md:pt-[140px]"
    >
      <div className="mx-auto grid max-w-[1440px] grid-cols-12 gap-6 px-6 md:px-10 pb-14 md:pb-24">
        {/* Left — editorial block */}
        <div className="col-span-12 lg:col-span-7 flex flex-col justify-between">
          <div className="flex items-center gap-4 text-[var(--color-ink-muted)]">
            <span className="section-no">00 — Marrakech · Guéliz</span>
            <span className="h-px w-12 bg-[var(--color-line)]" />
            <span className="text-[11px] uppercase tracking-[0.22em]">
              Depuis 20 ans
            </span>
          </div>

          <div className="mt-10 md:mt-14">
            <SplitHeading
              as="h1"
              className="display-xl text-[clamp(3rem,9vw,8.25rem)] text-[var(--color-ink)]"
              text="La chirurgie"
            />
            <div className="mt-2 flex items-end gap-4">
              <SplitHeading
                as="h1"
                className="display-xl text-[clamp(3rem,9vw,8.25rem)] text-[var(--color-ink)]"
                text="esthétique,"
                delay={0.05}
              />
            </div>
            <div className="mt-2 flex items-end gap-6">
              <span className="hidden md:block h-[2px] w-[140px] bg-[var(--color-cognac)] translate-y-[-18px]" />
              <SplitHeading
                as="h1"
                className="display-xl italic text-[clamp(3rem,9vw,8.25rem)] text-[var(--color-cognac-deep)]"
                text="un art scientifique."
                delay={0.12}
              />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 md:mt-14 grid grid-cols-12 gap-6"
          >
            <p className="col-span-12 md:col-span-8 text-[15px] leading-[1.75] text-[var(--color-ink-soft)] max-w-[56ch]">
              Centre du Docteur{" "}
              <span className="font-display italic text-[var(--color-ink)]">Hannouni Youssef</span>
              , chirurgien esthétique et maxillo-facial à Marrakech. Vingt années dédiées à la chirurgie plastique,
              esthétique et réparatrice de la face — où la rigueur médicale sert la justesse du geste.
            </p>
            <div className="col-span-12 md:col-span-4 flex flex-wrap gap-3 md:justify-end md:items-end">
              <a href="#rendez-vous" className="btn btn-primary">
                Prendre rendez-vous
                <Arrow size={14} />
              </a>
              <a href="#expertises" className="btn btn-ghost">
                Découvrir
                <ArrowDiag size={12} />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Right — portrait */}
        <div className="col-span-12 lg:col-span-5 relative">
          <motion.div
            initial={{ scale: reduce ? 1 : 1.08, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[4/5] md:aspect-[4/5] lg:aspect-[3/4.5] overflow-hidden"
          >
            <div className="aura hidden lg:block" />
            <Portrait
              variant="hero"
              className="h-full w-full"
              caption="Dr Hannouni · Marrakech"
            />
            <motion.div
              className="absolute inset-0 bg-[var(--color-ivory)]"
              initial={{ y: 0 }}
              animate={{ y: "-101%" }}
              transition={{ duration: 1.3, delay: 0.15, ease: [0.76, 0, 0.24, 1] }}
            />
          </motion.div>

          <div className="mt-6 hidden lg:flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-[var(--color-ink-muted)]">
            <span>N. 013 — Guéliz</span>
            <span className="font-display italic text-[13px] tracking-normal text-[var(--color-ink)]">
              {clinic.phoneDisplay}
            </span>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="pointer-events-none absolute bottom-6 right-8 hidden md:flex flex-col items-center gap-3 text-[10px] uppercase tracking-[0.28em] text-[var(--color-ink-muted)]"
      >
        <span>Scroller</span>
        <motion.span
          className="h-14 w-px bg-[var(--color-ink-muted)] origin-top"
          animate={{ scaleY: [0.2, 1, 0.2] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
