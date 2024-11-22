import type { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';

const API_KEY = process.env.VITE_COINGECKO_API_KEY || process.env.COINGECKO_API_KEY;

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

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
    console.error('CoinGecko API Error:', error);
    res.status(500).json({ error: 'Failed to fetch price data' });
  }
}