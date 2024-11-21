import { useState, useEffect } from 'react';
import axios from 'axios';
import { TrendingUp, ArrowUpDown, Activity, BarChart3 } from 'lucide-react';
import PriceChart from '../components/PriceChart';
import TechnicalIndicator from '../components/TechnicalIndicator';
import TechnicalAnalysis from '../components/TechnicalAnalysis';
import TimeframeSelector from '../components/TimeframeSelector';
import CurrencyToggle from '../components/CurrencyToggle';
import ProjectDescription from '../components/ProjectDescription';

axios.defaults.headers.common['x-cg-demo-api-key'] = import.meta.env.VITE_COINGECKO_API_KEY;

function Overview() {
  const [price, setPrice] = useState<number>(0);
  const [priceChange, setPriceChange] = useState<number>(0);
  const [chartData, setChartData] = useState<Array<{ time: number; value: number }>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [timeframe, setTimeframe] = useState<string>('1D');
  const [currency, setCurrency] = useState<'USD' | 'EUR'>('USD');
  const [eurRate, setEurRate] = useState<number>(0.92);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const priceResponse = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ultra&vs_currencies=usd,eur&include_24hr_change=true', {
          params: {
            ids: 'ultra',
            vs_currencies: 'usd',
            include_24h_change: true
          }
        });

        if (!priceResponse.data?.ultra?.usd) {
          throw new Error('Invalid price data received');
        }

        const usdPrice = priceResponse.data.ultra.usd;
        const priceChangeValue = priceResponse.data.ultra.usd_24h_change;

        setPrice(usdPrice);
        setPriceChange(priceChangeValue);

        const now = Math.floor(Date.now() / 1000);
        const timeframeInSeconds = {
          '1H': 60 * 60,
          '4H': 4 * 60 * 60,
          '1D': 24 * 60 * 60,
          '1W': 7 * 24 * 60 * 60,
        }[timeframe];

        const dataPoints = 200;
        const interval = timeframeInSeconds ? timeframeInSeconds / dataPoints : 300;
        
        const data = Array.from({ length: dataPoints }, (_, i) => {
          const time = now - (dataPoints - 1 - i) * interval;
          const volatility = 0.1;
          const trend = Math.sin(i / 20) * volatility;
          const value = Number((usdPrice * (1 + trend)).toFixed(6));
          return { time, value };
        }).sort((a, b) => a.time - b.time);

        setChartData(data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [timeframe]);

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
              className={`text-sm font-medium ${
                priceChange >= 0 ? 'text-green-600' : 'text-red-600'
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