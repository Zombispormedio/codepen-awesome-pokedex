import React from "react"
import { List, ScrollView } from "../../components"
import {
	PokemonList,
	PokemonLoadingSpinner,
	PokemonLoadMore
} from "../../containers"

export const Pokedex = () => (
	<List view={ScrollView}>
		<PokemonList />
		<PokemonLoadingSpinner />
		<PokemonLoadMore />
	</List>
)
