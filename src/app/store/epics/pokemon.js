import { Observable } from "rxjs"
import {
	LOAD_POKEMON_LIST,
	LOAD_POKEMON_LIST_SUCCESS,
	LOAD_POKEMON_LIST_ERROR,
	CAPTURE_POKEMON,
	CAPTURE_POKEMON_SUCCESS,
	CAPTURE_POKEMON_ERROR
} from "../../actions"
import { getAvatarUrl, dbPromise, PAGE_SIZE, calcOffset } from "../../lib"
import * as R from "ramda"

export const loadPokemonListEpic = (action$, store) => {
	return action$.ofType(LOAD_POKEMON_LIST).mergeMap(() => {
		const { pokemon: { page } } = store.getState()
		const offset = calcOffset(page)
		return listPokemonFromCache(offset)
			.flatMap(result => {
				if (result.length > 0) return Observable.of(result)
				return listFromNetwork(offset)
			})
			.map(items => ({
				type: LOAD_POKEMON_LIST_SUCCESS,
				items
			}))
			.catch(() =>
				Rx.Observable.of({
					type: LOAD_POKEMON_LIST_ERROR
				})
			)
	})
}

const addProperties = item => {
	const id = Number(R.last(R.match(/\/([0-9]+)\//, item.url)))
	return R.merge(
		{
			id,
			captured: false,
			avatarUrl: getAvatarUrl(id)
		},
		item
	)
}
const mapResults = R.map(addProperties)

const saveResults = results => {
	dbPromise.then(function(db) {
		const tx = db.transaction("pokemon", "readwrite")
		const pokemonStore = tx.objectStore("pokemon")
		for (const p of results) {
			pokemonStore.put(p)
		}
		return tx.complete
	})
}

export const capturePokemonEpic = (action$, store) => {
	return action$.ofType(CAPTURE_POKEMON).mergeMap(({ id }) => {
		return Observable.fromPromise(updateCapturedPokemon(id)).mapTo({
			type: CAPTURE_POKEMON_SUCCESS,
			id
		})
	})
}

const updateCapturedPokemon = id => {
	return dbPromise.then(function(db) {
		const tx = db.transaction("pokemon", "readwrite")
		const pokemonStore = tx.objectStore("pokemon")
		return pokemonStore.get(id).then(result => {
			pokemonStore.put(R.evolve({ captured: R.not }, result))
		})
	})
}

const listPokemonFromCache = offset => {
	return Observable.create(function(observer) {
		const result = []
		dbPromise
			.then(function(db) {
				return db
					.transaction("pokemon")
					.objectStore("pokemon")
					.openCursor()
			})
			.then(function(cursor) {
				if (!cursor) return
				return offset > 0 ? cursor.advance(offset) : cursor
			})
			.then(function getPokemon(cursor) {
				if (!cursor) return
				result.push(cursor.value)
				if (result.length === PAGE_SIZE) return
				return cursor.continue().then(getPokemon)
			})
			.then(() => {
				observer.next(result)
				observer.complete()
			})
	})
}

const listFromNetwork = offset => {
	return Observable.ajax
		.getJSON(
			`https://pokeapi.co/api/v2/pokemon/?limit=${PAGE_SIZE}&offset=${offset}`
		)
		.map(response => mapResults(response.results))
		.do(items => saveResults(items))
}
