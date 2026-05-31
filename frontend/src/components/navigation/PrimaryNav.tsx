import { NavLink } from "react-router-dom";
import { navigationItems } from "../../config/navigation";
import { cn } from "../../utils/cn";

export function PrimaryNav() {
  return (
    <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
      {navigationItems.map((item) => {
        const Icon = item.icon;

        return (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-400 transition hover:bg-white/5 hover:text-slate-100 light:text-slate-600 light:hover:bg-slate-950/5 light:hover:text-slate-950",
                isActive && "bg-white/10 text-slate-50 light:bg-slate-950/10 light:text-slate-950"
              )
            }
            title={item.shortcut ? `${item.label} (${item.shortcut})` : item.label}
          >
            <Icon size={16} />
            <span>{item.label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
}

