import React, { useEffect, useState } from 'react';
import { BarChart2, TrendingUp, ArrowUpDown, DollarSign, Activity } from 'lucide-react';
import { createChart } from 'lightweight-charts';
import axios from 'axios';

interface MarketData {
  market_cap: number;
  total_volume: number;
  price_change_percentage_24h: number;
  price_change_percentage_7d: number;
  price_change_percentage_30d: number;
  total_supply: number;
  circulating_supply: number;
}

const Analytics: React.FC = () => {
  const [marketData, setMarketData] = useState<MarketData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const response = await axios.get('/api/market-data');
        setMarketData(response.data);
      } catch (error) {
        console.error('Error fetching market data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMarketData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
        <p className="mt-2 text-gray-600">Detailed analysis of Ultra ($UOS) network metrics and performance</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Market Cap</h3>
            <DollarSign className="h-5 w-5 text-primary-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">
            ${marketData?.market_cap.toLocaleString()}
          </p>
          <p className={`text-sm ${marketData?.price_change_percentage_24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {marketData?.price_change_percentage_24h.toFixed(2)}% (24h)
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Volume (24h)</h3>
            <Activity className="h-5 w-5 text-primary-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">
            ${marketData?.total_volume.toLocaleString()}
          </p>
          <p className="text-sm text-gray-600">
            {((marketData?.total_volume || 0) / (marketData?.market_cap || 1) * 100).toFixed(2)}% of Market Cap
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Supply Ratio</h3>
            <ArrowUpDown className="h-5 w-5 text-primary-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {((marketData?.circulating_supply || 0) / (marketData?.total_supply || 1) * 100).toFixed(2)}%
          </p>
          <p className="text-sm text-gray-600">
            Circulating/Total Supply
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Price Change</h3>
            <TrendingUp className="h-5 w-5 text-primary-600" />
          </div>
          <p className={`text-2xl font-bold ${marketData?.price_change_percentage_7d >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {marketData?.price_change_percentage_7d.toFixed(2)}%
          </p>
          <p className="text-sm text-gray-600">Last 7 days</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-6">Price Performance</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">24h Change</span>
              <span className={`font-medium ${marketData?.price_change_percentage_24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {marketData?.price_change_percentage_24h.toFixed(2)}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">7d Change</span>
              <span className={`font-medium ${marketData?.price_change_percentage_7d >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {marketData?.price_change_percentage_7d.toFixed(2)}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">30d Change</span>
              <span className={`font-medium ${marketData?.price_change_percentage_30d >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {marketData?.price_change_percentage_30d.toFixed(2)}%
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-6">Supply Metrics</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Circulating Supply</span>
              <span className="font-medium text-gray-900">
                {marketData?.circulating_supply.toLocaleString()} UOS
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Supply</span>
              <span className="font-medium text-gray-900">
                {marketData?.total_supply.toLocaleString()} UOS
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Supply Ratio</span>
              <span className="font-medium text-gray-900">
                {((marketData?.circulating_supply || 0) / (marketData?.total_supply || 1) * 100).toFixed(2)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-6">Market Activity</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Market Cap Rank</span>
              <span className="font-medium text-gray-900">#-</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Volume/Market Cap</span>
              <span className="font-medium text-gray-900">
                {((marketData?.total_volume || 0) / (marketData?.market_cap || 1)).toFixed(4)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">All-Time High</span>
              <span className="font-medium text-gray-900">$-</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">All-Time Low</span>
              <span className="font-medium text-gray-900">$-</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;