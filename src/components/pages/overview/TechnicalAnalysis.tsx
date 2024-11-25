import React from 'react';
import { AlertCircle } from 'lucide-react';
import { formatCurrency } from '../../../utils/formatters';

interface TechnicalAnalysisProps {
  rsi: number;
  macd: number;
  price: number;
  currency: 'USD' | 'EUR';
  eurRate: number;
}

const TechnicalAnalysis: React.FC<TechnicalAnalysisProps> = ({ rsi, macd, price, currency, eurRate }) => {
  const getRSIInterpretation = (value: number) => {
    if (value >= 70) return { message: 'Overbought - Consider taking profits', type: 'warning' };
    if (value <= 30) return { message: 'Oversold - Potential buying opportunity', type: 'success' };
    return { message: 'Neutral market conditions', type: 'neutral' };
  };

  const getMACDInterpretation = (value: number) => {
    if (value > 0) return { message: 'Bullish momentum building', type: 'success' };
    if (value < 0) return { message: 'Bearish pressure present', type: 'warning' };
    return { message: 'Neutral momentum', type: 'neutral' };
  };

  const rsiAnalysis = getRSIInterpretation(rsi);
  const macdAnalysis = getMACDInterpretation(macd);

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <AlertCircle className="h-5 w-5 text-primary-600" />
        <h2 className="text-lg font-semibold text-gray-900">Technical Analysis</h2>
      </div>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">RSI Analysis</h3>
          <p className={`text-sm ${
            rsiAnalysis.type === 'warning' ? 'text-orange-600' :
            rsiAnalysis.type === 'success' ? 'text-green-600' :
            'text-gray-600'
          }`}>
            {rsiAnalysis.message}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">MACD Signal</h3>
          <p className={`text-sm ${
            macdAnalysis.type === 'warning' ? 'text-orange-600' :
            macdAnalysis.type === 'success' ? 'text-green-600' :
            'text-gray-600'
          }`}>
            {macdAnalysis.message}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">Price Action</h3>
          <p className="text-sm text-gray-600">
            Current price zone: {formatCurrency(price, currency, eurRate, { decimals: 2 })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TechnicalAnalysis;