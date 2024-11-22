import React from 'react';
import { DollarSign, Euro } from 'lucide-react';

interface CurrencyToggleProps {
  currency: 'USD' | 'EUR';
  onCurrencyChange: (currency: 'USD' | 'EUR') => void;
}

const CurrencyToggle: React.FC<CurrencyToggleProps> = ({ currency, onCurrencyChange }) => {
  return (
    <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
      <button
        onClick={() => onCurrencyChange('USD')}
        className={`flex items-center space-x-1 px-3 py-1 rounded-md transition-colors ${
          currency === 'USD'
            ? 'bg-primary-600 text-white'
            : 'text-gray-600 hover:bg-gray-200'
        }`}
      >
        <DollarSign className="h-4 w-4" />
        <span>USD</span>
      </button>
      <button
        onClick={() => onCurrencyChange('EUR')}
        className={`flex items-center space-x-1 px-3 py-1 rounded-md transition-colors ${
          currency === 'EUR'
            ? 'bg-primary-600 text-white'
            : 'text-gray-600 hover:bg-gray-200'
        }`}
      >
        <Euro className="h-4 w-4" />
        <span>EUR</span>
      </button>
    </div>
  );
};

export default CurrencyToggle;