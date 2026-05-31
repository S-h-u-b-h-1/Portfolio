import { Keyboard, Menu, Moon, Search, Sun } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { useKeyboardShortcuts } from "../../hooks/useKeyboardShortcuts";
import { CommandPalette } from "../navigation/CommandPalette";
import { FloatingAskAIButton } from "../navigation/FloatingAskAIButton";
import { MobileMenu } from "../navigation/MobileMenu";
import { PrimaryNav } from "../navigation/PrimaryNav";
import { SectionProgressIndicator } from "../navigation/SectionProgressIndicator";
import { ShortcutsDialog } from "../navigation/ShortcutsDialog";

export function AppLayout() {
  const [isLight, setIsLight] = useState(() => localStorage.getItem("portfolio-theme") === "light");
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    document.documentElement.classList.toggle("light", isLight);
    document.body.classList.toggle("light", isLight);
    localStorage.setItem("portfolio-theme", isLight ? "light" : "dark");
  }, [isLight]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsCommandPaletteOpen(false);
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
    onCommandPalette: () => setIsCommandPaletteOpen(true),
    onShortcuts: () => setIsShortcutsOpen(true)
  });

  return (
    <div className="relative min-h-screen">
      <div className="app-background-grid" aria-hidden="true" />
      <SectionProgressIndicator />

      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl light:bg-white/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <Link to="/" className="group flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-lg border border-accent-cyan/40 bg-accent-cyan/10 font-mono text-sm font-semibold text-accent-cyan shadow-glow">
              SK
            </span>
            <span className="hidden sm:block">
              <span className="block text-sm font-semibold text-slate-100 light:text-slate-950">
                Shubhaang Kataruka
              </span>
              <span className="block font-mono text-xs text-slate-400 light:text-slate-600">
                // system.identity
              </span>
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <PrimaryNav />
            <button
              type="button"
              onClick={() => setIsCommandPaletteOpen(true)}
              className="hidden min-h-10 items-center gap-2 rounded-lg border border-border bg-white/5 px-3 text-sm text-slate-300 transition hover:border-accent-cyan/50 hover:text-accent-cyan light:bg-slate-950/5 light:text-slate-700 md:inline-flex"
              aria-label="Open command palette"
            >
              <Search aria-hidden="true" size={16} />
              <span className="hidden xl:inline">Command</span>
              <kbd className="hidden rounded border border-white/10 bg-white/[0.04] px-1.5 py-0.5 font-mono text-[0.65rem] text-slate-500 light:border-slate-950/10 xl:inline">
                ⌘K
              </kbd>
            </button>
            <button
              type="button"
              onClick={() => setIsShortcutsOpen(true)}
              className="grid size-10 place-items-center rounded-lg border border-border bg-white/5 text-slate-200 transition hover:border-accent-cyan/50 hover:text-accent-cyan light:bg-slate-950/5 light:text-slate-800"
              aria-label="Open keyboard shortcuts"
            >
              <Keyboard aria-hidden="true" size={18} />
            </button>
            <button
              type="button"
              onClick={() => setIsLight((value) => !value)}
              className="grid size-10 place-items-center rounded-lg border border-border bg-white/5 text-slate-200 transition hover:border-accent-cyan/50 hover:text-accent-cyan light:bg-slate-950/5 light:text-slate-800"
              aria-label="Toggle theme"
            >
              {isLight ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              className="grid size-10 place-items-center rounded-lg border border-border bg-white/5 text-slate-200 transition hover:border-accent-cyan/50 hover:text-accent-cyan light:bg-slate-950/5 light:text-slate-800 lg:hidden"
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
      <CommandPalette isOpen={isCommandPaletteOpen} onClose={() => setIsCommandPaletteOpen(false)} />
      <ShortcutsDialog isOpen={isShortcutsOpen} onClose={() => setIsShortcutsOpen(false)} />
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </div>
  );
}
