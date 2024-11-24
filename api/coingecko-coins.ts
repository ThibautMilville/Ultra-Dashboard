import type { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';

const API_KEY = process.env.VITE_COINGECKO_API_KEY || process.env.COINGECKO_API_KEY;

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  try {
    const { id, localization, tickers, community_data, developer_data, sparkline } = req.query;

    if (!id) {
      return res.status(400).json({ error: 'Missing required parameter: id' });
    }

    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`, {
      params: {
        localization: localization === 'true',
        tickers: tickers === 'true',
        community_data: community_data === 'true',
        developer_data: developer_data === 'true',
        sparkline: sparkline === 'true'
      },
      headers: {
        'x-cg-demo-api-key': API_KEY
      }
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching coin data:', error);
    res.status(500).json({ error: 'Failed to fetch coin data' });
  }
}