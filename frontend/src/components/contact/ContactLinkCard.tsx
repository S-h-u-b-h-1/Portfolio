import type { LucideIcon } from "lucide-react";
import { externalLinkProps } from "../../utils/links";

type ContactLinkCardProps = {
  label: string;
  value: string;
  href?: string;
  icon: LucideIcon;
  isPlaceholder?: boolean;
  download?: boolean;
};

export function ContactLinkCard({
  label,
  value,
  href,
  icon: Icon,
  isPlaceholder = false,
  download = false
}: ContactLinkCardProps) {
  const content = (
    <>
      <span className="grid size-11 shrink-0 place-items-center rounded-lg border border-accent-cyan/25 bg-accent-cyan/10 text-accent-cyan">
        <Icon aria-hidden="true" size={19} />
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-semibold text-slate-100 light:text-slate-950">{label}</span>
        <span className="mt-1 block truncate font-mono text-xs text-slate-500 light:text-slate-600">
          {isPlaceholder ? "Not added yet" : value}
        </span>
      </span>
    </>
  );

  const className =
    "group flex items-center gap-4 rounded-lg border border-border bg-white/[0.045] p-4 backdrop-blur transition hover:-translate-y-0.5 hover:border-accent-cyan/45 hover:bg-white/[0.07] light:bg-white/85 light:hover:bg-white";

  if (!href || isPlaceholder) {
    return (
      <div aria-disabled="true" aria-label={`${label}: not added yet`} className={`${className} opacity-80`}>
        {content}
      </div>
    );
  }

  return (
    <a
      href={href}
      download={download}
      aria-label={`${label}: ${value}`}
      className={className}
      {...externalLinkProps(href)}
    >
      {content}
    </a>
  );
}
