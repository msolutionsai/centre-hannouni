"use client";

import { useEffect } from "react";

/**
 * Forces the page to open at the top on initial load — unless the URL
 * carries a hash, in which case we manually scroll the matching section
 * into view. CSS `scroll-behavior: smooth` is briefly disabled so the
 * programmatic jump is instant and not interrupted by concurrent layout
 * shifts (Reveal animations, font swap, image decode).
 *
 * Implementation note: we drive the polling with `setInterval` rather
 * than `requestAnimationFrame` because rAF is throttled when the tab is
 * hidden (e.g. the user came from a background restore), which can
 * silently drop the scroll-to-section.
 */
export function ScrollReset() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      window.history.scrollRestoration = "manual";
    } catch {
      /* older browsers */
    }

    const html = document.documentElement;
    const prevBehavior = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto";

    const hash = window.location.hash.slice(1);

    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
      html.style.scrollBehavior = prevBehavior;
      return;
    }

    const navOffset = 16;
    const settle = (target: HTMLElement) => {
      const rect = target.getBoundingClientRect();
      const targetY = Math.max(0, rect.top + window.scrollY - navOffset);
      window.scrollTo({ top: targetY, left: 0, behavior: "instant" as ScrollBehavior });
    };

    let attempts = 0;
    const maxAttempts = 60; // ~3s @ 50ms cadence
    let intervalId: ReturnType<typeof setInterval> | null = null;
    let verifyTimers: ReturnType<typeof setTimeout>[] = [];
    let restoreTimer: ReturnType<typeof setTimeout> | null = null;

    const cleanup = () => {
      if (intervalId !== null) clearInterval(intervalId);
      verifyTimers.forEach(clearTimeout);
      if (restoreTimer !== null) clearTimeout(restoreTimer);
    };

    const onFound = (el: HTMLElement) => {
      cleanup();
      settle(el);
      // Layout may shift after fonts/images settle. Re-measure twice
      // and correct if drift exceeds 8px.
      verifyTimers = [120, 280].map((delay) =>
        setTimeout(() => {
          const rect = el.getBoundingClientRect();
          if (Math.abs(rect.top - navOffset) > 8) settle(el);
        }, delay)
      );
      restoreTimer = setTimeout(() => {
        html.style.scrollBehavior = prevBehavior;
      }, 320);
    };

    const tryScroll = () => {
      const el = document.getElementById(hash);
      if (el) {
        onFound(el);
        return;
      }
      if (++attempts >= maxAttempts) {
        cleanup();
        html.style.scrollBehavior = prevBehavior;
      }
    };

    // First attempt synchronously — DOM is committed by the time
    // useEffect fires, so element should already be present.
    tryScroll();
    if (intervalId === null && attempts < maxAttempts) {
      intervalId = setInterval(tryScroll, 50);
    }

    return cleanup;
  }, []);

  return null;
}
