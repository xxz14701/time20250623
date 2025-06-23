self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open('v1').then(function (cache) {
      return cache.addAll([
        './',
        './index.html',
        './style.css',
        './main.js' // 如果有 JS 檔
      ]);
    })
  );
});

self.addEventListener('fetch', function (e) {
  e.respondWith(
    caches.match(e.request).then(function (response) {
      return response || fetch(e.request);
    })
  );
});
