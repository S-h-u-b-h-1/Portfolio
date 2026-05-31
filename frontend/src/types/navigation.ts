import type { LucideIcon } from "lucide-react";

export type NavigationItem = {
  label: string;
  path: string;
  shortcut?: string;
  icon: LucideIcon;
};

