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

      {/* Portrait — right column */}
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden md:flex items-center justify-end w-[52%]">
        <HeroPortrait className="relative mr-[-4%] h-[82vh] w-[82vh] max-w-[760px]" />
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

      {/* Floating monogram / orbital marker */}
      {!reduce && (
        <motion.div
          aria-hidden
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, delay: 2, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none absolute right-[10%] top-[18%] hidden md:block"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
            className="relative h-[64px] w-[64px]"
          >
            <svg viewBox="0 0 100 100" className="h-full w-full">
              <defs>
                <path id="ring-path" d="M50,50 m-42,0 a42,42 0 1,1 84,0 a42,42 0 1,1 -84,0" fill="none" />
              </defs>
              <text fontSize="8" fill="#14171A" letterSpacing="3" style={{ fontFamily: "var(--font-sans)" }}>
                <textPath href="#ring-path">
                  MARRAKECH · GUÉLIZ · DR HANNOUNI · CHIRURGIE ·
                </textPath>
              </text>
            </svg>
            <span className="absolute inset-0 m-auto h-2 w-2 rounded-full bg-[var(--color-cognac)]" style={{ top: 0, bottom: 0, left: 0, right: 0 }} />
          </motion.div>
        </motion.div>
      )}

      {/* Content */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1440px] flex-col justify-between px-6 md:px-10 pt-[140px] md:pt-[160px] pb-10"
      >
        {/* Tagline microline */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-3 text-[11px] uppercase tracking-[0.24em] text-[var(--color-ink-muted)]"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-cognac)]" />
          <span className="font-display italic text-[var(--color-cognac-deep)] tracking-[0.16em]">
            Centre du Docteur Hannouni
          </span>
          <span className="hidden sm:inline-block h-px w-8 bg-[var(--color-line)]" />
          <span className="hidden sm:inline">Chirurgie esthétique & maxillo-faciale</span>
        </motion.div>

        {/* Headline block */}
        <div className="mt-auto max-w-[1040px]">
          <KineticText
            as="h1"
            text="La chirurgie"
            className="display-xl text-[clamp(2.6rem,7.6vw,7.4rem)] text-[var(--color-ink)]"
          />
          <div className="mt-1">
            <KineticText
              as="h1"
              text="esthétique,"
              delay={0.06}
              className="display-xl text-[clamp(2.6rem,7.6vw,7.4rem)] text-[var(--color-ink)]"
            />
          </div>
          <div className="mt-2 flex items-end gap-5">
            <span className="hidden md:block h-[2px] w-[120px] bg-[var(--color-cognac)] translate-y-[-22px]" />
            <KineticText
              as="h1"
              italic
              text="un art scientifique."
              delay={0.18}
              className="display-xl italic text-[clamp(2.6rem,7.6vw,7.4rem)] text-[var(--color-cognac-deep)]"
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
            Au cœur de Guéliz, à Marrakech — pour un résultat naturel qui
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
            <a
              href={`tel:${clinic.phoneE164}`}
              className="link-lux text-[13px] font-medium tracking-[0.08em] uppercase text-[var(--color-ink)]"
            >
              {clinic.phoneDisplay}
            </a>
          </motion.div>
        </div>

        {/* Bottom meta rail */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 md:mt-20 grid grid-cols-12 gap-6 border-t border-[var(--color-line)] pt-7"
        >
          <div className="col-span-6 md:col-span-3">
            <div className="flex items-baseline gap-2">
              <Counter
                to={20}
                className="font-display text-[clamp(2.4rem,4.2vw,3.4rem)] font-light tracking-[-0.02em] text-[var(--color-ink)] leading-none"
                suffix=""
              />
              <span className="font-display text-[20px] text-[var(--color-cognac-deep)] italic">ans</span>
            </div>
            <div className="mt-2 text-[11px] uppercase tracking-[0.22em] text-[var(--color-ink-muted)]">
              au service de la face
            </div>
          </div>
          <div className="col-span-6 md:col-span-3">
            <div className="font-display text-[clamp(1.6rem,2.2vw,2rem)] font-light tracking-[-0.015em] text-[var(--color-ink)] leading-tight">
              Guéliz
            </div>
            <div className="mt-2 text-[11px] uppercase tracking-[0.22em] text-[var(--color-ink-muted)]">
              Marrakech · Maroc
            </div>
          </div>
          <div className="col-span-12 md:col-span-3">
            <div className="font-display text-[clamp(1.4rem,2vw,1.7rem)] font-light italic text-[var(--color-cognac-deep)] leading-tight">
              Lauréat 1999
            </div>
            <div className="mt-2 text-[11px] uppercase tracking-[0.22em] text-[var(--color-ink-muted)]">
              Faculté de Casablanca · Bordeaux II
            </div>
          </div>
          <div className="col-span-12 md:col-span-3 flex md:justify-end items-end">
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
