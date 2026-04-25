import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { Reveal } from "@/components/ui/Reveal";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { Portrait } from "@/components/ui/Portrait";
import { Arrow, Check } from "@/components/ui/Icons";
import { InterventionResults } from "@/components/sections/InterventionResults";
import { InterventionFaq } from "@/components/sections/InterventionFaq";
import {
  interventionDetails,
  getInterventionBySlug,
  getRelated,
} from "@/lib/interventions";
import { clinic } from "@/lib/content";

export function generateStaticParams() {
  return interventionDetails.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const i = getInterventionBySlug(slug);
  if (!i) return {};
  const title = `${i.name} — ${clinic.shortName} · ${i.category}`;
  return {
    title,
    description: i.intro,
    openGraph: {
      title,
      description: i.intro,
    },
  };
}

export default async function InterventionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const intervention = getInterventionBySlug(slug);
  if (!intervention) notFound();

  const related = getRelated(intervention.related);

  return (
    <main className="relative">
      <Nav />

      {/* Hero — name + lead + portrait + meta */}
      <section className="relative bg-[var(--color-ivory)] pt-28 md:pt-36 pb-16 md:pb-24 overflow-hidden">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10">
          <Reveal>
            <Link
              href="/#interventions"
              className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors"
            >
              <Arrow size={12} className="rotate-180" />
              Toutes les interventions
            </Link>
          </Reveal>

          <Reveal delay={0.05} className="mt-10 flex items-center gap-4 text-[var(--color-ink-muted)]">
            <span className="font-display italic text-[14.5px] tracking-[0.14em] text-[var(--color-cognac-deep)]">
              {intervention.hero.eyebrow}
            </span>
            <span className="h-px w-12 bg-[var(--color-line)]" />
          </Reveal>

          <div className="mt-8 md:mt-10 grid grid-cols-12 gap-y-10 gap-x-0 md:gap-10 lg:gap-14 items-end">
            <div className="col-span-12 lg:col-span-7">
              <SplitHeading
                as="h1"
                className="display-xl text-[clamp(2rem,5.6vw,4.6rem)] text-[var(--color-ink)] leading-[1.05]"
                text={intervention.hero.headline}
              />
              <div className="mt-2">
                <SplitHeading
                  as="h1"
                  className="display-xl italic text-[clamp(2rem,5.6vw,4.6rem)] text-[var(--color-cognac-deep)] leading-[1.05]"
                  text={intervention.hero.italicSuffix}
                  delay={0.08}
                />
              </div>

              <Reveal delay={0.25} className="mt-8 max-w-[58ch]">
                <p className="font-display text-[clamp(1.05rem,1.3vw,1.2rem)] font-light leading-[1.55] tracking-[-0.005em] text-[var(--color-ink-soft)]">
                  {intervention.intro}
                </p>
              </Reveal>

              <Reveal delay={0.35} className="mt-10">
                <Link href="/#rendez-vous" className="btn btn-primary">
                  Prendre rendez-vous
                  <Arrow size={14} />
                </Link>
              </Reveal>
            </div>

            <div className="col-span-12 lg:col-span-5">
              <Reveal>
                <div className="relative mx-auto aspect-[4/5] max-w-[360px] lg:max-w-none">
                  <div className="aura hidden md:block" />
                  <Portrait
                    variant={intervention.hero.portrait}
                    className="h-full w-full"
                    caption={intervention.category}
                  />
                </div>
              </Reveal>
            </div>
          </div>

          {/* Meta strip */}
          <Reveal delay={0.4}>
            <dl className="mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-6 border-t border-[var(--color-line)] pt-10">
              {[
                { label: "Durée", value: intervention.meta.duration },
                { label: "Anesthésie", value: intervention.meta.anesthesia },
                { label: "Hospitalisation", value: intervention.meta.hospitalization },
                { label: "Reprise sociale", value: intervention.meta.socialResume },
              ].map((m) => (
                <div key={m.label}>
                  <dt className="eyebrow mb-2">{m.label}</dt>
                  <dd className="font-display text-[clamp(1.1rem,1.6vw,1.3rem)] tracking-[-0.005em] text-[var(--color-ink)]">
                    {m.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* Présentation */}
      <section className="relative bg-[var(--color-ivory-50)] pt-16 md:pt-24 pb-16 md:pb-24">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10">
          <Reveal>
            <span className="section-no">i · Présentation</span>
          </Reveal>
          <div className="mt-10 md:mt-14 grid grid-cols-12 gap-y-10 gap-x-0 md:gap-10 lg:gap-16">
            <div className="col-span-12 lg:col-span-6 space-y-10">
              {intervention.presentation.map((p, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <h2 className="font-display text-[clamp(1.4rem,2.6vw,1.9rem)] leading-[1.2] tracking-[-0.015em] text-[var(--color-ink)]">
                    {p.title}
                  </h2>
                  <p className="mt-4 font-display text-[clamp(1rem,1.2vw,1.15rem)] font-light leading-[1.6] tracking-[-0.005em] text-[var(--color-ink-soft)]">
                    {p.body}
                  </p>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.15} className="col-span-12 lg:col-span-5 lg:col-start-8">
              <div className="eyebrow mb-5">Indications</div>
              <ul className="grid grid-cols-1 gap-y-3">
                {intervention.indications.map((ind, j) => (
                  <li
                    key={j}
                    className="flex items-start gap-3 text-[14.5px] leading-[1.6] text-[var(--color-ink-soft)] border-b border-[var(--color-line)] pb-3"
                  >
                    <span className="mt-1 inline-flex h-4 w-4 items-center justify-center rounded-full border border-[var(--color-cognac)] text-[var(--color-cognac-deep)] shrink-0">
                      <Check size={10} />
                    </span>
                    {ind}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Protocole */}
      <section className="relative bg-[var(--color-ivory)] pt-16 md:pt-24 pb-16 md:pb-24">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10">
          <Reveal>
            <span className="section-no">ii · Protocole</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-8 font-display text-[clamp(1.6rem,3.4vw,2.4rem)] leading-[1.15] tracking-[-0.015em] text-[var(--color-ink)] max-w-[36ch]">
              De la consultation au suivi,{" "}
              <span className="italic text-[var(--color-cognac-deep)]">une discipline.</span>
            </h2>
          </Reveal>

          <ol className="mt-12 md:mt-16 border-t border-[var(--color-line)]">
            {intervention.protocol.map((step) => (
              <li
                key={step.step}
                className="grid grid-cols-12 gap-x-6 gap-y-4 border-b border-[var(--color-line)] py-8 md:py-10"
              >
                <div className="col-span-12 md:col-span-2">
                  <span className="font-display italic text-[15px] text-[var(--color-cognac-deep)]">
                    {step.step}
                  </span>
                </div>
                <div className="col-span-12 md:col-span-6">
                  <h3 className="font-display text-[clamp(1.2rem,2.2vw,1.6rem)] leading-[1.2] tracking-[-0.015em] text-[var(--color-ink)]">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-[14.5px] leading-[1.7] text-[var(--color-ink-soft)] max-w-[58ch]">
                    {step.body}
                  </p>
                </div>
                {step.duration && (
                  <div className="col-span-12 md:col-span-4 md:text-right">
                    <span className="eyebrow">Durée</span>
                    <div className="mt-1 font-display italic text-[14.5px] text-[var(--color-cognac-deep)]">
                      {step.duration}
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Résultats — only if cases provided */}
      {intervention.results.length > 0 && (
        <section className="relative bg-[var(--color-ivory-50)] pt-16 md:pt-24 pb-16 md:pb-24 overflow-hidden">
          <div className="mx-auto max-w-[1200px] px-6 md:px-10">
            <Reveal>
              <span className="section-no">iii · Résultats</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-8 font-display text-[clamp(1.6rem,3.4vw,2.4rem)] leading-[1.15] tracking-[-0.015em] text-[var(--color-ink)] max-w-[42ch]">
                Le résultat se reconnaît{" "}
                <span className="italic text-[var(--color-cognac-deep)]">à sa discrétion.</span>
              </h2>
            </Reveal>
            <div className="mt-12 md:mt-16">
              <InterventionResults cases={intervention.results} />
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {intervention.faq.length > 0 && (
        <section className="relative bg-[var(--color-ivory)] pt-16 md:pt-24 pb-16 md:pb-24">
          <div className="mx-auto max-w-[1200px] px-6 md:px-10">
            <Reveal>
              <span className="section-no">iv · Questions fréquentes</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-8 font-display text-[clamp(1.6rem,3.4vw,2.4rem)] leading-[1.15] tracking-[-0.015em] text-[var(--color-ink)] max-w-[42ch]">
                Vos questions,{" "}
                <span className="italic text-[var(--color-cognac-deep)]">nos réponses.</span>
              </h2>
            </Reveal>
            <div className="mt-12 md:mt-16 max-w-[920px]">
              <InterventionFaq items={intervention.faq} />
            </div>
          </div>
        </section>
      )}

      {/* Related */}
      {related.length > 0 && (
        <section className="relative bg-[var(--color-stone-warm)] pt-16 md:pt-24 pb-16 md:pb-24">
          <div className="mx-auto max-w-[1200px] px-6 md:px-10">
            <Reveal>
              <span className="section-no">v · Interventions liées</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-8 font-display text-[clamp(1.6rem,3.4vw,2.4rem)] leading-[1.15] tracking-[-0.015em] text-[var(--color-ink)] max-w-[36ch]">
                D’autres expertises{" "}
                <span className="italic text-[var(--color-cognac-deep)]">à découvrir.</span>
              </h2>
            </Reveal>
            <div className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/interventions/${r.slug}`}
                  className="group relative overflow-hidden bg-[var(--color-ivory)] border border-[var(--color-line)] hover:border-[var(--color-ink)] transition-colors"
                >
                  <div className="aspect-[4/5] overflow-hidden">
                    <Portrait
                      variant={r.hero.portrait}
                      className="h-full w-full transition-transform duration-1000 ease-out group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="p-6">
                    <div className="eyebrow mb-3">{r.category}</div>
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-display text-[22px] leading-[1.15] tracking-[-0.015em] text-[var(--color-ink)]">
                        {r.name}
                      </h3>
                      <span className="mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[var(--color-line)] text-[var(--color-ink)] group-hover:bg-[var(--color-ink)] group-hover:text-[var(--color-ivory)] group-hover:border-[var(--color-ink)] transition-all">
                        <Arrow size={12} />
                      </span>
                    </div>
                    <p className="mt-3 text-[13.5px] leading-[1.65] text-[var(--color-ink-soft)]">
                      {r.teaser}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="relative bg-[var(--color-ink)] text-[var(--color-ivory)] pt-20 md:pt-28 pb-20 md:pb-28">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10 text-center">
          <Reveal>
            <span className="font-display italic text-[14.5px] tracking-[0.14em] text-[var(--color-cognac-soft)]">
              Une intervention, une discipline
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-6 font-display text-[clamp(1.8rem,4.6vw,3.6rem)] leading-[1.05] tracking-[-0.015em]">
              Discutons de votre projet
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 mx-auto max-w-[52ch] font-display text-[clamp(1rem,1.3vw,1.18rem)] font-light leading-[1.6] text-[var(--color-ivory)]/75">
              Chaque indication mérite une analyse individualisée. Notre équipe vous
              recontacte sous 24 à 48 heures pour fixer une consultation.
            </p>
          </Reveal>
          <Reveal delay={0.24} className="mt-10 flex items-center justify-center gap-4">
            <Link href="/#rendez-vous" className="btn btn-light">
              Prendre rendez-vous
              <Arrow size={14} />
            </Link>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
