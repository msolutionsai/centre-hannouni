"use client";

import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { Arrow, Check, ChevronDown, Clock, Mail, Phone, Pin, WhatsApp } from "@/components/ui/Icons";
import { clinic, interventionOptions, countryOptions } from "@/lib/content";

type Gender = "Madame" | "Monsieur" | "Non précisé";

type FormState = {
  gender: Gender | "";
  firstName: string;
  lastName: string;
  birthDate: string;
  email: string;
  phone: string;
  preferredDate: string;
  intervention: string;
  address: string;
  city: string;
  country: string;
  message: string;
  consent: boolean;
};

const initial: FormState = {
  gender: "",
  firstName: "",
  lastName: "",
  birthDate: "",
  email: "",
  phone: "",
  preferredDate: "",
  intervention: "",
  address: "",
  city: "",
  country: "Maroc",
  message: "",
  consent: false,
};

const steps = [
  { id: 1, title: "Identité", hint: "Présentez-vous." },
  { id: 2, title: "Demande", hint: "Votre intervention." },
  { id: 3, title: "Coordonnées", hint: "Comment vous joindre." },
] as const;

function Field({
  id,
  label,
  type = "text",
  value,
  onChange,
  required,
  autoComplete,
  inputMode,
}: {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  autoComplete?: string;
  inputMode?: "text" | "numeric" | "tel" | "email";
}) {
  // Date inputs always render a native placeholder (jj/mm/aaaa), so we force "filled"
  const filled = value.trim() !== "" || type === "date";
  return (
    <div className={`field ${filled ? "filled" : ""}`}>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        autoComplete={autoComplete}
        inputMode={inputMode}
        placeholder=" "
        onChange={(e) => onChange(e.target.value)}
        required={required}
      />
      <label htmlFor={id}>{label}{required && " *"}</label>
    </div>
  );
}

function Select({
  id,
  label,
  value,
  onChange,
  options,
  required,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  required?: boolean;
}) {
  const filled = value.trim() !== "";
  return (
    <div className={`field ${filled ? "filled" : ""}`}>
      <select
        id={id}
        name={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
      >
        <option value="" disabled hidden></option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <label htmlFor={id}>{label}{required && " *"}</label>
      <ChevronDown className="select-caret" size={14} />
    </div>
  );
}

export function Contact() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormState>(initial);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const upd = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setData((d) => ({ ...d, [k]: v }));

  const stepValid = useMemo(() => {
    if (step === 1) return data.gender !== "" && data.firstName.trim() !== "" && data.lastName.trim() !== "";
    if (step === 2) return data.intervention.trim() !== "";
    if (step === 3) return data.email.trim() !== "" && data.phone.trim() !== "" && data.consent;
    return false;
  }, [step, data]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!stepValid) return;
    setStatus("sending");
    setErrorMsg(null);
    try {
      const res = await fetch("/api/rdv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error || "Erreur réseau");
      }
      setStatus("sent");
    } catch (err: unknown) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Erreur inconnue");
    }
  }

  const progress = (step / steps.length) * 100;

  return (
    <section id="rendez-vous" className="relative bg-[var(--color-ivory)] pt-16 md:pt-24 pb-16 md:pb-24">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <Reveal>
          <div className="flex items-center gap-4 text-[var(--color-ink-muted)]">
            <span className="section-no">IX · Prise de rendez-vous</span>
            <span className="h-px w-12 bg-[var(--color-line)]" />
          </div>
        </Reveal>

        <div className="mt-10 md:mt-14 grid grid-cols-12 gap-y-8 gap-x-0 md:gap-8 lg:gap-16 items-start">
          {/* Headline + intro (order-1 mobile, left col row-1 desktop) */}
          <div className="order-1 col-span-12 lg:col-span-5 lg:row-start-1">
            <SplitHeading
              as="h2"
              className="display-lg text-[clamp(1.75rem,5vw,4rem)] text-[var(--color-ink)]"
              text="Prenez rendez-vous,"
            />
            <div className="mt-2">
              <SplitHeading
                as="h2"
                className="display-lg italic text-[clamp(1.75rem,5vw,4rem)] text-[var(--color-cognac-deep)]"
                text="en toute discrétion."
                delay={0.08}
              />
            </div>

            <Reveal delay={0.2} className="mt-8 max-w-[44ch]">
              <p className="font-display text-[clamp(1.05rem,1.3vw,1.2rem)] font-light leading-[1.55] tracking-[-0.005em] text-[var(--color-ink-soft)]">
                Laissez-nous quelques informations, notre équipe vous recontacte sous
                 24 à 48 heures avec un créneau adapté. Vos échanges sont strictement{" "}
                <span className="italic text-[var(--color-cognac-deep)]">confidentiels</span>.
              </p>
            </Reveal>
          </div>

          {/* Coordinates (order-3 mobile, left col row-2 desktop) */}
          <div className="order-3 col-span-12 lg:col-span-5 lg:row-start-2 lg:order-none">
            <Reveal delay={0.3} className="mt-4 lg:mt-0 grid grid-cols-2 gap-x-6 gap-y-6">
              <a
                href={`tel:${clinic.phoneE164}`}
                className="group col-span-2 sm:col-span-1 flex items-start gap-3 border-t border-[var(--color-line)] pt-4"
              >
                <Phone size={14} className="mt-1 text-[var(--color-cognac-deep)] shrink-0" />
                <div className="min-w-0">
                  <div className="eyebrow mb-1">Téléphone</div>
                  <div className="font-display text-[17px] leading-[1.2] text-[var(--color-ink)] group-hover:text-[var(--color-cognac-deep)] transition-colors">
                    {clinic.phoneDisplay}
                  </div>
                </div>
              </a>
              <a
                href={`mailto:${clinic.email}`}
                className="group col-span-2 sm:col-span-1 flex items-start gap-3 border-t border-[var(--color-line)] pt-4"
              >
                <Mail size={14} className="mt-1 text-[var(--color-cognac-deep)] shrink-0" />
                <div className="min-w-0">
                  <div className="eyebrow mb-1">Courriel</div>
                  <div className="font-display text-[14.5px] leading-[1.3] text-[var(--color-ink)] group-hover:text-[var(--color-cognac-deep)] transition-colors truncate">
                    {clinic.email}
                  </div>
                </div>
              </a>
              <div className="col-span-2 sm:col-span-1 flex items-start gap-3 border-t border-[var(--color-line)] pt-4">
                <Pin size={14} className="mt-1 text-[var(--color-cognac-deep)] shrink-0" />
                <div>
                  <div className="eyebrow mb-1">Adresse</div>
                  <div className="text-[13px] leading-[1.55] text-[var(--color-ink)]">
                    {clinic.address.line1}
                    <br />
                    {clinic.address.line2}
                    <br />
                    {clinic.address.city}
                  </div>
                </div>
              </div>
              <div className="col-span-2 sm:col-span-1 flex items-start gap-3 border-t border-[var(--color-line)] pt-4">
                <Clock size={14} className="mt-1 text-[var(--color-cognac-deep)] shrink-0" />
                <div>
                  <div className="eyebrow mb-1">Horaires</div>
                  <ul className="text-[13px] leading-[1.65] text-[var(--color-ink)] space-y-0.5">
                    {clinic.hours.map((h) => (
                      <li key={h.day} className="flex items-baseline justify-between gap-3">
                        <span className="font-display italic text-[var(--color-ink-muted)] truncate">
                          {h.day}
                        </span>
                        <span className="shrink-0">{h.hours}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Form card (order-2 mobile, right col row-span-2 desktop) */}
          <div className="order-2 col-span-12 lg:col-span-7 lg:col-start-6 lg:row-start-1 lg:row-span-2 lg:pl-4 lg:order-none">
            <Reveal>
              <div className="relative bg-[var(--color-ivory-50)] border border-[var(--color-line)] rounded-[2px] p-5 md:p-10 lg:p-12 overflow-hidden">
                {/* progress */}
                <div className="flex items-center justify-between mb-6 md:mb-10">
                  <div className="flex items-center gap-6">
                    {steps.map((s) => {
                      const active = s.id === step;
                      const done = s.id < step || status === "sent";
                      return (
                        <div key={s.id} className="flex items-center gap-3">
                          <span
                            className={`grid h-8 w-8 place-items-center rounded-full border text-[11px] transition-all ${
                              done
                                ? "border-[var(--color-ink)] bg-[var(--color-ink)] text-[var(--color-ivory)]"
                                : active
                                ? "border-[var(--color-ink)] text-[var(--color-ink)]"
                                : "border-[var(--color-line)] text-[var(--color-ink-muted)]"
                            }`}
                          >
                            {done ? <Check size={11} /> : s.id}
                          </span>
                          <div className="hidden sm:flex flex-col">
                            <span className="text-[11px] uppercase tracking-[0.2em] text-[var(--color-ink-muted)]">
                              0{s.id}
                            </span>
                            <span className="font-display italic text-[14px] text-[var(--color-ink)]">
                              {s.title}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <span className="text-[11px] uppercase tracking-[0.22em] text-[var(--color-ink-muted)]">
                    {status === "sent" ? "Envoyé" : `Étape ${step} / ${steps.length}`}
                  </span>
                </div>

                <div className="relative mb-6 md:mb-10 h-px w-full bg-[var(--color-line)]">
                  <motion.div
                    className="absolute left-0 top-0 h-px bg-[var(--color-ink)]"
                    initial={{ width: 0 }}
                    animate={{ width: `${status === "sent" ? 100 : progress}%` }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>

                {status === "sent" ? (
                  <div className="py-10 text-center">
                    <div className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-[var(--color-cognac)] text-[var(--color-cognac-deep)]">
                      <Check size={22} />
                    </div>
                    <h3 className="mt-6 font-display text-[28px] md:text-[32px] tracking-[-0.015em] text-[var(--color-ink)]">
                      Votre demande a bien été transmise.
                    </h3>
                    <p className="mt-4 mx-auto max-w-[46ch] text-[14.5px] leading-[1.75] text-[var(--color-ink-soft)]">
                      Le secrétariat du Centre Hannouni vous recontacte sous 24 à 48 heures
                      pour confirmer votre rendez-vous. Un courriel de confirmation vous a été envoyé.
                    </p>
                    <div className="mt-8 flex items-center justify-center gap-3">
                      <a href={`tel:${clinic.phoneE164}`} className="btn btn-ghost">
                        <Phone size={14} />
                        {clinic.phoneDisplay}
                      </a>
                      <button
                        type="button"
                        onClick={() => {
                          setData(initial);
                          setStep(1);
                          setStatus("idle");
                        }}
                        className="btn btn-primary"
                      >
                        Nouvelle demande
                        <Arrow size={14} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={submit} className="relative">
                    <AnimatePresence mode="wait">
                      {step === 1 && (
                        <motion.div
                          key="s1"
                          initial={{ opacity: 0, x: 30 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -30 }}
                          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                          className="grid grid-cols-12 gap-x-6 gap-y-5 md:gap-y-7"
                        >
                          <div className="col-span-12">
                            <div className="eyebrow mb-4">Civilité *</div>
                            <div className="flex flex-wrap gap-2">
                              {(["Madame", "Monsieur", "Non précisé"] as Gender[]).map((g) => {
                                const active = data.gender === g;
                                return (
                                  <button
                                    type="button"
                                    key={g}
                                    onClick={() => upd("gender", g)}
                                    className={`btn ${active ? "btn-primary" : "btn-ghost"}`}
                                  >
                                    {g}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                          <div className="col-span-12 md:col-span-6">
                            <Field id="firstName" label="Prénom" value={data.firstName} onChange={(v) => upd("firstName", v)} required autoComplete="given-name" />
                          </div>
                          <div className="col-span-12 md:col-span-6">
                            <Field id="lastName" label="Nom" value={data.lastName} onChange={(v) => upd("lastName", v)} required autoComplete="family-name" />
                          </div>
                          <div className="col-span-12 md:col-span-6">
                            <Field id="birthDate" label="Date de naissance" type="date" value={data.birthDate} onChange={(v) => upd("birthDate", v)} />
                          </div>
                        </motion.div>
                      )}

                      {step === 2 && (
                        <motion.div
                          key="s2"
                          initial={{ opacity: 0, x: 30 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -30 }}
                          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                          className="grid grid-cols-12 gap-x-6 gap-y-5 md:gap-y-7"
                        >
                          <div className="col-span-12">
                            <Select id="intervention" label="Intervention souhaitée" value={data.intervention} onChange={(v) => upd("intervention", v)} options={interventionOptions} required />
                          </div>
                          <div className="col-span-12 md:col-span-6">
                            <Field id="preferredDate" label="Date souhaitée" type="date" value={data.preferredDate} onChange={(v) => upd("preferredDate", v)} />
                          </div>
                          <div className="col-span-12">
                            <div className={`field ${data.message.trim() !== "" ? "filled" : ""}`}>
                              <textarea
                                id="message"
                                name="message"
                                rows={4}
                                placeholder=" "
                                value={data.message}
                                onChange={(e) => upd("message", e.target.value)}
                              />
                              <label htmlFor="message">Message — précisez vos attentes</label>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {step === 3 && (
                        <motion.div
                          key="s3"
                          initial={{ opacity: 0, x: 30 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -30 }}
                          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                          className="grid grid-cols-12 gap-x-6 gap-y-5 md:gap-y-7"
                        >
                          <div className="col-span-12 md:col-span-6">
                            <Field id="email" label="Adresse e-mail" type="email" value={data.email} onChange={(v) => upd("email", v)} required autoComplete="email" inputMode="email" />
                          </div>
                          <div className="col-span-12 md:col-span-6">
                            <Field id="phone" label="Téléphone" type="tel" value={data.phone} onChange={(v) => upd("phone", v)} required autoComplete="tel" inputMode="tel" />
                          </div>
                          <div className="col-span-12">
                            <Field id="address" label="Adresse postale (facultatif)" value={data.address} onChange={(v) => upd("address", v)} autoComplete="street-address" />
                          </div>
                          <div className="col-span-12 md:col-span-6">
                            <Field id="city" label="Ville" value={data.city} onChange={(v) => upd("city", v)} autoComplete="address-level2" />
                          </div>
                          <div className="col-span-12 md:col-span-6">
                            <Select id="country" label="Pays" value={data.country} onChange={(v) => upd("country", v)} options={countryOptions} />
                          </div>
                          <div className="col-span-12 mt-2">
                            <label className="flex items-start gap-3 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={data.consent}
                                onChange={(e) => upd("consent", e.target.checked)}
                                className="mt-1 h-4 w-4 accent-[var(--color-ink)]"
                                required
                              />
                              <span className="text-[13px] leading-[1.65] text-[var(--color-ink-soft)]">
                                J’accepte que mes informations soient utilisées par le Centre
                                Hannouni pour traiter ma demande de rendez-vous, conformément au
                                secret médical et aux règles de confidentialité.
                              </span>
                            </label>
                          </div>
                          {status === "error" && (
                            <div className="col-span-12 rounded-[2px] border border-red-300 bg-red-50/60 p-4 text-[13px] text-red-800">
                              {errorMsg ?? "Une erreur est survenue. Merci de réessayer dans un instant."}
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="mt-8 md:mt-12 flex items-center justify-between gap-4">
                      <button
                        type="button"
                        onClick={() => setStep((s) => Math.max(1, s - 1))}
                        disabled={step === 1}
                        className="btn btn-ghost disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <Arrow size={14} className="rotate-180" />
                        Précédent
                      </button>
                      {step < steps.length ? (
                        <button
                          type="button"
                          onClick={() => stepValid && setStep((s) => s + 1)}
                          disabled={!stepValid}
                          className="btn btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          Continuer
                          <Arrow size={14} />
                        </button>
                      ) : (
                        <button
                          type="submit"
                          disabled={!stepValid || status === "sending"}
                          className="btn btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          {status === "sending" ? "Envoi en cours…" : "Envoyer ma demande"}
                          <Arrow size={14} />
                        </button>
                      )}
                    </div>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* WhatsApp FAB */}
      <a
        href={`https://wa.me/${clinic.whatsapp.replace(/\D/g, "")}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contacter le Centre Hannouni sur WhatsApp"
        className="fab"
      >
        <WhatsApp size={22} />
      </a>
    </section>
  );
}
