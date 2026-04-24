"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Portrait } from "@/components/ui/Portrait";
import { Reveal } from "@/components/ui/Reveal";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { Drag } from "@/components/ui/Icons";

const cases = [
  { label: "Rhinoplastie · résultat à 6 mois", before: "result-a", after: "result-b" },
  { label: "Lifting cervico-facial · à 3 mois", before: "portrait", after: "hero" },
  { label: "Blépharoplastie · à 2 mois", before: "result-b", after: "result-a" },
] as const;

function BaSlider({ caseData }: { caseData: (typeof cases)[number] }) {
  const [pos, setPos] = useState(50);
  const wrapRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const setFromEvent = useCallback((clientX: number) => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(2, Math.min(98, p)));
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!dragging.current) return;
      const x = "touches" in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      setFromEvent(x);
    };
    const onUp = () => (dragging.current = false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onMove);
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
    };
  }, [setFromEvent]);

  return (
    <div
      ref={wrapRef}
      className="ba-wrap aspect-[4/5] md:aspect-[4/5] cursor-col-resize"
      onMouseDown={(e) => {
        dragging.current = true;
        setFromEvent(e.clientX);
      }}
      onTouchStart={(e) => {
        dragging.current = true;
        setFromEvent(e.touches[0].clientX);
      }}
    >
      <Portrait variant={caseData.before} className="absolute inset-0 h-full w-full" />
      <div className="ba-label left-4 bg-black/60 text-white">Avant</div>
      <div className="ba-after" style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
        <Portrait variant={caseData.after} className="absolute inset-0 h-full w-full" />
        <div className="ba-label right-4 bg-white/80 !text-[var(--color-ink)]">Après</div>
      </div>
      <div className="ba-handle" style={{ left: `${pos}%` }} />
      <motion.div
        className="ba-knob"
        style={{ left: `${pos}%` }}
        animate={{ scale: dragging.current ? 1.1 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <Drag size={18} />
      </motion.div>
    </div>
  );
}

export function BeforeAfter() {
  const [active, setActive] = useState(0);
  return (
    <section
      id="avant-apres"
      className="relative bg-[var(--color-ivory)] pt-16 md:pt-24 pb-16 md:pb-24 overflow-hidden"
    >
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <Reveal>
          <div className="flex items-center gap-4 text-[var(--color-ink-muted)]">
            <span className="section-no">VI · Résultats</span>
            <span className="h-px w-12 bg-[var(--color-line)]" />
          </div>
        </Reveal>

        <div className="mt-10 md:mt-14 grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-7">
            <SplitHeading
              as="h2"
              className="display-lg text-[clamp(2rem,5.2vw,4.4rem)] text-[var(--color-ink)]"
              text="Le résultat se reconnaît"
            />
            <div className="mt-2">
              <SplitHeading
                as="h2"
                className="display-lg italic text-[clamp(2rem,5.2vw,4.4rem)] text-[var(--color-cognac-deep)]"
                text="à sa discrétion."
                delay={0.08}
              />
            </div>
          </div>
          <Reveal delay={0.15} className="col-span-12 lg:col-span-5 self-end">
            <p className="max-w-[46ch] font-display text-[clamp(1.05rem,1.3vw,1.2rem)] font-light leading-[1.55] tracking-[-0.005em] text-[var(--color-ink-soft)]">
              Les images ci-dessous illustrent la philosophie du centre : un{" "}
              <span className="italic text-[var(--color-cognac-deep)]">résultat naturel</span>,
              en accord avec l’identité du visage. Des cas réels anonymisés seront
              présentés sur demande, en consultation.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 md:mt-20 grid grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="col-span-12 lg:col-span-7">
            <div className="relative">
              <BaSlider caseData={cases[active]} />
            </div>
            <div className="mt-4 flex items-center justify-between text-[11px] uppercase tracking-[0.22em] text-[var(--color-ink-muted)]">
              <span>Glissez pour comparer</span>
              <span>{cases[active].label}</span>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-5 lg:pl-8">
            <div className="eyebrow mb-6">Études de cas</div>
            <ul className="flex flex-col divide-y divide-[var(--color-line)]">
              {cases.map((c, i) => {
                const isActive = active === i;
                return (
                  <li key={i}>
                    <button
                      type="button"
                      onClick={() => setActive(i)}
                      className="group grid w-full grid-cols-12 items-center gap-4 py-5 text-left"
                    >
                      <span className="col-span-2 font-display italic text-[13px] text-[var(--color-cognac-deep)]">
                        0{i + 1}
                      </span>
                      <span
                        className={`col-span-8 font-display text-[19px] leading-[1.25] tracking-[-0.01em] transition-colors ${
                          isActive
                            ? "text-[var(--color-ink)]"
                            : "text-[var(--color-ink-faint)] group-hover:text-[var(--color-ink)]"
                        }`}
                      >
                        {c.label}
                      </span>
                      <span
                        className={`col-span-2 justify-self-end h-px w-10 transition-all ${
                          isActive
                            ? "bg-[var(--color-cognac)] w-16"
                            : "bg-[var(--color-line)]"
                        }`}
                      />
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="mt-8 rounded border border-[var(--color-line)] bg-[var(--color-ivory-50)] p-6">
              <p className="font-display italic text-[14px] text-[var(--color-ink-muted)]">
                Note déontologique
              </p>
              <p className="mt-2 text-[13.5px] leading-[1.7] text-[var(--color-ink-soft)]">
                Conformément à la réglementation médicale, les photographies cliniques
                complètes sont présentées exclusivement en consultation, avec le consentement
                explicite des patients concernés.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
