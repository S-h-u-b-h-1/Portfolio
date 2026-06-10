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
      <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-accent-cyan/10 text-accent-cyan">
        <Icon aria-hidden="true" size={20} />
      </span>
      <span className="min-w-0">
        <span className="block text-base font-bold text-slate-900 dark:text-slate-100">{label}</span>
        <span className="mt-1 block truncate text-sm text-slate-600 dark:text-slate-400">
          {isPlaceholder ? "Not added yet" : value}
        </span>
      </span>
    </>
  );

  const className =
    "group flex items-center gap-4 rounded-2xl border border-black/5 bg-white/80 p-4 backdrop-blur-md transition hover:-translate-y-1 hover:border-accent-cyan/40 hover:shadow-lg dark:border-white/10 dark:bg-white/5 dark:hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]";

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
