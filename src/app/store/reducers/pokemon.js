import * as R from "ramda"
import {
	LOAD_POKEMON_LIST,
	LOAD_POKEMON_LIST_SUCCESS,
	LOAD_POKEMON_LIST_ERROR,
	CAPTURE_POKEMON,
	CAPTURE_POKEMON_SUCCESS,
	CAPTURE_POKEMON_ERROR
} from "../../actions"

const INITIAL_POKEMON = {
	loading: false,
	items: [],
	page: 0,
	error: false
}

const loadPokemonListReducer = (state, action) => ({
	...state,
	loading: true
})

const loadPokemonListSuccessReducer = (state, action) => ({
	...state,
	loading: false,
	items: state.items.concat(action.items),
	page: state.page + 1,
	error: false
})

const loadPokemonListErrorReducer = (state, action) => ({
	...state,
	loading: false,
	error: true
})

const capturePokemonSuccess = (state, { id }) => ({
	...state,
	items: R.adjust(R.evolve({ captured: R.not }))(
		R.findIndex(R.propEq("id", id), state.items),
		state.items
	)
})

export function pokemonReducers() {
	return this.create(INITIAL_POKEMON, {
		[LOAD_POKEMON_LIST]: loadPokemonListReducer,
		[LOAD_POKEMON_LIST_SUCCESS]: loadPokemonListSuccessReducer,
		[LOAD_POKEMON_LIST_ERROR]: loadPokemonListErrorReducer,
		[CAPTURE_POKEMON]: this.avoid(),
		[CAPTURE_POKEMON_SUCCESS]: capturePokemonSuccess,
		[CAPTURE_POKEMON_ERROR]: this.avoid()
	})
}
