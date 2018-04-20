let cacheName = "v2";

//Add install listener. First time and cacheName(changed) will trigger install action.
this.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('v1').then(function(cache) {
            return cache.addAll([
                './index.html',
                './build/index.build.js',
                './img/98k.jpg',
                './img/awm.jpg',
                './img/m24.jpg',
                './img/m249.jpg',
                './img/mini14.jpg',
                './img/mk14.jpg',
                './img/sks.jpg',
            ])
            .then(() => {
                return self.skipWaiting();
            })
            .catch((error) =>  {
                console.error('Failed to cache', error);
            });
        })
    );
});

//Adding fetch listener
self.addEventListener('fetch', (event) => {

    let request = event.request;

    //Tell the browser to wait for newtwork request and respond with below
    event.respondWith(
        //return cache
        caches.match(request).then((response) => {
            if (response) {
                return response;
            }

            //return fetch , add it to cache.
            return fetch(request).then((response) => {
                let responseToCache = response.clone();
                caches.open(cacheName).then((cache) => {
                    cache.put(request, responseToCache).catch((err) => {
                        console.warn(request.url + ': ' + err.message);
                    });
                });
                return response;
            });
        })
    );
});

//Adding activate listener.
self.addEventListener('activate', (event) => {

    //delete the old cache
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== cacheName) {
                        return caches.delete(cache);
                    }
                })
            );
        })
            .then(function () {
                return self.clients.claim();
            })
    );
});