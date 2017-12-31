import { combineReducers } from "redux"
import { pokemonReducers } from "./pokemon"

const avoid = () => state => state

const create = (initialState, handlers) => (state = initialState, action) =>
	handlers.hasOwnProperty(action.type)
		? handlers[action.type](state, action)
		: state

const context = {
	create,
	avoid
}

export const rootReducer = combineReducers({
	pokemon: pokemonReducers.apply(context)
})
