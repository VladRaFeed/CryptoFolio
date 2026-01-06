export interface PortfolioSummary {
    totalBalance: number;
    totalInvested: number;
    totalProfit: number;
    totalProfitPercentage: number;
}

export interface PortfoilioAsset {
    coinId: string,
    name: string,
    symbol: string,
    image: string,
    amount: number,
    totalInvested: number,
    currentPrice: number,
    currentValue: number,
    profit: number,
    profitPercentage: number
}