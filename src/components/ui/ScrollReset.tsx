"use client";

import { useEffect } from "react";

/**
 * Forces the page to open at the top on initial load — unless the URL
 * carries a hash, in which case we let the browser scroll to the
 * targeted section. Prevents the back-link to /#interventions from
 * landing visitors on the hero.
 */
export function ScrollReset() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.history.scrollRestoration = "manual";
    } catch {
      /* older browsers */
    }
    if (window.location.hash) {
      const id = window.location.hash.slice(1);
      // Browser tries to scroll on hash navigation before our page
      // mounts and silently misses the target. Retry several times
      // until the section exists and reports a non-zero offsetTop.
      let attempts = 0;
      const tick = () => {
        const el = document.getElementById(id);
        if (el && el.offsetTop > 0) {
          window.scrollTo({ top: el.offsetTop - 16, behavior: "auto" });
          return;
        }
        if (++attempts < 30) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      return;
    }
    requestAnimationFrame(() => window.scrollTo(0, 0));
  }, []);

  return null;
}
