"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

type Props = {
  className?: string;
  src?: string;
};

export function HeroPortrait({
  className,
  src = "/images/hero/dr-hannouni-2.webp",
}: Props) {
  const reduce = useReducedMotion();

  return (
    <div className={`relative ${className ?? ""}`} aria-hidden>
      {/* Soft radial cognac halo — static glow, no movement */}
      <motion.div
        className="absolute inset-0 -z-10"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background:
            "radial-gradient(closest-side at 50% 40%, rgba(165,122,78,0.40) 0%, rgba(201,164,122,0.20) 40%, rgba(245,241,234,0) 75%)",
          filter: "blur(22px)",
        }}
      />

      {/* Anatomical calibration lines — draw in from center */}
      <motion.svg
        viewBox="0 0 400 500"
        className="pointer-events-none absolute inset-0 h-full w-full -z-[5]"
        preserveAspectRatio="xMidYMid meet"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <defs>
          <linearGradient id="hp-axis" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#A57A4E" stopOpacity="0" />
            <stop offset="50%" stopColor="#A57A4E" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#A57A4E" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="hp-horiz" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#A57A4E" stopOpacity="0" />
            <stop offset="50%" stopColor="#A57A4E" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#A57A4E" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.line
          x1="200"
          y1="40"
          x2="200"
          y2="460"
          stroke="url(#hp-axis)"
          strokeWidth="0.8"
          strokeDasharray="2 5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.2, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.line
          x1="70"
          y1="215"
          x2="330"
          y2="215"
          stroke="url(#hp-horiz)"
          strokeWidth="0.6"
          strokeDasharray="1 4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.line
          x1="85"
          y1="340"
          x2="315"
          y2="340"
          stroke="url(#hp-horiz)"
          strokeWidth="0.5"
          strokeDasharray="1 4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 1.8, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.svg>

      {/* Main portrait — artistic reveal, no perpetual motion */}
      <motion.div
        className="relative h-full w-full"
        initial={{
          opacity: 0,
          y: 60,
          scale: 1.06,
          filter: "blur(28px) brightness(0.85)",
          clipPath: "inset(100% 0% 0% 0%)",
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px) brightness(1)",
          clipPath: "inset(0% 0% 0% 0%)",
        }}
        transition={{
          duration: 2.1,
          delay: 0.35,
          ease: [0.22, 1, 0.36, 1],
          clipPath: { duration: 2.3, delay: 0.3, ease: [0.76, 0, 0.24, 1] },
          filter: { duration: 1.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] },
        }}
      >
        <Image
          src={src}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 58vw"
          priority
          className="object-contain object-bottom select-none"
          style={{
            filter:
              "drop-shadow(0 24px 32px rgba(20,23,26,0.10)) drop-shadow(0 6px 12px rgba(20,23,26,0.06))",
          }}
        />
      </motion.div>

      {/* Light sweep — single pass across on entry, then gone */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-[4] mix-blend-soft-light"
        initial={{ x: "-110%", opacity: 0 }}
        animate={{ x: "110%", opacity: [0, 1, 0] }}
        transition={{ duration: 2.2, delay: 1, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background:
            "linear-gradient(105deg, transparent 38%, rgba(255,240,215,0.55) 50%, transparent 62%)",
          filter: "blur(14px)",
        }}
      />

      {/* Orbital accent dots — appear sequentially, then static */}
      <motion.svg
        viewBox="0 0 400 500"
        className="pointer-events-none absolute inset-0 h-full w-full -z-[3]"
        preserveAspectRatio="xMidYMid meet"
      >
        {[
          { cx: 200, cy: 215, delay: 2.2 },
          { cx: 200, cy: 340, delay: 2.35 },
          { cx: 130, cy: 215, delay: 2.5 },
          { cx: 270, cy: 215, delay: 2.5 },
        ].map((p, i) => (
          <motion.circle
            key={i}
            cx={p.cx}
            cy={p.cy}
            r="2"
            fill="#A57A4E"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: reduce ? 0.7 : [0, 1, 0.7], scale: [0, 1.4, 1] }}
            transition={{ duration: 1.1, delay: p.delay, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}
      </motion.svg>
    </div>
  );
}
