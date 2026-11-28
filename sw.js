const CACHE_NAME = 'joussour-duty-v39';
const BOOKS_CACHE_NAME = 'joussour-books-v1';
const ASSETS = [
  './',
  './index.html',
  './style.css?v=39',
  './app.js?v=39',
  './blockblast.js?v=20',
  './snake.js?v=20',
  './candy.js?v=20',
  './prayers.js?v=20',
  './mushaf.js?v=38',
  './library.js?v=34',
  './books/covers/jalalayn.jpg?v=29',
  './books/covers/tariq_quran.jpg?v=30',
  './books/covers/qisas_anbiya.jpg?v=29',
  './books/covers/tadhkirat_sami.jpg?v=29',
  './books/covers/diwan_mutanabbi.jpg?v=29',
  './books/covers/hikam_ataiyya.jpg?v=26',
  './books/covers/tawba_ghazali.jpg?v=33',
  './books/covers/alwah_wa_dusur.jpg?v=26',
  './books/covers/bayt_bila_nawafidh.jpg?v=26',
  './books/covers/mazraat_al_hayawanat.jpg?v=28',
  './books/covers/heidi.jpg?v=31',
  './books/covers/mumtali_bil_faragh.jpg?v=32',
  './vendor/pdf.min.js?v=20',
  './vendor/pdf.worker.min.js?v=20',
  './manifest.json',
  './logo.png',
  './bg_hero_josour.jpg?v=35',
  './bg_zellige_tile.jpg?v=35',
  './bg_domes.jpg',
  './bg_muqarnas.jpg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS).catch(() => {});
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME && key !== BOOKS_CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
      await self.clients.claim();
      const windowClients = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
      for (const client of windowClients) {
        if ('navigate' in client && client.url) {
          client.navigate(client.url).catch(() => {});
        }
      }
    })()
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  const reqUrl = new URL(event.request.url);
  if (reqUrl.origin !== self.location.origin) return;
  if (reqUrl.pathname.endsWith('.mp3')) return;

  if (reqUrl.pathname.includes('/books/')) {
    event.respondWith(
      (async () => {
        const booksCache = await caches.open(BOOKS_CACHE_NAME);
        const cachedBook = (await booksCache.match(event.request)) || (await caches.match(event.request));
        if (cachedBook) {
          return cachedBook;
        }
        try {
          const networkResponse = await fetch(event.request);
          if (networkResponse && networkResponse.status === 200) {
            booksCache.put(event.request, networkResponse.clone()).catch(() => {});
          }
          return networkResponse;
        } catch (err) {
          return new Response('', { status: 503, statusText: 'Offline' });
        }
      })()
    );
    return;
  }

  event.respondWith(
    fetch(event.request, { cache: 'no-cache' })
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone).catch(() => {});
          });
        }
        return networkResponse;
      })
      .catch(() => {
        return caches.match(event.request).then((cachedResponse) => {
          return cachedResponse || caches.match('./index.html');
        });
      })
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow('./');
      }
    })
  );
});
