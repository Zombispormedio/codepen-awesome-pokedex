const cacheVersion = 'cache-100';
const cacheContentImages = 'pokedex-content-imgs';

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(cacheVersion).then(function (cache) {
      return cache.addAll([
        '/',
        'https://unpkg.com/mdi@2.0.46/fonts/materialdesignicons-webfont.woff2?v=2.0.46',
        'https://unpkg.com/mdi@2.0.46/fonts/materialdesignicons-webfont.woff?v=2.0.46',
        'https://unpkg.com/mdi@2.0.46/fonts/materialdesignicons-webfont.ttf?v=2.0.46',
        'https://fonts.googleapis.com/css?family=VT323',
        'https://unpkg.com/mdi@2.0.46/css/materialdesignicons.min.css',
        'https://fonts.gstatic.com/s/vt323/v9/lo_L7yCDHYN9FAxvMCI1vQ.woff2',
        'favicon.ico',
        'vendor.bundle.js',
        'app.processed.js'
      ]);
    })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.filter(function (cacheName) {
          return cacheName.startsWith('cache-') &&
            ![cacheVersion, cacheContentImages].includes(cacheName);
        }).map(function (cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});
self.addEventListener('fetch', function (event) {
  
  if(event.request.url.startsWith('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/')){
    event.respondWith(serveAvatar(event.request));
    return;
  }
  
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
  );
});

 function serveAvatar(request) {
  var storageUrl = request.url

  return caches.open(cacheContentImages).then(function(cache) {
    return cache.match(storageUrl).then(function(response) {
      if (response) return response;

      return fetch(request).then(function(networkResponse) {
        cache.put(storageUrl, networkResponse.clone());
        return networkResponse;
      });
    });
  });
}