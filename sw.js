// sw.js – Service Worker
const CACHE = 'scadenze-v1';
const ASSETS = ['/', '/index.html'];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS))
  );
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
  // Network-first per Firebase, cache-first per assets statici
  if (e.request.url.includes('firebasedatabase') || e.request.url.includes('gstatic')) {
    e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
  } else {
    e.respondWith(
      caches.match(e.request).then(cached => cached || fetch(e.request).then(res => {
        const clone = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone));
        return res;
      }))
    );
  }
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
        icon: '/icons/icon-192.png',
        badge: '/icons/icon-72.png',
        tag: 'task-' + t.id,
        renotify: false,
      });
    });
  }
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(clients.openWindow('/'));
});
