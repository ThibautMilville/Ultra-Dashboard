import type { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';

const API_KEY = process.env.VITE_ULTRA_TIMES_API_KEY || process.env.ULTRA_TIMES_API_KEY;

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  try {
    // Get the limit and offset query parameters
    const { 'page[limit]': limit, 'page[offset]': offset } = req.query;

    if (!limit || !offset) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    const pageLimit = Number(limit);
    const pageOffset = Number(offset);

    const response = await axios.get('https://ultratimes.io/api/index.php/v1/content/articles', {
      params: {
        'page[limit]': pageLimit,
        'page[offset]': pageOffset,
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch articles' });
  }
}