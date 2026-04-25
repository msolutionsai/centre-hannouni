"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Portrait } from "@/components/ui/Portrait";
import { Drag } from "@/components/ui/Icons";
import type { ComponentProps } from "react";

type Variant = ComponentProps<typeof Portrait>["variant"];

type Props = {
  before: Variant;
  after: Variant;
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
      className={`ba-wrap aspect-[4/5] md:aspect-[1/1] cursor-col-resize ${className ?? ""}`}
      onMouseDown={(e) => {
        dragging.current = true;
        setFromEvent(e.clientX);
      }}
      onTouchStart={(e) => {
        dragging.current = true;
        setFromEvent(e.touches[0].clientX);
      }}
    >
      <Portrait variant={before} className="absolute inset-0 h-full w-full" />
      <div className="ba-label left-4 bg-black/60 text-white">Avant</div>
      <div className="ba-after" style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
        <Portrait variant={after} className="absolute inset-0 h-full w-full" />
        <div className="ba-label right-4 bg-white/80 !text-[var(--color-ink)]">Après</div>
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
