import React, { Component } from "react"
import { loadPokemonList, capturePokemon } from "../../actions"
import { ListItem } from "../../components"

export const component = class PokemonList extends React.Component {
	componentDidMount() {
		this.props.loadMore()
	}
	render() {
		const length = this.props.items.length
		return this.props.items.map((item, i) => {
			return (
				<ListItem
					key={item.id}
					item={item}
					divider={i !== length - 1}
					capture={this.props.capture}
				/>
			)
		})
	}
}

export const mapStateToProps = ({ pokemon: { items } }) => ({ items })
export const mapDispatchToProps = dispatch => ({
	capture: id => dispatch(capturePokemon(id)),
	loadMore: () => dispatch(loadPokemonList())
})
