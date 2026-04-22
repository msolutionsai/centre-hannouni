"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { nav, clinic } from "@/lib/content";
import { Arrow, Monogram, Phone } from "@/components/ui/Icons";
import { cn } from "@/lib/cn";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "nav-chrome fixed inset-x-0 top-0 z-50 border-b border-transparent",
          scrolled && "scrolled"
        )}
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-6 py-4 md:px-10 md:py-5">
          <a href="#top" className="flex items-center gap-3 group" aria-label={clinic.name}>
            <Monogram size={34} className="text-[var(--color-ink)]" />
            <div className="hidden sm:flex flex-col leading-tight">
              <span className="font-display text-[17px] font-normal tracking-[0.01em]">
                Centre{" "}
                <span className="italic font-normal text-[var(--color-cognac-deep)]">
                  Hannouni
                </span>
              </span>
              <span className="text-[9.5px] uppercase tracking-[0.28em] text-[var(--color-ink-muted)]">
                Chirurgie esthétique · Marrakech
              </span>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-8">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="text-[12.5px] tracking-[0.04em] text-[var(--color-ink-soft)] hover:text-[var(--color-cognac-deep)] transition-colors"
              >
                {n.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${clinic.phoneE164}`}
              className="hidden md:inline-flex items-center gap-2 text-[12.5px] tracking-[0.04em] text-[var(--color-ink-soft)] hover:text-[var(--color-cognac-deep)] transition-colors"
            >
              <Phone size={14} />
              {clinic.phoneDisplay}
            </a>
            <a href="#rendez-vous" className="btn btn-primary hidden sm:inline-flex">
              Prendre rendez-vous
              <Arrow size={14} />
            </a>
            <button
              type="button"
              aria-label="Ouvrir le menu"
              onClick={() => setOpen(true)}
              className="lg:hidden grid h-10 w-10 place-items-center rounded-full border border-[var(--color-line)]"
            >
              <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden>
                <path d="M0 1h16M0 6h16M0 11h10" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[70] bg-[var(--color-ink)] text-[var(--color-ivory)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between px-6 py-4 md:px-10 md:py-5">
              <div className="flex items-center gap-3">
                <Monogram size={34} className="text-[var(--color-ivory)]" />
                <span className="font-display text-[17px]">
                  Centre <span className="italic text-[var(--color-cognac-soft)]">Hannouni</span>
                </span>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Fermer le menu"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/15"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
                  <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.2" />
                </svg>
              </button>
            </div>
            <nav className="mx-auto mt-16 flex max-w-[90vw] flex-col gap-7 px-6 md:px-10">
              {nav.map((n, i) => (
                <motion.a
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.05, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="font-display text-4xl md:text-6xl leading-none tracking-[-0.03em] text-[var(--color-ivory)] hover:text-[var(--color-cognac-soft)] transition-colors"
                >
                  {n.label}
                </motion.a>
              ))}
              <div className="mt-10 flex flex-col gap-3 text-sm text-[var(--color-ivory)]/70">
                <a href={`tel:${clinic.phoneE164}`} className="link-lux w-fit">
                  {clinic.phoneDisplay}
                </a>
                <span>{clinic.address.line2}</span>
                <span>{clinic.address.city}</span>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
