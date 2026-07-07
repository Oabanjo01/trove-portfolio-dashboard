import type { ReactNode } from "react";
import type { Holding, User } from "../../types/portfolio";
import { Sidebar } from "./sidebar";
import { TopBar } from "./topBar";
import { MobileNav } from "./mobileNav";

type DashboardLayoutProps = {
  user?: User;
  holdings?: Holding[];
  children: ReactNode;
};

export function DashboardLayout({
  user,
  holdings,
  children,
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-canvas font-sans text-ink md:grid md:grid-cols-[240px_1fr]">
      <Sidebar user={user} />

      <div className="flex min-w-0 flex-col pb-24 md:pb-0">
        <TopBar holdings={holdings} />
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6">
          {children}
        </main>
      </div>

      <MobileNav />
    </div>
  );
}
