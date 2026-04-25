"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Drag } from "@/components/ui/Icons";

type Props = {
  before: string;
  after: string;
  className?: string;
};

export function BeforeAfterSlider({ before, after, className }: Props) {
  const [pos, setPos] = useState(50);
  const wrapRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const setFromEvent = useCallback((clientX: number) => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(2, Math.min(98, p)));
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!dragging.current) return;
      const x = "touches" in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      setFromEvent(x);
    };
    const onUp = () => (dragging.current = false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onMove);
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
    };
  }, [setFromEvent]);

  return (
    <div
      ref={wrapRef}
      className={`ba-wrap aspect-[4/5] cursor-col-resize bg-[var(--color-stone-warm)] rounded-[2px] ring-1 ring-[var(--color-line)] ${className ?? ""}`}
      onMouseDown={(e) => {
        dragging.current = true;
        setFromEvent(e.clientX);
      }}
      onTouchStart={(e) => {
        dragging.current = true;
        setFromEvent(e.touches[0].clientX);
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={before}
        alt="Avant"
        decoding="async"
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover object-center select-none"
      />
      <div className="ba-label left-4 bg-black/65 text-white backdrop-blur-sm">Avant</div>
      <div className="ba-after" style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={after}
          alt="Après"
          decoding="async"
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover object-center select-none"
        />
        <div className="ba-label right-4 bg-white/85 !text-[var(--color-ink)] backdrop-blur-sm">
          Après
        </div>
      </div>
      <div className="ba-handle" style={{ left: `${pos}%` }} />
      <motion.div
        className="ba-knob"
        style={{ left: `${pos}%` }}
        animate={{ scale: dragging.current ? 1.1 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <Drag size={18} />
      </motion.div>
    </div>
  );
}
