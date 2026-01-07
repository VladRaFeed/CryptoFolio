import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Coin, CoinDetails } from '../models/Coin.model';

@Injectable({
  providedIn: 'root',
})
export class MarketService {
  private apiUrl = 'https://api.coingecko.com/api/v3';
  private apiKey = 'CG-VsQbc387U7v9UrPT3mwjumtn';
  private headers = new HttpHeaders().set('x-cg-demo-api-key', this.apiKey);

  private http = inject(HttpClient);

  getCoins(page: number): Observable<Coin[]> {
    const url = `${this.apiUrl}/coins/markets?vs_currency=usd&category=layer-1&per_page=20&page=${page}`;
    return this.http.get<any[]>(url, {headers: this.headers}).pipe(
      map(response => response.map(coinData => ({
        id: coinData.id,
        symbol: coinData.symbol,
        name: coinData.name,
        img: coinData.image,
        currentPrice: coinData.current_price,
        priceChangePercentage24h: coinData.price_change_percentage_24h  
      } as Coin)))) 
  };

  getCoinDetails(id: string): Observable<CoinDetails> {
    const url = `${this.apiUrl}/coins/${id}`;
    return this.http.get<any>(url, {headers: this.headers}).pipe(
      map(response => ({
        id: response.id,
        symbol: response.symbol,
        name: response.name,
        img: response.image.large,
        description: response.description.en,
        homepage: response.links.homepage[0],
        currentPrice: response.market_data.current_price.usd,
        capitalization: response.market_data.market_cap.usd,
        marketRank: response.market_cap_rank,
        priceChange1h: response.market_data.price_change_percentage_1h_in_currency.usd,
        priceChange24h: response.market_data.price_change_percentage_24h,
        priceChange7d: response.market_data.price_change_percentage_7d,
        priceChange30d: response.market_data.price_change_percentage_30d,
        totalVolume: response.market_data.total_volume.usd,
        high24h: response.market_data.high_24h.usd,
        low24h: response.market_data.low_24h.usd
      }))
    )
  };

  getCoinChart(id: string, days: number): Observable<object> {
    const url = `${this.apiUrl}/coins/${id}/market_chart?vs_currency=usd&days=${days}`;
    return this.http.get<any>(url, {headers: this.headers}).pipe(
      map(response => response.prices)
    );
  };

  getCurrentPrice(coinsId: string): Observable<Record<string, {usd: number}>> {
    const url = `${this.apiUrl}/simple/price?vs_currencies=usd&ids=${coinsId}`;
    return this.http.get<any>(url, {headers: this.headers});
  };
}
