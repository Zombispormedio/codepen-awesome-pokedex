const IgnoredFilter = item => !self.environment.CACHE_IGNORED.includes(item)

const resolveAssets = ({ inboundAssets = [], defaultAssets = [] }) => {
	const inbound = inboundAssets
		.map(({ name }) => name)
		.filter(IgnoredFilter)
		.map(item => `/${item}`)
		.map(item => {
			if (item.startsWith("/assets/fonts")) {
				return `${item}?v=2.1.19`
			}
			return item
		})
	return [...defaultAssets, ...inbound]
}

const inboundAssetsPromise = () =>
	fetch(self.environment.ASSETS_JSON_PATH).then(res => res.json())

const doAssetsCache = function() {
	const { CACHE_NAME, DEFAULT_ASSETS } = self.environment
	return Promise.all([inboundAssetsPromise(), caches.open(CACHE_NAME)]).then(
		function([inboundAssets, cache]) {
			const assets = resolveAssets({
				inboundAssets,
				defaultAssets: DEFAULT_ASSETS
			})
			return cache.addAll(assets)
		}
	)
}

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
