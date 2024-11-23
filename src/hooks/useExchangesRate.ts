import { useState, useEffect } from 'react';
import axios from 'axios';

const CACHE_KEY = 'exchange_rate_cache';
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

interface CacheData {
  rate: number;
  timestamp: number;
}

export const useExchangeRate = () => {
  const [eurRate, setEurRate] = useState<number>(0.92); // Default fallback rate
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        // Check cache first
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const cacheData: CacheData = JSON.parse(cached);
          const isValid = Date.now() - cacheData.timestamp < CACHE_DURATION;
          
          if (isValid) {
            setEurRate(cacheData.rate);
            setLoading(false);
            return;
          }
        }

        // Fetch fresh rate if cache is invalid or missing
        const response = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
        const newRate = response.data.rates.EUR;
        
        // Update cache
        const cacheData: CacheData = {
          rate: newRate,
          timestamp: Date.now()
        };
        localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
        
        setEurRate(newRate);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch exchange rate:', err);
        setError('Failed to fetch exchange rate');
        // Keep using the default rate if there's an error
      } finally {
        setLoading(false);
      }
    };

    fetchExchangeRate();
  }, []);

  return { eurRate, loading, error };
};