// public/sw.js
self.addEventListener('install', (e) => self.skipWaiting());
self.addEventListener('activate', (e) => self.clients.claim());
self.addEventListener('fetch', (e) => 
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request))
);
