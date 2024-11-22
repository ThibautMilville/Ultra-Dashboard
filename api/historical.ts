import type { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';

const API_KEY = process.env.VITE_COINGECKO_API_KEY || process.env.COINGECKO_API_KEY;

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  const { timeframe } = req.query;
  const currency = (req.query.currency as string)?.toLowerCase() || 'usd';
  
  const days = {
    '1H': 1,
    '4H': 1,
    '1D': 1,
    '1W': 7,
    '1M': 30,
    '1Y': 365
  }[timeframe as string] || 1;

  const interval = timeframe === '1Y' ? 'daily' : timeframe === '1M' ? 'hourly' : 'minutely';

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/ultra/market_chart`, {
      params: {
        vs_currency: currency,
        days: days,
        interval: interval
      },
      headers: {
        'x-cg-demo-api-key': API_KEY
      }
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error('CoinGecko API Error:', error);
    res.status(500).json({ error: 'Failed to fetch historical data' });
  }
}