import React from 'react';
import { Home, BookOpen, Users, BarChart2 } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <img
                className="h-8 w-8"
                src="https://assets.coingecko.com/coins/images/4480/small/Ultra.png"
                alt="Ultra Logo"
              />
              <span className="ml-2 text-xl font-bold text-gray-900">Ultra Dashboard</span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <a
                href="/"
                className="border-primary-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                <Home className="h-4 w-4 mr-2" />
                Overview
              </a>
              <a
                href="https://docs.ultra.io"
                target="_blank"
                rel="noopener noreferrer"
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Documentation
              </a>
              <a
                href="https://discord.com/invite/ultra"
                target="_blank"
                rel="noopener noreferrer"
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                <Users className="h-4 w-4 mr-2" />
                Community
              </a>
              <a
                href="/analytics"
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                <BarChart2 className="h-4 w-4 mr-2" />
                Analytics
              </a>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
            <a
              href="https://explorer.mainnet.ultra.io"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-primary-600 text-sm font-medium"
            >
              Mainnet
            </a>
            <a
              href="https://explorer.testnet.ultra.io"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-primary-600 text-sm font-medium"
            >
              Testnet
            </a>
            <button className="bg-primary-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
              Connect Wallet
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;