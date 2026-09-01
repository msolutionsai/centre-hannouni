"use client";

import { useState, useMemo, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { Arrow, Check, Clock, Mail, Phone, Pin, WhatsApp } from "@/components/ui/Icons";
import { CustomSelect, CustomDate } from "@/components/ui/FormInputs";
import { clinic, interventionOptions, countryOptions } from "@/lib/content";
import { getClosureStatus, isDateInClosure } from "@/lib/closure";

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
  error,
}: {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  autoComplete?: string;
  inputMode?: "text" | "numeric" | "tel" | "email";
  error?: string | null;
}) {
  // Date inputs always render a native placeholder (jj/mm/aaaa), so we force "filled"
  const filled = value.trim() !== "" || type === "date";
  return (
    <div className={`field ${filled ? "filled" : ""} ${error ? "has-error" : ""}`}>
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
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-err` : undefined}
      />
      <label htmlFor={id}>{label}{required && " *"}</label>
      {error && (
        <p id={`${id}-err`} className="field-error">{error}</p>
      )}
    </div>
  );
}

// ---- Validation helpers ---------------------------------------------------
function isEmailValid(s: string) {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(s.trim());
}
function isPhoneValid(s: string) {
  const digits = s.replace(/\D/g, "");
  return digits.length >= 8 && digits.length <= 15;
}
function isBirthDateValid(s: string) {
  if (!s) return false;
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
  if (!m) return false;
  // Parse at local noon: `new Date("YYYY-MM-DD")` is parsed as UTC midnight,
  // which lands *after* local midnight in any UTC+X zone (Morocco included)
  // and made today's own date fail the `<= today` check.
  const d = new Date(`${s}T12:00:00`);
  if (isNaN(d.getTime())) return false;
  const year = d.getFullYear();
  const today = new Date();
  today.setHours(23, 59, 59, 999);
  return year >= 1900 && d <= today;
}

/** Today as YYYY-MM-DD in the visitor's own timezone (not UTC). */
function todayISOLocal() {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

type Errors = Partial<Record<keyof FormState, string>>;


export function Contact() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormState>(initial);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [attempted, setAttempted] = useState<Record<number, boolean>>({});
  const [sentDuringClosure, setSentDuringClosure] = useState(false);

  // Planned-closure snapshot + today's date are resolved AFTER mount, on the
  // visitor's clock. This page is statically generated and edge-cached for
  // weeks, so anything derived from `new Date()` during render would freeze
  // at build time — which is exactly how an expired closure banner survived
  // past its end date. Client-only evaluation keeps it self-reverting.
  const [closureStatus, setClosureStatus] = useState<ReturnType<typeof getClosureStatus>>({
    active: false,
  });
  const [today, setToday] = useState("");
  useEffect(() => {
    setClosureStatus(getClosureStatus());
    setToday(todayISOLocal());
  }, []);

  const preferredDateInClosure = isDateInClosure(data.preferredDate);

  const upd = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setData((d) => ({ ...d, [k]: v }));

  const errors: Errors = useMemo(() => {
    const e: Errors = {};
    if (data.gender === "") e.gender = "Merci de sélectionner votre civilité.";
    if (!data.firstName.trim()) e.firstName = "Le prénom est requis.";
    if (!data.lastName.trim()) e.lastName = "Le nom est requis.";
    if (!data.birthDate) e.birthDate = "La date de naissance est requise.";
    else if (!isBirthDateValid(data.birthDate)) e.birthDate = "Date invalide.";
    if (!data.intervention.trim()) e.intervention = "Sélectionnez l’intervention souhaitée.";
    if (!data.email.trim()) e.email = "L’adresse e-mail est requise.";
    else if (!isEmailValid(data.email)) e.email = "Format d’e-mail invalide.";
    if (!data.phone.trim()) e.phone = "Le numéro de téléphone est requis.";
    else if (!isPhoneValid(data.phone)) e.phone = "Numéro invalide (8 chiffres minimum).";
    if (!data.consent) e.consent = "Votre consentement est requis pour traiter la demande.";
    return e;
  }, [data]);

  const step1Valid = !errors.gender && !errors.firstName && !errors.lastName && !errors.birthDate;
  const step2Valid = !errors.intervention;
  const step3Valid = !errors.email && !errors.phone && !errors.consent;
  const stepValid = step === 1 ? step1Valid : step === 2 ? step2Valid : step3Valid;

  // Show a field error only after the user attempted to advance/submit on that step
  const showErr = (key: keyof FormState, onStep: number): string | null => {
    if (!attempted[onStep]) return null;
    return errors[key] ?? null;
  };

  const tryNext = () => {
    setAttempted((a) => ({ ...a, [step]: true }));
    if (stepValid) setStep((s) => s + 1);
  };

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setAttempted((a) => ({ ...a, [step]: true }));
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
      // Capture at submit time so the "Nouvelle demande" reset doesn't
      // wipe the flag before the success view has had a chance to read it.
      setSentDuringClosure(isDateInClosure(data.preferredDate));
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
            <span className="section-no">VI · Prise de rendez-vous</span>
            <span className="h-px w-12 bg-[var(--color-line)]" />
          </div>
        </Reveal>

        {closureStatus.active && (
          <Reveal delay={0.05}>
            <div
              role="note"
              className="mt-6 md:mt-8 flex items-start gap-4 border border-[var(--color-cognac)]/40 bg-[var(--color-cognac-soft)]/15 px-5 md:px-6 py-4 md:py-5"
            >
              <span
                aria-hidden
                className="mt-[3px] h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--color-cognac-deep)]"
              />
              <div className="text-[14.5px] leading-[1.6] text-[var(--color-ink-soft)]">
                <span className="font-display italic text-[var(--color-cognac-deep)]">
                  Congés annuels —
                </span>{" "}
                le Centre du Docteur Hannouni sera fermé du{" "}
                <strong className="text-[var(--color-ink)]">{closureStatus.startLabel}</strong>{" "}
                au{" "}
                <strong className="text-[var(--color-ink)]">{closureStatus.endLabel}</strong>.
                Vous pouvez néanmoins envoyer votre demande — le secrétariat vous
                recontactera dès notre réouverture le{" "}
                <strong className="text-[var(--color-ink)]">{closureStatus.reopenLabel}</strong>.
              </div>
            </div>
          </Reveal>
        )}

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

          {/* Phone + Email row (row 2 left on desktop, after heading on mobile) */}
          <div className="order-3 col-span-12 lg:col-span-5 lg:row-start-2 lg:order-none">
            <Reveal delay={0.3} className="mt-4 lg:mt-0 grid grid-cols-12 gap-x-5 gap-y-6">
              <a
                href={`tel:${clinic.phoneE164}`}
                className="group col-span-12 sm:col-span-5 flex items-start gap-3 border-t border-[var(--color-line)] pt-4"
              >
                <Phone size={14} className="mt-1 text-[var(--color-cognac-deep)] shrink-0" />
                <div className="min-w-0">
                  <div className="eyebrow mb-1">Téléphone</div>
                  <div className="font-display text-[17px] leading-[1.2] text-[var(--color-ink)] group-hover:text-[var(--color-cognac-deep)] transition-colors whitespace-nowrap">
                    {clinic.phoneDisplay}
                  </div>
                </div>
              </a>
              <a
                href={`mailto:${clinic.email}`}
                className="group col-span-12 sm:col-span-7 flex items-start gap-3 border-t border-[var(--color-line)] pt-4"
              >
                <Mail size={14} className="mt-1 text-[var(--color-cognac-deep)] shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="eyebrow mb-1">Courriel</div>
                  <div className="font-display text-[14.5px] leading-[1.3] text-[var(--color-ink)] group-hover:text-[var(--color-cognac-deep)] transition-colors whitespace-nowrap">
                    {clinic.email}
                  </div>
                </div>
              </a>
            </Reveal>
          </div>

          {/* Address (row 3 left on desktop) */}
          <div className="order-4 col-span-12 lg:col-span-5 lg:row-start-3 lg:order-none">
            <Reveal delay={0.32} className="flex items-start gap-3 border-t border-[var(--color-line)] pt-4">
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
            </Reveal>
          </div>

          {/* Horaires (row 3 right on desktop, aligned with Address) */}
          <div className="order-5 col-span-12 lg:col-span-7 lg:col-start-6 lg:row-start-3 lg:order-none">
            <Reveal delay={0.35} className="flex items-start gap-3 border-t border-[var(--color-line)] pt-4">
              <Clock size={14} className="mt-1 text-[var(--color-cognac-deep)] shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="eyebrow mb-2">Horaires</div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-[13px] leading-[1.55] text-[var(--color-ink)]">
                  {clinic.hours.map((h) => (
                    <li key={h.day} className="flex flex-col">
                      <span className="font-display italic text-[var(--color-ink-muted)]">
                        {h.day}
                      </span>
                      <span>{h.hours}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          {/* Form card (order-2 mobile, right col row-span-2 desktop) */}
          <div className="order-2 col-span-12 lg:col-span-7 lg:col-start-6 lg:row-start-1 lg:row-span-2 lg:pl-4 lg:order-none">
            <Reveal>
              <div className="relative bg-[var(--color-ivory-50)] border border-[var(--color-line)] rounded-[2px] p-5 md:p-10 lg:p-12">
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
                      {sentDuringClosure
                        ? `Merci ${data.firstName || ""}, votre demande est bien enregistrée.`.trim()
                        : "Votre demande a bien été transmise."}
                    </h3>
                    <p className="mt-4 mx-auto max-w-[52ch] font-display text-[clamp(0.98rem,1.1vw,1.1rem)] font-light leading-[1.5] tracking-[-0.005em] text-[var(--color-ink-soft)]">
                      {sentDuringClosure && closureStatus.active ? (
                        <>
                          Notre centre est fermé pour les congés annuels du{" "}
                          <strong className="text-[var(--color-ink)]">{closureStatus.startLabel}</strong>{" "}
                          au{" "}
                          <strong className="text-[var(--color-ink)]">{closureStatus.endLabel}</strong>.
                          Le secrétariat vous recontactera dès notre réouverture le{" "}
                          <strong className="text-[var(--color-ink)]">{closureStatus.reopenLabel}</strong>{" "}
                          pour caler votre rendez-vous.
                        </>
                      ) : (
                        <>
                          Le secrétariat du Centre Hannouni vous recontacte sous 24 à 48 heures
                          pour confirmer votre rendez-vous. Un courriel de confirmation vous a été envoyé.
                          {closureStatus.active && (
                            <span className="mt-3 block italic text-[var(--color-cognac-deep)]">
                              À noter : le centre sera fermé du {closureStatus.startLabel} au {closureStatus.endLabel} (congés annuels).
                            </span>
                          )}
                        </>
                      )}
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
                          setSentDuringClosure(false);
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
                            {showErr("gender", 1) && (
                              <p className="field-error">{showErr("gender", 1)}</p>
                            )}
                          </div>
                          <div className="col-span-12 md:col-span-6">
                            <Field id="firstName" label="Prénom" value={data.firstName} onChange={(v) => upd("firstName", v)} required autoComplete="given-name" error={showErr("firstName", 1)} />
                          </div>
                          <div className="col-span-12 md:col-span-6">
                            <Field id="lastName" label="Nom" value={data.lastName} onChange={(v) => upd("lastName", v)} required autoComplete="family-name" error={showErr("lastName", 1)} />
                          </div>
                          <div className="col-span-12 md:col-span-6">
                            <CustomDate id="birthDate" label="Date de naissance" value={data.birthDate} onChange={(v) => upd("birthDate", v)} required max={today || undefined} error={showErr("birthDate", 1)} />
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
                            <CustomSelect id="intervention" label="Intervention souhaitée" value={data.intervention} onChange={(v) => upd("intervention", v)} options={interventionOptions} required error={showErr("intervention", 2)} />
                          </div>
                          <div className="col-span-12 md:col-span-6">
                            <CustomDate id="preferredDate" label="Date souhaitée" value={data.preferredDate} onChange={(v) => upd("preferredDate", v)} min={today || undefined} />
                            {preferredDateInClosure && closureStatus.active && (
                              <p className="mt-2 text-[12px] leading-[1.5] italic text-[var(--color-cognac-deep)]">
                                Cette date tombe pendant nos congés annuels ({closureStatus.startLabel} au {closureStatus.endLabel}). Vous pouvez envoyer la demande — nous vous recontacterons dès le {closureStatus.reopenLabel} pour caler un créneau.
                              </p>
                            )}
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
                              <label htmlFor="message">Message · précisez vos attentes</label>
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
                            <Field id="email" label="Adresse e-mail" type="email" value={data.email} onChange={(v) => upd("email", v)} required autoComplete="email" inputMode="email" error={showErr("email", 3)} />
                          </div>
                          <div className="col-span-12 md:col-span-6">
                            <Field id="phone" label="Téléphone" type="tel" value={data.phone} onChange={(v) => upd("phone", v)} required autoComplete="tel" inputMode="tel" error={showErr("phone", 3)} />
                          </div>
                          <div className="col-span-12">
                            <Field id="address" label="Adresse postale (facultatif)" value={data.address} onChange={(v) => upd("address", v)} autoComplete="street-address" />
                          </div>
                          <div className="col-span-12 md:col-span-6">
                            <Field id="city" label="Ville" value={data.city} onChange={(v) => upd("city", v)} autoComplete="address-level2" />
                          </div>
                          <div className="col-span-12 md:col-span-6">
                            <CustomSelect id="country" label="Pays" value={data.country} onChange={(v) => upd("country", v)} options={countryOptions} />
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
                            {showErr("consent", 3) && (
                              <p className="field-error mt-2">{showErr("consent", 3)}</p>
                            )}
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
                          onClick={tryNext}
                          className="btn btn-primary"
                        >
                          Suivant
                          <Arrow size={14} />
                        </button>
                      ) : (
                        <button
                          type="submit"
                          disabled={status === "sending"}
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
