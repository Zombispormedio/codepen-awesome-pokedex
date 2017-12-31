import { connect } from "react-redux"
import * as R from "ramda"
import * as PokemonListContainer from "./PokemonList"
import * as PokemonLoadingSpinnerContainer from "./PokemonLoadingSpinner"
import * as PokemonLoadMoreContainer from "./PokemonLoadMore"

const wrap = ({ component, mapStateToProps, mapDispatchToProps }) =>
	connect(mapStateToProps, mapDispatchToProps)(component)

export const PokemonList = wrap(PokemonListContainer)

export const PokemonLoadingSpinner = wrap(PokemonLoadingSpinnerContainer)

export const PokemonLoadMore = wrap(PokemonLoadMoreContainer)
