import type { Holding } from "../../types/portfolio";
import { useAuth } from "../../hooks/useAuth";
import { IconBell, IconHelp, IconLogout } from "../ui/icons";
import { GlobalSearch } from "./globalSearch";

export function TopBar({ holdings }: { holdings?: Holding[] }) {
  const { logout } = useAuth();

  return (
    <header className="sticky top-0 z-10 border-b border-line bg-surface/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center gap-3 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-2 md:hidden">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white">
            T
          </span>
        </div>

        <GlobalSearch holdings={holdings} />

        <div className="ml-auto flex items-center gap-1">
          <button
            type="button"
            aria-label="Notifications"
            className="flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-fill hover:text-ink"
          >
            <IconBell className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Help"
            className="flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-fill hover:text-ink"
          >
            <IconHelp className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Sign out"
            onClick={logout}
            className="flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-fill hover:text-ink md:hidden"
          >
            <IconLogout className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
