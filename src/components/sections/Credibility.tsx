"use client";

import { credibilityItems } from "@/lib/content";

export function Credibility() {
  const items = [...credibilityItems, ...credibilityItems];
  return (
    <section
      aria-label="Gages de crédibilité"
      className="relative border-y border-[var(--color-line)] bg-[var(--color-ivory-50)] overflow-hidden"
    >
      <div className="marquee-track py-6">
        {items.map((it, i) => (
          <div key={i} className="flex items-center gap-6 shrink-0">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-cognac)]" />
            <div className="flex items-baseline gap-3">
              <span className="font-display text-[17px] tracking-[-0.01em] text-[var(--color-ink)]">
                {it.label}
              </span>
              <span className="text-[11px] uppercase tracking-[0.2em] text-[var(--color-ink-muted)]">
                {it.detail}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
