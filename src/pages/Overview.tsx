import { useState, useEffect, useRef, useMemo } from 'react';
import axios from 'axios';
import { TrendingUp, ArrowUpDown, Activity, BarChart3, TrendingDown } from 'lucide-react';
import PriceChart from '../components/pages/overview/PriceChart';
import TechnicalIndicator from '../components/pages/overview/TechnicalIndicator';
import TechnicalAnalysis from '../components/pages/overview/TechnicalAnalysis';
import TimeframeSelector from '../components/common/TimeframeSelector';
import CurrencyToggle from '../components/common/CurrencyToggle';
import ProjectDescription from '../components/pages/overview/ProjectDescription';
import { useExchangeRate } from '../hooks/useExchangesRate';
import { useDataStore, shouldFetchData } from '../store/dataStore';
import { formatCurrency } from '../utils/formatters';
// Types
import type { PriceItem, TimeframeOption } from '../types/chart';
import type { Currency } from '../types/common';

function Overview() {
  const { eurRate, loading: rateLoading, error: rateError } = useExchangeRate();
  const [loading, setLoading] = useState<boolean>(true);
  const [timeframe, setTimeframe] = useState<TimeframeOption>('1D');
  const [currency, setCurrency] = useState<Currency>('USD');
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const { priceData, chartData, marketData, setPriceData, setChartData, setMarketData } = useDataStore();

  const currentPrice = useMemo(() => {
    return currency === 'USD' ? priceData?.usdPrice || 0 : (priceData?.usdPrice || 0) * eurRate;
  }, [priceData?.usdPrice, eurRate, currency]);

  const getCurrentChartData = useMemo(() => {
    if (!chartData) return [];

    const now = Date.now();
    const multiplier = currency === 'EUR' ? eurRate : 1;

    const getFilteredData = (data: PriceItem[], timeInMs: number) => {
      return data
        .filter(item => item.time * 1000 > now - timeInMs)
        .map(item => ({
          time: item.time,
          value: item.value * multiplier
        }));
    };

    switch (timeframe) {
      case '1H':
        return getFilteredData(chartData.fiveMinData, 60 * 60 * 1000);
      case '4H':
        return getFilteredData(chartData.fiveMinData, 4 * 60 * 60 * 1000);
      case '1D':
        return getFilteredData(chartData.fiveMinData, 24 * 60 * 60 * 1000);
      case '1W':
        return getFilteredData(chartData.hourlyData, 7 * 24 * 60 * 60 * 1000);
      case '1M':
        return getFilteredData(chartData.hourlyData, 30 * 24 * 60 * 60 * 1000);
      case '1Y':
      default:
        return chartData.dailyData.map(item => ({
          time: item.time,
          value: item.value * multiplier
        }));
    }
  }, [timeframe, chartData, currency, eurRate]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch price data if needed
        if (!priceData || shouldFetchData(priceData.lastFetched)) {
          await fetchPriceData();
        }

        // Fetch market data if needed
        if (!marketData || shouldFetchData(marketData.lastFetched)) {
          await fetchMarketData();
        }

        // Fetch chart data if needed
        if (!chartData || shouldFetchData(chartData.lastFetched)) {
          await fetchAllChartData();
        }
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const fetchPriceData = async () => {
    try {
      const priceResponse = await axios.get('/api-price', {
        params: {
          ids: 'ultra',
          vs_currencies: 'usd',
          include_24hr_change: true
        },
      });

      if (!priceResponse.data?.ultra?.usd) {
        throw new Error('Invalid price data received');
      }

      setPriceData({
        usdPrice: priceResponse.data.ultra.usd,
        priceChange: priceResponse.data.ultra.usd_24h_change,
        lastFetched: Date.now()
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      throw err;
    }
  };

  const fetchMarketData = async () => {
    try {
      const response = await axios.get('/api-coins', {
        params: {
          id: 'ultra',
          localization: false,
          tickers: false,
          community_data: false,
          developer_data: false,
          sparkline: false
        },
      });

      const data = response.data;
      if (!data || !data.market_data) {
        throw new Error('Invalid market data received');
      }

      const marketData = data.market_data;
      setMarketData({
        market_cap: marketData.market_cap?.usd || 0,
        total_volume: marketData.total_volume?.usd || 0,
        price_change_percentage_24h: marketData.price_change_percentage_24h || 0,
        price_change_percentage_7d: marketData.price_change_percentage_7d || 0,
        price_change_percentage_30d: marketData.price_change_percentage_30d || 0,
        total_supply: marketData.total_supply || 0,
        circulating_supply: marketData.circulating_supply || 0,
        market_cap_rank: data.market_cap_rank || 0,
        ath: marketData.ath?.usd || 0,
        atl: marketData.atl?.usd || 0,
        lastFetched: Date.now()
      });
    } catch (err) {
      console.error('Error fetching market data:', err);
      throw err;
    }
  };

  const fetchAllChartData = async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();

    try {
      const [fiveMinResponse, hourlyResponse, dailyResponse] = await Promise.all([
        axios.get('/api-market-chart', {
          params: {
            id: 'ultra',
            vs_currency: 'usd',
            days: 1,
          },
          signal: abortControllerRef.current.signal,
        }),
        axios.get('/api-market-chart', {
          params: {
            id: 'ultra',
            vs_currency: 'usd',
            days: 30,
          },
          signal: abortControllerRef.current.signal,
        }),
        axios.get('/api-market-chart', {
          params: {
            id: 'ultra',
            vs_currency: 'usd',
            days: 365,
          },
          signal: abortControllerRef.current.signal,
        }),
      ]);

      const fiveMinPrices = fiveMinResponse.data.prices.map((item: [number, number]) => ({
        time: item[0] / 1000,
        value: item[1],
      }));

      const hourlyPrices = hourlyResponse.data.prices.map((item: [number, number]) => ({
        time: item[0] / 1000,
        value: item[1],
      }));

      const dailyPrices = dailyResponse.data.prices.map((item: [number, number]) => ({
        time: item[0] / 1000,
        value: item[1],
      }));

      setChartData({
        fiveMinData: fiveMinPrices,
        hourlyData: hourlyPrices,
        dailyData: dailyPrices,
        lastFetched: Date.now()
      });
    } catch (err) {
      if (!axios.isCancel(err)) {
        setError('Failed to fetch chart data');
        console.error('Error fetching chart data:', err);
      }
    }
  };

  // Technical indicator calculations
  const calculateRSI = (data: PriceItem[]) => {
    if (data.length < 15) return 50;

    const changes = data.slice(1).map((item, i) => item.value - data[i].value);
    const gains = changes.map(change => change > 0 ? change : 0);
    const losses = changes.map(change => change < 0 ? -change : 0);

    const avgGain = gains.slice(-14).reduce((sum, gain) => sum + gain, 0) / 14;
    const avgLoss = losses.slice(-14).reduce((sum, loss) => sum + loss, 0) / 14;

    if (avgLoss === 0) return 100;
    const rs = avgGain / avgLoss;
    return 100 - (100 / (1 + rs));
  };

  const calculateMACD = (data: PriceItem[]) => {
    if (data.length < 26) return 0;

    const ema12 = calculateEMA(data, 12);
    const ema26 = calculateEMA(data, 26);
    return ema12 - ema26;
  };

  const calculateEMA = (data: PriceItem[], period: number) => {
    const k = 2 / (period + 1);
    let ema = data[0].value;

    for (let i = 1; i < data.length; i++) {
      ema = data[i].value * k + ema * (1 - k);
    }

    return ema;
  };

  if (loading || rateLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error || rateError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center px-4">
          <p className="text-red-600 mb-4">{error || rateError}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const volume24h = marketData?.total_volume || 0;
  const volatility = Math.abs((marketData?.price_change_percentage_24h || 0) * 0.4);
  const rsi = calculateRSI(getCurrentChartData);
  const macd = calculateMACD(getCurrentChartData);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <ProjectDescription />

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <img
            src="https://assets.coingecko.com/coins/images/4480/small/Ultra.png"
            alt="Ultra Logo"
            className="w-12 h-12"
          />
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Ultra ($UOS)</h1>
            <p className="text-gray-600 mt-1">
              Real-time price and technical analysis
            </p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <CurrencyToggle
            currency={currency}
            onCurrencyChange={setCurrency}
          />
          <div className="text-left md:text-right">
            <p className="text-2xl md:text-3xl font-bold text-gray-900">
              {formatCurrency(currentPrice, currency, eurRate, { decimals: 6 })}
            </p>
            <p
              className={`text-sm font-medium ${(marketData?.price_change_percentage_24h || 0) >= 0 ? 'text-green-600' : 'text-red-600'
                }`}
            >
              {(marketData?.price_change_percentage_24h || 0) >= 0 ? '↑' : '↓'}{' '}
              {Math.abs(marketData?.price_change_percentage_24h || 0).toFixed(2)}%
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <TechnicalIndicator
          title="RSI (14)"
          value={rsi.toFixed(2)}
          change={marketData?.price_change_percentage_24h || 0}
          icon={<Activity className="h-5 w-5" />}
        />
        <TechnicalIndicator
          title="MACD"
          value={macd.toFixed(6)}
          change={(marketData?.price_change_percentage_24h || 0) * 1.2}
          icon={macd >= 0 ? <TrendingUp className="h-5 w-5" /> : <TrendingDown className="h-5 w-5" />}
        />
        <TechnicalIndicator
          title="Volume 24h"
          value={formatCurrency(volume24h, currency, eurRate)}
          change={(marketData?.price_change_percentage_24h || 0) * 0.8}
          icon={<BarChart3 className="h-5 w-5" />}
        />
        <TechnicalIndicator
          title="Volatility"
          value={`${volatility.toFixed(2)}%`}
          change={(marketData?.price_change_percentage_24h || 0) * 0.5}
          icon={<ArrowUpDown className="h-5 w-5" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl p-4 md:p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Price Chart
            </h2>
            <TimeframeSelector
              timeframe={timeframe}
              onTimeframeChange={setTimeframe}
            />
          </div>
          <PriceChart
            data={getCurrentChartData}
            currency={currency}
            currencySymbol={currency === 'USD' ? '$' : '€'}
          />
        </div>
        <div className="lg:col-span-1">
          <TechnicalAnalysis
            rsi={rsi}
            macd={macd}
            price={currentPrice}
            currency={currency}
            eurRate={eurRate}
          />
        </div>
      </div>
    </div>
  );
}

export default Overview;