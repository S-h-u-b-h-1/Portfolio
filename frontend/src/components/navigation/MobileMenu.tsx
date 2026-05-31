import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { NavLink } from "react-router-dom";
import { navigationItems } from "../../config/navigation";
import { cn } from "../../utils/cn";

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="fixed inset-0 z-[80] bg-slate-950/80 px-4 py-4 backdrop-blur-md lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={onClose}
        >
          <motion.nav
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onMouseDown={(event) => event.stopPropagation()}
            className="mx-auto max-w-md rounded-lg border border-accent-cyan/20 bg-background p-4 shadow-[0_24px_90px_rgba(0,0,0,0.45)] light:bg-white"
          >
            <div className="mb-3 flex items-center justify-between gap-4">
              <div>
                <p className="font-mono text-xs text-accent-cyan">// mobile.nav</p>
                <h2 className="mt-1 text-lg font-semibold text-slate-50 light:text-slate-950">Menu</h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="grid size-9 place-items-center rounded-lg border border-white/10 bg-white/[0.04] text-slate-300 light:border-slate-950/10 light:bg-slate-950/[0.04] light:text-slate-700"
                aria-label="Close menu"
              >
                <X aria-hidden="true" size={17} />
              </button>
            </div>

            <div className="grid gap-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={onClose}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center justify-between gap-3 rounded-lg px-3 py-3 text-sm text-slate-300 transition hover:bg-white/[0.06] hover:text-slate-50 light:text-slate-700 light:hover:bg-slate-950/[0.05] light:hover:text-slate-950",
                        isActive && "bg-white/10 text-slate-50 light:bg-slate-950/10 light:text-slate-950"
                      )
                    }
                  >
                    <span className="flex items-center gap-3">
                      <Icon aria-hidden="true" size={17} />
                      <span>{item.label}</span>
                    </span>
                    {item.shortcut ? <span className="font-mono text-xs text-slate-500">{item.shortcut}</span> : null}
                  </NavLink>
                );
              })}
            </div>
          </motion.nav>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

