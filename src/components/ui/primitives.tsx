import Link from "next/link";
import type { ReactNode } from "react";

export function Eyebrow({
  children,
  className = "",
  dot = false,
}: {
  children: ReactNode;
  className?: string;
  dot?: boolean;
}) {
  return (
    <span className={`u-eyebrow text-bone-500 inline-flex items-center gap-2.5 ${className}`}>
      {dot && <span className="bg-volt-500 u-live-dot size-1.5 rounded-full" />}
      {children}
    </span>
  );
}

/** Series/category chip — mirrors the pill in the top-left of every Genesis post. */
export function Pill({ children, tone = "muted" }: { children: ReactNode; tone?: "muted" | "brand" }) {
  const tones = {
    muted: "border-white/12 bg-white/[0.04] text-bone-400",
    brand: "border-volt-500/40 bg-volt-500/12 text-volt-400",
  };
  return (
    <span
      className={`u-eyebrow inline-flex items-center rounded-full border px-2.5 py-1 text-[0.625rem] ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  accent,
  lead,
  action,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  lead?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        <Eyebrow dot>{eyebrow}</Eyebrow>
        <h2 className="u-display text-bone-50 mt-5 text-[clamp(2rem,4.6vw,3.4rem)]">
          {title}
          {accent && <span className="u-accent text-volt-400 font-normal"> {accent}</span>}
        </h2>
        {lead && <p className="text-bone-400 mt-5 max-w-xl text-[0.975rem] leading-relaxed">{lead}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline" | "ghost";
  className?: string;
};

export function ButtonLink({ href, children, variant = "solid", className = "" }: ButtonProps) {
  const base =
    "group relative inline-flex items-center justify-center gap-2.5 rounded-full px-6 py-3 text-sm font-semibold tracking-tight transition-all duration-300 overflow-hidden";

  const variants = {
    solid:
      "bg-volt-500 text-white hover:bg-volt-400 shadow-[0_0_0_1px_rgba(0,95,247,0.5),0_14px_40px_-14px_rgba(0,95,247,0.85)] hover:shadow-[0_0_0_1px_rgba(0,95,247,0.7),0_18px_50px_-12px_rgba(0,95,247,1)]",
    outline:
      "border border-white/14 text-bone-50 hover:border-white/28 hover:bg-white/[0.05]",
    ghost: "text-bone-300 hover:text-bone-50",
  };

  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {variant === "solid" && (
        <span className="pointer-events-none absolute inset-0 -translate-x-[120%] bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-[320%]" />
      )}
      <span className="relative">{children}</span>
      <Arrow className="relative transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  );
}

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden className={className}>
      <path
        d="M2.5 7h9m0 0L7.75 3.25M11.5 7l-3.75 3.75"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Ambient blue bloom. Purely decorative, never behind text that needs contrast. */
export function Bloom({
  className = "",
  opacity = 0.5,
}: {
  className?: string;
  opacity?: number;
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute rounded-full blur-[130px] ${className}`}
      style={{
        background: "radial-gradient(circle, rgba(0,95,247,0.55) 0%, rgba(0,95,247,0) 70%)",
        opacity,
      }}
    />
  );
}

export function Divider({ className = "" }: { className?: string }) {
  return <div className={`u-rule w-full ${className}`} />;
}

export function StatBlock({
  value,
  label,
  note,
}: {
  value: string;
  label: string;
  note?: string;
}) {
  return (
    <div className="border-t border-white/10 pt-5">
      <div className="u-num text-bone-50 text-[clamp(1.6rem,3vw,2.35rem)] leading-none font-medium">
        {value}
      </div>
      <div className="text-bone-200 mt-2.5 text-sm font-medium">{label}</div>
      {note && <div className="text-bone-500 mt-1 text-xs">{note}</div>}
    </div>
  );
}

/** WhatsApp mark, one path so it inherits colour and size from the class. */
export function WhatsAppGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.23 8.23 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23a8.2 8.2 0 0 1 5.83 2.42 8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.69 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.15.16-.29.18-.54.06-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.44.13-.15.17-.25.25-.42.08-.16.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.47c-.16 0-.43.06-.65.31-.22.25-.86.84-.86 2.05s.88 2.38 1 2.54c.13.17 1.73 2.64 4.19 3.7.58.26 1.04.41 1.4.52.59.19 1.13.16 1.55.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.28Z" />
    </svg>
  );
}
