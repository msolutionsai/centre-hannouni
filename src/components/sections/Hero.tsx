"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { Arrow } from "@/components/ui/Icons";
import { KineticText } from "@/components/ui/KineticText";

export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  return (
    <section
      id="top"
      ref={ref}
      className="relative min-h-[100svh] overflow-hidden bg-[var(--color-ivory)]"
    >
      {/* Background loop video — fills the whole hero on every breakpoint.
          object-position is biased right on mobile to bring the face
          (which sits right-of-center in the source) into the viewport
          centre, since the portrait crop can't show the full 16:9 width.
          Respects prefers-reduced-motion: poster instead of the playing video. */}
      {reduce ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/videos/hero-loop-poster.jpg"
          alt=""
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full object-cover object-[70%_center] md:object-center"
        />
      ) : (
        <video
          className="pointer-events-none absolute inset-0 h-full w-full object-cover object-[70%_center] md:object-center"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/videos/hero-loop-poster.jpg"
          aria-hidden
        >
          <source src="/videos/hero-loop.mp4" type="video/mp4" />
        </video>
      )}

      {/* Soft warm-dark overlay — tames bright frames so text stays readable. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-black/20"
      />

      {/* Softened vignettes — keep the editorial cream feel where the text
          sits, but stay translucent enough to let the video breathe through. */}
      {/* Vertical cream wash — denser around the kinetic title to keep
          the italic cognac line readable against the face in the video. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 md:hidden"
        style={{
          background:
            "linear-gradient(180deg, rgba(245,241,234,0) 6%, rgba(245,241,234,0.32) 26%, rgba(245,241,234,0.70) 50%, rgba(245,241,234,0.86) 76%)",
        }}
      />
      {/* Subtle left-side wash on mobile — keeps the title side legible
          while letting the face on the right of the frame breathe. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 md:hidden"
        style={{
          background:
            "linear-gradient(90deg, rgba(245,241,234,0.45) 0%, rgba(245,241,234,0.20) 40%, rgba(245,241,234,0) 75%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden md:block"
        style={{
          background:
            "linear-gradient(90deg, rgba(245,241,234,0.70) 0%, rgba(245,241,234,0.35) 38%, rgba(245,241,234,0) 62%)",
        }}
      />

      {/* Content */}
      <div
        className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1440px] flex-col justify-between px-6 md:px-10 pt-[100px] md:pt-[160px] pb-10"
      >
        {/* SEO — semantic page heading. Visually hidden because the visible
            artistic title is composed of animated spans below, which carry
            the brand tagline rather than the keyword-rich page title. */}
        <h1 className="sr-only">
          Centre du Docteur Hannouni — Chirurgien esthétique et maxillo-facial à Marrakech
        </h1>

        {/* Spacer — on mobile, reserves the top half for the portrait
            so the headline starts below it rather than overlapping. */}
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
              as="span"
              text="La chirurgie"
              className="display-xl text-[clamp(2.4rem,6.2vw,5.4rem)] text-[var(--color-ink)]"
            />
          </div>
          <div className="mt-1">
            <KineticText
              as="span"
              text="esthétique,"
              delay={0.06}
              className="display-xl text-[clamp(2.4rem,6.2vw,5.4rem)] text-[var(--color-ink)]"
            />
          </div>
          {/* Italic subtitle — same 2-line layout on every breakpoint now
              that the hero no longer reserves vertical space for a portrait,
              so the title can breathe and read as a flowing sentence. */}
          <div className="mt-5 md:mt-7">
            <KineticText
              as="span"
              italic
              text="quand la précision"
              delay={0.18}
              className="display-xl italic text-[clamp(1.85rem,4.4vw,3.7rem)] leading-[1.08] text-[var(--color-cognac-deep)]"
            />
            <div className="mt-1">
              <KineticText
                as="span"
                italic
                text="médicale rencontre l’art."
                delay={0.24}
                className="display-xl italic text-[clamp(1.85rem,4.4vw,3.7rem)] leading-[1.08] text-[var(--color-cognac-deep)]"
              />
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-3 md:mt-14 max-w-[60ch] font-display text-[clamp(1.05rem,1.3vw,1.2rem)] font-light leading-[1.55] tracking-[-0.005em] text-[var(--color-ink-soft)]"
          >
            Une chirurgie{" "}
            <span className="italic text-[var(--color-cognac-deep)]">précise</span>, un regard{" "}
            <span className="italic text-[var(--color-cognac-deep)]">éclairé</span>, une exigence{" "}
            <span className="italic text-[var(--color-cognac-deep)]">médicale</span>, pour un résultat naturel qui se reconnaît à sa discrétion.
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

        {/* Bottom meta rail — editorial presentation + scroller */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 md:mt-20 grid grid-cols-1 md:grid-cols-12 gap-8 pt-8 md:pt-0 items-end"
        >
          <p className="col-span-1 md:col-span-9 max-w-[72ch] font-display text-[clamp(1rem,1.3vw,1.2rem)] font-light leading-[1.55] tracking-[-0.005em] text-[var(--color-ink-soft)]">
            Au cœur de Guéliz, à Marrakech, notre centre associe{" "}
            <span className="italic text-[var(--color-cognac-deep)]">expertise médicale</span>,{" "}
            <span className="italic text-[var(--color-cognac-deep)]">technologies de pointe</span>{" "}
            et plus de{" "}
            <span className="italic text-[var(--color-cognac-deep)]">20 ans d’expérience</span>{" "}
            en chirurgie et médecine esthétique, pour offrir une prise en charge précise, naturelle et personnalisée.
          </p>
          <div className="col-span-1 md:col-span-3 md:justify-self-end">
            <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-[var(--color-ink-muted)] md:text-white">
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
      </div>
    </section>
  );
}
