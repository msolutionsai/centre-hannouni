"use client";

import { motion, useReducedMotion } from "framer-motion";

type Props = {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3";
  delay?: number;
  italic?: boolean;
};

/**
 * Kinetic word reveal — blur + translate Y + opacity.
 * More futuristic than a plain mask-slide. Fires on mount.
 */
export function KineticText({
  text,
  className,
  as = "h1",
  delay = 0,
  italic,
}: Props) {
  const reduce = useReducedMotion();
  const Tag = as as unknown as React.ElementType;
  const words = text.split(" ");

  return (
    <Tag className={className} aria-label={text}>
      {words.map((w, i) => (
        <span
          key={i}
          className="inline-block align-baseline"
          style={{
            marginRight: i < words.length - 1 ? "0.28em" : 0,
            paddingRight: "0.08em",
          }}
        >
          <motion.span
            className={`inline-block ${italic ? "italic" : ""}`}
            initial={
              reduce
                ? { opacity: 1, y: 0, filter: "blur(0px)" }
                : { opacity: 0, y: "60%", filter: "blur(14px)" }
            }
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              duration: 1.1,
              delay: delay + i * 0.07,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
