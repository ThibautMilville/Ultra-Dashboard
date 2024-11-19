import React from 'react';
import { BarChart2, TrendingUp, ArrowUpDown, DollarSign } from 'lucide-react';

const Analytics: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
        <p className="mt-2 text-gray-600">Detailed analysis of Ultra ($UOS) network metrics and performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Total Value Locked</h3>
            <DollarSign className="h-5 w-5 text-primary-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">$24.5M</p>
          <p className="text-sm text-green-600">+5.3% from last month</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Daily Transactions</h3>
            <TrendingUp className="h-5 w-5 text-primary-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">156,234</p>
          <p className="text-sm text-green-600">+12.8% from yesterday</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Active Wallets</h3>
            <ArrowUpDown className="h-5 w-5 text-primary-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">45,892</p>
          <p className="text-sm text-green-600">+3.2% this week</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Network Growth</h3>
            <BarChart2 className="h-5 w-5 text-primary-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">+18.5%</p>
          <p className="text-sm text-green-600">Month over month</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Network Statistics</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Block Height</span>
              <span className="text-gray-900 font-medium">15,234,567</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Block Time</span>
              <span className="text-gray-900 font-medium">0.5 seconds</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Validators</span>
              <span className="text-gray-900 font-medium">21</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Network TPS</span>
              <span className="text-gray-900 font-medium">4,000</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Token Metrics</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Circulating Supply</span>
              <span className="text-gray-900 font-medium">304,793,462 UOS</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Supply</span>
              <span className="text-gray-900 font-medium">1,000,000,000 UOS</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Staked UOS</span>
              <span className="text-gray-900 font-medium">156,234,567 UOS</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Staking APY</span>
              <span className="text-gray-900 font-medium">12.5%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;