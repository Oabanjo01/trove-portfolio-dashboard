import type { Holding } from "../types/portfolio";

/**
 * I noticed a stock can have a 0 price value, so as to avoid
 * misleading gain/loss calculations.
 * @param holding - object containing stock details
 * @returns
 */
export function hasPrice(holding: Holding): boolean {
  return holding.currentPrice > 0;
}

export function hasShares(holding: Holding): boolean {
  return holding.shares > 0;
}

export function getHoldingValue(holding: Holding): number {
  if (!hasPrice(holding)) {
    return 0;
  }

  return holding.shares * holding.currentPrice;
}

export function getCostBasis(holding: Holding): number {
  return holding.shares * holding.avgCost;
}

export function getGainLoss(holding: Holding): number | null {
  if (!hasPrice(holding)) {
    return null;
  }

  return getHoldingValue(holding) - getCostBasis(holding);
}

export function getGainLossPercent(holding: Holding): number | null {
  if (!hasPrice(holding)) {
    return null;
  }

  const costBasis = getCostBasis(holding);

  if (costBasis === 0) {
    return 0;
  }

  return (getGainLoss(holding)! / costBasis) * 100;
}
