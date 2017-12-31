import React, { Component } from "react"
import { LoadMoreContainer, LoadMoreButton } from "../../components"
import { loadPokemonList } from "../../actions"

export const component = class PokemonLoadMore extends React.Component {
	render() {
		return !this.props.loading ? (
			<LoadMoreContainer>
				<LoadMoreButton onClick={this.props.loadMore}>
					{this.props.error ? "Something happens... Retry?" : "Load More"}
				</LoadMoreButton>
			</LoadMoreContainer>
		) : null
	}
}

export const mapStateToProps = ({ pokemon: { loading, error } }) => ({
	loading,
	error
})

export const mapDispatchToProps = dispatch => ({
	loadMore: () => dispatch(loadPokemonList())
})
