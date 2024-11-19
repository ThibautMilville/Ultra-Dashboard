import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import axios from 'axios';
import NodeCache from 'node-cache';
import { createServer as createViteServer } from 'vite';

const __dirname = dirname(fileURLToPath(import.meta.url));
const cache = new NodeCache({ stdTTL: 30 }); // Cache for 30 seconds
const app = express();
const PORT = process.env.PORT || 3000;

// CoinGecko API configuration
const COINGECKO_BASE_URL = 'https://api.coingecko.com/api/v3';

app.use(cors());
app.use(express.json());

// Middleware to handle API rate limiting and caching
const cacheMiddleware = (key) => (req, res, next) => {
  const cachedData = cache.get(key);
  if (cachedData) {
    return res.json(cachedData);
  }
  next();
};

// Market data endpoint with caching
app.get('/api/market-data', cacheMiddleware('market-data'), async (req, res) => {
  try {
    const response = await axios.get(`${COINGECKO_BASE_URL}/coins/ultra`, {
      params: {
        localization: false,
        tickers: false,
        community_data: false,
        developer_data: false,
        sparkline: false
      },
      headers: {
        'x-cg-demo-api-key': COINGECKO_API_KEY
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

    cache.set('market-data', marketData);
    res.json(marketData);
  } catch (error) {
    console.error('Error fetching market data:', error);
    res.status(500).json({ error: 'Failed to fetch market data' });
  }
});

// Price endpoint with caching
app.get('/api/price', cacheMiddleware('price'), async (req, res) => {
  try {
    const response = await axios.get(`${COINGECKO_BASE_URL}/simple/price`, {
      params: {
        ids: 'ultra',
        vs_currencies: 'usd,eur',
        include_24hr_change: true
      },
      headers: {
        'x-cg-demo-api-key': COINGECKO_API_KEY
      }
    });

    cache.set('price', response.data);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching price:', error);
    res.status(500).json({ error: 'Failed to fetch price data' });
  }
});

// Exchange rate endpoint with caching
app.get('/api/exchange-rate', cacheMiddleware('exchange-rate'), async (req, res) => {
  try {
    const response = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
    cache.set('exchange-rate', response.data);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching exchange rate:', error);
    res.status(500).json({ error: 'Failed to fetch exchange rate data' });
  }
});

// Historical data endpoint with caching
app.get('/api/historical/:timeframe', cacheMiddleware('historical'), async (req, res) => {
  const { timeframe } = req.params;
  const days = {
    '1H': 1,
    '4H': 1,
    '1D': 1,
    '1W': 7
  }[timeframe] || 1;

  try {
    const response = await axios.get(`${COINGECKO_BASE_URL}/coins/ultra/market_chart`, {
      params: {
        vs_currency: 'usd',
        days: days,
        interval: timeframe === '1H' ? 'minute' : 'hour'
      },
      headers: {
        'x-cg-demo-api-key': COINGECKO_API_KEY
      }
    });

    cache.set('historical', response.data);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching historical data:', error);
    res.status(500).json({ error: 'Failed to fetch historical data' });
  }
});

// Create Vite server in middleware mode
const createViteDevServer = async () => {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa'
  });

  app.use(vite.middlewares);

  // Serve static files in production
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(join(__dirname, '../dist')));
  }

  return vite;
};

// Start the server
const startServer = async () => {
  try {
    await createViteDevServer();
    
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
};

startServer();