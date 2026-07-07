import type { TransactionStatus } from "../../types/portfolio";

const statusStyles: Record<TransactionStatus, string> = {
  COMPLETED: "bg-primary-light text-primary",
  PENDING: "bg-chart-cream/50 text-navy",
  FAILED: "bg-loss/10 text-loss",
};

export function StatusBadge({ status }: { status: TransactionStatus }) {
  return (
    <span
      className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold tracking-wide ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}
