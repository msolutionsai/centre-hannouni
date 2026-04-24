"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { Arrow } from "@/components/ui/Icons";
import { whyUs } from "@/lib/content";

const AUTOPLAY_MS = 5500;
const RESUME_MS = 8000;

export function WhyUs() {
  const reduce = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const pauseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [progress, setProgress] = useState(0);

  const pauseBriefly = useCallback(() => {
    setPaused(true);
    if (pauseTimer.current) clearTimeout(pauseTimer.current);
    pauseTimer.current = setTimeout(() => setPaused(false), RESUME_MS);
  }, []);

  const goTo = useCallback(
    (i: number, fromUser = false) => {
      const track = trackRef.current;
      if (!track) return;
      const card = track.children[i] as HTMLElement | undefined;
      if (!card) return;
      track.scrollTo({
        left: card.offsetLeft - track.offsetLeft,
        behavior: reduce ? "auto" : "smooth",
      });
      setActive(i);
      if (fromUser) pauseBriefly();
    },
    [reduce, pauseBriefly]
  );

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const io = new IntersectionObserver(
      (entries) => {
        let best: { idx: number; ratio: number } | null = null;
        for (const e of entries) {
          if (e.isIntersecting) {
            const idx = Number((e.target as HTMLElement).dataset.idx);
            if (!best || e.intersectionRatio > best.ratio)
              best = { idx, ratio: e.intersectionRatio };
          }
        }
        if (best) setActive(best.idx);
      },
      { root: track, threshold: [0.4, 0.6, 0.8, 1] }
    );
    for (const child of Array.from(track.children)) io.observe(child);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (paused || reduce) {
      setProgress(0);
      return;
    }
    const start = Date.now();
    const raf = () => {
      const elapsed = Date.now() - start;
      setProgress(Math.min(1, elapsed / AUTOPLAY_MS));
      if (elapsed >= AUTOPLAY_MS) {
        const next = (active + 1) % whyUs.length;
        goTo(next);
      } else {
        id = requestAnimationFrame(raf);
      }
    };
    let id = requestAnimationFrame(raf);
    return () => cancelAnimationFrame(id);
  }, [active, paused, reduce, goTo]);

  return (
    <section
      id="pourquoi"
      className="relative bg-[var(--color-ivory-50)] pt-16 md:pt-24 pb-16 md:pb-24 overflow-hidden"
    >
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <Reveal>
          <div className="flex items-center gap-4 text-[var(--color-ink-muted)]">
            <span className="section-no">VII · Pourquoi le centre</span>
            <span className="h-px w-12 bg-[var(--color-line)]" />
          </div>
        </Reveal>

        <div className="mt-10 md:mt-14 grid grid-cols-12 gap-y-8 gap-x-0 md:gap-8">
          <div className="col-span-12 lg:col-span-8">
            <SplitHeading
              as="h2"
              className="display-lg text-[clamp(1.75rem,5.2vw,4.4rem)] text-[var(--color-ink)]"
              text="Six raisons de nous"
            />
            <div className="mt-2">
              <SplitHeading
                as="h2"
                className="display-lg italic text-[clamp(1.75rem,5.2vw,4.4rem)] text-[var(--color-cognac-deep)]"
                text="confier votre visage."
                delay={0.08}
              />
            </div>
          </div>
          <Reveal delay={0.2} className="col-span-12 lg:col-span-4 lg:self-end">
            <p className="font-display text-[clamp(1.05rem,1.3vw,1.2rem)] font-light leading-[1.55] tracking-[-0.005em] text-[var(--color-ink-soft)] max-w-[44ch]">
              Six convictions qui guident{" "}
              <span className="italic text-[var(--color-cognac-deep)]">chacun de nos gestes</span>,
              de la consultation au suivi post-opératoire.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="mt-12 md:mt-16 flex items-end justify-between gap-6">
          <div className="flex items-baseline gap-4">
            <span className="font-display italic text-[15px] text-[var(--color-cognac-deep)] tabular-nums">
              <AnimatePresence mode="wait">
                <motion.span
                  key={active}
                  initial={{ y: 8, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -8, opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block"
                >
                  {whyUs[active].num}
                </motion.span>
              </AnimatePresence>
            </span>
            <span className="eyebrow text-[var(--color-ink-muted)]">
              / {String(whyUs.length).padStart(2, "0")}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => goTo((active - 1 + whyUs.length) % whyUs.length, true)}
              aria-label="Argument précédent"
              className="grid h-11 w-11 place-items-center rounded-full border border-[var(--color-line)] text-[var(--color-ink)] transition-colors hover:border-[var(--color-ink)] hover:bg-[var(--color-ink)] hover:text-[var(--color-ivory)]"
            >
              <Arrow size={12} className="rotate-180" />
            </button>
            <button
              type="button"
              onClick={() => goTo((active + 1) % whyUs.length, true)}
              aria-label="Argument suivant"
              className="grid h-11 w-11 place-items-center rounded-full border border-[var(--color-line)] text-[var(--color-ink)] transition-colors hover:border-[var(--color-ink)] hover:bg-[var(--color-ink)] hover:text-[var(--color-ivory)]"
            >
              <Arrow size={12} />
            </button>
          </div>
        </Reveal>

        <div className="mt-6 relative h-px bg-[var(--color-line)] overflow-hidden">
          <motion.span
            aria-hidden
            className="absolute inset-y-0 left-0 bg-[var(--color-cognac-deep)]"
            animate={{ width: `${((active + progress) / whyUs.length) * 100}%` }}
            transition={{ duration: 0.2, ease: "linear" }}
          />
        </div>

        <div
          ref={trackRef}
          onMouseEnter={pauseBriefly}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={pauseBriefly}
          onWheel={pauseBriefly}
          className="no-scrollbar mt-8 md:mt-10 flex snap-x snap-mandatory overflow-x-auto scroll-smooth -mx-6 md:-mx-10 px-6 md:px-10 gap-6 md:gap-8"
          style={{ scrollPaddingLeft: "var(--snap-pad, 1.5rem)" }}
        >
          {whyUs.map((u, i) => {
            const isActive = active === i;
            return (
              <motion.article
                key={u.num}
                data-idx={i}
                className="snap-start shrink-0 w-[85%] sm:w-[60%] md:w-[46%] lg:w-[32%] pt-8 border-t border-[var(--color-line)]"
                animate={{
                  opacity: isActive ? 1 : 0.4,
                  y: isActive ? 0 : 2,
                }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex items-center gap-3">
                  <span className="font-display italic text-[13px] text-[var(--color-cognac-deep)]">
                    {u.num}
                  </span>
                  <motion.span
                    aria-hidden
                    className="h-px bg-[var(--color-cognac-deep)]"
                    animate={{ width: isActive ? 40 : 16 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
                <h3 className="mt-6 font-display text-[clamp(1.4rem,3vw,2rem)] leading-[1.15] tracking-[-0.015em] text-[var(--color-ink)]">
                  {u.title}
                </h3>
                <p className="mt-5 font-display text-[clamp(0.98rem,1.15vw,1.1rem)] font-light leading-[1.6] tracking-[-0.005em] text-[var(--color-ink-soft)] max-w-[42ch]">
                  {u.body}
                </p>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-10 flex items-center justify-center gap-2">
          {whyUs.map((_, i) => {
            const isActive = active === i;
            return (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i, true)}
                aria-label={`Argument ${i + 1}`}
                aria-current={isActive}
                className="h-1.5 rounded-full transition-all duration-700"
                style={{
                  width: isActive ? 32 : 10,
                  background: isActive
                    ? "var(--color-ink)"
                    : "var(--color-line)",
                  transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
