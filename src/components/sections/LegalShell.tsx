import type { ReactNode } from "react";

import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { Reveal } from "@/components/ui/Reveal";

type Props = {
  eyebrow: string;
  title: string;
  lastUpdated?: string;
  children: ReactNode;
};

/** Shared editorial shell for legal pages (mentions légales, confidentialité). */
export function LegalShell({ eyebrow, title, lastUpdated, children }: Props) {
  return (
    <main className="relative">
      <Nav />

      <section className="relative bg-[var(--color-ivory)] pt-28 md:pt-40 pb-10 md:pb-14">
        <div className="mx-auto max-w-[820px] px-6 md:px-10">
          <Reveal>
            <span className="section-no">{eyebrow}</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-6 font-display font-light text-[clamp(2rem,5vw,3.4rem)] leading-[1.05] tracking-[-0.03em] text-[var(--color-ink)]">
              {title}
            </h1>
          </Reveal>
          {lastUpdated ? (
            <Reveal delay={0.1}>
              <p className="mt-5 text-[12.5px] uppercase tracking-[0.18em] text-[var(--color-ink-muted)]">
                Dernière mise à jour : {lastUpdated}
              </p>
            </Reveal>
          ) : null}
        </div>
      </section>

      <section className="relative bg-[var(--color-ivory)] pb-20 md:pb-28">
        <div className="mx-auto max-w-[820px] px-6 md:px-10">
          <Reveal>
            <div className="legal-prose border-t border-[var(--color-line)] pt-10">
              {children}
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
