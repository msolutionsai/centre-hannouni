"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Close } from "@/components/ui/Icons";
import { expertiseAreas } from "@/lib/content";

type Area = (typeof expertiseAreas)[number];

export function Credibility() {
  const items = [...expertiseAreas, ...expertiseAreas];
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [anchor, setAnchor] = useState<DOMRect | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const openWithAnchor = useCallback((i: number, el: HTMLElement) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenIdx(i);
    setAnchor(el.getBoundingClientRect());
  }, []);

  const scheduleClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => {
      setOpenIdx(null);
      setAnchor(null);
    }, 180);
  }, []);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  const closeNow = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenIdx(null);
    setAnchor(null);
  }, []);

  // Lock body scroll when mobile modal is open
  useEffect(() => {
    if (!isMobile || openIdx === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isMobile, openIdx]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeNow();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeNow]);

  // Desktop: close when clicking outside popup
  useEffect(() => {
    if (openIdx === null || isMobile) return;
    const onDoc = (e: MouseEvent) => {
      const el = e.target as Node;
      if (popupRef.current && popupRef.current.contains(el)) return;
      const trigger = (e.target as HTMLElement).closest?.("[data-expertise-item]");
      if (!trigger) closeNow();
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [openIdx, isMobile, closeNow]);

  const active: Area | null =
    openIdx !== null ? expertiseAreas[openIdx % expertiseAreas.length] : null;

  // Desktop anchored position
  const popupWidth = 520;
  const sidePad = 16;
  const popupLeft =
    anchor && !isMobile
      ? Math.max(
          sidePad,
          Math.min(
            window.innerWidth - popupWidth - sidePad,
            anchor.left + anchor.width / 2 - popupWidth / 2
          )
        )
      : 0;
  const popupTop = anchor && !isMobile ? anchor.bottom + 14 : 0;
  const connectorLeft =
    anchor && !isMobile ? anchor.left + anchor.width / 2 - popupLeft : 0;

  return (
    <section
      id="expertises"
      aria-label="Domaines d’expertise"
      className="relative border-y border-[var(--color-line)] bg-[var(--color-ivory-50)] overflow-hidden"
    >
      <div
        className={`marquee-track py-7 ${openIdx !== null ? "is-paused" : ""}`}
      >
        {items.map((it, i) => {
          const realIdx = i % expertiseAreas.length;
          const isActive = openIdx === i || openIdx === realIdx;
          return (
            <button
              key={i}
              type="button"
              data-expertise-item
              aria-expanded={isActive}
              aria-controls="expertise-popup"
              onMouseEnter={(e) => {
                if (!isMobile) openWithAnchor(i, e.currentTarget);
              }}
              onMouseLeave={() => {
                if (!isMobile) scheduleClose();
              }}
              onFocus={(e) => openWithAnchor(i, e.currentTarget)}
              onBlur={() => {
                if (!isMobile) scheduleClose();
              }}
              onClick={(e) => {
                if (isActive) closeNow();
                else openWithAnchor(i, e.currentTarget);
              }}
              className={`group relative flex items-center gap-4 shrink-0 px-2 -mx-2 py-1 outline-none transition-colors ${
                isActive ? "text-[var(--color-cognac-deep)]" : "text-[var(--color-ink)]"
              }`}
            >
              <span className="font-display italic text-[13px] text-[var(--color-cognac-deep)]">
                {it.num}
              </span>
              <span className="font-display text-[17px] tracking-[-0.01em] whitespace-nowrap group-hover:text-[var(--color-cognac-deep)] transition-colors">
                {it.name}
              </span>
              <span className="h-1 w-1 rounded-full bg-[var(--color-cognac)] opacity-70" />
              <span className="font-display italic text-[12.5px] text-[var(--color-ink-muted)] whitespace-nowrap">
                {it.lead}
              </span>
              <span
                className={`absolute left-2 right-2 -bottom-0.5 h-px origin-left bg-[var(--color-cognac-deep)] transition-transform duration-500 ease-out ${
                  isActive ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {active && (isMobile || anchor) && (
          <>
            {/* Mobile backdrop */}
            {isMobile && (
              <motion.div
                key="backdrop"
                onClick={closeNow}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 z-[55] bg-[var(--color-ink)]/40 backdrop-blur-[2px]"
              />
            )}

            <motion.div
              key="popup"
              ref={popupRef}
              id="expertise-popup"
              role="dialog"
              aria-modal={isMobile}
              aria-label={active.name}
              onMouseEnter={isMobile ? undefined : cancelClose}
              onMouseLeave={isMobile ? undefined : scheduleClose}
              initial={
                isMobile
                  ? { opacity: 0, y: 40 }
                  : { opacity: 0, y: 10, scale: 0.985 }
              }
              animate={
                isMobile
                  ? { opacity: 1, y: 0 }
                  : { opacity: 1, y: 0, scale: 1 }
              }
              exit={
                isMobile
                  ? { opacity: 0, y: 40 }
                  : { opacity: 0, y: 10, scale: 0.985 }
              }
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={
                isMobile
                  ? undefined
                  : {
                      position: "fixed",
                      left: popupLeft,
                      top: popupTop,
                      width: `min(calc(100vw - ${sidePad * 2}px), ${popupWidth}px)`,
                    }
              }
              className={
                isMobile
                  ? "fixed inset-x-4 bottom-4 z-[60] max-h-[85vh] overflow-y-auto rounded-[3px] border border-[var(--color-line)] bg-[var(--color-ivory)] p-6 pb-8 shadow-[0_-20px_60px_-20px_rgba(20,23,26,0.35)]"
                  : "z-[60] origin-top rounded-[2px] border border-[var(--color-line)] bg-[var(--color-ivory)] p-7 shadow-[0_30px_80px_-24px_rgba(20,23,26,0.35)]"
              }
            >
              {/* Desktop connector tick */}
              {!isMobile && (
                <motion.span
                  aria-hidden
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  exit={{ scaleY: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute -top-3 h-3 w-px bg-[var(--color-cognac)] origin-top"
                  style={{ left: connectorLeft }}
                />
              )}

              {/* Mobile close button */}
              {isMobile && (
                <button
                  type="button"
                  onClick={closeNow}
                  aria-label="Fermer"
                  className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-[var(--color-line)] text-[var(--color-ink)] transition-colors hover:border-[var(--color-ink)] hover:bg-[var(--color-ink)] hover:text-[var(--color-ivory)]"
                >
                  <Close size={12} />
                </button>
              )}

              <div className="flex items-baseline gap-3">
                <span className="font-display italic text-[13px] text-[var(--color-cognac-deep)]">
                  {active.num}
                </span>
                <span className="h-px w-10 bg-[var(--color-cognac)]" />
              </div>
              <h3 className="mt-3 font-display text-[clamp(1.4rem,5vw,1.65rem)] leading-[1.12] tracking-[-0.015em] text-[var(--color-ink)] pr-10">
                {active.name}
              </h3>
              <p className="mt-1 font-display italic text-[14px] text-[var(--color-cognac-deep)]">
                {active.lead}
              </p>
              <p className="mt-4 text-[13.5px] leading-[1.65] text-[var(--color-ink-soft)]">
                {active.body}
              </p>
              <div className="mt-5 flex items-center gap-3">
                <span className="h-px flex-1 bg-[var(--color-line)]" />
                <span className="text-[10.5px] uppercase tracking-[0.2em] text-[var(--color-ink-muted)]">
                  Ce que cela recouvre
                </span>
                <span className="h-px flex-1 bg-[var(--color-line)]" />
              </div>
              <motion.ul
                initial="hidden"
                animate="show"
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.03, delayChildren: 0.05 } },
                }}
                className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-2.5"
              >
                {active.items.map((it, j) => (
                  <motion.li
                    key={j}
                    variants={{
                      hidden: { opacity: 0, y: 6 },
                      show: { opacity: 1, y: 0 },
                    }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="flex items-start gap-2.5 text-[13px] leading-[1.5] text-[var(--color-ink-soft)]"
                  >
                    <span className="mt-[5px] inline-flex h-3.5 w-3.5 items-center justify-center rounded-full border border-[var(--color-cognac)] text-[var(--color-cognac-deep)] shrink-0">
                      <Check size={8} />
                    </span>
                    {it}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
