// Shared helpers for the Web Push reminder API (not routed — leading underscore).
import { kv } from '@vercel/kv';
import crypto from 'crypto';

export const SUBS_SET = 'subs';

export function subId(endpoint) {
  return crypto.createHash('sha1').update(endpoint).digest('hex');
}

export async function saveSub(rec) {
  const id = subId(rec.subscription.endpoint);
  await kv.set('sub:' + id, rec);
  await kv.sadd(SUBS_SET, id);
  return id;
}

export async function getSub(id) {
  return await kv.get('sub:' + id);
}

export async function delSub(id) {
  await kv.del('sub:' + id);
  await kv.srem(SUBS_SET, id);
}

export async function allSubIds() {
  return (await kv.smembers(SUBS_SET)) || [];
}

// Given a timezone offset in minutes (minutes to ADD to UTC to get local time),
// return the user's local calendar date (YYYY-MM-DD) and local hour (0-23).
export function localParts(tzMin) {
  const d = new Date(Date.now() + (Number(tzMin) || 0) * 60000);
  const p = (n) => String(n).padStart(2, '0');
  return {
    ymd: d.getUTCFullYear() + '-' + p(d.getUTCMonth() + 1) + '-' + p(d.getUTCDate()),
    hour: d.getUTCHours()
  };
}

// Parse a JSON body whether or not the platform pre-parsed it.
export async function readBody(req) {
  if (req.body) {
    return typeof req.body === 'string' ? safeParse(req.body) : req.body;
  }
  return await new Promise((resolve) => {
    let data = '';
    req.on('data', (c) => (data += c));
    req.on('end', () => resolve(safeParse(data || '{}')));
    req.on('error', () => resolve({}));
  });
}

function safeParse(s) {
  try { return JSON.parse(s); } catch (e) { return {}; }
}

export function cors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}
