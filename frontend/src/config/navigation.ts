import {
  Bot,
  BriefcaseBusiness,
  Code2,
  Home,
  Mail,
  Sparkles,
  UserRound
} from "lucide-react";
import type { NavigationItem } from "../types/navigation";

export const navigationItems: NavigationItem[] = [
  { label: "Home", path: "/", shortcut: "g h", icon: Home },
  { label: "About", path: "/about", icon: UserRound },
  { label: "Projects", path: "/projects", shortcut: "g p", icon: Code2 },
  { label: "Experience", path: "/experience", icon: BriefcaseBusiness },
  { label: "Skills", path: "/skills", icon: Sparkles },
  { label: "Contact", path: "/contact", shortcut: "g c", icon: Mail }
];
