// GET /api/cron — triggered daily by Vercel Cron. Sends a reminder to every
// subscriber who has not opened the app today (per their local date) and is
// past their chosen reminder hour. A lastSent guard prevents duplicates, so it
// is safe whether the cron runs once a day (Hobby) or hourly (Pro).
import webpush from 'web-push';
import { allSubIds, getSub, saveSub, delSub, localParts } from './_lib.js';

export default async function handler(req, res) {
  // Vercel Cron sends "Authorization: Bearer <CRON_SECRET>" when CRON_SECRET is set.
  const secret = process.env.CRON_SECRET;
  if (secret) {
    const auth = req.headers['authorization'] || '';
    if (auth !== 'Bearer ' + secret) return res.status(401).json({ error: 'unauthorized' });
  }

  const pub = process.env.VAPID_PUBLIC_KEY;
  const priv = process.env.VAPID_PRIVATE_KEY;
  if (!pub || !priv) return res.status(500).json({ error: 'VAPID keys not configured' });
  webpush.setVapidDetails(process.env.VAPID_SUBJECT || 'mailto:admin@example.com', pub, priv);

  const payload = JSON.stringify({
    title: 'Daily Dua',
    body: "You haven't opened your duas today — keep your streak alive 🔥",
    url: '/'
  });

  let sent = 0, skipped = 0, removed = 0;
  let ids = [];
  try { ids = await allSubIds(); } catch (e) { return res.status(500).json({ error: 'storage error' }); }

  for (const id of ids) {
    let rec;
    try { rec = await getSub(id); } catch (e) { skipped++; continue; }
    if (!rec || !rec.subscription) { await delSub(id); removed++; continue; }

    const { ymd, hour } = localParts(rec.tz || 0);
    const reminderHour = parseInt(String(rec.reminderTime || '08:00').split(':')[0], 10) || 8;
    const due = rec.lastVisit !== ymd && rec.lastSent !== ymd && hour >= reminderHour;
    if (!due) { skipped++; continue; }

    try {
      await webpush.sendNotification(rec.subscription, payload);
      rec.lastSent = ymd;
      await saveSub(rec);
      sent++;
    } catch (err) {
      if (err && (err.statusCode === 404 || err.statusCode === 410)) {
        await delSub(id);
        removed++;
      } else {
        skipped++;
      }
    }
  }

  res.status(200).json({ ok: true, total: ids.length, sent, skipped, removed });
}
