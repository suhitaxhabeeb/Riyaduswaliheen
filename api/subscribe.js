// POST /api/subscribe — store (or refresh) a push subscription + reminder prefs.
import { saveSub, localParts, readBody, cors } from './_lib.js';

export default async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'method not allowed' });

  const body = await readBody(req);
  const { subscription, reminderTime, tz } = body || {};
  if (!subscription || !subscription.endpoint) {
    return res.status(400).json({ error: 'missing subscription' });
  }
  const tzMin = Number.isFinite(tz) ? tz : 0;
  const rec = {
    subscription,
    reminderTime: reminderTime || '08:00',
    tz: tzMin,
    lastVisit: localParts(tzMin).ymd,
    lastSent: null
  };
  try {
    await saveSub(rec);
    res.status(200).json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: 'storage error' });
  }
}
