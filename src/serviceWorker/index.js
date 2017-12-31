//import { CACHE_VERSION, IMAGES_CACHE_VERSION, IMAGES_PREFIX } from "./constants"
//import { assetsCachePromise } from "./assets"

const CACHE_VERSION = process.env.CACHE_NAME
const IMAGES_CACHE_VERSION = process.env.IMAGES_CACHE_NAME
const INBOUND_ASSETS_PATH = process.env.ASSETS_JSON_PATH
const DEFAULT_ASSETS = process.env.DEFAULT_ASSETS
const CACHE_IGNORED = process.env.CACHE_IGNORED
const IMAGES_PREFIX =
	"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"

self.addEventListener("install", function(event) {
	console.log("installation")
	//event.waitUntil(assetsCachePromise)
})

self.addEventListener("activate", function(event) {
	console.log("activation")
	event.waitUntil(
		caches.keys().then(function(cacheNames) {
			return Promise.all(
				cacheNames
					.filter(function(cacheName) {
						return cacheName.startsWith("cache-") && cacheName != CACHE_VERSION
					})
					.map(function(cacheName) {
						return caches.delete(cacheName)
					})
			)
		})
	)
})

self.addEventListener("fetch", function(event) {
	console.log("fetch")
	if (event.request.url.startsWith(IMAGES_PREFIX)) {
		event.respondWith(serveAvatar(event.request))
		return
	}

	event.respondWith(
		caches.match(event.request).then(function(response) {
			return response || fetch(event.request)
		})
	)
})

function serveAvatar(request) {
	var storageUrl = request.url

	return caches.open(IMAGES_CACHE_VERSION).then(function(cache) {
		return cache.match(storageUrl).then(function(response) {
			if (response) return response

			return fetch(request).then(function(networkResponse) {
				cache.put(storageUrl, networkResponse.clone())
				return networkResponse
			})
		})
	})
}
