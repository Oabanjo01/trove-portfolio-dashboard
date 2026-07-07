import portfolioData from "../data/portfolio_data.json";
import type { Portfolio } from "../types/portfolio";

const DELAY = 1_200;
const FAILURE_RATE = 0.15;

/**
 * This just simulates the throttling network kini gives.
 * @param data The portfolio data to return.
 * @returns a promie that resolves when the random value is greater that failure rate.
 */
function simulateNetwork<T>(data: T): Promise<T> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < FAILURE_RATE) {
        reject(new Error("Unable to load portfolio. Please try again."));
        return;
      }

      resolve(data);
    }, DELAY);
  });
}

export async function getPortfolio(): Promise<Portfolio> {
  return simulateNetwork(portfolioData as Portfolio);
}

export async function getHoldings() {
  const portfolio = await getPortfolio();
  return portfolio.holdings;
}

export async function getTransactions() {
  const portfolio = await getPortfolio();
  return portfolio.transactions;
}

export async function getSummary() {
  const portfolio = await getPortfolio();
  return portfolio.summary;
}

export async function getUser() {
  const portfolio = await getPortfolio();
  return portfolio.user;
}
