export interface Coin {
    id: string,
    symbol: string,
    name: string,
    img: string,
    currentPrice: number,
    priceChangePercentage24h: number
};

export interface CoinDetails {
    id: string,
    symbol: string,
    name: string,
    img: string,
    description: string,
    homepage: string,
    currentPrice: number,
    capitalization: number,
    marketRank: number,
    priceChange1h: number,
    priceChange24h: number,
    priceChange7d: number,
    priceChange30d: number
    totalVolume: number,
    high24h: number,
    low24h: number
};