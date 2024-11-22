import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { TrendingUp, ArrowUpDown, Activity, BarChart3 } from 'lucide-react';
import PriceChart from '../components/pages/overview/PriceChart';
import TechnicalIndicator from '../components/pages/overview/TechnicalIndicator';
import TechnicalAnalysis from '../components/pages/overview/TechnicalAnalysis';
import TimeframeSelector from '../components/common/TimeframeSelector';
import CurrencyToggle from '../components/common/CurrencyToggle';
import ProjectDescription from '../components/pages/overview/ProjectDescription';

function Overview() {
  const [price, setPrice] = useState<number>(0);
  const [priceChange, setPriceChange] = useState<number>(0);
  const [chartData, setChartData] = useState<Array<{ time: number; value: number }>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [timeframe, setTimeframe] = useState<string>('1D');
  const [currency, setCurrency] = useState<'USD' | 'EUR'>('USD');
  const [eurRate, setEurRate] = useState<number>(0.92);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const API_KEY = import.meta.env.VITE_COINGECKO_API_KEY;

  const fetchPriceData = async () => {
    try {
      const priceResponse = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
        params: {
          ids: 'ultra',
          vs_currencies: 'usd,eur',
          include_24hr_change: true
        },
        headers: {
          'x-cg-demo-api-key': API_KEY
        }
      });

      if (!priceResponse.data?.ultra?.usd) {
        throw new Error('Invalid price data received');
      }

      const usdPrice = priceResponse.data.ultra.usd;
      const priceChangeValue = priceResponse.data.ultra.usd_24h_change;
      const eurRateValue = priceResponse.data.ultra.eur / usdPrice;

      setPrice(usdPrice);
      setPriceChange(priceChangeValue);
      setEurRate(eurRateValue);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      throw err;
    }
  };

  const fetchChartData = async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();

    try {
      const days = {
        '1H': 1,
        '4H': 1,
        '1D': 1,
        '1W': 7,
      }[timeframe] || 1;

      const response = await axios.get(`https://api.coingecko.com/api/v3/coins/ultra/market_chart`, {
        params: {
          vs_currency: currency.toLowerCase(),
          days: days,
        },
        headers: {
          'x-cg-demo-api-key': API_KEY
        },
        signal: abortControllerRef.current.signal
      });

      const prices = response.data.prices.map((item: [number, number]) => ({
        time: item[0] / 1000,
        value: item[1]
      }));

      setChartData(prices);
    } catch (err) {
      if (!axios.isCancel(err)) {
        setError('Failed to fetch chart data');
        console.error('Error fetching chart data:', err);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        await fetchPriceData();
        await fetchChartData();
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
  }, [currency, timeframe]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center px-4">
          <p className="text-red-600 mb-4">{error}</p>
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

  const currentPrice = currency === 'USD' ? price : price * eurRate;
  const currencySymbol = currency === 'USD' ? '$' : '€';
  const rsi = Math.round(50 + priceChange * 2);
  const macd = price * 0.01;

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
              {currencySymbol}
              {currentPrice.toFixed(6)}
            </p>
            <p
              className={`text-sm font-medium ${priceChange >= 0 ? 'text-green-600' : 'text-red-600'
                }`}
            >
              {priceChange >= 0 ? '↑' : '↓'}{' '}
              {Math.abs(priceChange).toFixed(2)}%
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <TechnicalIndicator
          title="RSI (14)"
          value={rsi}
          change={priceChange}
          icon={<Activity className="h-5 w-5" />}
        />
        <TechnicalIndicator
          title="MACD"
          value={macd.toFixed(6)}
          change={priceChange * 1.2}
          icon={<TrendingUp className="h-5 w-5" />}
        />
        <TechnicalIndicator
          title="Volume 24h"
          value={`${currencySymbol}${(
            currentPrice * 1234567
          ).toLocaleString()}`}
          change={priceChange * 0.8}
          icon={<BarChart3 className="h-5 w-5" />}
        />
        <TechnicalIndicator
          title="Volatility"
          value={`${Math.abs(priceChange * 0.4).toFixed(2)}%`}
          change={priceChange * 0.5}
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
            data={chartData}
            currency={currency}
            currencySymbol={currencySymbol}
          />
        </div>
        <div className="lg:col-span-1">
          <TechnicalAnalysis
            rsi={rsi}
            macd={macd}
            price={currentPrice}
            currency={currency}
          />
        </div>
      </div>
    </div>
  );
}

export default Overview;