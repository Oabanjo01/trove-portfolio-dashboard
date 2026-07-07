export interface User {
    name: string;
    accountId: string;
    lastUpdated: string;
  }
  
  export interface Summary {
    totalPortfolioValue: number;
    totalInvested: number;
    currency: string;
  }
  
  export interface Holding {
    id: string;
    ticker: string;
    name: string;
    sector: string;
    shares: number;
    avgCost: number;
    currentPrice: number;
    currency: string;
  }
  
  export type TransactionType = "BUY" | "SELL";
  
  export type TransactionStatus =
    | "COMPLETED"
    | "PENDING"
    | "FAILED";
  
  export interface Transaction {
    id: string;
    type: TransactionType;
    ticker: string;
    name: string;
    shares: number;
    pricePerShare: number;
    totalAmount: number;
    date: string;
    status: TransactionStatus;
  }
  
  export interface Portfolio {
    user: User;
    summary: Summary;
    holdings: Holding[];
    transactions: Transaction[];
  }