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
    onContact: () => goTo("/contact"),
    onShortcuts: () => setIsShortcutsOpen(true)
  });

  return (
    <div className="relative min-h-screen">
      <InteractiveCursor />
      <div className="app-background-grid" aria-hidden="true" />
      <SectionProgressIndicator />

      {/* Top Right Actions (Views & Theme) */}
      <div className="fixed top-6 right-6 z-50 hidden md:flex items-center gap-2 rounded-full border border-black/5 bg-white/40 p-1.5 shadow-sm backdrop-blur-xl light:border-slate-900/10 light:bg-white/80 dark:border-white/10 dark:bg-black/40">
        <div className="px-2">
          <ViewCounter counts={visitCounts} />
        </div>
        <button
          type="button"
          onClick={() => setIsLight((value) => !value)}
          className="grid size-8 place-items-center rounded-full transition hover:bg-black/5 text-slate-500 hover:text-slate-900 dark:hover:bg-white/10 dark:text-slate-400 dark:hover:text-slate-100"
          aria-label="Toggle theme"
        >
          {isLight ? <Moon size={15} /> : <Sun size={15} />}
        </button>
      </div>

      {/* Main Floating Pill Navigation */}
      <header className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-1 rounded-full border border-black/5 bg-white/70 p-1.5 shadow-md backdrop-blur-2xl light:border-slate-900/10 light:bg-white/80 dark:border-white/10 dark:bg-black/40">
          <Link to="/" className="ml-4 mr-2 text-sm font-bold tracking-tight text-slate-900 dark:text-slate-100" aria-label="Go to home">
            Shubhaang
          </Link>

          <PrimaryNav />

          <div className="ml-2 flex items-center gap-2 pr-1 md:hidden">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              className="grid size-8 place-items-center rounded-full transition hover:bg-black/5 text-slate-500 hover:text-slate-900 dark:hover:bg-white/10 dark:text-slate-400 dark:hover:text-slate-100"
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
