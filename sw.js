/* Daily Dua — service worker
   Handles the opt-in daily reminder. On supporting browsers (installed PWAs),
   Periodic Background Sync fires roughly once a day; if the user hasn't opened
   the app that calendar day, we show a gentle reminder. Notification clicks
   focus/open the app. There is no offline cache here by design — the page is
   tiny and always fetched fresh. */

const STATE_CACHE = 'dd-state-v1';

function localYMD(d) {
  d = d || new Date();
  const m = ('0' + (d.getMonth() + 1)).slice(-2);
  const day = ('0' + d.getDate()).slice(-2);
  return d.getFullYear() + '-' + m + '-' + day;
}

async function readState(key) {
  try {
    const c = await caches.open(STATE_CACHE);
    const r = await c.match('/_state/' + key);
    return r ? await r.text() : null;
  } catch (e) {
    return null;
  }
}

async function showReminder() {
  const lastVisit = await readState('lastVisit');
  const today = localYMD();
  // Only nudge if they haven't already opened the app today.
  if (lastVisit === today) return;
  await self.registration.showNotification('Daily Dua', {
    body: "You haven't opened your duas today — keep your streak alive 🔥",
    icon: './icon.svg',
    badge: './icon.svg',
    tag: 'daily-reminder',
    renotify: true
  });
}

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));

self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'daily-reminder') {
    event.waitUntil(showReminder());
  }
});

// Fallback: a one-off sync can also trigger the check.
self.addEventListener('sync', (event) => {
  if (event.tag === 'daily-reminder') {
    event.waitUntil(showReminder());
  }
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'test-reminder') {
    self.registration.showNotification('Daily Dua', {
      body: 'This is how your daily reminder will look 🤲',
      icon: './icon.svg',
      badge: './icon.svg',
      tag: 'dd-test'
    });
  }
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil((async () => {
    const all = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    for (const c of all) {
      if ('focus' in c) return c.focus();
    }
    if (self.clients.openWindow) return self.clients.openWindow('./index.html');
  })());
});
