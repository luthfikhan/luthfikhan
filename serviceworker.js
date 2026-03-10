importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.3.0/workbox-sw.js');

if (workbox) {
  console.log(`Workbox berhasil dimuat`);
  
  workbox.precaching.precacheAndRoute([
    {url: '/', revision: '1'},
  ]);
} else {
  console.log(`Workbox gagal dimuat`);
}
