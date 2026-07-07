import type { Holding } from "../types/portfolio";
import { getHoldingValue, hasPrice } from "./holdings";

export function getPortfolioValue(holdings: Holding[]): number {
  return holdings
    .filter(hasPrice)
    .reduce((total, holding) => total + getHoldingValue(holding), 0);
}

export function getTotalInvested(holdings: Holding[]): number {
  return holdings
    .filter(hasPrice)
    .reduce((total, holding) => total + holding.avgCost * holding.shares, 0);
}

export function getNetGainLoss(holdings: Holding[]): number {
  return getPortfolioValue(holdings) - getTotalInvested(holdings);
}

export function getPortfolioReturn(holdings: Holding[]): number {
  const invested = getTotalInvested(holdings);

  if (invested === 0) {
    return 0;
  }

  return (getNetGainLoss(holdings) / invested) * 100;
}
