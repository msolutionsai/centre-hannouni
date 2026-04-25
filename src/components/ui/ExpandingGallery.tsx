"use client";

import { useState } from "react";

type GalleryImage = { src: string; alt: string };

type Props = {
  images: GalleryImage[];
  className?: string;
};

/**
 * Expanding gallery
 * - Desktop (md+) : tous les panneaux à largeur égale, hover en élargit un.
 * - Mobile : layout dédié — image active en pleine largeur (aspect 4/5) +
 *   strip de thumbnails cliquables dessous.
 */
export function ExpandingGallery({ images, className }: Props) {
  const [active, setActive] = useState(0);
  const current = images[active];

  return (
    <div className={className}>
      {/* MOBILE — main image + thumbnail strip */}
      <div className="md:hidden">
        <div className="relative aspect-[4/5] w-full rounded-[2px] overflow-hidden ring-1 ring-[var(--color-line)] bg-[var(--color-ink)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={current.src}
            src={current.src}
            alt={current.alt}
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-center animate-[fadeIn_550ms_cubic-bezier(0.22,1,0.36,1)_both]"
          />
          <div
            aria-hidden
            className="
              pointer-events-none absolute inset-x-0 bottom-0 h-[45%]
              bg-[linear-gradient(to_top,rgba(20,23,26,0.85)_0%,rgba(20,23,26,0.25)_60%,rgba(20,23,26,0)_100%)]
            "
          />
          <div className="absolute inset-x-0 bottom-0 px-5 py-5 z-10 text-[var(--color-ivory)] flex items-center gap-3">
            <span className="h-px w-10 bg-[var(--color-cognac-soft)]" />
            <span className="font-display italic text-[12.5px] tracking-[0.04em]">
              {current.alt}
            </span>
          </div>
          <div className="absolute top-3 right-3 z-10 text-[10px] uppercase tracking-[0.2em] text-[var(--color-ivory)]/80 font-display italic">
            {String(active + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
          </div>
        </div>

        {/* Thumbnail strip */}
        <div className="mt-3 -mx-6 px-6 flex gap-2 overflow-x-auto no-scrollbar snap-x snap-mandatory">
          {images.map((img, idx) => {
            const isActive = active === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setActive(idx)}
                aria-label={img.alt}
                aria-pressed={isActive}
                className={`
                  relative shrink-0 snap-start
                  h-16 w-[68px] rounded-[2px] overflow-hidden
                  transition-all duration-500 ease-out
                  ${
                    isActive
                      ? "ring-1 ring-[var(--color-cognac)] opacity-100"
                      : "ring-1 ring-[var(--color-line)] opacity-60"
                  }
                `}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover object-center"
                />
                {isActive && (
                  <span
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 h-[2px] bg-[var(--color-cognac)]"
                  />
                )}
              </button>
            );
          })}
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
            className="
              relative group h-full
              flex-grow w-56
              rounded-[2px] overflow-hidden
              ring-1 ring-[var(--color-line)]
              transition-[flex-grow] duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)]
              hover:flex-grow-[8] focus-visible:flex-grow-[8]
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
