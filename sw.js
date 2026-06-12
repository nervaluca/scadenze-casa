// sw.js – Service Worker
const CACHE = 'scadenze-v2';

self.addEventListener('install', e => {
  // Non facciamo cache aggressiva, solo skip waiting
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  // Passa tutto normalmente, niente cache forzata
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});

// Ricevi messaggi dall'app
self.addEventListener('message', e => {
  if (e.data?.type === 'CHECK_TASKS') {
    const tasks = e.data.tasks || [];
    tasks.forEach(t => {
      const d = Math.round((new Date(t.date + 'T00:00:00') - new Date()) / 86400000);
      const body = d === 0 ? 'Scade oggi!' : `Scade tra ${d} giorno${d > 1 ? 'i' : ''}`;
      self.registration.showNotification('⏰ ' + t.title, {
        body,
        icon: '/scadenze-casa/icons/icon-192.png',
        tag: 'task-' + t.id,
        renotify: false,
      });
    });
  }
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(clients.openWindow('/scadenze-casa/'));
});
