import type { User } from "../../types/portfolio";
import { useAuth } from "../../hooks/useAuth";
import {
  IconDashboard,
  IconLogout,
  IconMarkets,
  IconPlus,
  IconPortfolio,
  IconSettings,
  IconTransactions,
} from "../ui/icons";

export const navItems = [
  { label: "Dashboard", icon: IconDashboard, active: true },
  { label: "Portfolio", icon: IconPortfolio, active: false },
  { label: "Transactions", icon: IconTransactions, active: false },
  { label: "Markets", icon: IconMarkets, active: false },
  { label: "Settings", icon: IconSettings, active: false },
];

function initials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function Sidebar({ user }: { user?: User }) {
  const { logout } = useAuth();

  return (
    <aside className="sticky top-0 hidden h-screen flex-col border-r border-line bg-surface px-4 py-6 md:flex">
      <div className="flex items-center gap-2 px-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white">
          T
        </span>
        <span className="text-lg font-semibold text-ink">Trove</span>
      </div>

      <nav aria-label="Main" className="mt-8 flex flex-col gap-1">
        {navItems.map(({ label, icon: Icon, active }) => (
          <a
            key={label}
            href="#"
            onClick={(e) => e.preventDefault()}
            aria-current={active ? "page" : undefined}
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
              active
                ? "bg-primary-light font-semibold text-primary"
                : "text-muted hover:bg-fill hover:text-ink"
            }`}
          >
            <Icon className="h-5 w-5" />
            {label}
          </a>
        ))}
      </nav>

      <div className="mt-auto border-t border-line pt-4">
        {user && (
          <div className="flex items-center gap-2 px-1">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-light text-xs font-semibold text-primary">
              {initials(user.name)}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-ink">
                {user.name}
              </p>
              <p className="truncate text-[11px] text-faint">Premium Member</p>
            </div>
            <button
              type="button"
              onClick={logout}
              aria-label="Sign out"
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-faint transition-colors hover:bg-fill hover:text-ink"
            >
              <IconLogout className="h-4 w-4" />
            </button>
          </div>
        )}

        <button
          type="button"
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-3 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <IconPlus className="h-4 w-4" />
          Add Funds
        </button>
      </div>
    </aside>
  );
}
