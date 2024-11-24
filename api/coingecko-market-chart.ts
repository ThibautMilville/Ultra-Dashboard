import type { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';

const API_KEY = process.env.VITE_COINGECKO_API_KEY || process.env.COINGECKO_API_KEY;

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  try {
    const { id, vs_currency, days } = req.query;

    if (!id || !vs_currency || !days) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart`, {
      params: {
        vs_currency,
        days,
      },
      headers: {
        'x-cg-demo-api-key': API_KEY
      }
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching market chart data:', error);
    res.status(500).json({ error: 'Failed to fetch market chart data' });
  }
}