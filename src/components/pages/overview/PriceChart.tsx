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
    if (!chartContainerRef.current || data.length === 0) return;
  
    if (chartRef.current) {
      chartRef.current.remove();
      chartRef.current = null;
    }
  
    try {
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
  
      const lineSeries = chart.addLineSeries({
        color: '#6d28d9',
        lineWidth: 2,
        crosshairMarkerVisible: true,
        crosshairMarkerRadius: 4,
        priceFormat: {
          type: 'custom',
          formatter: (price: number) => `${currencySymbol}${price.toFixed(6)}`,
        },
      });
  
      const sortedData = [...data].sort((a, b) => a.time - b.time);
  
      const formattedData = sortedData.map(item => ({
        time: item.time, 
        value: item.value,
      }));
  
      lineSeries.setData(formattedData as any);
  
      chart.timeScale().fitContent();
  
      const resizeObserver = new ResizeObserver(entries => {
        if (entries.length === 0 || !chartRef.current) return;
  
        const newWidth = entries[0].contentRect.width;
        chartRef.current.applyOptions({ width: newWidth });
      });
  
      resizeObserver.observe(chartContainerRef.current);
      resizeObserverRef.current = resizeObserver;
  
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
  
  if (data.length === 0) {
    return (
      <div className="relative w-full h-[400px] flex items-center justify-center bg-white">
        <div className="text-gray-500">Loading chart data...</div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div ref={chartContainerRef} className="w-full h-[400px]" />
    </div>
  );
};

export default PriceChart;