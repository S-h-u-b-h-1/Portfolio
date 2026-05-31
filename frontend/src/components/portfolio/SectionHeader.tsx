import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  actions?: ReactNode;
  align?: "left" | "center";
  headingLevel?: "h1" | "h2";
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  actions,
  align = "left",
  headingLevel = "h2",
  className
}: SectionHeaderProps) {
  const Heading = headingLevel;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className
      )}
    >
      <div className="max-w-3xl space-y-4">
        <p className="font-mono text-sm text-accent-cyan">{eyebrow}</p>
        <Heading className="text-3xl font-semibold tracking-normal text-slate-50 light:text-slate-950 sm:text-4xl">
          {title}
        </Heading>
        {description ? (
          <p className="text-base leading-7 text-slate-300 light:text-slate-700 sm:text-lg">
            {description}
          </p>
        ) : null}
      </div>
      {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
    </motion.div>
  );
}
