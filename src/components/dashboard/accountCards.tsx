import type { Holding } from "../../types/portfolio";
import {
  getCostBasis,
  getHoldingValue,
  hasPrice,
  hasShares,
} from "../../utils/holdings";
import { formatCurrency, formatPercent } from "../../utils/format";
import { Card } from "../ui/card";
import { sectorColor } from "./sectorColors";

type SectorGroup = {
  sector: string;
  positions: number;
  value: number;
  returnPercent: number | null;
};

function groupBySector(holdings: Holding[]): SectorGroup[] {
  const groups = new Map<
    string,
    { positions: number; value: number; pricedCost: number }
  >();

  for (const holding of holdings.filter(hasShares)) {
    const group =
      groups.get(holding.sector) ??
      { positions: 0, value: 0, pricedCost: 0 };

    group.positions += 1;
    group.value += getHoldingValue(holding);
    if (hasPrice(holding)) {
      group.pricedCost += getCostBasis(holding);
    }
    groups.set(holding.sector, group);
  }

  return [...groups.entries()]
    .map(([sector, g]) => ({
      sector,
      positions: g.positions,
      value: g.value,
      returnPercent:
        g.pricedCost === 0
          ? null
          : ((g.value - g.pricedCost) / g.pricedCost) * 100,
    }))
    .sort((a, b) => b.value - a.value);
}

export function AccountCards({
  holdings,
  currency,
  hidden,
}: {
  holdings: Holding[];
  currency: string;
  hidden: boolean;
}) {
  const groups = groupBySector(holdings);

  return (
    <section aria-label="Accounts by sector">
      <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {groups.map((group) => (
          <li key={group.sector}>
            <Card className="p-4">
              <div className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className={`h-2 w-2 rounded-full ${sectorColor(group.sector)}`}
                />
                <h3 className="truncate text-xs font-medium text-muted">
                  {group.sector}
                </h3>
              </div>
              <p className="mt-2 text-lg font-semibold text-ink">
                {hidden ? "••••••" : formatCurrency(group.value, currency)}
              </p>
              <div className="mt-0.5 flex items-center gap-2 text-[11px]">
                <span className="text-faint">
                  {group.positions} position{group.positions > 1 ? "s" : ""}
                </span>
                {!hidden && group.returnPercent != null && (
                  <span
                    className={
                      group.returnPercent >= 0 ? "text-gain" : "text-loss"
                    }
                  >
                    {formatPercent(group.returnPercent)}
                  </span>
                )}
              </div>
            </Card>
          </li>
        ))}
      </ul>
    </section>
  );
}
