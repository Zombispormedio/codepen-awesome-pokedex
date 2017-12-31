import { pipe, pluck, contains, not } from "ramda"
import {
	CACHE_VERSION,
	INBOUND_ASSETS_PATH,
	DEFAULT_ASSETS,
	CACHE_IGNORED
} from "./constants"

const inboundAssetsPromise = fetch(INBOUND_ASSETS_PATH).then(res => res.json())

const IgnoredFilter = item => not(contains(item, CACHE_IGNORED))

const filterInboundAssets = inbound => {
	return inbound.filter(IgnoredFilter)
}

const mapToAbsolutePath = items => items.map(item => `/${item}`)

const resolveAssets = ({ inboundAssets = [], defaultAssets = [] }) => {
	const inbound = pipe(pluck("name"), filterInboundAssets, mapToAbsolutePath)(
		inboundAssets
	)
	return [...defaultAssets, ...inbound]
}

export const assetsCachePromise = Promise.all([
	inboundAssetsPromise,
	caches.open(CACHE_VERSION)
]).then(function([inboundAssets, cache]) {
	const assets = resolveAssets({ inboundAssets, DEFAULT_ASSETS })
	return cache.addAll(assets)
})
