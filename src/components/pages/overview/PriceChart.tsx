import React, { useEffect, useRef } from 'react';
import { createChart, IChartApi } from 'lightweight-charts';

interface PriceChartProps {
  data: Array<{
    time: number;
    value: number;
  }>;
  currency: 'USD' | 'EUR';
  currencySymbol: string;
}

const PriceChart: React.FC<PriceChartProps> = ({ data, currency, currencySymbol }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    try {
      // Create chart instance
      const chart = createChart(chartContainerRef.current, {
        layout: {
          background: { color: 'transparent' },
          textColor: '#333',
        },
        grid: {
          vertLines: { color: '#e0e0e0' },
          horzLines: { color: '#e0e0e0' },
        },
        width: chartContainerRef.current.clientWidth,
        height: 400,
        rightPriceScale: {
          precision: 6,
          borderVisible: false,
        },
        timeScale: {
          borderVisible: false,
          timeVisible: true,
          secondsVisible: false,
        },
        crosshair: {
          mode: 1,
          vertLine: {
            width: 1,
            color: '#6d28d9',
            style: 3,
          },
          horzLine: {
            width: 1,
            color: '#6d28d9',
            style: 3,
          },
        },
      });

      chartRef.current = chart;

      // Add price series
      const lineSeries = chart.addLineSeries({
        color: '#6d28d9',
        lineWidth: 2,
        crosshairMarkerVisible: true,
        crosshairMarkerRadius: 4,
        priceFormat: {
          type: 'price',
          precision: 6,
          minMove: 0.000001,
          formatter: (price: number) => `${currencySymbol}${price.toFixed(6)}`,
        },
      });

      // Set data
      lineSeries.setData(data.map(item => ({
        ...item,
        time: Math.floor(item.time),
      })));

      // Handle resize with ResizeObserver
      const resizeObserver = new ResizeObserver(entries => {
        if (entries.length === 0 || !chartRef.current) return;
        
        const newWidth = entries[0].contentRect.width;
        chartRef.current.applyOptions({ width: newWidth });
      });

      resizeObserver.observe(chartContainerRef.current);
      resizeObserverRef.current = resizeObserver;

      // Cleanup function
      return () => {
        resizeObserver.disconnect();
        if (chartRef.current) {
          chartRef.current.remove();
          chartRef.current = null;
        }
      };
    } catch (error) {
      console.error('Error creating chart:', error);
      return undefined;
    }
  }, [data, currency, currencySymbol]);

  return (
    <div className="relative">
      <div ref={chartContainerRef} className="w-full h-[400px]" />
      {data.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50 bg-opacity-75">
          <p className="text-gray-500">No data available</p>
        </div>
      )}
    </div>
  );
};

export default PriceChart;