import React from "react"
import { FooterContainer } from "../Container"
import { FooterTitle } from "../Text"

export const Footer = props => {
	return (
		<FooterContainer>
			<FooterTitle>{props.title}</FooterTitle>
		</FooterContainer>
	)
}
