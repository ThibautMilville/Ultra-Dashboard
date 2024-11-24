import type { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';

const API_KEY = process.env.VITE_COINGECKO_API_KEY || process.env.COINGECKO_API_KEY;

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  try {
    const { ids, vs_currencies, include_24hr_change } = req.query;

    if (!ids || !vs_currencies) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
      params: {
        ids,
        vs_currencies,
        include_24hr_change: include_24hr_change === 'true'
      },
      headers: {
        'x-cg-demo-api-key': API_KEY
      }
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching price data:', error);
    res.status(500).json({ error: 'Failed to fetch price data' });
  }
}