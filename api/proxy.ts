import type { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';

const API_KEY = process.env.VITE_ULTRA_TIMES_API_KEY || process.env.ULTRA_TIMES_API_KEY;

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  try {
    const response = await axios.get('https://ultratimes.io/api/index.php/v1/content/articles', {
      params: {
        'page[limit]': 9,
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch price data' });
  }
}