// POST /api/visit — mark a subscriber as having opened the app today.
// Called on app open so the cron knows who has NOT logged in.
import { subId, getSub, saveSub, localParts, readBody, cors } from './_lib.js';

export default async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'method not allowed' });

  const body = await readBody(req);
  const { endpoint, tz, reminderTime } = body || {};
  if (!endpoint) return res.status(400).json({ error: 'missing endpoint' });

  try {
    const id = subId(endpoint);
    const rec = await getSub(id);
    if (!rec) return res.status(200).json({ ok: true, known: false });
    const tzMin = Number.isFinite(tz) ? tz : (rec.tz || 0);
    rec.tz = tzMin;
    if (reminderTime) rec.reminderTime = reminderTime;
    rec.lastVisit = localParts(tzMin).ymd;
    await saveSub(rec);
    res.status(200).json({ ok: true, known: true });
  } catch (e) {
    res.status(500).json({ error: 'storage error' });
  }
}
