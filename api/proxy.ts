import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  const token = process.env.ULTRA_TIMES_API_KEY;

  // Add query parameters to the URL
  const url = new URL('https://ultratimes.io/api/index.php/v1/content/articles');
  Object.keys(req.query).forEach((key) => {
    const value = req.query[key];
    if (typeof value === 'string') {
      url.searchParams.append(key, value);
    } else if (Array.isArray(value)) {
      value.forEach((v) => url.searchParams.append(key, v));
    }
  });

  try {
    const response = await fetch(url.toString(), {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: req.method !== 'GET' && req.body ? JSON.stringify(req.body) : undefined,
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ error: 'Something went wrong', details: errorMessage });
  }
}