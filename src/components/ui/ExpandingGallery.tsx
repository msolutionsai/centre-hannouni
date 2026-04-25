"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Arrow } from "@/components/ui/Icons";

type GalleryImage = { src: string; alt: string };

type Props = {
  images: GalleryImage[];
  className?: string;
  autoplayMs?: number;
  resumeMs?: number;
};

/**
 * Expanding gallery
 * - Desktop (md+) : tous les panneaux à largeur égale, hover en élargit un.
 * - Mobile : image active en pleine largeur (aspect 4/5) avec défilement
 *   automatique, flèches précédent/suivant et pagination en pastilles.
 */
export function ExpandingGallery({
  images,
  className,
  autoplayMs = 5000,
  resumeMs = 9000,
}: Props) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const pauseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const current = images[active];

  const pauseBriefly = useCallback(() => {
    setPaused(true);
    if (pauseTimer.current) clearTimeout(pauseTimer.current);
    pauseTimer.current = setTimeout(() => setPaused(false), resumeMs);
  }, [resumeMs]);

  const goTo = useCallback(
    (idx: number) => {
      setActive(((idx % images.length) + images.length) % images.length);
      pauseBriefly();
    },
    [images.length, pauseBriefly]
  );

  // Mobile autoplay — only when narrow viewport
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 767px)");
    if (!mq.matches) return;
    if (paused) return;
    const id = window.setInterval(() => {
      setActive((p) => (p + 1) % images.length);
    }, autoplayMs);
    return () => window.clearInterval(id);
  }, [paused, autoplayMs, images.length]);

  return (
    <div className={className}>
      {/* MOBILE — single image + auto-advance + arrows + dots */}
      <div className="md:hidden">
        <div
          className="relative aspect-[4/5] w-full rounded-[2px] overflow-hidden ring-1 ring-[var(--color-line)] bg-[var(--color-ink)]"
          onTouchStart={pauseBriefly}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={current.src}
            src={current.src}
            alt={current.alt}
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-center animate-[fadeIn_650ms_cubic-bezier(0.22,1,0.36,1)_both]"
          />

          <div
            aria-hidden
            className="
              pointer-events-none absolute inset-x-0 bottom-0 h-[55%]
              bg-[linear-gradient(to_top,rgba(20,23,26,0.85)_0%,rgba(20,23,26,0.25)_60%,rgba(20,23,26,0)_100%)]
            "
          />

          <div className="absolute top-4 right-4 z-10 font-display italic text-[10px] tracking-[0.2em] text-[var(--color-ivory)]/85 uppercase">
            {String(active + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
          </div>

          <div className="absolute inset-x-0 bottom-16 px-5 z-10 text-[var(--color-ivory)] flex items-center gap-3">
            <span className="h-px w-10 bg-[var(--color-cognac-soft)]" />
            <span className="font-display italic text-[13px] tracking-[0.04em]">
              {current.alt}
            </span>
          </div>

          {/* Prev / next */}
          <div className="absolute inset-x-0 bottom-4 z-20 flex items-center justify-between px-4">
            <button
              type="button"
              onClick={() => goTo(active - 1)}
              aria-label="Image précédente"
              className="grid h-10 w-10 place-items-center rounded-full bg-[var(--color-ivory)]/10 backdrop-blur-md ring-1 ring-[var(--color-ivory)]/30 text-[var(--color-ivory)] transition-colors hover:bg-[var(--color-ivory)] hover:text-[var(--color-ink)]"
            >
              <Arrow size={12} className="rotate-180" />
            </button>

            <div className="flex items-center gap-1.5">
              {images.map((_, idx) => {
                const isActive = active === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => goTo(idx)}
                    aria-label={`Image ${idx + 1}`}
                    aria-current={isActive}
                    className="h-1.5 rounded-full transition-all duration-700"
                    style={{
                      width: isActive ? 24 : 8,
                      background: isActive
                        ? "var(--color-ivory)"
                        : "rgba(245,241,234,0.45)",
                      transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
                    }}
                  />
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => goTo(active + 1)}
              aria-label="Image suivante"
              className="grid h-10 w-10 place-items-center rounded-full bg-[var(--color-ivory)]/10 backdrop-blur-md ring-1 ring-[var(--color-ivory)]/30 text-[var(--color-ivory)] transition-colors hover:bg-[var(--color-ivory)] hover:text-[var(--color-ink)]"
            >
              <Arrow size={12} />
            </button>
          </div>
        </div>
      </div>

      {/* DESKTOP — expanding row */}
      <div className="hidden md:flex items-stretch gap-2 h-[460px] lg:h-[500px] w-full">
        {images.map((img, idx) => (
          <div
            key={idx}
            tabIndex={0}
            role="button"
            aria-label={img.alt}
            style={{
              flex: hovered === idx ? "8 1 0%" : "1 1 0%",
              transition: "flex-grow 700ms cubic-bezier(0.22, 1, 0.36, 1)",
            }}
            onMouseEnter={() => setHovered(idx)}
            onMouseLeave={() => setHovered(null)}
            onFocus={() => setHovered(idx)}
            onBlur={() => setHovered(null)}
            className="
              relative group h-full
              rounded-[2px] overflow-hidden
              ring-1 ring-[var(--color-line)]
              outline-none
            "
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              decoding="async"
              className="
                h-full w-full object-cover object-center
                transition-transform duration-[1500ms] ease-out
                group-hover:scale-[1.04]
              "
            />
            <div
              aria-hidden
              className="
                pointer-events-none absolute inset-x-0 bottom-0 h-[55%]
                bg-[linear-gradient(to_top,rgba(20,23,26,0.85)_0%,rgba(20,23,26,0.25)_60%,rgba(20,23,26,0)_100%)]
              "
            />
            <div className="absolute inset-x-0 bottom-0 px-5 py-6 z-10 text-[var(--color-ivory)] flex items-center gap-3">
              <span className="h-px w-6 group-hover:w-10 bg-[var(--color-cognac-soft)] transition-[width] duration-700 ease-out" />
              <span className="font-display italic text-[13.5px] tracking-[0.04em] whitespace-nowrap overflow-hidden text-ellipsis opacity-90 group-hover:opacity-100 transition-opacity duration-500">
                {img.alt}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
