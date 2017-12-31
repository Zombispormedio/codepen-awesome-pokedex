import React, { Component } from "react"
import { RootReducer } from "./reducers"
import { EpicMiddleware } from "./epics"
import { Provider } from "react-redux"
import { createStore, applyMiddleware } from "redux"
import { rootReducer } from "./reducers"
import { rootEpicMiddleware } from "./epics"

const middlewares = [rootEpicMiddleware]

if (process.env.NODE_ENV === "development") {
	const { createLogger } = require("redux-logger")
	middlewares.push(createLogger())
}

const store = createStore(
	rootReducer,
	applyMiddleware.apply(undefined, middlewares)
)

export const withStore = TargetComponent =>
	class WithStore extends Component {
		render() {
			return (
				<Provider store={store}>
					<TargetComponent {...this.props} />
				</Provider>
			)
		}
	}
