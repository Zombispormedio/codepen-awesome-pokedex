import React, { Component } from "react"
import styled from "styled-components"

const withView = TargetComponent =>
	class WithView extends Component {
		render() {
			const View = this.props.view
			return (
				<TargetComponent {...this.props}>
					<View>{this.props.children}</View>
				</TargetComponent>
			)
		}
	}

export const List = withView(styled.div`
	flex-grow: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	overflow-y: auto;
`)
