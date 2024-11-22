import React from 'react';

interface TimeframeSelectorProps {
  timeframe: string;
  onTimeframeChange: (timeframe: '1Y' | '1M' | '1W' | '1D' | '4H' | '1H') => void;
}

const TimeframeSelector: React.FC<TimeframeSelectorProps> = ({ timeframe, onTimeframeChange }) => {
  const timeframes: { value: '1Y' | '1M' | '1W' | '1D' | '4H' | '1H'; label: string }[] = [
    { value: '1H', label: '1H' },
    { value: '4H', label: '4H' },
    { value: '1D', label: '1D' },
    { value: '1W', label: '1W' },
    { value: '1M', label: '1M' },
    { value: '1Y', label: '1Y' },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {timeframes.map((tf) => (
        <button
          key={tf.value}
          onClick={() => onTimeframeChange(tf.value)}
          className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
            timeframe === tf.value
              ? 'bg-primary-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {tf.label}
        </button>
      ))}
    </div>
  );
}

export default TimeframeSelector;