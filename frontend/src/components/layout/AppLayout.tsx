import { Menu, Moon, Sun } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { useKeyboardShortcuts } from "../../hooks/useKeyboardShortcuts";
import { usePortfolioVisits } from "../../hooks/usePortfolioVisits";
import { FloatingAskAIButton } from "../navigation/FloatingAskAIButton";
import { MobileMenu } from "../navigation/MobileMenu";
import { PrimaryNav } from "../navigation/PrimaryNav";
import { SectionProgressIndicator } from "../navigation/SectionProgressIndicator";
import { ShortcutsDialog } from "../navigation/ShortcutsDialog";
import { ViewCounter } from "../navigation/ViewCounter";
import InteractiveCursor from "./InteractiveCursor";

export function AppLayout() {
  const [isLight, setIsLight] = useState(() => localStorage.getItem("portfolio-theme") === "light");
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = `${location.pathname}${location.search}`;
  const visitCounts = usePortfolioVisits(currentPath);

  useEffect(() => {
    document.documentElement.classList.toggle("light", isLight);
    document.body.classList.toggle("light", isLight);
    localStorage.setItem("portfolio-theme", isLight ? "light" : "dark");
  }, [isLight]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const goTo = useCallback(
    (path: string) => {
      navigate(path);
    },
    [navigate]
  );

  useKeyboardShortcuts({
    onHome: () => goTo("/"),
    onProjects: () => goTo("/projects"),
    onAskAI: () => goTo("/ask-ai"),
    onContact: () => goTo("/contact"),
    onShortcuts: () => setIsShortcutsOpen(true)
  });

  return (
    <div className="relative min-h-screen">
      <InteractiveCursor />
      <div className="app-background-grid" aria-hidden="true" />
      <SectionProgressIndicator />

      <header className="sticky top-0 z-50 border-b border-white/10 bg-background/75 backdrop-blur-2xl light:border-slate-950/10 light:bg-white/75">
        <div className="mx-auto grid max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <Link to="/" className="group flex items-center gap-3" aria-label="Go to home">
            <span className="hidden min-w-0 sm:block">
              <span className="block truncate text-sm font-semibold text-slate-100 light:text-slate-950">Shubhaang Kataruka</span>
            </span>
          </Link>

          <div className="flex min-w-0 justify-center">
            <PrimaryNav />
          </div>

          <div className="flex items-center justify-end gap-2">
            <ViewCounter counts={visitCounts} />
            <button
              type="button"
              onClick={() => setIsLight((value) => !value)}
              className="grid size-10 place-items-center rounded-full border border-white/10 bg-white/[0.035] text-slate-300 transition hover:border-accent-cyan/45 hover:text-accent-cyan light:border-slate-950/10 light:bg-slate-950/[0.035] light:text-slate-700"
              aria-label="Toggle theme"
            >
              {isLight ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              className="grid size-10 place-items-center rounded-full border border-white/10 bg-white/[0.035] text-slate-300 transition hover:border-accent-cyan/45 hover:text-accent-cyan light:border-slate-950/10 light:bg-slate-950/[0.035] light:text-slate-700 xl:hidden"
              aria-label="Open menu"
            >
              <Menu aria-hidden="true" size={18} />
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Outlet />
      </main>

      <FloatingAskAIButton />
      <ShortcutsDialog isOpen={isShortcutsOpen} onClose={() => setIsShortcutsOpen(false)} />
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </div>
  );
}
