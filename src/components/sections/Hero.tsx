"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Arrow } from "@/components/ui/Icons";
import { HeroCanvas } from "@/components/ui/HeroCanvas";
import { HeroPortrait } from "@/components/ui/HeroPortrait";
import { KineticText } from "@/components/ui/KineticText";
import { Counter } from "@/components/ui/Counter";
import { clinic } from "@/lib/content";

export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative min-h-[100svh] overflow-hidden bg-[var(--color-ivory)]"
    >
      {/* Ambient generative canvas */}
      <HeroCanvas className="absolute inset-0 h-full w-full" />

      {/* Portrait — right column, extends to meta rail with bottom fade */}
      <div
        className="pointer-events-none absolute right-0 hidden md:flex items-end justify-end w-[52%]"
        style={{
          top: "96px",
          bottom: "170px",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, black 78%, transparent 100%)",
          maskImage:
            "linear-gradient(to bottom, black 0%, black 78%, transparent 100%)",
        }}
      >
        <HeroPortrait className="relative mr-[-4%] h-full w-auto aspect-[7/8] max-w-[840px]" />
      </div>

      {/* Soft left vignette to keep text crisp */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(245,241,234,0.82) 0%, rgba(245,241,234,0.45) 38%, rgba(245,241,234,0) 58%)",
        }}
      />

      {/* Grain */}
      <div className="grain pointer-events-none absolute inset-0" />

      {/* Content */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1440px] flex-col justify-between px-6 md:px-10 pt-[140px] md:pt-[160px] pb-10"
      >
        {/* Spacer to push headline to bottom */}
        <div />

        {/* Headline block */}
        <div className="mt-auto max-w-[1040px]">
          {/* First title line + inline orbital seal (same baseline) */}
          <div className="flex items-center gap-5 md:gap-7">
            {!reduce && (
              <motion.div
                aria-hidden
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="hidden md:block shrink-0"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
                  className="relative h-[96px] w-[96px] lg:h-[112px] lg:w-[112px]"
                >
                  <svg viewBox="0 0 100 100" className="h-full w-full">
                    <defs>
                      <path id="ring-path" d="M50,50 m-42,0 a42,42 0 1,1 84,0 a42,42 0 1,1 -84,0" fill="none" />
                    </defs>
                    <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(165,122,78,0.2)" strokeWidth="0.3" />
                    <text fontSize="7.6" fill="#14171A" letterSpacing="1.6" fontWeight="500" style={{ fontFamily: "var(--font-sans)" }}>
                      <textPath href="#ring-path">
                        CENTRE DR HANNOUNI · CHIRURGIE ESTHÉTIQUE ·
                      </textPath>
                    </text>
                  </svg>
                  <span className="absolute inset-0 m-auto h-2 w-2 rounded-full bg-[var(--color-cognac)]" style={{ top: 0, bottom: 0, left: 0, right: 0 }} />
                </motion.div>
              </motion.div>
            )}
            <KineticText
              as="h1"
              text="La chirurgie"
              className="display-xl text-[clamp(2.2rem,5.6vw,5.4rem)] text-[var(--color-ink)]"
            />
          </div>
          <div className="mt-1">
            <KineticText
              as="h1"
              text="esthétique,"
              delay={0.06}
              className="display-xl text-[clamp(2.2rem,5.6vw,5.4rem)] text-[var(--color-ink)]"
            />
          </div>
          <div className="mt-2">
            <KineticText
              as="h1"
              italic
              text="quand la précision médicale rencontre l’art."
              delay={0.18}
              className="display-xl italic text-[clamp(1.9rem,4.6vw,4.4rem)] leading-[1.08] text-[var(--color-cognac-deep)]"
            />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 md:mt-14 max-w-[52ch] text-[15.5px] leading-[1.8] text-[var(--color-ink-soft)]"
          >
            Une chirurgie{" "}
            <span className="font-display italic text-[var(--color-ink)]">précise</span>,
            un regard{" "}
            <span className="font-display italic text-[var(--color-ink)]">éclairé</span>,
            une exigence{" "}
            <span className="font-display italic text-[var(--color-ink)]">médicale</span>.
            Au cœur de Guéliz, à Marrakech, pour un résultat naturel qui
            se reconnaît à sa discrétion.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.35, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 md:mt-10 flex flex-wrap items-center gap-5"
          >
            <a href="#rendez-vous" className="btn btn-primary group">
              Prendre rendez-vous
              <motion.span
                className="inline-flex"
                whileHover={{ x: 3 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Arrow size={14} />
              </motion.span>
            </a>
          </motion.div>
        </div>

        {/* Bottom meta rail */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-6 border-t border-[var(--color-line)] pt-7 items-end"
        >
          <div className="flex flex-col gap-3">
            <div className="flex items-baseline gap-2 leading-none">
              <Counter
                to={20}
                className="font-display text-[clamp(2rem,3.2vw,2.6rem)] font-light tracking-[-0.02em] text-[var(--color-ink)] leading-none"
                suffix=""
              />
              <span className="font-display text-[18px] text-[var(--color-cognac-deep)] italic leading-none">ans</span>
            </div>
            <div className="text-[11px] uppercase tracking-[0.22em] text-[var(--color-ink-muted)]">
              au service de la face
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="font-display text-[clamp(1.5rem,2vw,1.9rem)] font-light tracking-[-0.015em] text-[var(--color-ink)] leading-none">
              Guéliz
            </div>
            <div className="text-[11px] uppercase tracking-[0.22em] text-[var(--color-ink-muted)]">
              Marrakech · Maroc
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="font-display text-[clamp(1.4rem,1.9vw,1.8rem)] font-light italic text-[var(--color-cognac-deep)] leading-none">
              Lauréat 1999
            </div>
            <div className="text-[11px] uppercase tracking-[0.22em] text-[var(--color-ink-muted)]">
              Faculté de Casablanca · Bordeaux II
            </div>
          </div>
          <div className="flex md:justify-end">
            <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-[var(--color-ink-muted)]">
              <span className="h-px w-8 bg-[var(--color-cognac)]" />
              Scroller pour découvrir
              <motion.span
                aria-hidden
                animate={reduce ? {} : { y: [0, 6, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                className="inline-flex"
              >
                ↓
              </motion.span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
