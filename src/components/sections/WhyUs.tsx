"use client";

import { Reveal, RevealStagger, StaggerItem } from "@/components/ui/Reveal";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { whyUs } from "@/lib/content";

export function WhyUs() {
  return (
    <section
      id="pourquoi"
      className="relative bg-[var(--color-ivory-50)] pt-16 md:pt-24 pb-16 md:pb-24"
    >
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <Reveal>
          <div className="flex items-center gap-4 text-[var(--color-ink-muted)]">
            <span className="section-no">VII · Pourquoi le centre</span>
            <span className="h-px w-12 bg-[var(--color-line)]" />
          </div>
        </Reveal>

        <div className="mt-10 md:mt-14 grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-8">
            <SplitHeading
              as="h2"
              className="display-lg text-[clamp(2rem,5.2vw,4.4rem)] text-[var(--color-ink)]"
              text="Six raisons de nous"
            />
            <div className="mt-2">
              <SplitHeading
                as="h2"
                className="display-lg italic text-[clamp(2rem,5.2vw,4.4rem)] text-[var(--color-cognac-deep)]"
                text="confier votre visage."
                delay={0.08}
              />
            </div>
          </div>
        </div>

        <RevealStagger className="mt-16 md:mt-20 grid grid-cols-12 gap-x-6 gap-y-12 md:gap-y-16" stagger={0.08}>
          {whyUs.map((u) => (
            <StaggerItem
              key={u.num}
              className="col-span-12 sm:col-span-6 lg:col-span-4 relative pt-8 border-t border-[var(--color-line)]"
            >
              <span className="font-display italic text-[13px] text-[var(--color-cognac-deep)]">
                {u.num}
              </span>
              <h3 className="mt-5 font-display text-[28px] leading-[1.15] tracking-[-0.015em] text-[var(--color-ink)]">
                {u.title}
              </h3>
              <p className="mt-4 font-display text-[clamp(0.98rem,1.15vw,1.1rem)] font-light leading-[1.55] tracking-[-0.005em] text-[var(--color-ink-soft)] max-w-[44ch]">
                {u.body}
              </p>
            </StaggerItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
