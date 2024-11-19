import type { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';

const API_KEY = process.env.VITE_COINGECKO_API_KEY || process.env.COINGECKO_API_KEY;

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  try {
    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/ultra`, {
      params: {
        localization: false,
        tickers: false,
        community_data: false,
        developer_data: false,
        sparkline: false
      },
      headers: {
        'x-cg-demo-api-key': API_KEY
      }
    });

    const marketData = {
      market_cap: response.data.market_data.market_cap.usd,
      total_volume: response.data.market_data.total_volume.usd,
      price_change_percentage_24h: response.data.market_data.price_change_percentage_24h,
      price_change_percentage_7d: response.data.market_data.price_change_percentage_7d,
      price_change_percentage_30d: response.data.market_data.price_change_percentage_30d,
      total_supply: response.data.market_data.total_supply,
      circulating_supply: response.data.market_data.circulating_supply
    };

    res.status(200).json(marketData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch market data' });
  }
}