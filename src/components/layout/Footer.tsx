import React from 'react';
import { Github, Twitter, MessageCircle, Globe, Book, FileText } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12 pb-20 md:pb-0">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start mb-4">
              <img
                src="https://assets.coingecko.com/coins/images/4480/small/Ultra.png"
                alt="Ultra Logo"
                className="h-8 w-8 mr-2"
              />
              <span className="text-xl font-bold text-gray-900">Ultra</span>
            </div>
            <p className="text-gray-600 text-sm">
              Ultra is revolutionizing the gaming industry with its blockchain-powered gaming platform.
            </p>
          </div>
          
          <div className="text-center md:text-left">
            <h3 className="text-sm font-semibold text-gray-900 uppercase mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <a href="https://ultra.io" target="_blank" rel="noopener noreferrer" 
                   className="text-gray-600 hover:text-primary-600 inline-flex items-center justify-center md:justify-start">
                  <Globe className="h-4 w-4 mr-2" />
                  Website
                </a>
              </li>
              <li>
                <a href="https://developers.ultra.io/" target="_blank" rel="noopener noreferrer" 
                   className="text-gray-600 hover:text-primary-600 inline-flex items-center justify-center md:justify-start">
                  <Book className="h-4 w-4 mr-2" />
                  Docs
                </a>
              </li>
              <li>
                <a href="https://api.website.ultra.io/uploads/newest_Ultra_Whitepaper_1_75_1_8ac4a4ccd3.pdf" target="_blank" rel="noopener noreferrer" 
                   className="text-gray-600 hover:text-primary-600 inline-flex items-center justify-center md:justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Whitepaper
                </a>
              </li>
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h3 className="text-sm font-semibold text-gray-900 uppercase mb-4">Community</h3>
            <ul className="space-y-3">
              <li>
                <a href="https://discord.gg/Pz5amVKF" target="_blank" rel="noopener noreferrer" 
                   className="text-gray-600 hover:text-primary-600 inline-flex items-center justify-center md:justify-start">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Discord
                </a>
              </li>
              <li>
                <a href="https://twitter.com/ultra_io" target="_blank" rel="noopener noreferrer" 
                   className="text-gray-600 hover:text-primary-600 inline-flex items-center justify-center md:justify-start">
                  <Twitter className="h-4 w-4 mr-2" />
                  Twitter
                </a>
              </li>
              <li>
                <a href="https://github.com/ultra-alliance" target="_blank" rel="noopener noreferrer" 
                   className="text-gray-600 hover:text-primary-600 inline-flex items-center justify-center md:justify-start">
                  <Github className="h-4 w-4 mr-2" />
                  GitHub
                </a>
              </li>
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h3 className="text-sm font-semibold text-gray-900 uppercase mb-4">Markets</h3>
            <ul className="space-y-3">
              <li>
                <a href="https://www.coingecko.com/en/coins/ultra" target="_blank" rel="noopener noreferrer" 
                   className="text-gray-600 hover:text-primary-600">
                  CoinGecko
                </a>
              </li>
              <li>
                <a href="https://coinmarketcap.com/currencies/ultra/" target="_blank" rel="noopener noreferrer" 
                   className="text-gray-600 hover:text-primary-600">
                  CoinMarketCap
                </a>
              </li>
              <li>
                <a href="https://www.binance.com/en/trade/UOS_USDT" target="_blank" rel="noopener noreferrer" 
                   className="text-gray-600 hover:text-primary-600">
                  Binance
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col items-center md:flex-row md:justify-between">
            <p className="text-gray-500 text-sm text-center md:text-left">
              © {new Date().getFullYear()} Ultra Times. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="/privacy" className="text-gray-500 hover:text-primary-600 text-sm">
                Privacy Policy
              </a>
              <a href="/terms" className="text-gray-500 hover:text-primary-600 text-sm">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;