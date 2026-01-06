export interface Transaction {
    id: number,
    userId: string,
    coindId: string,
    coinName: string,
    coinSymbol: string,
    coinImg: string,
    transactionType: 'buy' | 'sell',
    amount: number,
    pricePerCoin: number,
    date: string,
    totalCost: number
}