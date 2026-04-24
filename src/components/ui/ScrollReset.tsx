"use client";

import { useEffect } from "react";

/**
 * Forces the page to open at the top on initial load.
 * Prevents the browser's default scroll-restoration from landing
 * visitors mid-page (e.g. on a section they last visited).
 */
export function ScrollReset() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.history.scrollRestoration = "manual";
    } catch {
      /* older browsers */
    }
    // Defer one frame so the layout is mounted before scrolling.
    requestAnimationFrame(() => window.scrollTo(0, 0));
  }, []);

  return null;
}
