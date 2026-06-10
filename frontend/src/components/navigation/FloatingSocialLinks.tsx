import { FileText, Github, Linkedin, Mail } from "lucide-react";
import { frontendEnv } from "../../config/env";
import { profile } from "../../data";

export function FloatingSocialLinks() {
  const { linkedin, github, email } = profile.contact;
  const resumeUrl = frontendEnv.resumeUrl;

  const links = [
    {
      label: "LinkedIn",
      href: linkedin,
      icon: Linkedin
    },
    {
      label: "GitHub",
      href: github,
      icon: Github
    },
    {
      label: "Email",
      href: `mailto:${email}`,
      icon: Mail
    },
    {
      label: "Resume",
      href: resumeUrl,
      icon: FileText
    }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {links.map((link) => {
        const Icon = link.icon;
        return (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            className="grid size-12 place-items-center rounded-full border border-black/5 bg-white/80 shadow-lg backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white hover:text-accent-cyan hover:shadow-xl dark:border-white/10 dark:bg-[#0f1115]/80 dark:text-slate-300 dark:hover:bg-[#15181e] dark:hover:text-accent-cyan"
          >
            <Icon size={20} aria-hidden="true" />
          </a>
        );
      })}
    </div>
  );
}
