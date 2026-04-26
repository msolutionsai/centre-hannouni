"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Check, Arrow } from "@/components/ui/Icons";

const easing = [0.22, 1, 0.36, 1] as const;

// ---------- CustomSelect ---------------------------------------------------

type SelectProps = {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  required?: boolean;
};

export function CustomSelect({ id, label, value, onChange, options, required }: SelectProps) {
  const [open, setOpen] = useState(false);
  const [focusIdx, setFocusIdx] = useState(-1);
  const wrapRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const filled = value.trim() !== "";

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const currentIdx = options.findIndex((o) => o === value);
    setFocusIdx(currentIdx >= 0 ? currentIdx : 0);
  }, [open, options, value]);

  useEffect(() => {
    if (!open || focusIdx < 0 || !listRef.current) return;
    const el = listRef.current.children[focusIdx] as HTMLElement | undefined;
    el?.scrollIntoView({ block: "nearest" });
  }, [focusIdx, open]);

  const onKey = useCallback(
    (e: React.KeyboardEvent) => {
      if (!open && (e.key === "Enter" || e.key === " " || e.key === "ArrowDown")) {
        e.preventDefault();
        setOpen(true);
        return;
      }
      if (!open) return;
      if (e.key === "Escape") {
        setOpen(false);
        btnRef.current?.focus();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setFocusIdx((i) => Math.min(options.length - 1, i + 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setFocusIdx((i) => Math.max(0, i - 1));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (focusIdx >= 0) {
          onChange(options[focusIdx]);
          setOpen(false);
          btnRef.current?.focus();
        }
      }
    },
    [open, focusIdx, options, onChange]
  );

  return (
    <div ref={wrapRef} className={`field ${filled ? "filled" : ""} relative`}>
      <button
        ref={btnRef}
        id={id}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${id}-listbox`}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={onKey}
        className="w-full bg-transparent border-0 border-b border-[var(--color-line)] pt-6 pb-[0.65rem] text-[15px] text-left text-[var(--color-ink)] outline-none transition-colors focus:border-[var(--color-ink)] appearance-none cursor-pointer pr-8"
      >
        <span className={filled ? "" : "opacity-0"}>{value || "·"}</span>
      </button>
      <label htmlFor={id}>
        {label}
        {required && " *"}
      </label>
      <ChevronDown
        className={`select-caret transition-transform duration-500 ${open ? "rotate-180 text-[var(--color-ink)]" : ""}`}
        size={14}
      />

      <AnimatePresence>
        {open && (
          <motion.ul
            ref={listRef}
            id={`${id}-listbox`}
            role="listbox"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25, ease: easing }}
            className="absolute left-0 right-0 top-full z-30 mt-2 max-h-[260px] overflow-y-auto rounded-[2px] border border-[var(--color-line)] bg-[var(--color-ivory)] shadow-[0_24px_60px_-28px_rgba(20,23,26,0.35)]"
          >
            {options.map((o, i) => {
              const active = value === o;
              const focused = focusIdx === i;
              return (
                <li
                  key={o}
                  role="option"
                  aria-selected={active}
                  onMouseEnter={() => setFocusIdx(i)}
                  onClick={() => {
                    onChange(o);
                    setOpen(false);
                    btnRef.current?.focus();
                  }}
                  className={`flex cursor-pointer items-center justify-between gap-4 px-4 py-3 text-[14.5px] transition-colors ${
                    active
                      ? "bg-[var(--color-stone-warm)] text-[var(--color-cognac-deep)]"
                      : focused
                      ? "bg-[var(--color-ivory-50)] text-[var(--color-ink)]"
                      : "text-[var(--color-ink)]"
                  }`}
                >
                  <span className="font-display tracking-[-0.005em]">{o}</span>
                  {active && (
                    <span className="text-[var(--color-cognac-deep)]">
                      <Check size={12} />
                    </span>
                  )}
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

// ---------- CustomDate -----------------------------------------------------

type DateProps = {
  id: string;
  label: string;
  value: string; // ISO yyyy-mm-dd
  onChange: (v: string) => void;
  required?: boolean;
  min?: string;
  max?: string;
};

const MONTHS_FR = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre",
];
const DAYS_FR = ["L", "M", "M", "J", "V", "S", "D"];

function pad(n: number) {
  return String(n).padStart(2, "0");
}
function toISO(y: number, m: number, d: number) {
  return `${y}-${pad(m + 1)}-${pad(d)}`;
}
function fromISO(s: string): Date | null {
  if (!s) return null;
  const [y, m, d] = s.split("-").map(Number);
  if (!y || !m || !d) return null;
  return new Date(y, m - 1, d);
}
function formatDisplay(s: string) {
  const d = fromISO(s);
  if (!d) return "";
  return `${pad(d.getDate())} ${MONTHS_FR[d.getMonth()].toLowerCase()} ${d.getFullYear()}`;
}

export function CustomDate({ id, label, value, onChange, required, min, max }: DateProps) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);
  const selected = useMemo(() => fromISO(value), [value]);
  const [view, setView] = useState<{ y: number; m: number }>(() => {
    const base = selected || today;
    return { y: base.getFullYear(), m: base.getMonth() };
  });

  useEffect(() => {
    if (open) {
      const base = selected || today;
      setView({ y: base.getFullYear(), m: base.getMonth() });
    }
  }, [open, selected, today]);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  const minDate = min ? fromISO(min) : null;
  const maxDate = max ? fromISO(max) : null;

  const days = useMemo(() => {
    const first = new Date(view.y, view.m, 1);
    const startDow = (first.getDay() + 6) % 7; // Monday-first
    const daysInMonth = new Date(view.y, view.m + 1, 0).getDate();
    const prevMonthDays = new Date(view.y, view.m, 0).getDate();
    const cells: Array<{ y: number; m: number; d: number; inMonth: boolean }> = [];
    for (let i = startDow - 1; i >= 0; i--) {
      const d = prevMonthDays - i;
      const m = view.m === 0 ? 11 : view.m - 1;
      const y = view.m === 0 ? view.y - 1 : view.y;
      cells.push({ y, m, d, inMonth: false });
    }
    for (let d = 1; d <= daysInMonth; d++) cells.push({ y: view.y, m: view.m, d, inMonth: true });
    while (cells.length % 7 !== 0 || cells.length < 42) {
      const last = cells[cells.length - 1];
      const nd = last.d + 1;
      const lastInMonth = new Date(last.y, last.m + 1, 0).getDate();
      if (last.inMonth ? nd > lastInMonth : nd > new Date(last.y, last.m + 1, 0).getDate()) {
        const m = last.m === 11 ? 0 : last.m + 1;
        const y = last.m === 11 ? last.y + 1 : last.y;
        cells.push({ y, m, d: 1, inMonth: false });
      } else {
        cells.push({ y: last.y, m: last.m, d: nd, inMonth: last.inMonth });
      }
      if (cells.length >= 42) break;
    }
    return cells.slice(0, 42);
  }, [view]);

  const isDisabled = (y: number, m: number, d: number) => {
    const dt = new Date(y, m, d);
    if (minDate && dt < minDate) return true;
    if (maxDate && dt > maxDate) return true;
    return false;
  };

  const filled = value.trim() !== "";

  const changeMonth = (delta: number) => {
    setView((v) => {
      const m = v.m + delta;
      if (m < 0) return { y: v.y - 1, m: 11 };
      if (m > 11) return { y: v.y + 1, m: 0 };
      return { y: v.y, m };
    });
  };

  return (
    <div ref={wrapRef} className={`field ${filled ? "filled" : ""} relative`}>
      <button
        ref={btnRef}
        id={id}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="w-full bg-transparent border-0 border-b border-[var(--color-line)] pt-6 pb-[0.65rem] text-[15px] text-left text-[var(--color-ink)] outline-none transition-colors focus:border-[var(--color-ink)] appearance-none cursor-pointer pr-8"
      >
        <span className={filled ? "" : "opacity-0"}>{formatDisplay(value) || "·"}</span>
      </button>
      <label htmlFor={id}>
        {label}
        {required && " *"}
      </label>
      <ChevronDown
        className={`select-caret transition-transform duration-500 ${open ? "rotate-180 text-[var(--color-ink)]" : ""}`}
        size={14}
      />

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.28, ease: easing }}
            className="absolute left-0 right-0 top-full z-30 mt-2 rounded-[2px] border border-[var(--color-line)] bg-[var(--color-ivory)] shadow-[0_24px_60px_-28px_rgba(20,23,26,0.35)] p-5 min-w-[300px]"
          >
            <div className="flex items-center justify-between">
              <div className="font-display text-[15px] text-[var(--color-ink)]">
                <span>{MONTHS_FR[view.m]}</span>{" "}
                <span className="italic text-[var(--color-cognac-deep)]">{view.y}</span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => changeMonth(-1)}
                  aria-label="Mois précédent"
                  className="grid h-8 w-8 place-items-center rounded-full border border-[var(--color-line)] text-[var(--color-ink)] transition-colors hover:border-[var(--color-ink)] hover:bg-[var(--color-ink)] hover:text-[var(--color-ivory)]"
                >
                  <Arrow size={10} className="rotate-180" />
                </button>
                <button
                  type="button"
                  onClick={() => changeMonth(1)}
                  aria-label="Mois suivant"
                  className="grid h-8 w-8 place-items-center rounded-full border border-[var(--color-line)] text-[var(--color-ink)] transition-colors hover:border-[var(--color-ink)] hover:bg-[var(--color-ink)] hover:text-[var(--color-ivory)]"
                >
                  <Arrow size={10} />
                </button>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-7 gap-y-1">
              {DAYS_FR.map((d, i) => (
                <div
                  key={i}
                  className="text-center text-[10px] uppercase tracking-[0.18em] text-[var(--color-ink-muted)] pb-2"
                >
                  {d}
                </div>
              ))}
              {days.map((c, i) => {
                const iso = toISO(c.y, c.m, c.d);
                const isSelected = value === iso;
                const isToday =
                  c.y === today.getFullYear() && c.m === today.getMonth() && c.d === today.getDate();
                const disabled = isDisabled(c.y, c.m, c.d);
                return (
                  <button
                    key={i}
                    type="button"
                    disabled={disabled}
                    onClick={() => {
                      onChange(iso);
                      setOpen(false);
                      btnRef.current?.focus();
                    }}
                    className={`h-9 w-9 mx-auto rounded-full text-[13px] font-display transition-colors ${
                      isSelected
                        ? "bg-[var(--color-ink)] text-[var(--color-ivory)]"
                        : disabled
                        ? "text-[var(--color-line)] cursor-not-allowed"
                        : !c.inMonth
                        ? "text-[var(--color-ink-faint)] hover:text-[var(--color-ink)] hover:bg-[var(--color-ivory-50)]"
                        : isToday
                        ? "text-[var(--color-cognac-deep)] ring-1 ring-[var(--color-cognac)] hover:bg-[var(--color-stone-warm)]"
                        : "text-[var(--color-ink)] hover:bg-[var(--color-stone-warm)]"
                    }`}
                  >
                    {c.d}
                  </button>
                );
              })}
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-[var(--color-line)] pt-4">
              <button
                type="button"
                onClick={() => {
                  onChange("");
                  setOpen(false);
                }}
                className="text-[11px] uppercase tracking-[0.2em] text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors"
              >
                Effacer
              </button>
              <button
                type="button"
                onClick={() => {
                  const t = new Date();
                  onChange(toISO(t.getFullYear(), t.getMonth(), t.getDate()));
                  setOpen(false);
                }}
                className="text-[11px] uppercase tracking-[0.2em] text-[var(--color-cognac-deep)] hover:text-[var(--color-ink)] transition-colors"
              >
                Aujourd’hui
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
