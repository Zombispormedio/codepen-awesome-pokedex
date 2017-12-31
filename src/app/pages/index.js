import React from "react"
import { RootContainer, Header, Footer, Main } from "../components"
import { Pokedex } from "./Pokedex"

export const Root = () => (
	<RootContainer>
		<Header title="Awesome Pokédex" />
		<Main>
			<Pokedex />
		</Main>
		<Footer title="Zombispormedio 2017" />
	</RootContainer>
)
