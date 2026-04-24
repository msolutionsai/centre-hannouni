"use client";

import { motion, useReducedMotion } from "framer-motion";

type Props = {
  variant?: "hero" | "portrait" | "centre" | "result-a" | "result-b" | "surgery" | "hands";
  className?: string;
  caption?: string;
};

const palettes = {
  hero: ["#E9E2D5", "#D7CDBC", "#A57A4E", "#14171A"],
  portrait: ["#EDE7DB", "#C9A47A", "#8A5F35", "#2A2D30"],
  centre: ["#F5F1EA", "#E2DBCE", "#4A5E54", "#2F3E36"],
  "result-a": ["#F2EBDE", "#D7CDBC", "#8A5F35", "#2A2D30"],
  "result-b": ["#EDE7DB", "#C9A47A", "#A57A4E", "#14171A"],
  surgery: ["#E9E2D5", "#4A5E54", "#2F3E36", "#14171A"],
  hands: ["#EDE7DB", "#D7CDBC", "#A57A4E", "#2A2D30"],
};

export function Portrait({ variant = "hero", className, caption }: Props) {
  const reduce = useReducedMotion();
  const [c1, c2, c3, c4] = palettes[variant];
  const id = `grad-${variant}`;

  return (
    <div
      className={`relative overflow-hidden bg-[var(--color-stone-warm)] ${className ?? ""}`}
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 400 500"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="0.8" y2="1">
            <stop offset="0%" stopColor={c1} />
            <stop offset="45%" stopColor={c2} />
            <stop offset="100%" stopColor={c3} />
          </linearGradient>
          <radialGradient id={`${id}-r`} cx="0.3" cy="0.25" r="0.9">
            <stop offset="0%" stopColor={c2} stopOpacity="0.9" />
            <stop offset="70%" stopColor={c3} stopOpacity="0.2" />
            <stop offset="100%" stopColor={c4} stopOpacity="0.5" />
          </radialGradient>
          <filter id={`${id}-blur`}>
            <feGaussianBlur stdDeviation="30" />
          </filter>
        </defs>
        <rect width="400" height="500" fill={`url(#${id})`} />
        {variant === "hero" || variant === "portrait" ? (
          <>
            <ellipse cx="200" cy="190" rx="95" ry="120" fill={c3} opacity="0.55" />
            <ellipse cx="200" cy="440" rx="160" ry="130" fill={c4} opacity="0.92" />
            <path
              d="M120 310 Q200 280 280 310 L280 500 L120 500 Z"
              fill={c4}
              opacity="0.88"
            />
            <circle cx="200" cy="190" r="80" fill={c2} opacity="0.35" filter={`url(#${id}-blur)`} />
          </>
        ) : variant === "centre" ? (
          <>
            <rect x="40" y="320" width="320" height="180" fill={c4} opacity="0.9" />
            <rect x="80" y="160" width="60" height="160" fill={c3} opacity="0.4" />
            <rect x="160" y="100" width="60" height="220" fill={c3} opacity="0.5" />
            <rect x="240" y="180" width="60" height="140" fill={c3} opacity="0.4" />
            <rect x="60" y="370" width="280" height="3" fill={c1} opacity="0.3" />
          </>
        ) : variant === "surgery" ? (
          <>
            <circle cx="200" cy="250" r="130" fill={c4} opacity="0.85" />
            <circle cx="200" cy="250" r="60" fill={c1} opacity="0.6" />
            <circle cx="200" cy="250" r="22" fill={c3} />
          </>
        ) : variant === "hands" ? (
          <>
            <path
              d="M100 500 L100 320 Q120 280 160 300 L200 280 L240 300 Q280 280 300 320 L300 500 Z"
              fill={c4}
              opacity="0.9"
            />
            <circle cx="200" cy="260" r="60" fill={c3} opacity="0.5" />
          </>
        ) : (
          <>
            <ellipse cx="200" cy="220" rx="110" ry="140" fill={c3} opacity="0.5" />
            <ellipse cx="200" cy="470" rx="170" ry="140" fill={c4} opacity="0.9" />
          </>
        )}
        <rect width="400" height="500" fill={`url(#${id}-r)`} opacity="0.65" />
      </svg>

      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 100%, rgba(20,23,26,0.35), transparent 60%)",
        }}
        initial={{ opacity: 0 }}
        animate={reduce ? { opacity: 0.4 } : { opacity: [0.35, 0.55, 0.35] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      {caption ? (
        <div className="absolute bottom-5 left-5 right-5 flex items-center gap-3 text-[10px] uppercase tracking-[0.22em] text-[var(--color-ivory)]/80">
          <span className="h-px w-8 bg-[var(--color-ivory)]/50" />
          {caption}
        </div>
      ) : null}
    </div>
  );
}
