// POST /api/unsubscribe — remove a push subscription.
import { subId, delSub, readBody, cors } from './_lib.js';

export default async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'method not allowed' });

  const body = await readBody(req);
  const { endpoint } = body || {};
  if (!endpoint) return res.status(400).json({ error: 'missing endpoint' });
  try {
    await delSub(subId(endpoint));
    res.status(200).json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: 'storage error' });
  }
}
