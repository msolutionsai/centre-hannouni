"use client";

import { useEffect } from "react";

/**
 * Decides where the home page lands when it mounts.
 *
 * Priority:
 *   1. sessionStorage["scrollTo"] — set by the back-link from a slug
 *      page. Most reliable across browsers and ignores any URL state.
 *   2. URL hash (e.g. /#temoignages) — supports shared/bookmarked links.
 *   3. Otherwise scroll to the top (Hero).
 *
 * Once a target is scrolled to, the URL hash is cleared via
 * history.replaceState so a refresh always lands on the Hero rather
 * than re-scrolling to the section.
 *
 * Polling uses setInterval (not requestAnimationFrame) because rAF is
 * throttled when the tab is hidden, which silently dropped the scroll
 * for users coming back from a backgrounded tab.
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

    let target: string | null = null;
    try {
      target = sessionStorage.getItem("scrollTo");
      if (target) sessionStorage.removeItem("scrollTo");
    } catch {
      /* private mode or storage disabled */
    }
    if (!target) {
      const hash = window.location.hash.slice(1);
      if (hash) target = hash;
    }

    if (!target) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
      html.style.scrollBehavior = prevBehavior;
      return;
    }

    const navOffset = 16;
    const settle = (el: HTMLElement) => {
      const rect = el.getBoundingClientRect();
      const targetY = Math.max(0, rect.top + window.scrollY - navOffset);
      window.scrollTo({ top: targetY, left: 0, behavior: "instant" as ScrollBehavior });
    };

    let attempts = 0;
    const maxAttempts = 60;
    let intervalId: ReturnType<typeof setInterval> | null = null;
    let verifyTimers: ReturnType<typeof setTimeout>[] = [];
    let restoreTimer: ReturnType<typeof setTimeout> | null = null;

    const cleanup = () => {
      if (intervalId !== null) clearInterval(intervalId);
      verifyTimers.forEach(clearTimeout);
      if (restoreTimer !== null) clearTimeout(restoreTimer);
    };

    const cleanUrl = () => {
      if (!window.location.hash) return;
      try {
        window.history.replaceState(null, "", window.location.pathname + window.location.search);
      } catch {
        /* ignore */
      }
    };

    const onFound = (el: HTMLElement) => {
      cleanup();
      settle(el);
      verifyTimers = [120, 280].map((delay) =>
        setTimeout(() => {
          const rect = el.getBoundingClientRect();
          if (Math.abs(rect.top - navOffset) > 8) settle(el);
        }, delay)
      );
      restoreTimer = setTimeout(() => {
        html.style.scrollBehavior = prevBehavior;
        cleanUrl();
      }, 360);
    };

    const tryScroll = () => {
      const el = target ? document.getElementById(target) : null;
      if (el) {
        onFound(el);
        return;
      }
      if (++attempts >= maxAttempts) {
        cleanup();
        html.style.scrollBehavior = prevBehavior;
        cleanUrl();
      }
    };

    tryScroll();
    if (intervalId === null && attempts < maxAttempts) {
      intervalId = setInterval(tryScroll, 50);
    }

    return cleanup;
  }, []);

  return null;
}
