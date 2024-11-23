import { create } from 'zustand';

interface PriceData {
  usdPrice: number;
  priceChange: number;
  lastFetched: number;
}

interface ChartData {
  fiveMinData: PriceItem[];
  hourlyData: PriceItem[];
  dailyData: PriceItem[];
  lastFetched: number;
}

interface MarketData {
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

interface PriceItem {
  time: number;
  value: number;
}

interface DataState {
  priceData: PriceData | null;
  chartData: ChartData | null;
  marketData: MarketData | null;
  setPriceData: (data: PriceData) => void;
  setChartData: (data: ChartData) => void;
  setMarketData: (data: MarketData) => void;
  clearData: () => void;
}

const CACHE_DURATION = 300000; // 5 minutes cache

export const useDataStore = create<DataState>((set) => ({
  priceData: null,
  chartData: null,
  marketData: null,
  setPriceData: (data) => set({ priceData: { ...data, lastFetched: Date.now() } }),
  setChartData: (data) => set({ chartData: { ...data, lastFetched: Date.now() } }),
  setMarketData: (data) => set({ marketData: { ...data, lastFetched: Date.now() } }),
  clearData: () => set({ priceData: null, chartData: null, marketData: null }),
}));

export const shouldFetchData = (lastFetched: number | undefined): boolean => {
  if (!lastFetched) return true;
  return Date.now() - lastFetched > CACHE_DURATION;
};