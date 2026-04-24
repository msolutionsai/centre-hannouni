type Props = { className?: string; size?: number; strokeWidth?: number };

const base = (size: number, className?: string) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className,
});

export const Arrow = ({ className, size = 16, strokeWidth = 1.5 }: Props) => (
  <svg {...base(size, className)} strokeWidth={strokeWidth} aria-hidden>
    <path d="M5 12h14" />
    <path d="m13 5 7 7-7 7" />
  </svg>
);

export const ArrowDiag = ({ className, size = 14, strokeWidth = 1.5 }: Props) => (
  <svg {...base(size, className)} strokeWidth={strokeWidth} aria-hidden>
    <path d="M7 17 17 7" />
    <path d="M9 7h8v8" />
  </svg>
);

export const Plus = ({ className, size = 14, strokeWidth = 1.5 }: Props) => (
  <svg {...base(size, className)} strokeWidth={strokeWidth} aria-hidden>
    <path d="M12 5v14" />
    <path d="M5 12h14" />
  </svg>
);

export const Close = ({ className, size = 14, strokeWidth = 1.5 }: Props) => (
  <svg {...base(size, className)} strokeWidth={strokeWidth} aria-hidden>
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

export const Minus = ({ className, size = 14, strokeWidth = 1.5 }: Props) => (
  <svg {...base(size, className)} strokeWidth={strokeWidth} aria-hidden>
    <path d="M5 12h14" />
  </svg>
);

export const Phone = ({ className, size = 16, strokeWidth = 1.5 }: Props) => (
  <svg {...base(size, className)} strokeWidth={strokeWidth} aria-hidden>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.8 12.8 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.8 12.8 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

export const Pin = ({ className, size = 16, strokeWidth = 1.5 }: Props) => (
  <svg {...base(size, className)} strokeWidth={strokeWidth} aria-hidden>
    <path d="M20 10c0 7-8 13-8 13S4 17 4 10a8 8 0 0 1 16 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export const Mail = ({ className, size = 16, strokeWidth = 1.5 }: Props) => (
  <svg {...base(size, className)} strokeWidth={strokeWidth} aria-hidden>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m2 7 10 6 10-6" />
  </svg>
);

export const Clock = ({ className, size = 16, strokeWidth = 1.5 }: Props) => (
  <svg {...base(size, className)} strokeWidth={strokeWidth} aria-hidden>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </svg>
);

export const Check = ({ className, size = 14, strokeWidth = 1.8 }: Props) => (
  <svg {...base(size, className)} strokeWidth={strokeWidth} aria-hidden>
    <path d="m5 12 5 5 9-11" />
  </svg>
);

export const ChevronDown = ({ className, size = 14, strokeWidth = 1.5 }: Props) => (
  <svg {...base(size, className)} strokeWidth={strokeWidth} aria-hidden>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export const Drag = ({ className, size = 18, strokeWidth = 1.5 }: Props) => (
  <svg {...base(size, className)} strokeWidth={strokeWidth} aria-hidden>
    <path d="m9 6-3 3 3 3" />
    <path d="m15 18 3-3-3-3" />
    <path d="M6 9h12" />
    <path d="M6 15h12" />
  </svg>
);

export const Star = ({ className, size = 14 }: Props) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

export const WhatsApp = ({ className, size = 22 }: Props) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91a9.86 9.86 0 0 0 1.41 5.09L2 22l5.13-1.51a9.9 9.9 0 0 0 4.91 1.27h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm5.77 14.09c-.25.69-1.45 1.32-2.02 1.4-.51.08-1.17.11-1.88-.12-.43-.14-.99-.32-1.71-.63-3.01-1.3-4.97-4.33-5.12-4.53-.15-.2-1.22-1.62-1.22-3.08 0-1.47.77-2.19 1.04-2.49.27-.3.59-.37.78-.37l.56.01c.18 0 .42-.07.66.5.24.58.83 2.01.9 2.16.07.15.12.32.02.52-.09.2-.14.32-.27.5-.14.18-.29.4-.41.53-.14.14-.28.29-.12.57.15.28.69 1.14 1.48 1.85 1.01.9 1.87 1.18 2.15 1.32.27.14.43.12.59-.07.16-.19.68-.8.86-1.07.18-.27.36-.22.61-.14.25.09 1.61.76 1.88.9.27.14.45.21.52.32.07.12.07.69-.18 1.36z"/>
  </svg>
);

export const Monogram = ({ className, size = 36 }: Props) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} aria-hidden>
    <circle cx="32" cy="32" r="31" stroke="currentColor" strokeWidth="0.75" />
    <path
      d="M19 42V22h2.5v8.5h13V22H37v20h-2.5v-9.3h-13V42H19z"
      fill="currentColor"
    />
  </svg>
);
