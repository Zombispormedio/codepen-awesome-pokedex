import { CAPTURE_POKEMON, LOAD_POKEMON_LIST } from "./actionTypes"

export const loadPokemonList = () => ({
	type: LOAD_POKEMON_LIST
})

export const capturePokemon = id => ({
	type: CAPTURE_POKEMON,
	id
})
