import type { Transaction } from "../../types/portfolio";
import {
  formatCurrency,
  formatDate,
  formatShares,
} from "../../utils/format";
import { StatusBadge } from "../ui/statusBadge";
import { IconMinus, IconPlus } from "../ui/icons";

export function TransactionRow({
  transaction,
  currency,
}: {
  transaction: Transaction;
  currency: string;
}) {
  const isBuy = transaction.type === "BUY";
  const failed = transaction.status === "FAILED";

  const amount = formatCurrency(transaction.totalAmount, currency);
  const signedAmount = failed ? amount : isBuy ? `-${amount}` : `+${amount}`;

  return (
    <li className="flex items-center gap-3 rounded-xl border border-line bg-surface p-4">
      <span
        aria-hidden="true"
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
          isBuy ? "bg-primary-light text-primary" : "bg-fill text-muted"
        }`}
      >
        {isBuy ? (
          <IconPlus className="h-4 w-4" />
        ) : (
          <IconMinus className="h-4 w-4" />
        )}
      </span>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-ink">
          {isBuy ? "Buy" : "Sell"} {transaction.name}
        </p>
        <p className="mt-0.5 text-[11px] text-faint">
          {formatDate(transaction.date)} ·{" "}
          {formatShares(transaction.shares)} shares @{" "}
          {formatCurrency(transaction.pricePerShare, currency)}
        </p>
      </div>

      <div className="flex flex-col items-end gap-1">
        <p
          className={`text-sm font-semibold ${
            failed
              ? "text-faint line-through"
              : isBuy
                ? "text-ink"
                : "text-gain"
          }`}
        >
          {signedAmount}
        </p>
        <StatusBadge status={transaction.status} />
      </div>
    </li>
  );
}
