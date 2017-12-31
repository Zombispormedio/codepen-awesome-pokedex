import React from "react"
import { Toolbar } from "../Toolbar"
import { PokeIcon } from "../Icon"
import { TitleText } from "../Text"

export const Header = props => {
	return (
		<Toolbar>
			<PokeIcon />
			<TitleText>{props.title}</TitleText>
			<PokeIcon />
		</Toolbar>
	)
}
