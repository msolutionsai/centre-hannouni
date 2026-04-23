"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

type Props = {
  className?: string;
};

export function HeroPortrait({ className }: Props) {
  const reduce = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 60, damping: 18, mass: 0.6 });

  const tx = useTransform(sx, [-1, 1], [-16, 16]);
  const ty = useTransform(sy, [-1, 1], [-12, 12]);

  const haloX = useTransform(sx, [-1, 1], [-28, 28]);
  const haloY = useTransform(sy, [-1, 1], [-22, 22]);

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: MouseEvent) => {
      if (!wrapRef.current) return;
      const r = wrapRef.current.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      mx.set(Math.max(-1, Math.min(1, (e.clientX - cx) / (r.width / 2))));
      my.set(Math.max(-1, Math.min(1, (e.clientY - cy) / (r.height / 2))));
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my, reduce]);

  return (
    <div
      ref={wrapRef}
      className={`relative ${className ?? ""}`}
      aria-hidden
    >
      {/* Soft radial halo — cognac glow */}
      <motion.div
        className="absolute inset-0 -z-10"
        style={{ x: haloX, y: haloY }}
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={reduce ? {} : { scale: [1, 1.06, 1], opacity: [0.55, 0.75, 0.55] }}
          transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background:
              "radial-gradient(closest-side at 50% 45%, rgba(165,122,78,0.45) 0%, rgba(201,164,122,0.22) 38%, rgba(245,241,234,0) 70%)",
            filter: "blur(18px)",
          }}
        />
      </motion.div>

      {/* Orbital ring — calibrating lines */}
      <motion.svg
        viewBox="0 0 400 500"
        className="pointer-events-none absolute inset-0 h-full w-full -z-[5]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <defs>
          <linearGradient id="hp-line" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#A57A4E" stopOpacity="0" />
            <stop offset="50%" stopColor="#A57A4E" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#A57A4E" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="hp-dot" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#A57A4E" stopOpacity="1" />
            <stop offset="100%" stopColor="#A57A4E" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Vertical golden axis */}
        <motion.line
          x1="200"
          y1="30"
          x2="200"
          y2="470"
          stroke="url(#hp-line)"
          strokeWidth="0.8"
          strokeDasharray="2 6"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.8 }}
          transition={{ duration: 2.6, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Horizontal eye-line */}
        <motion.line
          x1="60"
          y1="210"
          x2="340"
          y2="210"
          stroke="url(#hp-line)"
          strokeWidth="0.6"
          strokeDasharray="1 5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
          opacity="0.7"
        />

        {/* Horizontal jaw-line */}
        <motion.line
          x1="70"
          y1="340"
          x2="330"
          y2="340"
          stroke="url(#hp-line)"
          strokeWidth="0.6"
          strokeDasharray="1 5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
          opacity="0.55"
        />

        {/* Calibration points */}
        {[
          { cx: 200, cy: 210, d: 1.5 },
          { cx: 200, cy: 340, d: 1.7 },
          { cx: 140, cy: 210, d: 1.9 },
          { cx: 260, cy: 210, d: 2.1 },
        ].map((p, i) => (
          <motion.circle
            key={i}
            cx={p.cx}
            cy={p.cy}
            r="2.2"
            fill="#A57A4E"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0.6, 1],
              scale: [0, 1.2, 1, 1.1],
            }}
            transition={{
              duration: 2.4,
              delay: p.d,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.svg>

      {/* Outer soft ring */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -z-[6]"
        style={{
          top: "4%",
          left: "6%",
          right: "6%",
          bottom: "4%",
          border: "1px solid rgba(165,122,78,0.22)",
          borderRadius: "50%",
        }}
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Main portrait — floating + parallax + slow breath */}
      <motion.div
        className="relative h-full w-full"
        style={{ x: tx, y: ty }}
        initial={{ opacity: 0, y: 40, scale: 1.04, filter: "blur(14px)" }}
        animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="relative h-full w-full"
          animate={reduce ? {} : { y: [0, -10, 0] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src="/images/hero/dr-hannouni.webp"
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 58vw"
            priority
            className="object-contain object-center select-none"
            style={{
              filter: "drop-shadow(0 30px 40px rgba(20,23,26,0.12)) drop-shadow(0 10px 16px rgba(20,23,26,0.08))",
            }}
          />
        </motion.div>
      </motion.div>

      {/* Light rays — subtle vertical shafts */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-[4] mix-blend-soft-light"
        initial={{ opacity: 0 }}
        animate={{ opacity: reduce ? 0.4 : [0.25, 0.55, 0.25] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "linear-gradient(100deg, transparent 35%, rgba(255,240,215,0.28) 48%, transparent 62%)",
          filter: "blur(8px)",
        }}
      />
    </div>
  );
}
