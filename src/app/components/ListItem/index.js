import React, { Component } from "react"
import { ListItemContainer } from "../Container"
import { Avatar } from "../Avatar"
import { ItemTitle } from "../Text"
import { PokeCheckbox } from "../CheckBox"

export class ListItem extends Component {
	constructor(props) {
		super()
		this.handleCheckbox = this.handleCheckbox.bind(this)
	}

	handleCheckbox() {
		this.props.capture(this.props.item.id)
	}

	render() {
		const { item, divider } = this.props

		return (
			<ListItemContainer divider={divider}>
				<Avatar src={item.avatarUrl} />
				<ItemTitle>{item.name}</ItemTitle>
				<PokeCheckbox checked={item.captured} onClick={this.handleCheckbox} />
			</ListItemContainer>
		)
	}
}
