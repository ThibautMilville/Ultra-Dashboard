import type { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';

const API_KEY = process.env.VITE_ULTRA_TIMES_API_KEY || process.env.ULTRA_TIMES_API_KEY;

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!API_KEY) {
    return res.status(500).json({ error: 'Server configuration error: missing API key' });
  }

  try {
    const response = await axios.get(
      'https://ultratimes.io/api/index.php/v1/content/categories',
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    return res.status(200).json(response.data);
  } catch (error: any) {
    const status = error.response?.status || 500;
    const message = error.response?.data?.error || 'Failed to fetch categories';

    console.error('Error fetching categories:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    });

    return res.status(status).json({ error: message });
  }
}