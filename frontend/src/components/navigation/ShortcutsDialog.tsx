import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

type ShortcutsDialogProps = {
  isOpen: boolean;
  onClose: () => void;
};

const shortcuts = [
  { keys: "g h", label: "Home" },
  { keys: "g p", label: "Projects" },
  { keys: "g a", label: "Ask AI" },
  { keys: "g c", label: "Contact" },
  { keys: "?", label: "Shortcuts" }
] as const;

export function ShortcutsDialog({ isOpen, onClose }: ShortcutsDialogProps) {
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
          <div className="flex min-h-full items-center justify-center">
            <motion.section
              role="dialog"
              aria-modal="true"
              aria-labelledby="shortcuts-title"
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              onMouseDown={(event) => event.stopPropagation()}
              className="w-full max-w-lg rounded-lg border border-accent-cyan/20 bg-background p-5 shadow-[0_24px_90px_rgba(0,0,0,0.45)] light:bg-white"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-xs text-accent-cyan">// keyboard.map</p>
                  <h2 id="shortcuts-title" className="mt-2 text-2xl font-semibold text-slate-50 light:text-slate-950">
                    Shortcuts
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="grid size-9 place-items-center rounded-lg border border-white/10 bg-white/[0.04] text-slate-300 transition hover:border-accent-cyan/50 hover:text-accent-cyan light:border-slate-950/10 light:bg-slate-950/[0.04] light:text-slate-700"
                  aria-label="Close shortcuts"
                >
                  <X aria-hidden="true" size={17} />
                </button>
              </div>

              <div className="mt-5 grid gap-3">
                {shortcuts.map((shortcut) => (
                  <div
                    key={shortcut.keys}
                    className="flex items-center justify-between gap-4 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-3 light:border-slate-950/10 light:bg-slate-950/[0.035]"
                  >
                    <span className="text-sm text-slate-300 light:text-slate-700">{shortcut.label}</span>
                    <kbd className="rounded-md border border-accent-cyan/20 bg-accent-cyan/10 px-2 py-1 font-mono text-xs text-accent-cyan">
                      {shortcut.keys}
                    </kbd>
                  </div>
                ))}
              </div>
            </motion.section>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
