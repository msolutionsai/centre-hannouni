"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

type Props = {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3";
  delay?: number;
};

export function SplitHeading({ text, className, as = "h2", delay = 0 }: Props) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref as unknown as React.RefObject<Element>, {
    once: true,
    amount: 0.01,
    margin: "0px 0px -10% 0px",
  });
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const shouldAnimate = mounted && (inView || reduce);

  const words = text.split(" ");
  const Tag = as as React.ElementType;

  return (
    <Tag
      ref={ref as React.Ref<never>}
      className={className}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden align-baseline"
          style={{ marginRight: i < words.length - 1 ? "0.28em" : 0 }}
        >
          <motion.span
            className="inline-block"
            initial={reduce ? { y: 0, opacity: 1 } : { y: "110%", opacity: 0 }}
            animate={shouldAnimate ? { y: 0, opacity: 1 } : undefined}
            transition={{
              duration: 1.05,
              delay: delay + i * 0.06,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
