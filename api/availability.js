import { Redis } from '@upstash/redis';

const BLOCKED_DATES_KEY = 'blocked-dates';
const BLOCKED_TIMES_KEY = 'blocked-times';

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

    // GET — return blocked dates and blocked times (public)
    if (req.method === 'GET') {
      const [blockedDates, blockedTimes] = await Promise.all([
        redis.get(BLOCKED_DATES_KEY),
        redis.get(BLOCKED_TIMES_KEY),
      ]);
      return res.status(200).json({
        blockedDates: blockedDates || [],
        blockedTimes: blockedTimes || {},
      });
    }

    // POST — add/remove blocked dates or times (password-protected)
    if (req.method === 'POST') {
      const { password, date, action, time } = req.body;

      if (!password || password !== process.env.ADMIN_PASSWORD) {
        return res.status(401).json({ error: 'Invalid password' });
      }

      if (!date || !action) {
        return res.status(400).json({ error: 'Missing date or action' });
      }

      // Time-level blocking
      if (time) {
        const blockedTimes = (await redis.get(BLOCKED_TIMES_KEY)) || {};
        const slotsForDate = blockedTimes[date] || [];

        let updatedSlots;
        if (action === 'block') {
          if (!slotsForDate.includes(time)) {
            updatedSlots = [...slotsForDate, time];
          } else {
            updatedSlots = slotsForDate;
          }
        } else if (action === 'unblock') {
          updatedSlots = slotsForDate.filter((t) => t !== time);
        } else {
          return res.status(400).json({ error: 'Invalid action. Use "block" or "unblock".' });
        }

        let updatedTimes;
        if (updatedSlots.length === 0) {
          const { [date]: _, ...rest } = blockedTimes;
          updatedTimes = rest;
        } else {
          updatedTimes = { ...blockedTimes, [date]: updatedSlots };
        }

        await redis.set(BLOCKED_TIMES_KEY, updatedTimes);

        const blockedDates = (await redis.get(BLOCKED_DATES_KEY)) || [];
        return res.status(200).json({ blockedDates, blockedTimes: updatedTimes });
      }

      // Full-date blocking (existing behavior)
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

      const blockedTimes = (await redis.get(BLOCKED_TIMES_KEY)) || {};
      return res.status(200).json({ blockedDates: updated, blockedTimes });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Availability API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
