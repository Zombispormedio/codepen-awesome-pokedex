import React, { Component } from "react"
import { LoadingSpinnerContainer } from "../../components"

export const component = class PokemonLoadingSpinner extends React.Component {
	render() {
		return this.props.loading ? (
			<LoadingSpinnerContainer>Loading...</LoadingSpinnerContainer>
		) : null
	}
}

export const mapStateToProps = ({ pokemon: { loading } }) => ({ loading })
