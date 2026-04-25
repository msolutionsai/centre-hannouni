"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
import type { ResultCase } from "@/lib/interventions";

export function InterventionResults({ cases }: { cases: ResultCase[] }) {
  const [active, setActive] = useState(0);
  if (!cases.length) return null;
  const current = cases[active];

  return (
    <div className="grid grid-cols-12 gap-y-8 gap-x-0 md:gap-8 lg:gap-12 items-center">
      <div className="col-span-12 lg:col-span-7">
        <div className="relative mx-auto w-full max-w-[540px] lg:max-w-none">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.985 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.985 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <BeforeAfterSlider before={current.before} after={current.after} />
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="mt-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between text-[11px] uppercase tracking-[0.22em] text-[var(--color-ink-muted)]">
          <span>Glissez pour comparer</span>
          <span>{current.label}</span>
        </div>
      </div>

      {cases.length > 1 && (
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
                      className={`col-span-2 justify-self-end h-px transition-all ${
                        isActive ? "bg-[var(--color-cognac)] w-16" : "bg-[var(--color-line)] w-10"
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
              complètes sont présentées exclusivement en consultation, avec le
              consentement explicite des patients concernés.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
