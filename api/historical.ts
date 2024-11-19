import type { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  const { timeframe } = req.query;
  const days = {
    '1H': 1,
    '4H': 1,
    '1D': 1,
    '1W': 7
  }[timeframe as string] || 1;

  try {
    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/ultra/market_chart`, {
      params: {
        vs_currency: 'usd',
        days: days,
        interval: timeframe === '1H' ? 'minute' : 'hour'
      },
      headers: {
        'x-cg-demo-api-key': process.env.COINGECKO_API_KEY
      }
    });

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch historical data' });
  }
}