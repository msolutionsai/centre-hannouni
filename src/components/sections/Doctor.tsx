"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Reveal, RevealStagger, StaggerItem } from "@/components/ui/Reveal";
import { SplitHeading } from "@/components/ui/SplitHeading";

const milestones = [
  { year: "1999", label: "Lauréat, Faculté de médecine de Casablanca" },
  { year: "—", label: "Doctorat en médecine — thèse en chirurgie de la main" },
  { year: "—", label: "Diplôme de l’Université Victor Segalen Bordeaux 2" },
  { year: "—", label: "Diplôme universitaire de chirurgie des lambeaux" },
  {
    year: "—",
    label:
      "Travaux de recherche en microchirurgie et chirurgie réparatrice · laboratoire d’anatomie, Université de Bordeaux",
  },
];

const easing = [0.22, 1, 0.36, 1] as const;

function ArchitectFrame({ reduce }: { reduce: boolean | null }) {
  const traceTransition = reduce
    ? { duration: 0 }
    : { duration: 1.6, ease: easing };

  return (
    <motion.svg
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Cognac frame traced on scroll-in */}
      <motion.path
        d="M 0 0 L 100 0 L 100 100 L 0 100 L 0 0"
        fill="none"
        stroke="var(--color-cognac)"
        strokeWidth="0.4"
        vectorEffect="non-scaling-stroke"
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          visible: {
            pathLength: 1,
            opacity: 0.85,
            transition: traceTransition,
          },
        }}
      />

      {/* Corner crosses — drawn after the frame */}
      {[
        { cx: 0, cy: 0 },
        { cx: 100, cy: 0 },
        { cx: 100, cy: 100 },
        { cx: 0, cy: 100 },
      ].map((c, i) => (
        <motion.g
          key={i}
          variants={{
            hidden: { opacity: 0, scale: 0.4 },
            visible: {
              opacity: 1,
              scale: 1,
              transition: {
                duration: 0.45,
                delay: 1.55 + i * 0.08,
                ease: easing,
              },
            },
          }}
          style={{ transformOrigin: `${c.cx}px ${c.cy}px` }}
        >
          <line
            x1={c.cx}
            y1={c.cy}
            x2={c.cx}
            y2={c.cy}
            stroke="var(--color-cognac)"
            strokeWidth="1.4"
            strokeLinecap="butt"
            vectorEffect="non-scaling-stroke"
            style={{
              transform: `translate(0, ${c.cy === 0 ? "-7px" : "0"})`,
              x1: c.cx,
              y1: c.cy - 7,
              x2: c.cx,
              y2: c.cy + 7,
            } as React.CSSProperties}
          />
          {/* vertical line of the cross */}
          <line
            x1={c.cx}
            x2={c.cx}
            y1={c.cy - 7}
            y2={c.cy + 7}
            stroke="var(--color-cognac)"
            strokeWidth="1.4"
            strokeLinecap="butt"
            vectorEffect="non-scaling-stroke"
          />
          {/* horizontal line of the cross */}
          <line
            y1={c.cy}
            y2={c.cy}
            x1={c.cx - 7}
            x2={c.cx + 7}
            stroke="var(--color-cognac)"
            strokeWidth="1.4"
            strokeLinecap="butt"
            vectorEffect="non-scaling-stroke"
          />
        </motion.g>
      ))}
    </motion.svg>
  );
}

export function Doctor() {
  const reduce = useReducedMotion();

  return (
    <section
      id="praticien"
      className="relative bg-[var(--color-ivory-50)] pt-16 md:pt-24 pb-16 md:pb-24 overflow-hidden"
    >
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <Reveal>
          <div className="flex items-center gap-4 text-[var(--color-ink-muted)]">
            <span className="section-no">IV · Le praticien</span>
            <span className="h-px w-12 bg-[var(--color-line)]" />
          </div>
        </Reveal>

        <div className="mt-10 md:mt-14 grid grid-cols-12 gap-y-12 gap-x-0 md:gap-8 lg:gap-14">
          {/* Portrait column */}
          <div className="col-span-12 md:col-span-5 lg:col-span-5">
            <div className="relative mx-auto w-full max-w-[320px] md:max-w-none px-3 py-4">
              {/* Architect frame + corner crosses (no labels) */}
              <ArchitectFrame reduce={reduce} />

              {/* Outer wrapper drives the entrance scale */}
              <motion.div
                className="relative aspect-[4/5] w-full rounded-[2px] overflow-hidden bg-[var(--color-stone-warm)]"
                initial={reduce ? { scale: 1 } : { scale: 1.18 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 1.5, ease: easing }}
              >
                <div className="aura hidden md:block" />

                {/* Continuous Ken Burns — wraps the image, runs forever */}
                <motion.div
                  className="absolute inset-0"
                  animate={
                    reduce
                      ? undefined
                      : { scale: [1, 1.06, 1], y: [0, -10, 0] }
                  }
                  transition={
                    reduce
                      ? undefined
                      : {
                          duration: 16,
                          ease: "easeInOut",
                          repeat: Infinity,
                          repeatType: "loop",
                        }
                  }
                >
                  {/* Image fade-in on scroll-in */}
                  <motion.img
                    src="https://pub-d3c23de249e5498eab4f6104d29b82ab.r2.dev/Centre%20Hannouni/DR%20HANNOUNI%20PROFIL.webp"
                    alt="Dr Hannouni Youssef — chirurgien esthétique & maxillo-facial"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover object-center"
                    initial={reduce ? { opacity: 1 } : { opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 1.4, ease: easing, delay: 0.15 }}
                  />
                </motion.div>

                {/* Cognac veil that dissolves diagonally on scroll-in */}
                {!reduce && (
                  <motion.div
                    aria-hidden
                    className="absolute inset-0 bg-[var(--color-cognac-deep)] mix-blend-multiply pointer-events-none"
                    initial={{
                      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                      opacity: 0.6,
                    }}
                    whileInView={{
                      clipPath:
                        "polygon(120% 0, 120% 0, -20% 100%, -20% 100%)",
                      opacity: 0,
                    }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{
                      duration: 1.6,
                      ease: easing,
                      delay: 0.1,
                    }}
                  />
                )}

                {/* Shimmer — light pass that sweeps every ~10 s */}
                {!reduce && (
                  <motion.div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 overflow-hidden"
                  >
                    <motion.div
                      className="absolute inset-y-0 -left-[40%] w-[40%] bg-[linear-gradient(120deg,transparent_30%,rgba(245,241,234,0.28)_50%,transparent_70%)] skew-x-[-14deg]"
                      animate={{ x: ["0%", "350%"] }}
                      transition={{
                        duration: 1.6,
                        repeat: Infinity,
                        repeatDelay: 9,
                        ease: [0.45, 0, 0.55, 1],
                        delay: 2.4,
                      }}
                    />
                  </motion.div>
                )}

                {/* Bottom gradient + caption */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-[35%] bg-[linear-gradient(to_top,rgba(20,23,26,0.55)_0%,rgba(20,23,26,0)_100%)]"
                />
                <div className="absolute bottom-5 left-5 right-5 z-10 flex items-center gap-3 text-[10.5px] uppercase tracking-[0.22em] text-[var(--color-ivory)]/95 font-display italic">
                  <span className="h-px w-8 bg-[var(--color-cognac-soft)]" />
                  Dr. Hannouni Youssef
                </div>
              </motion.div>
            </div>
          </div>

          {/* Biography column */}
          <div className="col-span-12 md:col-span-7 lg:col-span-7 lg:pl-10">
            <SplitHeading
              as="h2"
              className="display-lg text-[clamp(1.75rem,5vw,4rem)] text-[var(--color-ink)]"
              text="Vingt années au service"
            />
            <div className="mt-2">
              <SplitHeading
                as="h2"
                className="display-lg italic text-[clamp(1.75rem,5vw,4rem)] text-[var(--color-cognac-deep)]"
                text="de la face."
                delay={0.06}
              />
            </div>

            <Reveal delay={0.2} className="mt-8 max-w-[58ch]">
              <p className="font-display text-[clamp(1.05rem,1.3vw,1.2rem)] font-light leading-[1.55] tracking-[-0.005em] text-[var(--color-ink-soft)]">
                Le Docteur Hannouni Youssef exerce à Marrakech, dans son centre de
                chirurgie esthétique et maxillo-faciale situé au cœur de Guéliz. Fort
                d’une expérience de vingt ans au service de cet{" "}
                <span className="italic text-[var(--color-cognac-deep)]">art scientifique</span>{" "}
                qu’est la chirurgie plastique, esthétique et réparatrice de la face, il
                développe une approche où la précision médicale et le sens esthétique ne
                font qu’un.
              </p>
            </Reveal>

            <RevealStagger className="mt-12 md:mt-16" stagger={0.09}>
              <div className="eyebrow mb-6">Parcours · Diplômes</div>
              <ul className="divide-y divide-[var(--color-line)]">
                {milestones.map((m, i) => (
                  <StaggerItem key={i}>
                    <li className="grid grid-cols-12 gap-4 py-5 md:py-6">
                      <span className="col-span-3 md:col-span-2 font-display italic text-[15px] text-[var(--color-cognac-deep)]">
                        {m.year}
                      </span>
                      <span className="col-span-9 md:col-span-10 text-[14.5px] leading-[1.6] text-[var(--color-ink-soft)]">
                        {m.label}
                      </span>
                    </li>
                  </StaggerItem>
                ))}
              </ul>
            </RevealStagger>
          </div>
        </div>
      </div>
    </section>
  );
}
