import { useState } from "react";
import type { Transaction } from "../../types/portfolio";
import { EmptyState } from "../ui/emptyState";
import { FilterPills } from "../ui/filterPills";
import { TransactionRow } from "./transactionRow";

const typeFilters = ["All", "Buy", "Sell"];

export function TransactionsPanel({
  transactions,
  currency,
}: {
  transactions: Transaction[];
  currency: string;
}) {
  const [typeFilter, setTypeFilter] = useState("All");

  const filtered = transactions.filter(
    (t) => typeFilter === "All" || t.type === typeFilter.toUpperCase()
  );

  const sorted = [...filtered].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="space-y-4">
      <FilterPills
        label="Filter by transaction type"
        options={typeFilters}
        selected={typeFilter}
        onSelect={setTypeFilter}
      />

      {sorted.length === 0 ? (
        <EmptyState title="No transactions found" />
      ) : (
        <ul className="space-y-3">
          {sorted.map((transaction) => (
            <TransactionRow
              key={transaction.id}
              transaction={transaction}
              currency={currency}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
