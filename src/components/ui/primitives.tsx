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
