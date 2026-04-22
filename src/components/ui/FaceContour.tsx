"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/**
 * Abstract anatomical face contour — animated line art.
 * No photo, no portrait. Pure strokes that evoke the
 * architecture of the face (golden ratio, phi lines).
 */
export function FaceContour({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-1.5, 1.5]);

  const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    show: (i: number) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 2.4, delay: 0.3 + i * 0.12, ease: EASE },
        opacity: { duration: 0.6, delay: 0.3 + i * 0.12 },
      },
    }),
  };

  const dotPulse = reduce
    ? {}
    : { scale: [1, 1.6, 1], opacity: [0.4, 1, 0.4] };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ y, rotate }}
    >
      <motion.svg
        viewBox="0 0 600 780"
        className="w-full h-full"
        fill="none"
        initial="hidden"
        animate="show"
        aria-hidden
      >
        <defs>
          <linearGradient id="fc-line" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#14171A" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#A57A4E" stopOpacity="1" />
            <stop offset="100%" stopColor="#14171A" stopOpacity="0.7" />
          </linearGradient>
          <linearGradient id="fc-gold" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C9A47A" />
            <stop offset="100%" stopColor="#8A5F35" />
          </linearGradient>
          <radialGradient id="fc-glow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#A57A4E" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#A57A4E" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient glow behind */}
        <circle cx="300" cy="360" r="260" fill="url(#fc-glow)" />

        {/* Outer face oval */}
        <motion.path
          d="M300 80 C 180 80 120 220 120 380 C 120 540 200 680 300 700 C 400 680 480 540 480 380 C 480 220 420 80 300 80 Z"
          stroke="url(#fc-line)"
          strokeWidth="1.2"
          custom={0}
          variants={draw}
        />

        {/* Phi vertical */}
        <motion.line
          x1="300" y1="80" x2="300" y2="700"
          stroke="#A57A4E"
          strokeWidth="0.6"
          strokeDasharray="2 4"
          custom={1}
          variants={draw}
        />

        {/* Phi horizontal thirds */}
        <motion.line
          x1="130" y1="260" x2="470" y2="260"
          stroke="#A57A4E" strokeWidth="0.5" strokeDasharray="2 4"
          custom={2} variants={draw}
        />
        <motion.line
          x1="130" y1="420" x2="470" y2="420"
          stroke="#A57A4E" strokeWidth="0.5" strokeDasharray="2 4"
          custom={3} variants={draw}
        />
        <motion.line
          x1="150" y1="555" x2="450" y2="555"
          stroke="#A57A4E" strokeWidth="0.5" strokeDasharray="2 4"
          custom={4} variants={draw}
        />

        {/* Brow arch */}
        <motion.path
          d="M180 300 Q 230 275 285 300"
          stroke="url(#fc-gold)" strokeWidth="1.4" strokeLinecap="round"
          custom={3} variants={draw}
        />
        <motion.path
          d="M315 300 Q 370 275 420 300"
          stroke="url(#fc-gold)" strokeWidth="1.4" strokeLinecap="round"
          custom={3.3} variants={draw}
        />

        {/* Eye contours */}
        <motion.path
          d="M200 355 Q 235 340 270 355 Q 235 370 200 355 Z"
          stroke="#14171A" strokeWidth="0.9"
          custom={4} variants={draw}
        />
        <motion.path
          d="M330 355 Q 365 340 400 355 Q 365 370 330 355 Z"
          stroke="#14171A" strokeWidth="0.9"
          custom={4.3} variants={draw}
        />

        {/* Nose bridge and base */}
        <motion.path
          d="M300 340 L 285 460 L 300 495 L 315 460 L 300 340"
          stroke="#14171A" strokeWidth="0.9"
          custom={5} variants={draw}
        />
        <motion.path
          d="M278 475 Q 300 500 322 475"
          stroke="#A57A4E" strokeWidth="1.1" strokeLinecap="round"
          custom={5.2} variants={draw}
        />

        {/* Lips */}
        <motion.path
          d="M240 570 Q 270 555 300 560 Q 330 555 360 570 Q 330 590 300 585 Q 270 590 240 570 Z"
          stroke="url(#fc-gold)" strokeWidth="1.2"
          custom={6} variants={draw}
        />
        <motion.line
          x1="240" y1="570" x2="360" y2="570"
          stroke="#14171A" strokeWidth="0.6" strokeDasharray="1 2"
          custom={6.2} variants={draw}
        />

        {/* Jawline accent */}
        <motion.path
          d="M150 520 Q 200 640 300 680 Q 400 640 450 520"
          stroke="#A57A4E" strokeWidth="0.7" strokeDasharray="1 3"
          custom={7} variants={draw}
        />

        {/* Calibration dots */}
        {reduce ? null : (
          <>
            {[
              { x: 300, y: 80 },
              { x: 300, y: 260 },
              { x: 200, y: 355 },
              { x: 400, y: 355 },
              { x: 300, y: 420 },
              { x: 300, y: 495 },
              { x: 300, y: 570 },
              { x: 300, y: 700 },
            ].map((p, i) => (
              <motion.circle
                key={i}
                cx={p.x} cy={p.y}
                r="2.2"
                fill="#A57A4E"
                initial={{ opacity: 0 }}
                animate={dotPulse}
                transition={{
                  duration: 2.6,
                  repeat: Infinity,
                  delay: 1.4 + i * 0.2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </>
        )}
      </motion.svg>
    </motion.div>
  );
}
