"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useId } from "react";

type Props = {
  className?: string;
  src?: string;
};

/**
 * Ink-wash reveal: SVG turbulence+displacement filter animated via SMIL
 * (dispersed particles resolving into the subject), layered with:
 *  - cognac halo (static once settled)
 *  - anatomical guide lines drawing in
 *  - ink splatters puffing out
 *  - single cognac-tinted light sweep
 *  - slow clip-path rise + blur/brightness resolve via Framer Motion
 */
export function HeroPortrait({
  className,
  src = "/images/hero/dr-hannouni-2.webp",
}: Props) {
  const reduce = useReducedMotion();
  const uid = useId().replace(/:/g, "");
  const filterId = `ink-${uid}`;
  const maskId = `brush-${uid}`;

  return (
    <div className={`relative ${className ?? ""}`} aria-hidden>
      {/* Static filter defs */}
      <svg aria-hidden className="absolute h-0 w-0 overflow-hidden" focusable="false">
        <defs>
          <filter id={filterId} x="-10%" y="-10%" width="120%" height="120%" colorInterpolationFilters="sRGB">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.22"
              numOctaves="2"
              seed="7"
              result="noise"
            >
              {!reduce && (
                <animate
                  attributeName="baseFrequency"
                  from="0.22"
                  to="0.008"
                  dur="2.8s"
                  begin="0.3s"
                  fill="freeze"
                  calcMode="spline"
                  keySplines="0.22 1 0.36 1"
                />
              )}
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="0" xChannelSelector="R" yChannelSelector="G">
              {!reduce && (
                <animate
                  attributeName="scale"
                  values="220;160;0"
                  keyTimes="0;0.35;1"
                  dur="2.8s"
                  begin="0.3s"
                  fill="freeze"
                  calcMode="spline"
                  keySplines="0.2 0 0.2 1; 0.3 0 0 1"
                />
              )}
            </feDisplacementMap>
          </filter>

          <mask id={maskId} maskUnits="objectBoundingBox" maskContentUnits="objectBoundingBox">
            {/* Four overlapping irregular ellipses that expand like brush strokes */}
            <rect width="1" height="1" fill="black" />
            <motion.ellipse
              cx="0.42"
              cy="0.55"
              rx="0"
              ry="0"
              fill="white"
              initial={{ rx: 0, ry: 0 }}
              animate={{ rx: 0.72, ry: 0.62 }}
              transition={{ duration: 1.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.ellipse
              cx="0.58"
              cy="0.4"
              rx="0"
              ry="0"
              fill="white"
              initial={{ rx: 0, ry: 0 }}
              animate={{ rx: 0.6, ry: 0.55 }}
              transition={{ duration: 1.7, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.rect
              x="0"
              y="0"
              width="0"
              height="1"
              fill="white"
              initial={{ width: 0 }}
              animate={{ width: 1 }}
              transition={{ duration: 2.2, delay: 0.9, ease: [0.76, 0, 0.24, 1] }}
            />
          </mask>
        </defs>
      </svg>

      {/* Cognac halo — settles into place and stays */}
      <motion.div
        className="absolute inset-0 -z-10"
        initial={{ opacity: 0, scale: 0.88 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2.2, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background:
            "radial-gradient(closest-side at 50% 38%, rgba(165,122,78,0.42) 0%, rgba(201,164,122,0.18) 45%, rgba(245,241,234,0) 78%)",
          filter: "blur(24px)",
        }}
      />

      {/* Calibration lines — draw in after image settles */}
      <motion.svg
        viewBox="0 0 400 500"
        className="pointer-events-none absolute inset-0 h-full w-full -z-[5]"
        preserveAspectRatio="xMidYMid meet"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 2.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <defs>
          <linearGradient id={`axis-${uid}`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#A57A4E" stopOpacity="0" />
            <stop offset="50%" stopColor="#A57A4E" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#A57A4E" stopOpacity="0" />
          </linearGradient>
          <linearGradient id={`horiz-${uid}`} x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#A57A4E" stopOpacity="0" />
            <stop offset="50%" stopColor="#A57A4E" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#A57A4E" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.line
          x1="200" y1="50" x2="200" y2="450"
          stroke={`url(#axis-${uid})`} strokeWidth="0.8" strokeDasharray="2 5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 2.3, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.line
          x1="60" y1="215" x2="340" y2="215"
          stroke={`url(#horiz-${uid})`} strokeWidth="0.6" strokeDasharray="1 4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.8, delay: 2.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.svg>

      {/* Ink splatters — organic cognac dots that puff out on reveal */}
      <svg
        viewBox="0 0 400 500"
        className="pointer-events-none absolute inset-0 h-full w-full -z-[4]"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
      >
        {[
          { cx: 74, cy: 180, r: 4, delay: 0.8 },
          { cx: 340, cy: 120, r: 3, delay: 1.0 },
          { cx: 60, cy: 420, r: 5, delay: 1.15 },
          { cx: 350, cy: 380, r: 3.5, delay: 1.3 },
          { cx: 200, cy: 60, r: 2.5, delay: 1.45 },
        ].map((p, i) => (
          <motion.circle
            key={i}
            cx={p.cx}
            cy={p.cy}
            r={p.r}
            fill="#A57A4E"
            initial={{ opacity: 0, scale: 0 }}
            animate={reduce ? { opacity: 0.25, scale: 1 } : { opacity: [0, 0.55, 0.2], scale: [0, 1.6, 1] }}
            transition={{ duration: 1.6, delay: p.delay, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          />
        ))}
      </svg>

      {/* Cognac ink wash — sweeps across behind the portrait on entry */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-[6]"
        initial={{ opacity: 0, scale: 1.2 }}
        animate={{ opacity: [0, 0.35, 0], scale: [1.2, 1, 0.95] }}
        transition={{ duration: 2.4, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background:
            "radial-gradient(60% 45% at 55% 55%, rgba(165,122,78,0.55) 0%, rgba(165,122,78,0) 70%)",
          filter: "blur(30px)",
        }}
      />

      {/* Main portrait — ink filter + clip-path rise + brush mask + brightness resolve */}
      <motion.div
        className="relative h-full w-full"
        initial={{
          opacity: 0,
          y: 40,
          scale: 1.04,
          filter: "brightness(0.7) contrast(1.05)",
          clipPath: "inset(100% 0% 0% 0%)",
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "brightness(1) contrast(1)",
          clipPath: "inset(0% 0% 0% 0%)",
        }}
        transition={{
          duration: 2.4,
          delay: 0.35,
          ease: [0.22, 1, 0.36, 1],
          clipPath: { duration: 2.2, delay: 0.4, ease: [0.76, 0, 0.24, 1] },
          filter: { duration: 2, delay: 0.6, ease: [0.22, 1, 0.36, 1] },
        }}
      >
        <div
          className="relative h-full w-full"
          style={reduce ? undefined : { filter: `url(#${filterId})`, willChange: "filter" }}
        >
          <Image
            src={src}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 56vw"
            priority
            className="object-contain object-bottom select-none"
            style={{
              filter:
                "drop-shadow(0 28px 36px rgba(20,23,26,0.10)) drop-shadow(0 8px 14px rgba(20,23,26,0.05))",
            }}
          />
        </div>
      </motion.div>

      {/* Cognac-tinted light sweep — single pass, diagonal */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-[3] mix-blend-soft-light"
        initial={{ x: "-120%", opacity: 0 }}
        animate={{ x: "120%", opacity: [0, 1, 0] }}
        transition={{ duration: 2.4, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background:
            "linear-gradient(105deg, transparent 38%, rgba(255,235,200,0.65) 50%, transparent 62%)",
          filter: "blur(16px)",
        }}
      />
    </div>
  );
}
