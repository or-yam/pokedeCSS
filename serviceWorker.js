const staticDevCoffee = 'pokedecss-v1';
const assets = [
  '/',
  '/index.html',
  '/style.css',
  '/main.js',
  'ballicon.webp',
  'icon512_maskable.png',
  'icon512_rounded.png'
];

self.addEventListener('install', (installEvent) => {
  installEvent.waitUntil(
    caches.open(staticDevCoffee).then((cache) => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener('fetch', (fetchEvent) => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then((res) => {
      return res || fetch(fetchEvent.request);
    })
  );
});
