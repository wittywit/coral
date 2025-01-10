const CACHE_NAME = "daily-flow-cache-v1";
const urlsToCache = [
    "./",
    "./index.html",
    "./style.css",
    "./script.js",
    "./media/phase1.mp3",
    "./media/phase2.mp3",
    "./media/phase3.mp3",
    "./media/phase4.mp3",
    "./icons/icon-192.png",
    "./icons/icon-512.png"
];

// Install the service worker and cache assets
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log("Opened cache");
            return cache.addAll(urlsToCache);
        })
    );
});

// Fetch resources from the cache or the network
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

// Update the service worker and delete old caches
self.addEventListener("activate", (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
