import { NavLink } from "react-router-dom";
import { navigationItems } from "../../config/navigation";
import { cn } from "../../utils/cn";

const primaryNavigationItems = navigationItems.filter((item) => item.path !== "/");

export function PrimaryNav() {
  return (
    <nav
      className="hidden items-center rounded-full border border-white/10 bg-white/[0.035] px-2 py-1 shadow-[0_18px_50px_rgba(0,0,0,0.16)] backdrop-blur-xl light:border-slate-950/10 light:bg-slate-950/[0.035] xl:flex"
      aria-label="Primary navigation"
    >
      {primaryNavigationItems.map((item) => {
        return (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "relative rounded-full px-4 py-2 text-[11px] font-medium uppercase tracking-[0.24em] text-slate-500 transition hover:text-slate-100 light:text-slate-600 light:hover:text-slate-950",
                isActive && "bg-white/[0.075] text-slate-50 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)] light:bg-slate-950/[0.08] light:text-slate-950"
              )
            }
            title={item.shortcut ? `${item.label} (${item.shortcut})` : item.label}
          >
            <span>{item.label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
}
