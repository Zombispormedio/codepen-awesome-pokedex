import styled from "styled-components"

export const ListItemContainer = styled.div`
	display: flex;
	flex-direction: row;
	border-bottom: ${props => (props.divider ? "solid 1px #8c8b8b" : "none")};
	align-items: center;
	padding: 0.3rem;
	@media only screen and (min-width: 600px) {
		margin-left: 0.3rem;
		margin-right: 0.3rem;
	}
`
