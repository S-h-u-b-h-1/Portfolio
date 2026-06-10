import { NavLink } from "react-router-dom";
import { navigationItems } from "../../config/navigation";
import { cn } from "../../utils/cn";

const primaryNavigationItems = navigationItems.filter((item) => item.path !== "/");

export function PrimaryNav() {
  return (
    <nav className="hidden items-center gap-1 xl:flex" aria-label="Primary navigation">
      {primaryNavigationItems.map((item) => {
        return (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "relative rounded-full px-4 py-1.5 text-[13px] font-medium transition hover:text-slate-100 light:hover:text-slate-950",
                isActive
                  ? "bg-white/10 text-slate-50 light:bg-slate-950/10 light:text-slate-950"
                  : "text-slate-400 light:text-slate-500"
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
