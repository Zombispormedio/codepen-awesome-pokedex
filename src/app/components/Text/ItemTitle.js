import styled from "styled-components"

export const ItemTitle = styled.div`
	text-transform: capitalize;
	margin-left: 0.5rem;
	font-size: 2em;
	flex-grow: 1;
	@media (max-width: 500px) {
		font-size: 1.3em;
	}

	@media (max-width: 400px) {
		font-size: 1em;
	}
`
