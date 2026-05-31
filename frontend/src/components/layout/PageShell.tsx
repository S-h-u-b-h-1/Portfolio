import { motion } from "framer-motion";
import type { ReactNode } from "react";

type PageShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
};

export function PageShell({ eyebrow, title, description, children }: PageShellProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="space-y-8"
    >
      <div className="max-w-3xl space-y-4">
        <p className="font-mono text-sm text-accent-cyan">{eyebrow}</p>
        <h1 className="text-4xl font-semibold tracking-normal text-slate-50 light:text-slate-950 sm:text-5xl">
          {title}
        </h1>
        <p className="text-lg leading-8 text-slate-300 light:text-slate-700">{description}</p>
      </div>
      {children}
    </motion.section>
  );
}

