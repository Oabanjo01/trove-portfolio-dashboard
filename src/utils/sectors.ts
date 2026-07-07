import type { Holding } from "../types/portfolio";
import { getPortfolioValue } from "./portfolio";
import {
  getHoldingValue,
  hasPrice,
  hasShares,
} from "./holdings";

export interface SectorAllocation {
  sector: string;
  value: number;
  percentage: number;
}

export function getSectorAllocation(
  holdings: Holding[]
): SectorAllocation[] {
  const eligibleHoldings = holdings.filter(
    (holding) =>
      hasPrice(holding) &&
      hasShares(holding)
  );

  const total =
    getPortfolioValue(eligibleHoldings);

  const sectors = eligibleHoldings.reduce<
    Record<string, number>
  >((acc, holding) => {
    acc[holding.sector] =
      (acc[holding.sector] ?? 0) +
      getHoldingValue(holding);

    return acc;
  }, {});

  return Object.entries(sectors).map(
    ([sector, value]) => ({
      sector,
      value,
      percentage:
        total === 0
          ? 0
          : (value / total) * 100,
    })
  );
}