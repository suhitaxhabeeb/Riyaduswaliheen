// GET /api/vapid — returns the public VAPID key for the client to subscribe with.
import { cors } from './_lib.js';

export default function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(204).end();
  res.status(200).json({ publicKey: process.env.VAPID_PUBLIC_KEY || '' });
}
