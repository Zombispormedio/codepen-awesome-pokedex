import React, { Component } from "react"
import { ScrollContainer } from "../Container"
import { StyledScrollbars } from "./StyledScrollbars"

export class ScrollView extends Component {
	renderThumb({ style, ...props }) {
		const thumbStyle = {
			backgroundColor: "#B71C1C"
		}
		return <div style={{ ...style, ...thumbStyle }} {...props} />
	}
	render() {
		return (
			<StyledScrollbars renderThumbVertical={this.renderThumb}>
				<ScrollContainer>{this.props.children}</ScrollContainer>
			</StyledScrollbars>
		)
	}
}
