import { combineEpics, createEpicMiddleware } from "redux-observable"
import * as PokemonEpics from "./pokemon"

const rootEpic = combineEpics.apply(null, Object.values(PokemonEpics))

export const rootEpicMiddleware = createEpicMiddleware(rootEpic)
