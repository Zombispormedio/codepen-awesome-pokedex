import React from "react"
import styled from "styled-components"

const Checkbox = styled.div`
	font-size: 2em;
	margin-right: 0.5rem;
	cursor: pointer;
	padding-top: 0.2rem;
	padding-bottom: 0.1rem;
	color: ${props => (props.checked ? "#4CAF50" : "black")};
	user-select: none;
`

export const PokeCheckbox = props => (
	<Checkbox
		className={
			"mdi mdi-" + (props.checked ? "check-circle-outline" : "pokeball")
		}
		{...props}
	/>
)
