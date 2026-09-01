/**
 * Planned closure periods (annual leave, holidays, exceptional shutdowns).
 *
 * ─────────────────────────────────────────────────────────────────────────
 * HOW TO USE
 * ─────────────────────────────────────────────────────────────────────────
 * • To ANNOUNCE a closure : fill `closure` with { start, end } (ISO dates,
 *   both days inclusive). The site auto-shows the banner + date validation
 *   + adaptive confirmation message, and auto-reverts to normal state the
 *   day after `end`. No manual revert needed.
 *
 * • To DISABLE closure UI outside any planned period : set `closure = null`.
 *
 * • For the NEXT closure : just change the two dates — everything derived
 *   (banner copy, reopening label, validation range) recomputes itself.
 * ─────────────────────────────────────────────────────────────────────────
 */

type ClosureConfig = { start: string; end: string } | null;

export const closure: ClosureConfig = {
  start: "2026-08-01", // first day the centre is closed (inclusive)
  end: "2026-08-31", // last day the centre is closed (inclusive)
};

// ─── Derived helpers ────────────────────────────────────────────────────

function toStartOfDay(iso: string): Date {
  return new Date(`${iso}T00:00:00`);
}

function toEndOfDay(iso: string): Date {
  return new Date(`${iso}T23:59:59.999`);
}

/** Format an ISO date (YYYY-MM-DD) in French: "1er août 2026", "31 août 2026". */
export function formatDateFR(iso: string): string {
  const d = new Date(`${iso}T12:00:00`);
  const day = d.getDate();
  const month = d.toLocaleDateString("fr-FR", { month: "long" });
  const year = d.getFullYear();
  const dayStr = day === 1 ? "1er" : day.toString();
  return `${dayStr} ${month} ${year}`;
}

/** ISO date (YYYY-MM-DD) of the day AFTER a closure — the reopening day. */
export function reopenISO(endIso: string): string {
  const d = new Date(`${endIso}T12:00:00`);
  d.setDate(d.getDate() + 1);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/** Human label for the day AFTER a closure (used for "réouverture le X"). */
export function reopenLabelFR(endIso: string): string {
  const d = new Date(`${endIso}T12:00:00`);
  d.setDate(d.getDate() + 1);
  const weekday = d.toLocaleDateString("fr-FR", { weekday: "long" });
  const day = d.getDate();
  const month = d.toLocaleDateString("fr-FR", { month: "long" });
  const year = d.getFullYear();
  const dayStr = day === 1 ? "1er" : day.toString();
  return `${weekday} ${dayStr} ${month} ${year}`;
}

/**
 * Snapshot of the closure state at the moment of the call.
 * `active` is true only while the closure is upcoming or ongoing —
 * it flips to false automatically the day after `end`, so every UI
 * that reads this reverts to normal without any code change.
 */
export function getClosureStatus() {
  if (!closure) {
    return { active: false as const };
  }
  const now = new Date();
  const start = toStartOfDay(closure.start);
  const end = toEndOfDay(closure.end);
  if (now > end) {
    return { active: false as const };
  }
  return {
    active: true as const,
    isDuring: now >= start && now <= end,
    isUpcoming: now < start,
    startISO: closure.start,
    endISO: closure.end,
    startLabel: formatDateFR(closure.start),
    endLabel: formatDateFR(closure.end),
    reopenISO: reopenISO(closure.end),
    reopenLabel: reopenLabelFR(closure.end),
  };
}

/** True if the given ISO date (YYYY-MM-DD) falls inside the closure window. */
export function isDateInClosure(isoDate: string): boolean {
  if (!closure || !isoDate) return false;
  const d = new Date(`${isoDate}T12:00:00`);
  return d >= toStartOfDay(closure.start) && d <= toEndOfDay(closure.end);
}
