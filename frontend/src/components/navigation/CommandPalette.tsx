import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { navigationItems } from "../../config/navigation";

type CommandPaletteProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return navigationItems;
    }

    return navigationItems.filter((item) =>
      [item.label, item.path, item.shortcut ?? ""].join(" ").toLowerCase().includes(normalizedQuery)
    );
  }, [query]);

  useEffect(() => {
    if (!isOpen) {
      setQuery("");
      return;
    }

    const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 50);
    return () => window.clearTimeout(focusTimer);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const goToPath = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="fixed inset-0 z-[90] bg-slate-950/80 px-4 py-6 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={onClose}
        >
          <div className="flex min-h-full items-start justify-center pt-16">
            <motion.section
              role="dialog"
              aria-modal="true"
              aria-labelledby="command-palette-title"
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              onMouseDown={(event) => event.stopPropagation()}
              className="w-full max-w-2xl overflow-hidden rounded-lg border border-accent-cyan/20 bg-background shadow-[0_24px_90px_rgba(0,0,0,0.45)] light:bg-white"
            >
              <div className="flex items-center justify-between border-b border-border px-4 py-3">
                <div>
                  <p className="font-mono text-xs text-accent-cyan">// command.palette</p>
                  <h2 id="command-palette-title" className="mt-1 text-lg font-semibold text-slate-50 light:text-slate-950">
                    Navigate portfolio
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="grid size-9 place-items-center rounded-lg border border-white/10 bg-white/[0.04] text-slate-300 transition hover:border-accent-cyan/50 hover:text-accent-cyan light:border-slate-950/10 light:bg-slate-950/[0.04] light:text-slate-700"
                  aria-label="Close command palette"
                >
                  <X aria-hidden="true" size={17} />
                </button>
              </div>

              <label className="relative block border-b border-border">
                <span className="sr-only">Search navigation</span>
                <Search
                  aria-hidden="true"
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                  size={18}
                />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search pages..."
                  className="h-14 w-full bg-transparent pl-11 pr-4 text-sm text-slate-100 outline-none placeholder:text-slate-500 light:text-slate-950"
                />
              </label>

              <div className="max-h-[26rem] overflow-y-auto p-2">
                {filteredItems.map((item) => {
                  const Icon = item.icon;

                  return (
                    <button
                      key={item.path}
                      type="button"
                      onClick={() => goToPath(item.path)}
                      className="flex w-full items-center justify-between gap-4 rounded-lg px-3 py-3 text-left transition hover:bg-white/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-cyan light:hover:bg-slate-950/[0.05]"
                    >
                      <span className="flex min-w-0 items-center gap-3">
                        <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-accent-cyan/20 bg-accent-cyan/10 text-accent-cyan">
                          <Icon aria-hidden="true" size={17} />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-sm font-semibold text-slate-100 light:text-slate-950">{item.label}</span>
                          <span className="block truncate font-mono text-xs text-slate-500 light:text-slate-600">{item.path}</span>
                        </span>
                      </span>
                      {item.shortcut ? (
                        <span className="shrink-0 rounded-md border border-white/10 bg-white/[0.04] px-2 py-1 font-mono text-xs text-slate-400 light:border-slate-950/10 light:bg-slate-950/[0.04] light:text-slate-600">
                          {item.shortcut}
                        </span>
                      ) : null}
                    </button>
                  );
                })}
                {filteredItems.length === 0 ? (
                  <p className="px-3 py-8 text-center text-sm text-slate-500">No matching page.</p>
                ) : null}
              </div>
            </motion.section>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

