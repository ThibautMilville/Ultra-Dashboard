import React, { useState, useEffect } from 'react';
import { Info, X } from 'lucide-react';

const ProjectDescription: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const storedVisibility = localStorage.getItem('dashboardDescriptionVisible');
    if (storedVisibility !== null) {
      setIsVisible(storedVisibility === 'true');
    }
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      localStorage.setItem('dashboardDescriptionVisible', 'false');
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <div 
      className={`bg-white rounded-xl p-6 shadow-sm mb-8 transform transition-all duration-300 ease-in-out ${
        isClosing ? 'opacity-0 -translate-y-4' : 'opacity-100 translate-y-0'
      }`}
    >
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <Info className="h-6 w-6 text-primary-600" />
        </div>
        <div className="flex-grow">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">About This Dashboard</h2>
          <p className="text-gray-600">
            Welcome to the UOS Analytics Dashboard, a comprehensive tool for tracking and analyzing the Ultra ($UOS) token performance. 
            This dashboard provides real-time price data, technical indicators, and market analysis to help you make informed decisions. 
            Features include RSI and MACD indicators, volume tracking, and detailed price charts with multiple timeframe options.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="px-2 py-1 bg-primary-100 text-primary-700 rounded-md text-sm">Real-time Data</span>
            <span className="px-2 py-1 bg-primary-100 text-primary-700 rounded-md text-sm">Technical Analysis</span>
            <span className="px-2 py-1 bg-primary-100 text-primary-700 rounded-md text-sm">Multiple Timeframes</span>
            <span className="px-2 py-1 bg-primary-100 text-primary-700 rounded-md text-sm">USD/EUR Support</span>
          </div>
        </div>
        <button
          onClick={handleClose}
          className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close description"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default ProjectDescription;