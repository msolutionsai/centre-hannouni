"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal, RevealStagger, StaggerItem } from "@/components/ui/Reveal";
import { SplitHeading } from "@/components/ui/SplitHeading";

const Accent = ({ children }: { children: ReactNode }) => (
  <span className="italic text-[var(--color-cognac-deep)]">{children}</span>
);

const milestones: { year: string; label: ReactNode }[] = [
  {
    year: "1999",
    label: (
      <>
        Lauréat de la <Accent>Faculté de médecine de Casablanca</Accent>
      </>
    ),
  },
  {
    year: "2000 à 2003",
    label: (
      <>
        Internat au <Accent>CHU de Casablanca</Accent>
      </>
    ),
  },
  {
    year: "2004",
    label: (
      <>
        <Accent>Thèse de doctorat en médecine</Accent>, consacrée à la chirurgie de
        la main
      </>
    ),
  },
  {
    year: "2007 à 2008",
    label: (
      <>
        Diplômé de l’<Accent>Université de Bordeaux</Accent>
      </>
    ),
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

        <div className="mt-10 md:mt-14 grid grid-cols-12 gap-y-10 md:gap-y-12 gap-x-0 md:gap-x-8 lg:gap-x-14 items-start">
          {/* 1 · Heading — mobile order-1, desktop right col row 1 */}
          <div className="order-1 col-span-12 lg:col-span-7 lg:col-start-6 lg:row-start-1 lg:order-none">
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
          </div>

          {/* 2 · Portrait — mobile order-2, desktop left col rows 1-2 */}
          <div className="order-2 col-span-12 lg:col-span-5 lg:col-start-1 lg:row-start-1 lg:row-span-2 lg:order-none">
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
                    alt="Dr Hannouni Youssef · chirurgien esthétique & maxillo-facial"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover object-center"
                    initial={reduce ? { opacity: 1 } : { opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 1.4, ease: easing, delay: 0.15 }}
                  />
                </motion.div>

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

          {/* 3 · Intro paragraph — mobile order-3, desktop right col row 2 */}
          <div className="order-3 col-span-12 lg:col-span-7 lg:col-start-6 lg:row-start-2 lg:order-none">
            <Reveal delay={0.2} className="max-w-[58ch]">
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
          </div>

          {/* 4 · Parcours timeline — mobile order-4, desktop right col row 3 */}
          <div className="order-4 col-span-12 lg:col-span-7 lg:col-start-6 lg:row-start-3 lg:order-none">
            <RevealStagger stagger={0.09}>
              <div className="eyebrow mb-6">Parcours · Diplômes & Affiliations</div>
              <ul className="divide-y divide-[var(--color-line)]">
                {milestones.map((m, i) => (
                  <StaggerItem key={i}>
                    <li className="grid grid-cols-12 gap-4 py-5 md:py-6">
                      <span className="col-span-4 md:col-span-3 font-display italic text-[15px] text-[var(--color-cognac-deep)] whitespace-nowrap">
                        {m.year}
                      </span>
                      <span className="col-span-8 md:col-span-9 font-display text-[clamp(0.98rem,1.1vw,1.1rem)] font-light leading-[1.6] tracking-[-0.005em] text-[var(--color-ink-soft)]">
                        {m.label}
                      </span>
                    </li>
                  </StaggerItem>
                ))}
              </ul>
            </RevealStagger>
          </div>

          {/* 5 · Affiliations — mobile order-5, desktop left col row 3 */}
          <div className="order-5 col-span-12 lg:col-span-5 lg:col-start-1 lg:row-start-3 lg:order-none">
            <RevealStagger stagger={0.09}>
              <div className="eyebrow mb-3">Au-delà des diplômes</div>
              <p className="font-display italic text-[14.5px] leading-[1.5] text-[var(--color-cognac-deep)] mb-5 max-w-[40ch]">
                Une formation enrichie auprès de référents internationaux.
              </p>
              <ul className="divide-y divide-[var(--color-line)] border-t border-[var(--color-line)]">
                {[
                  (
                    <>
                      Attaché au service de chirurgie esthétique et
                      maxillo-faciale de l’hôpital{" "}
                      <Accent>Pellegrin</Accent> · France
                    </>
                  ),
                  (
                    <>
                      Compagnonnage auprès du{" "}
                      <Accent>Professeur P. Caix</Accent>, sommité mondiale en
                      anatomie, dissection et recherche
                    </>
                  ),
                  (
                    <>
                      Membre de la{" "}
                      <Accent>
                        Société Marocaine de Chirurgie Esthétique et
                        Maxillo-Faciale
                      </Accent>
                    </>
                  ),
                ].map((item, i) => (
                  <StaggerItem key={i}>
                    <li className="flex items-start gap-3 py-4 md:py-5">
                      <span className="mt-2 h-1 w-1 rounded-full bg-[var(--color-cognac)] shrink-0" />
                      <span className="font-display text-[clamp(0.98rem,1.1vw,1.1rem)] font-light leading-[1.55] tracking-[-0.005em] text-[var(--color-ink-soft)]">
                        {item}
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
