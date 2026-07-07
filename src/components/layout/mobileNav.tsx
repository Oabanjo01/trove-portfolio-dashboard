import { navItems } from "./sidebar";

export function MobileNav() {
  return (
    <nav
      aria-label="Main"
      className="fixed inset-x-0 bottom-0 z-10 border-t border-line bg-surface md:hidden"
    >
      <ul className="flex">
        {navItems.map(({ label, icon: Icon, active }) => (
          <li key={label} className="flex-1">
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              aria-current={active ? "page" : undefined}
              className={`flex flex-col items-center gap-1 py-2.5 text-[11px] ${
                active ? "font-semibold text-primary" : "text-faint"
              }`}
            >
              <Icon className="h-5 w-5" />
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
