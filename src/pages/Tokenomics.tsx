import React from 'react';
import { PieChart, BarChart2, Coins, TrendingUp } from 'lucide-react';

const MetricCard: React.FC<{ title: string; value: string; icon: React.ReactNode }> = ({ title, value, icon }) => (
  <div className="bg-white rounded-xl p-6 shadow-sm">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-medium text-gray-900">{title}</h3>
      <div className="text-primary-600">{icon}</div>
    </div>
    <p className="text-2xl font-bold text-gray-900">{value}</p>
  </div>
);

function Tokenomics() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">UOS Token Economics</h1>
        <p className="text-lg text-gray-600">
          Comprehensive overview of Ultra's token distribution, utility, and economic model.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <MetricCard
          title="Total Supply"
          value="1,000,000,000 UOS"
          icon={<Coins className="h-6 w-6" />}
        />
        <MetricCard
          title="Circulating Supply"
          value="304,493,165 UOS"
          icon={<PieChart className="h-6 w-6" />}
        />
        <MetricCard
          title="Market Cap"
          value="$76,123,291"
          icon={<BarChart2 className="h-6 w-6" />}
        />
        <MetricCard
          title="Staking APY"
          value="12.5%"
          icon={<TrendingUp className="h-6 w-6" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Token Distribution</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Team & Advisors</span>
              <span className="font-medium text-gray-900">20%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-primary-600 h-2.5 rounded-full" style={{ width: '20%' }}></div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Public Sale</span>
              <span className="font-medium text-gray-900">30%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-primary-600 h-2.5 rounded-full" style={{ width: '30%' }}></div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Ecosystem & Development</span>
              <span className="font-medium text-gray-900">25%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-primary-600 h-2.5 rounded-full" style={{ width: '25%' }}></div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Reserve</span>
              <span className="font-medium text-gray-900">15%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-primary-600 h-2.5 rounded-full" style={{ width: '15%' }}></div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Marketing & Partnerships</span>
              <span className="font-medium text-gray-900">10%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-primary-600 h-2.5 rounded-full" style={{ width: '10%' }}></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Token Utility</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Governance</h3>
              <p className="text-gray-600">
                UOS holders can participate in protocol governance by voting on proposals and network upgrades.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Platform Fees</h3>
              <p className="text-gray-600">
                Used for transaction fees, game purchases, and platform services within the Ultra ecosystem.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Staking Rewards</h3>
              <p className="text-gray-600">
                Stake UOS tokens to earn rewards and participate in network security.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">NFT Trading</h3>
              <p className="text-gray-600">
                Required for minting, trading, and managing NFTs on the Ultra platform.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Vesting Schedule</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Allocation
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vesting Period
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cliff
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Release Schedule
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Team & Advisors</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">36 months</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">12 months</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">Linear monthly</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Public Sale</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">None</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">None</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">Immediate</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Ecosystem</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">48 months</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">6 months</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">Linear monthly</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Tokenomics;