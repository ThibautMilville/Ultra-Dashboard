import React from 'react';
import { Home, BarChart2, Cpu, Coins } from 'lucide-react';

const Header: React.FC = () => {
  const isCurrentPath = (path: string) => {
    if (typeof window === 'undefined') return false;
    return window.location.pathname === path;
  };

  return (
    <>
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <a href="/" className="flex items-center hover:opacity-80 transition-opacity">
              <img
                className="h-8 w-8"
                src="https://assets.coingecko.com/coins/images/4480/small/Ultra.png"
                alt="Ultra Logo"
              />
              <span className="ml-2 text-xl font-bold text-gray-900">Ultra Dashboard</span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-8">
              <a 
                href="/" 
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${
                  isCurrentPath('/') 
                    ? 'border-primary-500 text-primary-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Home className="h-4 w-4 mr-2" />
                Overview
              </a>
              <a 
                href="/blockchain" 
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${
                  isCurrentPath('/blockchain') 
                    ? 'border-primary-500 text-primary-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Cpu className="h-4 w-4 mr-2" />
                Blockchain
              </a>
              <a 
                href="/tokenomics" 
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${
                  isCurrentPath('/tokenomics') 
                    ? 'border-primary-500 text-primary-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Coins className="h-4 w-4 mr-2" />
                Tokenomics
              </a>
              <a 
                href="/analytics" 
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${
                  isCurrentPath('/analytics') 
                    ? 'border-primary-500 text-primary-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <BarChart2 className="h-4 w-4 mr-2" />
                Analytics
              </a>
              <button className="bg-primary-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-700">
                Connect Wallet
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Navigation - Always visible at bottom */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="grid grid-cols-4 gap-1 p-2">
          <a 
            href="/" 
            className={`flex flex-col items-center justify-center p-2 transition-colors ${
              isCurrentPath('/') 
                ? 'text-primary-600 bg-primary-50' 
                : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
            }`}
          >
            <Home className="h-5 w-5" />
            <span className="text-xs mt-1">Overview</span>
            {isCurrentPath('/') && (
              <div className="absolute top-0 left-1/2 w-8 h-0.5 bg-primary-600 transform -translate-x-1/2" />
            )}
          </a>
          <a 
            href="/blockchain" 
            className={`flex flex-col items-center justify-center p-2 transition-colors ${
              isCurrentPath('/blockchain') 
                ? 'text-primary-600 bg-primary-50' 
                : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
            }`}
          >
            <Cpu className="h-5 w-5" />
            <span className="text-xs mt-1">Blockchain</span>
            {isCurrentPath('/blockchain') && (
              <div className="absolute top-0 left-1/2 w-8 h-0.5 bg-primary-600 transform -translate-x-1/2" />
            )}
          </a>
          <a 
            href="/tokenomics" 
            className={`flex flex-col items-center justify-center p-2 transition-colors ${
              isCurrentPath('/tokenomics') 
                ? 'text-primary-600 bg-primary-50' 
                : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
            }`}
          >
            <Coins className="h-5 w-5" />
            <span className="text-xs mt-1">Tokenomics</span>
            {isCurrentPath('/tokenomics') && (
              <div className="absolute top-0 left-1/2 w-8 h-0.5 bg-primary-600 transform -translate-x-1/2" />
            )}
          </a>
          <a 
            href="/analytics" 
            className={`flex flex-col items-center justify-center p-2 transition-colors ${
              isCurrentPath('/analytics') 
                ? 'text-primary-600 bg-primary-50' 
                : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
            }`}
          >
            <BarChart2 className="h-5 w-5" />
            <span className="text-xs mt-1">Analytics</span>
            {isCurrentPath('/analytics') && (
              <div className="absolute top-0 left-1/2 w-8 h-0.5 bg-primary-600 transform -translate-x-1/2" />
            )}
          </a>
        </div>
      </div>
    </>
  );
};

export default Header;