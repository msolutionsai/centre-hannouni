"use client";

import { clinic, nav } from "@/lib/content";
import { Monogram } from "@/components/ui/Icons";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative bg-[var(--color-ink)] text-[var(--color-ivory)] pt-20 md:pt-28 pb-10">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <div className="grid grid-cols-12 gap-8 lg:gap-12 border-b border-white/10 pb-16">
          <div className="col-span-12 md:col-span-5">
            <div className="flex items-center gap-3">
              <Monogram size={42} className="text-[var(--color-ivory)]" />
              <div>
                <div className="font-display text-[20px]">
                  Centre <span className="italic text-[var(--color-cognac-soft)]">Hannouni</span>
                </div>
                <div className="text-[10.5px] uppercase tracking-[0.28em] text-[var(--color-ivory)]/60">
                  Chirurgie esthétique & maxillo-faciale
                </div>
              </div>
            </div>
            <p className="mt-8 max-w-[44ch] text-[14.5px] leading-[1.75] text-[var(--color-ivory)]/70 font-display italic">
              « La chirurgie esthétique, un art scientifique. »
            </p>
          </div>

          <div className="col-span-6 md:col-span-3">
            <div className="eyebrow !text-[var(--color-cognac-soft)] mb-5">Navigation</div>
            <ul className="space-y-3">
              {nav.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className="text-[14px] text-[var(--color-ivory)]/85 hover:text-[var(--color-cognac-soft)] transition-colors"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-6 md:col-span-4">
            <div className="eyebrow !text-[var(--color-cognac-soft)] mb-5">Le centre</div>
            <address className="not-italic text-[14px] leading-[1.75] text-[var(--color-ivory)]/85">
              {clinic.address.line1}
              <br />
              {clinic.address.line2}
              <br />
              {clinic.address.city}, {clinic.address.country}
            </address>
            <div className="mt-6 flex flex-col gap-1.5 text-[14px] text-[var(--color-ivory)]/85">
              <a href={`tel:${clinic.phoneE164}`} className="link-lux w-fit">
                {clinic.phoneDisplay}
              </a>
              <a href={`mailto:${clinic.email}`} className="link-lux w-fit">
                {clinic.email}
              </a>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${clinic.mapsQuery}`}
                target="_blank"
                rel="noopener noreferrer"
                className="link-lux w-fit text-[var(--color-cognac-soft)]"
              >
                Itinéraire Google Maps
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col-reverse md:flex-row items-start md:items-center justify-between gap-6 text-[11px] uppercase tracking-[0.2em] text-[var(--color-ivory)]/55">
          <span>© {year} Centre du Docteur Hannouni · Marrakech — Tous droits réservés</span>
          <div className="flex items-center gap-6">
            <span>Mentions légales</span>
            <span>Politique de confidentialité</span>
            <span>Réalisation soignée</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
