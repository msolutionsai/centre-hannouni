"use client";

import { useEffect, useRef } from "react";

/**
 * Generative ambient mesh — cinematic flowing light field.
 * Warm cognac + ivory particles drift with a subtle mouse parallax.
 * Pure canvas 2D, <60 lines, runs at 60fps on modern laptops.
 */
export function HeroCanvas({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const mouse = useRef({ x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 });

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true })!;
    let raf = 0;
    let w = 0;
    let h = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const setSize = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.scale(dpr, dpr);
    };
    setSize();

    // Floating orbs — slow drifting radial gradients
    const orbs = Array.from({ length: 5 }).map((_, i) => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.35 + Math.random() * 0.25,
      vx: (Math.random() - 0.5) * 0.00018,
      vy: (Math.random() - 0.5) * 0.00018,
      hue: i === 0 ? "165,122,78" : i === 1 ? "201,164,122" : i === 2 ? "74,94,84" : "215,205,188",
      a: 0.14 + Math.random() * 0.12,
    }));

    const onMouse = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.current.tx = (e.clientX - r.left) / r.width;
      mouse.current.ty = (e.clientY - r.top) / r.height;
    };
    const onResize = () => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      setSize();
    };
    window.addEventListener("mousemove", onMouse);
    window.addEventListener("resize", onResize);

    const tick = () => {
      // Smooth mouse follow
      mouse.current.x += (mouse.current.tx - mouse.current.x) * 0.04;
      mouse.current.y += (mouse.current.ty - mouse.current.y) * 0.04;
      const mx = (mouse.current.x - 0.5) * 0.08;
      const my = (mouse.current.y - 0.5) * 0.08;

      ctx.clearRect(0, 0, w, h);

      // Base gradient wash
      const g = ctx.createLinearGradient(0, 0, 0, h);
      g.addColorStop(0, "rgba(245, 241, 234, 1)");
      g.addColorStop(1, "rgba(237, 231, 219, 1)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      for (const o of orbs) {
        o.x += o.vx;
        o.y += o.vy;
        if (o.x < -0.1 || o.x > 1.1) o.vx *= -1;
        if (o.y < -0.1 || o.y > 1.1) o.vy *= -1;

        const cx = (o.x + mx * (o.r * 0.8)) * w;
        const cy = (o.y + my * (o.r * 0.8)) * h;
        const rr = o.r * Math.max(w, h);
        const rg = ctx.createRadialGradient(cx, cy, 0, cx, cy, rr);
        rg.addColorStop(0, `rgba(${o.hue},${o.a})`);
        rg.addColorStop(1, "rgba(245,241,234,0)");
        ctx.fillStyle = rg;
        ctx.fillRect(0, 0, w, h);
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden />;
}
