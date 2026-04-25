"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { Arrow } from "@/components/ui/Icons";
import { interventionDetails } from "@/lib/interventions";

const AUTOPLAY_MS = 5500;
const RESUME_AFTER_MS = 8000;

export function Interventions() {
  const reduce = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  // Track viewport: enable carousel logic only on mobile
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Programmatically center the card at `idx` in the scrolling track.
  // Smooth scrolling stalls when the tab is hidden, so we fall back to
  // instant in that case — autoplay still advances rather than freezing.
  const scrollToCard = useCallback((idx: number, smooth = true) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[idx] as HTMLElement | undefined;
    if (!card) return;
    const left = card.offsetLeft - (track.clientWidth - card.clientWidth) / 2;
    const behavior: ScrollBehavior =
      smooth && !document.hidden ? "smooth" : ("instant" as ScrollBehavior);
    track.scrollTo({ left, behavior });
  }, []);

  // Briefly pause autoplay when the user touches/scrolls/taps
  const pauseBriefly = useCallback(() => {
    setPaused(true);
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setPaused(false), RESUME_AFTER_MS);
  }, []);

  // JS-based axis lock — touch-action: pan-x alone leaks small horizontal
  // movement into the carousel during vertical drags on iOS Safari, which
  // makes snap-mandatory yank cards sideways. We measure direction on the
  // first ~8px of touchmove and disable horizontal overflow when the
  // gesture is clearly vertical, restoring it on touchend.
  const touchStart = useRef({ x: 0, y: 0 });
  const axisLocked = useRef<"x" | "y" | null>(null);

  const onTouchStart = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      const t = e.touches[0];
      touchStart.current = { x: t.clientX, y: t.clientY };
      axisLocked.current = null;
      pauseBriefly();
    },
    [pauseBriefly]
  );

  const onTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (axisLocked.current !== null) return;
    const t = e.touches[0];
    const dx = Math.abs(t.clientX - touchStart.current.x);
    const dy = Math.abs(t.clientY - touchStart.current.y);
    if (dx < 6 && dy < 6) return;
    const track = trackRef.current;
    if (!track) return;
    if (dy > dx) {
      // Vertical-leaning gesture — let the page scroll, freeze carousel
      axisLocked.current = "y";
      track.style.overflowX = "hidden";
    } else {
      axisLocked.current = "x";
    }
  }, []);

  const onTouchEnd = useCallback(() => {
    const track = trackRef.current;
    if (track) track.style.overflowX = "";
    axisLocked.current = null;
  }, []);

  // Update activeIdx as the user scrolls — pick the card whose center
  // is closest to the track's center
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const update = () => {
      const r = track.getBoundingClientRect();
      const center = r.left + r.width / 2;
      let best = 0;
      let min = Infinity;
      Array.from(track.children).forEach((child, idx) => {
        const cr = (child as HTMLElement).getBoundingClientRect();
        const d = Math.abs(cr.left + cr.width / 2 - center);
        if (d < min) {
          min = d;
          best = idx;
        }
      });
      setActiveIdx(best);
    };
    track.addEventListener("scroll", update, { passive: true });
    return () => track.removeEventListener("scroll", update);
  }, []);

  // Center the first card on initial mobile layout
  useEffect(() => {
    if (!isMobile) return;
    const id = setTimeout(() => scrollToCard(0, false), 80);
    return () => clearTimeout(id);
  }, [isMobile, scrollToCard]);

  // Autoplay — mobile only, respects reduce-motion and pause
  useEffect(() => {
    if (!isMobile || paused || reduce) return;
    const id = window.setInterval(() => {
      setActiveIdx((prev) => {
        const next = (prev + 1) % interventionDetails.length;
        scrollToCard(next);
        return next;
      });
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [isMobile, paused, reduce, scrollToCard]);

  return (
    <section
      id="interventions"
      className="relative bg-[var(--color-stone-warm)] pt-12 md:pt-16 pb-12 md:pb-16 overflow-hidden"
    >
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
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

        {/* Cards — mobile carousel (snap-center, autoplay) / desktop 4-col grid */}
        <div
          ref={trackRef}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onTouchCancel={onTouchEnd}
          onWheel={pauseBriefly}
          aria-roledescription="carousel"
          aria-label="Interventions"
          className="
            mt-10 md:mt-14
            -mx-6 md:mx-0
            px-[8vw] sm:px-[20vw] md:px-0
            flex md:grid md:grid-cols-4
            gap-4 md:gap-5
            overflow-x-auto md:overflow-visible
            snap-x snap-mandatory md:snap-none
            no-scrollbar
            scroll-smooth
            touch-pan-x md:touch-auto
            overscroll-x-contain
          "
        >
          {interventionDetails.map((int, i) => {
            const isActive = isMobile && i === activeIdx;
            return (
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
                aria-roledescription="slide"
                aria-label={`${i + 1} / ${interventionDetails.length} · ${int.name}`}
                className="snap-center md:snap-align-none shrink-0 w-[84vw] sm:w-[60vw] md:w-auto"
              >
                <div
                  data-active={isActive ? "true" : "false"}
                  className="
                    transition-[opacity,filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
                    data-[active=false]:opacity-60 data-[active=false]:[filter:saturate(0.8)]
                    md:opacity-100 md:[filter:none]
                  "
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
                    {/* Image */}
                    <div className="absolute inset-0">
                      <div className="absolute inset-0 transition-transform duration-[1300ms] ease-out group-hover:scale-[1.07]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={int.image}
                          alt={int.name}
                          loading="lazy"
                          decoding="async"
                          className="absolute inset-0 h-full w-full object-cover object-center"
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

                    {/* Category — top */}
                    <div className="absolute inset-x-0 top-0 flex items-center justify-end p-4 md:p-5 z-10">
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

                    {/* Cognac edge accent — full on active mobile, hover on desktop */}
                    <span
                      aria-hidden
                      className="
                        pointer-events-none absolute left-0 right-0 bottom-0 h-px
                        origin-left bg-[var(--color-cognac)]
                        scale-x-0 group-hover:scale-x-100
                        md:transition-transform md:duration-700 md:ease-out
                      "
                      style={
                        isMobile
                          ? {
                              transform: isActive ? "scaleX(1)" : "scaleX(0)",
                              transition: "transform 700ms cubic-bezier(0.22,1,0.36,1)",
                            }
                          : undefined
                      }
                    />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile pagination dots — reflect activeIdx; tap to jump */}
        <div className="mt-6 flex md:hidden items-center justify-center gap-2">
          {interventionDetails.map((_, i) => {
            const isActive = i === activeIdx;
            return (
              <button
                key={i}
                type="button"
                onClick={() => {
                  pauseBriefly();
                  setActiveIdx(i);
                  scrollToCard(i);
                }}
                aria-label={`Aller à l’intervention ${i + 1}`}
                aria-current={isActive}
                className="h-1.5 rounded-full transition-all duration-700"
                style={{
                  width: isActive ? 24 : 8,
                  background: isActive
                    ? "var(--color-ink)"
                    : "rgba(20,23,26,0.25)",
                  transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              />
            );
          })}
        </div>

        <Reveal
          delay={0.1}
          className="mt-12 md:mt-14 flex flex-col items-start md:flex-row md:items-center justify-between gap-6 border-t border-[var(--color-line)] pt-8"
        >
          <p className="font-display text-[clamp(0.98rem,1.1vw,1.1rem)] font-light leading-[1.5] tracking-[-0.005em] text-[var(--color-ink-soft)] max-w-[50ch]">
            Une intervention non listée ? Nous étudions chaque demande avec la même{" "}
            <span className="italic text-[var(--color-cognac-deep)]">rigueur</span> —
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
