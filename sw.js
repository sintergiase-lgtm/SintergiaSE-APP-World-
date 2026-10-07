/* SintergiaSE APP — Service Worker anti-cache obsoleta */
'use strict';
const CACHE_VERSION = 'sintergiase-v2026-10-07-01';
const CACHE_NAME = CACHE_VERSION;

self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

function isBackend(url) {
  return url.pathname.indexOf('/functions/v1/') === 0 ||
         url.origin.indexOf('supabase.co') !== -1;
}

self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);

  if (request.method !== 'GET' || isBackend(url)) return;

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request, {cache: 'no-store'})
        .catch(() => caches.match('./').then(r => r || Response.error()))
    );
    return;
  }

  event.respondWith(
    fetch(request, {cache: 'no-store'})
      .catch(() => caches.match(request).then(r => r || Response.error()))
  );
});
