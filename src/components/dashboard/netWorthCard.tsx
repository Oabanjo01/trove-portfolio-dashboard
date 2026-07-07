import { useState } from "react";
import type { Holding } from "../../types/portfolio";
import {
  getNetGainLoss,
  getPortfolioReturn,
  getPortfolioValue,
  getTotalInvested,
} from "../../utils/portfolio";
import {
  formatCurrency,
  formatPercent,
  formatSignedCurrency,
} from "../../utils/format";
import { Card } from "../ui/card";
import { IconEye, IconEyeOff, IconTrendDown, IconTrendUp } from "../ui/icons";
import { NetWorthChart, type Timeframe } from "./netWorthChart";

const timeframes: Timeframe[] = ["1D", "1W", "1M", "ALL"];

type NetWorthCardProps = {
  holdings: Holding[];
  currency: string;
  hidden: boolean;
  onToggleHidden: () => void;
};

export function NetWorthCard({
  holdings,
  currency,
  hidden,
  onToggleHidden,
}: NetWorthCardProps) {
  const [timeframe, setTimeframe] = useState<Timeframe>("1D");

  const value = getPortfolioValue(holdings);
  const invested = getTotalInvested(holdings);
  const gainLoss = getNetGainLoss(holdings);
  const returnPercent = getPortfolioReturn(holdings);

  const positive = gainLoss >= 0;
  const TrendIcon = positive ? IconTrendUp : IconTrendDown;

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xs font-medium uppercase tracking-wide text-muted">
              Total Net Worth
            </h2>
            <button
              type="button"
              onClick={onToggleHidden}
              aria-label={hidden ? "Show balance" : "Hide balance"}
              aria-pressed={hidden}
              className="text-faint transition-colors hover:text-ink"
            >
              {hidden ? (
                <IconEyeOff className="h-4 w-4" />
              ) : (
                <IconEye className="h-4 w-4" />
              )}
            </button>
          </div>

          <p className="mt-2 text-[28px] font-semibold leading-tight text-ink">
            {hidden ? "••••••••" : formatCurrency(value, currency)}
          </p>

          <div
            className={`mt-1 flex items-center gap-1.5 text-sm font-medium ${
              positive ? "text-gain" : "text-loss"
            }`}
          >
            <TrendIcon className="h-4 w-4" />
            {hidden ? (
              <span>••••</span>
            ) : (
              <span>
                {formatSignedCurrency(gainLoss, currency)} (
                {formatPercent(returnPercent)})
              </span>
            )}
            <span className="font-normal text-faint">all time</span>
          </div>
        </div>

        <div
          role="group"
          aria-label="Chart timeframe"
          className="flex shrink-0 gap-1"
        >
          {timeframes.map((tf) => {
            const active = tf === timeframe;
            return (
              <button
                key={tf}
                type="button"
                aria-pressed={active}
                onClick={() => setTimeframe(tf)}
                className={`rounded-full px-2.5 py-1 text-[11px] font-semibold transition-colors ${
                  active
                    ? "bg-primary text-white"
                    : "text-muted hover:bg-fill hover:text-ink"
                }`}
              >
                {tf}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-4">
        <NetWorthChart
          currentValue={value}
          investedValue={invested}
          currency={currency}
          timeframe={timeframe}
        />
      </div>
    </Card>
  );
}
