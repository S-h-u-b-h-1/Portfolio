import { Menu, Moon, Sun } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
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

      <header className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-1 rounded-full border border-[var(--card-border)] bg-[var(--card)] p-1.5 shadow-2xl backdrop-blur-xl">
          <Link to="/" className="ml-4 mr-2 text-sm font-bold tracking-tight text-slate-100 light:text-slate-900" aria-label="Go to home">
            Shubhaang
          </Link>

          <PrimaryNav />

          <div className="ml-2 flex items-center gap-2 pr-1">
            <ViewCounter counts={visitCounts} />
            <button
              type="button"
              onClick={() => setIsLight((value) => !value)}
              className="grid size-8 place-items-center rounded-full transition hover:bg-white/10 text-slate-400 hover:text-slate-100"
              aria-label="Toggle theme"
            >
              {isLight ? <Moon size={15} /> : <Sun size={15} />}
            </button>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              className="grid size-8 place-items-center rounded-full transition hover:bg-white/10 text-slate-400 hover:text-slate-100 xl:hidden"
              aria-label="Open menu"
            >
              <Menu aria-hidden="true" size={15} />
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-5xl px-4 pt-32 pb-10 sm:px-6 lg:px-8">
        <Outlet />
      </main>

      <FloatingAskAIButton />
      <ShortcutsDialog isOpen={isShortcutsOpen} onClose={() => setIsShortcutsOpen(false)} />
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </div>
  );
}
