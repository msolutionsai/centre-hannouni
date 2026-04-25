"use client";

type GalleryImage = { src: string; alt: string };

type Props = {
  images: GalleryImage[];
  className?: string;
};

/**
 * Expanding gallery — strips of images sit side by side, each panel widens on
 * hover (desktop). On touch devices we fall back to a horizontal snap-scroll
 * so the whole set stays browsable without hover.
 */
export function ExpandingGallery({ images, className }: Props) {
  return (
    <div
      className={`
        flex items-stretch gap-2
        h-[420px] md:h-[440px] lg:h-[480px]
        w-full
        overflow-x-auto md:overflow-visible
        snap-x snap-mandatory md:snap-none
        no-scrollbar
        ${className ?? ""}
      `}
    >
      {images.map((img, idx) => (
        <div
          key={idx}
          className="
            relative group shrink-0 md:shrink
            md:flex-grow
            w-[78%] sm:w-[60%] md:w-56
            h-full
            rounded-[2px] overflow-hidden
            snap-start
            transition-[width,flex-grow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
            md:hover:w-full
            ring-1 ring-[var(--color-line)]
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
              md:group-hover:scale-[1.04]
            "
          />

          {/* Permanent vertical gradient + cognac edge */}
          <div
            aria-hidden
            className="
              pointer-events-none absolute inset-x-0 bottom-0 h-[55%]
              bg-[linear-gradient(to_top,rgba(20,23,26,0.85)_0%,rgba(20,23,26,0.25)_60%,rgba(20,23,26,0)_100%)]
            "
          />

          {/* Caption — collapsed by default, expands on hover (desktop) or always shown on mobile */}
          <div
            className="
              absolute inset-x-0 bottom-0 px-5 py-5 md:py-6 z-10
              text-[var(--color-ivory)]
              flex items-center gap-3
            "
          >
            <span className="h-px w-6 md:w-0 md:group-hover:w-10 bg-[var(--color-cognac-soft)] transition-[width] duration-700 ease-out" />
            <span
              className="
                font-display italic text-[12.5px] md:text-[13.5px] tracking-[0.04em]
                whitespace-nowrap overflow-hidden text-ellipsis
                opacity-100 md:opacity-90 md:group-hover:opacity-100
                md:translate-y-1 md:group-hover:translate-y-0
                transition-[opacity,transform] duration-500 ease-out
              "
            >
              {img.alt}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
