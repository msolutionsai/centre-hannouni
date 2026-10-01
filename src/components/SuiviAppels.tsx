"use client";

import { useEffect } from "react";

/**
 * Google Ads conversion tracking for phone taps.
 *
 * A single delegated listener on the document covers every `tel:` link on the
 * site — header, footer, contact section, legal pages — and any link added
 * later, without each one having to remember to report itself.
 *
 * Nothing here may stand between the patient and the call: the handler never
 * calls preventDefault, and the whole reporting path sits in a try/catch so a
 * blocked or missing gtag cannot throw into the click.
 */
export function SuiviAppels() {
  useEffect(() => {
    const surClic = (e: MouseEvent) => {
      const cible = e.target as HTMLElement | null;
      if (!cible?.closest?.('a[href^="tel:"]')) return;
      try {
        const g = (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag;
        if (typeof g === "function") {
          g("event", "conversion", {
            send_to: "AW-18450792077/w8V1COqu-YwdEI39gt5E",
          });
        }
      } catch {
        // Ad blocker, offline, script never loaded — the call still goes through.
      }
    };
    document.addEventListener("click", surClic);
    return () => document.removeEventListener("click", surClic);
  }, []);

  return null;
}
