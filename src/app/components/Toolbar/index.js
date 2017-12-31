import styled from "styled-components"
import { rhythm } from "../../lib"

export const Toolbar = styled.div`
	background-color: #b71c1c;
	box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
	padding-left: ${rhythm(1 / 2)};
	padding-right: ${rhythm(1 / 2)};
	min-height: 3.5rem;
	display: flex;
	align-items: center;
	justify-content: center;
	@media (max-width: 500px) {
		min-height: auto;
	}
`
