import type { Holding } from "../../types/portfolio";
import {
  getGainLoss,
  getGainLossPercent,
  getHoldingValue,
  hasPrice,
  hasShares,
} from "../../utils/holdings";
import {
  formatCurrency,
  formatPercent,
  formatShares,
  formatSignedCurrency,
} from "../../utils/format";
import { sectorColor } from "./sectorColors";

export function HoldingCard({
  holding,
  currency,
}: {
  holding: Holding;
  currency: string;
}) {
  const priced = hasPrice(holding);
  const open = hasShares(holding);
  const gainLoss = getGainLoss(holding);
  const gainLossPercent = getGainLossPercent(holding);

  return (
    <li
      className={`flex items-center gap-3 rounded-xl border border-line bg-surface p-4 ${
        open ? "" : "opacity-60"
      }`}
    >
      <span
        aria-hidden="true"
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-fill text-[11px] font-bold text-muted"
      >
        {holding.ticker.slice(0, 4)}
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-ink">{holding.ticker}</p>
          <span
            aria-hidden="true"
            className={`h-1.5 w-1.5 rounded-full ${sectorColor(holding.sector)}`}
          />
          <span className="text-[11px] text-faint">{holding.sector}</span>
        </div>
        <p className="truncate text-xs text-muted">{holding.name}</p>
        <p className="mt-0.5 text-[11px] text-faint">
          {open
            ? `${formatShares(holding.shares)} shares`
            : "Closed position, no open shares"}
        </p>
      </div>

      <div className="text-right">
        {priced ? (
          <>
            <p className="text-sm font-semibold text-ink">
              {open ? formatCurrency(getHoldingValue(holding), currency) : "N/A"}
            </p>
            {open && gainLoss != null && gainLossPercent != null && (
              <p
                className={`text-xs font-medium ${
                  gainLoss >= 0 ? "text-gain" : "text-loss"
                }`}
              >
                {formatSignedCurrency(gainLoss, currency)} (
                {formatPercent(gainLossPercent)})
              </p>
            )}
          </>
        ) : (
          <>
            <p className="text-sm font-medium italic text-faint">
              Price unavailable
            </p>
            <p className="text-xs text-faint">
              {formatShares(holding.shares)} shares held
            </p>
          </>
        )}
      </div>
    </li>
  );
}
