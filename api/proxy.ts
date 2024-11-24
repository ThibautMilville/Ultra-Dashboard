export default async function handler(req, res) {
  const token = process.env.ULTRA_TIMES_API_KEY;

  const response = await fetch('https://ultratimes.io/api/index.php/v1/content/articles', {
    method: req.method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(req.body),
  });

  const data = await response.json();
  res.status(response.status).json(data);
}
