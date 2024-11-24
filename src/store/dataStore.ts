import { create } from 'zustand';
import { PriceData, MarketData } from '../types/price';
import { ChartData } from '../types/chart';

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