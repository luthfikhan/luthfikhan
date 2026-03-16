importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.3.0/workbox-sw.js');

if (workbox) {
  console.log(`Workbox berhasil dimuat`);

  const { precaching, routing, strategies, expiration } = workbox;

  const MAX_AGE_SECONDS = 24 * 60 * 60; // 1 day (86400 seconds)

  precaching.precacheAndRoute([
    {url: '/', revision: '1'},
  ]);

  // Cache HTML pages – serve stale while revalidating, expire after 1 day
  routing.registerRoute(
    ({ request }) => request.destination === 'document',
    new strategies.StaleWhileRevalidate({
      cacheName: 'pages-cache',
      plugins: [
        new expiration.ExpirationPlugin({
          maxAgeSeconds: MAX_AGE_SECONDS,
        }),
      ],
    })
  );

  // Cache CSS and JS – serve stale while revalidating, expire after 1 day
  routing.registerRoute(
    ({ request }) => request.destination === 'script' || request.destination === 'style',
    new strategies.StaleWhileRevalidate({
      cacheName: 'static-resources',
      plugins: [
        new expiration.ExpirationPlugin({
          maxAgeSeconds: MAX_AGE_SECONDS,
        }),
      ],
    })
  );

  // Cache images – cache-first, expire after 1 day, keep at most 50 entries
  routing.registerRoute(
    ({ request }) => request.destination === 'image',
    new strategies.CacheFirst({
      cacheName: 'images-cache',
      plugins: [
        new expiration.ExpirationPlugin({
          maxAgeSeconds: MAX_AGE_SECONDS,
          maxEntries: 50,
        }),
      ],
    })
  );
} else {
  console.log(`Workbox gagal dimuat`);
}
