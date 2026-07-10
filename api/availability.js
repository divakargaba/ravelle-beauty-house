import { Redis } from '@upstash/redis';

const BLOCKED_DATES_KEY = 'blocked-dates';

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
}

function getRedis() {
  return new Redis({
    url: process.env.KV_REST_API_URL,
    token: process.env.KV_REST_API_TOKEN,
  });
}

export default async function handler(req, res) {
  // CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(200, corsHeaders());
    return res.end();
  }

  Object.entries(corsHeaders()).forEach(([key, value]) => {
    res.setHeader(key, value);
  });

  try {
    const redis = getRedis();

    // GET — return blocked dates (public)
    if (req.method === 'GET') {
      const blockedDates = await redis.get(BLOCKED_DATES_KEY);
      return res.status(200).json({ blockedDates: blockedDates || [] });
    }

    // POST — add/remove blocked dates (password-protected)
    if (req.method === 'POST') {
      const { password, date, action } = req.body;

      if (!password || password !== process.env.ADMIN_PASSWORD) {
        return res.status(401).json({ error: 'Invalid password' });
      }

      if (!date || !action) {
        return res.status(400).json({ error: 'Missing date or action' });
      }

      const blockedDates = (await redis.get(BLOCKED_DATES_KEY)) || [];

      let updated;
      if (action === 'block') {
        if (!blockedDates.includes(date)) {
          updated = [...blockedDates, date];
        } else {
          updated = blockedDates;
        }
      } else if (action === 'unblock') {
        updated = blockedDates.filter((d) => d !== date);
      } else {
        return res.status(400).json({ error: 'Invalid action. Use "block" or "unblock".' });
      }

      await redis.set(BLOCKED_DATES_KEY, updated);
      return res.status(200).json({ blockedDates: updated });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Availability API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
