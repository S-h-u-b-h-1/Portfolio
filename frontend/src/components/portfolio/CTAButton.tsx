import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "../../utils/cn";

type CTAButtonProps = {
  children: ReactNode;
  icon?: LucideIcon;
  variant?: "primary" | "secondary" | "quiet";
  className?: string;
} & ({ to: string; href?: never } | { href: string; to?: never });

const variantClasses = {
  primary:
    "border-accent-cyan bg-accent-cyan text-slate-950 shadow-[0_0_28px_rgba(34,211,238,0.28)] hover:bg-cyan-200",
  secondary:
    "border-white/15 bg-white/[0.06] text-slate-50 hover:border-accent-cyan/60 hover:bg-accent-cyan/10 hover:text-accent-cyan light:border-slate-950/10 light:bg-white/80 light:text-slate-950",
  quiet:
    "border-transparent bg-transparent text-slate-300 hover:bg-white/[0.06] hover:text-slate-50 light:text-slate-700 light:hover:bg-slate-950/5 light:hover:text-slate-950"
};

export function CTAButton({
  children,
  icon: Icon,
  to,
  href,
  variant = "secondary",
  className
}: CTAButtonProps) {
  const classes = cn(
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-cyan",
    variantClasses[variant],
    className
  );

  if (to) {
    return (
      <Link to={to} className={classes}>
        <span>{children}</span>
        {Icon ? <Icon aria-hidden="true" size={17} strokeWidth={2.2} /> : null}
      </Link>
    );
  }

  return (
    <a href={href} className={classes}>
      <span>{children}</span>
      {Icon ? <Icon aria-hidden="true" size={17} strokeWidth={2.2} /> : null}
    </a>
  );
}
