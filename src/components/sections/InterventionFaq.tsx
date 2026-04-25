"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Minus } from "@/components/ui/Icons";
import type { FaqItem } from "@/lib/interventions";

export function InterventionFaq({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(null);
  if (!items.length) return null;

  return (
    <div className="border-t border-[var(--color-line)]">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className="border-b border-[var(--color-line)]">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              className="group flex w-full items-center justify-between gap-6 py-6 md:py-8 text-left"
              aria-expanded={isOpen}
            >
              <span className="font-display text-[clamp(1.05rem,1.6vw,1.4rem)] leading-[1.25] tracking-[-0.01em] text-[var(--color-ink)] group-hover:text-[var(--color-cognac-deep)] transition-colors">
                {it.q}
              </span>
              <span
                className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-colors ${
                  isOpen
                    ? "border-[var(--color-ink)] bg-[var(--color-ink)] text-[var(--color-ivory)]"
                    : "border-[var(--color-line)] text-[var(--color-ink)] group-hover:border-[var(--color-ink)]"
                }`}
              >
                {isOpen ? <Minus size={12} /> : <Plus size={12} />}
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="pb-8 max-w-[68ch] text-[14.5px] leading-[1.7] text-[var(--color-ink-soft)]">
                    {it.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
