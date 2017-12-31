import { PAGE_SIZE } from "../constants"

export const getAvatarUrl = id =>
	`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`

export const calcOffset = page => PAGE_SIZE * page
