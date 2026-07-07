import { useState } from "react";
import type { Holding, Transaction } from "../../types/portfolio";
import { Card } from "../ui/card";
import { HoldingsPanel } from "./holdingsPanel";
import { TransactionsPanel } from "./transactionsPanel";

type Tab = "stocks" | "orders";

type TabbedPanelProps = {
  holdings: Holding[];
  transactions: Transaction[];
  currency: string;
};

export function TabbedPanel({
  holdings,
  transactions,
  currency,
}: TabbedPanelProps) {
  const [tab, setTab] = useState<Tab>("stocks");

  const tabs: { id: Tab; label: string; count: number }[] = [
    { id: "stocks", label: "Stocks", count: holdings.length },
    { id: "orders", label: "Orders", count: transactions.length },
  ];

  return (
    <Card className="p-4 sm:p-6">
      <div
        role="tablist"
        aria-label="Holdings and transactions"
        className="flex gap-1 border-b border-line"
      >
        {tabs.map(({ id, label, count }) => {
          const active = tab === id;

          return (
            <button
              key={id}
              role="tab"
              id={`tab-${id}`}
              aria-selected={active}
              aria-controls={`panel-${id}`}
              onClick={() => setTab(id)}
              className={`-mb-px flex items-center gap-2 border-b-2 px-4 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? "border-primary text-primary"
                  : "border-transparent text-muted hover:text-ink"
              }`}
            >
              {label}
              <span
                className={`rounded-full px-1.5 py-0.5 text-[11px] font-semibold ${
                  active ? "bg-primary-light text-primary" : "bg-fill text-faint"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`panel-${tab}`}
        aria-labelledby={`tab-${tab}`}
        className="pt-5"
      >
        {tab === "stocks" ? (
          <HoldingsPanel holdings={holdings} currency={currency} />
        ) : (
          <TransactionsPanel transactions={transactions} currency={currency} />
        )}
      </div>
    </Card>
  );
}
