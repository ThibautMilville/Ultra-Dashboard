import type { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';

const API_KEY = process.env.VITE_ULTRA_TIMES_API_KEY || process.env.ULTRA_TIMES_API_KEY;

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  const { page = 1 } = req.query;

  try {
    const response = await axios.get('https://ultratimes.io/api/index.php/v1/content/articles', {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Accept': 'application/json',
      },
      params: {
        'page[limit]': 9,
        'page[offset]': (Number(page) - 1) * 9
      }
    });

    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ error: 'Failed to fetch news articles' });
  }
}