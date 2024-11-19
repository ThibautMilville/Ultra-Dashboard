import type { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';

const API_KEY = process.env.VITE_COINGECKO_API_KEY || process.env.COINGECKO_API_KEY;

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
      params: {
        ids: 'ultra',
        vs_currencies: 'usd,eur',
        include_24hr_change: true
      },
      headers: {
        'x-cg-demo-api-key': API_KEY
      }
    });

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch price data' });
  }
}