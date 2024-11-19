import React from 'react';

interface TechnicalIndicatorProps {
  title: string;
  value: string | number;
  change: number;
  icon: React.ReactNode;
}

const TechnicalIndicator: React.FC<TechnicalIndicatorProps> = ({
  title,
  value,
  change = 0,
  icon,
}) => {
  // Ensure change is a valid number
  const safeChange = isNaN(change) ? 0 : change;
  
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
        <div className="text-blue-600">{icon}</div>
      </div>
      <div className="flex items-end justify-between">
        <div>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
          <p className={`text-sm ${safeChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {safeChange >= 0 ? '+' : ''}{safeChange.toFixed(2)}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default TechnicalIndicator;