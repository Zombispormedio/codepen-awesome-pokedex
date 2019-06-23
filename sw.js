self.addEventListener("install", function(event) {
	event.waitUntil(
		fetch("sw.json")
			.then(res => res.json())
			.then(result => {
				self.environment = result
				return doAssetsCache()
			})
	)
})

self.addEventListener("activate", function(event) {
	event.waitUntil(
		caches.keys().then(function(cacheNames) {
			return Promise.all(
				cacheNames
					.filter(function(cacheName) {
						return (
							cacheName.startsWith("cache-") &&
							cacheName != self.environment.CACHE_NAME
						)
					})
					.map(function(cacheName) {
						return caches.delete(cacheName)
					})
			)
		})
	)
})

self.addEventListener("fetch", function(event) {
	if (event.request.url.startsWith(self.environment.IMAGES_PREFIX)) {
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

	return caches.open(self.environment.IMAGES_CACHE_NAME).then(function(cache) {
		return cache.match(storageUrl).then(function(response) {
			if (response) return response

			return fetch(request).then(function(networkResponse) {
				cache.put(storageUrl, networkResponse.clone())
				return networkResponse
			})
		})
	})
}

function doAssetsCache() {
	const {
		CACHE_NAME,
		DEFAULT_ASSETS,
		ASSETS_JSON_PATH,
		CACHE_IGNORED
	} = self.environment

	const inboundAssetsPromise = fetch(ASSETS_JSON_PATH).then(res => res.json())

	return Promise.all([inboundAssetsPromise, caches.open(CACHE_NAME)]).then(
		([inboundAssets, cache]) => {
			const inbound = inboundAssets
				.map(({ name }) => name)
				.filter(item => !CACHE_IGNORED.includes(item))
				.map(item => `/${item}`)
				.map(item => {
					if (item.startsWith("/assets/fonts")) {
						return `${item}?v=2.1.19`
					}
					return item
				})
			return cache.addAll([...DEFAULT_ASSETS, ...inbound])
		}
	)
}
