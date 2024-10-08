const CACHE = 'cache-only-v2';

// При установке воркера мы должны закешировать часть данных (статику).
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE).then((cache) => {
            return cache.addAll([
                '/music'
            ]);
        })
    );
});

// При запросе на сервер (событие fetch), используем только данные из кэша.
self.addEventListener('fetch', (event) =>
    event.respondWith(fromCache(event.request))
);

function fromCache(request) {
    return caches.open(CACHE).then((cache) =>
      cache.match(request)
          .then((matching) => matching || Promise.reject('no-match'))
    );
}