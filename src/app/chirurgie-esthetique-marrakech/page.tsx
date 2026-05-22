import Link from "next/link";
import type { Metadata } from "next";

import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { Reveal } from "@/components/ui/Reveal";
import { InterventionFaq } from "@/components/sections/InterventionFaq";
import { Arrow, Check, Star, Phone } from "@/components/ui/Icons";
import { getInterventionBySlug } from "@/lib/interventions";
import { clinic, whyUs, testimonials } from "@/lib/content";

const SITE_URL = "https://centrehannouni.com";
const PATH = "/chirurgie-esthetique-marrakech";

const PAGE_TITLE = "Chirurgie esthétique à Marrakech, Maroc — Dr Hannouni";
const PAGE_DESCRIPTION =
  "Chirurgien esthétique et maxillo-facial à Marrakech, Maroc. Dr Hannouni Youssef : rhinoplastie, lifting, blépharoplastie, botox. 20 ans d'expérience à Guéliz.";

export const metadata: Metadata = {
  title: { absolute: PAGE_TITLE },
  description: PAGE_DESCRIPTION,
  keywords: [
    "chirurgie esthétique Marrakech",
    "chirurgie esthétique Maroc",
    "chirurgien esthétique Marrakech",
    "chirurgien esthétique Maroc",
    "clinique chirurgie esthétique Marrakech",
    "meilleur chirurgien esthétique Marrakech",
    "chirurgie maxillo-faciale Marrakech",
    "médecine esthétique Marrakech",
    "Dr Hannouni",
  ],
  alternates: { canonical: PATH },
  openGraph: {
    type: "website",
    locale: "fr_MA",
    url: PATH,
    siteName: "Centre du Docteur Hannouni",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  },
};

// Interventions regroupées par famille — chaque carte pointe vers la page
// détaillée existante (maillage interne hub → spokes).
const GROUPS: { title: string; eyebrow: string; slugs: string[] }[] = [
  {
    eyebrow: "i",
    title: "Chirurgie esthétique du visage",
    slugs: ["rhinoplastie", "lifting-cervico-facial", "blepharoplastie", "genioplastie"],
  },
  {
    eyebrow: "ii",
    title: "Volumétrie & médecine esthétique",
    slugs: ["lipofilling-du-visage", "acide-hyaluronique", "botox"],
  },
  {
    eyebrow: "iii",
    title: "Chirurgie maxillo-faciale",
    slugs: ["chirurgie-orthognatique"],
  },
];

const FAQ = [
  {
    q: "Quel est le meilleur chirurgien esthétique à Marrakech ?",
    a: "Le choix d'un chirurgien dépend de votre projet, mais quelques critères objectifs guident une décision sûre : la formation, l'expérience, la spécialisation et la transparence. Le Dr Hannouni Youssef est chirurgien esthétique et maxillo-facial à Guéliz, formé à l'Université de Bordeaux, avec vingt ans d'expérience dédiés à la face. Cette double compétence — esthétique et maxillo-faciale — est rare à Marrakech.",
  },
  {
    q: "Combien coûte une chirurgie esthétique à Marrakech ?",
    a: "Le tarif dépend de l'intervention, de la technique retenue, de la durée d'anesthésie et du plan opératoire défini en consultation. Pour cette raison, chaque devis est établi individuellement lors de la première consultation, après analyse de votre demande. Il inclut le bloc opératoire, l'anesthésie et l'ensemble du suivi post-opératoire.",
  },
  {
    q: "La chirurgie esthétique au Maroc est-elle sûre ?",
    a: "Réalisée par un chirurgien qualifié dans une structure aux normes, la chirurgie esthétique au Maroc offre le même niveau de sécurité qu'en Europe. Le Centre Hannouni applique des protocoles rigoureux : bilan pré-opératoire complet, anesthésie encadrée, suivi post-opératoire planifié. Toute intervention comporte des risques, qui vous sont présentés en détail lors de la consultation.",
  },
  {
    q: "Quelle est la différence entre chirurgie esthétique et chirurgie maxillo-faciale ?",
    a: "La chirurgie esthétique vise l'harmonie et l'apparence du visage (rhinoplastie, lifting, blépharoplastie). La chirurgie maxillo-faciale traite les structures osseuses et fonctionnelles (mâchoires, occlusion, menton). Le Dr Hannouni maîtrise les deux disciplines, ce qui permet une lecture à la fois esthétique et anatomique de la face — un atout déterminant pour les corrections du profil.",
  },
  {
    q: "Le Dr Hannouni reçoit-il des patients venant de l'étranger ?",
    a: "Oui. Le Centre Hannouni accueille des patients résidant au Maroc comme à l'étranger (France, Belgique, Suisse, Canada…). Une première évaluation peut être réalisée à distance avant d'organiser la consultation et l'intervention sur place, à Marrakech. La consultation se déroule en français.",
  },
  {
    q: "Peut-on combiner plusieurs interventions lors d'un même séjour à Marrakech ?",
    a: "Dans de nombreux cas, oui. Associer par exemple une rhinoplastie et une génioplastie, ou un lifting et un lipofilling, permet d'optimiser le résultat et le temps de récupération. La faisabilité dépend de votre état de santé et de la durée d'anesthésie ; elle est évaluée en consultation.",
  },
  {
    q: "Comment se déroule une première consultation au Centre Hannouni ?",
    a: "La première consultation, d'environ 60 minutes, est un temps d'écoute et d'analyse. Le Dr Hannouni étudie votre demande, examine votre morphologie, explique les options possibles et leurs limites, puis définit un plan opératoire personnalisé. Une recommandation honnête vous est donnée, y compris lorsque l'intervention n'est pas la bonne réponse.",
  },
  {
    q: "Quelles interventions de chirurgie esthétique propose le Centre Hannouni ?",
    a: "Le centre couvre la chirurgie esthétique du visage (rhinoplastie, lifting cervico-facial, blépharoplastie, génioplastie), la volumétrie et la médecine esthétique (lipofilling, acide hyaluronique, botox) ainsi que la chirurgie maxillo-faciale (chirurgie orthognatique). Chaque intervention dispose d'une page dédiée détaillant le protocole et les suites.",
  },
  {
    q: "Où se situe le Centre du Docteur Hannouni à Marrakech ?",
    a: `Le centre se situe au cœur de Guéliz, le quartier central de Marrakech : ${clinic.address.line1}, ${clinic.address.line2}, ${clinic.address.city}. Un emplacement central, discret et facile d'accès.`,
  },
  {
    q: "Comment prendre rendez-vous avec le Dr Hannouni ?",
    a: `Vous pouvez prendre rendez-vous via le formulaire en ligne, par téléphone au ${clinic.phoneDisplay}, par WhatsApp ou par e-mail à ${clinic.email}. Notre équipe vous recontacte sous 24 à 48 heures pour fixer votre consultation.`,
  },
];

const TRUST = [
  { label: "20 ans d'expérience", detail: "dédiés à la chirurgie de la face" },
  { label: "Formation Bordeaux", detail: "Université Victor Segalen" },
  { label: "Esthétique + maxillo-facial", detail: "une double expertise rare" },
  { label: "Guéliz, Marrakech", detail: "structure aux normes internationales" },
];

export default function ChirurgieEsthetiqueMarrakech() {
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE_URL}/` },
      {
        "@type": "ListItem",
        position: 2,
        name: "Chirurgie esthétique à Marrakech",
        item: `${SITE_URL}${PATH}`,
      },
    ],
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <main className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <Nav />

      {/* Hero */}
      <section className="relative bg-[var(--color-ivory)] pt-28 md:pt-40 pb-16 md:pb-24 overflow-hidden">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10">
          {/* Breadcrumb visible */}
          <Reveal>
            <nav aria-label="Fil d'Ariane" className="flex items-center gap-2 text-[12px] tracking-[0.04em] text-[var(--color-ink-muted)]">
              <Link href="/" className="hover:text-[var(--color-ink)] transition-colors">
                Accueil
              </Link>
              <span aria-hidden>·</span>
              <span className="text-[var(--color-cognac-deep)]">Chirurgie esthétique à Marrakech</span>
            </nav>
          </Reveal>

          <Reveal delay={0.05} className="mt-8 flex items-center gap-4 text-[var(--color-ink-muted)]">
            <span className="font-display italic text-[14.5px] tracking-[0.14em] text-[var(--color-cognac-deep)]">
              Centre du Docteur Hannouni · Guéliz, Marrakech
            </span>
            <span className="h-px w-12 bg-[var(--color-line)]" />
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="mt-6 font-display font-light text-[clamp(2.1rem,6vw,5rem)] leading-[1.02] tracking-[-0.03em] text-[var(--color-ink)] max-w-[18ch]">
              Chirurgie esthétique{" "}
              <span className="italic text-[var(--color-cognac-deep)]">à Marrakech</span>
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-8 max-w-[62ch] font-display text-[clamp(1.05rem,1.4vw,1.3rem)] font-light leading-[1.55] tracking-[-0.005em] text-[var(--color-ink-soft)]">
              Le Dr Hannouni Youssef, chirurgien esthétique et maxillo-facial à Guéliz,
              consacre vingt années d&apos;expérience à la chirurgie plastique, esthétique
              et réparatrice de la face. Une exigence médicale au service d&apos;un résultat
              naturel — pour les patients de Marrakech, du Maroc et de l&apos;étranger.
            </p>
          </Reveal>

          <Reveal delay={0.3} className="mt-10 flex flex-wrap items-center gap-4">
            <Link href="/#rendez-vous" className="btn btn-primary">
              Prendre rendez-vous
              <Arrow size={14} />
            </Link>
            <a href={`tel:${clinic.phoneE164}`} className="btn btn-ghost">
              <Phone size={14} />
              {clinic.phoneDisplay}
            </a>
          </Reveal>
        </div>
      </section>

      {/* Trust bar */}
      <section className="relative bg-[var(--color-ink)] text-[var(--color-ivory)] py-12 md:py-16">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-6">
            {TRUST.map((t, i) => (
              <Reveal key={t.label} delay={i * 0.06}>
                <div className="font-display text-[clamp(1.05rem,1.6vw,1.35rem)] tracking-[-0.01em] text-[var(--color-ivory)]">
                  {t.label}
                </div>
                <div className="mt-2 text-[12.5px] leading-[1.5] text-[var(--color-ivory)]/65">
                  {t.detail}
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.3}>
            <div className="mt-10 flex items-center gap-3 border-t border-white/10 pt-8 text-[13px] text-[var(--color-ivory)]/80">
              <span className="flex text-[var(--color-cognac-soft)]" aria-hidden>
                {[0, 1, 2, 3, 4].map((n) => (
                  <Star key={n} size={14} className="mr-0.5" />
                ))}
              </span>
              <span className="tracking-[0.03em]">
                {clinic.googleRating.value} / {clinic.googleRating.bestRating} sur Google ·{" "}
                {clinic.googleRating.reviewCount} avis ·{" "}
                <a
                  href={clinic.googleBusinessUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--color-cognac-soft)] underline-offset-4 hover:underline"
                >
                  voir les avis
                </a>
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Interventions par famille */}
      <section className="relative bg-[var(--color-ivory)] pt-16 md:pt-24 pb-8 md:pb-12">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10">
          <Reveal>
            <span className="section-no">Nos interventions à Marrakech</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 font-display text-[clamp(1.6rem,3.4vw,2.6rem)] leading-[1.15] tracking-[-0.015em] text-[var(--color-ink)] max-w-[24ch]">
              Chaque geste, une{" "}
              <span className="italic text-[var(--color-cognac-deep)]">spécialité dédiée.</span>
            </h2>
          </Reveal>

          {GROUPS.map((group, gi) => (
            <div key={group.title} className="mt-14 md:mt-20">
              <Reveal>
                <div className="flex items-center gap-4 mb-8">
                  <span className="font-display italic text-[15px] text-[var(--color-cognac-deep)]">
                    {group.eyebrow}
                  </span>
                  <h3 className="font-display text-[clamp(1.2rem,2.2vw,1.7rem)] tracking-[-0.015em] text-[var(--color-ink)]">
                    {group.title} à Marrakech
                  </h3>
                  <span className="h-px flex-1 bg-[var(--color-line)]" />
                </div>
              </Reveal>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {group.slugs.map((slug, ci) => {
                  const i = getInterventionBySlug(slug);
                  if (!i) return null;
                  return (
                    <Reveal key={slug} delay={ci * 0.06}>
                      <Link
                        href={`/interventions/${i.slug}`}
                        className="group relative flex flex-col overflow-hidden bg-[var(--color-ivory-50)] border border-[var(--color-line)] hover:border-[var(--color-ink)] transition-colors h-full"
                      >
                        <div className="aspect-[16/10] overflow-hidden bg-[var(--color-stone-warm)]">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={i.image}
                            alt={`${i.name} à Marrakech — ${i.category} au Centre du Docteur Hannouni`}
                            loading={gi === 0 && ci < 2 ? undefined : "lazy"}
                            decoding="async"
                            className="h-full w-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-[1.04]"
                          />
                        </div>
                        <div className="flex flex-1 flex-col p-6">
                          <div className="eyebrow mb-3">{i.category}</div>
                          <div className="flex items-start justify-between gap-4">
                            <h4 className="font-display text-[21px] leading-[1.15] tracking-[-0.015em] text-[var(--color-ink)]">
                              {i.name}
                            </h4>
                            <span className="mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[var(--color-line)] text-[var(--color-ink)] group-hover:bg-[var(--color-ink)] group-hover:text-[var(--color-ivory)] group-hover:border-[var(--color-ink)] transition-all">
                              <Arrow size={12} />
                            </span>
                          </div>
                          <p className="mt-3 font-display text-[clamp(0.98rem,1.1vw,1.08rem)] font-light leading-[1.5] tracking-[-0.005em] text-[var(--color-ink-soft)]">
                            {i.teaser}
                          </p>
                        </div>
                      </Link>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pourquoi le Dr Hannouni */}
      <section className="relative bg-[var(--color-ivory-50)] pt-16 md:pt-24 pb-16 md:pb-24">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10">
          <Reveal>
            <span className="section-no">Pourquoi le Centre Hannouni</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 font-display text-[clamp(1.6rem,3.4vw,2.6rem)] leading-[1.15] tracking-[-0.015em] text-[var(--color-ink)] max-w-[28ch]">
              Choisir un chirurgien esthétique à Marrakech,{" "}
              <span className="italic text-[var(--color-cognac-deep)]">en confiance.</span>
            </h2>
          </Reveal>
          <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10">
            {whyUs.map((w, i) => (
              <Reveal key={w.num} delay={(i % 3) * 0.06}>
                <div className="border-t border-[var(--color-line)] pt-6">
                  <span className="font-display italic text-[15px] text-[var(--color-cognac-deep)]">
                    {w.num}
                  </span>
                  <h3 className="mt-3 font-display text-[clamp(1.2rem,1.8vw,1.45rem)] leading-[1.2] tracking-[-0.015em] text-[var(--color-ink)]">
                    {w.title}
                  </h3>
                  <p className="mt-3 font-display text-[clamp(0.98rem,1.1vw,1.08rem)] font-light leading-[1.55] tracking-[-0.005em] text-[var(--color-ink-soft)]">
                    {w.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Tarifs — sur consultation */}
      <section className="relative bg-[var(--color-ivory)] pt-16 md:pt-24 pb-16 md:pb-24">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10">
          <Reveal>
            <span className="section-no">Tarifs</span>
          </Reveal>
          <div className="mt-8 grid grid-cols-12 gap-y-8 md:gap-10 items-start">
            <Reveal delay={0.05} className="col-span-12 lg:col-span-7">
              <h2 className="font-display text-[clamp(1.6rem,3.4vw,2.4rem)] leading-[1.15] tracking-[-0.015em] text-[var(--color-ink)] max-w-[24ch]">
                Un tarif établi{" "}
                <span className="italic text-[var(--color-cognac-deep)]">en consultation.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.12} className="col-span-12 lg:col-span-5">
              <p className="font-display text-[clamp(1rem,1.2vw,1.15rem)] font-light leading-[1.6] tracking-[-0.005em] text-[var(--color-ink-soft)]">
                Le coût d&apos;une intervention dépend de la technique retenue, de la durée
                d&apos;anesthésie et du plan opératoire défini avec vous. Chaque devis est
                donc personnalisé et remis lors de la première consultation. Il comprend
                le bloc, l&apos;anesthésie et l&apos;ensemble du suivi post-opératoire.
              </p>
              <Link href="/#rendez-vous" className="btn btn-primary mt-8">
                Demander un devis en consultation
                <Arrow size={14} />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Avis */}
      <section className="relative bg-[var(--color-stone-warm)] pt-16 md:pt-24 pb-16 md:pb-24">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10">
          <Reveal>
            <div className="flex flex-wrap items-center gap-4 justify-between">
              <span className="section-no">Avis de nos patients</span>
              <div className="flex items-center gap-3 text-[13px] text-[var(--color-ink-soft)]">
                <span className="flex text-[var(--color-cognac)]" aria-hidden>
                  {[0, 1, 2, 3, 4].map((n) => (
                    <Star key={n} size={14} className="mr-0.5" />
                  ))}
                </span>
                <span className="tracking-[0.03em]">
                  {clinic.googleRating.value} / {clinic.googleRating.bestRating} ·{" "}
                  {clinic.googleRating.reviewCount} avis Google
                </span>
              </div>
            </div>
          </Reveal>
          <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            {testimonials.map((t, i) => (
              <Reveal key={i} delay={(i % 2) * 0.08}>
                <blockquote className="border-t border-[var(--color-line)] pt-6">
                  <p className="font-display text-[clamp(1.05rem,1.5vw,1.35rem)] leading-[1.4] tracking-[-0.01em] text-[var(--color-ink)]">
                    <span className="text-[var(--color-cognac-deep)] italic mr-[0.15em]">“</span>
                    {t.body}
                    <span className="text-[var(--color-cognac-deep)] italic ml-[0.15em]">”</span>
                  </p>
                  <footer className="mt-5 flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-[var(--color-ink-muted)]">
                    <span className="h-px w-10 bg-[var(--color-cognac)]" />
                    <cite className="not-italic">
                      {t.author} · {t.source}
                    </cite>
                  </footer>
                </blockquote>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <a
              href={clinic.googleBusinessUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link-lux mt-12 inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.22em] text-[var(--color-ink)]"
            >
              Voir tous les avis sur Google
              <Arrow size={12} />
            </a>
          </Reveal>
        </div>
      </section>

      {/* FAQ commerciale */}
      <section className="relative bg-[var(--color-ivory)] pt-16 md:pt-24 pb-16 md:pb-24">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10">
          <Reveal>
            <span className="section-no">Questions fréquentes</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 font-display text-[clamp(1.6rem,3.4vw,2.4rem)] leading-[1.15] tracking-[-0.015em] text-[var(--color-ink)] max-w-[30ch]">
              La chirurgie esthétique à Marrakech,{" "}
              <span className="italic text-[var(--color-cognac-deep)]">vos réponses.</span>
            </h2>
          </Reveal>
          <div className="mt-12 md:mt-16 max-w-[920px]">
            <InterventionFaq items={FAQ} />
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="relative bg-[var(--color-ink)] text-[var(--color-ivory)] pt-20 md:pt-28 pb-20 md:pb-28">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10 text-center">
          <Reveal>
            <span className="font-display italic text-[14.5px] tracking-[0.14em] text-[var(--color-cognac-soft)]">
              Centre du Docteur Hannouni · Guéliz, Marrakech
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-6 font-display text-[clamp(1.8rem,4.6vw,3.6rem)] leading-[1.05] tracking-[-0.015em]">
              Prenez rendez-vous à Marrakech
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 mx-auto max-w-[54ch] font-display text-[clamp(1rem,1.3vw,1.18rem)] font-light leading-[1.6] text-[var(--color-ivory)]/75">
              Une consultation de 60 minutes pour analyser votre demande et définir, en
              toute transparence, le plan opératoire adapté. Patients du Maroc et de
              l&apos;étranger bienvenus.
            </p>
          </Reveal>
          <Reveal delay={0.24} className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href="/#rendez-vous" className="btn btn-light">
              Prendre rendez-vous
              <Arrow size={14} />
            </Link>
            <a href={`tel:${clinic.phoneE164}`} className="btn btn-ghost !text-[var(--color-ivory)] !border-white/30">
              <Phone size={14} />
              {clinic.phoneDisplay}
            </a>
          </Reveal>
          <Reveal delay={0.3}>
            <ul className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[13px] text-[var(--color-ivory)]/70">
              <li className="flex items-center gap-2">
                <Check size={12} /> {clinic.address.line1}, {clinic.address.line2}
              </li>
              <li className="flex items-center gap-2">
                <Check size={12} /> {clinic.address.city}
              </li>
            </ul>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
