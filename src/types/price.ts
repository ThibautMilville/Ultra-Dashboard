export interface PriceData {
  usdPrice: number;
  priceChange: number;
  lastFetched: number;
}

export interface MarketData {
  market_cap: number;
  total_volume: number;
  price_change_percentage_24h: number;
  price_change_percentage_7d: number;
  price_change_percentage_30d: number;
  total_supply: number;
  circulating_supply: number;
  market_cap_rank: number;
  ath: number;
  atl: number;
  lastFetched: number;
}