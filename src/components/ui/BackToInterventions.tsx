"use client";

import Link from "next/link";
import { Arrow } from "@/components/ui/Icons";

/**
 * Back-link from a slug page to the home page's interventions section.
 *
 * Stores a sessionStorage flag the home page reads on mount. This is
 * more reliable than relying on the URL hash because some mobile
 * browsers fight client-side hash navigation. The href still carries
 * the hash so right-click / open-in-new-tab continues to work.
 */
export function BackToInterventions() {
  const onClick = () => {
    if (typeof window === "undefined") return;
    try {
      sessionStorage.setItem("scrollTo", "interventions");
    } catch {
      /* private mode or storage disabled */
    }
  };

  return (
    <Link
      href="/#interventions"
      scroll={false}
      onClick={onClick}
      className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors"
    >
      <Arrow size={12} className="rotate-180" />
      Toutes les interventions
    </Link>
  );
}
