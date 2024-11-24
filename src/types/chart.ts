export interface PriceItem {
  time: number;
  value: number;
}

export interface ChartData {
  fiveMinData: PriceItem[];
  hourlyData: PriceItem[];
  dailyData: PriceItem[];
  lastFetched: number;
}

export type TimeframeOption = '1Y' | '1M' | '1W' | '1D' | '4H' | '1H';