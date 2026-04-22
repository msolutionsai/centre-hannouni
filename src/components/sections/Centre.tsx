"use client";

import { Portrait } from "@/components/ui/Portrait";
import { Reveal, RevealStagger, StaggerItem } from "@/components/ui/Reveal";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { centreFeatures } from "@/lib/content";

export function Centre() {
  return (
    <section id="centre" className="relative bg-[var(--color-ink)] text-[var(--color-ivory)] py-24 md:py-40 overflow-hidden">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <Reveal>
          <div className="flex items-center gap-4 text-[var(--color-ivory)]/60">
            <span className="font-display italic text-[12px] tracking-[0.14em] text-[var(--color-cognac-soft)]">
              III · Le centre
            </span>
            <span className="h-px w-12 bg-[var(--color-ivory)]/20" />
          </div>
        </Reveal>

        <div className="mt-10 md:mt-14 grid grid-cols-12 gap-8 lg:gap-14">
          <div className="col-span-12 lg:col-span-7">
            <SplitHeading
              as="h2"
              className="display-lg text-[clamp(2rem,5.2vw,4.4rem)]"
              text="Un écrin feutré"
            />
            <div className="mt-2 flex items-end gap-4">
              <span className="hidden md:block h-[2px] w-[120px] bg-[var(--color-cognac-soft)] translate-y-[-18px]" />
              <SplitHeading
                as="h2"
                className="display-lg italic text-[clamp(2rem,5.2vw,4.4rem)] text-[var(--color-cognac-soft)]"
                text="au cœur de Guéliz."
                delay={0.08}
              />
            </div>

            <Reveal delay={0.2} className="mt-10 max-w-[58ch]">
              <p className="text-[15.5px] leading-[1.85] text-[var(--color-ivory)]/80">
                Un centre pensé pour conjuguer{" "}
                <span className="font-display italic">pratique médicale</span>,{" "}
                <span className="font-display italic">maîtrise chirurgicale</span>,{" "}
                <span className="font-display italic">exigence scientifique</span> et{" "}
                <span className="font-display italic">sens esthétique</span>. Une structure
                conforme aux normes médicales locales et internationales, équipée des
                technologies modernes de chirurgie esthétique et réparatrice — et dans
                laquelle tous les éléments de confort et de bien-être ont été intégrés
                pour accompagner nos patients avec discrétion.
              </p>
            </Reveal>
          </div>

          <div className="col-span-12 lg:col-span-5">
            <Reveal>
              <div className="relative aspect-[4/5]">
                <Portrait variant="centre" className="h-full w-full" caption="Plateau technique" />
              </div>
            </Reveal>
          </div>
        </div>

        <RevealStagger className="mt-20 md:mt-28 grid grid-cols-12 gap-x-8 gap-y-12" stagger={0.1}>
          {centreFeatures.map((f, i) => (
            <StaggerItem key={i} className="col-span-12 sm:col-span-6 lg:col-span-3">
              <div className="font-display italic text-[13px] text-[var(--color-cognac-soft)]">
                N°{String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="mt-3 font-display text-[22px] leading-[1.2] tracking-[-0.01em] text-[var(--color-ivory)]">
                {f.title}
              </h3>
              <p className="mt-4 text-[14px] leading-[1.7] text-[var(--color-ivory)]/70">{f.body}</p>
            </StaggerItem>
          ))}
        </RevealStagger>
      </div>

      {/* background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -right-40 h-[420px] w-[420px] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(201,164,122,0.18), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-40 h-[520px] w-[520px] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(74,94,84,0.22), transparent 70%)",
        }}
      />
    </section>
  );
}
